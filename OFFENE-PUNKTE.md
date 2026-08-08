# Offene Punkte vor der Live-Schaltung

Diese Liste ist die Fortschreibung von Abschnitt 10 des `Website-Briefing.md`.
Nichts davon wurde stillschweigend mit Platzhalterdaten „gelöst" — alle
Platzhalter sind auf den betroffenen Seiten sichtbar als `TODO` markiert.

Legende: 🔴 blockiert den Launch · 🟡 sollte vor dem Launch geklärt sein ·
🟢 entschieden, hier nur zur Dokumentation

---

## 🟢 1. Impressum-Pflichtangaben

**Wo:** [src/app/[locale]/impressum/page.tsx](src/app/%5Blocale%5D/impressum/page.tsx)

Erledigt: Name (Tim Heck), Rechtsform (Einzelunternehmen), ladungsfähige
Anschrift, Telefonnummer mit Vorwahl und die verantwortliche Person nach
§ 18 Abs. 2 MStV stehen im Text. Registergericht/Registernummer und
USt-IdNr. sind bewusst weggelassen (kein Handelsregistereintrag, siehe
Rechtsform), eine vertretungsberechtigte Person entfällt (keine
Gesellschaft).

---

## 🟡 2. Datenschutzerklärung — Rechtsprüfung offen, Sachangaben größtenteils erledigt

**Wo:** [src/app/[locale]/datenschutz/page.tsx](src/app/%5Blocale%5D/datenschutz/page.tsx)

