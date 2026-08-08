import { site } from "@/config/site";

/**
 * Deutsche Website-Copy — Quelle der Wahrheit.
 *
 * Herkunft und Regeln:
 * - Fließtext/Wortwahl abgeleitet aus `DishaApp/appstore/ASO_AppStore_Listing.md`
 *   (Abschnitt „Beschreibung“, de-DE) — nicht neu erfunden.
 * - Terminologie abgeglichen mit `DishaApp/src/locales/de.json`:
 *   Wochenplan · Einkaufsliste · Wochenbudget · Supermarkt · Haushalt ·
 *   Ernährung · Obst & Gemüse · Milchprodukte · Vorräte & Hülsenfrüchte ·
 *   Fleisch & Fisch · Allesesser · Vegetarisch · Vegan · High Protein.
 * - Tonalität: ruhig, konkret, keine Ausrufezeichen, kein „JETZT SPAREN“.
 * - Premium ist ein automatisch verlängerndes Abo. Nie als „kein Abo“ oder
 *   „Einmalkauf“ bewerben.
 */

export const de = {
  meta: {
    /* Basis: App-Name (26 Zeichen) + Untertitel (29) aus dem ASO-Doc, damit
       Web-SEO und App-Store-ASO dieselben Kernbegriffe teilen. */
    title: "Disha: Essensplaner fürs Budget | KI-Wochenplan & Einkaufsliste",
    titleTemplate: "%s | Disha",
    description:
      "Disha plant deine ganze Woche, passend zu deinem Budget, deinem Supermarkt und deinem Geschmack. 7-Tage-Plan mit Rezepten und fertiger Einkaufsliste. Erster Plan gratis, kein Account nötig.",
    ogAlt: "Disha: dein Wochenplan, dein Budget, in Sekunden",
    ogTagline: "KI-Wochenplan mit Rezepten und fertiger Einkaufsliste",
    keywords: [
      "Essensplaner",
      "Wochenplan",
      "Einkaufsliste",
      "Budget",
      "Meal Prep",
      "Rezepte",
      "günstig kochen",
      "Speiseplan",
      "vegetarisch",
      "vegan",
    ],
  },

  nav: {
    howItWorks: "So funktioniert's",
    features: "Funktionen",
    pricing: "Preise",
    faq: "Fragen",
    cta: "Kostenlos starten",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    skipToContent: "Zum Inhalt springen",
    homeAriaLabel: "Disha – Startseite",
    mainNav: "Hauptnavigation",
    mainNavMobile: "Hauptnavigation (mobil)",
  },

  hero: {
    /* Headline aus Briefing 7.1, als Wortgruppen für den gestaffelten Einlauf */
    headline: ["Dein Wochenplan.", "Dein Budget.", "In Sekunden."],
    subline:
      "Disha plant deine ganze Woche, passend zu deinem Budget, deinem Supermarkt und deinem Geschmack.",
    primaryCta: "Jetzt kostenlos starten",
    secondaryCta: "So funktioniert's",
    reassurance: "Erster Plan gratis · Kein Account nötig",
    stats: [
      { value: "7", label: "Tage geplant" },
      { value: "3", label: "Mahlzeiten pro Tag" },
      { value: "0", label: "Accounts nötig" },
    ],
    marqueeLabel: "Gerichte aus echten Disha-Wochenplänen",
    phoneLabel: "Der Wochenplan in der Disha-App",
    budgetChip: {
      label: "Wochenbudget",
      amount: "51,10 €",
      remaining: "8,90 € unter Budget",
    },
    storesAvailability: (iosUrl: string, androidUrl: string) =>
      `Disha ist kostenlos im App Store (${iosUrl}) und bei Google Play (${androidUrl}) verfügbar.`,
  },

  howItWorks: {
    eyebrow: "In drei Schritten",
    headline: "Schluss mit der Frage „Was koche ich diese Woche?“",
    intro:
      "Sag uns dein Wochenbudget, wo du einkaufst und wie du isst. Den Rest übernimmt Disha.",
    steps: [
      {
        n: "01",
        title: "Budget, Supermarkt & Ernährung angeben",
        body: "Du gibst dein Wochenbudget an, deinen Supermarkt und für wie viele Personen du planst, und wie du isst. Allergien und Zutaten, die du nicht magst, schließt du direkt aus.",
      },
      {
        n: "02",
        title: "Disha erstellt deinen 7-Tage-Plan",
        body: "In Sekunden hast du deinen kompletten Wochenplan: Frühstück, Mittag- und Abendessen mit echten Rezepten, Bildern, Zubereitungszeit und Schritt-für-Schritt-Anleitung.",
      },
      {
        n: "03",
        title: "Einkaufsliste abhaken & loslegen",
        body: "Deine Einkaufsliste entsteht automatisch, sortiert nach den Gängen deines Supermarkts. Du hakst sie mit einem Tap ab und teilst sie mit Familie oder Mitbewohnern. Im Laden gehst du keinen Weg doppelt.",
      },
    ],
    phoneLabel: "Onboarding: Supermarkt auswählen",
  },

  features: {
    eyebrow: "Was drin ist",
    headline: "Dein persönlicher Budget-Koch",
    intro:
      "Alles, was du brauchst, um eine Woche entspannt durchzukochen, und nichts, was du nicht brauchst.",
    items: [
      {
        icon: "calendar",
        title: "Kompletter Wochenplan in Sekunden",
        body: "7 Tage, bis zu 3 Mahlzeiten pro Tag. Du wählst selbst, welche Mahlzeiten und welche Wochentage geplant werden.",
      },
      {
        icon: "wallet",
        title: "Bleibt zuverlässig im Budget",
        body: "Die geschätzten Kosten siehst du vorab: pro Gericht und für die ganze Woche. Kein Rätselraten an der Kasse.",
      },
      {
        icon: "recycle",
        title: "Clevere Resteverwertung",
        body: "Disha nutzt Zutaten über mehrere Gerichte hinweg: weniger Verschwendung, weniger Reste in deinem Kühlschrank.",
      },
      {
        icon: "cart",
        title: "Passt zu deinem Supermarkt",
        body: "Deine Pläne und Preise sind abgestimmt auf Lidl, Aldi, Rewe, Edeka, Penny, Netto, Kaufland und mehr. Deine Einkaufsliste folgt den Gängen deines Marktes.",
      },
      {
        icon: "leaf",
        title: "Für jede Ernährung",
        body: "Allesesser, vegetarisch, vegan, pescetarisch, High Protein, Low Carb: du wählst, was zu dir passt. Allergien und unerwünschte Zutaten berücksichtigen wir automatisch.",
      },
      {
        icon: "users",
        title: "Für 1 bis 4+ Personen",
        body: "Deine Mengen und dein Budget passen sich automatisch an deinen Haushalt an, von „Nur ich“ bis „4 oder mehr“.",
      },
      {
        icon: "shield",
        title: "Privat by Design",
        body: "Kein Account, keine Anmeldung, keine E-Mail. Deine Pläne bleiben lokal auf deinem Gerät. Kein Tracking, keine Werbung.",
      },
      {
        icon: "swap",
        title: "Gericht gefällt nicht? Tauschen.",
        body: "Mit einem Tap ersetzt du jedes Gericht durch ein neues. Die Einkaufsliste aktualisiert sich automatisch mit.",
      },
    ],
  },

  showcase: {
    eyebrow: "So fühlt sich Disha an",
    headline: "Essen im Vordergrund. Alles andere tritt zurück.",
    intro:
      "Drei Screens, die du täglich nutzt, ruhig, schnell und ohne Menü-Labyrinth.",
    /* Die `screen`-Werte referenzieren die nachgebauten App-Screens. */
    scenes: [
      {
        screen: "plan" as const,
        label: "Wochenplan",
        title: "Deine Woche auf einen Blick",
        body: "Oben siehst du dein Wochenbudget mit Fortschritt, darunter jeden Tag mit seinen Gerichten. Tippe ein Gericht an, um das Rezept zu öffnen, wische, um den Tag zu wechseln.",
        highlights: [
          "Wochenbudget mit geschätzten Kosten",
          "Frühstück, Mittag- und Abendessen pro Tag",
          "Supermarkt, Haushalt und Ernährung immer sichtbar",
        ],
      },
      {
        screen: "recipe" as const,
        label: "Rezept",
        title: "Echte Rezepte, keine Platzhalter",
        body: "Du bekommst die Zutaten in der richtigen Menge für deinen Haushalt, die Zubereitung Schritt für Schritt, Nährwerte pro Portion und den geschätzten Preis.",
        highlights: [
          "Zubereitungszeit und Portionen",
          "Nährwerte pro Portion",
          "Gericht speichern oder ersetzen",
        ],
      },
      {
        screen: "shopping" as const,
        label: "Einkaufsliste",
        title: "Sortiert nach den Gängen deines Marktes",
        body: "Obst & Gemüse, Milchprodukte, Vorräte & Hülsenfrüchte: alles gruppiert, wie du durch den Laden läufst. Du hakst mit einem Tap ab und teilst per Nachricht.",
        highlights: [
          "Fortschritt und Gesamtsumme live",
          "Nach Supermarkt-Gängen gruppiert",
          "Teilbar an Familie oder Mitbewohner",
        ],
      },
    ],
    phoneLabel: "Die Disha-App auf dem iPhone",
    scenePhoneLabel: (label: string) => `${label} in der Disha-App`,
  },

  privacy: {
    eyebrow: "Privat by Design",
    headline: "Wir wissen nicht, was du kochst.",
    body: "Disha braucht keinen Account und keine E-Mail. Alle Pläne, Einkaufslisten und Einstellungen liegen ausschließlich auf deinem Gerät. Wenn du einen neuen Plan erstellst, gehen nur deine Plan-Einstellungen an die KI: Budget, Land, Supermarkt, Haushaltsgröße, Ernährung, Allergien, unerwünschte Zutaten, Vorlieben und Küchengeräte. Kein Name, keine E-Mail, kein genauer Standort.",
    points: [
      {
        title: "Kein Account",
        body: "Keine Anmeldung, kein Login, keine E-Mail-Pflicht. Du öffnest die App und legst los.",
      },
      {
        title: "Daten bleiben lokal",
        body: "Deine Pläne und Einkaufslisten bleiben auf deinem Gerät gespeichert. Es gibt keine Cloud-Synchronisierung.",
      },
      {
        title: "Kein Tracking",
        body: "Keine Werbe-Tracker, kein Nutzungsprofil, keine Werbung. Auch nicht auf dieser Website.",
      },
    ],
  },

  pricing: {
    eyebrow: "Preise",
    headline: "Erster Wochenplan gratis. Danach entscheidest du.",
    intro:
      "Dein erster Plan nach dem Onboarding ist komplett kostenlos: kein Teaser, sofort nutzbar. Disha Premium schaltet dir unbegrenzte KI-Wochenpläne und die volle Einkaufsliste frei.",
    plans: [
      {
        id: "monthly" as const,
        name: "Monatlich",
        price: site.pricing.monthly.amount,
        period: "pro Monat",
        note: "Flexibel bleiben",
        recommended: false,
        cta: "Im App Store öffnen",
      },
      {
        id: "yearly" as const,
        name: "Jährlich",
        price: site.pricing.yearly.amount,
        period: "pro Jahr",
        note: "Entspricht 3,75 € pro Monat",
        badge: "25 % sparen",
        recommended: true,
        cta: "Im App Store öffnen",
      },
    ],
    includes: {
      title: "In Disha Premium enthalten",
      items: [
        "Unbegrenzte KI-Wochenpläne",
        "Volle Einkaufsliste, nach Gängen sortiert",
        "Gerichte unbegrenzt tauschen",
        "Alle Ernährungsstile, Allergien & Ausschlüsse",
        "Nährwerte pro Portion",
        "Liste teilen und gemeinsam abhaken",
      ],
    },
    reassurance:
      "Erster Wochenplan komplett gratis · Automatisch verlängerndes Abo · Jederzeit kündbar",
    /* Rechtstext analog App-Store-Beschreibung (Guideline 3.1.2). */
    legal:
      "Disha Premium ist ein automatisch verlängerndes Abo: 4,99 € pro Monat oder 44,99 € pro Jahr (rund 25 % günstiger). Die Zahlung wird bei Kaufbestätigung deinem Apple-ID-Konto belastet. Das Abo verlängert sich automatisch, sofern es nicht mindestens 24 Stunden vor Ablauf des aktuellen Zeitraums gekündigt wird. Die Verlängerung wird innerhalb von 24 Stunden vor Periodenende berechnet. Abos kannst du jederzeit in den Einstellungen deines Apple-ID-Kontos verwalten und kündigen. Preise können je nach Region abweichen.",
    eulaLabel: "Nutzungsbedingungen (EULA)",
  },

  faq: {
    eyebrow: "Häufige Fragen",
    headline: "Was du wissen willst, bevor du lädst",
    items: [
      {
        q: "Brauche ich einen Account?",
        a: "Nein. Disha hat keinen Account und kein Login. Du brauchst keine E-Mail-Adresse und musst dich nirgends registrieren. Nach dem Onboarding steht dein Plan.",
      },
      {
        q: "Was passiert nach dem ersten kostenlosen Plan?",
        a: "Dein erster Wochenplan ist vollständig nutzbar und kostet nichts. Willst du danach neue Pläne per KI erstellen oder die volle Einkaufsliste nutzen, schaltet Disha Premium das frei: 4,99 € pro Monat oder 44,00 € pro Jahr. Dein erster Plan bleibt dir erhalten.",
      },
      {
        q: "Wie kündige ich mein Abo?",
        a: "Disha Premium ist ein automatisch verlängerndes Abo und jederzeit kündbar. Die Verwaltung läuft über deinen Store-Account: auf dem iPhone unter Einstellungen → Apple-Konto → Abonnements, bei Android im Play Store unter Zahlungen und Abos. Kündige mindestens 24 Stunden vor Ablauf der laufenden Periode, dann verlängert sich nichts.",
      },
      {
        q: "Funktioniert Disha für vegetarische oder vegane Ernährung?",
        a: "Ja. Du wählst zwischen Allesesser, vegetarisch, vegan, pescetarisch, halal, Low Carb, glutenfrei und laktosefrei. Dazu kommen Allergien und Unverträglichkeiten sowie einzelne Zutaten, die du gezielt ausschließen kannst. Disha lässt sie in allen Plänen weg.",
      },
      {
        q: "Werden meine Daten irgendwo gespeichert oder geteilt?",
        a: "Deine Pläne, Einkaufslisten und Einstellungen bleiben lokal auf deinem Gerät. Es gibt keinen Account und keine Cloud-Synchronisierung. Für einen neuen KI-Plan werden ausschließlich deine Plan-Einstellungen übertragen: Budget, Land, Supermarkt, Haushaltsgröße, Ernährung, Allergien, unerwünschte Zutaten, Vorlieben und Küchengeräte. Kein Name, keine E-Mail, kein genauer Standort. Disha enthält keine Werbe-Tracker.",
      },
      {
        q: "Welche Supermärkte werden unterstützt?",
        a: "In Deutschland unter anderem Aldi Süd/Nord, Lidl, Penny, Netto, Rewe, Edeka, Kaufland, Globus und tegut. Du kannst bis zu drei auswählen. Disha rechnet mit deren Preisniveau und sortiert deine Einkaufsliste nach ihren Gängen. Auch Österreich, die Schweiz und weitere Länder sind unterstützt, die Liste wächst laufend.",
      },
      {
        q: "Ist Disha auch für Android verfügbar?",
        a: "Ja. Disha gibt es im App Store für iPhone und im Google Play Store für Android.",
      },
      {
        q: "Braucht Disha eine Internetverbindung?",
        a: "Nur wenn du einen neuen KI-Plan erstellst oder ein Gericht tauschst. Dein bereits erstellter Wochenplan samt Rezepten und Einkaufsliste ist offline nutzbar, praktisch, wenn im Supermarkt das Netz schwach ist.",
      },
      {
        q: "Wie genau sind die Preisschätzungen?",
        a: "Disha rechnet mit dem typischen Preisniveau deines Supermarkts in deiner Region und zeigt die geschätzten Kosten vorab: pro Gericht und für die Woche. Es sind Schätzungen, keine tagesaktuellen Kassenpreise: Angebote, Eigenmarken und regionale Unterschiede können abweichen.",
      },
    ],
  },

  finalCta: {
    headline: "Hol dir deinen ersten Wochenplan.",
    body: "Kostenlos, ohne Account, in unter zwei Minuten bist du startklar.",
    reassurance: "Erster Plan gratis · Kein Account · Kein Tracking",
  },

  footer: {
    tagline:
      "Dein Essensplaner, der dein Budget kennt. Ein Wochenplan, eine Einkaufsliste, keine Rätsel.",
    productHeading: "Produkt",
    legalHeading: "Rechtliches",
    contactHeading: "Kontakt",
    contactLabel: "Fragen, Feedback oder ein Problem?",
    copyright: (year: number) => `© ${year} Disha. Alle Rechte vorbehalten.`,
    appleDisclaimer:
      "Apple, das Apple-Logo und App Store sind Marken von Apple Inc. Google Play und das Google-Play-Logo sind Marken von Google LLC.",
  },

  badges: {
    appStore: "Laden im App Store",
    googlePlay: "Jetzt bei Google Play",
  },

  legalCommon: {
    backToHome: "Zurück zur Startseite",
    lastUpdated: "Stand",
    tocHeading: "Auf dieser Seite",
    todoHeading: "Vor der Live-Schaltung zu klären",
  },
} as const;

/**
 * Formt `typeof de` in eine Struktur-Vorlage für andere Locales um: jede
 * String-Literal-Typ wird zu `string` verbreitert, Arrays/Funktionen/
 * verschachtelte Objekte bleiben strukturell erhalten.
 *
 * Ohne das würde `Content = typeof de` jede deutsche Zeichenkette als exaktes
 * Literal typisieren (Folge von `as const`) — `en.ts` könnte dann `satisfies
 * Content` nie erfüllen, weil kein englischer Text dem deutschen Literal
 * entspricht.
 */
type Widen<T> = T extends readonly (infer U)[]
  ? readonly Widen<U>[]
  : T extends (...args: infer A) => infer R
    ? (...args: A) => Widen<R>
    : T extends string
      ? string
      : T extends object
        ? { [K in keyof T]: Widen<T[K]> }
        : T;

export type Content = Widen<typeof de>;
