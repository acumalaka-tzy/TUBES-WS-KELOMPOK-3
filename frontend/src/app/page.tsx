import Link from "next/link";
import { Container } from "@/components/ui/Layout";

export default function Home() {
  return (
    <section className="hero-bg">
      <Container className="py-28 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-mk-red">Mortal Kombat Knowledge Nexus</p>
        <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-6xl">Layout siap</h1>
        <p className="mt-4 text-mk-muted">Landing page lengkap dikerjakan pada branch fitur berikutnya.</p>
        <Link href="/explore" className="btn-primary mt-8">
          Explore
        </Link>
      </Container>
    </section>
  );
}
