"use client";

import Link from "next/link";
import { use } from "react";
import { getOrganization } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { entityHref } from "@/lib/routes";
import { TypeBadge } from "@/components/ui/Badge";
import { EntityLinks } from "@/components/ui/Cards";
import { Breadcrumbs, Container, InfoGrid, Section, SourceList } from "@/components/ui/Layout";
import { ErrorState, LoadingState } from "@/components/ui/States";

export default function OrganizationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: org, error, loading, reload } = useAsync(() => getOrganization(id), [id]);

  if (loading) {
    return (
      <Container className="py-12">
        <LoadingState variant="detail" />
      </Container>
    );
  }

  if (error || !org) {
    return (
      <Container className="py-12">
        <ErrorState error={error} onRetry={reload} title="Organisasi tidak ditemukan" />
      </Container>
    );
  }

  return (
    <>
      <section className="hero-bg border-b border-mk-border">
        <Container className="py-10">
          <Breadcrumbs
            items={[
              { label: "Organizations", href: "/organizations" },
              { label: org.name },
            ]}
          />

          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <TypeBadge type="organization" />
              <span className="rounded-sm border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-xs uppercase tracking-wider text-emerald-300">
                {org.kind}
              </span>
            </div>

            <h1 className="font-heading text-4xl font-extrabold sm:text-5xl text-glow">
              {org.name}
            </h1>

            <p className="max-w-3xl text-base text-mk-muted sm:text-lg">
              {org.description}
            </p>
          </div>
        </Container>
      </section>

      <Container className="space-y-10 py-12">
        <Section title="Informasi Organisasi">
          <InfoGrid
            items={[
              { label: "Tipe Kelompok", value: org.kind },
              {
                label: "Pemimpin Terakhir",
                value: org.leader ? (
                  <Link href={entityHref(org.leader)} className="text-mk-gold hover:underline">
                    {org.leader.name}
                  </Link>
                ) : (
                  "-"
                ),
              },
              { label: "Jumlah Anggota Tercatat", value: String(org.members.length) },
              { label: "Klan Rival", value: String(org.rivals.length) },
            ]}
          />
        </Section>

        <Section title="Anggota Terkemuka">
          <EntityLinks items={org.members} empty="Belum ada anggota tercatat." />
        </Section>

        {org.rivals.length > 0 && (
          <Section title="Klan / Faksi Rival">
            <EntityLinks items={org.rivals} />
          </Section>
        )}

        <Section title="Timeline Keberadaan">
          <EntityLinks items={org.timelines} empty="Belum ada timeline terkait." />
        </Section>

        {org.events.length > 0 && (
          <Section title="Peristiwa Cerita Terkait">
            <EntityLinks items={org.events} />
          </Section>
        )}

        <Section title="Sumber Data &amp; Provenance">
          <SourceList sources={org.sources} />
        </Section>
      </Container>
    </>
  );
}
