"use client";

import { useMemo, useState } from "react";
import { getCharacters } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { EntityCard } from "@/components/ui/Cards";
import { Container, PageHeader } from "@/components/ui/Layout";
import ListToolbar, { SelectFilter } from "@/components/ui/ListToolbar";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";

export default function CharactersPage() {
  const { data, error, loading, reload } = useAsync(getCharacters, []);
  const [query, setQuery] = useState("");
  const [selectedRealm, setSelectedRealm] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");

  const realmOptions = useMemo(() => {
    const set = new Set<string>();
    data?.forEach((c) => {
      if (c.realm?.name) set.add(c.realm.name);
    });
    return [
      { value: "all", label: "Semua Realm" },
      ...Array.from(set).map((r) => ({ value: r, label: r })),
    ];
  }, [data]);

  const roleOptions = useMemo(() => {
    const set = new Set<string>();
    data?.forEach((c) => {
      if (c.role) set.add(c.role);
    });
    return [
      { value: "all", label: "Semua Role" },
      ...Array.from(set).map((r) => ({ value: r, label: r })),
    ];
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.toLowerCase().trim();
    return data.filter((c) => {
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.aliases.some((a) => a.toLowerCase().includes(q)) ||
        c.summary.toLowerCase().includes(q);
      const matchRealm = selectedRealm === "all" || c.realm?.name === selectedRealm;
      const matchRole = selectedRole === "all" || c.role === selectedRole;
      return matchQ && matchRealm && matchRole;
    });
  }, [data, query, selectedRealm, selectedRole]);

  return (
    <>
      <PageHeader
        eyebrow="Encyclopedia"
        title="Daftar Karakter Mortal Kombat"
        description="Jelajahi seluruh pejuang Mortal Kombat lintas game dan timeline. Klik karakter untuk melihat versi game, kemampuan, senjata, dan relasi cerita."
        crumbs={[{ label: "Characters" }]}
      />

      <Container className="py-10">
        <ListToolbar
          query={query}
          onQuery={setQuery}
          placeholder="Cari nama karakter, alias (Hanzo, Bi-Han…)"
          total={filtered.length}
        >
          <SelectFilter
            label="Realm:"
            value={selectedRealm}
            onChange={setSelectedRealm}
            options={realmOptions}
          />
          <SelectFilter
            label="Role:"
            value={selectedRole}
            onChange={setSelectedRole}
            options={roleOptions}
          />
        </ListToolbar>

        {loading ? (
          <LoadingState count={8} />
        ) : error ? (
          <ErrorState error={error} onRetry={reload} />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="Karakter tidak ditemukan"
            description="Tidak ada karakter yang cocok dengan kriteria pencarian Anda."
            action={
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedRealm("all");
                  setSelectedRole("all");
                }}
                className="btn-primary"
              >
                Reset Filter
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((c) => {
              const latestVer = c.versions[c.versions.length - 1];
              return (
                <EntityCard
                  key={c.id}
                  href={`/characters/${c.id}`}
                  name={c.name}
                  subtitle={c.summary}
                  type="character"
                  image={latestVer?.image ?? c.image}
                  contextLabel={latestVer?.gameTitle}
                />
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}
