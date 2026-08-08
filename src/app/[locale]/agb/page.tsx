import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalPage,
  LegalSection,
} from "@/components/legal/LegalPage";
import { site } from "@/config/site";
import { pathFor } from "@/i18n/locales";
import { alternatesFor, socialFor } from "@/lib/seo";

/**
 * Nutzungsbedingungen für Website und App.
 *
 * Rechtlich ergänzend: für die In-App-Käufe gilt Apples Standard-EULA, auf die
 * die App-Store-Beschreibung bereits verweist. Diese Seite regelt die Nutzung
 * der Website und stellt den wichtigsten Haftungsausschluss klar — Disha ist
 * kein medizinischer oder ernährungswissenschaftlicher Rat.
 *
 * WICHTIG — Struktur und Inhalt sind vorbereitet, aber NICHT als geprüfter
 * Rechtstext freigegeben. Siehe OFFENE-PUNKTE.md.
 *
 * Dieser Ordner ist exklusiv der deutsche Slug `/de/agb` — die englische
 * Fassung lebt unter `src/app/[locale]/terms/page.tsx`.
 */

const LAST_UPDATED = "2026-08-04";

export async function generateStaticParams() {
  return [{ locale: "de" as const }];
}

const TITLE = "Nutzungsbedingungen";
const DESCRIPTION =
  "Bedingungen für die Nutzung der Disha-Website und der App, inklusive Hinweisen zu Preisschätzungen, Rezepten und Abos.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor("de", "terms"),
  ...socialFor({
    title: `${TITLE} | Disha`,
    description: DESCRIPTION,
    locale: "de",
    page: "terms",
  }),
};

