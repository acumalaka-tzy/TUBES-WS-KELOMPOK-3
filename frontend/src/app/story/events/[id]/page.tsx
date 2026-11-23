"use client";

import Link from "next/link";
import { use } from "react";
import { getStoryEvent } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { entityHref } from "@/lib/routes";
import { VerificationBadge } from "@/components/ui/Badge";
import { EntityLinks } from "@/components/ui/Cards";
import { Breadcrumbs, Container, InfoGrid, Section, SourceList } from "@/components/ui/Layout";
import { ErrorState, LoadingState } from "@/components/ui/States";

export default function StoryEventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: event, error, loading, reload } = useAsync(() => getStoryEvent(id), [id]);

  if (loading) {
    return (
      <Container className="py-12">
        <LoadingState variant="detail" />
      </Container>
    );
  }

  if (error || !event) {
    return (
      <Container className="py-12">
        <ErrorState error={error} onRetry={reload} title="Peristiwa tidak ditemukan" />
      </Container>
    );
  }

  return (
    <>
      <section className="hero-bg border-b border-mk-border">
        <Container className="py-10">
          <Breadcrumbs
            items={[
              { label: "Story", href: "/story" },
              { label: event.title },
            ]}
          />

          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-sm border border-mk-gold/50 bg-mk-card px-2 py-0.5 text-xs uppercase tracking-wider text-mk-gold">
                {event.eventType}
              </span>
              <span className="rounded-sm border border-mk-border bg-mk-card px-2 py-0.5 text-xs text-mk-muted">
                {event.timeline.name}
              </span>
              <VerificationBadge status={event.verificationStatus} />
            </div>

            <h1 className="font-heading text-3xl font-extrabold sm:text-5xl text-glow">
              {event.title}
            </h1>

            <p className="max-w-3xl text-base text-mk-muted sm:text-lg">
              {event.summary}
            </p>
          </div>
        </Container>
      </section>

      <Container className="space-y-10 py-12">
        <Section title="Detail Peristiwa &amp; Konteks">
          <InfoGrid
            items={[
              { label: "Timeline Kontinuitas", value: event.timeline.name },
              {
                label: "Game Terkait",
                value: event.game ? (
                  <Link href={entityHref(event.game)} className="text-mk-gold hover:underline">
                    {event.game.name}
                  </Link>
                ) : (
                  "-"
                ),
              },
              { label: "Lokasi Peristiwa", value: event.location ?? "-" },
              { label: "Story Arc", value: event.arc ?? "-" },
              {
                label: "Urutan Kronologi",
                value: `#${event.chronology}`,
              },
            ]}
          />
        </Section>

        {event.detail && (
          <Section title="Uraian Naratif / Konsekuensi Lore">
            <div className="panel rounded-sm p-6 text-sm text-mk-text/90 leading-relaxed sm:text-base">
              {event.detail}
            </div>
          </Section>
        )}

        <Section title="Karakter yang Terlibat (Participants)">
          <EntityLinks items={event.participants} empty="Belum ada karakter yang tercatat." />
        </Section>

        {/* Causes & Consequences — PRD 25.5 & 26.2: only asserted when sourced */}
        <div className="grid gap-6 md:grid-cols-2">
          <Section title="Pemicu / Penyebab (Causes)">
            {event.causes.length > 0 ? (
              <EntityLinks items={event.causes} />
            ) : (
              <p className="text-sm text-mk-muted italic">
                Tidak ada entitas penyebab eksplisit yang tercatat (sebab-akibat hanya dicatat jika memiliki bukti sumber, bukan disimpulkan semata-mata dari urutan waktu).
              </p>
            )}
          </Section>

          <Section title="Dampak / Konsekuensi (Consequences)">
            {event.consequences.length > 0 ? (
              <EntityLinks items={event.consequences} />
            ) : (
              <p className="text-sm text-mk-muted italic">Belum ada catatan konsekuensi peristiwa.</p>
            )}
          </Section>
        </div>

        {event.relatedEvents.length > 0 && (
          <Section title="Peristiwa Cerita Terkait">
            <EntityLinks items={event.relatedEvents} />
          </Section>
        )}

        <Section title="Sumber Fakta &amp; Provenance">
          <SourceList sources={event.sources} />
        </Section>
      </Container>
    </>
  );
}
