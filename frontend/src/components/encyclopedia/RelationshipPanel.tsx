import Link from "next/link";
import type { Relationship } from "@/lib/types";

export default function RelationshipPanel({
  relationships,
}: {
  relationships: Relationship[];
}) {
  if (!relationships || relationships.length === 0) {
    return (
      <p className="text-xs text-mk-muted italic">
        Belum ada data relasi kanonikal terverifikasi.
      </p>
    );
  }

  // Kelompokkan relasi berdasarkan tipe
  const groups: Record<string, Relationship[]> = {};
  for (const rel of relationships) {
    const label = rel.label || rel.type;
    if (!groups[label]) groups[label] = [];
    groups[label].push(rel);
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Object.entries(groups).map(([groupLabel, rels]) => (
        <div
          key={groupLabel}
          className="rounded border border-mk-border bg-mk-bg/50 p-3"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-mk-red" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-mk-gold">
              {groupLabel} ({rels.length})
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {rels.map((r, idx) => (
              <Link
                key={idx}
                href={`/characters/${r.target.id}`}
                className="group/tag inline-flex items-center gap-1 rounded border border-mk-border bg-mk-card px-2 py-1 text-xs text-mk-text hover:border-mk-red transition shadow-2xs"
              >
                <span className="font-medium group-hover/tag:text-mk-red">{r.target.name}</span>
                {r.context && r.context !== "Kanonikal" && (
                  <span className="text-[9px] text-mk-muted">({r.context})</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
