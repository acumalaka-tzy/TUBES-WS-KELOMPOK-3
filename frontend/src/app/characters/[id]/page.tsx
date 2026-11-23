"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { getCharacter } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { entityHref } from "@/lib/routes";
import BreadcrumbNavigation from "@/components/encyclopedia/BreadcrumbNavigation";
import ArticleInfobox, { type InfoboxRow } from "@/components/encyclopedia/ArticleInfobox";
import RelationshipPanel from "@/components/encyclopedia/RelationshipPanel";
import SourceReference from "@/components/encyclopedia/SourceReference";
import { ErrorState, LoadingState } from "@/components/ui/States";

export default function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: character, error, loading, reload } = useAsync(() => getCharacter(id), [id]);
  const [selectedVersionId, setSelectedVersionId] = useState<string>("");

  useEffect(() => {
    if (character?.versions?.length) {
      setSelectedVersionId(character.versions[character.versions.length - 1].id);
    }
  }, [character]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <LoadingState variant="detail" />
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <ErrorState error={error} onRetry={reload} title="Karakter Tidak Ditemukan" />
      </div>
    );
  }

  const currentVersion =
    character.versions?.find((v) => v.id === selectedVersionId) ?? character.versions?.[0];

  const charImage = currentVersion?.image ?? character.image;

  // Siapkan data baris untuk Infobox Ensiklopedia
  const infoboxRows: InfoboxRow[] = [
    {
      label: "Nama Asli",
      value: character.aliases?.[0] ? (
        <span className="font-semibold text-mk-text">{character.aliases[0]}</span>
      ) : (
        character.name
      ),
    },
    {
      label: "Realm Asal",
      value: character.realm ? (
        <Link
          href={`/search?q=${encodeURIComponent(character.realm.name)}`}
          className="font-medium text-mk-red hover:underline"
        >
          {character.realm.name}
        </Link>
      ) : (
        "Tidak diketahui"
      ),
    },
    {
      label: "Spesies",
      value: character.species?.name ?? "Human / Mortal",
    },
    {
      label: "Afiliasi Klan",
      value: character.faction ? (
        <span className="font-medium text-mk-gold">{character.faction}</span>
      ) : (
        "Neutral"
      ),
    },
    {
      label: "Peran / Alignment",
      value: (
        <span className="inline-block rounded bg-mk-bg px-2 py-0.5 text-[10px] font-bold uppercase text-mk-text border border-mk-border/60">
          {character.role ?? "Fighter"}
        </span>
      ),
    },
    {
      label: "Kemunculan Pertama",
      value: character.firstAppearance ? (
        <Link
          href={`/games/${character.firstAppearance.id}`}
          className="font-medium text-mk-red hover:underline"
        >
          {character.firstAppearance.name}
        </Link>
      ) : (
        "Mortal Kombat (1992)"
      ),
    },
    {
      label: "Versi Game Aktif",
      value: currentVersion?.gameTitle ?? "Standar",
    },
    {
      label: "Timeline",
      value: currentVersion?.timelineName ?? "Original Timeline",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb Trail */}
      <BreadcrumbNavigation
        items={[
          { label: "Characters", href: "/characters" },
          { label: character.name },
        ]}
      />

      {/* Header Artikel & Judul */}
      <div className="border-b border-mk-border pb-5 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="rounded bg-mk-navy px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Karakter Kanonikal
          </span>
          {character.role && (
            <span className="rounded bg-mk-bg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mk-gold border border-mk-border">
              {character.role}
            </span>
          )}
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-mk-text">
          {character.name}
        </h1>

        {character.aliases && character.aliases.length > 0 && (
          <p className="mt-1 text-sm text-mk-muted italic">
            Dikenal juga sebagai: {character.aliases.join(", ")}
          </p>
        )}

        {/* Versi Game Selector (Tabs) */}
        {character.versions && character.versions.length > 1 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-mk-muted mr-1">Versi Game:</span>
            {character.versions.map((ver) => (
              <button
                key={ver.id}
                type="button"
                onClick={() => setSelectedVersionId(ver.id)}
                className={`rounded px-2.5 py-1 text-xs font-medium transition ${
                  selectedVersionId === ver.id
                    ? "bg-mk-red text-white font-bold shadow-2xs"
                    : "bg-mk-card border border-mk-border text-mk-muted hover:border-mk-gold hover:text-mk-text"
                }`}
              >
                {ver.gameTitle}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Layout Artikel Ensiklopedia: Kolom Kiri (Artikel) + Kolom Kanan (Infobox) */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* KOLOM KIRI: Isi Artikel Lengkap */}
        <article className="flex-1 min-w-0 space-y-10">
          {/* Ringkasan / Lead Paragraph */}
          <div className="rounded border border-mk-border/70 bg-mk-card p-5 shadow-2xs">
            <p className="text-sm sm:text-base leading-relaxed text-mk-text">
              <strong className="text-mk-red font-bold">{character.name}</strong> — {character.summary}
            </p>
          </div>



          {/* 1. Biografi & Sejarah */}
          <section id="biography" className="scroll-mt-24 space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-mk-text border-b border-mk-border pb-2 flex items-center gap-2">
              <span className="text-mk-red">§ 1.</span> Biografi &amp; Sejarah
            </h2>
            <div className="text-sm leading-relaxed text-mk-text/90 space-y-4">
              <p className="whitespace-pre-line">
                {character.biography || character.summary}
              </p>
            </div>
          </section>

          {/* 2. Kemampuan & Kekuatan */}
          <section id="abilities" className="scroll-mt-24 space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-mk-text border-b border-mk-border pb-2 flex items-center gap-2">
              <span className="text-mk-red">§ 2.</span> Kemampuan, Kekuatan &amp; Special Moves
            </h2>
            {currentVersion?.abilities && currentVersion.abilities.length > 0 ? (
              <div className="grid gap-2.5 sm:grid-cols-2">
                {currentVersion.abilities.map((ab) => (
                  <Link
                    key={ab.id}
                    href={`/abilities/${ab.id}`}
                    className="flex items-center justify-between p-3 rounded border border-mk-border bg-mk-card hover:border-mk-gold/70 transition shadow-2xs group"
                  >
                    <span className="font-semibold text-xs text-mk-text group-hover:text-mk-red transition-colors">
                      {ab.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-mk-muted">
                      Lihat Jurus →
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-mk-muted italic">
                Data jurus khusus untuk versi game ini belum tercatat dalam arsip.
              </p>
            )}
          </section>

          {/* 3. Senjata */}
          <section id="weapons" className="scroll-mt-24 space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-mk-text border-b border-mk-border pb-2 flex items-center gap-2">
              <span className="text-mk-red">§ 3.</span> Senjata &amp; Perlengkapan
            </h2>
            {currentVersion?.weapons && currentVersion.weapons.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {currentVersion.weapons.map((wp) => (
                  <Link
                    key={wp.id}
                    href={`/weapons/${wp.id}`}
                    className="inline-flex items-center gap-1.5 rounded border border-mk-border bg-mk-card px-3 py-1.5 text-xs text-mk-text hover:border-mk-red transition shadow-2xs"
                  >
                    <span className="text-mk-gold font-bold">🗡</span>
                    <span className="font-medium">{wp.name}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-mk-muted italic">
                Karakter bertarung dengan tangan kosong atau kekuatan magis murni pada versi ini.
              </p>
            )}
          </section>

          {/* 4. Relationships */}
          <section id="relationships" className="scroll-mt-24 space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-mk-text border-b border-mk-border pb-2 flex items-center gap-2">
              <span className="text-mk-red">§ 4.</span> Hubungan Karakter (Relationships)
            </h2>
            <RelationshipPanel relationships={character.relationships ?? []} />
          </section>

          {/* 5. Appearances */}
          <section id="appearances" className="scroll-mt-24 space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-mk-text border-b border-mk-border pb-2 flex items-center gap-2">
              <span className="text-mk-red">§ 5.</span> Daftar Kemunculan Game Standalone
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {character.versions?.map((ver) => (
                <Link
                  key={ver.id}
                  href={`/games/${ver.gameId}`}
                  className="group rounded border border-mk-border bg-mk-card p-3 hover:border-mk-gold/70 transition shadow-2xs"
                >
                  <p className="font-heading text-sm font-bold text-mk-text group-hover:text-mk-red transition-colors line-clamp-1">
                    {ver.gameTitle}
                  </p>
                  <p className="text-[10px] text-mk-muted mt-0.5">{ver.timelineName}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* 6. References & Provenance */}
          <section id="references" className="scroll-mt-24 space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-mk-text border-b border-mk-border pb-2 flex items-center gap-2">
              <span className="text-mk-red">§ 6.</span> Garis Waktu &amp; Sumber Referensi
            </h2>
            <SourceReference sources={character.sources ?? []} />
          </section>
        </article>

        {/* KOLOM KANAN: Infobox Ensiklopedia Klasik (Desktop Sticky) */}
        <div className="w-full lg:w-auto lg:sticky lg:top-24">
          <ArticleInfobox
            title={character.name}
            subtitle={character.faction ?? "Mortal Kombat"}
            image={charImage}
            imageAspect="aspect-[3/4]"
            objectPosition="object-top"
            rows={infoboxRows}
          />
        </div>
      </div>
    </div>
  );
}
