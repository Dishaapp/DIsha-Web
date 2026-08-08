"use client";

import { useId, useState } from "react";

import { Container, Eyebrow } from "@/components/Container";
import { IconPlus } from "@/components/Icon";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { getContent } from "@/content";
import type { EnabledLocale } from "@/i18n/locales";

/**
 * FAQ-Akkordeon.
 *
 * Fragen abgeleitet aus den Reviewer-Notes und der Beschreibung im ASO-Doc.
 *
 * Umsetzung als Button/Region-Paar statt `<details>`: nur so lässt sich die
 * Höhe in allen Browsern weich animieren (die Grid-`0fr → 1fr`-Technik
 * funktioniert bei `<details>` nicht, weil der Inhalt im geschlossenen Zustand
 * `display: none` hat). ARIA-seitig sind beide Varianten gleichwertig:
 * `aria-expanded` am Button, `role="region"` mit `aria-labelledby` am Inhalt.
 *
 * Mehrere Antworten dürfen gleichzeitig offen sein — beim Vergleichen von
 * Abo-Fragen ist das angenehmer als ein Exklusiv-Akkordeon.
 */
export function Faq({ locale }: { locale: EnabledLocale }) {
  const t = getContent(locale);
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <section
      id="fragen"
      className="scroll-mt-24 bg-cream py-section-sm sm:py-section"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="flex justify-center">
              <Eyebrow tone="light">{t.faq.eyebrow}</Eyebrow>
            </div>
          </Reveal>
          <AnimatedHeadline
            lines={[t.faq.headline]}
            className="mt-6 text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.12] text-accent"
            stagger={55}
          />
        </div>

        <ul className="mx-auto mt-14 max-w-3xl space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = open.has(i);
            const buttonId = `${baseId}-q-${i}`;
            const panelId = `${baseId}-a-${i}`;

            return (
              <li key={item.q}>
                <Reveal delay={Math.min(i, 5) * 70}>
                  <div
                    className={`overflow-hidden rounded-card border bg-white transition-colors duration-300 ${
                      isOpen ? "border-accent/30" : "border-hairline/45"
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggle(i)}
                        className="flex w-full items-start justify-between gap-5 px-6 py-5 text-left transition-colors duration-300 hover:bg-cream/60 sm:px-7"
                      >
                        <span className="font-display text-[17px] font-semibold leading-snug text-accent sm:text-[18px]">
                          {item.q}
                        </span>
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                            isOpen
                              ? "rotate-45 bg-accent text-white"
                              : "bg-accent/[0.08] text-accent"
                          }`}
                        >
                          <IconPlus className="h-4 w-4" strokeWidth={2.4} />
                        </span>
                      </button>
                    </h3>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-soft)]"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 pr-14 text-[16px] leading-relaxed text-ink-soft sm:px-7 sm:pr-16">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
