import type { SourceRef } from "@/lib/types";

export default function SourceReference({ sources }: { sources: SourceRef[] }) {
  if (!sources || sources.length === 0) {
    return (
      <p className="text-xs text-mk-muted italic">
        Data bersumber dari arsip kanonikal Mortal Kombat.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <ul className="divide-y divide-mk-border/50 rounded border border-mk-border bg-mk-card text-xs">
        {sources.map((src, idx) => (
          <li key={src.id || idx} className="flex items-center justify-between p-3 hover:bg-mk-bg/30 transition">
            <div className="flex items-center gap-2.5">
              <span className="grid h-5 w-5 place-items-center rounded bg-mk-bg text-[10px] font-bold text-mk-muted border border-mk-border/60">
                {idx + 1}
              </span>
              <div>
                <p className="font-semibold text-mk-text">{src.title}</p>
                <p className="text-[10px] text-mk-muted">
                  Tipe Sumber: <span className="uppercase">{src.sourceType}</span>
                </p>
              </div>
            </div>

            {src.url && (
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium text-mk-red hover:underline shrink-0"
              >
                Kunjungi Sumber ↗
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
