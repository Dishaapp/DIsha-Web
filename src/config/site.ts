/**
 * Zentrale Konfiguration der Marketing-Website.
 *
 * Alles, was sich beim Launch oder bei einem Domain-/Preiswechsel ändern kann,
 * steht hier — nirgends sonst im Code hartkodiert.
 */

export const site = {
  /** Produktionsdomain ohne Trailing-Slash. */
  url: "https://www.getdisha.app",
  name: "Disha",
  /** Kleinschreibung ist Teil der Wortmarke (siehe assets/images/logo-wordmark.png). */
  wordmark: "disha",

  /** Support-/Kontaktadresse — erscheint im Footer und in den Rechtstexten. */
  contactEmail: "hello@getdisha.app",

  stores: {
    ios: "https://apps.apple.com/app/id6779303849",
    android: "https://play.google.com/store/apps/details?id=com.dishaapp.app",
  },

  /** Apple-Standard-EULA — bereits in der App-Store-Beschreibung verlinkt. */
  eulaUrl: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/",

  bundleId: "com.dishaapp.app",

  /**
   * Preise laut appstore/ASO_AppStore_Listing.md.
   * Jahresabo ist der Haupt-Anker (~27 % günstiger als 12 × monatlich).
   */
  pricing: {
    monthly: { amount: "4,99 €", period: "Monat", raw: 4.99 },
    yearly: { amount: "44,99 €", period: "Jahr", raw: 44.99, savingsPercent: 25 },
    currency: "EUR",
  },
} as const;

export type Site = typeof site;
