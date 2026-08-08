import Image from "next/image";

import { Container } from "@/components/Container";
import { StoreBadges } from "@/components/StoreBadges";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { Wordmark } from "@/components/Wordmark";
import { getContent } from "@/content";
import type { EnabledLocale } from "@/i18n/locales";

/**
 * Abschluss-CTA.
 *
 * Wiederholt das Hero-Versprechen und beendet die Seite auf derselben dunklen
 * Fläche, auf der sie begonnen hat. Das Hero-Foto (`assets/images/week-hero.png`
 * aus der App) liegt großflächig dahinter und wird nach unten ausgeblendet.
 */
export function FinalCta({ locale }: { locale: EnabledLocale }) {
  const t = getContent(locale);

  return (
    <section className="grain relative overflow-hidden bg-night pb-section-sm pt-section-sm sm:pb-section sm:pt-section">
      {/* Foto-Hintergrund */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/brand/hero-bowl.png"
          alt=""
          fill
          sizes="100vw"
          className="scale-125 object-cover object-center opacity-[0.16] blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/70 to-night" />
        <div className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 animate-halo rounded-full bg-[radial-gradient(circle,rgba(46,94,74,0.4),transparent_62%)] blur-2xl" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="flex justify-center">
              <Wordmark width={124} variant="white" />
            </div>
          </Reveal>

          <AnimatedHeadline
            lines={[t.finalCta.headline]}
            className="mt-9 text-[clamp(2.1rem,5.4vw,3.6rem)] font-semibold leading-[1.1] text-white"
            stagger={70}
          />

          <Reveal delay={160}>
            <p className="mt-6 text-[18px] leading-relaxed text-white/65">
              {t.finalCta.body}
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-10 flex justify-center">
              <StoreBadges
                locale={locale}
                variant="dark"
                className="justify-center"
              />
            </div>
          </Reveal>

          <Reveal delay={380}>
            <p className="mt-6 text-[14px] text-white/60">
              {t.finalCta.reassurance}
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
