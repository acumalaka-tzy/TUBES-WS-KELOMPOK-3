"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MAIN_NAV } from "@/lib/routes";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navSearch, setNavSearch] = useState("");

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = navSearch.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${
        scrolled ? "border-mk-border bg-mk-bg/95 backdrop-blur-md shadow-lg" : "border-mk-border/40 bg-mk-bg/80 backdrop-blur-sm"
      }`}
    >
      <nav aria-label="Navigasi utama" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* SISI KIRI: Brand Logo + Prominent Search Bar */}
        <div className="flex items-center gap-3 md:gap-5 flex-1 max-w-2xl">
          {/* Brand Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="MK Knowledge Nexus — Beranda">
            <span className="grid h-9 w-9 place-items-center rounded-sm border border-mk-red/70 bg-gradient-to-br from-mk-red-deep to-mk-bg font-display text-xl text-mk-gold shadow-md group-hover:glow-red transition">
              N
            </span>
            <span className="leading-none hidden sm:block">
              <span className="block font-heading text-sm font-bold tracking-[0.2em] text-mk-text">MK NEXUS</span>
              <span className="block text-[9px] uppercase tracking-[0.22em] text-mk-muted">Mortal Kombat</span>
            </span>
          </Link>

          {/* Prominent Search Bar (Kiri, Ukuran Proporsional Besar) */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          >
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-3 text-mk-muted">
                <SearchIcon className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Cari karakter, game, jurus..."
                className="w-full rounded-sm border border-mk-border/80 bg-mk-card/90 py-1.5 pl-9 pr-8 text-xs text-mk-text placeholder:text-mk-muted/80 transition-colors focus:border-mk-red focus:bg-mk-bg focus:outline-none focus:ring-1 focus:ring-mk-red/50 shadow-inner"
              />
              {navSearch && (
                <button
                  type="button"
                  onClick={() => setNavSearch("")}
                  className="absolute right-2.5 text-xs text-mk-muted hover:text-mk-text"
                >
                  ✕
                </button>
              )}
            </div>
          </form>
        </div>

        {/* SISI KANAN: Navigasi Menu Utama di Kanan Layar */}
        <div className="flex items-center gap-2">
          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
            {MAIN_NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${
                      active ? "text-mk-text" : "text-mk-muted hover:text-mk-text"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute inset-x-3 -bottom-[19px] h-0.5 bg-mk-red shadow-[0_0_8px_rgba(181,31,43,0.8)]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu trigger */}
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-sm border border-mk-border text-mk-text lg:hidden transition hover:border-mk-gold"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-mk-border bg-mk-bg2 lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
          <ul className="mx-auto max-w-7xl px-4 py-3 space-y-1">
            {MAIN_NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between border-l-2 px-3 py-3 text-xs uppercase tracking-widest transition rounded-r-sm ${
                      active
                        ? "border-mk-red bg-mk-card text-mk-text font-bold"
                        : "border-transparent text-mk-muted hover:border-mk-border hover:bg-mk-card/50 hover:text-mk-text"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="text-xs text-mk-red">●</span>}
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
