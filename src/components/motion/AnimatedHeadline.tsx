"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type AnimatedHeadlineProps = {
  /** Eine Zeile pro Eintrag. Jede Zeile läuft wortweise ein. */
  lines: readonly string[];
  as?: "h1" | "h2";
  className?: string;
  /**
   * Klassen pro Zeile — z. B. um die Schluss-Zeile abzusetzen. Ein Array statt
   * einer Funktion, weil Funktionen nicht von einer Server- in eine
   * Client-Komponente übergeben werden dürfen. Kürzer als `lines` ist erlaubt;
   * fehlende Einträge fallen auf `block` zurück.
   */
  lineClassNames?: readonly string[];
  /** Verzögerung, bevor das erste Wort startet. */
  startDelay?: number;
  /** Abstand zwischen zwei Wörtern. */
  stagger?: number;
  /** Sofort starten statt auf den Viewport zu warten (für den Hero). */
  immediate?: boolean;
};

/**
 * Headline, die Wort für Wort einläuft.
 *
 * Wichtig für SEO und Screenreader: der vollständige Text steht als
 * zusammenhängender Satz im HTML — die Wörter sind reine `<span>`-Hüllen, die
 * Leerzeichen dazwischen sind echte Textknoten, kein Buchstaben-Splitting.
 * Bei `prefers-reduced-motion` sowie ohne JavaScript ist alles sofort sichtbar.
 */
export function AnimatedHeadline({
  lines,
  as = "h2",
  className,
  lineClassNames,
  startDelay = 120,
  stagger = 70,
  immediate = false,
}: AnimatedHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (immediate) {
      // Ein Frame warten, damit der Übergang tatsächlich animiert.
      const id = requestAnimationFrame(() => setActive(true));
      return () => cancelAnimationFrame(id);
    }

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  /**
   * Verzögerungen vorab berechnen, damit beim Rendern nichts mutiert werden
   * muss: `wordDelays[zeile][wort]`. Der Zähler läuft über alle Zeilen hinweg
   * weiter, damit die Staffelung nicht bei jeder Zeile neu beginnt.
   */
  const wordDelays: number[][] = [];
  let counter = 0;
  for (const line of lines) {
    const row: number[] = [];
    for (let i = 0; i < line.split(" ").length; i++) {
      row.push(startDelay + counter * stagger);
      counter += 1;
    }
    wordDelays.push(row);
  }

  const content = lines.map((line, lineIdx) => {
    const words = line.split(" ");
    return (
      <span key={lineIdx} className={lineClassNames?.[lineIdx] ?? "block"}>
        {words.map((word, i) => (
          <span key={i}>
            <span
              className="word"
              data-revealed={active ? "true" : undefined}
              style={
                {
                  "--word-delay": `${wordDelays[lineIdx][i]}ms`,
                } as CSSProperties
              }
            >
              {word}
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    );
  });

  if (as === "h1") {
    return (
      <h1 ref={ref} className={className}>
        {content}
      </h1>
    );
  }

  return (
    <h2 ref={ref} className={className}>
      {content}
    </h2>
  );
}
