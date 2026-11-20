"use client";

import Link from "next/link";
import { use } from "react";
import { getTimeline } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { entityHref } from "@/lib/routes";
import { TypeBadge } from "@/components/ui/Badge";
import { EntityLinks } from "@/components/ui/Cards";
import { Breadcrumbs, Container, InfoGrid, Section, SourceList } from "@/components/ui/Layout";
import { ErrorState, LoadingState } from "@/components/ui/States";

export default function TimelineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: timeline, error, loading, reload } = useAsync(() => getTimeline(id), [id]);

  if (loading) {
    return (
      <Container className="py-12">
        <LoadingState variant="detail" />
      </Container>
    );
  }

  if (error || !timeline) {
    return (
      <Container className="py-12">
        <ErrorState error={error} onRetry={reload} title="Timeline tidak ditemukan" />
      </Container>
    );
  }

  return (
    <>
      <section className="hero-bg border-b border-mk-border">
        <Container className="py-10">
          <Breadcrumbs
            items={[
              { label: "Timelines", href: "/timelines" },
              { label: timeline.name },
            ]}
          />

          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <TypeBadge type="timeline" />
              <span className="rounded-sm border border-violet-500/40 bg-violet-500/10 px-2 py-0.5 text-xs uppercase tracking-wider text-violet-300">
                Kronologi #{timeline.order}
              </span>
            </div>

            <h1 className="font-heading text-4xl font-extrabold sm:text-5xl text-glow">
              {timeline.name}
            </h1>

            <p className="max-w-3xl text-base text-mk-muted sm:text-lg">
              {timeline.description}
            </p>
          </div>
        </Container>
      </section>

      <Container className="space-y-10 py-12">
        <Section title="Detail Kontinuitas">
          <InfoGrid
            items={[
              { label: "Nama Timeline", value: timeline.name },
              { label: "Urutan Kronologi", value: `Ke-${timeline.order}` },
              { label: "Game Terkait", value: String(timeline.games.length) },
              { label: "Peristiwa Tercatat", value: String(timeline.events.length) },
            ]}
          />
        </Section>

        {/* Related Games in this Timeline */}
        <Section title="Game dalam Kontinuitas Ini">
          <EntityLinks items={timeline.games} empty="Belum ada game tercatat." />
        </Section>

        {/* Character Versions in this Timeline */}
        {timeline.characterVersions.length > 0 && (
          <Section title="Identitas &amp; Varian Karakter pada Timeline Ini">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {timeline.characterVersions.map((cv, idx) => (
                <div key={idx} className="panel rounded-sm p-4">
                  <p className="font-heading font-bold">
                    <Link
                      href={entityHref(cv.character)}
                      className="text-mk-text hover:text-mk-gold hover:underline"
                    >
                      {cv.character.name}
                    </Link>
                  </p>
                  <p className="mt-1 text-xs text-mk-muted">
                    Varian / Peran: <span className="text-mk-gold">{cv.versionLabel}</span>
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Perubahan Relasi / Sejarah */}
        {timeline.relationshipChanges.length > 0 && (
          <Section title="Perubahan Relasi &amp; Sejarah Kunci">
            <ul className="space-y-2">
              {timeline.relationshipChanges.map((change, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-sm border border-mk-border bg-mk-card p-3 text-sm"
                >
                  <span className="text-mk-red font-bold">↳</span>
                  <span className="text-mk-text">{change}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Story Events */}
        {timeline.events.length > 0 && (
          <Section
            title="Peristiwa Cerita Terkait"
            action={
              <Link
                href={`/story/timeline?timeline=${timeline.id}`}
                className="text-xs uppercase tracking-wider text-mk-red hover:underline"
              >
                Lihat di Story Timeline →
              </Link>
            }
          >
            <EntityLinks items={timeline.events} />
          </Section>
        )}

        <Section title="Sumber Data &amp; Provenance">
          <SourceList sources={timeline.sources} />
        </Section>
      </Container>
    </>
  );
}
