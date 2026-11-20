import type { ImageAsset } from "@/lib/types";

/**
 * Menampilkan gambar karakter/game sesuai konteks versi game (PRD 25.5 & 29.6).
 * Hanya aset dengan rightsStatus "approved" dan memiliki assetURL yang ditampilkan;
 * selain itu ditampilkan fallback netral (tanpa aset berhak cipta).
 */
export default function EntityImage({
  image,
  name,
  contextLabel,
  className = "",
  aspect = "aspect-[4/5]",
  priority = false,
  showNotice = false,
}: {
  image?: ImageAsset;
  name: string;
  contextLabel?: string;
  className?: string;
  aspect?: string;
  priority?: boolean;
  showNotice?: boolean;
}) {
  const approved = image?.rightsStatus === "approved" && !!image.assetURL;
  const initials = name
    .replace(/\(.*?\)/g, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  // warna fallback deterministik per nama agar tiap entitas tampak berbeda
  const hue = Array.from(name).reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);

  return (
    <div className={`relative overflow-hidden bg-mk-card ${aspect} ${className}`}>
      {approved ? (
        // eslint-disable-next-line @next/next/no-img-element -- URL aset berasal dari CDN yang dikonfigurasi API
        <img
          src={image!.assetURL}
          alt={image!.alt ?? name}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={image?.alt ?? `Ilustrasi placeholder ${name}`}
          className="flex h-full w-full flex-col items-center justify-center"
          style={{
            background: `radial-gradient(circle at 50% 30%, hsl(${hue} 45% 22% / 0.9), transparent 65%), linear-gradient(160deg, #191b24, #08090d)`,
          }}
        >
          <span className="font-display text-5xl tracking-wider text-mk-text/80 sm:text-6xl">{initials}</span>
          {showNotice && <span className="mt-2 px-3 text-center text-[10px] uppercase tracking-widest text-mk-muted">Gambar menunggu persetujuan hak cipta</span>}
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-mk-bg via-transparent to-transparent" />
      {contextLabel && (
        <span className="absolute left-2 top-2 rounded-sm bg-mk-bg/80 px-2 py-0.5 text-[10px] uppercase tracking-widest text-mk-gold">
          {contextLabel}
        </span>
      )}
      {approved && image?.attribution && (
        <span className="absolute bottom-1 right-2 text-[9px] text-mk-muted">© {image.attribution}</span>
      )}
    </div>
  );
}
