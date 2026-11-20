"use client";

import { use } from "react";
import { getWeapon } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { TypeBadge } from "@/components/ui/Badge";
import { EntityLinks } from "@/components/ui/Cards";
import { Breadcrumbs, Container, InfoGrid, Section, SourceList } from "@/components/ui/Layout";
import { ErrorState, LoadingState } from "@/components/ui/States";

export default function WeaponDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: weapon, error, loading, reload } = useAsync(() => getWeapon(id), [id]);

  if (loading) {
    return (
      <Container className="py-12">
        <LoadingState variant="detail" />
      </Container>
    );
  }

  if (error || !weapon) {
    return (
      <Container className="py-12">
        <ErrorState error={error} onRetry={reload} title="Senjata tidak ditemukan" />
      </Container>
    );
  }

  return (
    <>
      <section className="hero-bg border-b border-mk-border">
        <Container className="py-10">
          <Breadcrumbs
            items={[
              { label: "Weapons", href: "/weapons" },
              { label: weapon.name },
            ]}
          />

          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <TypeBadge type="weapon" />
              <span className="rounded-sm border border-mk-border bg-mk-card px-2 py-0.5 text-xs uppercase tracking-wider text-mk-gold">
                {weapon.category}
              </span>
            </div>

            <h1 className="font-heading text-4xl font-extrabold sm:text-5xl text-glow">
              {weapon.name}
            </h1>

            <p className="max-w-3xl text-base text-mk-muted sm:text-lg">
              {weapon.description}
            </p>
          </div>
        </Container>
      </section>

      <Container className="space-y-10 py-12">
        <Section title="Informasi Senjata">
          <InfoGrid
            items={[
              { label: "Kategori Senjata", value: weapon.category },
              { label: "Jumlah Pengguna", value: String(weapon.characters.length) },
              { label: "Kemunculan Game", value: String(weapon.games.length) },
              { label: "Jurus Terkait", value: String(weapon.relatedAbilities.length) },
            ]}
          />
        </Section>

        <Section title="Karakter Pengguna Senjata">
          <EntityLinks items={weapon.characters} empty="Belum ada karakter yang tercatat." />
        </Section>

        {weapon.relatedAbilities.length > 0 && (
          <Section title="Kemampuan &amp; Jurus Terkait">
            <EntityLinks items={weapon.relatedAbilities} />
          </Section>
        )}

        <Section title="Kemunculan pada Game">
          <EntityLinks items={weapon.games} empty="Belum ada game yang tercatat." />
        </Section>

        <Section title="Sumber Data & Provenance">
          <SourceList sources={weapon.sources} />
        </Section>
      </Container>
    </>
  );
}
