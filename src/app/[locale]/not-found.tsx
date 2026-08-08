import Link from "next/link";

import { Container } from "@/components/Container";
import { Cta } from "@/components/Cta";
import { pathFor } from "@/i18n/locales";

/**
 * 404 innerhalb einer Locale.
 *
 * Bleibt auf der dunklen Fläche und bietet die drei Wege an, die ein Besucher
 * hier wahrscheinlich sucht — die Startseite, den Datenschutz (der Link steht
 * im App Store) und den direkten Download.
 */
export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80vh] items-center overflow-hidden bg-night py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(46,94,74,0.35),transparent_62%)] blur-2xl"
      />
      <Container className="relative z-10">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-[clamp(4rem,14vw,7rem)] font-semibold leading-none text-white/12">
            404
          </p>
          <h1 className="mt-2 text-[clamp(1.8rem,4.5vw,2.6rem)] font-semibold text-white">
            Diese Seite haben wir nicht im Plan.
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/60">
            Die Adresse gibt es nicht oder nicht mehr. Von der Startseite aus
            findest du alles Weitere.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Cta href="/de" tone="dark" withArrow>
              Zur Startseite
            </Cta>
            <Link
              href={pathFor("de", "privacy")}
              className="text-[15px] text-mint underline decoration-mint/30 underline-offset-4 transition-colors hover:decoration-mint"
            >
              Datenschutzerklärung
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
