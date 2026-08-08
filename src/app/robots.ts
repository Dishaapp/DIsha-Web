import type { MetadataRoute } from "next";

import { site } from "@/config/site";

/**
 * robots.txt.
 *
 * Alles darf gecrawlt werden — es gibt keine geschützten Bereiche. Die
 * Next-internen Build-Artefakte unter /_next werden ausgenommen, weil sie
 * nichts zum Index beitragen und nur Crawl-Budget kosten.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
