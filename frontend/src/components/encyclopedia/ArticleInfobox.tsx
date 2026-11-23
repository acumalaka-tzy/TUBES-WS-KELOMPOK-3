import React, { type ReactNode } from "react";
import EntityImage from "@/components/ui/EntityImage";
import type { ImageAsset } from "@/lib/types";

export interface InfoboxRow {
  label: string;
  value: ReactNode;
}

export default function ArticleInfobox({
  title,
  subtitle,
  image,
  imageAspect = "aspect-[3/4]",
  objectPosition = "object-top",
  rows,
}: {
  title: string;
  subtitle?: string;
  image?: ImageAsset;
  imageAspect?: string;
  objectPosition?: string;
  rows: InfoboxRow[];
}) {
  return (
    <aside
      aria-label={`Infobox ${title}`}
      className="w-full lg:w-80 xl:w-88 shrink-0 overflow-hidden rounded border border-mk-border bg-mk-card shadow-sm"
    >
      {/* Header Infobox */}
      <div className="bg-mk-navy px-4 py-3 text-center border-b border-mk-border">
        <h2 className="font-heading text-lg font-bold tracking-wide text-white">{title}</h2>
        {subtitle && (
          <p className="mt-0.5 text-[11px] uppercase tracking-widest text-mk-gold">{subtitle}</p>
        )}
      </div>

      {/* Gambar Utama Infobox */}
      {image && (
        <div className="p-3 bg-mk-bg/50 border-b border-mk-border">
          <div className="overflow-hidden rounded border border-mk-border bg-mk-card shadow-inner">
            <EntityImage
              image={image}
              name={title}
              aspect={imageAspect}
              objectPosition={objectPosition}
              priority
            />
          </div>
        </div>
      )}

      {/* Bar Data Header */}
      <div className="bg-mk-bg px-3 py-1.5 text-center border-b border-mk-border">
        <span className="text-[10px] font-bold uppercase tracking-widest text-mk-muted">
          Informasi Ensiklopedia
        </span>
      </div>

      {/* Tabel Data Ensiklopedia */}
      <table className="w-full border-collapse text-xs">
        <tbody>
          {rows.map((row, idx) => {
            if (!row.value) return null;
            return (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-mk-card" : "bg-mk-bg/40"}
              >
                <th
                  scope="row"
                  className="w-2/5 p-2.5 text-left font-semibold text-mk-muted border-b border-mk-border/50 align-top text-[11px]"
                >
                  {row.label}
                </th>
                <td className="w-3/5 p-2.5 text-mk-text border-b border-mk-border/50 align-top text-[11px] leading-relaxed">
                  {row.value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </aside>
  );
}
