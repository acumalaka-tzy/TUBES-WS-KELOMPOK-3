"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { search } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { TYPE_LABEL } from "@/lib/routes";
import type { EntityType, SearchMode, SearchResponse, SearchResult } from "@/lib/types";
import SearchBar, { pushHistory } from "@/components/search/SearchBar";
import { TypeBadge, VerificationBadge } from "@/components/ui/Badge";
import EntityImage from "@/components/ui/EntityImage";
import { Container, PageHeader } from "@/components/ui/Layout";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";

const TABS: { id: EntityType | "all"; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "character", label: "Karakter" },
  { id: "game", label: "Game" },
  { id: "ability", label: "Kemampuan" },
  { id: "weapon", label: "Senjata" },
  { id: "organization", label: "Klan / Org" },
  { id: "timeline", label: "Timeline" },
  { id: "event", label: "Story / Event" },
];

const MODES: { id: SearchMode; label: string; desc: string }[] = [
  { id: "hybrid", label: "Hybrid (Default)", desc: "Gabungan teks + relasi semantik dengan RRF ranking" },
  { id: "semantic", label: "Semantic", desc: "Pencarian berbasis relasi ontology & graph" },
  { id: "keyword", label: "Keyword", desc: "Pencocokan nama, alias, dan teks" },
];

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawQ = searchParams.get("q") ?? "";
  const rawMode = (searchParams.get("mode") as SearchMode) ?? "hybrid";
  const rawType = (searchParams.get("type") as EntityType | "all") ?? "all";

  const [activeTab, setActiveTab] = useState<EntityType | "all">(rawType);
  const [activeMode, setActiveMode] = useState<SearchMode>(rawMode);
  const [filterGame, setFilterGame] = useState<string>("all");
  const [filterTimeline, setFilterTimeline] = useState<string>("all");
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveTab(rawType);
    setActiveMode(rawMode);
  }, [rawType, rawMode]);

  useEffect(() => {
    if (rawQ) pushHistory(rawQ);
  }, [rawQ]);

  const { data, error, loading, reload } = useAsync<SearchResponse>(() => {
    if (!rawQ.trim()) {
      return Promise.resolve({
        query: "",
        mode: activeMode,
        total: 0,
        results: [],
        status: "ok",
      });
    }
    return search({ q: rawQ, mode: activeMode, type: activeTab });
  }, [rawQ, activeMode, activeTab]);

  const updateParam = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams.toString());
    if (value && value !== "all" && value !== "hybrid") {
      p.set(key, value);
    } else {
      p.delete(key);
    }
    router.push(`/search?${p.toString()}`);
  };

  const handleTabChange = (tab: EntityType | "all") => {
    setActiveTab(tab);
    updateParam("type", tab);
  };

  const handleModeChange = (mode: SearchMode) => {
    setActiveMode(mode);
    updateParam("mode", mode);
  };

  // Distinct game & timeline list for filters
  const gameOptions = useMemo(() => {
    const set = new Set<string>();
    data?.results.forEach((r) => r.games?.forEach((g) => set.add(g)));
    return Array.from(set);
  }, [data]);

  const timelineOptions = useMemo(() => {
    const set = new Set<string>();
    data?.results.forEach((r) => {
      if (r.timeline) set.add(r.timeline);
    });
    return Array.from(set);
  }, [data]);

  // Client-side filtering by tab (entity type), game & timeline
  const filteredResults = useMemo(() => {
    if (!data?.results) return [];
    return data.results.filter((r) => {
      if (activeTab !== "all" && r.type !== activeTab) return false;
      if (filterGame !== "all" && !r.games?.includes(filterGame)) return false;
      if (filterTimeline !== "all" && r.timeline !== filterTimeline) return false;
      return true;
    });
  }, [data, activeTab, filterGame, filterTimeline]);

  const toggleExplanation = (id: string) => {
    setShowExplanation((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <PageHeader
        eyebrow="Global Search"
        title="Pencarian Knowledge Base"
        description="Mencari entitas dan relasi menggunakan Hybrid Semantic Search Engine (FR-02 sampai FR-08)."
        crumbs={[{ label: "Search" }]}
      >
        <div className="mt-4 max-w-3xl">
          <SearchBar initialQuery={rawQ} mode={activeMode} />
        </div>
      </PageHeader>

      <Container className="py-8">
        {/* Search Mode Switcher & Explanation (PRD 25.5) */}
        <div className="panel mb-6 rounded-sm p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-mk-muted">Mode Pencarian:</span>
              <div className="flex flex-wrap sm:flex-nowrap rounded-sm border border-mk-border bg-mk-bg p-0.5">
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleModeChange(m.id)}
                    className={`rounded-sm px-3 py-1 text-xs font-medium transition ${
                      activeMode === m.id ? "bg-mk-red text-mk-text shadow" : "text-mk-muted hover:text-mk-text"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-xs text-mk-muted italic">
              {MODES.find((m) => m.id === activeMode)?.desc}
            </p>
          </div>
        </div>

        {/* Entity Type Tabs (PRD 25.5 Search Results) */}
        <div className="scrollbar-thin mb-6 flex overflow-x-auto border-b border-mk-border pb-px">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition ${
                activeTab === tab.id
                  ? "border-mk-red text-mk-text"
                  : "border-transparent text-mk-muted hover:border-mk-muted hover:text-mk-text"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && data && (
                <span className="ml-1.5 rounded bg-mk-red/20 px-1.5 py-0.5 text-[10px] text-mk-text">
                  {filteredResults.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Filters bar */}
        {(gameOptions.length > 0 || timelineOptions.length > 0) && (
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-mk-muted">
            <span className="uppercase tracking-wider">Filter:</span>
            {gameOptions.length > 0 && (
              <label className="flex items-center gap-1.5">
                <span>Game:</span>
                <select
                  value={filterGame}
                  onChange={(e) => setFilterGame(e.target.value)}
                  className="rounded-sm border border-mk-border bg-mk-bg px-2.5 py-1 text-mk-text focus:border-mk-red focus:outline-none"
                >
                  <option value="all">Semua Game ({gameOptions.length})</option>
                  {gameOptions.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {timelineOptions.length > 0 && (
              <label className="flex items-center gap-1.5">
                <span>Timeline:</span>
                <select
                  value={filterTimeline}
                  onChange={(e) => setFilterTimeline(e.target.value)}
                  className="rounded-sm border border-mk-border bg-mk-bg px-2.5 py-1 text-mk-text focus:border-mk-red focus:outline-none"
                >
                  <option value="all">Semua Timeline ({timelineOptions.length})</option>
                  {timelineOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {(filterGame !== "all" || filterTimeline !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setFilterGame("all");
                  setFilterTimeline("all");
                }}
                className="text-mk-red underline hover:text-mk-gold"
              >
                Reset filter
              </button>
            )}
          </div>
        )}

        {/* Ambiguous State Notification (FR-06 / FR-02) */}
        {data?.status === "ambiguous" && data.message && (
          <div className="mb-6 flex items-start gap-3 rounded-sm border border-amber-500/50 bg-amber-500/10 p-4 text-sm text-amber-200">
            <span className="text-lg">ℹ</span>
            <div>
              <p className="font-semibold">Perhatian: Entitas Ambigu</p>
              <p className="mt-1 text-xs text-amber-300/80">{data.message}</p>
            </div>
          </div>
        )}

        {/* Query Results / Empty / Loading / Error */}
        {!rawQ.trim() ? (
          <EmptyState
            icon="🔍"
            title="Mulai Pencarian"
            description="Ketik nama karakter, game, jurus, senjata, klan, atau ajukan pertanyaan semantik seperti 'Karakter yang menggunakan api'."
            action={
              <div className="flex flex-wrap justify-center gap-2">
                {["Scorpion", "Sub-Zero", "Lin Kuei", "Karakter yang menggunakan api", "Mortal Kombat 11"].map(
                  (ex) => (
                    <Link
                      key={ex}
                      href={`/search?q=${encodeURIComponent(ex)}`}
                      className="rounded-full border border-mk-border bg-mk-bg/60 px-3 py-1 text-xs text-mk-muted hover:border-mk-gold hover:text-mk-text"
                    >
                      {ex}
                    </Link>
                  )
                )}
              </div>
            }
          />
        ) : loading ? (
          <LoadingState variant="list" count={4} />
        ) : error ? (
          <ErrorState error={error} onRetry={reload} />
        ) : filteredResults.length === 0 ? (
          <EmptyState
            icon="✕"
            title={`Tidak ada hasil untuk "${rawQ}"`}
            description={
              data?.message ??
              "Coba periksa ejaan, gunakan kata kunci yang lebih umum, atau beralih ke mode Hybrid/Semantic."
            }
            action={
              data?.suggestions?.length ? (
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-widest text-mk-muted">Saran pencarian:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {data.suggestions.map((s) => (
                      <Link
                        key={s}
                        href={`/search?q=${encodeURIComponent(s)}`}
                        className="rounded-full border border-mk-border bg-mk-bg/60 px-3 py-1 text-xs text-mk-gold hover:border-mk-gold"
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : undefined
            }
          />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-mk-muted">
              <p>
                Menemukan <strong className="text-mk-text">{filteredResults.length}</strong> entitas untuk &ldquo;
                <span className="text-mk-gold">{rawQ}</span>&rdquo;
              </p>
              <p className="hidden sm:block">Diurutkan berdasarkan relevansi (RRF ranking)</p>
            </div>

            <ul className="space-y-3">
              {filteredResults.map((result) => (
                <SearchResultCard
                  key={`${result.type}-${result.id}`}
                  result={result}
                  showExplanation={!!showExplanation[result.id]}
                  onToggleExplanation={() => toggleExplanation(result.id)}
                />
              ))}
            </ul>
          </div>
        )}
      </Container>
    </>
  );
}

function SearchResultCard({
  result,
  showExplanation,
  onToggleExplanation,
}: {
  result: SearchResult;
  showExplanation: boolean;
  onToggleExplanation: () => void;
}) {
  return (
    <li className="panel group overflow-hidden rounded-sm transition hover:border-mk-red/70">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:p-5">
        {/* Thumbnail if available */}
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-sm border border-mk-border bg-mk-bg">
          <EntityImage
            image={result.image}
            name={result.name}
            aspect="aspect-square"
            objectPosition={result.type === "character" ? "object-top" : undefined}
          />
        </div>

        {/* Main Result Content */}
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={result.type} />
            <span className="text-xs text-mk-muted">Skor: {Math.round(result.relevance * 100)}%</span>
            {result.timeline && (
              <span className="rounded-sm border border-mk-border px-1.5 py-0.5 text-[10px] text-mk-muted">
                {result.timeline}
              </span>
            )}
          </div>

          <h2 className="font-heading text-lg font-bold group-hover:text-mk-gold sm:text-xl">
            <Link href={result.href} className="hover:underline">
              {result.name}
            </Link>
          </h2>

          <p className="line-clamp-2 text-sm text-mk-muted">{result.summary}</p>

          {/* Relevant Attributes (FR-08 / PRD 13.3) */}
          {result.attributes && result.attributes.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-mk-muted">
              {result.attributes.map((attr) => (
                <span key={attr.label}>
                  <strong className="text-mk-text/80">{attr.label}:</strong> {attr.value}
                </span>
              ))}
            </div>
          )}

          {/* Matched Relationships / Concept tags */}
          {result.matchedRelationships && result.matchedRelationships.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-700 dark:text-mk-gold">
                Relasi Cocok:
              </span>
              {result.matchedRelationships.map((rel) => (
                <span
                  key={rel}
                  className="rounded-sm border border-red-300 dark:border-mk-red/50 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 text-[11px] font-medium text-red-700 dark:text-red-200"
                >
                  {rel}
                </span>
              ))}
            </div>
          )}

          {/* Actions & Explanation Toggle (FR-08 Search Explanation) */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-mk-border pt-3">
            <div className="flex items-center gap-3">
              {result.explanation && (
                <button
                  type="button"
                  onClick={onToggleExplanation}
                  className="flex items-center gap-1 text-xs text-mk-gold hover:underline"
                >
                  <span>{showExplanation ? "▼ Tutup penjelasan" : "▶ Mengapa hasil ini muncul?"}</span>
                </button>
              )}
            </div>

            <Link href={result.href} className="btn-primary !py-1 !px-3 !text-[11px]">
              Lihat Detail →
            </Link>
          </div>

          {/* Expandable "Why this result?" & Graph Path (PRD 25.5 Search Results) */}
          {showExplanation && (
            <div className="mt-3 space-y-2 rounded-sm border border-mk-border bg-mk-bg/90 p-3 text-xs text-mk-muted">
              <div className="space-y-1">
                <p className="font-semibold text-mk-text">Alasan Ditemukan (Search Explanation):</p>
                <p>{result.explanation}</p>
              </div>

              {result.graphPath && result.graphPath.length > 0 && (
                <div className="space-y-1 pt-2">
                  <p className="font-semibold text-mk-text">Jalur Relasi Graph (RDF Traversal):</p>
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                    {result.graphPath.map((step, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 break-all">
                        <span
                          className={`rounded px-1.5 py-0.5 ${
                            idx % 2 === 0
                              ? "bg-mk-card border border-mk-border text-amber-700 dark:text-mk-gold"
                              : "bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {step}
                        </span>
                        {idx < result.graphPath!.length - 1 && <span className="text-mk-muted">→</span>}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.provenance && result.provenance.length > 0 && (
                <div className="space-y-1 pt-2">
                  <p className="font-semibold text-mk-text">Sumber Data (Provenance):</p>
                  <ul className="space-y-0.5">
                    {result.provenance.map((p) => (
                      <li key={p.id} className="flex items-center gap-2">
                        <span>• {p.title}</span>
                        <VerificationBadge status={p.verificationStatus} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingState count={4} />}>
      <SearchContent />
    </Suspense>
  );
}
