export type FuzzyMatchKind =
  | "acronym"
  | "word_prefix"
  | "subsequence"
  | "fuzzy_subsequence";

export interface FuzzyMatchResult {
  score: number;
  kind: FuzzyMatchKind;
}

const CONNECTOR_WORDS = new Set(["of", "the", "and", "vs", "in", "on", "to", "for"]);

const ROMAN_TO_DIGIT: Record<string, string> = {
  ii: "2",
  iii: "3",
  iv: "4",
  v: "5",
  vi: "6",
  vii: "7",
  viii: "8",
  ix: "9",
  x: "10",
  xi: "11",
};

function cleanWords(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Menghasilkan varian singkatan (akronim) dari daftar kata entitas.
 * Contoh:
 * - "Sub-Zero" -> ["sz"]
 * - "Mortal Kombat: Deadly Alliance" -> ["mkda"]
 * - "Mortal Kombat II" -> ["mki", "mkii", "mk2"]
 * - "Mortal Kombat 11" -> ["mk11"]
 */
function buildAcronymVariants(words: string[]): string[] {
  if (words.length < 2) return [];

  const variants = new Set<string>();
  const lastIsYear = /^\d{4}$/.test(words[words.length - 1]);
  const wordSlices = lastIsYear ? [words, words.slice(0, -1)] : [words];

  for (const slice of wordSlices) {
    if (slice.length < 2) continue;

    // 1. Inisial standar (angka pendek seperti 3, 11 dipertahankan utuh)
    const full = slice.map((w) => (/^\d{1,2}$/.test(w) ? w : w[0])).join("");
    variants.add(full);

    // 2. Tanpa kata penghubung (of, the, vs, ...)
    const noConnSlice = slice.filter((w) => !CONNECTOR_WORDS.has(w));
    if (noConnSlice.length >= 2) {
      variants.add(noConnSlice.map((w) => (/^\d{1,2}$/.test(w) ? w : w[0])).join(""));
    }

    // 3. Varian dengan konversi angka Romawi / token Romawi utuh (MK II -> mkii / mk2, MK X -> mkx / mk10)
    const last = slice[slice.length - 1];
    if (ROMAN_TO_DIGIT[last]) {
      const prefix = slice
        .slice(0, -1)
        .map((w) => (/^\d{1,2}$/.test(w) ? w : w[0]))
        .join("");
      variants.add(prefix + last);
      variants.add(prefix + ROMAN_TO_DIGIT[last]);
    }
  }

  return Array.from(variants).filter((v) => v.length >= 2);
}

/**
 * Mencocokkan query sebagai rangkaian awalan tiap kata secara berurutan.
 * Contoh: "subz" -> "sub" + "z" ("Sub-Zero"), "mkda" -> "m" + "k" + "d" + "a".
 */
function matchesWordPrefixChain(qCompact: string, words: string[]): boolean {
  if (qCompact.length < 2 || words.length < 2) return false;

  const search = (qi: number, wi: number, wordsUsed: number): boolean => {
    if (qi === qCompact.length) {
      return wordsUsed >= 2;
    }
    if (wi >= words.length) return false;

    // Opsi 1: lewati kata saat ini (diizinkan untuk kata penghubung atau setelah awal)
    if ((CONNECTOR_WORDS.has(words[wi]) || wordsUsed > 0) && search(qi, wi + 1, wordsUsed)) {
      return true;
    }

    // Opsi 2: cocokkan awalan kata words[wi] sepanjang >= 1 karakter
    const w = words[wi];
    const maxLen = Math.min(w.length, qCompact.length - qi);
    for (let len = 1; len <= maxLen; len++) {
      if (w.slice(0, len) !== qCompact.slice(qi, qi + len)) break;
      if (search(qi + len, wi + 1, wordsUsed + 1)) return true;
    }

    return false;
  };

  return search(0, 0, 0);
}

/**
 * Mencari alignment terbaik untuk subsequence berurutan dari `qCompact` di dalam `words`.
 * Memberi bobot lebih tinggi jika karakter cocok di awal kata atau berurutan tanpa jeda.
 */
function scoreOrderedSubsequence(qCompact: string, words: string[]): number {
  const tCompact = words.join("");
  if (qCompact.length < 3 || tCompact.length < qCompact.length) return 0;

  // Tandai indeks batas awal kata pada tCompact
  const isWordStart = new Array<boolean>(tCompact.length).fill(false);
  let offset = 0;
  for (const w of words) {
    if (offset < tCompact.length) isWordStart[offset] = true;
    offset += w.length;
  }

  // Kumpulkan seluruh posisi kemunculan huruf pertama qCompact sebagai titik awal
  const firstChar = qCompact[0];
  let bestScore = 0;

  for (let start = 0; start < tCompact.length; start++) {
    if (tCompact[start] !== firstChar) continue;

    // Untuk query sangat pendek (3–4 huruf), wajib dimulai pada awal kata atau huruf ke-2 kata
    if (qCompact.length <= 4 && !isWordStart[start] && !(start > 0 && isWordStart[start - 1])) {
      continue;
    }

    let qi = 0;
    let ti = start;
    let boundaryHits = 0;
    let consecutiveRuns = 0;
    let prevMatchIdx = -2;
    let lastMatchIdx = start;

    while (qi < qCompact.length && ti < tCompact.length) {
      if (tCompact[ti] === qCompact[qi]) {
        if (isWordStart[ti]) boundaryHits++;
        if (ti === prevMatchIdx + 1) consecutiveRuns++;
        prevMatchIdx = ti;
        lastMatchIdx = ti;
        qi++;
      }
      ti++;
    }

    if (qi < qCompact.length) continue;

    const span = lastMatchIdx - start + 1;
    const density = qCompact.length / span; // 1.0 = tidak ada lompatan huruf
    const coverage = qCompact.length / tCompact.length;

    // Tolak kecocokan yang terlalu tersebar acak pada frasa panjang
    if (density < 0.34) continue;
    if (coverage < 0.25 && boundaryHits < 2) continue;

    const rawScore =
      0.56 +
      0.16 * density +
      0.10 * coverage +
      0.04 * Math.min(boundaryHits, 3) +
      0.02 * Math.min(consecutiveRuns, 3);

    bestScore = Math.max(bestScore, Math.min(0.87, rawScore));
  }

  return bestScore;
}

/**
 * Mencocokkan query singkatan (acronym/word-prefix) atau fuzzy subsequence
 * (termasuk toleransi 1 salah ketik / huruf terlewat pada subsequence >= 4 karakter).
 */
export function matchAbbreviationOrSubsequence(
  target: string,
  query: string,
): FuzzyMatchResult | null {
  const tWords = cleanWords(target);
  const qWords = cleanWords(query);
  if (!tWords.length || !qWords.length) return null;

  const qCompact = qWords.join("");
  if (qCompact.length < 2) return null;

  // 1. Cek Singkatan / Akronim (mis. "sz" -> "Sub-Zero", "mkda" -> "Mortal Kombat: Deadly Alliance")
  const acronyms = buildAcronymVariants(tWords);
  for (const acr of acronyms) {
    if (acr === qCompact) {
      return { score: 0.94, kind: "acronym" };
    }
    if (qCompact.length >= 2 && acr.startsWith(qCompact)) {
      return { score: 0.86, kind: "acronym" };
    }
  }

  // 2. Cek Rangkaian Awalan Kata (mis. "subz" -> "Sub-Zero", "liuk" -> "Liu Kang", "mksm" -> "MK: Shaolin Monks")
  if (matchesWordPrefixChain(qCompact, tWords)) {
    return { score: 0.88, kind: "word_prefix" };
  }

  // 3. Cek Subsequence Berurutan (mis. "scrpn" -> "Scorpion", "rdn" -> "Raiden", "crymnc" -> "Cryomancy")
  const subScore = scoreOrderedSubsequence(qCompact, tWords);
  if (subScore > 0) {
    return { score: Math.round(subScore * 100) / 100, kind: "subsequence" };
  }

  // 4. Fuzzy Subsequence dengan toleransi 1 typo/karakter berlebih (mis. "scrpon", "scprn", "subzro")
  if (qCompact.length >= 4) {
    let bestFuzzy = 0;

    // A. Hapus 1 karakter salah ketik dari query dan uji subsequence
    for (let skip = 0; skip < qCompact.length; skip++) {
      const reduced = qCompact.slice(0, skip) + qCompact.slice(skip + 1);
      if (reduced.length >= 3) {
        const s = scoreOrderedSubsequence(reduced, tWords);
        if (s > 0) {
          bestFuzzy = Math.max(bestFuzzy, s - 0.08);
        }
      }
    }

    // B. Tukar 2 karakter bersebelahan (transposisi, mis. "scprn" -> "scrpn")
    for (let i = 0; i < qCompact.length - 1; i++) {
      const swapped =
        qCompact.slice(0, i) + qCompact[i + 1] + qCompact[i] + qCompact.slice(i + 2);
      const s = scoreOrderedSubsequence(swapped, tWords);
      if (s > 0) {
        bestFuzzy = Math.max(bestFuzzy, s - 0.06);
      }
    }

    if (bestFuzzy >= 0.56) {
      return { score: Math.round(bestFuzzy * 100) / 100, kind: "fuzzy_subsequence" };
    }
  }

  return null;
}
