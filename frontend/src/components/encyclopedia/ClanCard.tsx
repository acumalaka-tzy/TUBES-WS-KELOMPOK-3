import Link from "next/link";
import type { Organization } from "@/lib/types";

export default function ClanCard({ clan }: { clan: Organization }) {
  return (
    <Link
      href={`/organizations/${clan.id}`}
      className="group block rounded border border-mk-border bg-mk-card p-4 transition duration-200 hover:-translate-y-0.5 hover:border-mk-gold/70 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2 border-b border-mk-border/50 pb-2.5">
        <h4 className="font-heading text-base font-bold text-mk-text group-hover:text-mk-gold transition-colors">
          {clan.name}
        </h4>
        <span className="rounded bg-mk-bg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-mk-navy dark:text-blue-300 border border-mk-border/60">
          {clan.type}
        </span>
      </div>

      <p className="mt-2.5 text-xs text-mk-muted leading-relaxed line-clamp-3">
        {clan.description}
      </p>

      {clan.members && clan.members.length > 0 && (
        <div className="mt-4 border-t border-mk-border/40 pt-2.5">
          <p className="text-[10px] uppercase tracking-wider text-mk-muted mb-1.5 font-medium">
            Anggota Terkemuka:
          </p>
          <div className="flex flex-wrap gap-1">
            {clan.members.slice(0, 4).map((m) => (
              <span
                key={m.id}
                className="rounded bg-mk-bg px-1.5 py-0.5 text-[10px] font-medium text-mk-text/90 border border-mk-border/50"
              >
                {m.name}
              </span>
            ))}
            {clan.members.length > 4 && (
              <span className="text-[10px] text-mk-muted px-1 self-center">
                +{clan.members.length - 4}
              </span>
            )}
          </div>
        </div>
      )}
    </Link>
  );
}
