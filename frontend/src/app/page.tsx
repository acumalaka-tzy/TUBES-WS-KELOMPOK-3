import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";
import { GameEras, PopularCharacters } from "@/components/home/HomeSections";
import { Container, Section } from "@/components/ui/Layout";
import { CATEGORIES } from "@/lib/routes";
import { SEARCH_PROMPTS, STORY_ARCS } from "@/lib/mock-data";

const GRAPH_NODES = [
  { x: 50, y: 50, label: "Scorpion", c: "#b51f2b" },
  { x: 18, y: 22, label: "Hellfire", c: "#c6a15b" },
  { x: 82, y: 20, label: "Sub-Zero", c: "#b51f2b" },
  { x: 15, y: 78, label: "Shirai Ryu", c: "#3fae7a" },
  { x: 85, y: 78, label: "Lin Kuei", c: "#3fae7a" },
  { x: 50, y: 92, label: "MK11", c: "#4ba3d6" },
];
const GRAPH_EDGES: [number, number, string][] = [
  [0, 1, "hasAbility"],
  [0, 2, "rivalOf"],
  [0, 3, "memberOf"],
  [2, 4, "memberOf"],
  [0, 5, "appearsIn"],
];

export default function Home() {
  return (
    <>
      {/* HERO — cinematic, search-first (PRD 25.5 Home) */}
      <section className="hero-bg relative overflow-hidden border-b border-mk-border">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#f5f5f5_1px,transparent_1px),linear-gradient(90deg,#f5f5f5_1px,transparent_1px)] [background-size:48px_48px]" />
        <Container className="relative flex min-h-[78vh] flex-col items-center justify-center py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-mk-red">Semantic Knowledge Graph · Hybrid Search</p>
          <h1 className="mt-5 font-heading text-4xl font-extrabold leading-tight tracking-wide sm:text-6xl lg:text-7xl">
            Mortal Kombat
            <span className="block text-mk-gold text-glow">Knowledge Nexus</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm text-mk-muted sm:text-lg">
            Ensiklopedia dan mesin pencari lore Mortal Kombat — karakter, game, kemampuan, klan, timeline, dan cerita yang
            saling terhubung dalam satu Knowledge Graph.
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

        {/* Knowledge Graph preview + Semantic Search info */}
        <div className="grid gap-8 lg:grid-cols-2">
          <Section title="Knowledge Graph">
            <Link href="/knowledge-graph" className="group panel block rounded-sm p-4 transition hover:border-mk-red/70" aria-label="Buka Knowledge Graph">
              <svg viewBox="0 0 100 100" className="h-64 w-full" role="img" aria-label="Pratinjau graph relasi Scorpion">
                {GRAPH_EDGES.map(([a, b, l]) => {
                  const A = GRAPH_NODES[a];
                  const B = GRAPH_NODES[b];
                  return (
                    <g key={`${a}-${b}`}>
                      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#292b35" strokeWidth="0.6" />
                      <text x={(A.x + B.x) / 2} y={(A.y + B.y) / 2 - 1} fontSize="2.6" fill="#a0a2aa" textAnchor="middle">
                        {l}
                      </text>
                    </g>
                  );
                })}
                {GRAPH_NODES.map((n) => (
                  <g key={n.label}>
                    <circle cx={n.x} cy={n.y} r="4.2" fill="#08090d" stroke={n.c} strokeWidth="1" />
                    <text x={n.x} y={n.y + 8} fontSize="3.4" fill="#f5f5f5" textAnchor="middle">
                      {n.label}
                    </text>
                  </g>
                ))}
              </svg>
              <p className="mt-2 text-center text-xs uppercase tracking-widest text-mk-red group-hover:text-mk-gold">Jelajahi graph →</p>
            </Link>
          </Section>

          <Section title="Tentang Semantic Search">
            <div className="panel space-y-4 rounded-sm p-6 text-sm text-mk-muted">
              <p>
                Knowledge Nexus tidak hanya mencocokkan kata. Mesin pencari memahami <strong className="text-mk-text">entitas</strong>,{" "}
                <strong className="text-mk-text">atribut</strong>, dan <strong className="text-mk-text">relasi</strong> yang didefinisikan dalam
                ontology.
              </p>
              <ol className="space-y-3">
                {[
                  ["Keyword", "Pencocokan nama, alias, dan fuzzy matching."],
                  ["Semantic", "Penelusuran relasi graph (SPARQL), mis. hasAbility → hasElement → Fire."],
                  ["Hybrid", "Gabungan keduanya dengan ranking dan penjelasan \"Why this result?\"."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-sm bg-mk-red text-xs font-bold text-mk-text">{i + 1}</span>
                    <span>
                      <strong className="text-mk-text">{t}</strong> — {d}
                    </span>
                  </li>
                ))}
              </ol>
              <Link href="/search?q=Karakter%20yang%20menggunakan%20api&mode=semantic" className="btn-primary">
                Coba semantic search
              </Link>
            </div>
          </Section>
        </div>
      </Container>
    </>
  );
}
