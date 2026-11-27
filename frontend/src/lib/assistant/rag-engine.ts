import { generateWithGemini, type GeminiUsage } from "./gemini-client";
import { retrieveKnowledgeGraphContext, type AssistantHistoryItem } from "./sparql-retriever";
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
  usage?: GeminiUsage;
  isFusekiLive?: boolean;
}

/**
 * System instruction enforcing strict RAG grounding, bilingual adaptation,
 * and zero hallucination.
 */
function buildSystemInstruction(contextText: string): string {
  return `
Anda adalah AI Knowledge Assistant resmi dari platform Mortal Kombat Knowledge Nexus.
Tugas utama Anda adalah menjawab pertanyaan pengguna secara komprehensif, cerdas, dan akurat HANYA berdasarkan KONTEN KNOWLEDGE GRAPH yang disediakan di bawah ini.

PANDUAN KETAT OPERASIONAL:
1. SUMBER KEBENARAN TUNGGAL:
   - Gunakan fakta yang terdapat di dalam [KONTEN KNOWLEDGE GRAPH] sebagai satu-satunya rujukan kebenaran.
   - JANGAN mengarang, berasumsi, atau menambahkan fakta di luar data graf.
   - Jika informasi atau entitas yang ditanyakan pengguna TIDAK ADA atau TIDAK CUKUP di dalam konteks, nyatakan secara eksplisit dan jujur bahwa informasi tersebut belum tercatat dalam Mortal Kombat Knowledge Nexus.

2. BAHASA DAN NADA (BILINGUAL SUPPORT):
   - Jika pertanyaan diajukan dalam Bahasa Indonesia, jawab dalam Bahasa Indonesia yang formal, berwibawa, dan informatif.
   - If the query is in English, reply in fluent, authoritative, and encyclopedic English.

3. PEMAHAMAN RELASI & KONTINUITAS:
   - Jelaskan hubungan antarkarakter (rival, sekutu, klan, guru/murid) secara terperinci jika data relasi tersedia.
   - Perhatikan kontinuitas timeline (Original Timeline, Reboot MK9-MK11, New Era MK1 2023) agar tidak tertukar.

4. SUMBER REFERENSI:
   - Sebutkan nama entitas kanonikal atau referensi sumber yang mendukung jawaban Anda jika relevan.

5. FORMAT PENULISAN:
   - Gunakan format yang rapi, elegan, dan mudah dibaca (misalnya poin-poin terstruktur atau paragraf teratur).
   - Hindari simbol asterisk bertumpuk (seperti *** atau tanda bintang ganda di dalam judul heading). Tulis judul heading secara bersih.

[KONTEN KNOWLEDGE GRAPH YANG BERHASIL DIAMBIL]:
${contextText}
`.trim();
}

/**
 * Fallback synthesizer used when Gemini API key is not configured or in offline mode.
 */
function synthesizeFallbackAnswer(query: string, context: Awaited<ReturnType<typeof retrieveKnowledgeGraphContext>>): string {
  if (context.entities.length === 0) {
    return `Maaf, informasi mengenai "${query}" belum ditemukan dalam Knowledge Base Mortal Kombat Knowledge Nexus.`;
  }

  const primary = context.entities[0];
  const related = context.entities.slice(1);

  const sentences: string[] = [];
  sentences.push(
    `Berdasarkan data Knowledge Base Mortal Kombat Knowledge Nexus, **${primary.name}** adalah entitas bertipe *${primary.type}*.`
  );

  if (context.timeline) {
    sentences.push(`Entitas ini tercatat dalam kontinuitas **${context.timeline}**.`);
  }

  if (context.matchedRelationships.length > 0) {
    sentences.push(`Relasi ontologi terhubung: ${context.matchedRelationships.join("; ")}.`);
  }

  if (related.length > 0) {
    const relatedNames = related.map((r) => `**${r.name}** (*${r.type}*)`).join(", ");
    sentences.push(`Entitas terkait lainnya dalam graf: ${relatedNames}.`);
  }

  sentences.push(`(Jawaban ini dirumuskan langsung dari struktur graf pengetahuan kanonikal).`);

  return sentences.join(" ");
}

/**
 * Execute complete RAG pipeline:
 * 1. Intent Recognition & SPARQL Generation
 * 2. Retrieval via Fuseki / Knowledge Graph
 * 3. Context Construction
 * 4. LLM Generation via official Gemini SDK (@google/genai)
 */
export async function generateAssistantAnswer(
  query: string,
  history: AssistantMessage[] = []
): Promise<AssistantResponse> {
  const q = query.trim();

  // 1. Convert history to AssistantHistoryItem
  const historyItems: AssistantHistoryItem[] = history.map((h) => ({
    role: h.role,
    content: h.content,
  }));

  // 2. Retrieval: Execute SPARQL on Fuseki or Graph Traversal
  const knowledge = await retrieveKnowledgeGraphContext(q, historyItems);

  // 3. Check for Gemini API Key
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (geminiApiKey && geminiApiKey.trim()) {
    try {
      const systemInstruction = buildSystemInstruction(knowledge.contextText);

      // Manage conversation history: take last 6 messages for token efficiency
      const recentHistory = history.slice(-6);
      const contents: { role: "user" | "model"; parts: { text: string }[] }[] = [];

      for (const msg of recentHistory) {
        contents.push({
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        });
      }

      // Append current user message
      contents.push({
        role: "user",
        parts: [{ text: q }],
      });

      const geminiResult = await generateWithGemini({
        systemInstruction,
        contents,
      });

      return {
        answer: geminiResult.text.trim(),
        retrievedContext: {
          entities: knowledge.entities,
          matchedRelationships: knowledge.matchedRelationships,
          timeline: knowledge.timeline,
          sources: knowledge.sources,
        },
        generatedSparql: knowledge.generatedSparql,
        provider: "gemini",
        usage: geminiResult.usage,
        isFusekiLive: knowledge.isFusekiLive,
      };
    } catch (geminiError: any) {
      console.warn("[Gemini RAG Engine] Warning during Gemini generation, utilizing Knowledge Graph fallback:", geminiError?.message);
    }
  }

  // 4. Fallback Knowledge Graph Synthesis
  const fallbackAnswer = synthesizeFallbackAnswer(q, knowledge);

  return {
    answer: fallbackAnswer,
    retrievedContext: {
      entities: knowledge.entities,
      matchedRelationships: knowledge.matchedRelationships,
      timeline: knowledge.timeline,
      sources: knowledge.sources,
    },
    generatedSparql: knowledge.generatedSparql,
    provider: "knowledge-base-rag",
    isFusekiLive: knowledge.isFusekiLive,
  };
}
