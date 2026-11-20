"use client";

import Link from "next/link";
import { use } from "react";
import { getGame } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { entityHref } from "@/lib/routes";
import { TypeBadge } from "@/components/ui/Badge";
import { EntityLinks } from "@/components/ui/Cards";
import EntityImage from "@/components/ui/EntityImage";
import { Breadcrumbs, Container, InfoGrid, Section, SourceList } from "@/components/ui/Layout";
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
      <Container className="py-12">
        <LoadingState variant="detail" />
      </Container>
    );
  }

  if (error || !game) {
    return (
      <Container className="py-12">
        <ErrorState error={error} onRetry={reload} title="Game tidak ditemukan" />
      </Container>
    );
  }

  return (
    <>
      {/* Game Hero */}
      <section className="hero-bg relative border-b border-mk-border">
        <Container className="py-10">
          <Breadcrumbs
            items={[
              { label: "Games", href: "/games" },
              { label: game.title },
            ]}
          />

          <div className="mt-8 grid gap-8 md:grid-cols-12 lg:gap-12">
            {/* Game Cover Art */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="overflow-hidden rounded-sm border border-mk-border bg-mk-card shadow-2xl">
                <EntityImage
                  image={game.image}
                  name={game.title}
                  aspect="aspect-[3/4]"
                  priority
                  showNotice
                />
              </div>
            </div>

            {/* Game Metadata */}
            <div className="flex flex-col justify-center space-y-4 md:col-span-7 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2">
                <TypeBadge type="game" />
                <span className="rounded-sm border border-mk-gold/40 bg-mk-card px-2 py-0.5 text-xs text-mk-gold uppercase tracking-wider">
                  {game.era}
                </span>
                <span className="rounded-sm border border-mk-border bg-mk-card px-2 py-0.5 text-xs text-mk-muted">
                  Tahun Rilis: {game.releaseYear}
                </span>
              </div>

              <h1 className="font-heading text-4xl font-extrabold tracking-wide sm:text-5xl text-glow">
                {game.title}
              </h1>

              <p className="text-base leading-relaxed text-mk-text/90 sm:text-lg">
                {game.summary}
              </p>

              {/* Platforms */}
              <div className="pt-2">
                <p className="text-xs uppercase tracking-wider text-mk-muted">Platform Rilis:</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {game.platforms.map((p) => (
                    <span
                      key={p}
                      className="rounded-sm border border-mk-border bg-mk-bg2 px-2.5 py-1 text-xs text-mk-text"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Details (FR-10 Game Encyclopedia) */}
      <Container className="space-y-12 py-12">
        <Section title="Informasi Rilis & Detail Teknis">
          <InfoGrid
            items={[
              { label: "Tahun Rilis", value: String(game.releaseYear) },
              { label: "Era", value: game.era },
              { label: "Tipe Game", value: game.gameType },
              { label: "Developer", value: game.developer ?? "-" },
              { label: "Publisher", value: game.publisher ?? "-" },
              {
                label: "Timeline Terkait",
                value: game.timeline ? (
                  <Link href={entityHref(game.timeline)} className="text-mk-gold hover:underline">
                    {game.timeline.name}
                  </Link>
                ) : (
                  "-"
                ),
              },
            ]}
          />
        </Section>

        {/* Character Roster (Non-DLC / Base Game) */}
        <Section
          title={`Daftar Karakter (${game.characters?.length ?? 0})`}
          action={
            <span className="text-xs text-mk-muted">
              Hanya mencakup karakter konten dasar (non-DLC) sesuai PRD 6.1
            </span>
          }
        >
          <EntityLinks items={game.characters} empty="Belum ada daftar karakter tercatat." />
        </Section>

        {/* Sources / Provenance */}
        <Section title="Sumber Informasi & Provenance">
          <SourceList sources={game.sources} />
        </Section>
      </Container>
    </>
  );
}
