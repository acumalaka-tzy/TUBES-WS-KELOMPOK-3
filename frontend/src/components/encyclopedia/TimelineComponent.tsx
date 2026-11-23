import Link from "next/link";
import type { StoryEvent } from "@/lib/types";

export default function TimelineComponent({
  events,
  compact = false,
}: {
  events: StoryEvent[];
  compact?: boolean;
}) {
  if (!events || events.length === 0) {
    return <p className="text-xs text-mk-muted italic">Tidak ada peristiwa cerita yang tercatat.</p>;
  }

  const sorted = [...events].sort((a, b) => a.chronology - b.chronology);

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:bottom-2 before:top-2 before:left-[11px] before:w-0.5 before:bg-mk-border">
      {sorted.map((ev, idx) => (
        <div key={ev.id || idx} className="relative group">
          {/* Node icon / dot */}
          <span className="absolute -left-6 top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-mk-card bg-mk-red text-[9px] font-bold text-white shadow-sm group-hover:scale-110 transition-transform">
            {ev.chronology}
          </span>

          <div className="rounded border border-mk-border bg-mk-card p-3.5 transition group-hover:border-mk-gold/60">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-mk-gold">
                {ev.timeline?.name ?? "Kanonikal"}
              </span>
              {ev.arc && (
                <span className="rounded bg-mk-bg px-1.5 py-0.5 text-[9px] text-mk-muted border border-mk-border/50">
                  Arc: {ev.arc}
                </span>
              )}
            </div>

            <h4 className="font-heading text-sm font-bold text-mk-text group-hover:text-mk-red transition-colors">
              <Link href={`/story/events/${ev.id}`} className="hover:underline">
                {ev.title}
              </Link>
            </h4>

            <p className="mt-1 text-xs text-mk-muted leading-relaxed line-clamp-2">
              {ev.summary}
            </p>

            {!compact && ev.participants && ev.participants.length > 0 && (
              <div className="mt-2.5 flex flex-wrap items-center gap-1 border-t border-mk-border/40 pt-2 text-[10px]">
                <span className="text-mk-muted font-medium">Tokoh:</span>
                {ev.participants.map((p) => (
                  <Link
                    key={p.id}
                    href={`/characters/${p.id}`}
                    className="rounded bg-mk-bg px-1.5 py-0.5 text-mk-text hover:text-mk-red border border-mk-border/50"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
