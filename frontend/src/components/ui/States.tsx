import Link from "next/link";
import type { ReactNode } from "react";

/** Loading / Empty / Error state — dipakai di seluruh halaman. */

export function LoadingState({ variant = "grid", count = 8, label = "Memuat data…" }: { variant?: "grid" | "list" | "detail"; count?: number; label?: string }) {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      {variant === "detail" ? (
        <div className="space-y-6">
          <div className="skeleton h-72 w-full rounded-sm" />
          <div className="skeleton h-6 w-1/3 rounded-sm" />
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-32 rounded-sm" />
            ))}
          </div>
        </div>
      ) : variant === "list" ? (
        <div className="space-y-3">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="skeleton h-28 rounded-sm" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-sm border border-mk-border">
              <div className="skeleton aspect-[4/5]" />
              <div className="space-y-2 p-3">
                <div className="skeleton h-4 w-2/3 rounded-sm" />
                <div className="skeleton h-3 w-1/2 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function EmptyState({
  title = "Belum ada data",
  description = "Data untuk bagian ini belum tersedia di Knowledge Base.",
  action,
  icon = "∅",
}: {
  title?: string;
  description?: ReactNode;
  action?: ReactNode;
  icon?: string;
}) {
  return (
    <div className="panel flex flex-col items-center rounded-sm px-6 py-14 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-mk-border text-2xl text-mk-muted" aria-hidden="true">
        {icon}
      </span>
      <h3 className="mt-4 font-heading text-lg font-bold">{title}</h3>
      <div className="mt-2 max-w-md text-sm text-mk-muted">{description}</div>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({ error, onRetry, title }: { error?: Error | null; onRetry?: () => void; title?: string }) {
  const notFound = (error as { kind?: string } | undefined)?.kind === "not-found";
  return (
    <div role="alert" className="flex flex-col items-center rounded-sm border border-mk-red/50 bg-mk-red-deep/15 px-6 py-14 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-mk-red/60 text-2xl text-mk-red" aria-hidden="true">
        !
      </span>
      <h3 className="mt-4 font-heading text-lg font-bold">{title ?? (notFound ? "Data tidak ditemukan" : "Terjadi kesalahan")}</h3>
      <p className="mt-2 max-w-md text-sm text-mk-muted">{error?.message ?? "Gagal memuat data. Silakan coba lagi."}</p>
      <div className="mt-6 flex gap-3">
        {onRetry && !notFound && (
          <button type="button" onClick={onRetry} className="btn-primary">
            Coba lagi
          </button>
        )}
        <Link href="/" className="btn-ghost">
          Ke beranda
        </Link>
      </div>
    </div>
  );
}
