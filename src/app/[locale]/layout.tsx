import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import "@/app/globals.css";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getContent } from "@/content";
import { site } from "@/config/site";
import { enabledLocales, htmlLang, isEnabledLocale } from "@/i18n/locales";
import { alternatesFor, socialFor } from "@/lib/seo";

/**
 * Root-Layout.
 *
 * Es liegt absichtlich unter `[locale]` und nicht in `app/` — nur so kann
 * `<html lang>` den tatsächlichen Sprachcode der Route tragen. Der Einstieg
 * über `/` wird per Redirect in next.config.ts auf `/de` geleitet.
 *
 * `generateStaticParams` erzeugt zur Build-Zeit eine Route je aktivierter
 * Locale; `dynamicParams = false` lässt alles andere in eine 404 laufen statt
 * on-demand zu rendern. Damit bleibt die Seite vollständig statisch.
 */

export async function generateStaticParams() {
  return enabledLocales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: [
    // Der Hero ist dunkel — die Systemleiste soll dazu passen.
    { media: "(prefers-color-scheme: light)", color: "#060b08" },
    { media: "(prefers-color-scheme: dark)", color: "#060b08" },
  ],
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isEnabledLocale(locale)) return {};
  const t = getContent(locale);

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t.meta.title,
      template: t.meta.titleTemplate,
    },
    description: t.meta.description,
    keywords: [...t.meta.keywords],
    applicationName: site.name,
    alternates: alternatesFor(locale),
    ...socialFor({
      title: t.meta.title,
      description: t.meta.description,
      locale,
    }),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    // Apple Smart App Banner: iOS-Besucher landen direkt in der App.
    appleWebApp: { capable: false, title: site.name },
    other: {
      "apple-itunes-app": "app-id=6779303849",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isEnabledLocale(locale)) notFound();
  const t = getContent(locale);

  return (
    <html lang={htmlLang[locale]}>
      <head>
        {/*
          Ohne JavaScript läuft kein IntersectionObserver — die Reveal-Elemente
          würden dauerhaft auf `opacity: 0` stehen und die halbe Seite wäre
          leer. Dieses Override macht sämtliche Inhalte sofort sichtbar. Es
          steht absichtlich im `<head>`, damit es vor dem ersten Paint greift.
        */}
        <noscript>
          <style>{`
            [data-reveal], .word {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
      </head>
      <body className="bg-night antialiased">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-white focus:px-5 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-accent"
        >
          {t.nav.skipToContent}
        </a>

        <SiteHeader locale={locale} />
        <main id="inhalt">{children}</main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