Die Seite ist inhaltlich vorbereitet und deckungsgleich mit dem, was die App
tatsächlich tut (`DishaApp/src/locales/de.json`, `profile.privacy_*`) und was
gegenüber Apple erklärt wurde (`appstore/ASO_AppStore_Listing.md`, „App Review
Information").

Bereits erledigt (im Text vorhanden):
- [x] Angaben zum Verantwortlichen (Abschnitt 1)
- [x] Zuständige Landesdatenschutzbehörde eingetragen (Hessischer
      Beauftragter für Datenschutz, Abschnitt 10)
- [x] Drittlandübermittlung in die USA benannt (EU-US Data Privacy
      Framework, Abschnitte 3 und 7)
- [x] Datenschutzerklärungen von RevenueCat, Apple, Google und Cloudflare
      verlinkt
- [x] Rechtliche Einordnung der Allergie-Angaben adressiert (Anonymisierungs-
      Argument in Abschnitt 3, „Rechtsgrundlage und Zweck")

Noch offen (echte Prüf-/Vertragsschritte, kein Text-Gap):
- [ ] Auftragsverarbeitungsverträge nach Art. 28 DSGVO tatsächlich
      abschließen: Hoster, RevenueCat, Google (Gemini)
- [ ] Genaue Speicherdauer der Server-Logs präzisieren (Text sagt aktuell nur
      „in der Regel nur kurzzeitig")
- [ ] Gesamttext von einer Anwältin/einem Anwalt oder über einen Generator
      (eRecht24, Iubenda) abnehmen lassen

---

## 🔴 3. Der im App Store hinterlegte Datenschutz-Link bricht

Im App-Store-Listing steht als Datenschutz-URL:

```
https://www.kitchen-heroes.net/disha/datenschutz
```

Die Website läuft künftig aber unter `www.getdisha.app`. Ohne Gegenmaßnahme
zeigt der Store-Eintrag auf einen toten Link — Apple verlangt eine
funktionierende Datenschutz-URL (Guideline 3.1.2).

Genau **eines** von beidem tun:

- [ ] **Empfohlen:** In App Store Connect die Datenschutz-URL auf
      `https://www.getdisha.app/de/datenschutz` ändern. Zusätzlich bei
      `kitchen-heroes.net` einen 301-Redirect von `/disha/*` auf
      `https://www.getdisha.app/de/*` einrichten, damit alte Links weiterlaufen.
- [ ] **Alternativ:** Bei `kitchen-heroes.net` einen 301-Redirect von
      `/disha/datenschutz` auf `https://www.getdisha.app/de/datenschutz`
      einrichten und die Store-URL so lassen.

Auf Seite dieses Projekts ist schon vorgesorgt: `/disha/datenschutz`,
`/datenschutz` und `/privacy` leiten auf `/de/datenschutz` weiter (siehe
[next.config.ts](next.config.ts)). Das greift nur, wenn diese Pfade auch auf
diese App zeigen — den Redirect **bei kitchen-heroes.net** kann dieses Projekt
nicht setzen.

Ebenfalls noch offen:

- [ ] In der englischen App-Store-Beschreibung steht `https://[your-domain]/privacy`
      als Platzhalter. Auf `https://www.getdisha.app/de/datenschutz` ändern
      (bzw. auf `/en/privacy`, sobald Englisch live ist).
- [ ] Auch die Reviewer-Notes enthalten diesen Platzhalter.

---

## 🟡 4. Support-Postfach muss existieren

Als Kontakt ist überall `hello@getdisha.app` eingetragen
([src/config/site.ts](src/config/site.ts)).

- [ ] Postfach für `hello@getdisha.app` einrichten und Zustellung testen
- [ ] **In der App** steht an einer Stelle noch eine andere Adresse:
      `support@disha.app` in `DishaApp/src/locales/de.json` unter
      `profile.restore_none_message`. Entweder dieses Postfach auch einrichten
      oder die Zeichenkette in der App auf `hello@getdisha.app` ändern — zwei
      unterschiedliche Adressen wirken unprofessionell.
- [ ] Die Kontaktangabe in den App-Store-Connect-Reviewer-Notes
      (`timheck2000@gmail.com`) auf die neue Adresse umstellen, falls gewünscht

---

## 🟡 5. Nährwerte und Beispielzahlen im UI-Nachbau

Die App-Screens auf der Landingpage sind pixelgenaue HTML-Nachbauten der echten
App-UI ([src/components/app-ui/screens.tsx](src/components/app-ui/screens.tsx)),
nicht Screenshots. Die Beschriftungen stammen wörtlich aus
`DishaApp/src/locales/de.json`. Die **Zahlen** sind realistische Beispielwerte:

- Wochenbudget 51,10 € von 60,00 €, Lidl, 2 Personen, Allesesser
- „4 von 45 erledigt", Gesamt ca. 51,10 €
- Rezept: 30 Min, 2 Portionen, ca. 3,40 €, 486 kcal / 44 g Eiweiß / 52 g KH / 9 g Fett

- [ ] Kurz gegenprüfen, dass diese Werte plausibel zu einem echten Disha-Plan
      passen (v. a. die Nährwerte). Falls nicht: in `screens.tsx` anpassen.

---

## 🟡 6. Analytics — bewusst nicht eingebaut

Es ist **kein** Analytics-Script, kein Pixel und kein Cookie eingebaut. Die
Seite braucht deshalb auch kein Cookie-Banner. Das ist konsistent mit dem
„kein Tracking"-Versprechen der App.

- [ ] Entscheiden, ob das so bleibt. Falls doch Zahlen gebraucht werden:
      serverseitige Auswertung (Vercel Analytics ohne Cookies, Plausible oder
      Fathom). Sobald ein Werkzeug Cookies setzt oder personenbezogene Daten
      verarbeitet, werden Cookie-Banner **und** eine Ergänzung der
      Datenschutzerklärung nötig — und das Markenversprechen wird angreifbar.

---

## 🟢 7. Entschieden

| Punkt | Entscheidung |
| --- | --- |
| Domain | `https://www.getdisha.app`, zentral in [src/config/site.ts](src/config/site.ts) |
| Kontakt | `hello@getdisha.app` |
| Android | Play Store ist live → CTA und FAQ verlinken beide Stores |
| Preisanzeige | Statisch in EUR, mit Hinweis „Preise können je nach Region abweichen" im Kleingedruckten. Dynamische Währung ist eine spätere Ausbaustufe. |
| App-Visuals | HTML-Nachbau statt Screenshot-Einbettung — deutsch, in Euro, retina-scharf und animierbar. Die vorhandenen App-Store-PNGs sind überwiegend englisch (Walmart, `$67.02`) und tragen eingebrannte Marketing-Headlines sowie „TOP 10"-Badges. |
| Sprachen | `de` und `en` live. Gerüst für alle 11 App-Sprachen steht (siehe unten). |
| Store-Badges | Offizielle Assets, direkt von Apple Marketing Tools und dem Google-Play-Badge-Generator in deutscher Fassung. Keine Nachbauten. |

---

## Weitere Sprachen nachziehen

Das i18n-Gerüst ist vollständig vorbereitet. Für eine neue Sprache:

1. `src/content/<locale>.ts` nach dem Muster von
   [src/content/de.ts](src/content/de.ts) anlegen. **Vorher** die
   Kernbegriffe aus `DishaApp/src/locales/<locale>.json` übernehmen —
   Terminologie muss 1:1 mit der App übereinstimmen.
2. Den Code in `enabledLocales` in [src/i18n/locales.ts](src/i18n/locales.ts)
   aufnehmen.
3. Die Rechtsseiten-Ordner unter dem lokalisierten Slug anlegen (die
   Slug-Tabelle steht schon in `locales.ts`).

Routing, `<html lang>`, `hreflang`, `canonical`, `sitemap.xml` und das
OG-Image ziehen dann automatisch nach.

Priorisierung laut Briefing: DE → EN → FR/IT/PT/ES → NL/DA/NO/FI/SV.
EN ist seit 2026-08-08 live (inkl. eigener Rechtsseiten `/en/privacy`,
`/en/legal-notice`, `/en/terms` und übersetzter App-Screen-Nachbauten).
Für FR, IT und PT liegen Name/Untertitel/Keywords bereits im ASO-Doc;
für ES, NL, DA, NO, FI und SV existiert noch keine Marketing-Beschreibung.
