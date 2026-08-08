import Image from "next/image";

import { getContent } from "@/content";
import { site } from "@/config/site";
import type { EnabledLocale } from "@/i18n/locales";

type StoreBadgesProps = {
  locale: EnabledLocale;
  /** Auf dunklem Grund die weiße Apple-Badge-Variante verwenden. */
  variant?: "dark" | "light";
  className?: string;
  /** Für Vorkommen above the fold (z. B. Hero), um LCP zu beschleunigen. */
  priority?: boolean;
};

/**
 * Offizielle Store-Badges.
 *
 * Alle Dateien stammen direkt von den Anbietern (Apple Marketing Tools und
 * Google Play Badge-Generator) in der jeweiligen Sprachfassung — laut
 * Briefing ausdrücklich keine Nachbauten. Die vorgegebenen Seitenverhältnisse
 * werden eingehalten (Apple 119.66 × 40, Google 646 × 250 mit eingebautem
 * Rand), da beide Marken das in ihren Richtlinien verlangen.
 */
export function StoreBadges({
  locale,
  variant = "dark",
  className,
  priority = false,
}: StoreBadgesProps) {
  const t = getContent(locale);

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      <a
        href={site.stores.ios}
        target="_blank"
        rel="noopener"
        className="transition-transform duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
      >
        <Image
          src={
            variant === "dark"
              ? `/badges/apple-${locale}-white.svg`
              : `/badges/apple-${locale}.svg`
          }
          alt={t.badges.appStore}
          width={168}
          height={56}
          className="h-[52px] w-auto sm:h-[56px]"
          unoptimized
          priority={priority}
        />
      </a>

      <a
        href={site.stores.android}
        target="_blank"
        rel="noopener"
        className="transition-transform duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
      >
        {/* Das Google-Badge bringt einen transparenten Rand mit; -mx-2 hebt den
            optischen Versatz gegenüber dem Apple-Badge wieder auf. */}
        <Image
          src={`/badges/google-play-${locale}.png`}
          alt={t.badges.googlePlay}
          width={646}
          height={250}
          className="-mx-2 h-[66px] w-auto sm:h-[71px]"
          priority={priority}
        />
      </a>
    </div>
  );
}
