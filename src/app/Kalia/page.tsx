import type { Metadata, Viewport } from "next";
import Link from "next/link";

import { AnimatedWordmark } from "@/components/kalia/AnimatedWordmark";
import { LeafBurst } from "@/components/kalia/LeafBurst";
import { kalia, kaliaLegalLinks } from "@/config/kalia";

/**
 * Startseite der App Kalia — vorerst ein Platzhalter „im Aufbau“.
 *
 * Claim und Unterzeile stammen aus dem Onboarding der App
 * (`onboarding.welcome_goal_title` / `welcome_goal_subtitle`). Kein Formular,
 * keine Newsletter-Anmeldung: die Datenschutzerklärung (Abschnitt 10) sagt
 * zu, dass es auf den Kalia-Seiten kein Kontaktformular gibt.
 */

const TITLE = "Kalia: Eat for your goals";
const DESCRIPTION =
  "Kalia plans your week of meals around your goal. No calorie counting. Our website is under construction.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: kalia.paths.home },
  openGraph: {
    type: "website",
    siteName: kalia.name,
    url: kalia.paths.home,
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a3a2a",
};

export default function KaliaHomePage() {
  return (
    <div className="kalia-landing relative isolate flex min-h-dvh flex-col overflow-hidden bg-accent text-cream">
      <LeafBurst />

      <main
        id="content"
        className="relative flex flex-1 flex-col items-center justify-center px-6 pb-12 pt-20 text-center"
      >
        <AnimatedWordmark className="w-[min(68vw,340px)]" />

        <p
          className="kalia-rise mt-14 inline-flex items-center gap-2.5 rounded-pill border border-cream/15 bg-cream/5 px-4 py-2 text-[14px] font-medium text-cream/85"
          style={{ animationDelay: "2s" }}
        >
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#b8dc4a] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[#b8dc4a]" />
          </span>
          Our website is under construction
        </p>

        <h1
          className="kalia-rise mt-6 text-[clamp(2.25rem,7vw,3.75rem)] font-semibold leading-[1.05]"
          style={{ animationDelay: "2.15s" }}
        >
          Eat for your goals.
        </h1>
        <p
          className="kalia-rise mt-4 max-w-md text-[17px] leading-relaxed text-cream/75"
          style={{ animationDelay: "2.3s" }}
        >
          Your weekly plan, tailored to your goal. No calorie counting.
        </p>
      </main>

      <footer
        className="kalia-rise relative px-6 pb-8 text-[14px]"
        style={{ animationDelay: "2.5s" }}
      >
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {kaliaLegalLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-cream/70 transition-colors hover:text-cream"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${kalia.contactEmail}`}
              className="text-cream/70 transition-colors hover:text-cream"
            >
              {kalia.contactEmail}
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
