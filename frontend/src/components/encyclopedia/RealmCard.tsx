import Link from "next/link";

interface RealmInfo {
  id: string;
  name: string;
  description: string;
  ruler?: string;
  inhabitants?: string;
}

export default function RealmCard({ realm }: { realm: RealmInfo }) {
  return (
    <Link
      href={`/realms/${realm.id}`}
      className="group block rounded border border-mk-border bg-mk-card p-4 transition duration-200 hover:-translate-y-0.5 hover:border-mk-gold/70 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2 border-b border-mk-border/50 pb-2.5">
        <h4 className="font-heading text-base font-bold text-mk-text group-hover:text-mk-gold transition-colors">
          {realm.name}
        </h4>
        <span className="rounded bg-mk-bg px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-mk-red border border-mk-border/60">
          Realm
        </span>
      </div>

      <p className="mt-2.5 text-xs text-mk-muted leading-relaxed line-clamp-3">
        {realm.description}
      </p>

      <div className="mt-4 flex flex-col gap-1 border-t border-mk-border/40 pt-2.5 text-[11px]">
        {realm.ruler && (
          <div className="flex items-center justify-between">
            <span className="text-mk-muted">Penguasa/Dewa:</span>
            <span className="font-medium text-mk-text">{realm.ruler}</span>
          </div>
        )}
        {realm.inhabitants && (
          <div className="flex items-center justify-between">
            <span className="text-mk-muted">Penghuni:</span>
            <span className="font-medium text-mk-text">{realm.inhabitants}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
