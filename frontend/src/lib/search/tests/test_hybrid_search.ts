import { processNaturalLanguageQuery, recognizeAndLinkEntities } from "../nlp/entity-recognizer";
import { executeKeywordSearch } from "../keyword-search";
import { executeSemanticSearch } from "../semantic-search";
import { fuseRRFResults } from "../rrf-ranker";
import { explainSearchResult, generateSearchExplanationSummary } from "../search-explanation";
import { searchStoryEvents } from "../story-search";
import { generateSearchSuggestions } from "../suggestions";
import { executeSearch } from "../hybrid-engine";
import { executeAdvancedSearch } from "../advanced-search";
import { isReadOnlySparql, sparqlEscape, sparqlRegexEscape } from "../../fuseki";

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    passed++;
    console.log(`  [PASS] ${testName}`);
  } else {
    failed++;
    console.error(`  [FAIL] ${testName}${detail ? ` -> ${detail}` : ""}`);
  }
}

async function runTests() {
  console.log("=== RUNNING HYBRID SEARCH ENGINE & BACKEND API TEST SUITE ===\n");

  // 1. Test Entity Recognition & Linking
  console.log("1. Entity Recognition & Entity Linking (NER & NEL):");
  {
    const ent1 = recognizeAndLinkEntities("Scorpion and Sub-Zero from Lin Kuei");
    const names = ent1.map((e) => e.name);
    assert(names.includes("Scorpion"), "Recognizes character 'Scorpion'");
    assert(names.includes("Sub-Zero"), "Recognizes character 'Sub-Zero'");
    assert(names.includes("Lin Kuei"), "Recognizes organization 'Lin Kuei'");

    const ent2 = recognizeAndLinkEntities("karakter berelemen api dan es");
    const elNames = ent2.filter((e) => e.type === "element").map((e) => e.name);
    assert(elNames.includes("Fire"), "Links 'api' to Fire element");
    assert(elNames.includes("Ice"), "Links 'es' to Ice element");

    const ent3 = recognizeAndLinkEntities("berasal dari outworld dan netherrealm");
    const realmNames = ent3.filter((e) => e.type === "realm").map((e) => e.name);
    assert(realmNames.includes("Outworld"), "Links 'outworld' to Outworld realm");
    assert(realmNames.includes("Netherrealm"), "Links 'netherrealm' to Netherrealm realm");
  }

  // 2. Test NLQP
  console.log("\n2. Natural Language Query Processing (NLQP):");
  {
    const nl1 = processNaturalLanguageQuery("Karakter yang menggunakan kekuatan api");
    assert(nl1.intentType === "character_by_ability_element", "Detects ability element intent");
    assert(nl1.extractedAttributes.element === "Fire", "Extracts element Fire");
    assert(!!nl1.generatedSparql, "Generates SPARQL for ability element query");

    const nl2 = processNaturalLanguageQuery("Semua anggota klan Lin Kuei");
    assert(nl2.intentType === "character_by_clan", "Detects clan membership intent");
    assert(nl2.extractedAttributes.clan === "Lin Kuei", "Extracts clan Lin Kuei");

    const nl3 = processNaturalLanguageQuery("Musuh dari Scorpion");
    assert(nl3.intentType === "character_enemies_rivals", "Detects enemies/rivals intent");
    assert(nl3.extractedAttributes.relationshipType === "enemyOf", "Extracts enemy relationship");

    const nl4 = processNaturalLanguageQuery("Karakter yang berasal dari Outworld");
    assert(nl4.intentType === "character_by_realm", "Detects realm origin intent");
    assert(nl4.extractedAttributes.realm === "Outworld", "Extracts realm Outworld");

    const nl5 = processNaturalLanguageQuery("Karakter yang muncul di Mortal Kombat X");
    assert(nl5.intentType === "character_by_game", "Detects game appearances intent");
  }

  // 3. Test Keyword Search
  console.log("\n3. Keyword Search Engine:");
  {
    const kwRes1 = executeKeywordSearch("Scorpion");
    assert(kwRes1.length > 0, "Keyword search returns results for 'Scorpion'");
    assert(kwRes1[0].name === "Scorpion", "Exact match 'Scorpion' is ranked #1");
    assert(kwRes1[0].keywordScore === 1.0, "Exact match receives score 1.0");

    const kwRes2 = executeKeywordSearch("Sub", { type: "character" });
    assert(kwRes2.some((c) => c.name.includes("Sub-Zero")), "Prefix query 'Sub' finds Sub-Zero");

    const kwRes3 = executeKeywordSearch("cryomancer");
    assert(kwRes3.length > 0, "Finds characters with 'cryomancer' in biography/summary");
  }

  // 4. Test Semantic Search
  console.log("\n4. Semantic Search (SPARQL & Knowledge Graph Traversal):");
  {
    const semRes1 = await executeSemanticSearch("Karakter yang menggunakan kekuatan api");
    assert(semRes1.length > 0, "Semantic search returns results for Fire element query");
    assert(
      semRes1.some((c) => c.name === "Scorpion"),
      "Scorpion is found for fire element semantic query"
    );
    const scorp = semRes1.find((c) => c.name === "Scorpion");
    assert(
      scorp?.matchedRelationships?.some((r) => r.includes("Fire")) ?? false,
      "Scorpion has matched relationship hasAbility -> hasElement (Fire)"
    );
    assert((scorp?.graphPath?.length ?? 0) >= 3, "Scorpion has RDF graph path");

    const semRes2 = await executeSemanticSearch("Semua anggota klan Lin Kuei");
    assert(
      semRes2.some((c) => c.name.includes("Sub-Zero")),
      "Sub-Zero is found as member of Lin Kuei"
    );

    const semRes3 = await executeSemanticSearch("Musuh dari Scorpion");
    assert(
      semRes3.some((c) => c.name.includes("Sub-Zero") || c.name.includes("Quan Chi")),
      "Enemies of Scorpion include Sub-Zero or Quan Chi"
    );
  }

  // 5. Test Reciprocal Rank Fusion (RRF)
  console.log("\n5. Reciprocal Rank Fusion (RRF Ranking):");
  {
    const semCand = [
      {
        id: "char-scorpion",
        type: "character" as const,
        name: "Scorpion",
        summary: "Specter of the Netherrealm",
        href: "/characters/char-scorpion",
        attributes: [],
        semanticRank: 1,
        semanticScore: 0.95,
      },
      {
        id: "char-sub-zero",
        type: "character" as const,
        name: "Sub-Zero",
        summary: "Grandmaster of the Lin Kuei",
        href: "/characters/char-sub-zero",
        attributes: [],
        semanticRank: 2,
        semanticScore: 0.90,
      },
    ];

    const kwCand = [
      {
        id: "char-scorpion",
        type: "character" as const,
        name: "Scorpion",
        summary: "Specter of the Netherrealm",
        href: "/characters/char-scorpion",
        attributes: [],
        keywordRank: 1,
        keywordScore: 1.0,
      },
      {
        id: "game-mk1",
        type: "game" as const,
        name: "Mortal Kombat (1992)",
        summary: "First MK game",
        href: "/games/mk1-1992",
        attributes: [],
        keywordRank: 2,
        keywordScore: 0.75,
      },
    ];

    const fused = fuseRRFResults(semCand, kwCand, { k: 60, semanticWeight: 1.0, keywordWeight: 0.8 });
    assert(fused.length === 3, "Fused distinct candidates count is 3");
    assert(fused[0].id === "char-scorpion", "Item ranked #1 in both modes is top-ranked");
    assert(fused[0].relevance === 1.0, "Top fused item normalized relevance is 1.0 (100%)");
    assert(fused[0].rrfScore > fused[1].rrfScore, "Fused RRF score is monotonically decreasing");
  }

  // 6. Test Search Explanation
  console.log("\n6. Search Explanation:");
  {
    const searchRes = await executeSearch({ q: "Karakter api", mode: "hybrid" });
    assert(searchRes.results.length > 0, "Hybrid search returns results");
    const firstResult = searchRes.results[0];
    assert(!!firstResult.explanation, "First result contains explanation string");
    assert(
      firstResult.explanation!.toLowerCase().includes("peringkat") ||
        firstResult.explanation!.toLowerCase().includes("relasi") ||
        firstResult.explanation!.toLowerCase().includes("cocok"),
      "Explanation describes ranking or matching reason"
    );
    assert(!!searchRes.message, "Response contains overall search explanation message");
  }

  // 7. Test Story Semantic Search
  console.log("\n7. Story Semantic Search:");
  {
    const storyRes1 = searchStoryEvents({ query: "tournament" });
    assert(storyRes1.events.length > 0, "Finds story events matching 'tournament'");

    const storyRes2 = searchStoryEvents({ timeline: "timeline-reboot" });
    assert(
      storyRes2.events.every((e) => e.timeline.id === "timeline-reboot"),
      "Filters story events by timeline-reboot"
    );

    // Verify chronological order
    let isChronological = true;
    for (let i = 1; i < storyRes2.events.length; i++) {
      if (storyRes2.events[i].chronology < storyRes2.events[i - 1].chronology) {
        isChronological = false;
        break;
      }
    }
    assert(isChronological, "Story events are ordered chronologically");
  }

  // 8. Test Search Suggestions
  console.log("\n8. Search Suggestions & Autocomplete:");
  {
    const sugg1 = generateSearchSuggestions("Scorp", 5);
    assert(sugg1.length > 0, "Suggestions returned for 'Scorp'");
    assert(sugg1[0].label.includes("Scorpion"), "First suggestion is Scorpion");
    assert(sugg1[0].type === "character", "First suggestion has type character");

    const sugg2 = generateSearchSuggestions("Lin", 5);
    assert(sugg2.some((s) => s.label.includes("Lin Kuei")), "Suggestions include Lin Kuei");
  }

  // 9. Test Advanced Faceted Search
  console.log("\n9. Advanced Faceted Search:");
  {
    const advRes = await executeAdvancedSearch({
      q: "",
      mode: "hybrid",
      types: ["character"],
      factions: ["Shirai Ryu"],
    });
    assert(advRes.results.length > 0, "Advanced search finds Shirai Ryu characters");
    assert(
      advRes.results.every((r) => r.type === "character"),
      "Advanced search respects types filter"
    );
  }

  // 10. Test SPARQL Safety & Injection Prevention
  console.log("\n10. SPARQL Safety & Query Validation:");
  {
    assert(isReadOnlySparql("SELECT ?s ?p ?o WHERE { ?s ?p ?o }"), "Allows valid SELECT query");
    assert(isReadOnlySparql("ASK { ?s ?p ?o }"), "Allows valid ASK query");
    assert(!isReadOnlySparql("DROP ALL"), "Rejects DROP ALL query");
    assert(!isReadOnlySparql("DELETE WHERE { ?s ?p ?o }"), "Rejects DELETE query");
    assert(!isReadOnlySparql("INSERT DATA { <x> <y> <z> }"), "Rejects INSERT DATA query");
    assert(!isReadOnlySparql("CLEAR GRAPH <x>"), "Rejects CLEAR query");

    const escaped = sparqlEscape('Test "with" quotes and \\slashes');
    assert(!escaped.includes('"with"'), "Escapes double quotes in SPARQL strings");

    const regexEscaped = sparqlRegexEscape("Scorpion (Classic)");
    assert(regexEscaped.includes("\\("), "Escapes regex parentheses");
  }

  // 11. Test Game Search by Console / Platform
  console.log("\n11. Game Search by Console / Platform:");
  {
    // Search "ps4"
    const ps4Res = await executeSearch({ q: "ps4", mode: "hybrid" });
    assert(ps4Res.results.length > 0, "Finds games for query 'ps4'");
    const ps4GameTitles = ps4Res.results.filter((r) => r.type === "game").map((r) => r.name);
    assert(
      ps4GameTitles.includes("Mortal Kombat 11") || ps4GameTitles.includes("Mortal Kombat X"),
      "PS4 query returns MK11 or MKX"
    );
    const ps4Game = ps4Res.results.find((r) => r.type === "game" && r.name === "Mortal Kombat 11");
    assert(
      ps4Game !== undefined &&
        (ps4Game.explanation?.includes("PlayStation 4") ||
          ps4Game.matchedRelationships?.some((m: string) => m.includes("PlayStation 4"))),
      "MK11 contains 'Tersedia di platform PlayStation 4' note or rel"
    );

    // Search "switch"
    const switchRes = await executeSearch({ q: "switch", mode: "hybrid" });
    assert(switchRes.results.length > 0, "Finds games for query 'switch'");
    const switchGameTitles = switchRes.results.filter((r) => r.type === "game").map((r) => r.name);
    assert(
      switchGameTitles.includes("Mortal Kombat 11") || switchGameTitles.includes("Mortal Kombat 1 (2023)"),
      "Switch query returns MK11 or MK1"
    );

    // Search "xbox one"
    const xboxRes = await executeSearch({ q: "xbox one", mode: "hybrid" });
    assert(xboxRes.results.length > 0, "Finds games for query 'xbox one'");
    const xboxTitles = xboxRes.results.filter((r) => r.type === "game").map((r) => r.name);
    assert(
      xboxTitles.includes("Mortal Kombat X") || xboxTitles.includes("Mortal Kombat 11"),
      "Xbox One query returns MKX or MK11"
    );

    // Search "arcade"
    const arcadeRes = await executeSearch({ q: "arcade", mode: "hybrid" });
    assert(arcadeRes.results.length > 0, "Finds games for query 'arcade'");
    const arcadeTitles = arcadeRes.results.filter((r) => r.type === "game").map((r) => r.name);
    assert(arcadeTitles.includes("Mortal Kombat (1992)"), "Arcade query returns Mortal Kombat (1992)");

    // Search "pc"
    const pcRes = await executeSearch({ q: "pc", mode: "hybrid" });
    assert(pcRes.results.length > 0, "Finds games for query 'pc'");

    // Test platform suggestions
    const ps4Sugg = generateSearchSuggestions("ps4", 5);
    assert(ps4Sugg.length > 0, "Generates autocomplete suggestions for 'ps4'");
    assert(
      ps4Sugg.some((s) => s.label.includes("PlayStation 4")),
      "Suggestions for 'ps4' include PlayStation 4 label"
    );
  }

  console.log(`\n========================================`);
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution threw error:", err);
  process.exit(1);
});
