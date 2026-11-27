import { GoogleGenAI } from "@google/genai";

export interface GeminiUsage {
  promptTokens?: number;
  candidatesTokens?: number;
  totalTokens?: number;
}

export interface GeminiGenerateResult {
  text: string;
  usage?: GeminiUsage;
  model: string;
}

let genAIClient: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    throw new Error("GEMINI_API_KEY_MISSING");
  }

  if (!genAIClient) {
    genAIClient = new GoogleGenAI({ apiKey: apiKey.trim() });
  }

  return genAIClient;
}

/**
 * Generate completion via official @google/genai SDK with timeout, retry, and error classification.
 */
export async function generateWithGemini(params: {
  systemInstruction: string;
  contents: { role: "user" | "model"; parts: { text: string }[] }[];
  temperature?: number;
  maxOutputTokens?: number;
}): Promise<GeminiGenerateResult> {
  const client = getClient();
  const modelName = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  const timeoutMs = parseInt(process.env.GEMINI_TIMEOUT_MS || "60000", 10);

  const maxRetries = 2;
  let lastError: any = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await client.models.generateContent({
        model: modelName,
        contents: params.contents,
        config: {
          systemInstruction: params.systemInstruction,
          temperature: params.temperature ?? parseFloat(process.env.GEMINI_TEMPERATURE || "0.2"),
          maxOutputTokens: params.maxOutputTokens ?? parseInt(process.env.GEMINI_MAX_OUTPUT_TOKENS || "1000", 10),
          abortSignal: controller.signal,
        },
      });

      clearTimeout(timeoutId);

      const text = response.text || "";
      if (!text) {
        throw new Error("Gemini mengembalikan respon kosong.");
      }

      const usageMeta = response.usageMetadata;
      const usage: GeminiUsage | undefined = usageMeta
        ? {
            promptTokens: usageMeta.promptTokenCount,
            candidatesTokens: usageMeta.candidatesTokenCount,
            totalTokens: usageMeta.totalTokenCount,
          }
        : undefined;

      return {
        text,
        usage,
        model: modelName,
      };
    } catch (error: any) {
      clearTimeout(timeoutId);
      lastError = error;

      if (error?.name === "AbortError" || controller.signal.aborted) {
        const timeoutErr = new Error(`Permintaan ke Gemini API melebihi batas waktu (${timeoutMs}ms).`);
        (timeoutErr as any).code = "TIMEOUT";
        throw timeoutErr;
      }

      const errorMsg = String(error?.message || error);
      const isTransient = errorMsg.includes("503") || errorMsg.includes("429") || errorMsg.includes("high demand");

      if (isTransient && attempt < maxRetries) {
        const delay = (attempt + 1) * 1200;
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      if (errorMsg.includes("429") || errorMsg.toLowerCase().includes("quota") || errorMsg.toLowerCase().includes("rate limit")) {
        const rateLimitErr = new Error("Batas kuota Gemini API (Rate Limit) telah tercapai. Silakan coba kembali dalam beberapa saat.");
        (rateLimitErr as any).code = "RATE_LIMIT_EXCEEDED";
        throw rateLimitErr;
      }

      if (errorMsg.includes("401") || errorMsg.includes("403") || errorMsg.toLowerCase().includes("api key")) {
        const authErr = new Error("Autentikasi Gemini API gagal. Pastikan GEMINI_API_KEY valid pada file konfigurasi environment server.");
        (authErr as any).code = "INVALID_API_KEY";
        throw authErr;
      }

      throw error;
    }
  }

  throw lastError;
}
