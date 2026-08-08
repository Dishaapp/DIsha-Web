import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { getContent } from "@/content";
import { enabledLocales, isEnabledLocale } from "@/i18n/locales";

/**
 * Vorschaubild für Social-Media-Karten (Open Graph und Twitter).
 *
 * Wird zur Build-Zeit einmal pro Locale gerendert. Bewusst schlicht gehalten:
 * `ImageResponse` unterstützt nur Flexbox und einen Teil der CSS-Eigenschaften
 * — kein Grid, keine Web-Fonts ohne explizites Laden. Deshalb tragen die
 * Wortmarke (als PNG eingebettet) und Deep-Green auf Nachtschwarz das Bild.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Disha: dein Wochenplan, dein Budget, in Sekunden";

export function generateStaticParams() {
  return enabledLocales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isEnabledLocale(rawLocale) ? rawLocale : "de";
  const t = getContent(locale);
  const [headlineLine1, headlineLine2, headlineLine3] = t.hero.headline;

  // Die Wortmarke liegt als einfarbiges PNG in public/ und wird inline
  // eingebettet — ImageResponse kann zur Build-Zeit keine eigenen URLs laden.
  const wordmark = await readFile(
    join(process.cwd(), "public", "brand", "logo-wordmark.png"),
  );
  const wordmarkSrc = `data:image/png;base64,${wordmark.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: "#060b08",
        // Deep-Green-Schein aus der rechten oberen Ecke
        backgroundImage:
          "radial-gradient(circle at 78% 18%, rgba(46,94,74,0.75), transparent 58%), radial-gradient(circle at 8% 96%, rgba(26,58,42,0.85), transparent 55%)",
      }}
    >
      <div style={{ display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={wordmarkSrc}
          alt=""
          width={230}
          height={84}
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: "-2.5px",
            lineHeight: 1.05,
          }}
        >
          <span style={{ color: "#ffffff" }}>{headlineLine1}</span>
          <span style={{ color: "#ffffff" }}>{headlineLine2}</span>
          <span style={{ color: "#a9c7b2" }}>{headlineLine3}</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontSize: 27,
            color: "rgba(255,255,255,0.62)",
          }}
        >
          {t.meta.ogTagline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 23,
          color: "#a9c7b2",
        }}
      >
        <span
          style={{
            display: "flex",
            width: 10,
            height: 10,
            borderRadius: 999,
            backgroundColor: "#a9c7b2",
          }}
        />
        {t.finalCta.reassurance}
      </div>
    </div>,
    size,
  );
}
