import { executeSearch } from "../search/hybrid-engine";
import { processNaturalLanguageQuery } from "../search/nlp/entity-recognizer";
import type { EntityRef, SourceRef } from "../types";

export interface AssistantMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AssistantResponse {
  answer: string;
  retrievedContext: {
    entities: EntityRef[];
    matchedRelationships: string[];
    timeline?: string;
    sources: SourceRef[];
  };
  generatedSparql?: string;
  provider: "gemini" | "knowledge-base-rag";
}

/**
 * Knowledge-based RAG Synthesizer
 * Formulates factually grounded responses strictly using Knowledge Graph context.
 */
function synthesizeKnowledgeAnswer(
  query: string,
  searchResults: Awaited<ReturnType<typeof executeSearch>>
): string {
  if (searchResults.results.length === 0) {
    return `Maaf, informasi mengenai "${query}" belum ditemukan dalam Knowledge Base Mortal Kombat Knowledge Nexus.`;
  }

  const primary = searchResults.results[0];
  const related = searchResults.results.slice(1, 4);

  const sentences: string[] = [];

  // 1. Identity & summary
  sentences.push(
    `Berdasarkan data Knowledge Base Mortal Kombat Knowledge Nexus, **${primary.name}** adalah entitas bertipe *${primary.type}*. ${primary.summary}`
  );

  // 2. Attributes
  if (primary.attributes && primary.attributes.length > 0) {
    const attrTexts = primary.attributes
      .filter((a) => a.value && a.value !== "-")
      .map((a) => `${a.label}: ${a.value}`);
    if (attrTexts.length > 0) {
      sentences.push(`Informasi atribut terkait meliputi: ${attrTexts.join(", ")}.`);
    }
  }

  // 3. Timeline & Game context (PRD Section 6: Contextual Answer)
  if (primary.timeline) {
    sentences.push(`Entitas ini tercatat dalam kontinuitas **${primary.timeline}**.`);
  }
  if (primary.games && primary.games.length > 0) {
    sentences.push(`Muncul dalam seri game: ${primary.games.join(", ")}.`);
  }

  // 4. Ontology relationships
  if (primary.matchedRelationships && primary.matchedRelationships.length > 0) {
    sentences.push(`Hubungan ontologi yang terhubung: ${primary.matchedRelationships.join("; ")}.`);
  }

  // 5. Related entities found in graph
  if (related.length > 0) {
    const relatedNames = related.map((r) => `**${r.name}** (*${r.type}*)`).join(", ");
    sentences.push(`Entitas lain yang terhubung dalam pencarian ini: ${relatedNames}.`);
  }

  // 6. Explanation reasoning
  if (primary.explanation) {
    sentences.push(`*Konteks relasi:* ${primary.explanation}`);
  }

  return sentences.join(" ");
}

/**
 * Execute RAG Pipeline: Retrieval -> Context Assembly -> Synthesis
 */
export async function generateAssistantAnswer(
  query: string,
  history: AssistantMessage[] = []
): Promise<AssistantResponse> {
  const q = query.trim();

  // 1. Retrieval stage: Run Hybrid Search and NLQP
  const intent = processNaturalLanguageQuery(q);
  const searchResults = await executeSearch({
    q,
    mode: "hybrid",
    limit: 5,
  });

  const retrievedEntities: EntityRef[] = searchResults.results.map((r) => ({
    id: r.id,
    name: r.name,
    type: r.type,
  }));

  const matchedRelationships: string[] = Array.from(
    new Set(searchResults.results.flatMap((r) => r.matchedRelationships ?? []))
  );

  const sources: SourceRef[] = [];
  const seenSourceIds = new Set<string>();
  for (const r of searchResults.results) {
    for (const s of r.provenance ?? []) {
      if (!seenSourceIds.has(s.id)) {
        seenSourceIds.add(s.id);
        sources.push(s);
      }
    }
  }

  const primaryTimeline = searchResults.results.find((r) => r.timeline)?.timeline;

  // 2. Synthesis stage: Call Gemini API if GEMINI_API_KEY is available
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (geminiApiKey) {
    try {
      const contextText = searchResults.results
        .map(
          (r, idx) => `
[Entitas #${idx + 1}]
Nama: ${r.name}
Tipe: ${r.type}
Deskripsi: ${r.summary}
Atribut: ${r.attributes?.map((a) => `${a.label}: ${a.value}`).join(", ")}
Timeline: ${r.timeline ?? "Semua Era"}
Game: ${r.games?.join(", ") ?? "-"}
Relasi Graf: ${r.matchedRelationships?.join(", ") ?? "-"}
Alasan Pencarian: ${r.explanation ?? "-"}
`
        )
        .join("\n");

      const systemPrompt = `
Anda adalah AI Knowledge Assistant resmi dari platform Mortal Kombat Knowledge Nexus.
Tugas Anda adalah menjawab pertanyaan pengguna secara akurat berdasarkan KONTEN KNOWLEDGE GRAPH yang diberikan di bawah ini.
ATURAN KETAT (PRD v1.5):
1. Gunakan fakta dari Knowledge Graph yang disediakan sebagai sumber utama informasi.
2. JANGAN mengarang fakta jika informasi tidak ditemukan. Nyatakan dengan jujur jika data belum tersedia di Knowledge Base.
3. Pertahankan konteks kontinuitas game dan timeline secara konsisten.
4. Gunakan bahasa Indonesia yang santun, informatif, dan sinematik khas Mortal Kombat.
5. Sebutkan sumber atau entitas yang mendukung jawaban jika relevan.

KONTEN KNOWLEDGE GRAPH TERKAIT:
${contextText}
`.trim();

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\nPertanyaan Pengguna: ${q}` }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 800,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generatedText) {
          return {
            answer: generatedText.trim(),
            retrievedContext: {
              entities: retrievedEntities,
              matchedRelationships,
              timeline: primaryTimeline,
              sources,
            },
            generatedSparql: intent.generatedSparql,
            provider: "gemini",
          };
        }
      }
    } catch {
      // Fallback to Knowledge Base RAG
    }
  }

  // Local Knowledge Graph RAG fallback
  const answer = synthesizeKnowledgeAnswer(q, searchResults);

  return {
    answer,
    retrievedContext: {
      entities: retrievedEntities,
      matchedRelationships,
      timeline: primaryTimeline,
      sources,
    },
    generatedSparql: intent.generatedSparql,
    provider: "knowledge-base-rag",
  };
}
