import Link from "next/link";
import type { ReactNode } from "react";
import type { SourceRef } from "@/lib/types";
import { VerificationBadge } from "./Badge";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-mk-muted">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-mk-text">
            Home
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            <span aria-hidden="true">/</span>
            {c.href ? (
              <Link href={c.href} className="hover:text-mk-text">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-mk-text">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Header halaman list/kategori. */
export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="hero-bg border-b border-mk-border">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pt-10">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-mk-red">{eyebrow}</p>}
        <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-wide sm:text-5xl">{title}</h1>
        {description && <div className="mt-3 max-w-3xl text-sm text-mk-muted sm:text-base">{description}</div>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Section({
  id,
  title,
  action,
  children,
  className = "",
}: {
  id?: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-32 ${className}`}>
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="flex items-center gap-3 font-heading text-xl font-bold tracking-wide sm:text-2xl">
          <span className="h-6 w-1 bg-mk-red" aria-hidden="true" />
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function InfoGrid({ items }: { items: { label: string; value?: ReactNode }[] }) {
  return (
    <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-mk-border bg-mk-border sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <div key={it.label} className="bg-mk-card p-4">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mk-muted">{it.label}</dt>
          <dd className="mt-1 text-sm text-mk-text">{it.value || <span className="text-mk-muted">Belum tersedia</span>}</dd>
        </div>
      ))}
    </dl>
  );
}

export function SourceList({ sources }: { sources?: SourceRef[] }) {
  if (!sources?.length) return <p className="text-sm text-mk-muted">Belum ada sumber tercatat.</p>;
  return (
    <ul className="space-y-2">
      {sources.map((s) => (
        <li key={s.id} className="flex flex-wrap items-center gap-3 rounded-sm border border-mk-border bg-mk-card px-4 py-3 text-sm">
          <span aria-hidden="true" className="text-mk-gold">
            ❖
          </span>
          {s.url ? (
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="flex-1 text-mk-text underline-offset-4 hover:underline">
              {s.title}
            </a>
          ) : (
            <span className="flex-1">{s.title}</span>
          )}
          {s.sourceType && <span className="text-xs text-mk-muted">{s.sourceType}</span>}
          <VerificationBadge status={s.verificationStatus} />
        </li>
      ))}
    </ul>
  );
}
