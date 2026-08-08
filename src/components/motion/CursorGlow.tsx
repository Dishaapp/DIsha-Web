"use client";

import { useEffect, useRef } from "react";

/**
 * Weicher Deep-Green-Schein, der dem Zeiger folgt.
 *
 * Läuft nur auf Geräten mit echtem Zeiger (`hover: hover`) und nicht bei
 * `prefers-reduced-motion`. Die Position wird über eine CSS-Variable gesetzt
 * und in einem `requestAnimationFrame` gebündelt, damit `pointermove` kein
 * Layout auslöst. Rein dekorativ, deshalb `aria-hidden`.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reducedMotion.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      el.style.setProperty("--glow-x", `${x}px`);
      el.style.setProperty("--glow-y", `${y}px`);
      el.style.opacity = "1";
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    const parent = el.parentElement ?? window;
    parent.addEventListener("pointermove", onMove as EventListener);
    parent.addEventListener("pointerleave", onLeave);

    return () => {
      parent.removeEventListener("pointermove", onMove as EventListener);
      parent.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(420px circle at var(--glow-x, 50%) var(--glow-y, 40%), rgba(46, 94, 74, 0.28), transparent 70%)",
      }}
    />
  );
}
