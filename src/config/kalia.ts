/**
 * Kalia — eine eigenständige App, deren Rechtstexte auf getdisha.app liegen.
 *
 * Die App verlinkt genau diese Pfade (mit großem K). Nicht umbenennen, sonst
 * zeigen die Links in der App und im Store-Listing ins Leere.
 */
export const kalia = {
  name: "Kalia",
  contactEmail: "kalia@getdisha.app",
  paths: {
    privacy: "/Kalia/privacy",
    terms: "/Kalia/terms",
  },
} as const;
