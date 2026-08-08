import type { Metadata } from "next";

import {
  LegalList,
  LegalPage,
  LegalSection,
} from "@/components/legal/LegalPage";
import { site } from "@/config/site";
import { alternatesFor, socialFor } from "@/lib/seo";

/**
 * Legal Notice (English) — englisches Pendant zum deutschen Impressum nach
 * § 5 DDG und § 18 Abs. 2 MStV.
 *
 * Vollständige englische Übersetzung von
 * `src/app/[locale]/impressum/page.tsx`. Deutsches Recht bleibt anwendbar
 * (deutsches Unternehmen) — die Paragrafen werden hier auf Englisch erklärt,
 * nicht durch ein anderes Rechtssystem ersetzt.
 *
 * Dieser Ordner ist exklusiv der englische Slug `/en/legal-notice` — die
 * deutsche Fassung lebt unter `src/app/[locale]/impressum/page.tsx`.
 */

const LAST_UPDATED = "2026-08-04";

export async function generateStaticParams() {
  return [{ locale: "en" as const }];
}

const TITLE = "Legal Notice";
const DESCRIPTION = "Provider identification and legally required information about Disha.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor("en", "imprint"),
  // A legal notice doesn't belong in the search index, but must stay linked
  // and directly reachable.
  robots: { index: false, follow: true },
  ...socialFor({
    title: `${TITLE} | Disha`,
    description: DESCRIPTION,
    locale: "en",
    page: "imprint",
  }),
};

export default function LegalNoticePage() {
  return (
    <LegalPage
      locale="en"
      title={TITLE}
      intro="Information pursuant to Section 5 of the German Digital Services Act (DDG) and Section 18(2) of the German Interstate Media Treaty (MStV)."
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection heading="Provider" id="provider">
        <p>
          The provider responsible for this website and the Disha app is:
        </p>
        <LegalList
          items={[
            {
              term: "Name",
              value: "Tim Heck",
            },
            {
              term: "Legal form",
              value: "Sole proprietorship (Einzelunternehmen)",
            },
            {
              term: "Address",
              value: (
                <>
                  Neue Straße 19a<br />
                  35096 Weimar<br />
                  Germany
                </>
              ),
            },
          ]}
        />
      </LegalSection>

      <LegalSection heading="Contact" id="contact">
        <LegalList
          items={[
            {
              term: "Email",
              value: (
                <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              ),
            },
            {
              term: "Phone",
              value: "+49 15120241787",
            },
          ]}
        />
      </LegalSection>

      <LegalSection
        heading="Responsible for content under Section 18(2) MStV"
        id="content-responsibility"
      >
        <LegalList
          items={[
            {
              term: "Name",
              value: "Tim Heck",
            },
            {
              term: "Address",
              value: "Neue Straße 19a, 35096 Weimar, Germany",
            },
          ]}
        />
      </LegalSection>

      <LegalSection heading="Dispute resolution" id="dispute-resolution">
        <p>
          We are neither obligated nor willing to participate in dispute
          resolution proceedings before a consumer arbitration board.
        </p>
        <p>
          Purchases of Disha Premium are processed through Apple or Google.
          For questions regarding payment, refunds, or cancellation of a
          subscription, the respective store is therefore responsible.
        </p>
      </LegalSection>

      <LegalSection heading="Liability for content" id="content-liability">
        <p>
          As a service provider, we are responsible for our own content on
          these pages under general law. However, we are not obligated to
          monitor transmitted or stored third-party information or to
          investigate circumstances that indicate unlawful activity.
          Obligations to remove or block the use of information under
          general law remain unaffected. Liability in this regard is only
          possible from the point in time at which a concrete infringement
          becomes known. Upon becoming aware of any such infringement, we
          will remove this content immediately.
        </p>
      </LegalSection>

      <LegalSection heading="Liability for links" id="link-liability">
        <p>
          Our website contains links to external third-party websites over
          whose content we have no influence. We therefore cannot accept
          any liability for this external content. The respective provider
          or operator of the linked pages is always responsible for their
          content. The linked pages were checked for possible legal
          violations at the time of linking; no unlawful content was
          identifiable. Permanent monitoring of the content of linked pages
          without concrete evidence of an infringement is not reasonable.
          Upon becoming aware of any infringements, we will remove such
          links immediately.
        </p>
      </LegalSection>

      <LegalSection heading="Copyright" id="copyright">
        <p>
          The content, texts, and images published on these pages are
          subject to German copyright law. Contributions by third parties
          are marked as such. Reproduction, editing, distribution, and any
          kind of use beyond the scope of copyright law require the written
          consent of the respective author or creator. Downloads and copies
          of this page are only permitted for private, non-commercial use.
        </p>
        <p>
          Apple, the Apple logo, and App Store are trademarks of Apple Inc.,
          registered in the U.S. and other countries. Google Play and the
          Google Play logo are trademarks of Google LLC. Supermarket names
          mentioned are trademarks of the respective companies and are used
          solely to describe the supported price regions.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
