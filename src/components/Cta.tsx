import type { ReactNode } from "react";

import { IconArrowRight } from "@/components/Icon";

type CtaProps = {
  href: string;
  children: ReactNode;
  /** `solid` = gefüllt, `ghost` = nur Kontur. */
  variant?: "solid" | "ghost";
  /** Farbwelt der Umgebung. */
  tone?: "dark" | "light";
  /** Externe Ziele (App Store, Play Store) bekommen target/rel. */
  external?: boolean;
  className?: string;
  withArrow?: boolean;
};

/**
 * Primäre Handlungsschaltfläche.
 *
 * Der Hover-Effekt ist ein wandernder Lichtschimmer statt eines Farbwechsels —
 * die Fläche bleibt Deep-Green, es kommt kein zweiter Akzent ins Spiel.
 */
export function Cta({
  href,
  children,
  variant = "solid",
  tone = "dark",
  external = false,
  className,
  withArrow = false,
}: CtaProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-pill px-7 py-4 text-[16px] font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0";

  const skin =
    variant === "solid"
      ? tone === "dark"
        ? "bg-white text-accent shadow-[0_10px_40px_-12px_rgba(255,255,255,0.45)] hover:shadow-[0_16px_50px_-12px_rgba(255,255,255,0.6)]"
        : "bg-accent text-white shadow-[0_10px_40px_-12px_rgba(26,58,42,0.6)] hover:shadow-[0_16px_50px_-12px_rgba(26,58,42,0.75)]"
      : tone === "dark"
        ? "border border-white/25 text-white hover:border-white/50 hover:bg-white/5"
        : "border border-accent/25 text-accent hover:border-accent/50 hover:bg-accent/5";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={`${base} ${skin} ${className ?? ""}`}
    >
      {/* Lichtschimmer, der beim Hover einmal durchläuft */}
      {variant === "solid" ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      ) : null}
      <span className="relative">{children}</span>
      {withArrow ? (
        <IconArrowRight
          className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2.2}
        />
      ) : null}
    </a>
  );
}
