"use client";

import { Container } from "@/components/ui/Layout";
import { ErrorState } from "@/components/ui/States";

export default function GlobalRouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="py-20">
      <ErrorState error={error} onRetry={reset} title="Halaman gagal dimuat" />
    </Container>
  );
}
