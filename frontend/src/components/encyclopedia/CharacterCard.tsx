import Link from "next/link";
import type { Character } from "@/lib/types";
import EntityImage from "@/components/ui/EntityImage";

export default function CharacterCard({
  character,
  aspect = "aspect-[4/5]",
}: {
  character: Character;
  aspect?: string;
}) {
  const latestVer = character.versions?.[character.versions.length - 1];
  const charImage = latestVer?.image ?? character.image;

  return (
    <Link
      href={`/characters/${character.id}`}
      className="group flex flex-col overflow-hidden rounded border border-mk-border bg-mk-card transition duration-200 hover:-translate-y-0.5 hover:border-mk-gold/70 hover:shadow-md"
    >
      <div className="relative overflow-hidden bg-mk-bg">
        <EntityImage
          image={charImage}
          name={character.name}
          aspect={aspect}
          objectPosition="object-top"
          className="transition-transform duration-300 group-hover:scale-102"
        />
        {character.realm && (
          <span className="absolute left-2 top-2 rounded bg-mk-navy/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-xs">
            {character.realm.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-base font-bold text-mk-text group-hover:text-mk-red transition-colors line-clamp-1">
            {character.name}
          </h3>
          {character.role && (
            <span className="shrink-0 rounded bg-mk-bg px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-mk-gold border border-mk-border/60">
              {character.role}
            </span>
          )}
        </div>

        {character.aliases && character.aliases.length > 0 && character.aliases[0] && (
          <p className="mt-0.5 text-[11px] italic text-mk-muted line-clamp-1">
            Alias: {character.aliases[0]}
          </p>
        )}

        <p className="mt-2 line-clamp-2 text-xs text-mk-muted leading-relaxed">
          {character.summary}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between text-[11px] text-mk-muted border-t border-mk-border/40">
          <span className="font-medium text-mk-text/80">{character.faction ?? "Neutral"}</span>
          <span className="text-mk-red font-semibold group-hover:translate-x-0.5 transition-transform">
            Detail →
          </span>
        </div>
      </div>
    </Link>
  );
}
