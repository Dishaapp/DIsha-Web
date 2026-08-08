# Disha — Website-Briefing für den Build-Agenten

> Diese Datei ist die vollständige Spezifikation für den Bau der Marketing-Website zur App **Disha**.
> Ziel: Ein Agent soll allein auf Basis dieser Datei (plus Zugriff auf dieses App-Repo für Assets/Copy-Referenz) eine produktionsreife Website bauen können, ohne Rückfragen zu Kernfragen stellen zu müssen.
> Offene Punkte, die NICHT vom Agenten frei erfunden werden dürfen (z. B. rechtliche Angaben), sind explizit in Abschnitt 10 markiert.

---

## 1. Was ist Disha (Produktkontext)

Disha ist ein **KI-gestützter Budget-Essensplaner** als native App. Kernversprechen: _„Sag uns dein Budget, deinen Supermarkt und deinen Geschmack — Disha plant deine ganze Woche."_

- **Kernfunktion:** Nutzer gibt Wochenbudget, Supermarkt, Haushaltsgröße und Essstil an → App generiert per KI (Gemini) einen kompletten 7-Tage-Essensplan (Frühstück/Mittag/Abend) mit echten Rezepten, Bildern, Zubereitungszeit und Schritt-für-Schritt-Anleitung.
- **Einkaufsliste:** automatisch generiert, nach Supermarkt-Gängen sortiert (Obst & Gemüse, Kühlregal, Trockensortiment …), abhakbar, teilbar.
- **Local-First & Privacy:** Kein Account, kein Login, keine E-Mail-Pflicht. Alle Nutzerdaten (Pläne, Präferenzen) lokal auf dem Gerät (SQLite). Kein Tracking, keine Werbung.
- **Business-Modell:** Erster Wochenplan nach Onboarding ist **komplett gratis** (aus Seed-Rezepten). Danach schaltet **Disha Premium** unbegrenzte KI-Neugenerierung + volle Einkaufsliste frei — als **automatisch verlängerndes Abo**: **4,99 €/Monat** oder **44,00 €/Jahr** (≈27 % günstiger, Jahresabo ist der Haupt-Anker). Jederzeit kündbar. **Kein Einmalkauf** — das Abo-Modell ist bewusst so gewählt, nie als „kein Abo" oder „einmal kaufen" bewerben.
- **Essstile:** Alles, vegetarisch, vegan, High-Protein. Für 1 bis 4+ Personen, Mengen skalieren automatisch. Allergien/Unverträglichkeiten und auszuschließende Lebensmittel werden berücksichtigt. Rezepte lassen sich mit einem Tap tauschen.
- **Regionen/Supermärkte:** Preise und Rezeptauswahl sind marktbewusst. Aktuell u. a. Deutschland (Lidl, Aldi, Rewe, Edeka, Penny, Netto), USA, Kanada, Spanien, Italien, Portugal, Frankreich, Dänemark — Liste wächst laufend.
- **Zielgruppe:** Menschen, die Zeit/Nerven beim „Was koche ich diese Woche?" sparen wollen und dabei ihr Budget im Blick behalten wollen — kein Diät-/Fitness-Framing, sondern Alltags-Entlastung + Geld sparen.
- **Tonalität:** Ruhig, nativ, kein Hype, keine Ausrufezeichen-Marketing-Sprache. Ehrlich und konkret („dein erster Plan ist gratis", „jederzeit kündbar" statt „JETZT SPAREN!!!").

Stores:

- iOS: `https://apps.apple.com/app/id6779303849`
- Android: `https://play.google.com/store/apps/details?id=com.dishaapp.app`
- Bundle-ID: `com.dishaapp.app`

---

## 2. Ziel der Website

Eine schlanke **Marketing-/Landingpage** plus die rechtlich nötigen Unterseiten. Kein Blog, kein CMS, kein Nutzer-Login auf der Website — reine statische Marketing-Site mit dem einzigen Conversion-Ziel: **App-Download (App Store, später Play Store)**.

Die Website muss außerdem die bereits im App-Store-Listing verlinkte Datenschutz-URL beliefern (`.../disha/datenschutz`), da dieser Link schon live im App Store steht.

---

## 3. Tech-Stack

- **Framework:** Next.js (App Router), TypeScript.
- **Rendering:** Statisch/SSG wo möglich (`generateStaticParams` für alle Locale-Routen) — keine Server-Runtime nötig, da keine dynamischen Daten.
- **Styling:** Tailwind CSS (konsistent mit dem übrigen Projekt-Stack, das ebenfalls auf Utility-first/Expo setzt).
- **i18n-Routing:** Pfad-basiert, `/{locale}/...` (z. B. `/de`, `/en`, `/fr`, `/es` …), mit `/` → Redirect auf Browser-Locale (Fallback `de`, da Deutschland Primärmarkt ist).
- **Bilder:** `next/image`, WebP wo möglich (Quell-Assets liegen teils schon als `.webp` vor, siehe Abschnitt 9).
- **Hosting:** noch offen (siehe Abschnitt 10) — Next.js so bauen, dass es sowohl auf Vercel als auch als reiner Static Export deploybar ist, falls möglich keine Server-only-Features nutzen, die einen Static Export verhindern.
- **Keine externen Analytics/Cookie-Banner einbauen, bis Abschnitt 10 geklärt ist** (Disha selbst wirbt explizit mit „kein Tracking" — ein Tracking-Pixel auf der Website ohne Cookie-Banner wäre ein DSGVO-Risiko und ein Widerspruch zur eigenen Werbebotschaft).

---

## 4. Sprachen & i18n

**Scope v1: alle 11 App-Sprachen** — `de, en, es, it, pt, fr, nl, da, no, fi, sv`.

Wichtige Regel: **Terminologie muss 1:1 mit der App übereinstimmen.** Die App hat für jede dieser Sprachen bereits offizielle, geprüfte Übersetzungen unter `locales/{code}.json` in diesem Repo (z. B. `locales/de.json`, `locales/fr.json` …). Bevor der Agent Marketing-Copy in einer Sprache schreibt, **muss** er die entsprechende `locales/{code}.json`-Datei nach den Kernbegriffen durchsuchen (Wochenplan/weekly plan, Einkaufsliste/shopping list, Budget, Premium, Supermarkt/store, Haushaltsgröße/household size, Essstil/diet style etc.) und exakt diese Begriffe verwenden — nicht neu übersetzen. Inkonsistente Begriffe zwischen App und Website wirken unprofessionell und verwirren wiederkehrende Nutzer.

**Vorhandene Referenz-Copy (Quelle der Wahrheit für Ton & Inhalt):**

- Vollständige Marketing-Beschreibung (DE + EN, Fließtext-Qualität, direkt wiederverwendbar für die Landingpage): `appstore/ASO_AppStore_Listing.md`
- Name/Untertitel/Keywords bereits vorhanden für: DE, EN, FR, IT, PT (siehe gleiche Datei)
- Für ES, NL, DA, NO, FI, SV existiert noch keine fertige Marketing-Beschreibung → der Agent muss diese nativ-qualitativ aus der DE/EN-Masterversion ableiten, im gleichen Ton, unter Beachtung der App-Terminologie aus den jeweiligen `locales/{code}.json`.

**Priorisierung, falls Zeit/Aufwand begrenzt werden muss:** DE und EN zuerst vollständig fertigstellen (das sind Primär-/Sekundärmarkt laut ASO-Doku), danach FR/IT/PT/ES (haben teilweise schon Store-Copy), zuletzt NL/DA/NO/FI/SV.

Impressum-Seite (siehe 7.3) ist **nicht** pro Sprache inhaltlich unterschiedlich (rechtliche Pflichtangaben eines deutschen Betreibers ändern sich nicht mit der Sprache) — Struktur/Labels übersetzen, Fakteninhalt bleibt identisch in jeder Sprachversion.

---

## 5. Sitemap

```
/{locale}/                     Landingpage (Home)
/{locale}/datenschutz          Datenschutzerklärung (Slug lokalisiert, siehe unten)
/{locale}/impressum            Impressum (Slug lokalisiert, siehe unten)
/{locale}/agb                  Nutzungsbedingungen/AGB (Slug lokalisiert, siehe unten)
/sitemap.xml
/robots.txt
```

**Wichtig — bestehender Link darf nicht brechen:** Die deutsche Datenschutz-Seite ist bereits im App Store unter `https://www.kitchen-heroes.net/disha/datenschutz` verlinkt (siehe `appstore/ASO_AppStore_Listing.md`). Falls die Website auf dieser Domain/diesem Pfad-Präfix landet, muss `/de/datenschutz` exakt unter `/disha/datenschutz` erreichbar sein (oder ein Redirect eingerichtet werden) — sonst zeigt der App-Store-Eintrag auf einen toten Link. Endgültige Domain/Pfadstruktur ist in Abschnitt 10 offen; der Agent soll das Routing so bauen, dass ein Mapping/Redirect später ohne Codeumbau möglich ist.

Lokalisierte Slugs (Empfehlung, damit URLs sich lokal richtig anfühlen — SEO-Vorteil):
| locale | datenschutz | impressum | agb |
|---|---|---|---|
| de | `/de/datenschutz` | `/de/impressum` | `/de/agb` |
| en | `/en/privacy` | `/en/legal-notice` | `/en/terms` |
| es | `/es/privacidad` | `/es/aviso-legal` | `/es/terminos` |
| it | `/it/privacy` | `/it/note-legali` | `/it/termini` |
| pt | `/pt/privacidade` | `/pt/aviso-legal` | `/pt/termos` |
| fr | `/fr/confidentialite` | `/fr/mentions-legales` | `/fr/conditions` |
| nl | `/nl/privacy` | `/nl/colofon` | `/nl/voorwaarden` |
| da | `/da/privatliv` | `/da/impressum` | `/da/vilkaar` |
| no | `/no/personvern` | `/no/impressum` | `/no/vilkar` |
| fi | `/fi/tietosuoja` | `/fi/impressum` | `/fi/ehdot` |
| sv | `/sv/integritet` | `/sv/impressum` | `/sv/villkor` |

(Impressum ist ein deutschsprachiger Rechtsbegriff ohne 1:1-Entsprechung in NO/DA/FI/SV — dort Slug `impressum` beibehalten, Seiteninhalt aber in Landessprache erklären, dass es sich um die gesetzlichen Anbieterangaben handelt.)

---

## 6. Design-System

Übernommen aus dem bestehenden App-Design (`Entwicklungsplan.md`), damit App und Website wie ein Produkt wirken.

### Farben

| Token                     | Wert                                 | Einsatz                                                        |
| ------------------------- | ------------------------------------ | -------------------------------------------------------------- |
| Accent (Deep-Green)       | `#1A3A2A`                            | Einziger Markenakzent — CTAs, Links, Icons, aktive States      |
| Accent Dark-Mode-Variante | `#2E5E4A`                            | Falls Dark-Mode unterstützt wird                               |
| Cream/Splash-Hintergrund  | `#F7F4ED`                            | Warmer Sektions-Hintergrund (z. B. Hero, alternierend zu Weiß) |
| bg-primary                | `#FFFFFF` (Light) / `#000000` (Dark) | Seiten-Hintergrund                                             |
| bg-secondary              | `#F2F2F7` (Light) / `#1C1C1E` (Dark) | Cards/Sections                                                 |
| text-primary              | `#000000` / `#FFFFFF`                | Headlines, Body                                                |
| text-secondary            | `#6C6C70` / `#8E8E93`                | Sub-Labels                                                     |

**Regel wie in der App:** Deep-Green ist der **einzige** Farbakzent. Kein zweiter Akzent, keine bunten Feature-Icons, keine Regenbogen-Badges. Alles sonst Schwarz/Weiß/Grau plus die natürlichen Farben der Essens-Fotografie.

### Typografie

Die App nutzt ausschließlich System-Fonts (SF Pro/Roboto) — auf Web-Seite ist die native Entsprechung der System-Font-Stack:

```css
font-family:
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
  sans-serif;
```

Kein Custom-/Web-Font laden — konsistent mit „keine externen Fonts"-Prinzip der App, außerdem beste Performance (kein Font-Loading-Flash).

Skala orientiert an der App (large, ruhig, viel Weißraum):

- Hero-Headline: groß, Regular/Semibold (nicht fett-marketing-schreiend)
- Section-Headline: Title-1-Charakter
- Body: 17–18px, gute Zeilenhöhe (1.5+)

### Spacing

8pt-Grid wie in der App: `8 / 16 / 24 / 32 / 48 / 64 / 96`. Großzügiger Weißraum zwischen Sections (mind. 64–96px auf Desktop).

### Look & Feel

Clean, minimal, food-forward — Fotos von echtem Essen sind das visuelle Herzstück, UI tritt zurück (gleiche Philosophie wie die App: „Essen im Vordergrund, UI tritt zurück"). Keine verspielten Illustrationen, keine Stock-Icons-Overkill. Native-App-Anmutung auch auf der Website: ruhige Übergänge, keine aggressiven Scroll-Animationen/Parallax-Spielereien.

---

## 7. Seiten im Detail

### 7.1 Landingpage

Reihenfolge der Sections (Desktop & Mobile, mobile-first):

1. **Hero**
   - Headline (DE-Master): „Dein Wochenplan. Dein Budget. In Sekunden."
   - Subline: „Disha plant deine ganze Woche — passend zu deinem Budget, deinem Supermarkt und deinem Geschmack."
   - Primärer CTA-Button: „Jetzt kostenlos starten" → App Store Link
   - Sekundär: kleiner Hinweis „Erster Plan gratis · Kein Account nötig"
   - Visual: App-Screenshot/Mockup + Food-Foto (Assets siehe Abschnitt 9)

2. **So funktioniert's (3 Schritte)**
   1. Budget, Supermarkt & Essstil angeben
   2. Disha erstellt in Sekunden deinen 7-Tage-Plan mit Rezepten
   3. Fertige Einkaufsliste nach Gängen sortiert — abhaken & loslegen

3. **Feature-Grid** (aus ASO-Beschreibung übernehmen, siehe `appstore/ASO_AppStore_Listing.md`):
   - Kompletter Wochenplan in Sekunden — 7 Tage, 3 Mahlzeiten
   - Bleibt zuverlässig im Budget — geschätzte Kosten vorab sichtbar
   - Clevere Resteverwertung — weniger Verschwendung
   - Passt zu deinem Supermarkt (Lidl, Aldi, Rewe, Edeka, Penny, Netto — Liste je nach Markt/Locale austauschen)
   - Für jeden Essstil: alles, vegetarisch, vegan, High-Protein
   - Für 1 bis 4+ Personen, Mengen passen sich automatisch an
   - Privat by Design: kein Account, kein Tracking, Daten bleiben lokal

4. **Screenshots/Produktvisuals**
   - Zeigt Wochenplan-Ansicht, Rezept-Detail, Einkaufsliste
   - Nutzt Food-Fotografie aus dem Repo als Ergänzung/Hintergrund (siehe Abschnitt 9) — falls keine echten App-Screenshots verfügbar sind, das dem User als offenen Punkt zurückmelden (siehe Abschnitt 10), nicht durch generische Stock-UI ersetzen

5. **Pricing**
   - Zwei Karten: **Monatlich 4,99 €** / **Jährlich 44,00 € (≈27 % günstiger)** — Jahreskarte optisch als Empfehlung hervorheben
   - Hinweis-Zeile direkt unter den Karten: „Erster Wochenplan komplett gratis · Automatisch verlängerndes Abo · Jederzeit kündbar"
   - Kleingedrucktes analog App-Store-Text (verlängert sich automatisch, Kündigung mgl. jederzeit in den Store-Kontoeinstellungen) — exakter Rechtstext siehe `appstore/ASO_AppStore_Listing.md`, Abschnitt „Beschreibung"
   - **Nicht** als „kein Abo" oder „Einmalkauf" bewerben — das ist explizit falsch für dieses Produkt

6. **FAQ** (Accordion), Startfragen ableiten aus App-Store-Reviewer-Notes/Beschreibung:
   - Brauche ich einen Account?
   - Was passiert nach dem ersten kostenlosen Plan?
   - Wie kündige ich mein Abo?
   - Funktioniert Disha für vegetarische/vegane Ernährung?
   - Werden meine Daten irgendwo gespeichert/geteilt?
   - Welche Supermärkte werden unterstützt?
   - Ist Disha auch für Android verfügbar? (Antwort abhängig von Klärung in Abschnitt 10)

7. **Finaler CTA**
   - Wiederholung Hero-CTA, App-Store-Badge (offizielles Apple-Badge-Asset verwenden, keine Nachbauten)

8. **Footer**
   - Logo, kurze Tagline
   - Links: Datenschutz, Impressum, AGB
   - Kontakt: `timheck2000@gmail.com` (aktuell einzige bekannte Support-Adresse, siehe Abschnitt 10 zur Bestätigung/ggf. dedizierte Support-Adresse)
   - Copyright-Zeile mit aktuellem Jahr

Vollständige DE- und EN-Fließtexte zum direkten Verwenden/Adaptieren stehen bereits in `appstore/ASO_AppStore_Listing.md` (Abschnitt „Beschreibung") — das ist die Quelle der Wahrheit für Wortwahl, nicht neu erfinden.

### 7.2 Datenschutz (Privacy Policy)

**Nicht vom Agenten frei formulieren/erfinden.** Eine Datenschutzerklärung ist ein Rechtsdokument. Der Agent soll:

- Eine strukturierte Vorlage mit allen inhaltlich relevanten Blöcken für Disha vorbereiten (welche Daten werden verarbeitet: lokal gespeicherte Präferenzen, an den Gemini-KI-Proxy gesendete Onboarding-Angaben ohne Personenbezug, optionale einmalige Standortabfrage, RevenueCat für Abo-Abwicklung, keine Werbe-/Analytics-Tracker),
- aber den finalen rechtsverbindlichen Text **nicht** eigenständig final freigeben — als TODO/Platzhalter markieren, dass eine Rechtsprüfung (z. B. durch einen Anwalt oder Generator wie z. B. eRecht24/Iubenda) erfolgen muss, bevor die Seite live geht.
- Sachlich korrekte Basis-Fakten, die schon bekannt sind: kein Account/Login, lokale SQLite-Speicherung, KI-Anfragen an Gemini via serverseitigem Proxy (nur Präferenzdaten, keine Identifikatoren), RevenueCat für Abo-/Kaufabwicklung, optionale einmalige Standortabfrage für Supermarkt-Vorschläge, kein Tracking/keine Werbung (siehe `appstore/ASO_AppStore_Listing.md`, Abschnitt „App Review Information" für die bereits gegenüber Apple gemachten Aussagen — diese müssen mit der öffentlichen Datenschutzerklärung konsistent sein).

### 7.3 Impressum

**Nicht vom Agenten frei erfinden.** Deutsches Impressum braucht zwingend echte, korrekte Angaben (Name/Firma, ladungsfähige Anschrift, Kontakt, ggf. USt-ID). Der Agent soll eine vollständige Impressum-Struktur/Komponente bauen (alle Pflichtfelder als benannte Platzhalter, klar als `[TODO: ...]` markiert), aber **keine Adresse, Rechtsform oder USt-ID erfinden**. Siehe Abschnitt 10 — diese Angaben müssen vom Nutzer geliefert werden, bevor die Seite live geht.

### 7.4 AGB / Nutzungsbedingungen

Die App selbst verweist bereits auf Apples Standard-EULA (`https://www.apple.com/legal/internet-services/itunes/dev/stdeula/`) für In-App-Käufe — das ist rechtlich meist ausreichend für iOS-Apps mit Standard-EULA. Eine separate Website-AGB ist optional/ergänzend (z. B. für Nutzung der Website selbst, Haftungsausschluss für Rezept-/Ernährungsinhalte — Disha ist **kein** medizinischer/ernährungswissenschaftlicher Rat). Auch hier: Struktur vom Agenten vorbereiten, finalen Rechtstext nicht als „fertig/geprüft" ausgeben.

---

## 8. SEO & Metadaten

- Pro Locale eigenes `<title>` / `<meta description>` — Basis: die Name/Untertitel-Texte aus `appstore/ASO_AppStore_Listing.md` (bereits ASO-optimiert, gleiche Kernbegriffe wiederverwenden für Konsistenz zwischen Web-SEO und App-Store-ASO).
- Open Graph + Twitter-Card-Tags mit Hero-Bild.
- `hreflang`-Tags zwischen allen 11 Locale-Versionen der gleichen Seite verlinken.
- `sitemap.xml` mit allen Locale×Page-Kombinationen.
- Strukturierte Daten: `SoftwareApplication`-Schema (Name, Kategorie „Food & Drink / Lifestyle", Preisangabe, App-Store-URL, Bewertungs-Sterne sobald verfügbar).
- Favicon/Touch-Icons aus `assets/images/icon.png` bzw. `assets/images/favicon.png` ableiten.

---

## 9. Vorhandene Assets (Pfade in diesem Repo)

Diese Dateien liegen im **App-Repo** (`DishaApp`), nicht im Website-Projekt — müssen für die Website exportiert/kopiert (und ggf. für Web reoptimiert) werden:

| Zweck                                           | Pfad                                                                                                                                       |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| App-Icon                                        | `assets/images/icon.png`                                                                                                                   |
| Wortmarke/Logo                                  | `assets/images/logo-wordmark.png`                                                                                                          |
| Logo mit Glow                                   | `assets/images/logo-glow.png`                                                                                                              |
| Favicon                                         | `assets/images/favicon.png`                                                                                                                |
| Hero-Illustration (Bowl)                        | `assets/images/hero-bowl.svg`, `assets/images/week-hero-bowl.png`, `assets/images/week-hero-bowl-fade.png`, `assets/images/week-hero.png`  |
| Welcome/Onboarding-Hero                         | `assets/images/welcome-hero.png`                                                                                                           |
| Rezept-Fotos (für Feature-/Screenshot-Sections) | `assets/images/recipes/`, `assets/images/recipes-ai/`, sowie `rezeptbilder/*.webp` (viele einzelne fertige Gerichtsfotos, deutsch benannt) |
| Frühstücks-Fotos                                | `Frühstück webp/*.webp`                                                                                                                    |
| Mittagessen-Fotos                               | `Mittag Webp/*.webp`                                                                                                                       |

**Kein echter App-Screenshot (Gerätemockup mit UI) ist aktuell im Repo vorhanden** — nur Icons, Logos und Food-Fotografie. Für die „So sieht's aus"-Section der Landingpage werden echte Screenshots aus der laufenden App gebraucht (z. B. via Simulator-Screenshots vom Wochenplan, Rezept-Detail, Einkaufsliste). Das ist ein offener Punkt, siehe Abschnitt 10.

App-Store-Badge: offizielles Apple-„Download on the App Store"-Badge verwenden (nicht selbst nachbauen) — pro Sprache gibt es offizielle lokalisierte Varianten von Apple.

---

## 10. Offene Punkte — Rückfrage an den User, NICHT selbst entscheiden/erfinden

Diese Punkte blockieren den finalen Launch bzw. dürfen nicht vom Agenten selbstständig festgelegt werden:

1. **Domain & Hosting**: Läuft die Website unter `kitchen-heroes.net` (bestehende Domain, siehe Datenschutz-Link im App-Store-Listing) oder unter einer neuen eigenen Domain (z. B. `disha-app.com`)? Wo wird gehostet (Vercel o. ä.)?
2. **Impressum-Pflichtangaben**: Rechtsform/Name, ladungsfähige Anschrift, Telefonnummer, USt-ID (falls vorhanden), verantwortliche Person nach § 18 Abs. 2 MStV.
3. **Datenschutzerklärung — finale Rechtsprüfung**: Der Agent kann eine inhaltlich korrekte Struktur bauen, aber der Text sollte vor Live-Schaltung juristisch geprüft werden (Generator oder Anwalt).
4. **Support-/Kontakt-E-Mail**: Soll weiter `timheck2000@gmail.com` genutzt werden oder eine dedizierte Adresse wie `support@disha-app.com` eingerichtet werden?
5. **Android-Status**: Ist die App aktuell im Play Store live? Falls nein, CTA/FAQ entsprechend anpassen („bald verfügbar" statt Download-Link).
6. **Echte App-Screenshots**: Werden vor dem Website-Bau noch Gerätemockup-Screenshots erstellt (z. B. via Simulator + Mockup-Tool), oder soll die v1 der Website ohne UI-Screenshots auskommen (nur Food-Fotografie)?
7. **Analytics/Cookie-Consent**: Soll die Website überhaupt Analytics einsetzen (z. B. datenschutzfreundlich wie Plausible/Fathom ohne Cookie-Banner-Pflicht), oder bewusst komplett ohne — konsistent mit dem „kein Tracking"-Markenversprechen der App?
8. **Preisanzeige-Währung**: Website zeigt EUR (4,99 €/44 €) als Leitwährung mit Hinweis „Preise können je nach Land abweichen" (wie im App-Store-Text), oder soll versucht werden, Preise dynamisch je nach Besucher-Land anzuzeigen (USD/CAD/DKK, siehe Markt-Erweiterungen in der App)? Empfehlung: erstmal statisch EUR + Hinweiszeile, dynamische Preisanzeige ist eine spätere Ausbaustufe.

---

## 11. Definition of Done

- [ ] Alle 11 Locale-Routen für Landingpage, Datenschutz, Impressum, AGB bauen und lokalisierten Content-Check bestehen (keine Lorem-Ipsum-/Platzhalter-Texte außer den bewusst markierten Rechts-TODOs aus Abschnitt 10)
- [ ] Terminologie-Abgleich mit `locales/{code}.json` je Sprache durchgeführt
- [ ] Kein Tracking-Script ohne vorherige Klärung aus Abschnitt 10 eingebaut
- [ ] Lighthouse/Core Web Vitals: gute Werte (Performance, SEO, Accessibility ≥ 90) — Seite ist bewusst leichtgewichtig, kein Grund für schlechte Werte
- [ ] `sitemap.xml`, `robots.txt`, `hreflang`, OpenGraph pro Locale vorhanden
- [ ] Alle CTAs verlinken korrekt auf App Store (und Play Store, falls laut Abschnitt 10 live)
- [ ] Datenschutz-Link funktioniert unter der im App Store bereits hinterlegten URL (oder Redirect eingerichtet)
- [ ] Responsive: Mobile-first getestet (die meisten Besucher kommen vom App-Store-Link auf dem Handy)
- [ ] Abschnitt-10-Punkte sind im Projekt sichtbar als offene TODOs dokumentiert, nicht stillschweigend mit Platzhalterdaten „gelöst"
