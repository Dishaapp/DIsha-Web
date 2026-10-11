# Disha — Marketing-Website

Landingpage und Rechtsseiten zur App **Disha**, dem KI-gestützten
Budget-Essensplaner. Vollständig statisch, ohne Tracking, ohne Cookies, ohne
externe Fonts.

Spezifikation: [Website-Briefing.md](Website-Briefing.md)
**Vor dem Launch lesen:** [OFFENE-PUNKTE.md](OFFENE-PUNKTE.md)

---

## Loslegen

```bash
npm install
npm run dev     # http://localhost:3000 → leitet auf /de
```

```bash
npm run build   # alle Routen werden statisch vorgerendert
npm start
npx eslint .    # muss ohne Befund durchlaufen
```

## Routen

| Pfad | Inhalt |
| --- | --- |
| `/` | Redirect auf `/de` |
| `/de` | Landingpage |
| `/de/datenschutz` | Datenschutzerklärung ⚠️ Rechtsprüfung offen |
| `/de/impressum` | Impressum ⚠️ Pflichtangaben fehlen |
| `/de/agb` | Nutzungsbedingungen ⚠️ Rechtsprüfung offen |
| `/sitemap.xml`, `/robots.txt` | generiert |
| `/de/opengraph-image` | OG-Bild, zur Build-Zeit erzeugt |
| `/Kalia/privacy` | Datenschutzerklärung der App Kalia (EN), aus `legal/privacy-policy.en.md` |
| `/Kalia/terms` | Nutzungsbedingungen der App Kalia (EN), aus `legal/terms-of-use.en.md` |

Die Kalia-Seiten haben ein eigenes Root-Layout (`src/app/Kalia/`) ohne
Disha-Header und -Footer. Ihr Text kommt unverändert aus den Markdown-Dateien
in `legal/` — Änderungen dort machen, dann neu bauen. Die App verlinkt genau
diese Pfade (großes K).

Zusätzlich leiten `/disha/datenschutz`, `/datenschutz` und `/privacy` auf
`/de/datenschutz` weiter — siehe Punkt 3 in `OFFENE-PUNKTE.md`.

## Aufbau

```
src/
  config/site.ts        Domain, Store-Links, Preise, Kontakt — einziger Ort
                        für alles, was sich beim Launch ändern kann
  content/
    de.ts               komplette deutsche Copy (Quelle der Wahrheit)
    food.ts             kuratierte Gerichtsfotos, Slug ↔ Bildunterschrift
  i18n/locales.ts       Locale-Liste, lokalisierte Slugs, Pfad-Helfer
  lib/seo.ts            canonical, hreflang, Open Graph, JSON-LD
  components/
    app-ui/             HTML-Nachbau der echten App-Screens im CSS-iPhone
    motion/             Reveal, AnimatedHeadline, FoodMarquee, CursorGlow
    sections/           Hero, HowItWorks, Features, Showcase, Privacy,
                        Pricing, Faq, FinalCta
    legal/              Rahmen und TODO-Bausteine der Rechtsseiten
  app/[locale]/         Routen. Das Root-Layout liegt absichtlich hier und
                        nicht in app/, damit <html lang> den echten
                        Sprachcode der Route trägt.
public/
  brand/  food/  badges/
```

## Design-System

Farben, Radien und das 8pt-Spacing stehen als Tailwind-v4-Tokens in
[src/app/globals.css](src/app/globals.css) und sind 1:1 aus
`DishaApp/src/constants/colors.ts` übernommen.

- **Deep-Green `#1A3A2A` ist der einzige Markenakzent.** Kein zweiter Akzent,
  keine bunten Feature-Icons, keine mehrfarbigen Badges. Alles andere ist
  Schwarz/Weiß/Grau plus die natürlichen Farben der Essensfotografie.
- **Keine Web-Fonts.** Der Display-Stack beginnt mit `ui-rounded`, was auf
  Apple-Geräten SF Pro Rounded liefert und die runde Anmutung der Wortmarke
  trifft — ohne ein einziges geladenes Byte.
- **Bewegung ist Deko, nie Voraussetzung.** Bei `prefers-reduced-motion` und
  ohne JavaScript ist der komplette Inhalt sofort sichtbar (Override im
  `<noscript>` des Root-Layouts).

## Assets

Die Bilder liegen im App-Repo (`DishaApp`) und wurden nach `public/` kopiert;
Dateinamen wurden dabei auf URL-sichere Slugs gebracht (keine Leerzeichen,
keine Umlaute). Die Zuordnung steht in
[src/content/food.ts](src/content/food.ts).

Die Store-Badges in `public/badges/` stammen unverändert von Apple Marketing
Tools und dem Google-Play-Badge-Generator in deutscher Fassung.

## Zwei Fallen, die hier schon zugeschlagen haben

- **`overflow: hidden` killt `position: sticky`.** Der `body` und die
  Showcase-Section nutzen deshalb `overflow-x: clip` — das beschneidet die
  überstehenden Verläufe genauso, erzeugt aber keinen Scroll-Container.
- **`scale(calc(100cqw / 393))` ist ungültig.** Länge geteilt durch Zahl bleibt
  eine Länge, `scale()` braucht eine Zahl — der Browser verwirft die ganze
  Transformation stillschweigend. Der Nachbau skaliert daher mit
  `scale(tan(atan2(100cqw, 393px)))`; das ergibt eine echte Zahl. Siehe
  [PhoneFrame.tsx](src/components/app-ui/PhoneFrame.tsx).

## Deployment

Ausgelegt auf Vercel. Alle Seiten sind statisch (SSG), es gibt keine
Server-only-Features außer `redirects()` und `headers()` in
[next.config.ts](next.config.ts).

Für einen reinen Static Export (`output: "export"`) müssten Redirects und
Header stattdessen beim Hoster konfiguriert werden, und die
Bildoptimierung von `next/image` entfiele.
