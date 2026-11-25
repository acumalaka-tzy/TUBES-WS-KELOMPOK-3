"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import { getCharacter, getGames } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import BreadcrumbNavigation from "@/components/encyclopedia/BreadcrumbNavigation";
import ArticleInfobox, { type InfoboxRow } from "@/components/encyclopedia/ArticleInfobox";
import RelationshipPanel from "@/components/encyclopedia/RelationshipPanel";
import SourceReference from "@/components/encyclopedia/SourceReference";
import { ErrorState, LoadingState } from "@/components/ui/States";
import type { ImageAsset } from "@/lib/types";

export default function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: character, error, loading, reload } = useAsync(() => getCharacter(id), [id]);
  const { data: allGames } = useAsync(getGames, []);

  const [selectedVersionId, setSelectedVersionId] = useState<string>("");
  const [selectedEra, setSelectedEra] = useState<string>("all");

  useEffect(() => {
    if (character?.versions?.length) {
      setSelectedVersionId(character.versions[character.versions.length - 1].id);
    }
  }, [character]);

  // Kumpulkan seluruh data game yang memuat karakter ini
  const appearedGames = useMemo(() => {
    if (!character) return [];

    const map = new Map<
      string,
      {
        id: string;
        title: string;
        shortTitle?: string;
        releaseYear?: number;
        era?: string;
        platforms?: string[];
        image?: ImageAsset;
        timelineName?: string;
        isFirstAppearance?: boolean;
      }
    >();

    // 1. Dari versions karakter (versi per game yang playable)
    character.versions?.forEach((ver) => {
      map.set(ver.gameId, {
        id: ver.gameId,
        title: ver.gameTitle,
        timelineName: ver.timelineName,
      });
    });

    // 2. Dari field firstAppearance karakter
    if (character.firstAppearance) {
      const existing = map.get(character.firstAppearance.id);
      map.set(character.firstAppearance.id, {
        id: character.firstAppearance.id,
        title: character.firstAppearance.name,
        timelineName: existing?.timelineName,
        isFirstAppearance: true,
      });
    }

    // 3. Sinkronkan dengan koleksi allGames (melalui characters array di game)
    if (allGames) {
      allGames.forEach((g) => {
        const hasChar = g.characters?.some(
          (c) =>
            c.id === character.id ||
            c.name.toLowerCase() === character.name.toLowerCase()
        );
        if (hasChar) {
          const existing = map.get(g.id);
          map.set(g.id, {
            id: g.id,
            title: g.title,
            shortTitle: g.shortTitle,
            releaseYear: g.releaseYear,
            era: g.era,
            platforms: g.platforms,
            image: g.image,
            timelineName: g.timeline?.name ?? existing?.timelineName,
            isFirstAppearance:
              existing?.isFirstAppearance ||
              character.firstAppearance?.id === g.id,
          });
        } else if (map.has(g.id)) {
          // Perkaya data game yang sudah masuk dari versions
          const existing = map.get(g.id)!;
          map.set(g.id, {
            ...existing,
            title: g.title,
            shortTitle: g.shortTitle,
            releaseYear: g.releaseYear,
            era: g.era,
            platforms: g.platforms,
            image: g.image,
            timelineName: g.timeline?.name ?? existing.timelineName,
            isFirstAppearance:
              existing.isFirstAppearance ||
              character.firstAppearance?.id === g.id,
          });
        }
      });
    }

    const list = Array.from(map.values());
    // Urutkan kronologis berdasarkan tahun rilis
    list.sort((a, b) => (a.releaseYear ?? 9999) - (b.releaseYear ?? 9999));

    // Jika belum ada yang ditandai debut, tandai yang pertama secara rilis
    if (list.length > 0 && !list.some((g) => g.isFirstAppearance)) {
      list[0].isFirstAppearance = true;
    }

    return list;
  }, [character, allGames]);

  // Game kemunculan pertama (Debut)
  const firstGame = useMemo(() => {
    if (!character) return null;
    if (character.firstAppearance) {
      const fromAll = allGames?.find((g) => g.id === character.firstAppearance?.id);
      if (fromAll) return fromAll;
    }
    const foundFirst = appearedGames.find((g) => g.isFirstAppearance);
    if (foundFirst) {
      const fromAll = allGames?.find((g) => g.id === foundFirst.id);
      return fromAll ?? foundFirst;
    }
    return appearedGames[0] ?? null;
  }, [character, allGames, appearedGames]);

  // Daftar era kemunculan untuk filter kategori
  const erasPresent = useMemo(() => {
    const set = new Set<string>();
    appearedGames.forEach((g) => {
      if (g.era) set.add(g.era);
    });
    return Array.from(set);
  }, [appearedGames]);

  // Filter game kemunculan berdasarkan era
  const filteredAppearedGames = useMemo(() => {
    if (selectedEra === "all") return appearedGames;
    return appearedGames.filter((g) => g.era === selectedEra);
  }, [appearedGames, selectedEra]);

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
      label: "Tempat / Realm Asal",
      value: character.realm ? (
        <Link
          href={`/search?q=${encodeURIComponent(character.realm.name)}`}
          className="font-medium text-mk-red hover:underline inline-flex items-center gap-1.5"
        >
          <span>🌍</span>
          <span>{character.realm.name}</span>
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
      label: "Kemunculan Pertama (Game)",
      value: (
        <Link
          href={`/games/${firstGame?.id ?? character.firstAppearance?.id ?? "mk1-1992"}`}
          className="font-semibold text-mk-red hover:underline inline-flex items-center gap-1.5"
        >
          <span>🎮</span>
          <span>{firstGame?.title ?? character.firstAppearance?.name ?? "Mortal Kombat (1992)"}</span>
        </Link>
      ),
    },
    {
      label: "Tahun Debut Rilis",
      value: (
        <span className="inline-flex items-center gap-1 font-mono text-mk-gold font-bold">
          <span>📅</span>
          <span>{firstGame?.releaseYear ?? 1992}</span>
        </span>
      ),
    },
    {
      label: "Total Game Kemunculan",
      value: (
        <span className="inline-flex items-center gap-1 font-semibold text-mk-gold">
          <span>⚔️</span>
          <span>{appearedGames.length} Seri Game</span>
        </span>
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
          {character.realm && (
            <span className="rounded bg-mk-bg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-mk-muted border border-mk-border">
              Asal: {character.realm.name}
            </span>
          )}
          <span className="rounded bg-mk-red/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mk-red border border-mk-red/30">
            Debut: {firstGame?.title ?? character.firstAppearance?.name ?? "Mortal Kombat (1992)"}
          </span>
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

          {/* Sorotan Asal Usul & Kemunculan Perdana */}
          <div className="rounded border border-mk-red/40 bg-gradient-to-r from-mk-red/10 via-mk-card to-mk-bg2 p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-mk-border/60 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌟</span>
                <h3 className="font-heading text-base font-bold text-mk-text">
                  Asal Usul &amp; Kemunculan Perdana
                </h3>
              </div>
              <span className="rounded bg-mk-red/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mk-red border border-mk-red/40">
                Debut Canon
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {/* Tempat / Realm Asal */}
              <div className="rounded border border-mk-border/70 bg-mk-bg/80 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mk-muted">
                  <span>🌍</span>
                  <span>Tempat / Realm Asal</span>
                </div>
                <p className="font-heading text-base font-bold text-mk-text">
                  {character.realm ? (
                    <Link
                      href={`/search?q=${encodeURIComponent(character.realm.name)}`}
                      className="text-mk-gold hover:underline"
                    >
                      {character.realm.name}
                    </Link>
                  ) : (
                    "Tidak diketahui"
                  )}
                </p>
                <p className="text-[11px] text-mk-muted">
                  Spesies: {character.species?.name ?? "Human / Mortal"}
                </p>
              </div>

              {/* Game Debut */}
              <div className="rounded border border-mk-border/70 bg-mk-bg/80 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mk-muted">
                  <span>🎮</span>
                  <span>Debut Pertama Kali</span>
                </div>
                <p className="font-heading text-base font-bold text-mk-text">
                  <Link
                    href={`/games/${firstGame?.id ?? character.firstAppearance?.id ?? "mk1-1992"}`}
                    className="text-mk-red hover:underline line-clamp-1"
                  >
                    {firstGame?.title ?? character.firstAppearance?.name ?? "Mortal Kombat (1992)"}
                  </Link>
                </p>
                <p className="text-[11px] text-mk-muted">
                  Tahun Rilis: <strong className="text-mk-gold font-mono">{firstGame?.releaseYear ?? 1992}</strong>
                  {firstGame?.era && ` (${firstGame.era})`}
                </p>
              </div>

              {/* Total Kemunculan */}
              <div className="rounded border border-mk-border/70 bg-mk-bg/80 p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mk-muted">
                  <span>⚔️</span>
                  <span>Jangkauan Franchise</span>
                </div>
                <p className="font-heading text-base font-bold text-mk-gold">
                  {appearedGames.length} Seri Game
                </p>
                <p className="text-[11px] text-mk-muted">
                  Tampil lintas {erasPresent.length} Era Mortal Kombat
                </p>
              </div>
            </div>
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

          {/* 5. Appearances (Daftar Game Kemunculan Lengkap) */}
          <section id="appearances" className="scroll-mt-24 space-y-4">
            <div className="border-b border-mk-border pb-2 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-mk-text flex items-center gap-2">
                <span className="text-mk-red">§ 5.</span> Daftar Kemunculan di Game Mortal Kombat
                <span className="rounded-full bg-mk-red/10 border border-mk-red/30 px-2.5 py-0.5 text-xs font-mono font-bold text-mk-red">
                  {appearedGames.length} Game
                </span>
              </h2>

              {/* Filter Era */}
              {erasPresent.length > 1 && (
                <div className="flex flex-wrap items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedEra("all")}
                    className={`rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                      selectedEra === "all"
                        ? "bg-mk-red text-white"
                        : "bg-mk-card border border-mk-border text-mk-muted hover:text-mk-text"
                    }`}
                  >
                    Semua ({appearedGames.length})
                  </button>
                  {erasPresent.map((era) => (
                    <button
                      key={era}
                      type="button"
                      onClick={() => setSelectedEra(era)}
                      className={`rounded px-2.5 py-1 text-[11px] font-semibold transition ${
                        selectedEra === era
                          ? "bg-mk-red text-white"
                          : "bg-mk-card border border-mk-border text-mk-muted hover:text-mk-text"
                      }`}
                    >
                      {era}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="text-xs text-mk-muted">
              Daftar seluruh judul game Mortal Kombat yang secara resmi memuat karakter{" "}
              <strong className="text-mk-text">{character.name}</strong>, diurutkan secara kronologis berdasarkan tahun rilis:
            </p>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filteredAppearedGames.map((g) => (
                <Link
                  key={g.id}
                  href={`/games/${g.id}`}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded border p-4 transition shadow-2xs hover:-translate-y-0.5 hover:shadow-md ${
                    g.isFirstAppearance
                      ? "border-mk-red/70 bg-gradient-to-br from-mk-red/10 via-mk-card to-mk-card hover:border-mk-red"
                      : "border-mk-border bg-mk-card hover:border-mk-gold/70"
                  }`}
                >
                  {/* Badge Kemunculan Pertama / Debut */}
                  {g.isFirstAppearance && (
                    <div className="mb-2 inline-flex items-center gap-1 self-start rounded bg-mk-red px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow-2xs">
                      <span>★</span>
                      <span>Debut / Pertama Kali Muncul</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-heading text-sm sm:text-base font-bold text-mk-text group-hover:text-mk-red transition-colors line-clamp-2">
                        {g.title}
                      </h3>
                      {g.releaseYear && (
                        <span className="shrink-0 rounded bg-mk-bg px-2 py-0.5 font-mono text-xs font-bold text-mk-gold border border-mk-border/60">
                          {g.releaseYear}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px]">
                      {g.era && (
                        <span className="rounded bg-mk-bg px-1.5 py-0.5 font-medium text-mk-muted border border-mk-border/50">
                          {g.era}
                        </span>
                      )}
                      {g.timelineName && (
                        <span className="rounded bg-mk-bg px-1.5 py-0.5 text-mk-muted border border-mk-border/50">
                          {g.timelineName}
                        </span>
                      )}
                    </div>

                    {g.platforms && g.platforms.length > 0 && (
                      <p className="mt-2 text-[10px] text-mk-muted line-clamp-1">
                        Platform: {g.platforms.slice(0, 3).join(", ")}
                        {g.platforms.length > 3 ? "..." : ""}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-2 border-t border-mk-border/40 flex items-center justify-between text-[11px]">
                    <span className="text-mk-muted group-hover:text-mk-text transition-colors">
                      Lihat Detail Game
                    </span>
                    <span className="text-mk-red font-bold group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
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
