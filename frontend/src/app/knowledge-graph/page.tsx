import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/Layout";
import { EmptyState } from "@/components/ui/States";

export const metadata: Metadata = { title: "Knowledge Graph" };

export default function KnowledgeGraphPage() {
  return (
    <>
      <PageHeader
        eyebrow="Knowledge Graph"
        title="Graph Explorer"
        description="Visualisasi hubungan antar entitas (FR-16) dikembangkan pada modul terpisah. Halaman ini menjadi titik masuk navigasi."
        crumbs={[{ label: "Knowledge Graph" }]}
      />
      <Container className="py-12">
        <EmptyState
          icon="◎"
          title="Visualisasi graph segera hadir"
          description="Sementara itu, Anda dapat menelusuri relasi antar entitas melalui halaman detail karakter, klan, dan peristiwa — setiap relasi dapat diklik."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/characters" className="btn-primary">
                Lihat karakter
              </Link>
              <Link href="/story" className="btn-ghost">
                Story Explorer
              </Link>
            </div>
          }
        />
      </Container>
    </>
  );
}
