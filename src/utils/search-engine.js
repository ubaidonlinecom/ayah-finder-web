import quranData from '@/data/quran-data.json';
import { normalizeArabic } from './arabic-utils';

/**
 * Centralized Search Engine for Ayah Finder.
 * Handles normalization, multi-word logic, and weighted ranking.
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function searchQuran(query) {
  if (!query || !query.trim()) return [];

  const rawNormalizedQuery = normalizeArabic(query);
  const queryTokens = rawNormalizedQuery.split(/\s+/).filter(t => t.length > 0);
  const normalizedQuery = queryTokens.join(" ");
  
  if (queryTokens.length === 0) return [];

  // Prepared Regex for boundary matching
  // Matches start/end or any character NOT in the basic Arabic letter range
  const boundaryPattern = '(^|[^\\u0621-\\u064A])';
  const escapedQuery = escapeRegExp(normalizedQuery);
  const phraseRegex = new RegExp(`${boundaryPattern}${escapedQuery}${boundaryPattern}`, 'i');

  const results = quranData.map(ayah => {
    const normalizedText = normalizeArabic(ayah.text);
    const normalizedSurah = normalizeArabic(ayah.surahName);
    let score = 0;

    // 1. TIER 1: EXACT MATCH (Whole Ayah)
    if (normalizedText === normalizedQuery) {
      score += 5000;
    }

    // 2. TIER 2: EXACT PHRASE MATCH (Correct Order)
    if (normalizedText.includes(normalizedQuery)) {
      // Base "contains" score
      score += 200; 
      
      // Standalone Phrase Bonus (High Priority)
      // This is the core check for "is this the exact word/phrase"
      if (phraseRegex.test(normalizedText)) {
        score += 1000; 
      }

      // Bonus: Proximity to start
      if (normalizedText.indexOf(normalizedQuery) < 5) {
        score += 200;
      }
    }

    // 3. TIER 3: TOKEN LOGIC (Loose AND) - Only if multi-word
    if (queryTokens.length > 1) {
      const matchedTokensCount = queryTokens.filter(token => {
          const escapedToken = escapeRegExp(token);
          const wordRegex = new RegExp(`${boundaryPattern}${escapedToken}${boundaryPattern}`, 'i');
          return wordRegex.test(normalizedText);
      }).length;

      if (matchedTokensCount === queryTokens.length) {
        // All tokens exist as whole words
        score += 300;

        // Order Check
        let isOrderCorrect = true;
        let lastIdx = -1;
        for (const token of queryTokens) {
            const currentIdx = normalizedText.indexOf(token, lastIdx + 1);
            if (currentIdx === -1) {
                isOrderCorrect = false;
                break;
            }
            lastIdx = currentIdx;
        }
        if (isOrderCorrect) score += 400; // Passes filter easily if order is right
      }
    }

    // 4. SURAH NAME MATCH
    if (normalizedSurah.includes(normalizedQuery)) {
      score += 200;
      const surahRegex = new RegExp(`${boundaryPattern}${escapedQuery}${boundaryPattern}`, 'i');
      if (surahRegex.test(normalizedSurah)) score += 300;
    }

    return { ...ayah, score };
  })
  .filter(ayah => ayah.score >= 500)
  .sort((a, b) => b.score - a.score);

  return results;
}

/**
 * Gets a specific ayah by ID from the canonical dataset.
 */
export function getAyahById(id) {
  return quranData.find(a => a.id === id);
}
