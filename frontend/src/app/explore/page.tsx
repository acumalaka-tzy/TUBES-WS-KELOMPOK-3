import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/Layout";
import { CATEGORIES } from "@/lib/routes";

export const metadata: Metadata = { title: "Explore" };

function CategoryIcon({ href, className = "h-6 w-6" }: { href: string; className?: string }) {
  if (href === "/characters") {
    // Crossed Swords (Fighters)
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
        <line x1="13" y1="19" x2="19" y2="13" />
        <line x1="16" y1="16" x2="20" y2="20" />
        <line x1="19" y1="21" x2="21" y2="19" />
        <line x1="14.5" y1="6.5" x2="18" y2="3" />
        <line x1="17.5" y1="9.5" x2="21" y2="6" />
      </svg>
    );
  }
  if (href === "/games") {
    // Gamepad
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="6" width="20" height="12" rx="6" />
        <line x1="6" y1="12" x2="10" y2="12" />
        <line x1="8" y1="10" x2="8" y2="14" />
        <circle cx="15" cy="11" r="1" fill="currentColor" />
        <circle cx="17.5" cy="13" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (href === "/realms") {
    // Cosmic Celestial Realm Globe
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8" />
        <path d="M3.6 15h16.8" />
        <path d="M11.5 3a16 16 0 0 0 0 18" />
        <path d="M12.5 3a16 16 0 0 1 0 18" />
      </svg>
    );
  }
  if (href === "/abilities") {
    // Chi Flame / Special Move
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    );
  }
  if (href === "/weapons") {
    // Bladed Dagger
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
        <path d="m13 19 6 2 2-6-2-2-6 6Z" />
        <path d="m5 5 2 2" />
        <path d="m17 17 2 2" />
      </svg>
    );
  }
  if (href === "/organizations") {
    // Shield / Clan Crest
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 7v10" />
        <path d="M8 11h8" />
      </svg>
    );
  }
  if (href === "/timelines") {
    // Hourglass of Time
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M5 22h14" />
        <path d="M5 2h14" />
        <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
        <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
      </svg>
    );
  }
  if (href === "/story") {
    // Lore Scroll
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="15" y2="11" />
      </svg>
    );
  }
  // /story/timeline: Navigation Compass
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

export default function ExplorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Explore"
        title="Jelajahi Knowledge Nexus"
        description="Seluruh kategori ensiklopedia Mortal Kombat: karakter, game, dimensi realm, kemampuan, senjata, klan, timeline, dan cerita."
        crumbs={[{ label: "Explore" }]}
      />
      <Container className="py-12">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                className="group panel relative flex h-full flex-col justify-between overflow-hidden rounded-lg border border-mk-border bg-mk-card p-6 transition duration-200 hover:-translate-y-1 hover:border-mk-gold/70 hover:shadow-lg"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-mk-gold/30 bg-gradient-to-br from-mk-gold/15 to-mk-gold/5 text-mk-gold shadow-2xs transition-all duration-300 group-hover:scale-110 group-hover:border-mk-red/60 group-hover:from-mk-red/20 group-hover:to-mk-red/5 group-hover:text-mk-red">
                    <CategoryIcon href={c.href} className="h-6 w-6" />
                  </div>
                  <h2 className="mt-4 font-heading text-lg font-bold text-mk-text group-hover:text-mk-gold transition-colors">
                    {c.label}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-mk-muted">
                    {c.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-mk-border/50 pt-3 text-xs font-semibold uppercase tracking-wider text-mk-red group-hover:text-mk-gold transition-colors">
                  <span>Jelajahi Arsip</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
