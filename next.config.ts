import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keine Server-Runtime nötig: alle Routen werden statisch vorgerendert.
  reactStrictMode: true,
  poweredByHeader: false,

  // Ohne das sucht Turbopack die Projektwurzel anhand von Lockfiles und findet
  // eine fremde package-lock.json in C:\Users\timhe.
  turbopack: { root: import.meta.dirname },

  // Erlaubt den Zugriff auf den Dev-Server über die LAN-IP (z. B. vom Handy im
  // selben WLAN). Ohne das blockiert Next.js JS-Chunks und HMR als
  // Cross-Origin-Request, wodurch die Seite zwar lädt, aber nie hydriert —
  // Reveal-Texte bleiben unsichtbar und das Burger-Menü reagiert nicht. Gilt
  // nur im Dev-Modus, keine Auswirkung auf den Produktionsbuild.
  allowedDevOrigins: ["192.168.2.43"],

  images: {
    // Nur lokale Assets aus /public — keine remotePatterns nötig.
    formats: ["image/avif", "image/webp"],
  },

  async redirects() {
    return [
      // Einstieg: Root auf die Primärsprache. Sobald weitere Locales in
      // src/i18n/locales.ts aktiviert sind, kann das durch eine
      // Accept-Language-Aushandlung in proxy.ts ersetzt werden.
      { source: "/", destination: "/de", permanent: false },

      // Der im App Store hinterlegte Datenschutz-Link zeigt auf
      // kitchen-heroes.net/disha/datenschutz. Falls dieser Pfad je auf diese
      // App zeigt, landet er hier richtig. Der Redirect BEI kitchen-heroes.net
      // muss zusätzlich eingerichtet werden — siehe OFFENE-PUNKTE.md.
      {
        source: "/disha/datenschutz",
        destination: "/de/datenschutz",
        permanent: true,
      },
      {
        source: "/disha/impressum",
        destination: "/de/impressum",
        permanent: true,
      },
      { source: "/disha/agb", destination: "/de/agb", permanent: true },
      { source: "/disha", destination: "/de", permanent: true },

      // Locale-lose Kurzformen, die in Store-Texten und E-Mails auftauchen.
      {
        source: "/datenschutz",
        destination: "/de/datenschutz",
        permanent: true,
      },
      { source: "/impressum", destination: "/de/impressum", permanent: true },
      { source: "/agb", destination: "/de/agb", permanent: true },
      // Steht so in der englischen App-Store-Beschreibung.
      { source: "/privacy", destination: "/de/datenschutz", permanent: false },
      { source: "/terms", destination: "/de/agb", permanent: false },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Die Seite braucht weder Kamera, Mikrofon noch Standort.
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
