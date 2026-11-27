"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { getSuggestions } from "@/lib/api";
import { TYPE_LABEL } from "@/lib/routes";
import type { SearchMode, Suggestion } from "@/lib/types";
import { SearchIcon } from "@/components/layout/Navbar";

const HISTORY_KEY = "mkn:search-history";
const HISTORY_MAX = 8;

export function readHistory(): string[] {
  try {
    return JSON.parse(window.localStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function pushHistory(q: string) {
  const list = [q, ...readHistory().filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, HISTORY_MAX);
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
}

/**
 * Global search bar: input, autocomplete, riwayat pencarian lokal.
 */
export default function SearchBar({
  initialQuery = "",
  mode,
  size = "lg",
  autoFocus = false,
  placeholder = "Cari karakter, game, kemampuan, klan, atau tanyakan lore…",
}: {
  initialQuery?: string;
  mode?: SearchMode;
  size?: "lg" | "md";
  autoFocus?: boolean;
  placeholder?: string;
}) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Suggestion[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => setQuery(initialQuery), [initialQuery]);

  // autocomplete dengan debounce
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setItems([]);
      return;
    }
    let alive = true;
    setLoading(true);
    const t = setTimeout(() => {
      getSuggestions(q)
        .then((res) => alive && setItems(res))
        .catch(() => alive && setItems([]))
        .finally(() => alive && setLoading(false));
    }, 200);
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, [query]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const showHistory = query.trim().length < 2 && history.length > 0;
  const options: { key: string; label: string; sub?: string; go: () => void }[] = showHistory
    ? history.map((h) => ({ key: `h-${h}`, label: h, sub: "Riwayat", go: () => submit(h) }))
    : items.map((s) => ({ key: `${s.type}-${s.id}`, label: s.label, sub: TYPE_LABEL[s.type], go: () => { setOpen(false); router.push(s.href); } }));

  function submit(value = query) {
    const q = value.trim();
    if (!q) return;
    pushHistory(q);
    setOpen(false);
    const params = new URLSearchParams({ q });
    if (mode) params.set("mode", mode);
    router.push(`/search?${params.toString()}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(-1, i - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Enter" && active >= 0 && options[active]) {
      e.preventDefault();
      options[active].go();
    }
  }

  const big = size === "lg";

  return (
    <div ref={wrapRef} className="relative w-full">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className={`flex items-center gap-2 rounded-sm border border-mk-border bg-mk-bg/85 backdrop-blur focus-within:border-mk-red focus-within:glow-red ${big ? "p-2" : "p-1.5"}`}
      >
        <SearchIcon className={`${big ? "ml-3 h-5 w-5" : "ml-2 h-4 w-4"} shrink-0 text-mk-muted`} />
        <input
          type="search"
          role="combobox"
          aria-expanded={open && options.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          aria-label="Pencarian global"
          autoFocus={autoFocus}
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onFocus={() => {
            setHistory(readHistory());
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          className={`min-w-0 flex-1 bg-transparent text-mk-text placeholder:text-mk-muted focus:outline-none ${big ? "py-3 text-base sm:text-lg" : "py-2 text-sm"}`}
        />
        <button type="submit" className={`btn-primary shrink-0 ${big ? "" : "!px-3 !py-2"}`}>
          Cari
        </button>
      </form>

      {open && (options.length > 0 || (loading && query.trim().length >= 2)) && (
        <div className="absolute inset-x-0 top-full z-40 mt-1 overflow-hidden rounded-sm border border-mk-border bg-mk-bg2 shadow-2xl">
          {showHistory && (
            <div className="flex items-center justify-between border-b border-mk-border px-4 py-2 text-[10px] uppercase tracking-widest text-mk-muted">
              <span>Pencarian terakhir</span>
              <button
                type="button"
                className="hover:text-mk-red"
                onClick={() => {
                  window.localStorage.removeItem(HISTORY_KEY);
                  setHistory([]);
                }}
              >
                Hapus riwayat
              </button>
            </div>
          )}
          <ul id={listId} role="listbox" className="max-h-80 overflow-auto scrollbar-thin">
            {loading && !options.length && <li className="px-4 py-3 text-sm text-mk-muted">Mencari saran…</li>}
            {options.map((o, i) => (
              <li
                key={o.key}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => {
                  e.preventDefault();
                  o.go();
                }}
                onMouseEnter={() => setActive(i)}
                className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2.5 text-sm ${i === active ? "bg-mk-card text-mk-text" : "text-mk-muted"}`}
              >
                <span className="truncate text-mk-text">{o.label}</span>
                {o.sub && <span className="shrink-0 text-[10px] uppercase tracking-widest text-mk-gold">{o.sub}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
