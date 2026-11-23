import Link from "next/link";
import EntityImage from "@/components/ui/EntityImage";
import type { SearchResult as SearchResultType } from "@/lib/types";

export default function SearchResult({
  result,
}: {
  result: SearchResultType;
}) {
  const typeLabels: Record<string, string> = {
    character: "Karakter",
    game: "Game",
    ability: "Kemampuan",
    weapon: "Senjata",
    organization: "Klan / Organisasi",
    timeline: "Timeline",
    event: "Peristiwa",
    location: "Lokasi",
    species: "Spesies",
  };

  return (
    <li className="flex flex-col sm:flex-row gap-4 p-4 rounded border border-mk-border bg-mk-card hover:border-mk-gold/70 transition shadow-2xs">
      {result.image && (
        <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded border border-mk-border bg-mk-bg">
          <EntityImage
            image={result.image}
            name={result.name}
            aspect="aspect-square"
            objectPosition={result.type === "character" ? "object-top" : "object-center"}
          />
        </div>
      )}

      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded bg-mk-bg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mk-navy dark:text-blue-300 border border-mk-border/60">
            {typeLabels[result.type] ?? result.type}
          </span>
          <span className="text-[11px] text-mk-muted font-medium">
            Relevansi: {Math.round(result.relevance * 100)}%
          </span>
        </div>

        <h3 className="font-heading text-base font-bold text-mk-text hover:text-mk-red transition-colors">
          <Link href={result.href}>{result.name}</Link>
        </h3>

        <p className="text-xs text-mk-muted leading-relaxed line-clamp-2">
          {result.summary}
        </p>

        {result.explanation && (
          <p className="text-[11px] text-mk-text/75 italic bg-mk-bg/60 p-1.5 rounded border border-mk-border/40">
            💡 {result.explanation}
          </p>
        )}
      </div>
    </li>
  );
}
