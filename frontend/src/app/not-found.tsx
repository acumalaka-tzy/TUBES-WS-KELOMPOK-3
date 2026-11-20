import Link from "next/link";
import { Container } from "@/components/ui/Layout";

export default function NotFound() {
  return (
    <section className="hero-bg">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-8xl text-mk-red text-glow">404</p>
        <h1 className="mt-2 font-heading text-3xl font-bold">Halaman tidak ditemukan</h1>
        <p className="mt-3 max-w-md text-mk-muted">Halaman atau entitas yang Anda cari tidak tersedia di Knowledge Nexus.</p>
        <div className="mt-8 flex gap-3">
          <Link href="/" className="btn-primary">
            Ke beranda
          </Link>
          <Link href="/search" className="btn-ghost">
            Cari entitas
          </Link>
        </div>
      </Container>
    </section>
  );
}
