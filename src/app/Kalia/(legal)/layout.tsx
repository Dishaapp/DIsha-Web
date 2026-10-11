import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/Container";
import { kalia, kaliaLegalLinks } from "@/config/kalia";

/** Heller, ruhiger Rahmen für die Kalia-Rechtstexte. */

const WORDMARK_HEIGHT = 26;
const WORDMARK_WIDTH = Math.round((WORDMARK_HEIGHT * 1087.8) / 477.4);

export default function KaliaLegalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b border-hairline/50">
        <Container
          size="prose"
          className="flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4"
        >
          <Link href={kalia.paths.home}>
            <Image
              src="/brand/kalia-wordmark.svg"
              alt={kalia.name}
              width={WORDMARK_WIDTH}
              height={WORDMARK_HEIGHT}
              unoptimized
              priority
            />
          </Link>
          <nav aria-label="Legal">
            <ul className="flex gap-5 text-[14px]">
              {kaliaLegalLinks.slice(0, 2).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-soft transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </header>

      <main id="content">{children}</main>

      <footer className="border-t border-hairline/50 bg-surface-2 py-10">
        <Container size="prose">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[14px]">
            {kaliaLegalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ink-soft transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[14px] text-ink-soft">
            <a
              href={`mailto:${kalia.contactEmail}`}
              className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {kalia.contactEmail}
            </a>
          </p>
        </Container>
      </footer>
    </>
  );
}
