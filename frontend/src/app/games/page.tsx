"use client";

import { useMemo, useState, useEffect } from "react";
import { getGames } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import type { GameEra } from "@/lib/types";
import { EntityCard } from "@/components/ui/Cards";
import { Container, PageHeader } from "@/components/ui/Layout";
import ListToolbar, { SelectFilter } from "@/components/ui/ListToolbar";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";
import Pagination from "@/components/ui/Pagination";

const PAGE_SIZE = 12;

const ERAS: { value: string; label: string }[] = [
  { value: "all", label: "Semua Era" },
  { value: "Classic Era", label: "Classic Era (1992–1996)" },
  { value: "3D Era", label: "3D Era (1997–2006)" },
  { value: "Reboot Era", label: "Reboot Era (2011–2019)" },
  { value: "New Era", label: "New Era (2023+)" },
  { value: "Spin-off", label: "Spin-off" },
];

export default function GamesPage() {
  const { data, error, loading, reload } = useAsync(getGames, []);
  const [query, setQuery] = useState("");
  const [selectedEra, setSelectedEra] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.toLowerCase().trim();
    return data
      .filter((g) => {
        const matchQ =
          !q ||
          g.title.toLowerCase().includes(q) ||
          g.shortTitle.toLowerCase().includes(q) ||
          g.summary.toLowerCase().includes(q) ||
          g.platforms.some((p) => p.toLowerCase().includes(q));
        const matchEra = selectedEra === "all" || g.era === selectedEra;
        return matchQ && matchEra;
      })
      .sort((a, b) => a.releaseYear - b.releaseYear);
  }, [data, query, selectedEra]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedEra]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  return (
    <>
      <PageHeader
        eyebrow="Encyclopedia"
        title="Daftar Seri Game Mortal Kombat"
        description="Eksplorasi seluruh rilis game Mortal Kombat dari era arcade klasik hingga New Era. Catatan: Konten DLC tidak termasuk dalam cakupan dataset proyek (PRD 6.1)."
        crumbs={[{ label: "Games" }]}
      />

      <Container className="py-10">
        <ListToolbar
          query={query}
          onQuery={setQuery}
          placeholder="Cari judul game, platform (SNES, PS4, PC…)"
          total={filtered.length}
        >
          <SelectFilter
            label="Era:"
            value={selectedEra}
            onChange={setSelectedEra}
            options={ERAS}
          />
        </ListToolbar>

        {loading ? (
          <LoadingState count={6} />
        ) : error ? (
          <ErrorState error={error} onRetry={reload} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Game tidak ditemukan"
            description="Tidak ada rilis game yang cocok dengan filter pencarian Anda."
            action={
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedEra("all");
                }}
                className="btn-primary"
              >
                Reset Filter
              </button>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {paginated.map((g) => (
                <EntityCard
                  key={g.id}
                  href={`/games/${g.id}`}
                  name={g.title}
                  subtitle={`${g.releaseYear} • ${g.era}`}
                  type="game"
                  image={g.image}
                  contextLabel={String(g.releaseYear)}
                  aspect="aspect-[3/4]"
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filtered.length}
              pageSize={PAGE_SIZE}
              itemName="game"
            />
          </>
        )}
      </Container>
    </>
  );
}
