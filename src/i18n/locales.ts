/**
 * i18n-Gerüst.
 *
 * `de` und `en` sind aktiv. Die übrigen neun App-Sprachen sind hier bereits
 * als Typ und Slug-Tabelle hinterlegt (Quelle: Website-Briefing.md,
 * Abschnitt 5), damit „Übersetzungen nachziehen“ später nur bedeutet:
 *   1. `src/content/<locale>.ts` anlegen,
 *   2. den Code in `enabledLocales` aufnehmen.
 * Routing, Metadaten, hreflang und sitemap.xml ziehen automatisch nach.
 */

export const allLocales = [
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
] as const;

export type Locale = (typeof allLocales)[number];

/** Nur diese Locales werden gebaut und in sitemap/hreflang aufgenommen. */
export const enabledLocales = [
  "de",
  "en",
] as const satisfies readonly Locale[];

export type EnabledLocale = (typeof enabledLocales)[number];

export const defaultLocale: EnabledLocale = "de";

export function isEnabledLocale(value: string): value is EnabledLocale {
  return (enabledLocales as readonly string[]).includes(value);
}

/** BCP-47-Tags für `<html lang>` und `hreflang`. */
export const htmlLang: Record<Locale, string> = {
  de: "de-DE",
  en: "en-US",
  es: "es-ES",
  it: "it-IT",
  pt: "pt-PT",
  fr: "fr-FR",
  nl: "nl-NL",
  da: "da-DK",
  no: "nb-NO",
  fi: "fi-FI",
  sv: "sv-SE",
};

/** Die drei Rechtsseiten, die jede Locale hat. */
export const legalPages = ["privacy", "imprint", "terms"] as const;
export type LegalPage = (typeof legalPages)[number];

/**
 * Lokalisierte Slugs. `de` muss `datenschutz` bleiben — diese URL ist bereits
 * im App-Store-Listing hinterlegt (siehe OFFENE-PUNKTE.md).
 */
export const slugs: Record<Locale, Record<LegalPage, string>> = {
  de: { privacy: "datenschutz", imprint: "impressum", terms: "agb" },
  en: { privacy: "privacy", imprint: "legal-notice", terms: "terms" },
  es: { privacy: "privacidad", imprint: "aviso-legal", terms: "terminos" },
  it: { privacy: "privacy", imprint: "note-legali", terms: "termini" },
  pt: { privacy: "privacidade", imprint: "aviso-legal", terms: "termos" },
  fr: {
    privacy: "confidentialite",
    imprint: "mentions-legales",
    terms: "conditions",
  },
  nl: { privacy: "privacy", imprint: "colofon", terms: "voorwaarden" },
  da: { privacy: "privatliv", imprint: "impressum", terms: "vilkaar" },
  no: { privacy: "personvern", imprint: "impressum", terms: "vilkar" },
  fi: { privacy: "tietosuoja", imprint: "impressum", terms: "ehdot" },
  sv: { privacy: "integritet", imprint: "impressum", terms: "villkor" },
};

/** Pfad einer Seite in einer Locale, z. B. `/de/datenschutz`. */
export function pathFor(locale: Locale, page?: LegalPage): string {
  return page ? `/${locale}/${slugs[locale][page]}` : `/${locale}`;
}
