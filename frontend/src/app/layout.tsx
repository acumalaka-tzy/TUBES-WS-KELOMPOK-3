import type { Metadata } from "next";
import { Bebas_Neue, Cinzel, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["600", "700", "800"] });
const bebas = Bebas_Neue({ variable: "--font-bebas", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: {
    default: "MK Knowledge Nexus — Ensiklopedia & Semantic Search Mortal Kombat",
    template: "%s | MK Knowledge Nexus",
  },
  description:
    "Mortal Kombat Knowledge Nexus: ensiklopedia karakter, game, kemampuan, senjata, klan, timeline, dan cerita berbasis Semantic Knowledge Graph & Hybrid Search.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${inter.variable} ${cinzel.variable} ${bebas.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-mk-bg text-mk-text">
        <a
          href="#main-content"
          className="sr-only z-[100] rounded bg-mk-red px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Lewati ke konten utama
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
