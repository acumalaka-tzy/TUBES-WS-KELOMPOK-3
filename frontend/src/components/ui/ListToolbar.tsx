"use client";

import type { ReactNode } from "react";

/** Toolbar filter untuk halaman daftar ensiklopedia. */
export default function ListToolbar({
  query,
  onQuery,
  placeholder = "Filter berdasarkan nama…",
  total,
  children,
}: {
  query: string;
  onQuery: (v: string) => void;
  placeholder?: string;
  total?: number;
  children?: ReactNode;
}) {
  return (
    <div className="panel mb-6 flex flex-col gap-3 rounded-sm p-3 md:flex-row md:items-center">
      <label className="relative flex-1">
        <span className="sr-only">{placeholder}</span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-sm border border-mk-border bg-mk-bg px-4 py-2.5 text-sm text-mk-text placeholder:text-mk-muted focus:border-mk-red focus:outline-none"
        />
      </label>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
      {typeof total === "number" && (
        <p className="shrink-0 text-xs uppercase tracking-widest text-mk-muted" aria-live="polite">
          {total} hasil
        </p>
      )}
    </div>
  );
}

export function SelectFilter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-2 text-xs text-mk-muted">
      <span className="uppercase tracking-widest">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-auto rounded-sm border border-mk-border bg-mk-bg px-3 py-2 text-sm text-mk-text focus:border-mk-red focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
