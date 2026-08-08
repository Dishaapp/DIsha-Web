import type { Metadata } from "next";

import {
  LegalPage,
  LegalSection,
  LegalSubsection,
} from "@/components/legal/LegalPage";
import { site } from "@/config/site";
import { alternatesFor, socialFor } from "@/lib/seo";

/**
 * Datenschutzerklärung.
 *
 * WICHTIG — diese Seite ist inhaltlich vollständig (Verantwortlicher,
 * Aufsichtsbehörde, Drittlandübermittlung, Drittanbieter-Links stehen im
 * Text), aber NOCH NICHT anwaltlich geprüft freigegeben. Die Sachangaben
 * stimmen mit dem überein, was die App tatsächlich tut
 * (`DishaApp/src/locales/de.json`, `profile.privacy_*`) und was gegenüber
 * Apple erklärt wurde (ASO-Doc, „App Review Information“). Offen sind nur
 * noch reale Vertrags-/Prüfschritte (AV-Verträge, juristische Endabnahme),
 * siehe OFFENE-PUNKTE.md.
 *
 * Diese URL ist bereits im App Store hinterlegt (bisher unter
 * kitchen-heroes.net/disha/datenschutz) und darf nicht wegfallen.
 *
 * Dieser Ordner ist exklusiv der deutsche Slug `/de/datenschutz` — die
 * englische Fassung lebt unter `src/app/[locale]/privacy/page.tsx` mit dem
 * Slug `/en/privacy` (siehe `slugs` in `src/i18n/locales.ts`). Deshalb ist
 * `generateStaticParams` hier fest auf `de` beschränkt statt über
 * `enabledLocales` zu iterieren.
 */

const LAST_UPDATED = "2026-08-04";

export async function generateStaticParams() {
  return [{ locale: "de" as const }];
}

const TITLE = "Datenschutzerklärung";
const DESCRIPTION =
  "Wie Disha mit deinen Daten umgeht: keine Accounts, lokale Speicherung auf dem Gerät, kein Tracking und keine Werbung.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor("de", "privacy"),
  ...socialFor({
    title: `${TITLE} | Disha`,
    description: DESCRIPTION,
    locale: "de",
    page: "privacy",
  }),
};

