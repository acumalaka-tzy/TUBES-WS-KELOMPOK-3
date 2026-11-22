import { NextRequest, NextResponse } from "next/server";
import { generateAssistantAnswer } from "@/lib/assistant/rag-engine";

/**
 * POST /api/assistant
 * AI Knowledge Assistant RAG Endpoint (PRD Section 6)
 * Accepts: { message: string, history?: AssistantMessage[] }
 * Returns: { answer, retrievedContext, generatedSparql, provider }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message || body.q || body.query;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: 'Field "message" wajib diisi dengan pertanyaan non-kosong.' },
        { status: 400 }
      );
    }

    const history = Array.isArray(body.history) ? body.history : [];

    const response = await generateAssistantAnswer(message, history);

    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Gagal memproses pertanyaan asisten AI." },
      { status: 500 }
    );
  }
}
