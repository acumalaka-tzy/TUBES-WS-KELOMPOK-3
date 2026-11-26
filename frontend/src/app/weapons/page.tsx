"use client";

import { useMemo, useState } from "react";
import { getWeapons } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { InfoCard } from "@/components/ui/Cards";
import { Container, PageHeader } from "@/components/ui/Layout";
import ListToolbar, { SelectFilter } from "@/components/ui/ListToolbar";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";

export default function WeaponsPage() {
  const { data, error, loading, reload } = useAsync(getWeapons, []);
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const catOptions = useMemo(() => {
    const set = new Set<string>();
    data?.forEach((w) => {
      if (w.category) set.add(w.category);
    });
    return [
      { value: "all", label: "Semua Kategori Senjata" },
      ...Array.from(set).map((c) => ({ value: c, label: c })),
    ];
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.toLowerCase().trim();
    return data.filter((w) => {
      const matchQ =
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.characters.some((c) => c.name.toLowerCase().includes(q));
      const matchCat = selectedCat === "all" || w.category === selectedCat;
      return matchQ && matchCat;
    });
  }, [data, query, selectedCat]);

  return (
    <>
      <PageHeader
        eyebrow="Encyclopedia"
        title="Daftar Senjata Mortal Kombat"
        description="Eksplorasi senjata ikonik para pejuang Mortal Kombat seperti tombak kunai Scorpion, pedang es Sub-Zero, kipas baja Kitana, hingga topi Kung Lao."
        crumbs={[{ label: "Weapons" }]}
      />

      <Container className="py-10">
        <ListToolbar
          query={query}
          onQuery={setQuery}
          placeholder="Cari nama senjata atau penggunanya…"
          total={filtered.length}
        >
          <SelectFilter
            label="Kategori:"
            value={selectedCat}
            onChange={setSelectedCat}
            options={catOptions}
          />
        </ListToolbar>

        {loading ? (
          <LoadingState count={6} />
        ) : error ? (
          <ErrorState error={error} onRetry={reload} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Senjata tidak ditemukan"
            description="Tidak ada senjata yang cocok dengan kata kunci pencarian Anda."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((w) => (
              <InfoCard
                key={w.id}
                href={`/weapons/${w.id}`}
                title={w.name}
                description={w.description}
                badges={
                  <span className="rounded-sm border border-mk-border bg-mk-bg px-2 py-0.5 text-[10px] uppercase tracking-wider text-mk-gold">
                    {w.category}
                  </span>
                }
                meta={
                  <div className="flex items-center justify-between">
                    <span>{w.characters.length} Pengguna</span>
                    <span>{w.games.length} Game</span>
                  </div>
                }
              />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
