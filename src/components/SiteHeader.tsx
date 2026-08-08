"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Container } from "@/components/Container";
import { Wordmark } from "@/components/Wordmark";
import { getContent } from "@/content";
import { site } from "@/config/site";
import { pathFor, type EnabledLocale } from "@/i18n/locales";

/**
 * Kopfzeile.
 *
 * Sie startet transparent über dem Hero und legt beim Scrollen eine
 * Glas-Fläche darunter — dadurch bleibt der Hero randlos, ohne dass die
 * Navigation später auf hellen Sections verschwindet.
 */
export function SiteHeader({ locale }: { locale: EnabledLocale }) {
  const t = getContent(locale);
  const home = pathFor(locale);

  const navItems = [
    { href: `${home}#so-funktionierts`, label: t.nav.howItWorks },
    { href: `${home}#funktionen`, label: t.nav.features },
    { href: `${home}#preise`, label: t.nav.pricing },
    { href: `${home}#fragen`, label: t.nav.faq },
  ] as const;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hintergrund nicht scrollen, während das Menü offen ist.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape schließt das Menü.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  /*
   * Drei Zustände:
   *   oben, Menü zu   → transparent, der Hero bleibt randlos
   *   gescrollt       → Glas, damit die Navigation auf hellen Sections lesbar
   *                     bleibt
   *   Menü offen      → nahezu opak. Die 72 % des Glas-Effekts reichen nicht:
   *                     die Hero-Headline schlägt sonst durch die Menüpunkte
   *                     durch und macht sie unruhig.
   */
  const chrome = menuOpen
    ? "border-b border-accent/10 bg-cream/[0.97] py-3 backdrop-blur-xl"
    : scrolled
      ? "glass-light border-b border-accent/10 py-3"
      : "border-b border-transparent py-5";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${chrome}`}
    >
      <Container size="wide">
        <div className="flex items-center justify-between gap-6">
          <Link
            href={home}
            className="shrink-0 transition-opacity hover:opacity-80"
            aria-label={t.nav.homeAriaLabel}
          >
            <Wordmark width={92} variant="green" priority />
          </Link>

          <nav
            aria-label={t.nav.mainNav}
            className="hidden items-center gap-1 md:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-pill px-4 py-2 text-[15px] text-ink-soft transition-colors duration-300 hover:bg-accent/5 hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.stores.ios}
              target="_blank"
              rel="noopener"
              className="hidden rounded-pill bg-accent px-5 py-2.5 text-[15px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              {t.nav.cta}
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/20 text-accent transition-colors hover:bg-accent/5 md:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${
                    menuOpen ? "top-[5px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${
                    menuOpen ? "bottom-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mobiles Menü */}
        <div id="mobile-menu" hidden={!menuOpen} className="md:hidden">
          <nav aria-label={t.nav.mainNavMobile} className="pb-4 pt-6">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-tile px-4 py-3 text-[17px] text-ink-soft transition-colors hover:bg-accent/5 hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={site.stores.ios}
              target="_blank"
              rel="noopener"
              className="mt-4 flex items-center justify-center rounded-pill bg-accent px-6 py-3.5 text-[16px] font-semibold text-white"
            >
              {t.nav.cta}
            </a>
          </nav>
        </div>
      </Container>
    </header>
  );
}
