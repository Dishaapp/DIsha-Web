import { Container, Eyebrow } from "@/components/Container";
import {
  PlanScreen,
  RecipeScreen,
  ShoppingScreen,
} from "@/components/app-ui/screens";
import { AnimatedHeadline } from "@/components/motion/AnimatedHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollShowcase } from "@/components/sections/ScrollShowcase";
import { getContent } from "@/content";
import type { EnabledLocale } from "@/i18n/locales";

/**
 * Produkt-Showcase auf Nachtschwarz.
 *
 * Die Screens werden hier — im Server-Component-Kontext — gerendert und als
 * `ReactNode` an die Client-Komponente übergeben. So bleibt ihr umfangreiches
 * Markup (inklusive `next/image`) aus dem Client-Bundle heraus; nur die
 * Scroll-Logik selbst wird ausgeliefert.
 *
 * Die Reihenfolge muss zu `t.showcase.scenes` passen (plan → recipe →
 * shopping).
 */
export function Showcase({ locale }: { locale: EnabledLocale }) {
  const t = getContent(locale);
  const screens = [
    <PlanScreen key="plan" locale={locale} />,
    <RecipeScreen key="recipe" locale={locale} />,
    <ShoppingScreen key="shopping" locale={locale} />,
  ];
  // `scenePhoneLabel` ist eine Funktion aus dem Content-Objekt — die kann
  // nicht als Prop an die Client-Komponente ScrollShowcase durchgereicht
  // werden. Deshalb hier serverseitig zu fertigen Strings auflösen.
  const scenes = t.showcase.scenes.map((scene) => ({
    ...scene,
    phoneLabel: t.showcase.scenePhoneLabel(scene.label),
  }));

  return (
    <section
      id="app"
      // overflow-x-clip statt overflow-hidden: die Verläufe werden weiterhin
      // beschnitten, aber das sticky Gerät im ScrollShowcase bleibt
      // funktionsfähig (overflow: hidden würde hier einen Scroll-Container
      // erzeugen und sticky wirkungslos machen).
      className="grain relative scroll-mt-24 overflow-x-clip bg-night py-section-sm sm:py-section"
    >
      {/* Hintergrundschein, der die Gerätespalte anhebt */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-15%] top-[10%] h-[60rem] w-[60rem] rounded-full bg-[radial-gradient(circle,rgba(46,94,74,0.3),transparent_65%)] blur-2xl" />
        <div className="absolute bottom-[-10%] right-[-15%] h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(circle,rgba(26,58,42,0.5),transparent_65%)] blur-2xl" />
      </div>

      <Container size="wide" className="relative z-10">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>{t.showcase.eyebrow}</Eyebrow>
          </Reveal>
          <AnimatedHeadline
            lines={[t.showcase.headline]}
            className="mt-6 text-[clamp(2rem,4.6vw,3.3rem)] font-semibold leading-[1.1] text-white"
            stagger={55}
          />
          <Reveal delay={140}>
            <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-white/60">
              {t.showcase.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-2 lg:mt-4">
          <ScrollShowcase
            scenes={scenes}
            screens={screens}
            phoneLabel={t.showcase.phoneLabel}
          />
        </div>
      </Container>
    </section>
  );
}
