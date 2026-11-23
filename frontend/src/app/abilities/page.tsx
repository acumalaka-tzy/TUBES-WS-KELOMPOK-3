"use client";

import { useMemo, useState, useEffect } from "react";
import { getAbilities } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { InfoCard } from "@/components/ui/Cards";
import { Container, PageHeader } from "@/components/ui/Layout";
import ListToolbar, { SelectFilter } from "@/components/ui/ListToolbar";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";
import Pagination from "@/components/ui/Pagination";

const PAGE_SIZE = 15;

const CAT_LABELS: Record<string, string> = {
  all: "Semua Kategori",
  ability: "Kemampuan Pasif/Elemen",
  "special-move": "Special Move",
  fatality: "Fatality",
  brutality: "Brutality",
  friendship: "Friendship",
};

export default function AbilitiesPage() {
  const { data, error, loading, reload } = useAsync(getAbilities, []);
  const [query, setQuery] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [selectedElement, setSelectedElement] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const elementOptions = useMemo(() => {
    const set = new Set<string>();
    data?.forEach((a) => {
      if (a.element) set.add(a.element);
    });
    return [
      { value: "all", label: "Semua Elemen" },
      ...Array.from(set).map((e) => ({ value: e, label: e })),
    ];
  }, [data]);

  const catOptions = [
    { value: "all", label: "Semua Kategori" },
    { value: "ability", label: "Kemampuan Umum" },
    { value: "special-move", label: "Special Moves" },
    { value: "fatality", label: "Fatalities" },
    { value: "brutality", label: "Brutalities" },
    { value: "friendship", label: "Friendship" },
  ];

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.toLowerCase().trim();
    return data.filter((a) => {
      const matchQ =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.characters.some((c) => c.name.toLowerCase().includes(q));
      const matchCat = selectedCat === "all" || a.category === selectedCat;
      const matchElem = selectedElement === "all" || a.element === selectedElement;
      return matchQ && matchCat && matchElem;
    });
  }, [data, query, selectedCat, selectedElement]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, selectedCat, selectedElement]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  return (
    <>
      <PageHeader
        eyebrow="Encyclopedia"
        title="Kemampuan &amp; Jurus (Abilities &amp; Moves)"
        description="Daftar kemampuan magis, jurus khusus, serta finisher (Fatalities, Brutalities, Friendship) karakter Mortal Kombat (FR-11)."
        crumbs={[{ label: "Abilities" }]}
      />

      <Container className="py-10">
        <ListToolbar
          query={query}
          onQuery={setQuery}
          placeholder="Cari kemampuan, elemen (Fire, Ice…), atau pengguna"
          total={filtered.length}
        >
          <SelectFilter
            label="Kategori:"
            value={selectedCat}
            onChange={setSelectedCat}
            options={catOptions}
          />
          <SelectFilter
            label="Elemen:"
            value={selectedElement}
            onChange={setSelectedElement}
            options={elementOptions}
          />
        </ListToolbar>

        {loading ? (
          <LoadingState count={6} />
        ) : error ? (
          <ErrorState error={error} onRetry={reload} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Kemampuan tidak ditemukan"
            description="Tidak ada kemampuan atau jurus yang cocok dengan filter yang dipilih."
          />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((a) => (
                <InfoCard
                  key={a.id}
                  href={`/abilities/${a.id}`}
                  title={a.name}
                  description={a.description}
                  badges={
                    <>
                      <span className="rounded-sm border border-mk-border bg-mk-bg px-2 py-0.5 text-[10px] uppercase tracking-wider text-mk-muted">
                        {CAT_LABELS[a.category] ?? a.category}
                      </span>
                      {a.element && (
                        <span className="rounded-sm border border-orange-500/40 bg-orange-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-orange-300">
                          Elemen: {a.element}
                        </span>
                      )}
                    </>
                  }
                  meta={
                    <div className="flex items-center justify-between">
                      <span>{a.characters.length} Karakter</span>
                      <span>{a.games.length} Game</span>
                    </div>
                  }
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filtered.length}
              pageSize={PAGE_SIZE}
              itemName="kemampuan"
            />
          </>
        )}
      </Container>
    </>
  );
}
