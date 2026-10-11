import type { Metadata } from "next";

import { LegalMarkdown } from "@/components/legal/LegalMarkdown";
import { kalia } from "@/config/kalia";
import { loadLegalDocument } from "@/lib/legal-markdown";

/**
 * Datenschutzerklärung der App Kalia (nur Englisch).
 *
 * Der Text steht in `legal/privacy-policy.en.md` und wird unverändert
 * gerendert — Änderungen dort machen, nicht hier. Die App verlinkt genau
 * diese URL.
 */

const doc = loadLegalDocument("privacy-policy.en.md");

export const metadata: Metadata = {
  title: doc.title,
  description:
    "How the Kalia app and the Kalia pages on getdisha.app handle your data: no account, data stored on your device, no tracking and no ads.",
  alternates: { canonical: kalia.paths.privacy },
};

export default function KaliaPrivacyPage() {
  return <LegalMarkdown doc={doc} />;
}
