import Link from "next/link";
import type { Game } from "@/lib/types";
import EntityImage from "@/components/ui/EntityImage";

export default function GameCard({
  game,
  aspect = "aspect-[3/4]",
}: {
  game: Game;
  aspect?: string;
}) {
  return (
    <Link
      href={`/games/${game.id}`}
      className="group flex flex-col overflow-hidden rounded border border-mk-border bg-mk-card transition duration-200 hover:-translate-y-0.5 hover:border-mk-gold/70 hover:shadow-md"
    >
      <div className="relative overflow-hidden bg-mk-bg">
        <EntityImage
          image={game.image}
          name={game.title}
          aspect={aspect}
          className="transition-transform duration-300 group-hover:scale-102"
        />
        <span className="absolute left-2 top-2 rounded bg-mk-navy/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
          {game.releaseYear}
        </span>
        <span className="absolute right-2 top-2 rounded bg-mk-red/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
          {game.era}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="font-heading text-sm sm:text-base font-bold text-mk-text group-hover:text-mk-red transition-colors line-clamp-1">
          {game.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-xs text-mk-muted leading-relaxed">
          {game.summary}
        </p>

        {game.platforms && game.platforms.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {game.platforms.slice(0, 3).map((plat) => (
              <span
                key={plat}
                className="rounded bg-mk-bg px-1.5 py-0.5 text-[10px] text-mk-muted border border-mk-border/60"
              >
                {plat}
              </span>
            ))}
            {game.platforms.length > 3 && (
              <span className="text-[10px] text-mk-muted px-1">+{game.platforms.length - 3}</span>
            )}
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between text-[11px] text-mk-muted border-t border-mk-border/40">
          <span className="font-medium text-mk-text/80">{game.developer ?? "Midway / NRS"}</span>
          <span className="text-mk-red font-semibold group-hover:translate-x-0.5 transition-transform">
            Eksplor →
          </span>
        </div>
      </div>
    </Link>
  );
}
