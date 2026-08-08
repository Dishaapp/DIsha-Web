"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type PhoneFrameProps = {
  children: ReactNode;
  className?: string;
  /** Beschreibung für Screenreader — der Inhalt selbst ist dekorativ. */
  label: string;
};

/**
 * iPhone-Gehäuse in reinem CSS.
 *
 * Kein Bild-Asset, damit der Rahmen auf jedem Display scharf bleibt und der
 * Screen darin echtes, selektierbares HTML sein kann. Das Seitenverhältnis
 * entspricht dem iPhone 15 Pro (393 × 852 pt), damit die nachgebauten Screens
 * in denselben Proportionen sitzen wie in der App.
 *
 * Die Skalierung läuft über die Container-Breite: der Screen rendert intern
 * immer mit 393px Breite und wird per `scale` eingepasst. Dadurch stimmen
 * Schriftgrößen und Abstände relativ zueinander exakt wie auf dem Gerät.
 */
export function PhoneFrame({ children, className, label }: PhoneFrameProps) {
  return (
    <div
      className={`relative aspect-[393/852] w-full ${className ?? ""}`}
      role="img"
      aria-label={label}
    >
      {/* Titan-Rahmen */}
      <div className="absolute inset-0 rounded-[3.2rem] bg-gradient-to-br from-[#8f9694] via-[#3b4441] to-[#171b1a] p-[3px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]">
        {/* Innerer schwarzer Absatz zwischen Rahmen und Glas */}
        <div className="relative h-full w-full overflow-hidden rounded-[3.05rem] bg-black p-[7px]">
          <div className="relative h-full w-full overflow-hidden rounded-[2.7rem] bg-white [mask-image:-webkit-radial-gradient(white,black)] [transform:translateZ(0)]">
            {children}

            {/* Dynamic Island */}
            <div className="pointer-events-none absolute left-1/2 top-[1.6%] z-30 h-[3.1%] w-[30%] -translate-x-1/2 rounded-pill bg-black">
              <span className="absolute right-[14%] top-1/2 h-[38%] w-[13%] -translate-y-1/2 rounded-full bg-[#0f1a17]" />
            </div>

            {/* Home-Indicator */}
            <div className="pointer-events-none absolute bottom-[0.9%] left-1/2 z-30 h-[0.45%] w-[34%] -translate-x-1/2 rounded-pill bg-black/25" />

            {/* Glas-Reflexion: schmaler Lichtstreifen über dem Display */}
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/12 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      {/* Seitentasten */}
      <span className="absolute -left-[2px] top-[17%] h-[4%] w-[3px] rounded-l-sm bg-[#5c6462]" />
      <span className="absolute -left-[2px] top-[24%] h-[7.5%] w-[3px] rounded-l-sm bg-[#5c6462]" />
      <span className="absolute -left-[2px] top-[33%] h-[7.5%] w-[3px] rounded-l-sm bg-[#5c6462]" />
      <span className="absolute -right-[2px] top-[26%] h-[11%] w-[3px] rounded-r-sm bg-[#5c6462]" />
    </div>
  );
}

/** Design-Breite/-Höhe der Screens in pt (iPhone 15 Pro). */
const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = Math.round(DESIGN_WIDTH * (852 / 393));

/**
 * Innenfläche eines Screens.
 *
 * Der Inhalt rendert mit fixer 393px-Breite und wird auf die tatsächliche
 * Rahmenbreite heruntergerechnet. Dadurch stimmen alle Schriftgrößen und
 * Abstände relativ zueinander exakt wie auf dem Gerät.
 *
 * Der Skalierungsfaktor kommt aus einem ResizeObserver statt aus einem
 * CSS-Ausdruck: Ein früherer Versuch mit `scale(tan(atan2(100cqw, 393px)))`
 * (Verhältnis zweier Längen als reine Zahl, ohne JS) lief in manchen
 * Browsern leer — der Screen blieb unskaliert links oben im Rahmen stehen.
 */
export function PhoneScreen({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / DESIGN_WIDTH);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div
        className={`absolute left-0 top-0 origin-top-left ${className ?? ""}`}
        style={{
          width: `${DESIGN_WIDTH}px`,
          height: `${DESIGN_HEIGHT}px`,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
