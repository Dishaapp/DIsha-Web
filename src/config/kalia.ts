import { pathFor } from "@/i18n/locales";

/**
 * Kalia — eine eigenständige App, deren Seiten auf getdisha.app liegen.
 *
 * Die App verlinkt genau diese Pfade (mit großem K). Nicht umbenennen, sonst
 * zeigen die Links in der App und im Store-Listing ins Leere.
 */
export const kalia = {
  name: "Kalia",
  contactEmail: "kalia@getdisha.app",
  paths: {
    home: "/Kalia",
    privacy: "/Kalia/privacy",
    terms: "/Kalia/terms",
  },
} as const;

/** Rechtslinks für Kopf- und Fußzeilen der Kalia-Seiten. Das Impressum ist das der ganzen Website. */
export const kaliaLegalLinks = [
  { href: kalia.paths.privacy, label: "Privacy Policy" },
  { href: kalia.paths.terms, label: "Terms of Use" },
  { href: pathFor("en", "imprint"), label: "Legal Notice" },
] as const;
