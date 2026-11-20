"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MAIN_NAV } from "@/lib/routes";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? "border-mk-border bg-mk-bg/90 backdrop-blur-md" : "border-transparent bg-mk-bg/60 backdrop-blur-sm"
      }`}
    >
      <nav aria-label="Navigasi utama" className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-2" aria-label="MK Knowledge Nexus — Beranda">
          <span className="grid h-9 w-9 place-items-center rounded-sm border border-mk-red/70 bg-mk-red-deep/40 font-display text-xl text-mk-gold group-hover:glow-red">
            N
          </span>
          <span className="leading-none">
            <span className="block font-heading text-sm font-bold tracking-[0.2em] text-mk-text">MK NEXUS</span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-mk-muted">Knowledge Nexus</span>
          </span>
        </Link>

        <ul className="ml-6 hidden flex-1 items-center gap-1 lg:flex">
          {MAIN_NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3 py-2 text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
                    active ? "text-mk-text" : "text-mk-muted hover:text-mk-text"
                  }`}
                >
                  {item.label}
                  {active && <span className="absolute inset-x-3 -bottom-[13px] h-0.5 bg-mk-red" />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/search"
            className="flex items-center gap-2 rounded-sm border border-mk-border bg-mk-card/70 px-3 py-2 text-xs uppercase tracking-widest text-mk-muted transition hover:border-mk-red hover:text-mk-text"
          >
            <SearchIcon />
            <span className="hidden sm:inline">Search</span>
          </Link>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-sm border border-mk-border text-mk-text lg:hidden"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-mk-border bg-mk-bg2 lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-3">
            {MAIN_NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block border-l-2 px-3 py-3 text-sm uppercase tracking-widest ${
                      active ? "border-mk-red bg-mk-card text-mk-text" : "border-transparent text-mk-muted hover:text-mk-text"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

export function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
