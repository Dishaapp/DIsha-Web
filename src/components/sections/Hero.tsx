import Image from "next/image";

import { Container } from "@/components/Container";
import { StoreBadges } from "@/components/StoreBadges";
import { PhoneFrame, PhoneScreen } from "@/components/app-ui/PhoneFrame";
import { PlanScreen } from "@/components/app-ui/screens";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { FoodMarquee } from "@/components/motion/FoodMarquee";
import { Reveal } from "@/components/motion/Reveal";
import { getContent } from "@/content";
import { site } from "@/config/site";
import { marqueeRowOne, marqueeRowTwo } from "@/content/food";
import type { EnabledLocale } from "@/i18n/locales";

/**
 * Hero.
 *
 * Aufbau in Ebenen, von hinten nach vorn:
 *   1. Deep-Green-Verläufe auf Nachtschwarz
 *   2. Zeiger-Schein (CursorGlow), nur mit Maus
 *   3. Textspalte mit wortweise einlaufender Headline
 *   4. Gerät mit dem echten Wochenplan-Screen
 *   5. Zwei gegenläufige Food-Bänder als Abschluss
 */
export function Hero({ locale }: { locale: EnabledLocale }) {
  const t = getContent(locale);

  return (
    <section className="relative overflow-hidden bg-cream pt-32 sm:pt-36 lg:pt-44">

      <CursorGlow />

      <Container size="wide" className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* --- Textspalte ------------------------------------------------ */}
          <div className="text-center lg:text-left">
            <AnimatedHeadline
              as="h1"
              immediate
              lines={t.hero.headline}
              startDelay={220}
              stagger={80}
              className="text-[clamp(2.6rem,7.2vw,4.9rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
              // Die Schluss-Zeile („In Sekunden.“) setzt sich in Mint ab.
              lineClassNames={[
                "block text-accent",
                "block text-accent",
                "block text-accent/60",
              ]}
            />

            <Reveal delay={620}>
              <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-ink-soft sm:text-[19px] lg:mx-0">
                {t.hero.subline}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                <StoreBadges
                  locale={locale}
                  variant="light"
                  className="justify-center"
                  priority
                />
              </div>
            </Reveal>

            <Reveal delay={840}>
              <p className="mt-5 text-[14px] text-ink-soft">
                {t.hero.reassurance}
              </p>
            </Reveal>


          </div>

          {/* --- Gerätespalte --------------------------------------------- */}
          <Reveal from="scale" delay={300} className="relative">
            <div className="relative mx-auto w-[266px] sm:w-[310px] lg:w-[344px]">
              {/* Halo */}
              <div
                aria-hidden
                className="absolute -inset-14 -z-10 animate-halo rounded-full bg-accent-soft/30 blur-3xl"
              />

              {/* Frei schwebendes Gerichtsfoto hinter dem Gerät, links oben */}
              <div
                aria-hidden
                className="absolute -left-8 -top-3 -z-10 hidden h-32 w-32 animate-float-slow overflow-hidden rounded-card opacity-90 shadow-2xl sm:block"
              >
                <Image
                  src="/food/shakshuka.webp"
                  alt=""
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>

              {/* … und rechts unten */}
              <div
                aria-hidden
                className="absolute -bottom-4 -right-16 -z-10 hidden h-36 w-36 animate-float overflow-hidden rounded-card opacity-90 shadow-2xl sm:block"
              >
                <Image
                  src="/food/pesto-pasta.webp"
                  alt=""
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>

              <div className="animate-float-slow">
                <PhoneFrame label={t.hero.phoneLabel}>
                  <PhoneScreen>
                    <PlanScreen locale={locale} />
                  </PhoneScreen>
                </PhoneFrame>
              </div>

              {/* Schwebender Budget-Chip als Beweis für das Kernversprechen.
                  Sitzt tief genug, um über der Tab-Leiste zu liegen statt über
                  dem Gerichtsfoto, und steht vollständig neben dem Rahmen. */}
              <div className="absolute -left-20 bottom-10 hidden w-[136px] animate-float rounded-card border border-accent/10 bg-white/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:block">
                <div className="text-[11px] uppercase tracking-[0.12em] text-ink-soft">
                  {t.hero.budgetChip.label}
                </div>
                <div className="mt-0.5 font-display text-xl font-semibold tabular-nums text-accent">
                  {t.hero.budgetChip.amount}
                </div>
                <div className="mt-2 h-1 w-28 overflow-hidden rounded-pill bg-accent/15">
                  <div className="h-full w-[85%] rounded-pill bg-accent" />
                </div>
                <div className="mt-1.5 text-[11px] text-accent-soft">
                  {t.hero.budgetChip.remaining}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* --- Food-Bänder --------------------------------------------------- */}
      <div className="relative z-10 mt-20 pb-20 sm:mt-28">
        <Container size="wide">
          <p className="mb-6 text-center text-[13px] uppercase tracking-[0.16em] text-ink-soft">
            {t.hero.marqueeLabel}
          </p>
        </Container>
        <div className="space-y-4">
          <FoodMarquee images={marqueeRowOne(locale)} durationSeconds={78} />
          <FoodMarquee
            images={marqueeRowTwo(locale)}
            durationSeconds={92}
            reverse
          />
        </div>
      </div>


      {/* Verweis auf die Stores für Assistive Tech, falls Badges als Bild fehlen */}
      <span className="sr-only">
        {t.hero.storesAvailability(site.stores.ios, site.stores.android)}
      </span>
    </section>
  );
}
