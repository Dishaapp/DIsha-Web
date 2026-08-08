import { Container, Eyebrow } from "@/components/Container";
import { PhoneFrame, PhoneScreen } from "@/components/app-ui/PhoneFrame";
import { StoreScreen } from "@/components/app-ui/screens";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { getContent } from "@/content";
import type { EnabledLocale } from "@/i18n/locales";

/**
 * „So funktioniert's“ — drei Schritte, links das Onboarding auf dem Gerät.
 *
 * Erste helle Section nach dem Hero: Cream-Hintergrund wie in der App
 * (`Colors.light.welcomeBackground`), Deep-Green als einziger Akzent.
 */
export function HowItWorks({ locale }: { locale: EnabledLocale }) {
  const t = getContent(locale);

  return (
    <section
      id="so-funktionierts"
      className="scroll-mt-24 bg-cream py-section-sm sm:py-section"
    >
      <Container size="wide">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow tone="light">{t.howItWorks.eyebrow}</Eyebrow>
          </Reveal>
          <AnimatedHeadline
            lines={[t.howItWorks.headline]}
            className="mt-6 text-[clamp(2rem,4.6vw,3.3rem)] font-semibold leading-[1.1] text-accent"
            stagger={55}
          />
          <Reveal delay={140}>
            <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-ink-soft">
              {t.howItWorks.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-center gap-14 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Gerät mit dem Onboarding-Schritt „Supermarkt“ */}
          <Reveal from="left" className="order-2 lg:order-1">
            <div className="relative mx-auto w-[248px] sm:w-[286px]">
              <div
                aria-hidden
                className="absolute -inset-10 -z-10 rounded-full bg-accent/10 blur-3xl"
              />
              <div className="animate-float-slow">
                <PhoneFrame label={t.howItWorks.phoneLabel}>
                  <PhoneScreen>
                    <StoreScreen locale={locale} />
                  </PhoneScreen>
                </PhoneFrame>
              </div>
            </div>
          </Reveal>

          {/* Die drei Schritte */}
          <ol className="order-1 space-y-2 lg:order-2">
            {t.howItWorks.steps.map((step, i) => (
              <li key={step.n}>
                <Reveal delay={i * 130} from="right">
                  <div className="group relative rounded-card border border-accent/10 bg-white/70 p-7 transition-all duration-500 hover:border-accent/25 hover:bg-white sm:p-8">
                    <div className="flex items-start gap-5">
                      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent font-display text-[15px] font-semibold tabular-nums text-white">
                        {step.n}
                      </span>
                      <div>
                        <h3 className="text-[20px] font-semibold leading-snug text-accent">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
                          {step.body}
                        </p>
                      </div>
                    </div>

                    {/* Verbindungslinie zum nächsten Schritt */}
                    {i < t.howItWorks.steps.length - 1 ? (
                      <span
                        aria-hidden
                        className="absolute -bottom-2 left-[calc(1.75rem+1.375rem)] h-4 w-px bg-accent/20 sm:left-[calc(2rem+1.375rem)]"
                      />
                    ) : null}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
