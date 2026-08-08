import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/Container";
import { getContent } from "@/content";
import { htmlLang, pathFor, type EnabledLocale } from "@/i18n/locales";

/**
 * Rahmen für die drei Rechtsseiten.
 *
 * Hell, ruhig, gut lesbar (Zeilenlänge auf ~68 Zeichen begrenzt) — hier soll
 * nichts animiert oder beworben werden. Der dunkle Kopfbereich hält die
 * Verbindung zur Landingpage, ohne dass der fixierte Header über Text liegt.
 */
export function LegalPage({
  locale,
  title,
  intro,
  lastUpdated,
  children,
}: {
  locale: EnabledLocale;
  title: string;
  intro?: string;
  /** ISO-Datum, z. B. „2026-08-04“. */
  lastUpdated: string;
  children: ReactNode;
}) {
  const t = getContent(locale);
  const formatted = new Date(lastUpdated).toLocaleDateString(htmlLang[locale], {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="bg-white">
      <header className="bg-night pb-16 pt-36 sm:pb-20 sm:pt-44">
        <Container size="prose">
          <Link
            href={pathFor(locale)}
            className="text-[14px] text-mint underline decoration-mint/30 underline-offset-4 transition-colors hover:decoration-mint"
          >
            ← {t.legalCommon.backToHome}
          </Link>
          <h1 className="mt-6 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.1] text-white">
            {title}
          </h1>
          {intro ? (
            <p className="mt-5 text-[17px] leading-relaxed text-white/60">
              {intro}
            </p>
          ) : null}
          <p className="mt-6 text-[14px] text-white/55">
            {t.legalCommon.lastUpdated}: {formatted}
          </p>
        </Container>
      </header>

      <Container size="prose" className="py-16 sm:py-20">
        <div className="legal-prose">{children}</div>
      </Container>
    </article>
  );
}

/** Ein Abschnitt mit Überschrift. */
export function LegalSection({
  heading,
  id,
  children,
}: {
  heading: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-28 first:mt-0">
      <h2 className="text-[22px] font-semibold leading-snug text-accent sm:text-[24px]">
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}

/** Unterabschnitt innerhalb eines Abschnitts. */
export function LegalSubsection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-7">
      <h3 className="text-[17px] font-semibold text-accent">{heading}</h3>
      <div className="mt-2.5 space-y-3">{children}</div>
    </div>
  );
}

/**
 * Auffällig markierter Platzhalter.
 *
 * Bewusst laut und im Fließtext sichtbar — laut Briefing dürfen rechtliche
 * Pflichtangaben nicht erfunden und offene Punkte nicht stillschweigend mit
 * Platzhaltern „gelöst“ werden. Wer die Seite ansieht, muss sofort erkennen,
 * dass hier noch etwas fehlt.
 */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <span className="mx-0.5 inline-block rounded bg-[#FFE9C7] px-2 py-0.5 font-mono text-[13px] font-semibold text-[#7A4B00] ring-1 ring-[#E9B984]">
      TODO: {children}
    </span>
  );
}

/** Hinweiskasten für den Rechtsprüfungs-Vorbehalt. */
export function ReviewNotice({
  locale,
  children,
}: {
  locale: EnabledLocale;
  children: ReactNode;
}) {
  const t = getContent(locale);
  return (
    <aside className="mb-12 rounded-card border-l-4 border-[#E9B984] bg-[#FFF8EC] p-6">
      <h2 className="text-[15px] font-semibold uppercase tracking-[0.1em] text-[#7A4B00]">
        {t.legalCommon.todoHeading}
      </h2>
      <div className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-[#5C3A00]">
        {children}
      </div>
    </aside>
  );
}

/** Definitionsliste für Impressum-Pflichtangaben. */
export function LegalList({
  items,
}: {
  items: readonly { term: string; value: ReactNode }[];
}) {
  return (
    <dl className="mt-4 divide-y divide-hairline/40 rounded-card border border-hairline/40">
      {items.map((item) => (
        <div
          key={item.term}
          className="grid gap-1 px-5 py-4 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-4"
        >
          <dt className="text-[15px] font-semibold text-accent">{item.term}</dt>
          <dd className="text-[16px] text-ink-soft">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
