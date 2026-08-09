import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isEnabledLocale, type EnabledLocale } from "@/i18n/locales";

/**
 * Root-Einstieg `/`: Sprache wird aus Accept-Language ausgehandelt.
 * `de`, wenn Deutsch die höchste Präferenz ist — sonst immer `en`, auch bei
 * fehlendem Header oder Sprachen, die wir nicht führen (z. B. fr, es).
 */
export function proxy(request: NextRequest) {
  const preferred = preferredEnabledLocale(
    request.headers.get("accept-language"),
  );
  const locale: EnabledLocale = preferred === "de" ? "de" : "en";
  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

function preferredEnabledLocale(header: string | null): string | null {
  if (!header) return null;

  const tags = header
    .split(",")
    .map((entry) => {
      const [tag, qPart] = entry.trim().split(";q=");
      return { tag: tag.trim().toLowerCase(), q: qPart ? Number(qPart) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of tags) {
    const primary = tag.split("-")[0];
    if (isEnabledLocale(primary)) return primary;
  }
  return null;
}

export const config = {
  matcher: "/",
};
