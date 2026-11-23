"use client";

import Link from "next/link";
import { useRef } from "react";
import { getCharacters, getGames } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import type { GameEra } from "@/lib/types";
import { EntityCard } from "@/components/ui/Cards";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";

/** Carousel roster karakter populer (FR-01). */
export function PopularCharacters() {
  const { data, error, loading, reload } = useAsync(getCharacters, []);
  const scroller = useRef<HTMLUListElement>(null);
  const scroll = (dir: number) => scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  if (loading) return <LoadingState count={4} />;
  if (error) return <ErrorState error={error} onRetry={reload} />;
  const popular = (data ?? []).filter((c) => c.popular);
  if (!popular.length) return <EmptyState title="Belum ada karakter populer" />;

  return (
    <div className="relative">
      <div className="absolute -top-14 right-0 hidden gap-2 sm:flex">
        <button type="button" aria-label="Geser kiri" onClick={() => scroll(-1)} className="btn-ghost !px-3">
          ←
        </button>
        <button type="button" aria-label="Geser kanan" onClick={() => scroll(1)} className="btn-ghost !px-3">
          →
        </button>
      </div>
      <ul ref={scroller} className="scrollbar-thin -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
        {popular.map((c) => {
          const v = c.versions[c.versions.length - 1];
          return (
            <li key={c.id} className="w-44 shrink-0 snap-start sm:w-56">
              <EntityCard
                href={`/characters/${c.id}`}
                name={c.name}
                subtitle={c.summary}
                type="character"
                image={v?.image ?? c.image}
                contextLabel={v ? v.gameTitle : undefined}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const ERA_ORDER: GameEra[] = ["Classic Era", "3D Era", "Reboot Era", "New Era", "Spin-off"];

/** Timeline era game (FR-01: game yang tersedia). */
export function GameEras() {
  const { data, error, loading, reload } = useAsync(getGames, []);
  if (loading) return <LoadingState variant="list" count={2} />;
  if (error) return <ErrorState error={error} onRetry={reload} />;
  if (!data?.length) return <EmptyState title="Belum ada data game" />;

  const eras = ERA_ORDER.map((era) => ({ era, games: data.filter((g) => g.era === era).sort((a, b) => a.releaseYear - b.releaseYear) })).filter((e) => e.games.length);

  return (
    <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {eras.map(({ era, games }) => (
        <li key={era} className="panel rounded-sm p-5">
          <p className="font-display text-2xl tracking-wider text-mk-gold">{era}</p>
          <p className="text-xs text-mk-muted">
            {games[0].releaseYear} – {games[games.length - 1].releaseYear}
          </p>
          <ul className="mt-4 space-y-2">
            {games.map((g) => (
              <li key={g.id}>
                <Link href={`/games/${g.id}`} className="flex items-center justify-between gap-2 text-sm hover:text-mk-gold">
                  <span className="truncate">{g.title}</span>
                  <span className="shrink-0 text-xs text-mk-muted">{g.releaseYear}</span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
