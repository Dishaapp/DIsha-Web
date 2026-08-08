import type { Metadata } from "next";

import {
  LegalList,
  LegalPage,
  LegalSection,
} from "@/components/legal/LegalPage";
import { site } from "@/config/site";
import { alternatesFor, socialFor } from "@/lib/seo";

/**
 * Impressum nach § 5 DDG (früher § 5 TMG) und § 18 Abs. 2 MStV.
 *
 * Alle Pflichtangaben sind ausgefüllt (Name, Rechtsform, Anschrift,
 * Telefon, Verantwortlich für Inhalt). Registergericht/USt-IdNr-Abschnitte
 * fehlen bewusst, da nicht zutreffend bei einem Einzelunternehmen ohne
 * Handelsregistereintrag.
 *
 * Dieser Ordner ist exklusiv der deutsche Slug `/de/impressum` — die
 * englische Fassung lebt unter `src/app/[locale]/legal-notice/page.tsx`.
 */

const LAST_UPDATED = "2026-08-04";

export async function generateStaticParams() {
  return [{ locale: "de" as const }];
}

const TITLE = "Impressum";
const DESCRIPTION =
  "Anbieterkennzeichnung und gesetzliche Pflichtangaben zu Disha.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor("de", "imprint"),
  // Ein Impressum gehört nicht in den Suchindex, muss aber verlinkt und
  // direkt erreichbar bleiben.
  robots: { index: false, follow: true },
  ...socialFor({
    title: `${TITLE} | Disha`,
    description: DESCRIPTION,
    locale: "de",
    page: "imprint",
  }),
};

export default function ImprintPage() {
  return (
    <LegalPage
      locale="de"
      title={TITLE}
      intro="Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Abs. 2 Medienstaatsvertrag (MStV)."
      lastUpdated={LAST_UPDATED}
    >


      <LegalSection heading="Anbieter" id="anbieter">
        <p>
          Verantwortlicher Anbieter dieses Internetangebots und der App Disha:
        </p>
        <LegalList
          items={[
            {
              term: "Name",
              value: "Tim Heck",
            },
            {
              term: "Rechtsform",
              value: "Einzelunternehmen",
            },
            {
              term: "Anschrift",
              value: (
                <>
                  Neue Straße 19a<br />
                  35096 Weimar<br />
                  Deutschland
                </>
              ),
            },
          ]}
        />
      </LegalSection>

      <LegalSection heading="Kontakt" id="kontakt">
        <LegalList
          items={[
            {
              term: "E-Mail",
              value: (
                <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              ),
            },
            {
              term: "Telefon",
              value: "+49 15120241787",
            },
          ]}
        />
      </LegalSection>

      <LegalSection
        heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV"
        id="inhaltlich-verantwortlich"
      >
        <LegalList
          items={[
            {
              term: "Name",
              value: "Tim Heck",
            },
            {
              term: "Anschrift",
              value: "Neue Straße 19a, 35096 Weimar",
            },
          ]}
        />
      </LegalSection>

      <LegalSection heading="Streitbeilegung" id="streitbeilegung">
        <p>
          Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht
          bereit.
        </p>
        <p>
          Käufe von Disha Premium werden über Apple bzw. Google abgewickelt. Für
          Fragen zu Zahlung, Rückerstattung oder Kündigung eines Abos ist daher
          der jeweilige Store zuständig.
        </p>
      </LegalSection>

      <LegalSection heading="Haftung für Inhalte" id="haftung-inhalte">
        <p>
          Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach
          den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
          Nutzung von Informationen nach den allgemeinen Gesetzen bleiben
          hiervon unberührt. Eine diesbezügliche Haftung ist erst ab dem
          Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
          Bekanntwerden entsprechender Rechtsverletzungen entfernen wir diese
          Inhalte unverzüglich.
        </p>
      </LegalSection>

      <LegalSection heading="Haftung für Links" id="haftung-links">
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
          verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft; rechtswidrige
          Inhalte waren nicht erkennbar. Eine permanente inhaltliche Kontrolle
          ohne konkrete Anhaltspunkte einer Rechtsverletzung ist nicht zumutbar.
          Bei Bekanntwerden von Rechtsverletzungen entfernen wir solche Links
          unverzüglich.
        </p>
      </LegalSection>

      <LegalSection heading="Urheberrecht" id="urheberrecht">
        <p>
          Die auf diesen Seiten veröffentlichten Inhalte, Texte und
          Bildmaterialien unterliegen dem deutschen Urheberrecht. Beiträge
          Dritter sind als solche gekennzeichnet. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
          sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
        <p>
          Apple, das Apple-Logo und App Store sind Marken von Apple Inc., die in
          den USA und weiteren Ländern eingetragen sind. Google Play und das
          Google-Play-Logo sind Marken von Google LLC. Genannte Supermarktnamen
          sind Marken der jeweiligen Unternehmen und dienen ausschließlich der
          Beschreibung der unterstützten Preisregionen.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
