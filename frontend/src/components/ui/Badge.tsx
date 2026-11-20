import type { EntityType, VerificationStatus } from "@/lib/types";
import { TYPE_LABEL } from "@/lib/routes";

const TYPE_COLOR: Record<EntityType, string> = {
  character: "border-mk-red/60 text-red-300",
  game: "border-sky-500/50 text-sky-300",
  ability: "border-orange-500/50 text-orange-300",
  weapon: "border-zinc-400/50 text-zinc-300",
  organization: "border-emerald-500/50 text-emerald-300",
  timeline: "border-violet-500/50 text-violet-300",
  event: "border-mk-gold/60 text-mk-gold",
  location: "border-teal-500/50 text-teal-300",
  species: "border-pink-500/50 text-pink-300",
};

export function TypeBadge({ type }: { type: EntityType }) {
  return (
    <span className={`inline-flex items-center rounded-sm border bg-mk-bg/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${TYPE_COLOR[type]}`}>
      {TYPE_LABEL[type]}
    </span>
  );
}

const STATUS: Record<VerificationStatus, { label: string; cls: string; icon: string }> = {
  verified: { label: "Terverifikasi", cls: "border-emerald-500/50 text-emerald-300", icon: "✓" },
  "pending-review": { label: "Menunggu review", cls: "border-amber-500/50 text-amber-300", icon: "…" },
  disputed: { label: "Diperdebatkan", cls: "border-orange-500/50 text-orange-300", icon: "⚠" },
  unverified: { label: "Belum diverifikasi", cls: "border-zinc-500/50 text-zinc-400", icon: "?" },
};

/** Membedakan fakta terverifikasi vs belum (PRD 13.2 poin 6). */
export function VerificationBadge({ status }: { status?: VerificationStatus }) {
  if (!status) return null;
  const s = STATUS[status];
  return (
    <span title={s.label} className={`inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${s.cls}`}>
      <span aria-hidden="true">{s.icon}</span>
      {s.label}
    </span>
  );
}

export function Chip({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  const cls = `inline-flex items-center rounded-sm border px-3 py-1.5 text-xs font-medium tracking-wide transition ${
    active ? "border-mk-red bg-mk-red/15 text-mk-text" : "border-mk-border text-mk-muted hover:border-mk-muted hover:text-mk-text"
  }`;
  return onClick ? (
    <button type="button" aria-pressed={active} onClick={onClick} className={cls}>
      {children}
    </button>
  ) : (
    <span className={cls}>{children}</span>
  );
}
