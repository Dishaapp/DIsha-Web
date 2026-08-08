import type { SVGProps } from "react";

/**
 * Icon-Set der Website.
 *
 * Alles stroke-basiert auf einem 24er-Raster und in `currentColor` — damit
 * bleibt die Regel aus dem Design-System gewahrt: keine bunten Feature-Icons,
 * Deep-Green ist der einzige Akzent. (globals.css setzt `svg { fill: none }`,
 * gefüllte Formen brauchen deshalb ein explizites `fill`.)
 */

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M7.5 14h2M11 14h2M14.5 14h2M7.5 17.5h2M11 17.5h2" />
    </Svg>
  );
}

export function IconWallet(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="6" width="18" height="13" rx="3" />
      <path d="M3 10h13a2 2 0 0 1 0 4H3" />
      <path d="M6 6V4.8A1.8 1.8 0 0 1 8.3 3l8.2 2.2" />
    </Svg>
  );
}

export function IconRecycle(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7.5 9 5.2 13a2 2 0 0 0 1.7 3h2.6" />
      <path d="m9.5 19-2-3 3.4-.6" />
      <path d="M12.2 5.2 14.5 9l2.8-2" />
      <path d="M14.5 9 17 5.2a2 2 0 0 0-1.7-3h-2.5a2 2 0 0 0-1.7 1l-1 1.7" />
      <path d="M18.9 11.2 21 15a2 2 0 0 1-1.7 3h-4.6" />
      <path d="m16.2 20.4 1.8-2.4-1.8-2.4" />
    </Svg>
  );
}

export function IconCart(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.5L20 8H6" />
      <circle cx="9.5" cy="19.5" r="1.4" />
      <circle cx="17" cy="19.5" r="1.4" />
    </Svg>
  );
}

export function IconLeaf(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20c0-8 5-14 16-15 0 10-5 15-12 15H4Z" />
      <path d="M9 15c2-3 5-5.5 8-6.5" />
    </Svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.4a3.2 3.2 0 0 1 0 5.2" />
      <path d="M17.5 14.4A5.5 5.5 0 0 1 20.5 20" />
    </Svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3l7 3v5.5c0 4.4-2.9 8.2-7 9.5-4.1-1.3-7-5.1-7-9.5V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
}

export function IconSwap(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </Svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function IconShare(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3v11" />
      <path d="m8.5 6.5 3.5-3.5 3.5 3.5" />
      <path d="M6 12H5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-1" />
    </Svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </Svg>
  );
}

export function IconCarrot(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M15.5 8.5 6 18a2.1 2.1 0 0 0 2.4 3.3l9.4-4.2a3 3 0 0 0 1-4.8l-1.5-1.5a3 3 0 0 0-1.8-.3Z" />
      <path d="M15.8 8.2c.5-2 2-3.6 4.2-4-.3 2.2-1.5 3.7-3.3 4.3" />
      <path d="m11 13 2 2M8.5 15.5l2 2" />
    </Svg>
  );
}

export function IconMilk(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 3h6v2.5l2 3.5V21H7V9l2-3.5V3Z" />
      <path d="M7 12h10" />
    </Svg>
  );
}

export function IconGrain(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21V9" />
      <path d="M12 9c0-3 1.5-5.5 4-6 0 3-1.4 5.4-4 6Z" />
      <path d="M12 9c0-3-1.5-5.5-4-6 0 3 1.4 5.4 4 6Z" />
      <path d="M12 15c0-2.6 1.4-4.8 3.6-5.4 0 2.7-1.3 4.7-3.6 5.4Z" />
      <path d="M12 15c0-2.6-1.4-4.8-3.6-5.4 0 2.7 1.3 4.7 3.6 5.4Z" />
    </Svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </Svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m5 13 4.5 4.5L19 7" />
    </Svg>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 13.7 9l5.3 1.8-5.3 1.8L12 18l-1.7-5.4L5 10.8 10.3 9 12 3.5Z" />
      <path d="M18.5 3.5v3M17 5h3" />
    </Svg>
  );
}

export function IconStore(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 9.5V20h16V9.5" />
      <path d="M3 9.5 5 4h14l2 5.5a2.6 2.6 0 0 1-4.5 1.6A2.6 2.6 0 0 1 12 11a2.6 2.6 0 0 1-4.5.1A2.6 2.6 0 0 1 3 9.5Z" />
      <path d="M10 20v-5h4v5" />
    </Svg>
  );
}

/** Feature-Icons per Schlüssel aus src/content/de.ts auflösen. */
export const featureIcons = {
  calendar: IconCalendar,
  wallet: IconWallet,
  recycle: IconRecycle,
  cart: IconCart,
  leaf: IconLeaf,
  users: IconUsers,
  shield: IconShield,
  swap: IconSwap,
} as const;

export type FeatureIconName = keyof typeof featureIcons;
