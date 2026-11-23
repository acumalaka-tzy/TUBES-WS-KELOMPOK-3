"use client";

import Link from "next/link";
import { use } from "react";
import { getGame } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import BreadcrumbNavigation from "@/components/encyclopedia/BreadcrumbNavigation";
import ArticleInfobox, { type InfoboxRow } from "@/components/encyclopedia/ArticleInfobox";
import SourceReference from "@/components/encyclopedia/SourceReference";
import { ErrorState, LoadingState } from "@/components/ui/States";

export default function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: game, error, loading, reload } = useAsync(() => getGame(id), [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <LoadingState variant="detail" />
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <ErrorState error={error} onRetry={reload} title="Game Tidak Ditemukan" />
      </div>
    );
  }

  const infoboxRows: InfoboxRow[] = [
    {
      label: "Tahun Rilis",
      value: <span className="font-semibold text-mk-text">{game.releaseYear}</span>,
    },
    {
      label: "Era Seri",
      value: <span className="font-medium text-mk-gold">{game.era}</span>,
    },
    {
      label: "Pengembang",
      value: game.developer ?? "Midway Games / NetherRealm Studios",
    },
    {
      label: "Penerbit",
      value: game.publisher ?? "Warner Bros. Games / Midway",
    },
    {
      label: "Platform",
      value: game.platforms?.join(", ") ?? "Arcade, Konsol, PC",
    },
    {
      label: "Genre",
      value: game.gameType ?? "Fighting (2D/3D)",
    },
    {
      label: "Timeline",
      value: game.timeline?.name ?? "Timeline Kanonikal",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb Trail */}
      <BreadcrumbNavigation
        items={[
          { label: "Games", href: "/games" },
          { label: game.title },
        ]}
      />

      {/* Header Artikel Game */}
      <div className="border-b border-mk-border pb-5 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="rounded bg-mk-navy px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            Rilis Standalone
          </span>
          <span className="rounded bg-mk-bg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mk-gold border border-mk-border">
            {game.era}
          </span>
          <span className="text-xs text-mk-muted">• {game.releaseYear}</span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-mk-text">
          {game.title}
        </h1>
        {game.shortTitle && game.shortTitle !== game.title && (
          <p className="mt-1 text-sm text-mk-muted italic">Singkatan: {game.shortTitle}</p>
        )}
      </div>

      {/* Layout Artikel: Kolom Konten Kiri + Infobox Kanan */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* KOLOM KIRI: Konten Artikel Ensiklopedia */}
        <article className="flex-1 min-w-0 space-y-10">
          {/* Ringkasan Utama */}
          <div className="rounded border border-mk-border/70 bg-mk-card p-5 shadow-2xs">
            <p className="text-sm sm:text-base leading-relaxed text-mk-text">
              <strong className="text-mk-red font-bold">{game.title}</strong> adalah game pertarungan standalone kanonikal dalam franchise Mortal Kombat yang dirilis pada tahun {game.releaseYear}. {game.summary}
            </p>
          </div>



          {/* 1. Sinopsis & Story Overview */}
          <section id="overview" className="scroll-mt-24 space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-mk-text border-b border-mk-border pb-2 flex items-center gap-2">
              <span className="text-mk-red">§ 1.</span> Ikhtisar &amp; Sinopsis Cerita
            </h2>
            <div className="text-sm leading-relaxed text-mk-text/90 space-y-4">
              <p>{game.summary}</p>
              <p>
                Rilis ini merupakan tonggak penting dalam perkembangan naratif semesta Mortal Kombat pada {game.era}, menghadirkan pertarungan sengit antara pelindung Earthrealm melawan ancaman invasi dari dimensi lain.
              </p>
            </div>
          </section>

          {/* 2. Base Roster Karakter */}
          <section id="characters" className="scroll-mt-24 space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-mk-text border-b border-mk-border pb-2 flex items-center gap-2">
              <span className="text-mk-red">§ 2.</span> Daftar Karakter / Roster Petarung
            </h2>
            {game.characters && game.characters.length > 0 ? (
              <div className="grid gap-2.5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {game.characters.map((c) => (
                  <Link
                    key={c.id}
                    href={`/characters/${c.id}`}
                    className="flex items-center gap-2 p-2.5 rounded border border-mk-border bg-mk-card hover:border-mk-gold/70 transition group shadow-2xs"
                  >
                    <span className="text-xs text-mk-red">✦</span>
                    <span className="font-semibold text-xs text-mk-text group-hover:text-mk-red transition-colors truncate">
                      {c.name}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-mk-muted italic">Daftar roster karakter sedang disusun.</p>
            )}
          </section>

          {/* 3. Platform & Rilis */}
          <section id="platforms" className="scroll-mt-24 space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-mk-text border-b border-mk-border pb-2 flex items-center gap-2">
              <span className="text-mk-red">§ 3.</span> Informasi Teknis &amp; Platform
            </h2>
            <div className="rounded border border-mk-border bg-mk-card p-4 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div>
                  <span className="text-mk-muted block mb-1">Platform Kompatibel:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {game.platforms?.map((p) => (
                      <span
                        key={p}
                        className="rounded bg-mk-bg px-2 py-0.5 text-xs text-mk-text font-medium border border-mk-border/50"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-mk-muted block mb-1">Garis Waktu Kontinuitas:</span>
                  <span className="font-semibold text-mk-gold">
                    {game.timeline?.name ?? "Timeline Kanonikal"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Sumber Rujukan */}
          <section id="references" className="scroll-mt-24 space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-mk-text border-b border-mk-border pb-2 flex items-center gap-2">
              <span className="text-mk-red">§ 4.</span> Arsip &amp; Sumber Rujukan
            </h2>
            <SourceReference sources={game.sources ?? []} />
          </section>
        </article>

        {/* KOLOM KANAN: Infobox Game Klasik */}
        <div className="w-full lg:w-auto lg:sticky lg:top-24">
          <ArticleInfobox
            title={game.title}
            subtitle={`${game.releaseYear} • ${game.era}`}
            image={game.image}
            imageAspect="aspect-[3/4]"
            rows={infoboxRows}
          />
        </div>
      </div>
    </div>
  );
}
