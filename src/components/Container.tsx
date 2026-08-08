import type { ReactNode } from "react";

/**
 * Horizontales Maß der Seite.
 *
 * Ein einziger Ort für die Inhaltsbreite und die seitlichen Ränder — damit
 * Hero, Sections, Footer und Rechtsseiten exakt auf derselben Linie sitzen.
 */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "prose";
}) {
  const width =
    size === "wide"
      ? "max-w-[1320px]"
      : size === "prose"
        ? "max-w-[68ch]"
        : "max-w-[1140px]";

  return (
    <div className={`mx-auto w-full ${width} px-6 sm:px-8 ${className ?? ""}`}>
      {children}
    </div>
  );
}

/**
 * Kleine Überzeile über einer Section-Headline.
 * Deep-Green bzw. Mint als einziger Akzent, sonst nur Typografie.
 */
export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em] ${
        tone === "dark" ? "text-mint" : "text-accent"
      }`}
    >
      <span
        aria-hidden
        className={`h-1 w-1 rounded-full ${
          tone === "dark" ? "bg-mint" : "bg-accent"
        }`}
      />
      {children}
    </span>
  );
}
