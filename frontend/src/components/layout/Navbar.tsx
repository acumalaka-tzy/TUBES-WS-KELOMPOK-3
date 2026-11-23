"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MAIN_NAV } from "@/lib/routes";
import { useTheme } from "@/components/theme/ThemeProvider";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, language, toggleLanguage } = useTheme();
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

  const openAiAssistant = () => {
    window.dispatchEvent(new CustomEvent("open-mkn-assistant"));
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-200 ${
        scrolled
          ? "border-mk-border bg-mk-card/95 backdrop-blur-md shadow-sm"
          : "border-mk-border bg-mk-card/85 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* KIRI: Logo + Search Bar Menonjol */}
        <div className="flex items-center gap-3 sm:gap-5 flex-1 max-w-2xl">
          {/* Logo Website */}
          <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Mortal Kombat Knowledge Nexus">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-mk-gold/50 shadow-sm transition group-hover:scale-105 group-hover:border-mk-gold">
              <Image
                src="/images/mk-logo.svg"
                alt="Mortal Kombat Dragon Logo"
                width={36}
                height={36}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span className="leading-tight hidden sm:block">
              <span className="block font-heading text-sm font-bold tracking-[0.16em] text-mk-text">MK NEXUS</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-mk-gold font-medium">Encyclopedia</span>
            </span>
          </Link>

          {/* Search Bar Besar di Sisi Kiri */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md"
          >
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-3 text-mk-muted">
                <SearchIcon className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder={language === "en" ? "Search characters, games, lore..." : "Cari karakter, game, jurus..."}
                className="w-full rounded border border-mk-border bg-mk-bg py-1.5 pl-9 pr-7 text-xs text-mk-text placeholder:text-mk-muted transition focus:border-mk-red focus:bg-mk-card focus:outline-none focus:ring-1 focus:ring-mk-red/30 shadow-2xs"
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

        {/* KANAN: 5 Menu Navigasi Utama + Tools Header */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 5 Menu Wajib (Home, Explore, Characters, Games, Story) */}
          <nav aria-label="Navigasi Utama" className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {MAIN_NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] rounded transition-colors ${
                    active
                      ? "text-mk-red font-bold bg-mk-red/10"
                      : "text-mk-text hover:text-mk-red hover:bg-mk-bg/60"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-2 -bottom-2 h-0.5 bg-mk-red rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block h-5 w-px bg-mk-border" />

          {/* Language Switcher (EN/ID) */}
          <button
            type="button"
            onClick={toggleLanguage}
            title={language === "id" ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian"}
            className="flex items-center gap-1 rounded border border-mk-border bg-mk-bg px-2 py-1 text-[11px] font-bold tracking-wider text-mk-text hover:border-mk-gold hover:text-mk-gold transition shadow-2xs"
          >
            <span className={language === "id" ? "text-mk-red font-extrabold" : "text-mk-muted font-normal"}>ID</span>
            <span className="text-mk-muted">/</span>
            <span className={language === "en" ? "text-mk-red font-extrabold" : "text-mk-muted font-normal"}>EN</span>
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Ganti ke Dark Mode" : "Ganti ke Light Mode"}
            title={theme === "light" ? "Ganti ke Dark Mode" : "Ganti ke Light Mode"}
            className="grid h-8 w-8 place-items-center rounded border border-mk-border bg-mk-bg text-mk-text hover:border-mk-gold hover:text-mk-gold transition shadow-2xs"
          >
            {theme === "light" ? (
              // Moon icon for switching to dark
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              // Sun icon for switching to light
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          {/* Header AI Assistant Shortcut */}
          <button
            type="button"
            onClick={openAiAssistant}
            title="Buka MK AI Knowledge Assistant"
            className="hidden sm:flex items-center gap-1.5 rounded border border-mk-gold/60 bg-gradient-to-r from-mk-card to-mk-bg px-2.5 py-1 text-xs font-semibold text-mk-gold hover:border-mk-gold hover:brightness-105 transition shadow-2xs"
          >
            <span className="text-xs">⚡</span>
            <span className="text-[11px] uppercase tracking-wider font-bold">AI Assistant</span>
          </button>

          {/* Mobile Menu trigger */}
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded border border-mk-border text-mk-text lg:hidden transition hover:border-mk-gold"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-mk-border bg-mk-card lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin shadow-xl">
          <div className="mx-auto max-w-7xl px-4 py-3 space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-mk-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-mk-muted">Pengaturan</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="rounded border border-mk-border bg-mk-bg px-2 py-0.5 text-xs font-bold text-mk-text"
                >
                  {language.toUpperCase()}
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="rounded border border-mk-border bg-mk-bg px-2 py-0.5 text-xs text-mk-text"
                >
                  {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                </button>
              </div>
            </div>

            <nav aria-label="Menu Mobile" className="space-y-1">
              {MAIN_NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 text-xs uppercase tracking-widest transition rounded ${
                      active
                        ? "bg-mk-red/10 text-mk-red font-bold border-l-3 border-mk-red"
                        : "text-mk-text hover:bg-mk-bg hover:text-mk-red"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="text-xs text-mk-red">●</span>}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openAiAssistant();
                }}
                className="w-full flex items-center justify-center gap-2 rounded border border-mk-gold/60 bg-mk-bg py-2 text-xs font-bold uppercase tracking-wider text-mk-gold hover:bg-mk-gold/10 transition"
              >
                <span>⚡ Buka AI Knowledge Assistant</span>
              </button>
            </div>
          </div>
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
