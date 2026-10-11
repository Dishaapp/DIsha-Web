import type { Metadata } from "next";

import { LegalMarkdown } from "@/components/legal/LegalMarkdown";
import { kalia } from "@/config/kalia";
import { loadLegalDocument } from "@/lib/legal-markdown";

/**
 * Nutzungsbedingungen der App Kalia (nur Englisch).
 *
 * Der Text steht in `legal/terms-of-use.en.md` und wird unverändert
 * gerendert — Änderungen dort machen, nicht hier. Die Disha-Nutzungs-
 * bedingungen (`/terms`, `/de/agb`) verweisen oben auf diese Seite, weil die
 * App bisher dorthin verlinkt.
 */

const doc = loadLegalDocument("terms-of-use.en.md");

export const metadata: Metadata = {
  title: doc.title,
  description:
    "Terms for using the Kalia app and the Kalia+ subscription, including notes on AI-generated content, health and price estimates.",
  alternates: { canonical: kalia.paths.terms },
};

export default function KaliaTermsPage() {
  return <LegalMarkdown doc={doc} />;
}
