import type { Metadata } from "next";
import { Container, PageHeader, Section } from "@/components/ui/Layout";

export const metadata: Metadata = { title: "About" };

const team = [
  { name: "Aldiva Roelya Padang", nim: "251402007" },
  { name: "Gabriel Saurman Parhusip", nim: "251402043" },
  { name: "Muhammad Izyan Roshan", nim: "251402110" },
  { name: "Yazri Khoiri Matondang", nim: "251402016" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Tentang Knowledge Nexus"
        description="Mortal Kombat Knowledge Nexus adalah platform ensiklopedia dan mesin pencari berbasis Semantic Web (RDF, OWL, SPARQL) yang menggabungkan keyword search dan semantic search."
        crumbs={[{ label: "About" }]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <Section title="Apa itu Semantic Search?">
            <p className="text-mk-muted">
              Berbeda dengan pencarian kata kunci biasa, semantic search memahami <em>relasi</em> antar entitas. Contoh: query
              &ldquo;karakter yang menggunakan api&rdquo; ditelusuri melalui relasi <code className="text-mk-gold">hasAbility → hasElement → Fire</code>, bukan
              sekadar mencocokkan teks.
            </p>
          </Section>
          <Section title="Akurasi Data">
            <p className="text-mk-muted">
              Setiap fakta ditampilkan bersama status verifikasi dan sumbernya. Informasi juga dipisahkan berdasarkan versi
              karakter, game, dan timeline agar identitas karakter dari kontinuitas berbeda tidak tercampur.
            </p>
          </Section>
          <Section title="Disclaimer">
            <p className="text-mk-muted">
              Ini adalah proyek penggemar tidak resmi untuk keperluan akademik. Mortal Kombat beserta logo dan asetnya adalah
              milik pemegang hak masing-masing. Situs ini tidak menggunakan logo resmi dan hanya menampilkan gambar yang telah
              disetujui hak penggunaannya.
            </p>
          </Section>
        </div>
        <aside>
          <Section title="Kelompok 3">
            <ul className="space-y-2">
              {team.map((m) => (
                <li key={m.nim} className="panel rounded-sm px-4 py-3">
                  <p className="font-medium">{m.name}</p>
                  <p className="text-xs text-mk-muted">{m.nim}</p>
                </li>
              ))}
            </ul>
          </Section>
        </aside>
      </Container>
    </>
  );
}
