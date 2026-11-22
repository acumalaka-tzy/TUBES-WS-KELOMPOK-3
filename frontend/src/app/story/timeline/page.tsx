"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { getStoryTimeline, getTimelines } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { entityHref } from "@/lib/routes";
import { VerificationBadge } from "@/components/ui/Badge";
import { Breadcrumbs, Container, PageHeader } from "@/components/ui/Layout";
import { ErrorState, LoadingState } from "@/components/ui/States";

function StoryTimelineContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawTl = searchParams.get("timeline") ?? "all";
  const [selectedTimeline, setSelectedTimeline] = useState(rawTl);

  const { data: timelines } = useAsync(getTimelines, []);
  const { data: events, error, loading, reload } = useAsync(
    () => getStoryTimeline(selectedTimeline === "all" ? undefined : selectedTimeline),
    [selectedTimeline]
  );

  const timelineTabs = useMemo(() => {
    return [
      { id: "all", label: "Semua Timeline" },
      ...(timelines ?? []).map((t) => ({ id: t.id, label: t.name })),
    ];
  }, [timelines]);

  const handleTimelineChange = (id: string) => {
    setSelectedTimeline(id);
    const p = new URLSearchParams();
    if (id !== "all") p.set("timeline", id);
    router.push(`/story/timeline?${p.toString()}`);
  };

  return (
    <>
      <PageHeader
        eyebrow="Story Timeline"
        title="Garis Waktu Peristiwa Kronologis"
        description="Visualisasi urutan kronologis kejadian dalam sejarah Mortal Kombat. Sistem membedakan secara tegas antara kronologi yang terkonfirmasi (confirmed) dan urutan hasil penafsiran (inferred) sesuai PRD 25.5."
        crumbs={[
          { label: "Story", href: "/story" },
          { label: "Timeline" },
        ]}
      />

      <Container className="py-10 space-y-8">
        {/* Timeline Switcher */}
        <div className="scrollbar-thin flex overflow-x-auto border-b border-mk-border pb-px">
          {timelineTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTimelineChange(tab.id)}
              className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition ${
                selectedTimeline === tab.id
                  ? "border-mk-red text-mk-text"
                  : "border-transparent text-mk-muted hover:border-mk-muted hover:text-mk-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingState variant="list" count={4} />
        ) : error ? (
          <ErrorState error={error} onRetry={reload} />
        ) : !events?.length ? (
          <p className="text-center text-sm text-mk-muted">Belum ada peristiwa pada timeline ini.</p>
        ) : (
          /* Chronological Vertical Timeline (PRD 25.5 Story Timeline) */
          <div className="relative border-l-2 border-mk-border pl-6 sm:pl-8 ml-4 sm:ml-8 space-y-8">
            {events.map((ev, idx) => (
              <div key={ev.id} className="relative group">
                {/* Node dot on the timeline track */}
                <span
                  className="absolute -left-[33px] sm:-left-[41px] top-1.5 h-4 w-4 rounded-full border-2 border-mk-red bg-mk-bg group-hover:bg-mk-gold transition"
                  aria-hidden="true"
                />

                <div className="panel rounded-sm p-5 space-y-2.5 transition hover:border-mk-red/70">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-mk-gold">
                        Langkah #{ev.chronology}
                      </span>
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                          ev.chronologyType === "confirmed"
                            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        Kronologi: {ev.chronologyType === "confirmed" ? "Terkonfirmasi" : "Hasil inferensi"}
                      </span>
                      <span className="text-xs text-mk-muted">
                        • {ev.timeline.name}
                        {ev.game && ` (${ev.game.name})`}
                      </span>
                    </div>
                    <VerificationBadge status={ev.verificationStatus} />
                  </div>

                  <h2 className="font-heading text-lg font-bold group-hover:text-mk-gold">
                    <Link href={`/story/events/${ev.id}`} className="hover:underline">
                      {ev.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-mk-muted leading-relaxed">{ev.summary}</p>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-mk-border pt-2 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5 text-mk-muted">
                      <span>Partisipan:</span>
                      {ev.participants.map((p) => (
                        <Link
                          key={p.id}
                          href={entityHref(p)}
                          className="text-mk-text hover:text-mk-gold hover:underline"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>

                    <Link
                      href={`/story/events/${ev.id}`}
                      className="text-mk-red hover:text-mk-gold font-medium"
                    >
                      Buka Rincian →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}

export default function StoryTimelinePage() {
  return (
    <Suspense fallback={<LoadingState count={4} />}>
      <StoryTimelineContent />
    </Suspense>
  );
}
