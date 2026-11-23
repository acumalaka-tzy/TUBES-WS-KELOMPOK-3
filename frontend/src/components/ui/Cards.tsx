import Link from "next/link";
import type { ReactNode } from "react";
import type { EntityRef, EntityType, ImageAsset } from "@/lib/types";
import { entityHref } from "@/lib/routes";
import EntityImage from "./EntityImage";
import { TypeBadge } from "./Badge";

/** Kartu entitas umum dengan gambar (karakter, game). */
export function EntityCard({
  href,
  name,
  subtitle,
  type,
  image,
  contextLabel,
  aspect,
  objectPosition,
}: {
  href: string;
  name: string;
  subtitle?: string;
  type?: EntityType;
  image?: ImageAsset;
  contextLabel?: string;
  aspect?: string;
  objectPosition?: string;
}) {
  const pos = objectPosition || (type === "character" ? "object-top" : undefined);
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-sm border border-mk-border bg-mk-card transition hover:-translate-y-0.5 hover:border-mk-red/70 hover:glow-red"
    >
      <EntityImage
        image={image}
        name={name}
        contextLabel={contextLabel}
        aspect={aspect}
        objectPosition={pos}
        className="transition duration-500 group-hover:scale-[1.03]"
      />
      <div className="relative -mt-12 space-y-1 p-3">
        {type && <TypeBadge type={type} />}
        <h3 className="font-heading text-base font-bold leading-tight group-hover:text-glow">{name}</h3>
        {subtitle && <p className="line-clamp-2 text-xs text-mk-muted">{subtitle}</p>}
      </div>
    </Link>
  );
}

/** Kartu teks (tanpa gambar) untuk kemampuan, senjata, organisasi, timeline. */
export function InfoCard({
  href,
  title,
  description,
  meta,
  badges,
}: {
  href: string;
  title: string;
  description?: string;
  meta?: ReactNode;
  badges?: ReactNode;
}) {
  return (
    <Link href={href} className="group panel flex h-full flex-col rounded-sm p-5 transition hover:border-mk-red/70">
      {badges && <div className="mb-3 flex flex-wrap gap-2">{badges}</div>}
      <h3 className="font-heading text-lg font-bold group-hover:text-mk-gold">{title}</h3>
      {description && <p className="mt-2 line-clamp-3 flex-1 text-sm text-mk-muted">{description}</p>}
      {meta && <div className="mt-4 border-t border-mk-border pt-3 text-xs text-mk-muted">{meta}</div>}
    </Link>
  );
}

/** Daftar link entitas terkait — setiap relasi dapat diklik (FR-09). */
export function EntityLinks({ items, empty = "Belum ada data." }: { items?: EntityRef[]; empty?: string }) {
  if (!items?.length) return <p className="text-sm text-mk-muted">{empty}</p>;
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((it) => (
        <li key={`${it.type}-${it.id}`}>
          <Link
            href={entityHref(it)}
            className="inline-flex items-center gap-1 rounded-sm border border-mk-border bg-mk-bg/60 px-3 py-1.5 text-sm text-mk-text transition hover:border-mk-gold hover:text-mk-gold"
          >
            {it.name}
            <span aria-hidden="true" className="text-mk-muted">→</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
