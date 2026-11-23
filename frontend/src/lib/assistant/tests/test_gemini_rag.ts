import { generateAssistantAnswer } from "../rag-engine";
import { retrieveKnowledgeGraphContext, resolveFollowUpQuery } from "../sparql-retriever";
import { checkRateLimit } from "../rate-limiter";
import { isReadOnlySparql } from "../../fuseki";

async function runTests() {
  console.log("=================================================");
  console.log("TESTING GEMINI API + SPARQL RAG PIPELINE");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, desc: string) {
    if (condition) {
      console.log(`[PASS] ${desc}`);
      passed++;
    } else {
      console.error(`[FAIL] ${desc}`);
      failed++;
    }
  }

  // 1. Test SPARQL Safety & Query Generation
  console.log("--- 1. Testing SPARQL Safety & Intent Extraction ---");
  const testQuery1 = "Siapa saja anggota klan Lin Kuei?";
  const retrieval1 = await retrieveKnowledgeGraphContext(testQuery1);
  assert(Boolean(retrieval1.generatedSparql), "SPARQL query successfully generated for Lin Kuei query");
  assert(isReadOnlySparql(retrieval1.generatedSparql), "Generated SPARQL query is strictly read-only (Injection safe)");
  assert(retrieval1.entities.some((e) => e.name.toLowerCase().includes("lin kuei")), "Lin Kuei entity successfully matched in Knowledge Graph");

  // 2. Test Character Retrieval with Relationships
  console.log("\n--- 2. Testing Character & Relationship Retrieval ---");
  const testQuery2 = "Ceritakan tentang Scorpion dan siapa rivalnya";
  const retrieval2 = await retrieveKnowledgeGraphContext(testQuery2);
  assert(retrieval2.entities.some((e) => e.id === "scorpion"), "Scorpion entity identified");
  assert(retrieval2.contextText.includes("Shirai Ryu"), "Faction Shirai Ryu retrieved in context");
  assert(retrieval2.contextText.includes("Sub-Zero"), "Rival Sub-Zero identified in relationship context");
  assert(retrieval2.sources.length > 0, "Canonical provenance sources retrieved");

  // 3. Test Game Retrieval across Eras
  console.log("\n--- 3. Testing Game & Era Retrieval ---");
  const testQuery3 = "Game Mortal Kombat Deadly Alliance dirilis tahun berapa?";
  const retrieval3 = await retrieveKnowledgeGraphContext(testQuery3);
  assert(retrieval3.entities.some((e) => e.name.toLowerCase().includes("deadly alliance")), "Deadly Alliance game entity matched");
  assert(retrieval3.contextText.includes("3D Era"), "3D Era correctly noted in context");

  // 4. Test Follow-Up Question Resolution (Multi-Turn Conversation)
  console.log("\n--- 4. Testing Multi-Turn Follow-Up Resolution ---");
  const history = [
    { role: "user" as const, content: "Siapa itu Sub-Zero?" },
    { role: "assistant" as const, content: "Sub-Zero adalah Grandmaster Lin Kuei dan petarung cyromancer yang tangguh." },
  ];
  const followUp = "Siapa rival utamanya?";
  const resolved = resolveFollowUpQuery(followUp, history);
  assert(resolved.includes("Sub-Zero"), `Follow-up query resolved with subject: "${resolved}"`);

  // 5. Test Query Not Found in MK Knowledge Graph (Zero Hallucination)
  console.log("\n--- 5. Testing Unknown / Out-of-Universe Query ---");
  const unknownQuery = "Siapa itu Spiderman Peter Parker dan apa kekuatannya?";
  const retrieval5 = await retrieveKnowledgeGraphContext(unknownQuery);
  assert(retrieval5.entities.length === 0, "No entities returned for out-of-universe entity");
  const assistantRes5 = await generateAssistantAnswer(unknownQuery);
  assert(
    assistantRes5.answer.toLowerCase().includes("belum ditemukan") ||
    assistantRes5.answer.toLowerCase().includes("tidak ditemukan"),
    "RAG explicitly acknowledges information is not found in MK Knowledge Graph"
  );

  // 6. Test Bilingual Retrieval (English Query)
  console.log("\n--- 6. Testing Bilingual Query Understanding ---");
  const enQuery = "What weapons does Raiden use in Mortal Kombat?";
  const retrieval6 = await retrieveKnowledgeGraphContext(enQuery);
  assert(retrieval6.entities.some((e) => e.name.toLowerCase().includes("raiden")), "Raiden identified from English query");

  // 7. Test Rate Limiter Protection
  console.log("\n--- 7. Testing Rate Limiter ---");
  const testIp = "test-client-123";
  let wasRateLimited = false;
  for (let i = 0; i < 25; i++) {
    const res = checkRateLimit(testIp, 10, 60000);
    if (!res.allowed) {
      wasRateLimited = true;
      break;
    }
  }
  assert(wasRateLimited, "Rate limiter successfully throttles excessive rapid requests");

  console.log("\n=================================================");
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
