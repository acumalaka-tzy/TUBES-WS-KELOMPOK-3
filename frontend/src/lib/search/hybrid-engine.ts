import { executeKeywordSearch } from "./keyword-search";
import { executeSemanticSearch } from "./semantic-search";
import { fuseRRFResults } from "./rrf-ranker";
import { explainSearchResult, generateSearchExplanationSummary } from "./search-explanation";
import { processNaturalLanguageQuery } from "./nlp/entity-recognizer";
import { generateSearchSuggestions } from "./suggestions";
import type { EntityType, SearchMode, SearchResponse, SearchResult } from "../types";
import type { FusedSearchResult } from "./types";

export interface GlobalSearchOptions {
  q?: string;
  mode?: SearchMode;
  type?: EntityType | "all";
  game?: string;
  timeline?: string;
  element?: string;
  faction?: string;
  limit?: number;
  offset?: number;
}

/**
 * Main Hybrid Search Engine
 * Adheres to PRD Section 11, Section 15, FR-02 to FR-08
 */
export async function executeSearch(options: GlobalSearchOptions): Promise<SearchResponse> {
  const rawQ = options.q ?? "";
  const query = rawQ.trim();
  const mode: SearchMode = options.mode || "hybrid";
  const type: EntityType | "all" = options.type || "all";
  const limit = Math.max(1, Math.min(100, options.limit ?? 20));
  const offset = Math.max(0, options.offset ?? 0);

  // If query is empty and no type filter, return empty result with suggestions
  if (!query && type === "all") {
    return {
      query: "",
      mode,
      total: 0,
      results: [],
      status: "ok",
      message: "Silakan masukkan kata kunci pencarian atau pilih kategori.",
    };
  }

  // 1. Process Natural Language Query and Extract Entities
  const intent = processNaturalLanguageQuery(query);

  let fusedResults: FusedSearchResult[] = [];

  // 2. Execute appropriate search mode
  if (mode === "keyword") {
    const kwCandidates = executeKeywordSearch(query, {
      type,
      game: options.game,
      timeline: options.timeline,
      element: options.element,
      faction: options.faction,
    });
    fusedResults = fuseRRFResults([], kwCandidates, { keywordWeight: 1.0 });
  } else if (mode === "semantic") {
    const semCandidates = await executeSemanticSearch(query, {
      type,
      game: options.game,
      timeline: options.timeline,
      element: options.element,
      faction: options.faction,
      parsedIntent: intent,
    });
    fusedResults = fuseRRFResults(semCandidates, [], { semanticWeight: 1.0 });
  } else {
    // Default: Hybrid Search (Keyword + Semantic with RRF)
    const [semCandidates, kwCandidates] = await Promise.all([
      executeSemanticSearch(query, {
        type,
        game: options.game,
        timeline: options.timeline,
        element: options.element,
        faction: options.faction,
        parsedIntent: intent,
      }),
      executeKeywordSearch(query, {
        type,
        game: options.game,
        timeline: options.timeline,
        element: options.element,
        faction: options.faction,
      }),
    ]);

    fusedResults = fuseRRFResults(semCandidates, kwCandidates);
  }

  // 3. Attach Explanation and provenance for each result (FR-08)
  for (const item of fusedResults) {
    item.explanation = explainSearchResult(item, mode, intent);
  }

  const total = fusedResults.length;
  const paginated = fusedResults.slice(offset, offset + limit);

  // 4. Generate overall explanation summary and suggestions if few results
  const summary = generateSearchExplanationSummary(query, mode, total, intent);
  const suggestions = total < 3 && query ? generateSearchSuggestions(query, 5).map((s) => s.label) : undefined;

  return {
    query,
    mode,
    total,
    results: paginated,
    status: total > 0 ? "ok" : "ambiguous",
    message: summary,
    suggestions,
    generatedSparql: intent.generatedSparql,
    parsedIntent: {
      intentType: intent.intentType,
      targetType: intent.targetType,
      extractedAttributes: intent.extractedAttributes,
      confidence: intent.confidence,
    },
  };
}
