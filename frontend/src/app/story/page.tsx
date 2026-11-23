"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { getStoryEvents, getTimelines } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { entityHref } from "@/lib/routes";
import { STORY_ARCS } from "@/lib/mock-data";
import { VerificationBadge } from "@/components/ui/Badge";
import { Container, PageHeader } from "@/components/ui/Layout";
import ListToolbar, { SelectFilter } from "@/components/ui/ListToolbar";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/States";

function StoryExplorerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialArc = searchParams.get("arc") ?? "all";
  const initialTimeline = searchParams.get("timeline") ?? "all";

  const [query, setQuery] = useState("");
  const [selectedTimeline, setSelectedTimeline] = useState(initialTimeline);
  const [selectedArc, setSelectedArc] = useState(initialArc);

  const { data: timelines } = useAsync(getTimelines, []);
  const { data: events, error, loading, reload } = useAsync(
    () =>
      getStoryEvents({
        timeline: selectedTimeline === "all" ? undefined : selectedTimeline,
        arc: selectedArc === "all" ? undefined : selectedArc,
        q: query,
      }),
    [selectedTimeline, selectedArc, query]
  );

  const timelineOptions = useMemo(() => {
    return [
      { value: "all", label: "Semua Timeline" },
      ...(timelines ?? []).map((t) => ({ value: t.id, label: t.name })),
    ];
  }, [timelines]);

  const arcOptions = useMemo(() => {
    return [
      { value: "all", label: "Semua Story Arc" },
      ...STORY_ARCS.map((a) => ({ value: a, label: a })),
    ];
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Story Explorer"
        title="Eksplorasi Cerita &amp; Peristiwa"
        description="Telusuri peristiwa kanonikal, asal-usul karakter, konflik antarklan, dan titik perubahan sejarah Mortal Kombat berdasarkan timeline (PRD FR-23 &amp; Bagian 26)."
        crumbs={[{ label: "Story" }]}
      >
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link href="/story/timeline" className="btn-primary !py-2 !text-xs">
            🧭 Buka Story Timeline (Kronologis) →
          </Link>
        </div>
      </PageHeader>

      <Container className="py-10">
        <ListToolbar
          query={query}
          onQuery={setQuery}
          placeholder="Cari peristiwa, partisipan (Scorpion, Raiden…), atau lokasi…"
          total={events?.length}
        >
          <SelectFilter
            label="Timeline:"
            value={selectedTimeline}
            onChange={(v) => {
              setSelectedTimeline(v);
              const p = new URLSearchParams(searchParams.toString());
              if (v !== "all") p.set("timeline", v);
              else p.delete("timeline");
              router.push(`/story?${p.toString()}`);
            }}
            options={timelineOptions}
          />
          <SelectFilter
            label="Story Arc:"
            value={selectedArc}
            onChange={(v) => {
              setSelectedArc(v);
              const p = new URLSearchParams(searchParams.toString());
              if (v !== "all") p.set("arc", v);
              else p.delete("arc");
              router.push(`/story?${p.toString()}`);
            }}
            options={arcOptions}
          />
        </ListToolbar>

        {loading ? (
          <LoadingState count={4} variant="list" />
        ) : error ? (
          <ErrorState error={error} onRetry={reload} />
        ) : !events?.length ? (
          <EmptyState
            title="Peristiwa tidak ditemukan"
            description="Tidak ada peristiwa yang cocok dengan filter yang Anda tentukan."
            action={
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedTimeline("all");
                  setSelectedArc("all");
                }}
                className="btn-primary"
              >
                Reset Filter
              </button>
            }
          />
        ) : (
          <div className="space-y-4">
            {events.map((ev) => {
              return (
                <div
                  key={ev.id}
                  className="panel group rounded-sm p-5 transition hover:border-mk-red/70 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-sm border border-mk-gold/40 bg-mk-bg px-2.5 py-0.5 text-xs font-semibold text-mk-gold">
                        {ev.timeline.name}
                      </span>
                    </div>
                    <VerificationBadge status={ev.verificationStatus} />
                  </div>

                  <h2 className="font-heading text-xl font-bold group-hover:text-mk-gold">
                    <Link href={`/story/events/${ev.id}`} className="hover:underline">
                      {ev.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-mk-text/90 leading-relaxed">{ev.summary}</p>

                  {/* Participants & Location */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-mk-border pt-3 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5 text-mk-muted">
                      <span className="text-mk-gold">Karakter Terlibat:</span>
                      {ev.participants.map((p) => (
                        <Link
                          key={p.id}
                          href={entityHref(p)}
                          className="rounded border border-mk-border bg-mk-bg px-2 py-0.5 text-mk-text hover:border-mk-gold"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>

                    <Link
                      href={`/story/events/${ev.id}`}
                      className="text-xs uppercase tracking-wider text-mk-red hover:text-mk-gold"
                    >
                      Detail Peristiwa →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}

export default function StoryExplorerPage() {
  return (
    <Suspense fallback={<LoadingState count={4} />}>
      <StoryExplorerContent />
    </Suspense>
  );
}