export default function PrivacyPage() {
  return (
    <LegalPage
      locale="de"
      title={TITLE}
      intro="Disha ist so gebaut, dass möglichst wenig Daten anfallen: kein Account, keine E-Mail-Pflicht, keine Werbe-Tracker. Was trotzdem verarbeitet wird, steht hier."
      lastUpdated={LAST_UPDATED}
    >


      <LegalSection heading="1. Verantwortlicher" id="verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung im Sinne der
          Datenschutz-Grundverordnung (DSGVO) ist:
        </p>
        <p>
          Tim Heck<br />
          Neue Straße 19a<br />
          35096 Weimar<br />
          Deutschland
        </p>
        <p>
          E-Mail:{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          <br />
          Telefon: +49 15120241787
        </p>
        <p>
          Ein Datenschutzbeauftragter ist gesetzlich nicht vorgeschrieben und nicht bestellt.
        </p>
      </LegalSection>

      <LegalSection
        heading="2. Grundsatz: Disha ist local-first"
        id="grundsatz"
      >
        <p>
          Für die Nutzung der App Disha ist <strong>kein Account</strong>{" "}
          erforderlich. Es gibt keine Registrierung, keine Anmeldung und keine
          Pflicht, eine E-Mail-Adresse anzugeben. Wir führen kein Nutzerkonto
          und legen kein Nutzerprofil an.
        </p>
        <p>
          Alle inhaltlichen Daten, die bei der Nutzung entstehen, deine
          Wochenpläne, Rezepte, Einkaufslisten, gespeicherten Gerichte sowie
          deine Einstellungen (Budget, Supermarkt, Haushaltsgröße, Ernährung,
          Allergien, unerwünschte Zutaten, Vorlieben, Küchengeräte), werden{" "}
          <strong>ausschließlich lokal auf deinem Gerät</strong> in einer
          SQLite-Datenbank gespeichert. Es findet keine Cloud-Synchronisierung
          statt. Wenn du die App löschst, werden diese Daten mit ihr entfernt.
        </p>
        <p>
          Disha enthält <strong>keine Werbung</strong> und{" "}
          <strong>keine Analyse- oder Werbe-Tracker</strong>. Es wird kein
          geräteübergreifendes Tracking durchgeführt und es werden keine Daten
          zu Werbezwecken an Dritte weitergegeben.
        </p>
      </LegalSection>

      <LegalSection
        heading="3. Erstellung von Wochenplänen mit KI"
        id="ki-plaene"
      >
        <p>
          Wenn du einen neuen Wochenplan erstellen oder ein einzelnes Gericht
          austauschen lässt, wird eine Anfrage an ein KI-Modell (Google Gemini)
          gesendet. Die Anfrage läuft über einen{" "}
          <strong>von uns betriebenen Server-Proxy</strong>; deine App spricht
          nicht direkt mit dem KI-Anbieter.
        </p>

        <LegalSubsection heading="Welche Daten übertragen werden">
          <p>Übertragen werden ausschließlich deine Plan-Einstellungen:</p>
          <ul>
            <li>Wochenbudget</li>
            <li>Land bzw. Region und ausgewählte Supermärkte</li>
            <li>Haushaltsgröße</li>
            <li>Ernährungsstil (z. B. vegetarisch, vegan, High Protein)</li>
            <li>Allergien und Unverträglichkeiten</li>
            <li>Zutaten, die du ausgeschlossen hast</li>
            <li>Vorlieben und vorhandene Küchengeräte</li>
            <li>Gewünschte Mahlzeiten und Wochentage</li>
          </ul>
          <p>
            <strong>Nicht übertragen</strong> werden: Name, E-Mail-Adresse,
            Telefonnummer, Werbe-IDs, Gerätekennungen zur Wiedererkennung sowie
            dein genauer Standort. Die Angaben lassen für sich genommen keinen
            Rückschluss auf deine Identität zu.
          </p>
        </LegalSubsection>

        <LegalSubsection heading="Rechtsgrundlage und Zweck">
          <p>
            Zweck der Verarbeitung ist die Erbringung der von dir angeforderten
            Hauptleistung: das Erstellen eines Essensplans. Rechtsgrundlage ist{" "}
            <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> (Erfüllung eines
            Vertrags bzw. Durchführung vorvertraglicher Maßnahmen).
          </p>
          <p>
            Angaben zu Allergien und Unverträglichkeiten können als
            Gesundheitsdaten im Sinne von Art. 9 DSGVO eingeordnet werden. Da wir diese Angaben jedoch vollständig anonymisieren und ohne jegliche Nutzerkennung (kein Account, keine E-Mail, keine Werbe-ID) ausschließlich als Teil der Anfrage an die KI senden, ist ein Rückschluss auf deine Person ausgeschlossen. Du
            gibst sie freiwillig an, um passende Rezepte zu erhalten;
            Rechtsgrundlage ist vorsorglich deine{" "}
            <strong>
              ausdrückliche Einwilligung nach Art. 9 Abs. 2 lit. a DSGVO
            </strong>
            , die du durch die Angabe im Onboarding erteilst und jederzeit durch
            Löschen der Angaben in den Einstellungen widerrufen kannst.
          </p>
        </LegalSubsection>

        <LegalSubsection heading="Speicherdauer, Server-Logs und Drittland">
          <p>
            Beim Aufruf des Proxys (über unseren Anbieter Cloudflare) fällt technisch bedingt deine IP-Adresse an.
            Sie wird zur Auslieferung der Antwort und zur Abwehr von Missbrauch
            (z. B. Ratenbegrenzung) verarbeitet und in der Regel nur kurzzeitig in Server-Logs gespeichert; Rechtsgrundlage ist{" "}
            <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> (berechtigtes Interesse
            an einem stabilen, missbrauchsfreien Betrieb).
          </p>
          <p>
            Die Anfrage wird an unseren KI-Anbieter Google (Google Gemini) in die USA übermittelt. Wir stützen diese Übermittlung auf das EU-US Data Privacy Framework. Bitte beachte: Google kann die vollständig anonymisierten Eingaben (wie Rezepte, Zutaten) potenziell zur Verbesserung der Modelle nutzen. Da jedoch keine personenbezogenen Identifier übermittelt werden, ist kein Rückschluss auf deine Person möglich.
          </p>
          <p>
            Weitere Informationen zur Datenverarbeitung findest du in den Datenschutzerklärungen der Anbieter:
          </p>
          <ul>
            <li><a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="underline">Cloudflare Datenschutzerklärung</a></li>
            <li><a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="underline">Google Datenschutzerklärung</a></li>
          </ul>
        </LegalSubsection>
      </LegalSection>

      <LegalSection heading="4. Abo-Abwicklung (Disha Premium)" id="abo">
        <p>
          Disha Premium ist ein automatisch verlängerndes Abo. Der Kauf selbst
          wird vollständig über den jeweiligen App-Store abgewickelt, über
          Apple (App Store) bzw. Google (Google Play). Wir erhalten keine
          Zahlungsdaten wie Kreditkartennummern oder Kontoverbindungen.
        </p>
        <p>
          Zur technischen Verwaltung des Abo-Status setzen wir den Dienstleister{" "}
          <strong>RevenueCat, Inc.</strong> ein. RevenueCat erhält eine anonyme,
          von der App erzeugte Kennung sowie die Kaufbelege des Stores, um zu
          prüfen, ob ein aktives Abo besteht. Ein Personenbezug zu Name oder
          E-Mail-Adresse wird von uns nicht hergestellt. Rechtsgrundlage ist{" "}
          <strong>Art. 6 Abs. 1 lit. b DSGVO</strong>.
        </p>
        <p>
          Weitere Informationen zur Datenverarbeitung findest du in den jeweiligen Datenschutzerklärungen:
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li><a href="https://www.revenuecat.com/privacy/" target="_blank" rel="noopener noreferrer" className="underline">RevenueCat Datenschutzerklärung</a></li>
          <li><a href="https://www.apple.com/legal/privacy/de-ww/" target="_blank" rel="noopener noreferrer" className="underline">Apple Datenschutzerklärung</a></li>
          <li><a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="underline">Google Datenschutzerklärung</a></li>
        </ul>
      </LegalSection>

      <LegalSection heading="5. Standortabfrage" id="standort">
        <p>
          Disha kann dich <strong>einmalig</strong> um Zugriff auf deinen
          Standort bitten, um passende Supermärkte und Preise für deine Region
          vorzuschlagen. Der Wortlaut der Abfrage in der App lautet: „Disha
          nutzt deinen Standort einmalig, um passende Supermärkte und Preise für
          deine Region vorzuschlagen.&ldquo;
        </p>
        <p>
          Die Abfrage ist <strong>freiwillig</strong>, die App funktioniert
          vollständig ohne sie. Rechtsgrundlage ist deine Einwilligung nach{" "}
          <strong>Art. 6 Abs. 1 lit. a DSGVO</strong>, die du jederzeit in den
          Systemeinstellungen deines Geräts widerrufen kannst. Aus dem Standort
          wird lediglich die Region abgeleitet; ein genauer Standort wird nicht
          gespeichert und nicht an die KI übertragen.
        </p>
      </LegalSection>

      <LegalSection heading="6. Mitteilungen" id="mitteilungen">
        <p>
          Wenn du die Einkaufs-Erinnerung aktivierst, plant Disha lokale
          Mitteilungen auf deinem Gerät. Diese werden{" "}
          <strong>vollständig auf dem Gerät</strong> erzeugt. Es werden keine
          Push-Nachrichten über einen Server versendet und keine Push-Token an
          uns übertragen. Du kannst die Erinnerung in der App oder in den
          Systemeinstellungen jederzeit abschalten.
        </p>
      </LegalSection>

      <LegalSection heading="7. Diese Website" id="website">
        <p>
          Diese Website ist eine rein statische Informationsseite. Sie setzt{" "}
          <strong>keine Cookies</strong>, bindet{" "}
          <strong>keine Analyse-Werkzeuge</strong> ein und lädt{" "}
          <strong>keine externen Schriftarten, Karten oder Videos</strong>{" "}
          nachträglich. Es gibt kein Kontaktformular und keinen Login.
        </p>
        <p>
          Beim Aufruf der Seite verarbeitet unser Hosting-Anbieter Vercel Inc. (USA) technisch
          notwendige Verbindungsdaten (IP-Adresse, Zeitpunkt, aufgerufene
          Adresse, übertragene Datenmenge, Browser- und Betriebssystemkennung)
          in Server-Logs. Die Datenübermittlung in die USA erfolgt auf Basis des EU-US Data Privacy Frameworks. Rechtsgrundlage ist{" "}
          <strong>Art. 6 Abs. 1 lit. f DSGVO</strong>.
        </p>
        <p>
          Weitere Informationen zur Datenverarbeitung durch unseren Hostinganbieter findest du in der <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline">Vercel Datenschutzerklärung</a>.
        </p>
        <p>
          Die Buttons zum App Store und zu Google Play sind einfache Links. Erst
          wenn du sie anklickst, wird eine Verbindung zu Apple bzw. Google
          aufgebaut. Es findet keine Vorab-Einbettung und kein Tracking-Pixel
          statt.
        </p>
      </LegalSection>

      <LegalSection heading="8. Weitergabe an Dritte" id="weitergabe">
        <p>
          Eine Weitergabe von Daten erfolgt nur an die oben genannten
          Dienstleister und nur im beschriebenen Umfang: an den KI-Anbieter zur
          Erstellung des Plans, an RevenueCat sowie Apple bzw. Google zur
          Abo-Abwicklung und an den Hosting-Anbieter zum Betrieb von Proxy und
          Website. Ein Verkauf von Daten findet nicht statt. Eine Weitergabe zu
          Werbezwecken findet nicht statt.
        </p>
      </LegalSection>

      <LegalSection heading="9. Deine Rechte" id="rechte">
        <p>Du hast nach der DSGVO jederzeit das Recht auf:</p>
        <ul>
          <li>Auskunft über die zu dir verarbeiteten Daten (Art. 15)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16)</li>
          <li>Löschung (Art. 17)</li>
          <li>Einschränkung der Verarbeitung (Art. 18)</li>
          <li>Datenübertragbarkeit (Art. 20)</li>
          <li>
            Widerspruch gegen Verarbeitungen auf Grundlage berechtigter
            Interessen (Art. 21)
          </li>
          <li>
            Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art.
            7 Abs. 3)
          </li>
        </ul>
        <p>
          Ein wichtiger Hinweis dazu: Da wir keine Accounts führen und deine
          Inhalte ausschließlich auf deinem Gerät liegen, können wir dich in der
          Regel <strong>nicht identifizieren</strong> und dir dementsprechend
          keine bei uns gespeicherten Daten zuordnen (Art. 11 DSGVO). Löschen
          kannst du deine Daten jederzeit selbst: in der App unter „Ich&ldquo; →
          „Alle Pläne löschen&ldquo; oder durch Deinstallation der App.
        </p>
        <p>
          Für Anfragen erreichst du uns unter{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </LegalSection>

      <LegalSection heading="10. Beschwerderecht" id="beschwerde">
        <p>
          Du hast das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über
          die Verarbeitung deiner Daten zu beschweren (Art. 77 DSGVO). Zuständig
          ist die Behörde deines Wohnsitzes oder die des Verantwortlichen:
          Der Hessische Beauftragte für Datenschutz und Informationsfreiheit.
        </p>
      </LegalSection>

      <LegalSection heading="11. Kinder" id="kinder">
        <p>
          Disha ist mit der Altersfreigabe 4+ eingestuft und richtet sich an
          Erwachsene, die einen Haushalt versorgen. Wir erheben bewusst keine
          Daten, die eine Alterszuordnung ermöglichen würden.
        </p>
      </LegalSection>

      <LegalSection heading="12. Änderungen" id="aenderungen">
        <p>
          Wir passen diese Erklärung an, wenn sich die App oder die eingesetzten
          Dienste ändern. Es gilt jeweils die auf dieser Seite veröffentlichte
          Fassung; das Datum der letzten Änderung steht am Anfang der Seite.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
