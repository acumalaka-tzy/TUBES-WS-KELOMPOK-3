import { executeKeywordSearch } from "./keyword-search";
import { executeSemanticSearch } from "./semantic-search";
import { fuseRRFResults } from "./rrf-ranker";
import { explainSearchResult, generateSearchExplanationSummary } from "./search-explanation";
import { processNaturalLanguageQuery } from "./nlp/entity-recognizer";
import type { SearchResponse, SearchResult } from "../types";
import type { AdvancedSearchParams, FusedSearchResult } from "./types";

export async function executeAdvancedSearch(params: AdvancedSearchParams): Promise<SearchResponse> {
  const {
    q = "",
    mode = "hybrid",
    types = ["all"],
    games,
    timelines,
    elements,
    realms,
    factions,
    weaponCategories,
    verificationStatus,
    limit = 20,
    offset = 0,
  } = params;

  const targetType = types.includes("all") ? "all" : types[0];
  const intent = q.trim() ? processNaturalLanguageQuery(q) : undefined;

  let fusedResults: FusedSearchResult[] = [];

  if (mode === "keyword") {
    const kwCandidates = executeKeywordSearch(q, {
      type: targetType,
      game: games?.[0],
      timeline: timelines?.[0],
      element: elements?.[0],
      faction: factions?.[0],
    });
    fusedResults = fuseRRFResults([], kwCandidates, { keywordWeight: 1.0 });
  } else if (mode === "semantic") {
    const semCandidates = await executeSemanticSearch(q, {
      type: targetType,
      game: games?.[0],
      timeline: timelines?.[0],
      element: elements?.[0],
      faction: factions?.[0],
      parsedIntent: intent,
    });
    fusedResults = fuseRRFResults(semCandidates, [], { semanticWeight: 1.0 });
  } else {
    // Hybrid mode
    const [semCandidates, kwCandidates] = await Promise.all([
      executeSemanticSearch(q, {
        type: targetType,
        game: games?.[0],
        timeline: timelines?.[0],
        element: elements?.[0],
        faction: factions?.[0],
        parsedIntent: intent,
      }),
      executeKeywordSearch(q, {
        type: targetType,
        game: games?.[0],
        timeline: timelines?.[0],
        element: elements?.[0],
        faction: factions?.[0],
      }),
    ]);
    fusedResults = fuseRRFResults(semCandidates, kwCandidates);
  }

  // Multi-facet filtering on the fused results
  let filtered = fusedResults;

  if (types && !types.includes("all")) {
    filtered = filtered.filter((r) => types.includes(r.type));
  }

  if (games && games.length > 0) {
    filtered = filtered.filter((r) =>
      r.games?.some((g) => games.some((target) => g.toLowerCase().includes(target.toLowerCase())))
    );
  }

  if (timelines && timelines.length > 0) {
    filtered = filtered.filter((r) =>
      timelines.some((t) => r.timeline?.toLowerCase().includes(t.toLowerCase()))
    );
  }

  if (realms && realms.length > 0) {
    filtered = filtered.filter((r) =>
      r.attributes?.some(
        (a) => a.label.toLowerCase() === "realm" && realms.some((target) => a.value.toLowerCase().includes(target.toLowerCase()))
      )
    );
  }

  if (factions && factions.length > 0) {
    filtered = filtered.filter((r) =>
      r.attributes?.some(
        (a) => a.label.toLowerCase() === "faksi" && factions.some((target) => a.value.toLowerCase().includes(target.toLowerCase()))
      )
    );
  }

  if (weaponCategories && weaponCategories.length > 0) {
    filtered = filtered.filter((r) =>
      r.attributes?.some(
        (a) => a.label.toLowerCase() === "kategori" && weaponCategories.some((target) => a.value.toLowerCase().includes(target.toLowerCase()))
      )
    );
  }

  if (verificationStatus) {
    filtered = filtered.filter((r) =>
      r.provenance?.some((p) => p.verificationStatus === verificationStatus)
    );
  }

  // Attach explanation per result
  for (const item of filtered) {
    item.explanation = explainSearchResult(item, mode, intent);
  }

  const total = filtered.length;
  const paginated = filtered.slice(offset, offset + limit);

  const summary = generateSearchExplanationSummary(q || "Advanced Search", mode, total, intent);

  return {
    query: q,
    mode,
    total,
    results: paginated,
    status: total > 0 ? "ok" : "ambiguous",
    message: summary,
  };
}
