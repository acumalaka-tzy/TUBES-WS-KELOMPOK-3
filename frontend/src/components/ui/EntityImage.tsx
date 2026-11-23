"use client";

import { useState } from "react";
import type { ImageAsset } from "@/lib/types";

/**
 * Menampilkan gambar resmi karakter/game.
 * Apabila terjadi kegagalan jaringan atau URL tidak tersedia,
 * sistem secara mulus menampilkan fallback siluet/inisial bergaya Mortal Kombat.
 */
export default function EntityImage({
  image,
  name,
  contextLabel,
  className = "",
  aspect = "aspect-[4/5]",
  priority = false,
}: {
  image?: ImageAsset;
  name: string;
  contextLabel?: string;
  className?: string;
  aspect?: string;
  priority?: boolean;
  showNotice?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const hasImage = !!image?.assetURL && !hasError;

  const initials = name
    .replace(/\(.*?\)/g, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  const hue = Array.from(name).reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);

  return (
    <div className={`relative overflow-hidden bg-mk-card ${aspect} ${className}`}>
      {hasImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image!.assetURL}
          alt={image!.alt ?? name}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      ) : (
        <div
          role="img"
          aria-label={image?.alt ?? `Ilustrasi ${name}`}
          className="flex h-full w-full flex-col items-center justify-center"
          style={{
            background: `radial-gradient(circle at 50% 35%, hsl(${hue} 45% 22% / 0.9), transparent 65%), linear-gradient(160deg, #191b24, #08090d)`,
          }}
        >
          <span className="font-display text-5xl tracking-wider text-mk-text/80 sm:text-6xl">{initials}</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mk-bg/90 via-transparent to-transparent" />
      {contextLabel && (
        <span className="absolute left-2 top-2 rounded-sm bg-mk-bg/85 px-2 py-0.5 text-[10px] uppercase tracking-widest text-mk-gold border border-mk-border/50">
          {contextLabel}
        </span>
      )}
    </div>
  );
}
