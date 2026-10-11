import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";

import "@/app/globals.css";

import { Container } from "@/components/Container";
import { kalia } from "@/config/kalia";
import { site } from "@/config/site";
import { pathFor } from "@/i18n/locales";

/**
 * Eigenes Root-Layout für die Rechtstexte der App Kalia.
 *
 * Kalia ist eine von Disha getrennte App — deshalb weder Disha-Header noch
 * -Footer und kein Smart-App-Banner für Disha. Abschnitt 10 der Kalia-
 * Datenschutzerklärung sagt zu: keine Cookies, keine Analyse, keine externen
 * Fonts, Karten oder Videos. Das gilt hier wie auf der ganzen Website; wer an
 * diesen Seiten etwas ergänzt, muss das einhalten oder den Text anpassen.
 *
 * Der statische Ordner `Kalia` hat Vorrang vor `[locale]`, deshalb landet
 * `/Kalia/...` hier und nicht in der 404 des Locale-Layouts.
 */

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: kalia.name,
  icons: { icon: "/brand/kalia-icon.svg" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const WORDMARK_HEIGHT = 26;
const WORDMARK_WIDTH = Math.round((WORDMARK_HEIGHT * 1087.8) / 477.4);

export default function KaliaLayout({ children }: LayoutProps<"/Kalia">) {
  const links = [
    { href: kalia.paths.privacy, label: "Privacy Policy" },
    { href: kalia.paths.terms, label: "Terms of Use" },
  ];

  return (
    <html lang="en-US">
      <body className="bg-white antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-accent focus:px-5 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>

        <header className="border-b border-hairline/50">
          <Container
            size="prose"
            className="flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4"
          >
            <Image
              src="/brand/kalia-wordmark.svg"
              alt={kalia.name}
              width={WORDMARK_WIDTH}
              height={WORDMARK_HEIGHT}
              unoptimized
              priority
            />
            <nav aria-label="Legal">
              <ul className="flex gap-5 text-[14px]">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-ink-soft transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </header>

        <main id="content">{children}</main>

        <footer className="border-t border-hairline/50 bg-surface-2 py-10">
          <Container size="prose">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[14px]">
              {[
                ...links,
                { href: pathFor("en", "imprint"), label: "Legal Notice" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-soft transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[14px] text-ink-soft">
              <a
                href={`mailto:${kalia.contactEmail}`}
                className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
              >
                {kalia.contactEmail}
              </a>
            </p>
          </Container>
        </footer>
      </body>
    </html>
  );
}
