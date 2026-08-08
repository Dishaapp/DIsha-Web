import { de } from "@/content/de";
import { en } from "@/content/en";
import type { Content } from "@/content/de";
import type { EnabledLocale } from "@/i18n/locales";

export type { Content } from "@/content/de";

/**
 * Content-Register je aktivierter Locale.
 *
 * `satisfies Record<EnabledLocale, ...>` zwingt jede neu aktivierte Locale in
 * `src/i18n/locales.ts`, hier eine passende Content-Datei zu haben — der Build
 * bricht sonst mit einem Typfehler ab statt eine Seite ohne Text auszuliefern.
 */
export const content = { de, en } satisfies Record<EnabledLocale, Content>;

export function getContent(locale: EnabledLocale) {
  return content[locale];
}
