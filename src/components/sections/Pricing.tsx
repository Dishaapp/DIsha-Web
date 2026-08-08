import { Container, Eyebrow } from "@/components/Container";
import { Cta } from "@/components/Cta";
import { IconCheck, IconSparkle } from "@/components/Icon";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { getContent } from "@/content";
import { site } from "@/config/site";
import type { EnabledLocale } from "@/i18n/locales";

/**
 * Preise.
 *
 * Zwei Karten, Jahresabo optisch als Empfehlung. Direkt darunter die
 * Hinweiszeile und das Kleingedruckte im Wortlaut der App-Store-Beschreibung
 * (Apple Guideline 3.1.2 verlangt Abo-Länge, Preis pro Periode sowie
 * funktionierende Links zu EULA und Datenschutz).
 *
 * Bewusst NICHT als „kein Abo“ oder „Einmalkauf“ formuliert — das wäre für
 * dieses Produkt falsch.
 */
export function Pricing({ locale }: { locale: EnabledLocale }) {
  const t = getContent(locale);

  return (
    <section
      id="preise"
      className="scroll-mt-24 bg-surface py-section-sm sm:py-section"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow tone="light">{t.pricing.eyebrow}</Eyebrow>
            </div>
          </Reveal>
          <AnimatedHeadline
            lines={[t.pricing.headline]}
            className="mt-6 text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.12] text-accent"
            stagger={55}
          />
          <Reveal delay={140}>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-soft">
              {t.pricing.intro}
            </p>
          </Reveal>
        </div>

        {/* --- Die zwei Abo-Karten ------------------------------------------ */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16">
          {t.pricing.plans.map((plan, i) => (
            <Reveal
              key={plan.id}
              delay={i * 130}
              from="scale"
              // Gestapelt auf dem Handy steht die empfohlene Jahreskarte oben;
              // ab sm gilt wieder die Lesereihenfolge monatlich → jährlich.
              className={
                plan.recommended ? "-order-1 sm:order-none" : undefined
              }
            >
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-card p-8 transition-all duration-500 ${
                  plan.recommended
                    ? "bg-accent text-white shadow-[0_30px_70px_-30px_rgba(26,58,42,0.6)] ring-1 ring-accent"
                    : "border border-hairline/50 bg-white hover:border-accent/30"
                }`}
              >
                {plan.recommended ? (
                  <>
                    {/* Sanfter Schein in der Ecke der empfohlenen Karte */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(169,199,178,0.35),transparent_65%)]"
                    />
                    <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-pill bg-white/15 px-3 py-1.5 text-[12px] font-semibold text-white backdrop-blur">
                      <IconSparkle className="h-3.5 w-3.5" strokeWidth={1.8} />
                      {"badge" in plan ? plan.badge : null}
                    </span>
                  </>
                ) : null}

                <h3
                  className={`relative text-[15px] font-semibold uppercase tracking-[0.14em] ${
                    plan.recommended ? "text-white/70" : "text-ink-soft"
                  }`}
                >
                  {plan.name}
                </h3>

                <div className="relative mt-5 flex items-baseline gap-2">
                  <span
                    className={`font-display text-[clamp(2.6rem,6vw,3.5rem)] font-semibold leading-none tabular-nums ${
                      plan.recommended ? "text-white" : "text-accent"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-[15px] ${
                      plan.recommended ? "text-white/60" : "text-ink-soft"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                <p
                  className={`relative mt-3 text-[15px] ${
                    plan.recommended ? "text-white/70" : "text-ink-soft"
                  }`}
                >
                  {plan.note}
                </p>

                <div className="relative mt-8 pt-2">
                  <Cta
                    href={site.stores.ios}
                    external
                    variant="solid"
                    tone={plan.recommended ? "dark" : "light"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Cta>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* --- Hinweiszeile ------------------------------------------------- */}
        <Reveal delay={120}>
          <p className="mt-8 text-center text-[15px] font-medium text-accent">
            {t.pricing.reassurance}
          </p>
        </Reveal>

        {/* --- Leistungsumfang --------------------------------------------- */}
        <Reveal delay={180}>
          <div className="mt-12 rounded-card bg-cream p-8 sm:p-10">
            <h3 className="text-center text-[18px] font-semibold text-accent">
              {t.pricing.includes.title}
            </h3>
            <ul className="mx-auto mt-7 grid max-w-2xl gap-x-8 gap-y-4 sm:grid-cols-2">
              {t.pricing.includes.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                    <IconCheck className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-[15px] leading-snug text-accent/85">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* --- Kleingedrucktes --------------------------------------------- */}
        <Reveal delay={220}>
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <p className="text-[13px] leading-relaxed text-ink-soft">
              {t.pricing.legal}
            </p>
            <p className="mt-4 text-[13px]">
              <a
                href={site.eulaUrl}
                target="_blank"
                rel="noopener"
                className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
              >
                {t.pricing.eulaLabel}
              </a>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
