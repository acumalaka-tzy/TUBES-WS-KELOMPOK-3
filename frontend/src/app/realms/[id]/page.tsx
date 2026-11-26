"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useMemo } from "react";
import { getCharacters, getRealm } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { TypeBadge, VerificationBadge } from "@/components/ui/Badge";
import { Breadcrumbs, Container, InfoGrid, Section, SourceList } from "@/components/ui/Layout";
import { ErrorState, LoadingState } from "@/components/ui/States";

const REALM_ICONS: Record<string, string> = {
  earthrealm: "🌏",
  outworld: "⚔️",
  netherrealm: "🔥",
  edenia: "🌸",
  orderrealm: "⚖️",
  chaosrealm: "🌀",
  vaeternus: "🦇",
};

export default function RealmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: realm, error, loading, reload } = useAsync(() => getRealm(id), [id]);
  const { data: allChars } = useAsync(getCharacters, []);

  // Filter petarung yang berasal dari realm ini
  const residentFighters = useMemo(() => {
    if (!realm || !allChars) return [];
    return allChars.filter(
      (c) =>
        c.realm?.id === realm.id ||
        c.realm?.name?.toLowerCase() === realm.name.toLowerCase() ||
        (realm.id === "orderrealm" && c.realm?.name?.toLowerCase().includes("seido"))
    );
  }, [realm, allChars]);

  if (loading) {
    return (
      <Container className="py-12">
        <LoadingState variant="detail" />
      </Container>
    );
  }

  if (error || !realm) {
    return (
      <Container className="py-12">
        <ErrorState error={error} onRetry={reload} title="Realm tidak ditemukan" />
      </Container>
    );
  }

  const icon = REALM_ICONS[realm.id] ?? "🌌";

  return (
    <>
      {/* Hero Banner Dimensi */}
      <section className="hero-bg border-b border-mk-border">
        <Container className="py-10">
          <Breadcrumbs
            items={[
              { label: "Realms", href: "/realms" },
              { label: realm.name },
            ]}
          />

          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <TypeBadge type="location" />
              <span className="rounded-sm border border-mk-gold/40 bg-mk-gold/10 px-2 py-0.5 text-xs uppercase tracking-wider text-mk-gold">
                Dimensi Utama
              </span>
              <VerificationBadge status="verified" />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-4xl sm:text-5xl">{icon}</span>
              <h1 className="font-heading text-4xl font-extrabold sm:text-5xl text-glow text-mk-text">
                {realm.name}
              </h1>
            </div>

            <p className="max-w-3xl text-base text-mk-muted sm:text-lg leading-relaxed">
              {realm.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Konten Utama */}
      <Container className="space-y-12 py-12">
        {/* Karakteristik & Geopolitik Dimensi */}
        <Section title="Karakteristik &amp; Geopolitik Dimensi">
          <InfoGrid
            items={[
              { label: "Klasifikasi Kosmik", value: "Alam Dimensi (Major Realm)" },
              { label: "Penguasa / Pelindung", value: realm.ruler ?? "Tidak Tercatat" },
              { label: "Ras Penduduk", value: realm.inhabitants ?? "Berbagai Ras" },
              {
                label: "Jumlah Petarung Kanonikal",
                value: `${residentFighters.length} Karakter Terdaftar`,
              },
            ]}
          />
        </Section>

        {/* Daftar Petarung Asal Dimensi Ini */}
        <Section
          title={`Petarung Asal ${realm.name}`}
          action={
            <span className="text-xs font-mono text-mk-muted">
              Menampilkan {residentFighters.length} petarung
            </span>
          }
        >
          {residentFighters.length === 0 ? (
            <p className="text-sm text-mk-muted italic">
              Belum ada petarung kanonikal yang terdaftar secara resmi berasal dari dimensi ini.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {residentFighters.map((c) => {
                const latestVersion = c.versions[c.versions.length - 1];
                return (
                  <Link
                    key={c.id}
                    href={`/characters/${c.id}`}
                    className="group flex flex-col justify-between overflow-hidden rounded-lg border border-mk-border bg-mk-card p-4 transition duration-200 hover:-translate-y-1 hover:border-mk-red hover:shadow-md"
                  >
                    <div>
                      {/* Avatar Karakter */}
                      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded bg-mk-bg/60 border border-mk-border/50">
                        {latestVersion?.image?.url ? (
                          <Image
                            src={latestVersion.image.url}
                            alt={c.name}
                            fill
                            className="object-cover object-top transition duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-heading text-3xl font-bold text-mk-muted/40">
                            {c.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>

                      <h3 className="font-heading text-base font-bold text-mk-text group-hover:text-mk-gold transition-colors">
                        {c.name}
                      </h3>

                      <p className="mt-1 text-xs text-mk-muted line-clamp-2 leading-relaxed">
                        {c.summary}
                      </p>
                    </div>

                    <div className="mt-4 border-t border-mk-border/50 pt-2.5 flex items-center justify-between text-[11px]">
                      <span className="text-mk-muted truncate max-w-[120px]">
                        {c.faction || c.species?.name || "Petarung"}
                      </span>
                      <span className="font-semibold text-mk-red group-hover:text-mk-gold transition-colors">
                        Profil →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Section>

        {/* Sumber & Verifikasi */}
        <Section title="Sumber &amp; Verifikasi Lore">
          <SourceList sources={realm.sources} />
        </Section>
      </Container>
    </>
  );
}
