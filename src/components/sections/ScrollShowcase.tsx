"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { IconCheck } from "@/components/Icon";
import { PhoneFrame, PhoneScreen } from "@/components/app-ui/PhoneFrame";

type Scene = {
  label: string;
  title: string;
  body: string;
  highlights: readonly string[];
  /**
   * aria-label für das pro Szene wiederholte Gerät (Mobil) — bereits fertig
   * formatierter String statt einer Funktion: Funktionen aus dem
   * Content-Objekt lassen sich nicht als Prop an diese Client-Komponente
   * durchreichen.
   */
  phoneLabel: string;
};

type ScrollShowcaseProps = {
  scenes: readonly Scene[];
  /**
   * Die fertig gerenderten App-Screens — als Server-Komponenten von der Seite
   * hereingegeben, damit ihr Markup nicht im Client-Bundle landet.
   */
  screens: ReactNode[];
  /** aria-label für das sticky Gerät (Desktop). */
  phoneLabel: string;
};

/**
 * Sticky-Sequenz: das Gerät bleibt stehen, während der Text daneben scrollt.
 * Beim Wechsel des Textblocks blendet der Screen im Rahmen weich um.
 *
 * Ab `lg` sticky-zweispaltig; darunter gestapelt mit je einem eigenen Gerät,
 * weil ein sticky Element auf einem kleinen Display den halben Viewport
 * blockieren würde. Die Umschaltung läuft über einen IntersectionObserver mit
 * einer schmalen Zone in der Viewport-Mitte — dadurch schaltet es genau dann,
 * wenn der Textblock tatsächlich gelesen wird.
 */
export function ScrollShowcase({
  scenes,
  screens,
  phoneLabel,
}: ScrollShowcaseProps) {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number(
            (entry.target as HTMLElement).dataset.sceneIndex ?? 0,
          );
          setActive(index);
        }
      },
      // Schmales Band in der Viewport-Mitte
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const el of blockRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
      {/* --- Gerät: ab lg sticky, mobil pro Szene wiederholt ---------------
          Der Sticky-Block ist genau einen Viewport hoch und zentriert das
          Gerät darin. Weil die Textblöcke ebenfalls in ihrer Box zentriert
          sind, liegen beide auf derselben Höhe — sonst würde das Gerät beim
          Eintritt in die Section oben kleben und der Text daneben tief sitzen.

          Die Größe wird über die HÖHE gesetzt, nicht über die Breite: so passt
          das Gerät auch auf ein 700px hohes Laptop-Display, ohne oben oder
          unten abgeschnitten zu werden. Die Breite ergibt sich aus dem
          Seitenverhältnis. */}
      <div className="hidden lg:block">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center">
          <div
            className="relative h-[min(70vh,640px)]"
            style={{ aspectRatio: "393 / 852" }}
          >
            {/* Halo hinter dem Gerät */}
            <div
              aria-hidden
              className="absolute -inset-16 -z-10 animate-halo rounded-full bg-accent-soft/25 blur-3xl"
            />
            <PhoneFrame label={phoneLabel}>
              {screens.map((screen, i) => (
                <div
                  key={i}
                  aria-hidden={i !== active}
                  className="absolute inset-0 transition-all duration-700 ease-[var(--ease-out-soft)]"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform:
                      i === active
                        ? "scale(1) translateY(0)"
                        : "scale(0.97) translateY(14px)",
                    pointerEvents: "none",
                  }}
                >
                  <PhoneScreen>{screen}</PhoneScreen>
                </div>
              ))}
            </PhoneFrame>
          </div>

          {/* Fortschritts-Punkte */}
          <div className="mt-7 flex justify-center gap-2">
            {scenes.map((scene, i) => (
              <span
                key={scene.label}
                className={`h-1.5 rounded-pill transition-all duration-500 ${
                  i === active ? "w-8 bg-mint" : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* --- Textblöcke ---------------------------------------------------- */}
      <div>
        {scenes.map((scene, i) => (
          <div
            key={scene.label}
            ref={(el) => {
              blockRefs.current[i] = el;
            }}
            data-scene-index={i}
            className="flex flex-col justify-center py-16 lg:min-h-screen lg:py-24"
          >
            <span className="text-[13px] font-semibold uppercase tracking-[0.16em] text-mint">
              {scene.label}
            </span>
            <h3 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              {scene.title}
            </h3>
            <p className="mt-5 max-w-xl text-white/65">{scene.body}</p>

            <ul className="mt-8 space-y-3">
              {scene.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft/25 text-mint">
                    <IconCheck className="h-3.5 w-3.5" strokeWidth={2.6} />
                  </span>
                  <span className="text-[15px] text-white/80">{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Mobil: Gerät direkt unter dem zugehörigen Text */}
            <div className="mt-10 flex justify-center lg:hidden">
              <div className="relative w-[248px] sm:w-[280px]">
                <div
                  aria-hidden
                  className="absolute -inset-10 -z-10 rounded-full bg-accent-soft/20 blur-3xl"
                />
                <PhoneFrame label={scene.phoneLabel}>
                  <PhoneScreen>{screens[i]}</PhoneScreen>
                </PhoneFrame>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
