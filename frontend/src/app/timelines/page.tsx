"use client";

import Link from "next/link";
import { getTimelines } from "@/lib/api";
import { useAsync } from "@/lib/hooks";
import { InfoCard } from "@/components/ui/Cards";
import { Container, PageHeader } from "@/components/ui/Layout";
import { ErrorState, LoadingState } from "@/components/ui/States";

export default function TimelinesPage() {
  const { data, error, loading, reload } = useAsync(getTimelines, []);

  return (
    <>
      <PageHeader
        eyebrow="Encyclopedia"
        title="Timeline &amp; Kontinuitas Mortal Kombat"
        description="Dunia Mortal Kombat terbagi ke dalam tiga timeline utama akibat perubahan sejarah dan manipulasi waktu. Ensiklopedia ini memisahkan identitas karakter per timeline agar fakta tidak bertentangan (FR-14 &amp; PRD 6.3)."
        crumbs={[{ label: "Timelines" }]}
      />

      <Container className="py-10 space-y-8">
        <div className="panel rounded-sm p-5 text-sm text-mk-muted">
          <p className="font-semibold text-mk-gold">Mengapa Timeline Penting dalam Semantic Web MK?</p>
          <p className="mt-1">
            Karakter dapat memiliki identitas, relasi, dan afiliasi yang berbeda pada timeline berbeda. Sebagai contoh,
            Scorpion di Timeline Original dan Reboot adalah Hanzo Hasashi (Shirai Ryu), sedangkan di New Era adalah anggota
            Lin Kuei. Knowledge Nexus mempertahankan konteks timeline pada setiap fakta.
          </p>
        </div>

        {loading ? (
          <LoadingState count={3} />
        ) : error ? (
          <ErrorState error={error} onRetry={reload} />
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {data?.map((t) => (
              <InfoCard
                key={t.id}
                href={`/timelines/${t.id}`}
                title={t.name}
                description={t.description}
                badges={
                  <span className="rounded-sm border border-violet-500/40 bg-violet-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-violet-300">
                    Era Urutan Ke-{t.order}
                  </span>
                }
                meta={
                  <div className="space-y-1">
                    <p>{t.games.length} Seri Game Terkait</p>
                    <p>{t.events.length} Peristiwa Kunci Tercatat</p>
                  </div>
                }
              />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
