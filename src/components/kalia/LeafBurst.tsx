import type { CSSProperties } from "react";

import { LEAF_PATH, LEAF_VIEW_BOX } from "@/components/kalia/AnimatedWordmark";

/**
 * Blätter und Punkte, die beim Laden aus der Mitte aufplatzen und dann
 * schweben — die Web-Fassung des Symbolrings aus der Start-Animation der App.
 *
 * `x`/`y` liegen in [-1, 1] und werden in `kalia.css` auf die Fläche
 * gestreckt. Die Mitte bleibt frei, dort stehen Wortmarke und Text.
 */

type Bit = {
  x: number;
  y: number;
  /** Größe in px. */
  size: number;
  rotate: number;
  opacity: number;
  /** Dauer einer Schwebe-Runde in s. */
  float: number;
  leaf?: boolean;
};

const BITS: readonly Bit[] = [
  { x: -0.92, y: -0.78, size: 34, rotate: -20, opacity: 0.5, float: 7, leaf: true },
  { x: -0.55, y: -0.96, size: 10, rotate: 0, opacity: 0.55, float: 6 },
  { x: 0.08, y: -1, size: 26, rotate: 30, opacity: 0.4, float: 8, leaf: true },
  { x: 0.62, y: -0.9, size: 8, rotate: 0, opacity: 0.6, float: 5 },
  { x: 0.95, y: -0.55, size: 40, rotate: 140, opacity: 0.45, float: 9, leaf: true },
  { x: 1, y: 0.1, size: 9, rotate: 0, opacity: 0.5, float: 6.5 },
  { x: 0.88, y: 0.74, size: 30, rotate: 200, opacity: 0.45, float: 7.5, leaf: true },
  { x: 0.4, y: 0.98, size: 10, rotate: 0, opacity: 0.5, float: 5.5 },
  { x: -0.22, y: 1, size: 34, rotate: -150, opacity: 0.4, float: 8.5, leaf: true },
  { x: -0.78, y: 0.86, size: 8, rotate: 0, opacity: 0.55, float: 6 },
  { x: -1, y: 0.25, size: 38, rotate: 80, opacity: 0.45, float: 9.5, leaf: true },
  { x: -0.96, y: -0.25, size: 7, rotate: 0, opacity: 0.5, float: 5 },
];

export function LeafBurst() {
  return (
    <div aria-hidden className="kalia-burst pointer-events-none absolute inset-0 overflow-hidden">
      {BITS.map((bit, i) => (
        <span
          key={i}
          className="kalia-bit"
          style={
            {
              "--x": bit.x,
              "--y": bit.y,
              "--size": `${bit.size}px`,
              "--rotate": `${bit.rotate}deg`,
              "--opacity": bit.opacity,
              animationDelay: `${0.45 + i * 0.03}s`,
            } as CSSProperties
          }
        >
          <span style={{ animationDuration: `${bit.float}s` }}>
            {bit.leaf ? (
              <svg viewBox={LEAF_VIEW_BOX} className="size-full">
                <path d={LEAF_PATH} fill="currentColor" />
              </svg>
            ) : (
              <span className="block size-full rounded-full bg-current" />
            )}
          </span>
        </span>
      ))}
    </div>
  );
}
