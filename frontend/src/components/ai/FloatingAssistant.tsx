"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
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
  "Hubungan antara Scorpion dan Sub-Zero",
];

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Salam, pejuang. Saya adalah AI Knowledge Assistant Mortal Kombat. Tanyakan apa saja mengenai karakter, jurus, klan, alur cerita, atau garis waktu kontinuitas Mortal Kombat.",
      timestamp: "Baru saja",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSparql, setShowSparql] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-mkn-assistant", handleOpen);
    return () => window.removeEventListener("open-mkn-assistant", handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, loading]);

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
    } catch {
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

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Percakapan telah direset. Silakan ajukan pertanyaan baru mengenai semesta Mortal Kombat.",
        timestamp: "Baru saja",
      },
    ]);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Tutup AI Knowledge Assistant" : "Buka AI Knowledge Assistant"}
          aria-expanded={isOpen}
          className={`group relative flex h-14 w-14 items-center justify-center rounded-full border border-mk-gold/50 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
            isOpen
              ? "bg-mk-card text-mk-text shadow-black/60 rotate-90"
              : "bg-gradient-to-tr from-mk-red-deep via-mk-red to-mk-gold text-white shadow-mk-red/40 animate-pulse hover:animate-none"
          }`}
        >
          {isOpen ? (
            <svg className="h-6 w-6 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative flex items-center justify-center">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5Z" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mk-gold opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Floating Popup Chat Dialog */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 flex w-[calc(100vw-32px)] sm:w-[420px] max-w-[440px] flex-col rounded-2xl border border-mk-border/80 bg-mk-bg2/95 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
            : "scale-95 opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ height: "min(600px, calc(100vh - 120px))" }}
        role="dialog"
        aria-label="MK Knowledge AI Assistant"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-mk-border/70 bg-gradient-to-r from-mk-bg via-mk-card to-mk-bg px-4 py-3 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-mk-red/50 bg-mk-red/20 font-display text-sm text-mk-gold shadow-sm">
              ⚡
            </span>
            <div>
              <p className="font-heading text-sm font-bold tracking-wide text-mk-text">MK Knowledge AI</p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-[10px] text-mk-muted">Pencarian Semantik &amp; RAG</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={clearChat}
              title="Bersihkan Percakapan"
              className="p-1.5 text-mk-muted hover:text-mk-text rounded transition"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              title="Tutup Chat"
              className="p-1.5 text-mk-muted hover:text-mk-gold rounded transition"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin text-xs sm:text-sm">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "rounded-tr-xs bg-gradient-to-r from-mk-red-deep to-mk-red text-white"
                    : "rounded-tl-xs bg-mk-card/90 border border-mk-border/80 text-mk-text"
                }`}
              >
                <p className="whitespace-pre-wrap">{m.content}</p>

                {/* Retrieved Context Entities */}
                {m.retrievedContext && m.retrievedContext.entities.length > 0 && (
                  <div className="mt-2.5 border-t border-mk-border/40 pt-2 text-[11px] text-mk-muted space-y-1.5">
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-[10px] uppercase tracking-wider text-mk-gold font-medium">Entitas:</span>
                      {m.retrievedContext.entities.slice(0, 4).map((e) => (
                        <Link
                          key={e.id}
                          href={e.type === "character" ? `/characters/${e.id}` : `/search?q=${encodeURIComponent(e.name)}`}
                          className="rounded border border-mk-border/70 bg-mk-bg px-1.5 py-0.5 text-[10px] text-mk-text hover:border-mk-gold transition"
                        >
                          {e.name}
                        </Link>
                      ))}
                    </div>

                    {/* SPARQL inspection toggle */}
                    {m.generatedSparql && (
                      <div className="pt-0.5">
                        <button
                          type="button"
                          onClick={() => toggleSparql(m.id)}
                          className="text-[10px] text-mk-gold/90 hover:underline inline-flex items-center gap-1"
                        >
                          {showSparql[m.id] ? "▲ Sembunyikan SPARQL" : "🔍 Query Semantik"}
                        </button>
                        {showSparql[m.id] && (
                          <pre className="mt-1 max-h-28 overflow-x-auto rounded bg-mk-bg p-1.5 font-mono text-[9px] text-mk-text/80 border border-mk-border/50">
                            {m.generatedSparql}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <span className="mt-1 px-1 text-[9px] text-mk-muted/70">{m.timestamp}</span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 rounded-xl rounded-tl-xs border border-mk-border/70 bg-mk-card/90 px-3 py-2 text-xs text-mk-muted max-w-[85%]">
              <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-mk-red border-t-transparent" />
              <span>Menelusuri semesta Mortal Kombat...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="border-t border-mk-border/50 bg-mk-bg/40 px-3 py-2">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
            {SAMPLE_PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handleSend(p)}
                disabled={loading}
                className="whitespace-nowrap rounded-full border border-mk-border/60 bg-mk-bg/80 px-2.5 py-1 text-[11px] text-mk-text/90 hover:border-mk-gold hover:text-mk-gold transition disabled:opacity-50 shrink-0"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 border-t border-mk-border/70 bg-mk-bg p-3 rounded-b-2xl"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan karakter, jurus, cerita..."
            disabled={loading}
            className="flex-1 rounded-xl border border-mk-border/70 bg-mk-bg2 px-3.5 py-2 text-xs sm:text-sm text-mk-text placeholder:text-mk-muted focus:border-mk-red focus:outline-none transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            aria-label="Kirim Pesan"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-mk-red-deep to-mk-red text-white shadow-sm transition hover:brightness-110 disabled:opacity-40"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
