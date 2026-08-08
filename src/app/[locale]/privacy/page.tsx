import type { Metadata } from "next";

import {
  LegalPage,
  LegalSection,
  LegalSubsection,
} from "@/components/legal/LegalPage";
import { site } from "@/config/site";
import { alternatesFor, socialFor } from "@/lib/seo";

/**
 * Privacy Policy (English).
 *
 * Vollständige englische Übersetzung von
 * `src/app/[locale]/datenschutz/page.tsx` — inhaltlich identisch, nur die
 * Sprache ändert sich. Bei Änderungen an der deutschen Fassung diese Datei
 * mit übersetzen, `LAST_UPDATED` synchron halten.
 *
 * Dieser Ordner ist exklusiv der englische Slug `/en/privacy` — die deutsche
 * Fassung lebt unter `src/app/[locale]/datenschutz/page.tsx`.
 */

const LAST_UPDATED = "2026-08-04";

export async function generateStaticParams() {
  return [{ locale: "en" as const }];
}

const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Disha handles your data: no accounts, local storage on your device, no tracking, and no ads.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: alternatesFor("en", "privacy"),
  ...socialFor({
    title: `${TITLE} | Disha`,
    description: DESCRIPTION,
    locale: "en",
    page: "privacy",
  }),
};

export default function PrivacyPage() {
  return (
    <LegalPage
      locale="en"
      title={TITLE}
      intro="Disha is built so that as little data as possible is collected: no account, no email required, no ad trackers. What is still processed is listed here."
      lastUpdated={LAST_UPDATED}
    >
      <LegalSection heading="1. Data Controller" id="controller">
        <p>
          The controller responsible for data processing within the meaning
          of the General Data Protection Regulation (GDPR) is:
        </p>
        <p>
          Tim Heck<br />
          Neue Straße 19a<br />
          35096 Weimar<br />
          Germany
        </p>
        <p>
          Email:{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          <br />
          Phone: +49 15120241787
        </p>
        <p>
          A data protection officer is not legally required and has not been
          appointed.
        </p>
      </LegalSection>

      <LegalSection heading="2. Core principle: Disha is local-first" id="principle">
        <p>
          Using the Disha app does <strong>not require an account</strong>.
          There is no registration, no sign-in, and no requirement to
          provide an email address. We do not maintain user accounts and do
          not create user profiles.
        </p>
        <p>
          All content data generated while using the app, your weekly
          plans, recipes, shopping lists, saved dishes, and settings
          (budget, supermarket, household size, diet, allergies, unwanted
          ingredients, preferences, kitchen equipment), is stored{" "}
          <strong>exclusively locally on your device</strong> in an SQLite
          database. There is no cloud synchronization. If you delete the
          app, this data is removed along with it.
        </p>
        <p>
          Disha contains <strong>no advertising</strong> and{" "}
          <strong>no analytics or ad trackers</strong>. No cross-device
          tracking is performed and no data is shared with third parties for
          advertising purposes.
        </p>
      </LegalSection>

      <LegalSection heading="3. Creating weekly plans with AI" id="ai-plans">
        <p>
          When you create a new weekly plan or swap a single dish, a request
          is sent to an AI model (Google Gemini). The request goes through a{" "}
          <strong>server proxy that we operate</strong>; your app does not
          talk directly to the AI provider.
        </p>

        <LegalSubsection heading="What data is transmitted">
          <p>Only your plan settings are transmitted:</p>
          <ul>
            <li>Weekly budget</li>
            <li>Country/region and selected supermarkets</li>
            <li>Household size</li>
            <li>Diet style (e.g. vegetarian, vegan, high protein)</li>
            <li>Allergies and intolerances</li>
            <li>Ingredients you have excluded</li>
            <li>Preferences and available kitchen equipment</li>
            <li>Desired meals and days of the week</li>
          </ul>
          <p>
            <strong>Not transmitted</strong>: name, email address, phone
            number, advertising IDs, device identifiers for re-recognition,
            or your precise location. On their own, these details do not
            allow any conclusion about your identity.
          </p>
        </LegalSubsection>

        <LegalSubsection heading="Legal basis and purpose">
          <p>
            The purpose of the processing is to provide the main service you
            requested: creating a meal plan. The legal basis is{" "}
            <strong>Art. 6(1)(b) GDPR</strong> (performance of a contract or
            steps prior to entering into a contract).
          </p>
          <p>
            Information about allergies and intolerances may qualify as
            health data within the meaning of Art. 9 GDPR. However, since we
            fully anonymize this information and send it as part of the AI
            request without any user identifier whatsoever (no account, no
            email, no advertising ID), it cannot be traced back to you as a
            person. You provide it voluntarily to receive suitable recipes;
            as a precaution, the legal basis is your{" "}
            <strong>explicit consent under Art. 9(2)(a) GDPR</strong>, which
            you give by entering the information during onboarding and can
            withdraw at any time by deleting it in the settings.
          </p>
        </LegalSubsection>

        <LegalSubsection heading="Retention period, server logs, and third countries">
          <p>
            When the proxy is called (via our provider Cloudflare), your IP
            address is technically processed. It is used to deliver the
            response and to prevent abuse (e.g. rate limiting) and is
            generally stored only briefly in server logs; the legal basis is{" "}
            <strong>Art. 6(1)(f) GDPR</strong> (legitimate interest in
            stable, abuse-free operation).
          </p>
          <p>
            The request is transmitted to our AI provider Google (Google
            Gemini) in the United States. We base this transfer on the EU-US
            Data Privacy Framework. Please note: Google may potentially use
            the fully anonymized inputs (such as recipes and ingredients) to
            improve its models. However, since no personal identifiers are
            transmitted, no conclusion about your identity is possible.
          </p>
          <p>
            You can find further information on data processing in the
            privacy policies of these providers:
          </p>
          <ul>
            <li>
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Cloudflare Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://policies.google.com/privacy?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google Privacy Policy
              </a>
            </li>
          </ul>
        </LegalSubsection>
      </LegalSection>

      <LegalSection heading="4. Subscription handling (Disha Premium)" id="subscription">
        <p>
          Disha Premium is an auto-renewing subscription. The purchase
          itself is handled entirely through the respective app store, via
          Apple (App Store) or Google (Google Play). We do not receive
          payment data such as credit card numbers or bank details.
        </p>
        <p>
          For the technical management of subscription status, we use the
          service provider <strong>RevenueCat, Inc.</strong> RevenueCat
          receives an anonymous identifier generated by the app together
          with the store&rsquo;s purchase receipts, in order to verify whether an
          active subscription exists. We do not link this to your name or
          email address. The legal basis is{" "}
          <strong>Art. 6(1)(b) GDPR</strong>.
        </p>
        <p>
          You can find further information on data processing in the
          respective privacy policies:
        </p>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <a
              href="https://www.revenuecat.com/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              RevenueCat Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="https://www.apple.com/legal/privacy/en-ww/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Apple Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="https://policies.google.com/privacy?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Google Privacy Policy
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="5. Location request" id="location">
        <p>
          Disha may ask you <strong>once</strong> for access to your
          location in order to suggest suitable supermarkets and prices for
          your region. The wording of the prompt in the app is: &ldquo;Disha
          uses your location once to suggest suitable supermarkets and
          prices for your region.&rdquo;
        </p>
        <p>
          The request is <strong>optional</strong>, the app works fully
          without it. The legal basis is your consent under{" "}
          <strong>Art. 6(1)(a) GDPR</strong>, which you can withdraw at any
          time in your device&rsquo;s system settings. Only the region is derived
          from the location; a precise location is not stored and not
          transmitted to the AI.
        </p>
      </LegalSection>

      <LegalSection heading="6. Notifications" id="notifications">
        <p>
          If you enable the shopping reminder, Disha schedules local
          notifications on your device. These are generated{" "}
          <strong>entirely on the device</strong>. No push messages are
          sent via a server and no push tokens are transmitted to us. You
          can turn the reminder off at any time in the app or in your system
          settings.
        </p>
      </LegalSection>

      <LegalSection heading="7. This website" id="website">
        <p>
          This website is a purely static informational page. It sets{" "}
          <strong>no cookies</strong>, embeds{" "}
          <strong>no analytics tools</strong>, and does not subsequently
          load <strong>external fonts, maps, or videos</strong>. There is no
          contact form and no login.
        </p>
        <p>
          When the page is accessed, our hosting provider Vercel Inc. (USA)
          technically processes connection data required for operation (IP
          address, timestamp, page requested, data volume transferred,
          browser and operating system identifier) in server logs. The
          transfer of data to the USA is based on the EU-US Data Privacy
          Framework. The legal basis is{" "}
          <strong>Art. 6(1)(f) GDPR</strong>.
        </p>
        <p>
          You can find further information on data processing by our
          hosting provider in the{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Vercel Privacy Policy
          </a>
          .
        </p>
        <p>
          The buttons linking to the App Store and Google Play are simple
          links. A connection to Apple or Google is only established once
          you click them. There is no advance embedding and no tracking
          pixel.
        </p>
      </LegalSection>

      <LegalSection heading="8. Disclosure to third parties" id="disclosure">
        <p>
          Data is only disclosed to the service providers named above and
          only to the extent described: to the AI provider for creating the
          plan, to RevenueCat and Apple/Google for subscription handling,
          and to the hosting provider for operating the proxy and the
          website. We do not sell data. Data is not disclosed for
          advertising purposes.
        </p>
      </LegalSection>

      <LegalSection heading="9. Your rights" id="rights">
        <p>Under the GDPR you have the right, at any time, to:</p>
        <ul>
          <li>access the data processed about you (Art. 15)</li>
          <li>rectify inaccurate data (Art. 16)</li>
          <li>erasure (Art. 17)</li>
          <li>restrict processing (Art. 18)</li>
          <li>data portability (Art. 20)</li>
          <li>
            object to processing based on legitimate interests (Art. 21)
          </li>
          <li>
            withdraw consent given, with effect for the future (Art. 7(3))
          </li>
        </ul>
        <p>
          One important note on this: since we do not maintain accounts and
          your content stays exclusively on your device, we generally{" "}
          <strong>cannot identify you</strong> and therefore cannot match
          you to any data stored with us (Art. 11 GDPR). You can delete your
          data yourself at any time: in the app under &ldquo;Me&rdquo; →
          &ldquo;Delete all plans&rdquo;, or by uninstalling the app.
        </p>
        <p>
          For inquiries, you can reach us at{" "}
          <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
        </p>
      </LegalSection>

      <LegalSection heading="10. Right to lodge a complaint" id="complaint">
        <p>
          You have the right to lodge a complaint with a data protection
          supervisory authority about the processing of your data (Art. 77
          GDPR). The competent authority is the one for your place of
          residence or for the controller: the Hessian Commissioner for Data
          Protection and Freedom of Information (Der Hessische Beauftragte
          für Datenschutz und Informationsfreiheit).
        </p>
      </LegalSection>

      <LegalSection heading="11. Children" id="children">
        <p>
          Disha is rated for ages 4+ and is intended for adults managing a
          household. We deliberately do not collect any data that would
          allow age to be determined.
        </p>
      </LegalSection>

      <LegalSection heading="12. Changes" id="changes">
        <p>
          We adjust this policy whenever the app or the services we use
          change. The version published on this page always applies; the
          date of the last change is shown at the top of the page.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
