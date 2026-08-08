import Image from "next/image";

type WordmarkProps = {
  /** Breite in px. Höhe folgt dem Seitenverhältnis 1593 × 581. */
  width?: number;
  /** Auf dunklem Grund wird die Wortmarke weiß invertiert. */
  variant?: "green" | "white";
  className?: string;
  priority?: boolean;
};

const RATIO = 581 / 1593;

/**
 * Disha-Wortmarke aus `assets/images/logo-wordmark.png` der App.
 *
 * Die Datei ist ein einfarbiges Deep-Green-PNG. Für die Verwendung auf dunklem
 * Grund wird sie per CSS-Filter auf Weiß gezogen, statt eine zweite Bilddatei
 * zu pflegen — so bleibt es bei einem Asset und einer Quelle der Wahrheit.
 */
export function Wordmark({
  width = 104,
  variant = "green",
  className,
  priority = false,
}: WordmarkProps) {
  const height = Math.round(width * RATIO);
  return (
    <Image
      src="/brand/logo-wordmark.png"
      alt="Disha"
      width={width}
      height={height}
      priority={priority}
      className={className}
      style={{
        width,
        height,
        ...(variant === "white" ? { filter: "brightness(0) invert(1)" } : {}),
      }}
    />
  );
}
