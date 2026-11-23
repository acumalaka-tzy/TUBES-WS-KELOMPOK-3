import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";
import { GameEras, PopularCharacters } from "@/components/home/HomeSections";
import { Container, Section } from "@/components/ui/Layout";
import { CATEGORIES } from "@/lib/routes";
import { SEARCH_PROMPTS, STORY_ARCS } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      {/* HERO — cinematic, search-first (PRD 25.5 Home) */}
      <section className="hero-bg relative overflow-hidden border-b border-mk-border">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#f5f5f5_1px,transparent_1px),linear-gradient(90deg,#f5f5f5_1px,transparent_1px)] [background-size:48px_48px]" />
        <Container className="relative flex min-h-[78vh] flex-col items-center justify-center py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-mk-red">Ensiklopedia &amp; Pencarian Pintar</p>
          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight tracking-wide sm:text-6xl lg:text-7xl">
            Mortal Kombat
            <span className="block text-mk-gold text-glow">Knowledge Nexus</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm text-mk-muted sm:text-lg">
            Ensiklopedia dan mesin pencari komprehensif semesta Mortal Kombat — karakter, game, jurus, klan, garis waktu, dan alur cerita dalam satu basis data terpadu.
          </p>
          <div className="mt-10 w-full max-w-3xl">
            <SearchBar autoFocus={false} />
          </div>
          <div className="mt-5 flex max-w-3xl flex-wrap justify-center gap-2" aria-label="Rekomendasi pencarian">
            {SEARCH_PROMPTS.map((p) => (
              <Link
                key={p}
                href={`/search?q=${encodeURIComponent(p)}`}
                className="rounded-full border border-mk-border bg-mk-bg/60 px-3 py-1.5 text-xs text-mk-muted transition hover:border-mk-gold hover:text-mk-text"
              >
                {p}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <Container className="space-y-20 py-16">
        {/* Kategori informasi utama */}
        <Section title="Kategori Informasi">
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {CATEGORIES.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="group panel flex h-full items-start gap-3 rounded-sm p-4 transition hover:border-mk-red/70">
                  <span className="text-2xl" aria-hidden="true">
                    {c.icon}
                  </span>
                  <span>
                    <span className="block font-heading text-sm font-bold group-hover:text-mk-gold sm:text-base">{c.label}</span>
                    <span className="mt-1 hidden text-xs text-mk-muted sm:block">{c.desc}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* Karakter populer */}
        <Section
          title="Karakter Populer"
          action={
            <Link href="/characters" className="text-xs uppercase tracking-widest text-mk-red hover:text-mk-gold sm:hidden">
              Semua →
            </Link>
          }
        >
          <PopularCharacters />
          <div className="mt-2 hidden sm:block">
            <Link href="/characters" className="text-xs uppercase tracking-widest text-mk-red hover:text-mk-gold">
              Lihat semua karakter →
            </Link>
          </div>
        </Section>

        {/* Game per era */}
        <Section
          title="Game yang Tersedia"
          action={
            <Link href="/games" className="text-xs uppercase tracking-widest text-mk-red hover:text-mk-gold">
              Semua game →
            </Link>
          }
        >
          <GameEras />
        </Section>

        {/* Story arcs */}
        <Section
          title="Alur Cerita Pilihan"
          action={
            <Link href="/story" className="text-xs uppercase tracking-widest text-mk-red hover:text-mk-gold">
              Story Explorer →
            </Link>
          }
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STORY_ARCS.map((arc) => (
              <li key={arc}>
                <Link
                  href={`/story?arc=${encodeURIComponent(arc)}`}
                  className="group relative flex h-36 items-end overflow-hidden rounded-sm border border-mk-border bg-gradient-to-br from-mk-red-deep/50 via-mk-card to-mk-bg p-4 transition hover:border-mk-red"
                >
                  <span className="absolute right-3 top-2 font-display text-6xl text-mk-text/5" aria-hidden="true">
                    ✦
                  </span>
                  <span className="font-heading text-lg font-bold group-hover:text-mk-gold">{arc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* Semantic Search info */}
        <Section title="Tentang Pencarian Cerdas">
          <div className="panel space-y-4 rounded-sm p-6 text-sm text-mk-muted max-w-4xl mx-auto">
            <p>
              Knowledge Nexus tidak hanya mencocokkan kata kunci sederhana. Mesin pencari memahami <strong className="text-mk-text">entitas</strong>,{" "}
              <strong className="text-mk-text">atribut</strong>, dan <strong className="text-mk-text">relasi mendalam</strong> antar karakter, senjata, dan timeline.
            </p>
            <ol className="grid gap-4 sm:grid-cols-3">
              {[
                ["Keyword", "Pencocokan nama, alias, gelar, dan penelusuran leksikal."],
                ["Semantic", "Penelusuran relasi semantik, mis. hasAbility → hasElement → Fire."],
                ["Hybrid", "Gabungan presisi tinggi dengan ranking dan penjelasan cerdas."],
              ].map(([t, d], i) => (
                <li key={t} className="flex flex-col gap-1 rounded bg-mk-bg2 p-3 border border-mk-border/60">
                  <span className="font-heading font-bold text-mk-gold">{t}</span>
                  <span className="text-xs text-mk-muted">{d}</span>
                </li>
              ))}
            </ol>
            <div className="pt-2">
              <Link href="/search?q=Karakter%20yang%20menggunakan%20api&mode=semantic" className="btn-primary">
                Coba Pencarian Semantik →
              </Link>
            </div>
          </div>
        </Section>

        {/* AI Knowledge Assistant Preview */}
        <Section title="AI Knowledge Assistant">
          <div className="panel flex flex-col md:flex-row items-center justify-between gap-6 rounded-sm p-6 bg-gradient-to-r from-mk-bg2 via-mk-card to-mk-bg2 border border-mk-border hover:border-mk-red/70 transition">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-mk-gold">
                <span className="text-xl">🤖</span>
                <span className="font-heading font-bold text-lg text-mk-text">Asisten Cerdas Pengetahuan Mortal Kombat</span>
              </div>
              <p className="text-sm text-mk-muted leading-relaxed">
                Tanyakan apa saja seputar karakter, alur cerita, klan, dan garis waktu kontinuitas Mortal Kombat. Jawaban langsung divalidasi dari data resmi tanpa halusinasi.
              </p>
            </div>
            <Link href="/assistant" className="btn-primary whitespace-nowrap shrink-0 !py-3 !px-6">
              Mulai Percakapan AI →
            </Link>
          </div>
        </Section>
      </Container>
    </>
  );
}
