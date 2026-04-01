/**
 * Normalizes Arabic text for searching.
 * Removes Harakat, normalizes Alif, Hamza, and Ya variants.
 */
export function normalizeArabic(text) {
  if (!text) return "";

  let normalized = text.toString();

  // 1. Remove Harakat/Tashkeel/Quranic marks
  // This range covers most common Harakat: \u064B to \u065F, and some others
  normalized = normalized.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "");

  // 2. Remove Tatweel (stretch mark)
  normalized = normalized.replace(/\u0640/g, "");

  // 3. Normalize Alif variants: أ إ آ ٱ → ا
  normalized = normalized.replace(/[أإآٱ]/g, "ا");

  // 4. Normalize Alif Maqsura: ى → ي
  normalized = normalized.replace(/ى/g, "ي");

  // 5. Normalize Hamza on Waw/Ya: ؤ -> و, ئ -> ي
  normalized = normalized.replace(/ؤ/g, "و");
  normalized = normalized.replace(/ئ/g, "ي");

  // 6. Normalize Ta Marbuta: ة ۃ → ه 
  normalized = normalized.replace(/[ةۃ]/g, "ه");

  // 7. Collapse spaces and remove extra symbols
  // Remove any non-arabic non-space characters that might interfere
  normalized = normalized.replace(/[^\u0621-\u064A\s]/g, "");
  
  // 8. Trim and remove extra spaces
  normalized = normalized.replace(/\s+/g, " ").trim();

  return normalized;
}

/**
 * Internal helper to create a Harakat-agnostic regex from an Arabic query.
 */
function getArabicRegex(query) {
  const normalizedQuery = normalizeArabic(query);
  if (!normalizedQuery) return null;

  const harakatPattern = "[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]*";
  
  const pattern = normalizedQuery.split("").map(char => {
    if (char === " ") return "\\s+";
    if (char === "ا") return "[اأإآٱ]" + harakatPattern;
    if (char === "ي") return "[يىئ]" + harakatPattern;
    if (char === "و") return "[ووؤ]" + harakatPattern;
    if (char === "ه") return "[ههةۃ]" + harakatPattern;
    return char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + harakatPattern;
  }).join("");

  return new RegExp(`(${pattern})`, "gu");
}

/**
 * Highlights matched words in the original text.
 * Preserved Harakat/Tashkeel during display using a Harakat-agnostic regex.
 */
export function highlightMatch(originalText, query) {
  if (!query || !originalText) return originalText;

  const regex = getArabicRegex(query);
  if (!regex) return originalText;

  try {
    const parts = originalText.split(regex);
    if (parts.length <= 1) return originalText;

    return (
      <>
        {parts.map((part, i) => 
          i % 2 === 1 ? (
            <span key={i} className="text-emerald-950 font-bold border-b-2 border-gold-accent/60 bg-gold-accent/5 px-0.5 rounded-sm">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  } catch (e) {
    console.error("Highlight regex error:", e);
    return originalText;
  }
}

/**
 * Creates a contextual snippet centered around the match.
 */
export function getAyahSnippet(originalText, query, maxLength = 80) {
  if (!query || !originalText || originalText.length <= maxLength) return originalText;

  const regex = getArabicRegex(query);
  if (!regex) return originalText.substring(0, maxLength) + "...";

  const match = regex.exec(originalText);
  if (!match) return originalText.substring(0, maxLength) + "...";

  const matchIndex = match.index;
  const matchLength = match[0].length;
  
  // Calculate window
  const sideLength = Math.floor((maxLength - matchLength) / 2);
  
  let start = Math.max(0, matchIndex - sideLength);
  let end = Math.min(originalText.length, matchIndex + matchLength + sideLength);

  // Adjust if at boundaries
  if (start === 0) end = Math.min(originalText.length, maxLength);
  if (end === originalText.length) start = Math.max(0, originalText.length - maxLength);

  let snippet = originalText.substring(start, end);
  
  if (start > 0) snippet = "..." + snippet.trim();
  if (end < originalText.length) snippet = snippet.trim() + "...";

  return snippet;
}
