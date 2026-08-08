import Link from "next/link";

import { Container } from "@/components/Container";
import { StoreBadges } from "@/components/StoreBadges";
import { Wordmark } from "@/components/Wordmark";
import { getContent } from "@/content";
import { site } from "@/config/site";
import { pathFor, type EnabledLocale } from "@/i18n/locales";

/**
 * Fußzeile mit Rechtslinks, Kontakt und Marken-Hinweis.
 *
 * Das Jahr kommt aus `new Date()` — der Wert wird beim Build eingefroren.
 * Bei einer statischen Seite ist das gewollt: ein Rebuild pro Jahr genügt und
 * es entsteht kein Hydration-Mismatch zwischen Server und Client.
 */
export function SiteFooter({ locale }: { locale: EnabledLocale }) {
  const t = getContent(locale);
  const year = new Date().getFullYear();

  const legalLabels =
    locale === "de"
      ? { privacy: "Datenschutz", imprint: "Impressum", terms: "AGB" }
      : { privacy: "Privacy Policy", imprint: "Legal Notice", terms: "Terms" };

  const legalLinks = [
    { href: pathFor(locale, "privacy"), label: legalLabels.privacy },
    { href: pathFor(locale, "imprint"), label: legalLabels.imprint },
    { href: pathFor(locale, "terms"), label: legalLabels.terms },
  ];

  const home = pathFor(locale);
  const productLinks = [
    { href: `${home}#so-funktionierts`, label: t.nav.howItWorks },
    { href: `${home}#funktionen`, label: t.nav.features },
    { href: `${home}#preise`, label: t.nav.pricing },
    { href: `${home}#fragen`, label: t.nav.faq },
  ];

  return (
    <footer className="border-t border-white/10 bg-night pb-10 pt-16">
      <Container size="wide">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          <div>
            <Wordmark width={100} variant="white" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/55">
              {t.footer.tagline}
            </p>
            <div className="mt-8">
              <StoreBadges variant="dark" locale={locale} />
            </div>
          </div>

          <nav aria-label={t.footer.productHeading}>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-white/55">
              {t.footer.productHeading}
            </h2>
            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[15px] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-white/55">
              {t.footer.legalHeading}
            </h2>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-[13px] font-semibold uppercase tracking-[0.16em] text-white/55">
              {t.footer.contactHeading}
            </h2>
            <p className="mt-4 text-[15px] text-white/55">
              {t.footer.contactLabel}
            </p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-1 inline-block text-[15px] text-mint underline decoration-mint/30 underline-offset-4 transition-colors hover:decoration-mint"
            >
              {site.contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-[13px] text-white/55">
            {t.footer.copyright(year)}
          </p>
          <p className="mt-2 max-w-3xl text-[12px] leading-relaxed text-white/55">
            {t.footer.appleDisclaimer}
          </p>
        </div>
      </Container>
    </footer>
  );
}
