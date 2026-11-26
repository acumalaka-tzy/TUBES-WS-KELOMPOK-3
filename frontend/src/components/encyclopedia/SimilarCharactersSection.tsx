import Link from "next/link";
import EntityImage from "@/components/ui/EntityImage";
import type { CharacterRecommendation } from "@/lib/character-recommendations";

export default function SimilarCharactersSection({
  recommendations,
}: {
  recommendations: CharacterRecommendation[];
}) {
  if (!recommendations.length) return null;

  return (
    <section
      id="recommendations"
      aria-labelledby="similar-characters-heading"
      className="mt-12 border-t border-mk-border pt-10 space-y-5 scroll-mt-24"
    >
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-mk-border pb-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-mk-gold">
            You May Also Like
          </span>
          <h2
            id="similar-characters-heading"
            className="mt-0.5 font-heading text-xl sm:text-2xl font-bold text-mk-text flex items-center gap-2"
          >
            <span className="text-mk-red">§ 7.</span> Karakter yang Mirip &amp; Berkaitan
          </h2>
        </div>

        <Link
          href="/characters"
          className="text-xs font-semibold uppercase tracking-wider text-mk-red hover:text-mk-gold transition-colors"
        >
          Semua Karakter →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {recommendations.map((rec) => {
          const { character, reason, primaryElement, clanBadge } = rec;
          const latestVer = character.versions?.[character.versions.length - 1];
          const charImage = latestVer?.image ?? character.image;

          return (
            <Link
              key={character.id}
              href={`/characters/${character.id}`}
              className="group flex flex-col overflow-hidden rounded border border-mk-border bg-mk-card transition duration-200 hover:-translate-y-0.5 hover:border-mk-gold/70 hover:shadow-md"
            >
              <div className="relative overflow-hidden bg-mk-bg">
                <EntityImage
                  image={charImage}
                  name={character.name}
                  aspect="aspect-[4/5]"
                  objectPosition="object-top"
                  className="transition-transform duration-300 group-hover:scale-102"
                />
                {character.realm?.name && (
                  <span className="absolute left-2 top-2 rounded bg-mk-navy/85 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
                    {character.realm.name}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-3">
                <h3 className="font-heading text-sm sm:text-base font-bold text-mk-text group-hover:text-mk-red transition-colors line-clamp-1">
                  {character.name}
                </h3>

                {/* Badge Klan & Elemen */}
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {clanBadge && (
                    <span className="rounded bg-mk-bg px-1.5 py-0.5 text-[10px] font-semibold text-mk-gold border border-mk-border/60 line-clamp-1">
                      {clanBadge}
                    </span>
                  )}
                  {primaryElement && (
                    <span className="rounded bg-mk-bg px-1.5 py-0.5 text-[10px] font-medium text-mk-muted border border-mk-border/60">
                      {primaryElement}
                    </span>
                  )}
                </div>

                {/* Alasan rekomendasi singkat */}
                <div className="mt-auto pt-3 flex items-center justify-between gap-1 border-t border-mk-border/40 text-[11px]">
                  <span className="font-medium text-mk-red line-clamp-1" title={rec.reasons.join(" • ")}>
                    {reason}
                  </span>
                  <span className="shrink-0 font-semibold text-mk-gold group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
