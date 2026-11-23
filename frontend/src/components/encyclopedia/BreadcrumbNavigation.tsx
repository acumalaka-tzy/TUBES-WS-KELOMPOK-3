import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export default function BreadcrumbNavigation({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-mk-muted">
        <li>
          <Link href="/" className="hover:text-mk-red transition-colors font-medium">
            Home
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              <span className="text-mk-border">/</span>
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-mk-red transition-colors font-medium">
                  {item.label}
                </Link>
              ) : (
                <span className="text-mk-text font-semibold line-clamp-1" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
