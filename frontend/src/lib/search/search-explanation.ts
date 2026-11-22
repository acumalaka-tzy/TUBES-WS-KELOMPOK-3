import type { SearchMode, SearchResult } from "../types";
import type { FusedSearchResult, ParsedQueryIntent } from "./types";

export interface ExplanationPayload {
  summary: string;
  intentDescription?: string;
  modeDescription: string;
  resultsExplained: number;
}

/**
 * Generate human-readable explanation for an individual search result (FR-08)
 */
export function explainSearchResult(
  result: FusedSearchResult,
  mode: SearchMode,
  intent?: ParsedQueryIntent
): string {
  const parts: string[] = [];

  const hasSemantic = result.semanticRank !== undefined && result.semanticRank > 0;
  const hasKeyword = result.keywordRank !== undefined && result.keywordRank > 0;

  if (mode === "hybrid" || (hasSemantic && hasKeyword)) {
    if (hasSemantic && hasKeyword) {
      parts.push(
        `Hasil ditemukan melalui mode Hybrid (peringkat Semantik #${result.semanticRank}, peringkat Keyword #${result.keywordRank})`
      );
    } else if (hasSemantic) {
      parts.push(`Hasil ditemukan melalui penelusuran relasi Knowledge Graph (peringkat Semantik #${result.semanticRank})`);
    } else {
      parts.push(`Hasil ditemukan melalui kecocokan teks leksikal (peringkat Keyword #${result.keywordRank})`);
    }
  } else if (mode === "semantic") {
    parts.push(`Hasil ditemukan melalui query semantik SPARQL/Knowledge Graph (peringkat #${result.semanticRank ?? 1})`);
  } else {
    parts.push(`Hasil ditemukan melalui pencocokan teks nama & biografi (peringkat #${result.keywordRank ?? 1})`);
  }

  // Add relational explanation if available
  if (result.matchedRelationships && result.matchedRelationships.length > 0) {
    parts.push(`Relasi ontologi yang cocok: ${result.matchedRelationships.join(", ")}`);
  }

  // Add notes from candidate
  if (result.explanation && !parts.some((p) => result.explanation?.includes(p))) {
    parts.push(result.explanation);
  }

  // Add intent context
  if (intent && intent.intentType !== "free_keyword") {
    if (intent.extractedAttributes.element) {
      parts.push(`Sesuai dengan kriteria elemen kekuatan: ${intent.extractedAttributes.element}`);
    }
    if (intent.extractedAttributes.clan) {
      parts.push(`Sesuai dengan keanggotaan klan: ${intent.extractedAttributes.clan}`);
    }
    if (intent.extractedAttributes.realm) {
      parts.push(`Sesuai dengan realm asal: ${intent.extractedAttributes.realm}`);
    }
  }

  return parts.join(". ") + ".";
}

/**
 * Generate overall search explanation for the response
 */
export function generateSearchExplanationSummary(
  query: string,
  mode: SearchMode,
  totalResults: number,
  intent?: ParsedQueryIntent
): string {
  if (totalResults === 0) {
    return `Tidak ditemukan entitas yang cocok dengan kueri "${query}" pada mode ${mode}.`;
  }

  const modeText =
    mode === "hybrid"
      ? "Hybrid Search (kombinasi leksikal teks + relasi semantik SPARQL dengan peringkat Reciprocal Rank Fusion)"
      : mode === "semantic"
      ? "Semantic Search (penelusuran relasi ontologi RDF/OWL dan Knowledge Graph)"
      : "Keyword Search (pencocokan nama, alias, dan teks deskripsi)";

  let intentDetail = "";
  if (intent && intent.intentType !== "free_keyword") {
    switch (intent.intentType) {
      case "character_by_ability_element":
        intentDetail = ` Maksud pencarian terdeteksi: mencari karakter dengan elemen kekuatan ${intent.extractedAttributes.element}.`;
        break;
      case "character_by_clan":
        intentDetail = ` Maksud pencarian terdeteksi: mencari anggota organisasi/klan ${intent.extractedAttributes.clan}.`;
        break;
      case "character_enemies_rivals":
        intentDetail = ` Maksud pencarian terdeteksi: mencari rival/musuh dari karakter.`;
        break;
      case "character_by_realm":
        intentDetail = ` Maksud pencarian terdeteksi: mencari karakter asal realm ${intent.extractedAttributes.realm}.`;
        break;
      case "character_by_game":
        intentDetail = ` Maksud pencarian terdeteksi: mencari karakter yang muncul di game ${intent.extractedAttributes.game}.`;
        break;
      default:
        break;
    }
  }

  return `Menemukan ${totalResults} hasil untuk "${query}" menggunakan ${modeText}.${intentDetail}`;
}
