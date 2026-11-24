/**
 * AUTOMATED SEARCH ENGINE EVALUATION & BENCHMARK SUITE (Node ES Module)
 * Mortal Kombat Knowledge Nexus
 */

const BASE_URL = process.env.TEST_URL || "http://localhost:3000/api/search";

const TEST_DATASET = [
  // --- A. EXACT SEARCH ---
  {
    id: "exact-01",
    category: "Exact Search",
    query: "Scorpion",
    expectedIds: ["scorpion"],
    expectedType: "character",
    description: "Exact character name lookup for Scorpion",
  },
  {
    id: "exact-02",
    category: "Exact Search",
    query: "Sub-Zero",
    expectedIds: ["sub-zero"],
    expectedType: "character",
    description: "Exact character name lookup for Sub-Zero",
  },
  {
    id: "exact-03",
    category: "Exact Search",
    query: "Liu Kang",
    expectedIds: ["liu-kang"],
    expectedType: "character",
    description: "Exact character name lookup for Liu Kang",
  },
  {
    id: "exact-04",
    category: "Exact Search",
    query: "Mortal Kombat 11",
    expectedIds: ["mk11-2019", "mk11"],
    expectedType: "game",
    description: "Exact standalone game title lookup for MK11",
  },
  {
    id: "exact-05",
    category: "Exact Search",
    query: "Lin Kuei",
    expectedIds: ["org-lin-kuei", "lin-kuei"],
    expectedType: "organization",
    description: "Exact organization/clan lookup for Lin Kuei",
  },
  {
    id: "exact-06",
    category: "Exact Search",
    query: "Earthrealm",
    expectedIds: ["realm-earthrealm", "earthrealm"],
    expectedType: "location",
    description: "Exact realm/location lookup for Earthrealm",
  },

  // --- B. SEMANTIC SEARCH ---
  {
    id: "sem-01",
    category: "Semantic Search",
    query: "Ninja yang menggunakan tombak berantai",
    expectedIds: ["scorpion"],
    expectedType: "character",
    description: "Contextual lookup: Ninja wielding chain spear -> Scorpion",
  },
  {
    id: "sem-02",
    category: "Semantic Search",
    query: "Karakter dengan kekuatan es",
    expectedIds: ["sub-zero", "frost"],
    expectedType: "character",
    description: "Contextual lookup: Cryomancer fighters -> Sub-Zero, Frost",
  },
  {
    id: "sem-03",
    category: "Semantic Search",
    query: "Klan ninja Jepang",
    expectedIds: ["org-shirai-ryu", "shirai-ryu"],
    expectedType: "organization",
    description: "Contextual lookup: Japanese ninja clan -> Shirai Ryu",
  },
  {
    id: "sem-04",
    category: "Semantic Search",
    query: "Petarung dengan kekuatan api",
    expectedIds: ["scorpion", "liu-kang", "blaze"],
    expectedType: "character",
    description: "Contextual lookup: Fire-powered fighters -> Scorpion, Liu Kang, Blaze",
  },
  {
    id: "sem-05",
    category: "Semantic Search",
    query: "Alam tempat Shao Kahn berkuasa",
    expectedIds: ["realm-outworld", "outworld"],
    expectedType: "location",
    description: "Contextual lookup: Realm ruled by Shao Kahn -> Outworld",
  },
  {
    id: "sem-06",
    category: "Semantic Search",
    query: "Organisasi yang berkaitan dengan sihir gelap",
    expectedIds: ["org-brotherhood-of-shadow", "brotherhood-of-shadow"],
    expectedType: "organization",
    description: "Contextual lookup: Dark magic organization -> Brotherhood of Shadow",
  },

  // --- C. RELATIONSHIP SEARCH ---
  {
    id: "rel-01",
    category: "Relationship Search",
    query: "Siapa musuh Scorpion?",
    expectedIds: ["sub-zero", "quan-chi", "dvorah"],
    expectedType: "character",
    description: "Ontology relationship: enemyOf / rivalOf Scorpion",
  },
  {
    id: "rel-02",
    category: "Relationship Search",
    query: "Siapa sekutu Scorpion?",
    expectedIds: ["sub-zero", "takeda"],
    expectedType: "character",
    description: "Ontology relationship: alliedWith Scorpion in Reboot/New Era",
  },
  {
    id: "rel-03",
    category: "Relationship Search",
    query: "Siapa anggota Lin Kuei?",
    expectedIds: ["sub-zero", "smoke", "cyrax", "sektor", "frost", "org-lin-kuei"],
    description: "Ontology relationship: memberOf Lin Kuei",
  },
  {
    id: "rel-04",
    category: "Relationship Search",
    query: "Siapa mentor Liu Kang?",
    expectedIds: ["raiden", "bo-rai-cho"],
    expectedType: "character",
    description: "Ontology relationship: mentorOf Liu Kang",
  },
  {
    id: "rel-05",
    category: "Relationship Search",
    query: "Apa hubungan Scorpion dengan Sub-Zero?",
    expectedIds: ["sub-zero", "scorpion"],
    description: "Two-entity bidirectional relationship between Scorpion & Sub-Zero",
  },

  // --- D. GAME SEARCH ---
  {
    id: "game-01",
    category: "Game Search",
    query: "Game Mortal Kombat tahun 1992",
    expectedIds: ["mk1-1992"],
    expectedType: "game",
    description: "Game released in year 1992",
  },
  {
    id: "game-02",
    category: "Game Search",
    query: "Karakter Mortal Kombat 1 (2023)",
    expectedIds: ["liu-kang", "scorpion", "sub-zero", "raiden", "kitana"],
    expectedType: "character",
    description: "Characters appearing in Mortal Kombat 1 (2023)",
  },
  {
    id: "game-03",
    category: "Game Search",
    query: "Daftar game berdasarkan tahun rilis",
    expectedIds: ["mk1-1992", "mk2-1993", "mk3-1995", "umk3-1995"],
    expectedType: "game",
    description: "All games sorted chronologically by release year",
  },
  {
    id: "game-04",
    category: "Game Search",
    query: "Mortal Kombat X",
    expectedIds: ["mkx-2015"],
    expectedType: "game",
    description: "Lookup for Mortal Kombat X (2015)",
  },

  // --- E. TIMELINE SEARCH ---
  {
    id: "time-01",
    category: "Timeline Search",
    query: "Karakter dalam Original Timeline",
    expectedIds: ["scorpion", "sub-zero", "liu-kang", "raiden"],
    expectedType: "character",
    description: "Characters active in the Original Timeline",
  },
  {
    id: "time-02",
    category: "Timeline Search",
    query: "Peristiwa pada New Era",
    expectedIds: ["creation-of-new-era", "unmasking-of-titan-shang", "onslaught-mobilization", "new-era"],
    expectedType: "event",
    description: "Story events occurring in the New Era",
  },
  {
    id: "time-03",
    category: "Timeline Search",
    query: "Timeline Reboot",
    expectedIds: ["timeline-reboot", "reboot"],
    expectedType: "timeline",
    description: "Lookup for the Reboot Timeline",
  },
  {
    id: "time-04",
    category: "Timeline Search",
    query: "Armageddon",
    expectedIds: ["battle-of-armageddon", "mk-armageddon-2006", "armageddon"],
    description: "Event & Game related to the apocalyptic Battle of Armageddon",
  },

  // --- F. TYPO TOLERANCE SEARCH ---
  {
    id: "typo-01",
    category: "Typo Search",
    query: "Scorpian",
    expectedIds: ["scorpion"],
    expectedType: "character",
    description: "Typo: 'Scorpian' -> Scorpion",
  },
  {
    id: "typo-02",
    category: "Typo Search",
    query: "Sub Zero",
    expectedIds: ["sub-zero"],
    expectedType: "character",
    description: "Missing hyphen: 'Sub Zero' -> Sub-Zero",
  },
  {
    id: "typo-03",
    category: "Typo Search",
    query: "Liu-Kang",
    expectedIds: ["liu-kang"],
    expectedType: "character",
    description: "Added hyphen: 'Liu-Kang' -> Liu Kang",
  },
  {
    id: "typo-04",
    category: "Typo Search",
    query: "Shirai Ryu",
    expectedIds: ["org-shirai-ryu", "shirai-ryu"],
    expectedType: "organization",
    description: "Clean clan match: 'Shirai Ryu' -> Shirai Ryu",
  },
  {
    id: "typo-05",
    category: "Typo Search",
    query: "Mortal Kombat eleven",
    expectedIds: ["mk11-2019", "mk11"],
    expectedType: "game",
    description: "Word numeral typo: 'Mortal Kombat eleven' -> Mortal Kombat 11",
  },

  // --- G. MULTILINGUAL SEARCH ---
  {
    id: "multi-01-en",
    category: "Multilingual Search",
    query: "Who is Scorpion?",
    expectedIds: ["scorpion"],
    expectedType: "character",
    description: "English entity query for Scorpion",
  },
  {
    id: "multi-01-id",
    category: "Multilingual Search",
    query: "Siapa Scorpion?",
    expectedIds: ["scorpion"],
    expectedType: "character",
    description: "Indonesian entity query for Scorpion",
  },
  {
    id: "multi-02-en",
    category: "Multilingual Search",
    query: "Ice-powered warrior",
    expectedIds: ["sub-zero", "frost"],
    expectedType: "character",
    description: "English semantic concept for ice fighters",
  },
  {
    id: "multi-02-id",
    category: "Multilingual Search",
    query: "Petarung berkekuatan es",
    expectedIds: ["sub-zero", "frost"],
    expectedType: "character",
    description: "Indonesian semantic concept for ice fighters",
  },
  {
    id: "multi-03-en",
    category: "Multilingual Search",
    query: "Realm of the dead",
    expectedIds: ["realm-netherrealm", "netherrealm"],
    expectedType: "location",
    description: "English semantic concept for Netherrealm",
  },
  {
    id: "multi-03-id",
    category: "Multilingual Search",
    query: "Alam orang mati",
    expectedIds: ["realm-netherrealm", "netherrealm"],
    expectedType: "location",
    description: "Indonesian semantic concept for Netherrealm",
  },
  {
    id: "multi-04-en",
    category: "Multilingual Search",
    query: "Ninja clan",
    expectedIds: ["org-shirai-ryu", "org-lin-kuei", "shirai-ryu", "lin-kuei"],
    expectedType: "organization",
    description: "English query for ninja clans",
  },
  {
    id: "multi-04-id",
    category: "Multilingual Search",
    query: "Klan ninja",
    expectedIds: ["org-shirai-ryu", "org-lin-kuei", "shirai-ryu", "lin-kuei"],
    expectedType: "organization",
    description: "Indonesian query for ninja clans",
  },
  {
    id: "multi-05-en",
    category: "Multilingual Search",
    query: "Scorpion's enemies",
    expectedIds: ["sub-zero", "quan-chi", "dvorah"],
    expectedType: "character",
    description: "English relationship query for Scorpion's enemies",
  },
  {
    id: "multi-05-id",
    category: "Multilingual Search",
    query: "Musuh Scorpion",
    expectedIds: ["sub-zero", "quan-chi", "dvorah"],
    expectedType: "character",
    description: "Indonesian relationship query for Scorpion's enemies",
  },

  // --- H. NO RESULT / NEGATIVE SEARCH ---
  {
    id: "neg-01",
    category: "No Result Search",
    query: "Karakter yang tidak pernah ada di Mortal Kombat",
    expectedIds: [],
    isNegative: true,
    description: "Query asking for non-existent MK character",
  },
  {
    id: "neg-02",
    category: "No Result Search",
    query: "Darth Vader di Mortal Kombat",
    expectedIds: [],
    isNegative: true,
    description: "Out-of-domain sci-fi character query",
  },
  {
    id: "neg-03",
    category: "No Result Search",
    query: "Batman vs Superman di Turnamen",
    expectedIds: [],
    isNegative: true,
    description: "Out-of-domain DC universe query",
  },
  {
    id: "neg-04",
    category: "No Result Search",
    query: "Sihir Harry Potter di Outworld",
    expectedIds: [],
    isNegative: true,
    description: "Out-of-domain wizard fantasy query",
  },
];

