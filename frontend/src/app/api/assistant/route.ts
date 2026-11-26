import { NextRequest, NextResponse } from "next/server";
import { generateAssistantAnswer } from "@/lib/assistant/rag-engine";
import { checkRateLimit } from "@/lib/assistant/rate-limiter";

export const maxDuration = 25; // 25 seconds execution limit for Vercel / serverless

/**
 * POST /api/assistant
 * AI Knowledge Assistant RAG Endpoint
 * Accepts: { message: string, history?: AssistantMessage[] }
 * Returns: { answer, retrievedContext, generatedSparql, provider, usage, isFusekiLive }
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting check
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwardedFor?.split(",")[0]?.trim() || realIp || "127.0.0.1";

    const rateLimit = checkRateLimit(clientIp, 20, 60000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Terlalu banyak permintaan (Rate limit tercapai). Harap tunggu beberapa saat sebelum mengirim pesan lagi.",
          retryAfterMs: rateLimit.resetMs,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rateLimit.resetMs / 1000)),
          },
        }
      );
    }

    // 2. Body Parsing & Input Validation
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Payload JSON tidak valid." },
        { status: 400 }
      );
    }

    const message = body.message || body.q || body.query;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: 'Field "message" wajib diisi dengan pertanyaan non-kosong.' },
        { status: 400 }
      );
    }

    // Max query length constraint (1,000 characters) to prevent token abuse
    if (message.length > 1000) {
      return NextResponse.json(
        { error: "Panjang pertanyaan maksimal 1.000 karakter." },
        { status: 400 }
      );
    }

    // Sanitize and validate history
    const rawHistory = Array.isArray(body.history) ? body.history : [];
    const history = rawHistory
      .filter((h: any) => h && typeof h.content === "string" && (h.role === "user" || h.role === "assistant"))
      .slice(-10) // Limit to last 10 messages
      .map((h: any) => ({
        role: h.role as "user" | "assistant",
        content: String(h.content).slice(0, 2000), // Max 2,000 characters per message
      }));

    // 3. Execute RAG Synthesis
    const response = await generateAssistantAnswer(message, history);

    return NextResponse.json(response);
  } catch (err: any) {
    console.error("[API /api/assistant] Unhandled error:", err);
    return NextResponse.json(
      { error: err?.message || "Gagal memproses pertanyaan asisten AI." },
      { status: 500 }
    );
  }
}
