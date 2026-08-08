import type { Metadata } from "next";

import { site } from "@/config/site";
import {
  enabledLocales,
  htmlLang,
  pathFor,
  type EnabledLocale,
  type LegalPage,
} from "@/i18n/locales";

/**
 * Baut `alternates` für eine Seite: canonical plus hreflang für jede
 * aktivierte Locale und `x-default` auf die Primärsprache.
 *
 * Sobald weitere Locales in `enabledLocales` stehen, wachsen die hreflang-Tags
 * automatisch mit — es muss keine Seite angefasst werden.
 */
export function alternatesFor(
  locale: EnabledLocale,
  page?: LegalPage,
): Metadata["alternates"] {
  const languages: Record<string, string> = {};

  for (const other of enabledLocales) {
    languages[htmlLang[other]] = pathFor(other, page);
  }
  languages["x-default"] = pathFor("de", page);

  return {
    canonical: pathFor(locale, page),
    languages,
  };
}

/** Open-Graph-/Twitter-Block, den alle Seiten teilen. */
export function socialFor({
  title,
  description,
  locale,
  page,
}: {
  title: string;
  description: string;
  locale: EnabledLocale;
  page?: LegalPage;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const url = `${site.url}${pathFor(locale, page)}`;

  return {
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: htmlLang[locale].replace("-", "_"),
      url,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * `SoftwareApplication`-Schema für die Startseite.
 *
 * Ohne `aggregateRating`: Bewertungssterne dürfen laut Google nur ausgezeichnet
 * werden, wenn sie auf der Seite auch sichtbar sind — und echte Zahlen liegen
 * noch nicht vor. Ergänzen, sobald das App-Store-Rating stabil ist.
 */
export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Disha",
    alternateName: "Disha: Essensplaner Budget",
    description:
      "KI-gestützter Budget-Essensplaner: kompletter 7-Tage-Wochenplan mit Rezepten und einer nach Supermarkt-Gängen sortierten Einkaufsliste.",
    applicationCategory: "LifestyleApplication",
    applicationSubCategory: "Food & Drink",
    operatingSystem: "iOS, Android",
    url: `${site.url}/de`,
    installUrl: [site.stores.ios, site.stores.android],
    inLanguage: [
      "de",
      "en",
      "es",
      "it",
      "pt",
      "fr",
      "nl",
      "da",
      "no",
      "fi",
      "sv",
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Disha Premium – monatlich",
        price: site.pricing.monthly.raw,
        priceCurrency: site.pricing.currency,
        category: "subscription",
      },
      {
        "@type": "Offer",
        name: "Disha Premium – jährlich",
        price: site.pricing.yearly.raw,
        priceCurrency: site.pricing.currency,
        category: "subscription",
      },
    ],
    author: { "@type": "Organization", name: "Disha" },
  };
}

/** `FAQPage`-Schema aus den Fragen der Landingpage. */
export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
