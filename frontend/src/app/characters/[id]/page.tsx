"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { getCharacter } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { entityHref } from "@/lib/routes";
import { TypeBadge, VerificationBadge } from "@/components/ui/Badge";
import { EntityLinks } from "@/components/ui/Cards";
import EntityImage from "@/components/ui/EntityImage";
import { Breadcrumbs, Container, InfoGrid, Section, SourceList } from "@/components/ui/Layout";
import { ErrorState, LoadingState } from "@/components/ui/States";

export default function CharacterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: character, error, loading, reload } = useAsync(() => getCharacter(id), [id]);

  // Selected game/timeline version (PRD FR-09 & 25.5 Character Detail)
  const [selectedVersionId, setSelectedVersionId] = useState<string>("");

  useEffect(() => {
    if (character?.versions?.length) {
      // Default to latest version
      setSelectedVersionId(character.versions[character.versions.length - 1].id);
    }
  }, [character]);

  if (loading) {
    return (
      <Container className="py-12">
        <LoadingState variant="detail" />
      </Container>
    );
  }

  if (error || !character) {
    return (
      <Container className="py-12">
        <ErrorState error={error} onRetry={reload} title="Karakter tidak ditemukan" />
      </Container>
    );
  }

  const currentVersion =
    character.versions.find((v) => v.id === selectedVersionId) ?? character.versions[0];

  return (
    <>
      {/* 1. Character Hero (Cinematic header — PRD 13.4 & 25.5) */}
      <section className="hero-bg relative border-b border-mk-border">
        <Container className="py-10">
          <Breadcrumbs
            items={[
              { label: "Characters", href: "/characters" },
              { label: character.name },
            ]}
          />

          <div className="mt-8 grid gap-8 md:grid-cols-12 lg:gap-12">
            {/* Character Artwork / Context-based Image (PRD 25.5 & 29.6) */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="overflow-hidden rounded-sm border border-mk-border bg-mk-card shadow-2xl">
                <EntityImage
                  image={currentVersion?.image ?? character.image}
                  name={character.name}
                  contextLabel={currentVersion ? currentVersion.gameTitle : undefined}
                  aspect="aspect-[3/4]"
                  objectPosition="object-top"
                  priority
                />
              </div>

              {/* Version context tag under image */}
              {currentVersion && (
                <div className="mt-3 rounded-sm border border-mk-border bg-mk-bg2 p-3 text-xs text-mk-muted">
                  <p className="font-semibold text-mk-gold">Tampilan Versi Game:</p>
                  <p className="text-mk-text">{currentVersion.gameTitle}</p>
                  <p className="text-[11px] text-mk-muted">{currentVersion.timelineName}</p>
                </div>
              )}
            </div>

            {/* Character Info summary */}
            <div className="flex flex-col justify-center space-y-4 md:col-span-7 lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2">
                <TypeBadge type="character" />
                {character.role && (
                  <span className="rounded-sm border border-mk-border bg-mk-card px-2 py-0.5 text-xs text-mk-gold uppercase tracking-wider">
                    {character.role}
                  </span>
                )}
                {character.faction && (
                  <span className="rounded-sm border border-mk-border bg-mk-card px-2 py-0.5 text-xs text-mk-muted">
                    {character.faction}
                  </span>
                )}
              </div>

              <h1 className="font-heading text-4xl font-extrabold tracking-wide sm:text-6xl text-glow">
                {character.name}
              </h1>

              {character.aliases?.length > 0 && (
                <p className="text-sm text-mk-muted">
                  <strong className="text-mk-text">Alias / Identitas:</strong> {character.aliases.join(", ")}
                </p>
              )}

              <p className="text-base leading-relaxed text-mk-text/90 sm:text-lg">
                {character.summary}
              </p>

              {/* Game / Timeline Selector (PRD 25.5: game-specific context selector) */}
              {character.versions.length > 0 && (
                <div className="pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-mk-gold">
                    Pilih Versi Game &amp; Timeline:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {character.versions.map((ver) => (
                      <button
                        key={ver.id}
                        type="button"
                        onClick={() => setSelectedVersionId(ver.id)}
                        className={`rounded-sm border px-3 py-1.5 text-xs font-medium transition ${
                          selectedVersionId === ver.id
                            ? "border-mk-red bg-mk-red/20 text-mk-text shadow glow-red"
                            : "border-mk-border bg-mk-card text-mk-muted hover:border-mk-gold hover:text-mk-text"
                        }`}
                      >
                        {ver.gameTitle}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content Sections (PRD 13.4 Character Detail Layout) */}
      <Container className="space-y-12 py-12">
        {/* 2. Basic Information Grid */}
        <Section title="Informasi Dasar">
          <InfoGrid
            items={[
              {
                label: "Kemunculan Pertama",
                value: character.firstAppearance ? (
                  <Link
                    href={entityHref(character.firstAppearance)}
                    className="text-mk-gold hover:underline"
                  >
                    {character.firstAppearance.name}
                  </Link>
                ) : (
                  "-"
                ),
              },
              { label: "Asal Realm", value: character.realm?.name ?? "-" },
              { label: "Spesies", value: character.species?.name ?? "-" },
              { label: "Faksi Utama", value: character.faction ?? "-" },
              { label: "Peran Cerita", value: character.role ?? "-" },
              {
                label: "Versi Aktif",
                value: currentVersion ? `${currentVersion.gameTitle} (${currentVersion.timelineName})` : "-",
              },
            ]}
          />
        </Section>

        {/* 3. Biography (Franchise & Version specific) */}
        <Section title="Biografi & Latar Belakang">
          <div className="panel space-y-4 rounded-sm p-6 text-sm leading-relaxed sm:text-base">
            <p className="text-mk-text/90">{character.biography}</p>
            {currentVersion?.biography && (
              <div className="border-t border-mk-border pt-4">
                <p className="font-semibold text-mk-gold">
                  Konteks pada {currentVersion.gameTitle}:
                </p>
                <p className="mt-1 text-mk-muted">{currentVersion.biography}</p>
              </div>
            )}
          </div>
        </Section>

        {/* 4. Abilities & Special Moves (Context-based) */}
        <Section
          title={`Kemampuan & Jurus (${currentVersion?.gameTitle ?? "Semua"})`}
          action={
            <Link href="/abilities" className="text-xs uppercase tracking-wider text-mk-red hover:underline">
              Semua Kemampuan →
            </Link>
          }
        >
          {currentVersion?.abilities?.length ? (
            <EntityLinks items={currentVersion.abilities} />
          ) : (
            <p className="text-sm text-mk-muted">
              Tidak ada data kemampuan khusus yang tercatat untuk versi game ini.
            </p>
          )}
        </Section>

        {/* 5. Weapons */}
        <Section title={`Senjata yang Digunakan (${currentVersion?.gameTitle ?? "Semua"})`}>
          {currentVersion?.weapons?.length ? (
            <EntityLinks items={currentVersion.weapons} />
          ) : (
            <p className="text-sm text-mk-muted">
              Tidak ada senjata yang tercatat untuk versi game ini.
            </p>
          )}
        </Section>

        {/* 6. Organizations & Clans */}
        <Section title="Afiliasi Klan & Organisasi">
          {currentVersion?.organizations?.length ? (
            <EntityLinks items={currentVersion.organizations} />
          ) : (
            <p className="text-sm text-mk-muted">Belum ada afiliasi klan tercatat pada versi ini.</p>
          )}
        </Section>

        {/* 7. Game Appearances */}
        <Section title="Kemunculan di Seri Game">
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {character.versions.map((v) => (
              <li key={v.id}>
                <Link
                  href={`/games/${v.gameId}`}
                  className="panel group block rounded-sm p-4 transition hover:border-mk-gold"
                >
                  <p className="font-heading font-bold text-mk-text group-hover:text-mk-gold">
                    {v.gameTitle}
                  </p>
                  <p className="mt-1 text-xs text-mk-muted">{v.timelineName}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* 8. Relationships (Direct & context-sensitive) */}
        <Section title="Hubungan Antar Karakter (Relationship Explorer)">
          {character.relationships?.length ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {character.relationships.map((rel, idx) => (
                <div key={idx} className="panel rounded-sm p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded-sm border border-mk-red/40 bg-mk-red-deep/20 px-2 py-0.5 text-xs text-red-200">
                      {rel.label} ({rel.type})
                    </span>
                    <VerificationBadge status={rel.verificationStatus} />
                  </div>
                  <p className="text-base font-bold">
                    <Link
                      href={entityHref(rel.target)}
                      className="text-mk-text hover:text-mk-gold hover:underline"
                    >
                      {rel.target.name}
                    </Link>
                  </p>
                  {rel.context && (
                    <p className="text-xs text-mk-muted">Konteks: {rel.context}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-mk-muted">Belum ada relasi tercatat.</p>
          )}
        </Section>

        {/* 9. Related Characters */}
        {character.relatedCharacters?.length > 0 && (
          <Section title="Karakter Terkait Lainnya">
            <EntityLinks items={character.relatedCharacters} />
          </Section>
        )}

        {/* 10. Sources and Provenance (FR-09 & FR-22) */}
        <Section title="Sumber Data & Provenance">
          <SourceList sources={character.sources} />
        </Section>
      </Container>
    </>
  );
}
