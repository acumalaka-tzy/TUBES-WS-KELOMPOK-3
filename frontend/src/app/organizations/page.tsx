"use client";

import { useMemo, useState } from "react";
import { getOrganizations } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { InfoCard } from "@/components/ui/Cards";
import { Container, PageHeader } from "@/components/ui/Layout";
import ListToolbar, { SelectFilter } from "@/components/ui/ListToolbar";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";

const KIND_OPTIONS = [
  { value: "all", label: "Semua Tipe" },
  { value: "clan", label: "Klan Ninja (Shirai Ryu, Lin Kuei)" },
  { value: "organization", label: "Organisasi (Special Forces, White Lotus)" },
  { value: "faction", label: "Faksi / Kekaisaran (Outworld)" },
];

export default function OrganizationsPage() {
  const { data, error, loading, reload } = useAsync(getOrganizations, []);
  const [query, setQuery] = useState("");
  const [selectedKind, setSelectedKind] = useState("all");

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.toLowerCase().trim();
    return data.filter((o) => {
      const matchQ =
        !q ||
        o.name.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        (o.leader?.name && o.leader.name.toLowerCase().includes(q)) ||
        o.members.some((m) => m.name.toLowerCase().includes(q));
      const matchKind = selectedKind === "all" || o.kind === selectedKind;
      return matchQ && matchKind;
    });
  }, [data, query, selectedKind]);

  return (
    <>
      <PageHeader
        eyebrow="Encyclopedia"
        title="Klan, Organisasi, &amp; Faksi"
        description="Faksi dan kelompok yang bersaing dalam dunia Mortal Kombat: klan ninja Lin Kuei dan Shirai Ryu, pasukan pelindung Special Forces, White Lotus Society, hingga Kekaisaran Outworld (FR-13)."
        crumbs={[{ label: "Organizations" }]}
      />

      <Container className="py-10">
        <ListToolbar
          query={query}
          onQuery={setQuery}
          placeholder="Cari klan, organisasi, atau anggota…"
          total={filtered.length}
        >
          <SelectFilter
            label="Tipe:"
            value={selectedKind}
            onChange={setSelectedKind}
            options={KIND_OPTIONS}
          />
        </ListToolbar>

        {loading ? (
          <LoadingState count={4} />
        ) : error ? (
          <ErrorState error={error} onRetry={reload} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Organisasi tidak ditemukan"
            description="Tidak ada klan atau organisasi yang cocok dengan kriteria pencarian."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((o) => (
              <InfoCard
                key={o.id}
                href={`/organizations/${o.id}`}
                title={o.name}
                description={o.description}
                badges={
                  <span className="rounded-sm border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-300">
                    {o.kind}
                  </span>
                }
                meta={
                  <div className="space-y-1">
                    {o.leader && (
                      <p>
                        <strong className="text-mk-text">Pemimpin:</strong> {o.leader.name}
                      </p>
                    )}
                    <p>
                      {o.members.length} Anggota • {o.rivals.length} Klan Rival
                    </p>
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
