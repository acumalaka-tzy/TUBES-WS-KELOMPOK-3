import type { FusedSearchResult, SearchCandidate } from "./types";

export interface RRFConfig {
  k?: number; // Smoothing constant, standard is 60
  semanticWeight?: number; // Weight for semantic rank
  keywordWeight?: number; // Weight for keyword rank
}

const DEFAULT_RRF_CONFIG: Required<RRFConfig> = {
  k: 60,
  semanticWeight: 1.0,
  keywordWeight: 0.8,
};

/**
 * Reciprocal Rank Fusion (RRF)
 * Formula: RRF_Score(d) = sum( w_m / (k + r_m(d)) )
 * Normalizes score to [0, 1] for frontend relevance badge
 */
export function fuseRRFResults(
  semanticCandidates: SearchCandidate[],
  keywordCandidates: SearchCandidate[],
  config: RRFConfig = {}
): FusedSearchResult[] {
  const { k, semanticWeight, keywordWeight } = { ...DEFAULT_RRF_CONFIG, ...config };

  // Map candidate by ID
  const map = new Map<
    string,
    {
      candidate: SearchCandidate;
      semRank?: number;
      kwRank?: number;
      semScore?: number;
      kwScore?: number;
    }
  >();

  // Add semantic candidates
  for (const item of semanticCandidates) {
    map.set(item.id, {
      candidate: item,
      semRank: item.semanticRank,
      semScore: item.semanticScore,
    });
  }

  // Add or merge keyword candidates
  for (const item of keywordCandidates) {
    const existing = map.get(item.id);
    if (existing) {
      existing.kwRank = item.keywordRank;
      existing.kwScore = item.keywordScore;
      // Merge attributes & notes
      if (item.explanationNotes && existing.candidate.explanationNotes) {
        existing.candidate.explanationNotes.push(...item.explanationNotes);
      }
      if (!existing.candidate.image && item.image) {
        existing.candidate.image = item.image;
      }
    } else {
      map.set(item.id, {
        candidate: item,
        kwRank: item.keywordRank,
        kwScore: item.keywordScore,
      });
    }
  }

  // Calculate RRF scores
  const maxPossibleRRF = semanticWeight / (k + 1) + keywordWeight / (k + 1);
  const fused: FusedSearchResult[] = [];

  for (const entry of Array.from(map.values())) {
    const { candidate, semRank, kwRank } = entry;
    let rrfScore = 0;

    if (semRank !== undefined && semRank > 0) {
      rrfScore += semanticWeight / (k + semRank);
    }
    if (kwRank !== undefined && kwRank > 0) {
      rrfScore += keywordWeight / (k + kwRank);
    }

    // Normalize relevance to 0..1 scale with 2 decimal places
    const normalizedRelevance = Math.min(1.0, rrfScore / maxPossibleRRF);
    const relevance = Math.round(normalizedRelevance * 100) / 100;

    fused.push({
      id: candidate.id,
      type: candidate.type,
      name: candidate.name,
      summary: candidate.summary,
      href: candidate.href,
      image: candidate.image,
      relevance,
      rrfScore: Math.round(rrfScore * 100000) / 100000,
      keywordRank: kwRank,
      semanticRank: semRank,
      attributes: candidate.attributes,
      matchedRelationships: candidate.matchedRelationships ?? [],
      timeline: candidate.timeline,
      games: candidate.games,
      provenance: candidate.provenance,
      graphPath: candidate.graphPath,
      explanation: candidate.explanationNotes?.join(". "),
    });
  }

  // Sort descending by RRF score
  fused.sort((a, b) => b.rrfScore - a.rrfScore);

  return fused;
}
