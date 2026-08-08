import type { MetadataRoute } from "next";

import { site } from "@/config/site";
import { enabledLocales, htmlLang, legalPages, pathFor } from "@/i18n/locales";

/**
 * sitemap.xml für alle Locale × Seite-Kombinationen.
 *
 * Jeder Eintrag trägt zusätzlich `alternates.languages`, damit Google die
 * Sprachvarianten auch aus der Sitemap lesen kann (redundant zu den
 * hreflang-Tags im `<head>`, von Google aber ausdrücklich empfohlen).
 *
 * Das Impressum bleibt draußen: es ist per `robots: noindex` ausgenommen und
 * hätte in einer Sitemap ein widersprüchliches Signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languagesFor = (page?: (typeof legalPages)[number]) =>
    Object.fromEntries(
      enabledLocales.map((locale) => [
        htmlLang[locale],
        `${site.url}${pathFor(locale, page)}`,
      ]),
    );

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of enabledLocales) {
    entries.push({
      url: `${site.url}${pathFor(locale)}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: languagesFor() },
    });
  }

  for (const page of legalPages) {
    if (page === "imprint") continue;
    for (const locale of enabledLocales) {
      entries.push({
        url: `${site.url}${pathFor(locale, page)}`,
        lastModified,
        changeFrequency: "yearly",
        priority: 0.3,
        alternates: { languages: languagesFor(page) },
      });
    }
  }

  return entries;
}
