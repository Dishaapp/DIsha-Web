import type { Metadata, Viewport } from "next";

import "@/app/globals.css";

import { kalia } from "@/config/kalia";
import { site } from "@/config/site";

/**
 * Eigenes Root-Layout für die Seiten der App Kalia.
 *
 * Kalia ist eine von Disha getrennte App — deshalb weder Disha-Header noch
 * -Footer und kein Smart-App-Banner für Disha. Abschnitt 10 der Kalia-
 * Datenschutzerklärung sagt zu: keine Cookies, keine Analyse, keine externen
 * Fonts, Karten oder Videos, kein Kontaktformular. Das gilt für alle Seiten
 * unter `/Kalia`; wer hier etwas ergänzt, muss das einhalten oder den Text
 * anpassen.
 *
 * Der statische Ordner `Kalia` hat Vorrang vor `[locale]`, deshalb landet
 * `/Kalia/...` hier und nicht in der 404 des Locale-Layouts. Kopf und Fuß der
 * Rechtstexte liegen in `(legal)/layout.tsx`, die Startseite hat ihre eigenen.
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

export default function KaliaLayout({ children }: LayoutProps<"/Kalia">) {
  return (
    <html lang="en-US">
      <body className="bg-white antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-white focus:px-5 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-accent"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