async function runBenchmark() {
  console.log("===============================================================================");
  console.log("          MORTAL KOMBAT KNOWLEDGE NEXUS — SEARCH ENGINE BENCHMARK              ");
  console.log("===============================================================================\n");
  console.log(`Target Endpoint: ${BASE_URL}`);
  console.log(`Total Test Queries: ${TEST_DATASET.length}\n`);

  const results = [];
  let totalPrecisionAt5 = 0;
  let totalRecallAt5 = 0;
  let totalRR = 0;
  let totalLatency = 0;

  const categoryStats = {};

  for (let i = 0; i < TEST_DATASET.length; i++) {
    const tc = TEST_DATASET[i];
    const encoded = encodeURIComponent(tc.query);
    const start = performance.now();

    try {
      const response = await fetch(`${BASE_URL}?q=${encoded}`);
      const latency = Math.round(performance.now() - start);
      totalLatency += latency;

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const hits = data.results || [];
      const top5 = hits.slice(0, 5);

      let p5 = 0;
      let r5 = 0;
      let rr = 0;
      let passed = false;

      if (tc.isNegative) {
        if (hits.length === 0) {
          p5 = 1.0;
          r5 = 1.0;
          rr = 1.0;
          passed = true;
        } else {
          p5 = 0.0;
          r5 = 0.0;
          rr = 0.0;
          passed = false;
        }
      } else {
        let relevantInTop5 = 0;
        let firstHitRank = 0;

        for (let r = 0; r < top5.length; r++) {
          const item = top5[r];
          const itemId = (item.id || "").toLowerCase();
          const itemName = (item.name || "").toLowerCase();

          const isMatch = tc.expectedIds.some(
            (expected) =>
              itemId.includes(expected.toLowerCase()) ||
              expected.toLowerCase().includes(itemId) ||
              itemName.includes(expected.toLowerCase())
          );

          if (isMatch) {
            relevantInTop5++;
            if (firstHitRank === 0) {
              firstHitRank = r + 1;
            }
          }
        }

        const maxExpected = Math.min(tc.expectedIds.length, 5);
        p5 = maxExpected > 0 ? relevantInTop5 / maxExpected : 0;
        p5 = Math.min(1.0, p5);
        r5 = tc.expectedIds.length > 0 ? relevantInTop5 / tc.expectedIds.length : 1.0;
        r5 = Math.min(1.0, r5);
        rr = firstHitRank > 0 ? 1 / firstHitRank : 0;

        passed = firstHitRank > 0 && firstHitRank <= 3;
      }

      totalPrecisionAt5 += p5;
      totalRecallAt5 += r5;
      totalRR += rr;

      if (!categoryStats[tc.category]) {
        categoryStats[tc.category] = { total: 0, passed: 0, avgLatency: 0 };
      }
      categoryStats[tc.category].total++;
      if (passed) categoryStats[tc.category].passed++;
      categoryStats[tc.category].avgLatency += latency;

      const topResultName = hits.length > 0 ? `${hits[0].name} (${hits[0].type}, rel=${hits[0].relevance})` : "NO RESULTS (0)";

      results.push({
        id: tc.id,
        category: tc.category,
        query: tc.query,
        topResult: topResultName,
        total: hits.length,
        p5: Math.round(p5 * 100) / 100,
        r5: Math.round(r5 * 100) / 100,
        mrr: Math.round(rr * 100) / 100,
        latencyMs: latency,
        status: passed ? "PASSED" : "FAILED",
      });

      const icon = passed ? "✓" : "✗";
      console.log(
        `[${icon}] ${tc.id.padEnd(12)} | ${tc.category.padEnd(21)} | "${tc.query.padEnd(35)}" -> Top: ${topResultName.padEnd(35)} [${latency}ms] (${passed ? "PASSED" : "FAILED"})`
      );
    } catch (err) {
      console.error(`[ERROR] ${tc.id} "${tc.query}": ${err.message}`);
    }
  }

  const n = TEST_DATASET.length;
  const meanP5 = (totalPrecisionAt5 / n) * 100;
  const meanR5 = (totalRecallAt5 / n) * 100;
  const mrr = totalRR / n;
  const avgLatency = Math.round(totalLatency / n);

  console.log("\n===============================================================================");
  console.log("                           EVALUATION SUMMARY                                 ");
  console.log("===============================================================================");
  console.log(`Total Queries Tested   : ${n}`);
  console.log(`Mean Precision@5       : ${meanP5.toFixed(2)}% (Target: >= 80%) -> ${meanP5 >= 80 ? "PASSED" : "FAILED"}`);
  console.log(`Mean Recall@5          : ${meanR5.toFixed(2)}% (Target: >= 80%) -> ${meanR5 >= 80 ? "PASSED" : "FAILED"}`);
  console.log(`Mean Reciprocal Rank   : ${mrr.toFixed(3)} (Target: >= 0.80) -> ${mrr >= 0.80 ? "PASSED" : "FAILED"}`);
  console.log(`Avg Search Latency     : ${avgLatency} ms (Target: <= 2000 ms) -> ${avgLatency <= 2000 ? "PASSED" : "FAILED"}`);
  console.log("-------------------------------------------------------------------------------");
  console.log("PER-CATEGORY BREAKDOWN:");
  for (const [cat, stat] of Object.entries(categoryStats)) {
    const pct = ((stat.passed / stat.total) * 100).toFixed(1);
    const avgL = Math.round(stat.avgLatency / stat.total);
    console.log(
      `  - ${cat.padEnd(25)}: ${stat.passed}/${stat.total} PASSED (${pct}%) | Avg Latency: ${avgL}ms`
    );
  }
  console.log("===============================================================================\n");
}

runBenchmark();
