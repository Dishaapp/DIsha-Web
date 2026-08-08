"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type Direction = "up" | "scale" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  /** Startversatz. `up` ist der Standard. */
  from?: Direction;
  /** Verzögerung in ms — für gestaffelte Gruppen. */
  delay?: number;
  className?: string;
};

/**
 * Gibt seinen Inhalt frei, sobald er ins Bild scrollt.
 *
 * Der eigentliche Übergang steckt in globals.css (`[data-reveal]`) — hier wird
 * nur `data-revealed` gesetzt. So ist der Startzustand schon im vorgerenderten
 * HTML korrekt und es gibt kein Aufblitzen vor der Hydration. Ohne JavaScript
 * greift das `<noscript>`-Override im Root-Layout.
 *
 * Der Observer trennt sich nach dem ersten Auslösen: Inhalte verschwinden beim
 * Zurückscrollen nicht wieder.
 *
 * Rendert immer ein `<div>`. Für Listeneinträge gehört Reveal INNERHALB des
 * `<li>`, damit die Listenstruktur unangetastet bleibt.
 */
export function Reveal({
  children,
  from = "up",
  delay = 0,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Ohne IntersectionObserver (oder bei reduzierter Bewegung) sofort zeigen.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.dataset.revealed = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        }
      },
      // Auslösen, sobald auch nur 1 Pixel sichtbar ist (sicherer auf Mobile).
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={from === "up" ? "" : from}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
          : undefined
      }
      className={className}
    >
      {children}
    </div>
  );
}
