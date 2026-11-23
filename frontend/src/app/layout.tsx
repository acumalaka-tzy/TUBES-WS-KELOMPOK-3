import type { Metadata } from "next";
import { Bebas_Neue, Cinzel, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingAssistant from "@/components/ai/FloatingAssistant";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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
  icons: {
    icon: "/images/mk-logo.svg",
    shortcut: "/images/mk-logo.svg",
    apple: "/images/mk-logo.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${inter.variable} ${cinzel.variable} ${bebas.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/images/mk-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/mk-logo.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                function purgeDevTools() {
                  try {
                    var els = document.querySelectorAll('nextjs-portal, script[data-nextjs-dev-overlay], [data-nextjs-dev-overlay]');
                    for (var i = 0; i < els.length; i++) {
                      els[i].remove();
                    }
                  } catch (e) {}
                }
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', purgeDevTools);
                } else {
                  purgeDevTools();
                }
                try {
                  var observer = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var added = mutations[i].addedNodes;
                      for (var j = 0; j < added.length; j++) {
                        var node = added[j];
                        if (node.nodeType === 1) {
                          var tag = (node.tagName || '').toUpperCase();
                          if (tag === 'NEXTJS-PORTAL' || (node.getAttribute && node.getAttribute('data-nextjs-dev-overlay'))) {
                            node.remove();
                          }
                        }
                      }
                    }
                  });
                  observer.observe(document.documentElement, { childList: true, subtree: true });
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-mk-bg text-mk-text">
        <ThemeProvider>
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
          <FloatingAssistant />
        </ThemeProvider>
      </body>
    </html>
  );
}
