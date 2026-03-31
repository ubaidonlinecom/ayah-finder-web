/**
 * Normalizes Arabic text for searching.
 * Removes Harakat, normalizes Alif, Hamza, and Ya variants.
 */
export function normalizeArabic(text) {
  if (!text) return "";

  let normalized = text;

  // 1. Remove Harakat/Tashkeel/Quranic marks
  // This range covers most common Harakat: \u064B to \u065F, and some others
  normalized = normalized.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "");

  // 2. Remove Tatweel (stretch mark)
  normalized = normalized.replace(/\u0640/g, "");

  // 3. Normalize Alif variants: أ إ آ ٱ → ا
  normalized = normalized.replace(/[أإآٱ]/g, "ا");

  // 4. Normalize Alif Maqsura: ى → ي
  normalized = normalized.replace(/ى/g, "ي");

  // 5. Normalize Hamza variants: ؤ ئ → ء
  normalized = normalized.replace(/[ؤئ]/g, "ء");

  // 6. Normalize Ta Marbuta and related variants: ة ۃ ت → ه (Wait, user said ة ۃ ت -> ه, but usually ت is not normalized to ه? Let's follow user instruction)
  normalized = normalized.replace(/[ةۃت]/g, "ه");

  // 7. Trim and remove extra spaces
  normalized = normalized.replace(/\s+/g, " ").trim();

  return normalized;
}

/**
 * Highlights a matched word in the original text.
 * Preserves Harakat and special characters during display.
 */
export function highlightMatch(originalText, query) {
  if (!query || !originalText) return originalText;

  const normalizedOriginal = normalizeArabic(originalText);
  const normalizedQuery = normalizeArabic(query);

  if (!normalizedQuery) return originalText;

  // We need to find the start and end of the matched word in the *normalized* text
  // then map those indices back to the *original* text.
  // This is tricky because original text has extra characters (Harakat).

  const matchIndex = normalizedOriginal.indexOf(normalizedQuery);
  if (matchIndex === -1) return originalText;

  // Map normalized index back to original index
  // We'll iterate through original text and count only "base" characters
  let normalizedCounter = 0;
  let originalStartIndex = -1;
  let originalEndIndex = -1;

  for (let i = 0; i < originalText.length; i++) {
    const char = originalText[i];
    // Check if originalText[i] is a base character (not a harakat)
    // A simple check is to see if it's NOT in the harakat range
    const isHarakat = /[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/.test(char);

    if (!isHarakat) {
      if (normalizedCounter === matchIndex) {
        originalStartIndex = i;
      }
      if (normalizedCounter === matchIndex + normalizedQuery.length - 1) {
        // Find the end index. It might be followed by harakat, so we need to consume those.
        originalEndIndex = i;
        let j = i + 1;
        while (j < originalText.length && /[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/.test(originalText[j])) {
          originalEndIndex = j;
          j++;
        }
        break;
      }
      normalizedCounter++;
    }
  }

  if (originalStartIndex !== -1 && originalEndIndex !== -1) {
    const before = originalText.substring(0, originalStartIndex);
    const match = originalText.substring(originalStartIndex, originalEndIndex + 1);
    const after = originalText.substring(originalEndIndex + 1);
    
    return (
      <>
        {before}
        <span className="bg-gold-200/50 text-emerald-950 font-bold px-0.5 rounded shadow-sm border-b-2 border-gold-accent">
          {match}
        </span>
        {after}
      </>
    );
  }

  return originalText;
}
