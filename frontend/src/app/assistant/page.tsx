"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Container, PageHeader } from "@/components/ui/Layout";
import { VerificationBadge } from "@/components/ui/Badge";
import type { EntityRef, SourceRef } from "@/lib/types";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  retrievedContext?: {
    entities: EntityRef[];
    matchedRelationships: string[];
    timeline?: string;
    sources: SourceRef[];
  };
  generatedSparql?: string;
  provider?: string;
  timestamp: string;
}

const SAMPLE_PROMPTS = [
  "Siapa musuh bebuyutan Scorpion?",
  "Karakter yang menggunakan kekuatan api",
  "Semua anggota klan Lin Kuei",
  "Karakter yang berasal dari Outworld",
  "Hubungan antara Scorpion dan Sub-Zero",
  "Peristiwa setelah turnamen Mortal Kombat pertama",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Salam, pejuang. Saya adalah AI Knowledge Assistant resmi Mortal Kombat Knowledge Nexus. Tanyakan apa saja mengenai karakter, kemampuan, klan, alur cerita, atau garis waktu kontinuitas Mortal Kombat.",
      timestamp: "Baru saja",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSparql, setShowSparql] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (questionText?: string) => {
    const text = (questionText || input).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        throw new Error(`Permintaan gagal (${res.status})`);
      }

      const data = await res.json();

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.answer,
        retrievedContext: data.retrievedContext,
        generatedSparql: data.generatedSparql,
        provider: data.provider,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: "Maaf, terjadi kendala saat memproses jawaban. Silakan coba sesaat lagi.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSparql = (id: string) => {
    setShowSparql((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <PageHeader
        eyebrow="Semantic RAG &amp; LLM"
        title="AI Knowledge Assistant"
        description="Tanya jawab interaktif berbasis Semantic Knowledge Graph dan ontologi Mortal Kombat (PRD v1.5 Bagian 6 &amp; 25.6)."
        crumbs={[{ label: "AI Assistant" }]}
      />

      <Container className="py-8">
        <div className="mx-auto flex max-w-4xl flex-col rounded-sm border border-mk-border bg-mk-bg2 shadow-2xl">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-mk-border bg-mk-bg p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded bg-mk-red/20 font-display text-sm text-mk-red border border-mk-red/40">
                ⚡
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-mk-text">Mortal Kombat Knowledge AI</p>
                <p className="text-[11px] text-mk-muted">Tergrounding pada Knowledge Graph &amp; RDF Ontology</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-mk-muted">RAG Active</span>
            </div>
          </div>

          {/* Conversation Area */}
          <div className="h-[520px] overflow-y-auto p-4 space-y-4 scrollbar-thin">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-sm p-4 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-mk-red text-white"
                      : "bg-mk-bg border border-mk-border text-mk-text"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>

                  {/* Retrieved Context & Provenance */}
                  {m.retrievedContext && (
                    <div className="mt-3 border-t border-mk-border/50 pt-2.5 text-xs text-mk-muted space-y-2">
                      {m.retrievedContext.entities.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] uppercase tracking-wider text-mk-gold">Entitas Terkait:</span>
                          {m.retrievedContext.entities.map((e) => (
                            <Link
                              key={e.id}
                              href={e.type === "character" ? `/characters/${e.id}` : `/search?q=${encodeURIComponent(e.name)}`}
                              className="rounded border border-mk-border bg-mk-bg2 px-1.5 py-0.5 text-[11px] text-mk-text hover:border-mk-gold"
                            >
                              {e.name}
                            </Link>
                          ))}
                        </div>
                      )}

                      {m.retrievedContext.sources && m.retrievedContext.sources.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[11px] uppercase tracking-wider text-mk-muted">Sumber Data:</span>
                          {m.retrievedContext.sources.slice(0, 3).map((s) => (
                            <span key={s.id} className="flex items-center gap-1">
                              <span className="text-[11px] text-mk-muted">• {s.title}</span>
                              <VerificationBadge status={s.verificationStatus} />
                            </span>
                          ))}
                        </div>
                      )}

                      {/* SPARQL inspection button */}
                      {m.generatedSparql && (
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={() => toggleSparql(m.id)}
                            className="text-[11px] text-mk-gold hover:underline"
                          >
                            {showSparql[m.id] ? "▲ Tutup SPARQL Query" : "🔍 Lihat Query SPARQL RAG"}
                          </button>
                          {showSparql[m.id] && (
                            <pre className="mt-1.5 max-h-40 overflow-x-auto rounded bg-mk-bg2 p-2 font-mono text-[10px] text-mk-text/90 border border-mk-border">
                              {m.generatedSparql}
                            </pre>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <span className="mt-1 text-[10px] text-mk-muted px-1">{m.timestamp}</span>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 rounded-sm border border-mk-border bg-mk-bg p-3 text-xs text-mk-muted max-w-[50%]">
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-mk-red border-t-transparent" />
                <span>AI sedang menelusuri Knowledge Graph dan menyusun jawaban...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions */}
          <div className="border-t border-mk-border bg-mk-bg/50 p-3">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-mk-muted">
              Saran Pertanyaan Cepat:
            </p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleSend(p)}
                  disabled={loading}
                  className="rounded-sm border border-mk-border bg-mk-bg px-2.5 py-1 text-xs text-mk-text/90 hover:border-mk-gold hover:text-mk-gold transition"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 border-t border-mk-border bg-mk-bg p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan seputar Mortal Kombat..."
              disabled={loading}
              className="flex-1 rounded-sm border border-mk-border bg-mk-bg2 px-4 py-2.5 text-sm text-mk-text placeholder-mk-muted focus:border-mk-red focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="btn-primary !py-2.5 !px-5 text-xs disabled:opacity-50"
            >
              Kirim →
            </button>
          </form>
        </div>
      </Container>
    </>
  );
}
