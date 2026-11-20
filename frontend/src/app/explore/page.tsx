import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui/Layout";
import { CATEGORIES } from "@/lib/routes";

export const metadata: Metadata = { title: "Explore" };

export default function ExplorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Explore"
        title="Jelajahi Knowledge Nexus"
        description="Seluruh kategori ensiklopedia Mortal Kombat: karakter, game, kemampuan, senjata, klan, timeline, dan cerita."
        crumbs={[{ label: "Explore" }]}
      />
      <Container className="py-12">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="group panel flex h-full flex-col rounded-sm p-6 transition hover:border-mk-red/70">
                <span className="text-3xl" aria-hidden="true">
                  {c.icon}
                </span>
                <h2 className="mt-4 font-heading text-lg font-bold group-hover:text-mk-gold">{c.label}</h2>
                <p className="mt-2 text-sm text-mk-muted">{c.desc}</p>
                <span className="mt-auto pt-6 text-xs uppercase tracking-widest text-mk-red">Buka →</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
