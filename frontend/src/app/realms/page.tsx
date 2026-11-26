"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getCharacters, getRealms } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { Container, PageHeader } from "@/components/ui/Layout";
import ListToolbar from "@/components/ui/ListToolbar";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";
import RealmIcon from "@/components/ui/RealmIcon";

export default function RealmsPage() {
  const { data: realmsData, error: realmsError, loading: realmsLoading, reload } = useAsync(getRealms, []);
  const { data: charsData } = useAsync(getCharacters, []);
  const [query, setQuery] = useState("");

  const realmsWithFighters = useMemo(() => {
    if (!realmsData) return [];
    return realmsData.map((r) => {
      const residents = (charsData ?? []).filter(
        (c) =>
          c.realm?.id === r.id ||
          c.realm?.name?.toLowerCase() === r.name.toLowerCase() ||
          (r.id === "orderrealm" && c.realm?.name?.toLowerCase().includes("seido"))
      );
      return {
        ...r,
        residents,
      };
    });
  }, [realmsData, charsData]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return realmsWithFighters;
    return realmsWithFighters.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.ruler?.toLowerCase().includes(q) ||
        r.inhabitants?.toLowerCase().includes(q) ||
        r.residents.some((c) => c.name.toLowerCase().includes(q))
    );
  }, [realmsWithFighters, query]);

  return (
    <>
      <PageHeader
        eyebrow="Kosmologi Mortal Kombat"
        title="Dimensi &amp; Realm"
        description="Jelajahi tujuh dimensi utama dalam kosmologi Mortal Kombat: tempat kelahiran para dewa, kaisar penakluk, iblis purba, dan petarung legendaris."
        crumbs={[{ label: "Realms" }]}
      />

      <Container className="py-10">
        <ListToolbar
          query={query}
          onQuery={setQuery}
          placeholder="Cari realm, dewa pelindung, atau petarung…"
          total={filtered.length}
        />

        {realmsLoading ? (
          <LoadingState count={4} />
        ) : realmsError ? (
          <ErrorState error={realmsError} onRetry={reload} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Realm tidak ditemukan"
            description="Tidak ada dimensi atau realm yang cocok dengan kata kunci pencarian Anda."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <Link
                key={r.id}
                href={`/realms/${r.id}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-mk-border bg-mk-card p-6 transition duration-200 hover:-translate-y-1 hover:border-mk-gold/70 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <RealmIcon realmId={r.id} className="h-6 w-6 shrink-0 text-mk-gold group-hover:text-mk-red transition-colors" />
                      <h2 className="font-heading text-lg sm:text-xl font-bold text-mk-text group-hover:text-mk-gold transition-colors leading-snug">
                        {r.name}
                      </h2>
                    </div>
                    <span className="shrink-0 whitespace-nowrap inline-flex items-center rounded-full border border-mk-red/40 bg-mk-red/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-mk-red">
                      {r.residents.length} Petarung
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-mk-text/80 line-clamp-3">
                    {r.description}
                  </p>

                  <div className="mt-4 space-y-2 border-t border-mk-border/60 pt-3 text-[11px]">
                    {r.ruler && (
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-mk-muted font-medium">Penguasa / Pelindung:</span>
                        <span className="font-semibold text-mk-gold text-right line-clamp-1">{r.ruler}</span>
                      </div>
                    )}
                    {r.inhabitants && (
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-mk-muted font-medium">Ras Penghuni:</span>
                        <span className="text-mk-text text-right line-clamp-1">{r.inhabitants}</span>
                      </div>
                    )}
                  </div>

                  {r.residents.length > 0 && (
                    <div className="mt-4 border-t border-mk-border/40 pt-3">
                      <span className="text-[10px] uppercase tracking-wider text-mk-muted">
                        Tokoh Terkenal:
                      </span>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {r.residents.slice(0, 4).map((c) => (
                          <span
                            key={c.id}
                            className="rounded bg-mk-bg px-2 py-0.5 text-[10px] font-medium text-mk-text/90 border border-mk-border/50"
                          >
                            {c.name}
                          </span>
                        ))}
                        {r.residents.length > 4 && (
                          <span className="rounded bg-mk-bg px-1.5 py-0.5 text-[10px] text-mk-muted">
                            +{r.residents.length - 4} lainnya
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-mk-border/60 pt-3 text-xs font-semibold text-mk-red group-hover:text-mk-gold transition-colors">
                  <span>Lihat Detail Dimensi</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
