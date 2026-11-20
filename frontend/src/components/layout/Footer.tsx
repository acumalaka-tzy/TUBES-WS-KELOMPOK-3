import Link from "next/link";
import { USE_MOCK } from "@/lib/api";

const groups = [
  {
    title: "Ensiklopedia",
    links: [
      { label: "Karakter", href: "/characters" },
      { label: "Game", href: "/games" },
      { label: "Kemampuan & Jurus", href: "/abilities" },
      { label: "Senjata", href: "/weapons" },
    ],
  },
  {
    title: "Lore",
    links: [
      { label: "Klan & Organisasi", href: "/organizations" },
      { label: "Timeline", href: "/timelines" },
      { label: "Story Explorer", href: "/story" },
      { label: "Story Timeline", href: "/story/timeline" },
    ],
  },
  {
    title: "Nexus",
    links: [
      { label: "Global Search", href: "/search" },
      { label: "Knowledge Graph", href: "/knowledge-graph" },
      { label: "Explore", href: "/explore" },
      { label: "About", href: "/about" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-mk-border bg-mk-bg2">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-heading text-lg font-bold tracking-[0.2em]">MK NEXUS</p>
          <p className="mt-3 text-sm text-mk-muted">
            Semantic Knowledge Graph &amp; Hybrid Search Engine untuk lore Mortal Kombat. Tugas Besar Kelompok 3.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mk-gold">{g.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-mk-muted hover:text-mk-text">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-mk-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-mk-muted sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>
            <strong className="text-mk-text">Proyek penggemar tidak resmi.</strong> Mortal Kombat dan seluruh merek terkait adalah milik
            pemegang hak masing-masing. Situs ini tidak berafiliasi dengan Warner Bros. Games maupun NetherRealm Studios.
          </p>
          {USE_MOCK && (
            <p className="shrink-0 rounded-sm border border-mk-gold/40 px-2 py-1 text-mk-gold">Mode data contoh (mock)</p>
          )}
        </div>
      </div>
    </footer>
  );
}
