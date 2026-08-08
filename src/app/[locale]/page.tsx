import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Showcase } from "@/components/sections/Showcase";
import { getContent } from "@/content";
import { isEnabledLocale } from "@/i18n/locales";
import { faqJsonLd, softwareApplicationJsonLd } from "@/lib/seo";

/**
 * Landingpage.
 *
 * Abschnittsfolge laut Briefing 7.1, mit einem Zusatz: „Privat by Design“ soll
 * eine eigene Section werden statt nur einer Feature-Karte — es ist das
 * stärkste Unterscheidungsmerkmal gegenüber anderen Essensplanern und soll
 * eine eigene Fläche tragen.
 *
 * TODO: `Features` und `Privacy` fehlen noch als Sections (waren in
 * page.tsx importiert, ohne dass die Komponenten je angelegt wurden). Inhalte
 * liegen bereits fertig in `content/de.ts` (`features`, `privacy`), Icons in
 * `components/Icon.tsx` (`featureIcons`) — nur die Komponenten selbst fehlen.
 *
 * Rhythmus der Hintergründe: dunkel (Hero) → cream → weiß → cream →
 * dunkel (Abschluss).
 */
export default async function HomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isEnabledLocale(locale)) return null;
  const t = getContent(locale);

  return (
    <>
      <Hero locale={locale} />
      <HowItWorks locale={locale} />
      <Showcase locale={locale} />
      <Pricing locale={locale} />
      <Faq locale={locale} />
      <FinalCta locale={locale} />

      {/* Strukturierte Daten. Zwei getrennte Blöcke, damit Google FAQ- und
          App-Schema unabhängig voneinander verarbeiten kann. */}
      <script
        type="application/ld+json"
        // Statische, im Code definierte Objekte — kein Nutzer-Input.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(t.faq.items)),
        }}
      />
    </>
  );
}
