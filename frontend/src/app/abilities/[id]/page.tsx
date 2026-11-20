"use client";

import { use } from "react";
import { getAbility } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { TypeBadge } from "@/components/ui/Badge";
import { EntityLinks } from "@/components/ui/Cards";
import { Breadcrumbs, Container, InfoGrid, Section, SourceList } from "@/components/ui/Layout";
import { ErrorState, LoadingState } from "@/components/ui/States";

export default function AbilityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: ability, error, loading, reload } = useAsync(() => getAbility(id), [id]);

  if (loading) {
    return (
      <Container className="py-12">
        <LoadingState variant="detail" />
      </Container>
    );
  }

  if (error || !ability) {
    return (
      <Container className="py-12">
        <ErrorState error={error} onRetry={reload} title="Kemampuan tidak ditemukan" />
      </Container>
    );
  }

  return (
    <>
      <section className="hero-bg border-b border-mk-border">
        <Container className="py-10">
          <Breadcrumbs
            items={[
              { label: "Abilities", href: "/abilities" },
              { label: ability.name },
            ]}
          />

          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <TypeBadge type="ability" />
              <span className="rounded-sm border border-mk-border bg-mk-card px-2 py-0.5 text-xs uppercase tracking-wider text-mk-gold">
                {ability.category}
              </span>
              {ability.element && (
                <span className="rounded-sm border border-orange-500/40 bg-orange-500/10 px-2 py-0.5 text-xs text-orange-300">
                  Elemen: {ability.element}
                </span>
              )}
            </div>

            <h1 className="font-heading text-4xl font-extrabold sm:text-5xl text-glow">
              {ability.name}
            </h1>

            <p className="max-w-3xl text-base text-mk-muted sm:text-lg">
              {ability.description}
            </p>
          </div>
        </Container>
      </section>

      <Container className="space-y-10 py-12">
        <Section title="Informasi Kemampuan">
          <InfoGrid
            items={[
              { label: "Kategori Jurus", value: ability.category },
              { label: "Elemen Terkait", value: ability.element ?? "-" },
              { label: "Jumlah Karakter", value: String(ability.characters.length) },
              { label: "Kemunculan Seri Game", value: String(ability.games.length) },
            ]}
          />
        </Section>

        <Section title="Karakter Pengguna Kemampuan Ini">
          <EntityLinks items={ability.characters} empty="Belum ada karakter yang tercatat." />
        </Section>

        <Section title="Kemunculan pada Game">
          <EntityLinks items={ability.games} empty="Belum ada game yang tercatat." />
        </Section>

        <Section title="Sumber Data & Provenance">
          <SourceList sources={ability.sources} />
        </Section>
      </Container>
    </>
  );
}
