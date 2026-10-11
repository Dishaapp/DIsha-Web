import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/Container";
import { headingId, type LegalDocument } from "@/lib/legal-markdown";

/**
 * Rechtstext aus `legal/*.md` als Seite.
 *
 * Gleiche Typografie wie `LegalPage`, aber ohne dunklen Disha-Kopf und ohne
 * „Zurück zur Startseite“ — die Kalia-Seiten haben keine eigene Startseite.
 */
export function LegalMarkdown({ doc }: { doc: LegalDocument }) {
  return (
    <article>
      <Container size="prose" className="pb-20 pt-12 sm:pb-24 sm:pt-16">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.1] text-accent">
          {doc.title}
        </h1>
        <div className="legal-prose text-[16px] leading-relaxed text-ink-soft">
          {doc.blocks.map((block, index) => {
            switch (block.kind) {
              case "heading":
                return block.level === 2 ? (
                  <h2
                    key={index}
                    id={headingId(block.text)}
                    className="mt-12 scroll-mt-8 text-[22px] font-semibold leading-snug text-accent sm:text-[24px]"
                  >
                    {renderInline(block.text)}
                  </h2>
                ) : (
                  <h3
                    key={index}
                    className="mt-7 text-[17px] font-semibold text-accent"
                  >
                    {renderInline(block.text)}
                  </h3>
                );
              case "paragraph":
                return (
                  <p key={index} className="mt-4">
                    {block.lines.map((line, i) => (
                      <span key={i}>
                        {i > 0 ? <br /> : null}
                        {renderInline(line)}
                      </span>
                    ))}
                  </p>
                );
              case "list":
                return (
                  <ul key={index} className="mt-4">
                    {block.items.map((item, i) => (
                      <li key={i}>{renderInline(item)}</li>
                    ))}
                  </ul>
                );
            }
          })}
        </div>
      </Container>
    </article>
  );
}

const INLINE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/** `**fett**` und `[Text](url)` — mehr nutzen die Rechtstexte nicht. */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(INLINE)) {
    const [whole, bold, label, href] = match;
    if (match.index > last) nodes.push(text.slice(last, match.index));
    nodes.push(
      bold !== undefined ? (
        <strong key={match.index}>{renderInline(bold)}</strong>
      ) : (
        <LegalLink key={match.index} href={href}>
          {label}
        </LegalLink>
      ),
    );
    last = match.index + whole.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Eigene Domain → relativer Pfad, damit Links auch lokal und ohne Redirect-Umweg funktionieren. */
const OWN_ORIGIN = /^https:\/\/(?:www\.)?getdisha\.app(?=\/)/;

function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  const local = href.replace(OWN_ORIGIN, "");
  if (local.startsWith("/")) return <Link href={local}>{children}</Link>;
  if (href.startsWith("mailto:")) return <a href={href}>{children}</a>;
  return (
    <a href={href} target="_blank" rel="noopener">
      {children}
    </a>
  );
}
