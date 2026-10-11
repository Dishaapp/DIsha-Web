import "./kalia.css";

/**
 * Die Kalia-Wortmarke, die sich selbst zeichnet.
 *
 * Geometrie 1:1 aus der App (`kaliaapp/src/constants/kalia-wordmark.ts`):
 * das Gabel-k als Flächen, „alia“ als Striche mit rundem i-Punkt. Farben wie
 * im App-Icon — cremefarbene Gabel, limettengrüne Blätter.
 *
 * Ablauf (reines CSS, kein JavaScript, siehe `kalia.css`): die Gabel steigt
 * auf, die Blätter wachsen aus dem Gelenk, „alia“ wird Strich für Strich
 * gezogen, zuletzt springt der i-Punkt auf. Danach wiegen sich die Blätter
 * leise. Bei „Bewegung reduzieren“ steht die fertige Marke sofort da.
 */

const VIEW_BOX = "0 0 1087.8 477.4";
const K_FORK =
  "M0 15.5A15.5 15.5 0 0 1 31 15.5L31 122.7A7.4 7.4 0 0 0 45.8 122.7L45.8 15.5A15.5 15.5 0 0 1 76.8 15.5L76.8 122.7A7.4 7.4 0 0 0 91.6 122.7L91.6 15.5A15.5 15.5 0 0 1 122.7 15.5L122.7 158.1C122.7 204.9 95.3 200.6 95.3 243.1L95.3 433A34 34 0 0 1 27.3 433L27.3 243.1C27.3 200.6 0 204.9 0 158.1Z";
const K_ARM =
  "M111.6 335.5C105.7 239.1 165.3 171.2 239.9 171.3C232.7 223.8 179 296.4 111.6 335.5Z";
const K_LEG =
  "M111.6 335.5C166.2 350.2 231.7 421.4 241 469.4C170.2 480.8 99.2 414.8 111.6 335.5Z";
const LETTERS = [
  "M510.8 212.4L510.8 324.6C510.8 395.1 455.6 452.4 387.6 452.4C319.5 452.4 264.4 395.1 264.4 324.6C264.4 254 319.5 196.8 387.6 196.8C455.6 196.8 510.8 254 510.8 324.6L510.8 442",
  "M618 68.6L618 442",
  "M725.2 207.2L725.2 442",
  "M1062.8 212.4L1062.8 324.6C1062.8 395.1 1007.6 452.4 939.6 452.4C871.5 452.4 816.4 395.1 816.4 324.6C816.4 254 871.5 196.8 939.6 196.8C1007.6 196.8 1062.8 254 1062.8 324.6L1062.8 442",
];
const LETTER_DELAYS = ["0.85s", "1.15s", "1.3s", "1.45s"];

/** Das Blatt (Arm des k) — auch Vorlage für die fliegenden Blätter im Hintergrund. */
export const LEAF_PATH = K_ARM;
export const LEAF_VIEW_BOX = "103 169 140 169";

export function AnimatedWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={VIEW_BOX}
      className={`kalia-wordmark ${className ?? ""}`}
      role="img"
      aria-label="Kalia"
    >
      <path d={K_FORK} className="kalia-fork" />
      <g className="kalia-sway">
        <path d={K_ARM} className="kalia-leaf" />
        <path d={K_LEG} className="kalia-leaf" style={{ animationDelay: "0.72s" }} />
      </g>
      {LETTERS.map((d, i) => (
        <path
          key={d}
          d={d}
          pathLength={1}
          className="kalia-stroke"
          strokeWidth={50}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animationDelay: LETTER_DELAYS[i] }}
        />
      ))}
      <circle cx={725.2} cy={114.2} r={32} className="kalia-dot" />
    </svg>
  );
}