export default function TermsPage() {
  return (
    <LegalPage
      locale="de"
      title={TITLE}
      intro="Diese Bedingungen gelten für die Nutzung dieser Website und ergänzen die Bedingungen des jeweiligen App-Stores für die App Disha."
      lastUpdated={LAST_UPDATED}
    >


      <LegalSection heading="1. Geltungsbereich" id="geltungsbereich">
        <p>
          Diese Bedingungen regeln die Nutzung der Website unter{" "}
          <strong>{site.url.replace("https://", "")}</strong>. Der Anbieter dieser Website ist <strong>Tim Heck, Neue Straße 19a, 35096 Weimar, Deutschland</strong>.
        </p>
        <p>
          Für die App Disha
          und die darin angebotenen In-App-Käufe gelten zusätzlich die
          Bedingungen des Stores, über den du die App bezogen hast.
        </p>
        <p>
          Für Käufe über den App Store gilt Apples
          Standard-Endnutzer-Lizenzvertrag:{" "}
          <a href={site.eulaUrl} target="_blank" rel="noopener">
            {site.eulaUrl}
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="2. Leistungsbeschreibung" id="leistung">
        <p>
          Disha erstellt Vorschläge für Essenspläne und daraus abgeleitete
          Einkaufslisten. Die Vorschläge werden teilweise durch ein
          KI-Sprachmodell erzeugt. Sie sind{" "}
          <strong>Vorschläge, keine verbindlichen Zusagen</strong>.
        </p>
        <p>
          <strong>Transparenzhinweis nach EU AI Act:</strong> Diese App nutzt Künstliche Intelligenz zur Erstellung von Inhalten (Essenspläne, Rezeptvorschläge, Zutatenlisten sowie Rezeptbilder). Du interagierst bei der Planerstellung mittelbar mit einem KI-System. Die generierten Ausgaben (Texte und Bilder) werden vor der Anzeige in der App nicht durch menschliches Personal auf Richtigkeit geprüft.
        </p>
        <p>
          Der erste Wochenplan nach dem Onboarding ist kostenlos und vollständig
          nutzbar. Weitere KI-generierte Pläne sowie die vollständige
          Einkaufsliste sind Teil von Disha Premium.
        </p>
      </LegalSection>

      <LegalSection heading="3. Preisschätzungen" id="preisschaetzungen">
        <p>
          Die in der App angezeigten Kosten sind <strong>Schätzungen</strong>{" "}
          auf Basis des typischen Preisniveaus des von dir gewählten Supermarkts
          in deiner Region. Sie sind keine Preisauskunft und kein Angebot.
        </p>
        <p>
          Tatsächliche Preise können abweichen, etwa durch Aktionen,
          Eigenmarken, saisonale Schwankungen, regionale Unterschiede oder
          Änderungen im Sortiment. Wir übernehmen keine Gewähr dafür, dass ein
          Einkauf ein angegebenes Budget einhält.
        </p>
        <p>
          Zwischen Disha und den genannten Supermärkten besteht keine
          geschäftliche Verbindung, Kooperation oder Partnerschaft. Die Namen
          dienen ausschließlich der Beschreibung der unterstützten
          Preisregionen.
        </p>
      </LegalSection>

      <LegalSection
        heading="4. Kein medizinischer oder ernährungswissenschaftlicher Rat"
        id="kein-medizinischer-rat"
      >
        <p>
          Disha ist ein Planungswerkzeug für den Alltag.{" "}
          <strong>
            Die Inhalte stellen keine medizinische, diätetische oder
            ernährungswissenschaftliche Beratung dar
          </strong>{" "}
          und ersetzen keine ärztliche oder therapeutische Behandlung.
        </p>
        <p>
          Angaben zu Nährwerten sind Näherungswerte und beziehen sich auf eine
          typische Zubereitung.
        </p>
        <p>
          <strong>Allergien und Unverträglichkeiten:</strong> Disha
          berücksichtigt die von dir angegebenen Allergien, Unverträglichkeiten
          und ausgeschlossenen Zutaten bei der Auswahl der Rezepte. Eine
          Filterfunktion kann eine eigene Prüfung jedoch nicht ersetzen. Prüfe
          bei einer Allergie oder Unverträglichkeit{" "}
          <strong>stets die Zutatenliste der konkret gekauften Produkte</strong>
          , insbesondere im Hinblick auf Spurenhinweise und
          Kreuzkontaminationen. Bei medizinisch relevanten Einschränkungen halte
          Rücksprache mit medizinischem Fachpersonal.
        </p>
        <p>
          Beachte außerdem die üblichen Regeln der Lebensmittelhygiene, etwa
          beim Umgang mit rohem Fleisch, Fisch und Eiern sowie bei der Lagerung
          von Resten.
        </p>
      </LegalSection>

      <LegalSection heading="5. Abo, Laufzeit und Kündigung" id="abo">
        <p>
          Disha Premium ist ein automatisch verlängerndes Abo. Es kostet{" "}
          {site.pricing.monthly.amount} pro Monat oder{" "}
          {site.pricing.yearly.amount} pro Jahr. Preise können je nach Region
          abweichen.
        </p>
        <p>
          Das Abo verlängert sich automatisch, sofern es nicht mindestens 24
          Stunden vor Ablauf des laufenden Zeitraums gekündigt wird. Die
          Abrechnung der Verlängerung erfolgt innerhalb von 24 Stunden vor Ende
          des laufenden Zeitraums.
        </p>
        <p>
          Verwaltung und Kündigung laufen ausschließlich über deinen
          Store-Account: auf dem iPhone unter Einstellungen → Apple-Konto →
          Abonnements, bei Android im Google Play Store unter Zahlungen und
          Abos. Wir haben keinen Zugriff auf deinen Abo-Status beim Store und
          können eine Kündigung nicht für dich vornehmen.
        </p>
        <p>Für Rückerstattungen ist ebenfalls der jeweilige Store zuständig.</p>
      </LegalSection>

      <LegalSection heading="6. Widerrufsrecht" id="widerruf">
        <p>
          Da der Vertrag über den digitalen Inhalt (In-App-Käufe, Abonnements) ausschließlich mit dem jeweiligen App-Store zustande kommt (Apple oder Google fungieren hierbei als Händler bzw. „Merchant of Record“), richtet sich das Widerrufsrecht nach den Bedingungen von Apple bzw. Google. 
        </p>
        <p>
          Bitte richte einen etwaigen Widerruf oder eine Anfrage auf Rückerstattung direkt an den Kundenservice des jeweiligen App-Stores.
        </p>
      </LegalSection>

      <LegalSection heading="7. Nutzung und Pflichten" id="nutzung-pflichten">
        <p>
          Die Inhalte dieser Website und der App dürfen für den privaten, nicht
          kommerziellen Gebrauch angesehen und genutzt werden. Nicht
          gestattet sind insbesondere das automatisierte Auslesen in großem
          Umfang, das Umgehen technischer Schutzmaßnahmen sowie Handlungen, die
          die Verfügbarkeit der Website oder der App beeinträchtigen.
        </p>
        <p>
          <strong>Datensicherung:</strong> Da Disha alle inhaltlichen Daten (Pläne, Einkaufslisten) ausschließlich lokal auf deinem Gerät speichert, bist du für die regelmäßige Sicherung deines Geräts selbst verantwortlich. Bei Deinstallation der App oder Verlust des Geräts können die lokal gespeicherten Daten unwiederbringlich verloren gehen.
        </p>
        <p>
          Wir behalten uns vor, Inhalte und Funktionen jederzeit zu
          ändern oder einzustellen. Ein Anspruch auf ständige Verfügbarkeit
          besteht nicht.
        </p>
      </LegalSection>

      <LegalSection heading="8. Rechte an der App und Website" id="rechte">
        <p>
          Alle Rechte an der App, der Website, ihren Inhalten, Rezepten, Texten, Grafiken und Logos verbleiben bei uns bzw. den jeweiligen Rechteinhabern. Du erhältst ein einfaches, nicht übertragbares Recht zur Nutzung für eigene, nicht-kommerzielle Zwecke.
        </p>
      </LegalSection>

      <LegalSection heading="9. Haftung" id="haftung">
        <p>
          Wir haften unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie
          nach den Vorschriften des Produkthaftungsgesetzes. Bei Verletzung des
          Lebens, des Körpers oder der Gesundheit haften wir ebenfalls
          unbeschränkt.
        </p>
        <p>
          Bei einfacher Fahrlässigkeit haften wir nur bei Verletzung einer
          wesentlichen Vertragspflicht, deren Erfüllung die ordnungsgemäße
          Durchführung des Vertrags erst ermöglicht, und begrenzt auf den
          vorhersehbaren, vertragstypischen Schaden. Eine weitergehende Haftung
          ist ausgeschlossen.
        </p>
        <p>
          Insbesondere haften wir nicht für Vermögensnachteile, die daraus
          entstehen, dass eine Preisschätzung überschritten wird.
        </p>
      </LegalSection>

      <LegalSection heading="10. Datenschutz" id="datenschutz">
        <p>
          Wie wir mit Daten umgehen, steht in der{" "}
          <Link href={pathFor("de", "privacy")}>Datenschutzerklärung</Link>.
        </p>
      </LegalSection>

      <LegalSection
        heading="11. Änderungen dieser Bedingungen"
        id="aenderungen"
      >
        <p>
          Wir können diese Bedingungen anpassen, wenn sich das Angebot oder die
          Rechtslage ändert. Es gilt jeweils die auf dieser Seite
          veröffentlichte Fassung; das Datum der letzten Änderung steht am
          Anfang der Seite.
        </p>
      </LegalSection>

      <LegalSection heading="12. Anwendbares Recht" id="recht">
        <p>
          Es gilt deutsches Recht. Zwingende Verbraucherschutzvorschriften des
          Staates, in dem du deinen gewöhnlichen Aufenthalt hast, bleiben
          unberührt.
        </p>
      </LegalSection>

      <LegalSection heading="13. Kontakt" id="kontakt">
        <p>
          Bei Fragen zu diesen Bedingungen erreichst du uns unter{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>. Die
          vollständigen Anbieterangaben stehen im{" "}
          <Link href={pathFor("de", "imprint")}>Impressum</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
