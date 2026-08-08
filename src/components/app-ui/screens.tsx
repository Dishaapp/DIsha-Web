import Image from "next/image";

import {
  IconCarrot,
  IconChevronDown,
  IconClock,
  IconGrain,
  IconLeaf,
  IconMilk,
  IconPlus,
  IconShare,
  IconStore,
  IconSwap,
  IconUsers,
} from "@/components/Icon";
import { Wordmark } from "@/components/Wordmark";
import type { EnabledLocale } from "@/i18n/locales";

/**
 * Nachbau der echten Disha-App-Screens als HTML.
 *
 * Vorlage sind die App-Store-Screenshots des Produkts; alle Beschriftungen
 * stammen wörtlich aus `DishaApp/src/locales/{de,en}.json` (Schlüssel jeweils
 * im Kommentar), damit Website und App identisch sprechen. Die Zahlen sind
 * realistische Beispielwerte eines Wochenplans, unverändert in EUR über beide
 * Sprachen (die App rechnet regional, aber diese Nachbauten zeigen bewusst
 * denselben Beispielplan in beiden Sprachen).
 *
 * Jeder Screen bekommt eine `locale`-Prop und wählt seine Texte aus einem
 * lokalen `Record<EnabledLocale, ...>` — bewusst nicht aus `content/`
 * importiert, weil es sich um App-UI-Nachbau-Daten handelt, keinen
 * Marketing-Text.
 *
 * Maßstab: 393 × 852pt (iPhone 15 Pro). Alle Werte sind px auf diesem Raster.
 */

type LocaleProp = { locale: EnabledLocale };

/* -------------------------------------------------------------------------- */
/* Gemeinsame Bausteine                                                        */
/* -------------------------------------------------------------------------- */

/** Statusleiste — Uhrzeit plus Batterie-/Netz-Andeutung. */
function StatusBar() {
  return (
    <div className="flex h-[54px] items-end justify-between px-[30px] pb-[4px] text-[15px] font-semibold text-black">
      <span className="tabular-nums">9:41</span>
      <span className="flex items-center gap-[5px]">
        {/* Netz */}
        <svg viewBox="0 0 18 12" className="h-[11px] w-[17px]">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={i * 4.5}
              y={9 - i * 2.6}
              width="3"
              height={3 + i * 2.6}
              rx="1"
              fill="currentColor"
            />
          ))}
        </svg>
        {/* WLAN */}
        <svg viewBox="0 0 16 12" className="h-[11px] w-[15px]">
          <path
            d="M8 10.6 5.6 7.9a3.4 3.4 0 0 1 4.8 0L8 10.6Z"
            fill="currentColor"
          />
          <path
            d="M2.6 5.2a7.7 7.7 0 0 1 10.8 0"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        {/* Batterie */}
        <svg viewBox="0 0 26 13" className="h-[12px] w-[25px]">
          <rect
            x="0.7"
            y="0.7"
            width="22"
            height="11.6"
            rx="3.2"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <rect
            x="2.4"
            y="2.4"
            width="16"
            height="8.2"
            rx="2"
            fill="currentColor"
          />
          <path
            d="M24.3 4.6v3.8a2 2 0 0 0 0-3.8Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>
      </span>
    </div>
  );
}

/** Kopfzeile mit Wortmarke und runder Aktionstaste. */
function AppHeader({ action }: { action: "plus" | "share" }) {
  const ActionIcon = action === "plus" ? IconPlus : IconShare;
  return (
    <div className="flex items-center justify-between px-[20px] pb-[8px] pt-[6px]">
      <Wordmark width={68} />
      <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-accent text-white">
        <ActionIcon className="h-[21px] w-[21px]" strokeWidth={2.2} />
      </span>
    </div>
  );
}

/** Beschriftungen: `tabs.*` aus {de,en}.json. */
const tabLabels: Record<EnabledLocale, Record<"plan" | "shopping" | "profile", string>> = {
  de: { plan: "Wochenplan", shopping: "Einkauf", profile: "Ich" },
  en: { plan: "Meal Plan", shopping: "Shopping", profile: "Me" },
};

/** Untere Tab-Leiste. */
function TabBar({
  active,
  locale,
}: {
  active: "plan" | "shopping" | "profile";
} & LocaleProp) {
  const labels = tabLabels[locale];
  const tabs = [
    { id: "plan", label: labels.plan },
    { id: "shopping", label: labels.shopping },
    { id: "profile", label: labels.profile },
  ] as const;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[83px] border-t border-hairline/45 bg-white/92 backdrop-blur-xl">
      <div className="flex items-start justify-around pt-[9px]">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <span
              key={tab.id}
              className={`flex w-[100px] flex-col items-center gap-[3px] ${
                isActive ? "text-accent" : "text-ink-faint"
              }`}
            >
              {tab.id === "plan" ? (
                <TabGridIcon />
              ) : tab.id === "shopping" ? (
                <TabCartIcon />
              ) : (
                <TabUserIcon />
              )}
              <span className="text-[10px] font-medium leading-none">
                {tab.label}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function TabGridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[25px] w-[25px]">
      <rect
        x="3.5"
        y="4.5"
        width="17"
        height="15"
        rx="2.6"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M3.5 9h17" stroke="currentColor" strokeWidth="1.8" />
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={7.5 + col * 4.5}
            cy={12 + row * 3}
            r="1"
            fill="currentColor"
          />
        )),
      )}
    </svg>
  );
}

function TabCartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[25px] w-[25px]">
      <path
        d="M3 4.5h2l2.3 9.8a1.9 1.9 0 0 0 1.9 1.5h7a1.9 1.9 0 0 0 1.9-1.4L20 8H6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.6" cy="19.4" r="1.5" fill="currentColor" />
      <circle cx="17" cy="19.4" r="1.5" fill="currentColor" />
    </svg>
  );
}

function TabUserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[25px] w-[25px]">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 20a7 7 0 0 1 14 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. Wochenplan                                                              */
/* -------------------------------------------------------------------------- */

const planScreenCopy = {
  de: {
    days: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    heroTitle: ["Dein Wochenplan", "ist bereit."],
    heroSubtitle: ["Lecker, einfach und passend", "zu deinem Budget."],
    budgetLabel: "Wochenbudget",
    budgetOf: "von 60,00 €",
    budgetAmount: "51,10 €",
    supermarket: "Lidl",
    household: "2 Personen",
    diet: "Allesesser",
    weekPlanTitle: "Dein Wochenplan",
    change: "Ändern",
    meals: [
      {
        slot: "Frühstück",
        title: "Porridge mit Beeren",
        time: "10 Min",
        price: "ca. 1,20 €",
        image: "fruehstueck-porridge.webp",
      },
      {
        slot: "Abendessen",
        title: "Hähnchenbrust mit Reis und Brokkoli",
        time: "30 Min",
        price: "ca. 3,40 €",
        image: "haehnchen-reis-brokkoli.webp",
      },
    ],
  },
  en: {
    days: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    heroTitle: ["Your weekly plan", "is ready."],
    heroSubtitle: ["Tasty, simple, and matched", "to your budget."],
    budgetLabel: "Weekly budget",
    budgetOf: "of €60.00",
    budgetAmount: "€51.10",
    supermarket: "Lidl",
    household: "2 people",
    diet: "Everything",
    weekPlanTitle: "Your weekly plan",
    change: "Change",
    meals: [
      {
        slot: "Breakfast",
        title: "Porridge with berries",
        time: "10 min",
        price: "approx. €1.20",
        image: "fruehstueck-porridge.webp",
      },
      {
        slot: "Dinner",
        title: "Chicken breast with rice and broccoli",
        time: "30 min",
        price: "approx. €3.40",
        image: "haehnchen-reis-brokkoli.webp",
      },
    ],
  },
} as const;

/** Beschriftungen: `today.*`, `common.days_short.*` aus {de,en}.json. */
export function PlanScreen({ locale }: LocaleProp) {
  const t = planScreenCopy[locale];

  return (
    <div className="h-full bg-white font-sans">
      <StatusBar />
      <AppHeader action="plus" />

      <div className="px-[20px]">
        {/* today.hero_title / today.hero_subtitle */}
        <div className="flex items-start justify-between gap-[12px] pt-[4px]">
          <div className="flex-1">
            <h3 className="font-sans text-[27px] font-bold leading-[32px] tracking-[-0.5px] text-accent">
              {t.heroTitle[0]}
              <br />
              {t.heroTitle[1]}
            </h3>
            <p className="mt-[8px] text-[15px] leading-[20px] text-ink-soft">
              {t.heroSubtitle[0]}
              <br />
              {t.heroSubtitle[1]}
            </p>
          </div>
          <div className="relative -mr-[26px] mt-[2px] h-[104px] w-[104px] shrink-0 overflow-hidden rounded-full">
            <Image
              src="/food/kichererbsen-curry-bowl.webp"
              alt=""
              fill
              sizes="120px"
              className="object-cover"
            />
          </div>
        </div>

        {/* today.budget_title / today.budget_of */}
        <div className="mt-[18px] rounded-tile bg-surface-2 p-[15px]">
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] text-ink-soft">{t.budgetLabel}</span>
            <span className="text-[13px] text-ink-soft">{t.budgetOf}</span>
          </div>
          <div className="mt-[2px] text-[27px] font-bold leading-[32px] tabular-nums text-black">
            {t.budgetAmount}
          </div>
          <div className="mt-[10px] h-[6px] overflow-hidden rounded-pill bg-surface-3">
            <div className="h-full w-[85%] rounded-pill bg-accent" />
          </div>
        </div>

        {/* profile.rows.supermarket / household / diet */}
        <div className="mt-[14px] flex items-center justify-between text-[13px] text-ink-soft">
          <span className="flex items-center gap-[5px]">
            <IconStore className="h-[15px] w-[15px]" strokeWidth={1.6} />
            {t.supermarket}
          </span>
          <span className="flex items-center gap-[5px]">
            <IconUsers className="h-[15px] w-[15px]" strokeWidth={1.6} />
            {t.household}
          </span>
          <span className="flex items-center gap-[5px]">
            <IconLeaf className="h-[15px] w-[15px]" strokeWidth={1.6} />
            {t.diet}
          </span>
        </div>

        {/* today.week_plan_title / today.change_plan */}
        <div className="mt-[22px] flex items-center justify-between">
          <h4 className="font-sans text-[17px] font-semibold text-black">
            {t.weekPlanTitle}
          </h4>
          <span className="text-[15px] text-ink-soft">{t.change}</span>
        </div>

        <div className="mt-[12px] flex items-center justify-between">
          {t.days.map((day, i) => (
            <span
              key={`${day}-${i}`}
              className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-[15px] font-semibold ${
                i === 0 ? "bg-accent text-white" : "bg-surface-2 text-black/85"
              }`}
            >
              {day}
            </span>
          ))}
        </div>

        {/* Mahlzeiten des gewählten Tages */}
        <div className="mt-[16px] space-y-[14px]">
          {t.meals.map((meal) => (
            <div key={meal.title}>
              <div className="relative h-[132px] w-full overflow-hidden rounded-tile">
                <Image
                  src={`/food/${meal.image}`}
                  alt=""
                  fill
                  sizes="360px"
                  className="object-cover"
                />
                <span className="absolute right-[10px] top-[10px] flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white/92 text-accent backdrop-blur">
                  <IconSwap className="h-[16px] w-[16px]" strokeWidth={2} />
                </span>
                <span className="absolute bottom-[10px] left-[10px] rounded-pill bg-black/55 px-[9px] py-[3px] text-[11px] font-medium text-white backdrop-blur">
                  {meal.slot}
                </span>
              </div>
              <div className="mt-[8px] flex items-start justify-between gap-[10px]">
                <span className="flex-1 text-[16px] font-semibold leading-[20px] text-black">
                  {meal.title}
                </span>
                <span className="shrink-0 pt-[1px] text-[13px] text-ink-soft">
                  {meal.time} · {meal.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TabBar active="plan" locale={locale} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Einkaufsliste                                                           */
/* -------------------------------------------------------------------------- */

const shoppingScreenCopy = {
  de: {
    title: "Einkaufsliste",
    subtitle: ["Alles, was du für deine Gerichte", "diese Woche brauchst."],
    progress: "4 von 45 erledigt",
    total: "Gesamt ca. 51,10 €",
    aisles: [
      {
        name: "Obst & Gemüse",
        Icon: IconCarrot,
        open: 12,
        items: [
          { name: "Brokkoli", qty: "300 g", done: true },
          { name: "Karotten", qty: "2 Stk.", done: true },
          { name: "Kartoffeln", qty: "400 g", done: false },
          { name: "Paprika (rot)", qty: "2 Stk.", done: false },
          { name: "Petersilie (frisch)", qty: "1 Bund", done: false },
          { name: "Zwiebeln", qty: "3 Stk.", done: false },
        ],
      },
      {
        name: "Milchprodukte",
        Icon: IconMilk,
        open: 6,
        items: [
          { name: "Naturjoghurt", qty: "500 g", done: false },
          { name: "Gouda gerieben", qty: "200 g", done: false },
        ],
      },
      {
        name: "Vorräte & Hülsenfrüchte",
        Icon: IconGrain,
        open: 9,
        items: [{ name: "Basmatireis", qty: "1 kg", done: false }],
      },
    ],
  },
  en: {
    title: "Shopping List",
    subtitle: ["Everything you need for your dishes", "this week."],
    progress: "4 of 45 done",
    total: "Total approx. €51.10",
    aisles: [
      {
        name: "Produce",
        Icon: IconCarrot,
        open: 12,
        items: [
          { name: "Broccoli", qty: "300 g", done: true },
          { name: "Carrots", qty: "2 pcs", done: true },
          { name: "Potatoes", qty: "400 g", done: false },
          { name: "Bell pepper (red)", qty: "2 pcs", done: false },
          { name: "Parsley (fresh)", qty: "1 bunch", done: false },
          { name: "Onions", qty: "3 pcs", done: false },
        ],
      },
      {
        name: "Dairy",
        Icon: IconMilk,
        open: 6,
        items: [
          { name: "Plain yogurt", qty: "500 g", done: false },
          { name: "Grated gouda", qty: "200 g", done: false },
        ],
      },
      {
        name: "Pantry & Legumes",
        Icon: IconGrain,
        open: 9,
        items: [{ name: "Basmati rice", qty: "1 kg", done: false }],
      },
    ],
  },
} as const;

/** Beschriftungen: `shopping.*` inkl. `shopping.aisles.*` aus {de,en}.json. */
export function ShoppingScreen({ locale }: LocaleProp) {
  const t = shoppingScreenCopy[locale];

  return (
    <div className="h-full bg-white font-sans">
      <StatusBar />
      <AppHeader action="share" />

      <div className="px-[20px]">
        {/* shopping.title / shopping.subtitle */}
        <h3 className="font-sans text-[27px] font-bold leading-[32px] tracking-[-0.5px] text-accent">
          {t.title}
        </h3>
        <p className="mt-[6px] text-[15px] leading-[20px] text-ink-soft">
          {t.subtitle[0]}
          <br />
          {t.subtitle[1]}
        </p>

        {/* shopping.progress / shopping.total_estimate */}
        <div className="mt-[16px]">
          <div className="text-[15px] font-medium text-black">
            {t.progress}
          </div>
          <div className="mt-[7px] h-[6px] overflow-hidden rounded-pill bg-surface-3">
            <div className="h-full w-[9%] rounded-pill bg-accent" />
          </div>
          <div className="mt-[7px] text-[13px] text-ink-soft">{t.total}</div>
        </div>

        <div className="mt-[16px] space-y-[12px]">
          {t.aisles.map(({ name, Icon, open, items }) => (
            <div
              key={name}
              className="rounded-tile bg-surface-2 px-[14px] py-[12px]"
            >
              <div className="flex items-center gap-[9px]">
                <Icon
                  className="h-[19px] w-[19px] text-accent"
                  strokeWidth={1.7}
                />
                <span className="flex-1 text-[16px] font-semibold text-black">
                  {name}
                </span>
                <span className="flex h-[24px] min-w-[24px] items-center justify-center rounded-full bg-accent px-[6px] text-[12px] font-semibold text-white tabular-nums">
                  {open}
                </span>
                <IconChevronDown
                  className="h-[17px] w-[17px] rotate-180 text-ink-faint"
                  strokeWidth={2}
                />
              </div>

              <ul className="mt-[6px]">
                {items.map((item, i) => (
                  <li
                    key={item.name}
                    className={`flex items-center gap-[11px] py-[9px] ${
                      i > 0 ? "border-t border-hairline/35" : ""
                    }`}
                  >
                    <span
                      className={`flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full border-[1.6px] ${
                        item.done
                          ? "border-accent bg-accent text-white"
                          : "border-hairline"
                      }`}
                    >
                      {item.done ? (
                        <svg viewBox="0 0 24 24" className="h-[12px] w-[12px]">
                          <path
                            d="m5 13 4.5 4.5L19 7"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}
                    </span>
                    <span
                      className={`flex-1 text-[16px] ${
                        item.done ? "text-ink-faint line-through" : "text-black"
                      }`}
                    >
                      {item.name}
                    </span>
                    <span className="text-[14px] text-ink-soft tabular-nums">
                      {item.qty}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <TabBar active="shopping" locale={locale} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Rezept-Detail                                                           */
/* -------------------------------------------------------------------------- */

const recipeScreenCopy = {
  de: {
    title: ["Hähnchenbrust mit Reis", "und Brokkoli"],
    time: "30 Min",
    servings: "2 Portionen",
    price: "ca. 3,40 €",
    ingredientsHeading: "Zutaten",
    ingredientsTotal: "Gesamt ca. 6,80 €",
    ingredients: [
      { name: "Hähnchenbrust", qty: "300 g" },
      { name: "Basmatireis", qty: "150 g" },
      { name: "Brokkoli", qty: "300 g" },
      { name: "Knoblauch", qty: "2 Zehen" },
      { name: "Olivenöl", qty: "2 EL" },
      { name: "Zitrone", qty: "1/2 Stk." },
    ],
    instructionsHeading: "Zubereitung",
    steps: [
      "Reis nach Packungsanweisung in Salzwasser garen.",
      "Brokkoli in Röschen teilen und 6 Minuten dampfgaren.",
      "Hähnchenbrust salzen, pfeffern und 4 Minuten pro Seite goldbraun braten.",
      "Knoblauch, Olivenöl und Zitronensaft verrühren und über alles geben.",
    ],
    nutritionHeading: "Nährwerte",
    perServing: "pro Portion",
    nutrition: [
      { label: "Kalorien", value: "486", unit: "kcal" },
      { label: "Eiweiß", value: "44", unit: "g" },
      { label: "Kohlenhydrate", value: "52", unit: "g" },
      { label: "Fett", value: "9", unit: "g" },
    ],
  },
  en: {
    title: ["Chicken Breast with Rice", "and Broccoli"],
    time: "30 min",
    servings: "2 servings",
    price: "approx. €3.40",
    ingredientsHeading: "Ingredients",
    ingredientsTotal: "Total approx. €6.80",
    ingredients: [
      { name: "Chicken breast", qty: "300 g" },
      { name: "Basmati rice", qty: "150 g" },
      { name: "Broccoli", qty: "300 g" },
      { name: "Garlic", qty: "2 cloves" },
      { name: "Olive oil", qty: "2 tbsp" },
      { name: "Lemon", qty: "1/2" },
    ],
    instructionsHeading: "Instructions",
    steps: [
      "Cook the rice in salted water according to the package instructions.",
      "Cut the broccoli into florets and steam for 6 minutes.",
      "Season the chicken breast with salt and pepper, and pan-fry for 4 minutes per side until golden.",
      "Stir together garlic, olive oil, and lemon juice, and drizzle over everything.",
    ],
    nutritionHeading: "Nutrition",
    perServing: "per serving",
    nutrition: [
      { label: "Calories", value: "486", unit: "kcal" },
      { label: "Protein", value: "44", unit: "g" },
      { label: "Carbs", value: "52", unit: "g" },
      { label: "Fat", value: "9", unit: "g" },
    ],
  },
} as const;

/** Beschriftungen: `recipe.*`, `today.minutes`, `today.servings_other`. */
export function RecipeScreen({ locale }: LocaleProp) {
  const t = recipeScreenCopy[locale];

  return (
    <div className="h-full overflow-hidden bg-white font-sans">
      {/* Bild-Header, randlos bis unter die Statusleiste */}
      <div className="relative h-[290px] w-full">
        <Image
          src="/food/haehnchen-reis-brokkoli.webp"
          alt=""
          fill
          sizes="400px"
          className="object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-[110px] bg-gradient-to-b from-black/45 to-transparent" />
        <div className="absolute inset-x-0 top-0 text-white">
          <div className="flex h-[54px] items-end justify-between px-[30px] pb-[4px] text-[15px] font-semibold">
            <span className="tabular-nums">9:41</span>
            <span className="text-[13px] opacity-90">100 %</span>
          </div>
        </div>
        <span className="absolute left-[20px] top-[60px] flex h-[36px] w-[36px] items-center justify-center rounded-full bg-black/35 text-white backdrop-blur">
          <IconChevronDown
            className="h-[18px] w-[18px] rotate-90"
            strokeWidth={2.4}
          />
        </span>
        <span className="absolute right-[20px] top-[60px] flex h-[36px] w-[36px] items-center justify-center rounded-full bg-black/35 text-white backdrop-blur">
          <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]">
            <path
              d="M6 4h12v16l-6-4.5L6 20V4Z"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <div className="-mt-[22px] rounded-t-[22px] bg-white px-[20px] pt-[18px]">
        <h3 className="font-sans text-[24px] font-bold leading-[29px] tracking-[-0.4px] text-black">
          {t.title[0]}
          <br />
          {t.title[1]}
        </h3>

        <div className="mt-[12px] flex items-center gap-[8px]">
          {[
            { Icon: IconClock, text: t.time },
            { Icon: IconUsers, text: t.servings },
          ].map(({ Icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-[5px] rounded-pill bg-surface-2 px-[10px] py-[6px] text-[13px] text-black/80"
            >
              <Icon className="h-[14px] w-[14px]" strokeWidth={1.7} />
              {text}
            </span>
          ))}
          <span className="rounded-pill bg-accent/10 px-[10px] py-[6px] text-[13px] font-semibold text-accent">
            {t.price}
          </span>
        </div>

        {/* recipe.ingredients / recipe.ingredients_total */}
        <h4 className="mt-[22px] font-sans text-[19px] font-bold text-black">
          {t.ingredientsHeading}
        </h4>
        <ul className="mt-[8px]">
          {t.ingredients.map((ingredient, i) => (
            <li
              key={ingredient.name}
              className={`flex items-center justify-between py-[9px] text-[16px] ${
                i > 0 ? "border-t border-hairline/35" : ""
              }`}
            >
              <span className="text-black">{ingredient.name}</span>
              <span className="text-ink-soft tabular-nums">
                {ingredient.qty}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-[6px] text-[13px] text-ink-soft">
          {t.ingredientsTotal}
        </div>

        {/* recipe.instructions */}
        <h4 className="mt-[22px] font-sans text-[19px] font-bold text-black">
          {t.instructionsHeading}
        </h4>
        <ol className="mt-[10px] space-y-[12px]">
          {t.steps.map((step, i) => (
            <li key={i} className="flex gap-[11px]">
              <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-accent text-[12px] font-bold text-white">
                {i + 1}
              </span>
              <span className="text-[15px] leading-[21px] text-black/85">
                {step}
              </span>
            </li>
          ))}
        </ol>

        {/* recipe.nutrition_title / recipe.nutrition_per_serving */}
        <div className="mt-[22px] flex items-baseline justify-between">
          <h4 className="font-sans text-[19px] font-bold text-black">
            {t.nutritionHeading}
          </h4>
          <span className="text-[13px] text-ink-soft">{t.perServing}</span>
        </div>
        <div className="mt-[10px] grid grid-cols-4 gap-[8px] pb-[40px]">
          {t.nutrition.map((n) => (
            <div
              key={n.label}
              className="rounded-tile bg-surface-2 px-[6px] py-[10px] text-center"
            >
              <div className="text-[17px] font-bold tabular-nums text-black">
                {n.value}
              </div>
              <div className="text-[10px] text-ink-soft">{n.unit}</div>
              <div className="mt-[3px] text-[10px] leading-[12px] text-ink-soft">
                {n.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Onboarding: Supermarkt                                                  */
/* -------------------------------------------------------------------------- */

const storeScreenCopy = {
  de: {
    title: ["Wo kaufst du", "meistens ein?"],
    subtitle: "Wähle bis zu 3 – Disha rechnet mit ihren Preisen.",
    continue: "Weiter",
  },
  en: {
    title: ["Where do you", "usually shop?"],
    subtitle: "Pick up to 3 – Disha plans with their prices.",
    continue: "Continue",
  },
} as const;

/**
 * Beschriftungen: `onboarding.supermarket_title/_subtitle`,
 * `onboarding.supermarket_options.*`, `common.continue`.
 *
 * Die Supermarkt-Namen selbst bleiben über beide Sprachen gleich — Disha
 * rechnet mit denselben (überwiegend deutschen/österreichischen) Ketten,
 * unabhängig von der UI-Sprache der Website-Besucherin.
 *
 * Die Supermarkt-Kacheln bleiben bewusst neutral-grau statt in Fremd-
 * Markenfarben: Design-Regel „Deep-Green ist der einzige Akzent“ — und keine
 * fremden Markenzeichen auf einer Marketing-Seite.
 */
export function StoreScreen({ locale }: LocaleProp) {
  const t = storeScreenCopy[locale];

  const stores = [
    { name: "LIDL", letter: "L", selected: true },
    { name: "Aldi Süd/Nord", letter: "A", selected: false },
    { name: "REWE", letter: "R", selected: true },
    { name: "EDEKA", letter: "E", selected: false },
    { name: "Penny", letter: "P", selected: false },
    { name: "Netto", letter: "N", selected: false },
    { name: "Kaufland", letter: "K", selected: false },
    { name: "tegut", letter: "T", selected: false },
  ];

  return (
    <div className="h-full bg-white font-sans">
      <StatusBar />

      <div className="flex items-center justify-between px-[20px] pt-[6px]">
        <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-surface-2 text-black">
          <IconChevronDown
            className="h-[18px] w-[18px] rotate-90"
            strokeWidth={2.4}
          />
        </span>
        {/* onboarding.progress als Punktreihe */}
        <span className="flex items-center gap-[5px]">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className={
                i === 2
                  ? "h-[6px] w-[18px] rounded-pill bg-accent"
                  : `h-[6px] w-[6px] rounded-full ${
                      i < 2 ? "bg-accent" : "bg-surface-3"
                    }`
              }
            />
          ))}
        </span>
        <span className="w-[38px]" />
      </div>

      <div className="px-[20px] pt-[22px]">
        <h3 className="font-sans text-[27px] font-bold leading-[33px] tracking-[-0.5px] text-black">
          {t.title[0]}
          <br />
          {t.title[1]}
        </h3>
        <p className="mt-[8px] text-[15px] leading-[20px] text-ink-soft">
          {t.subtitle}
        </p>

        <div className="mt-[20px] grid grid-cols-2 gap-[11px]">
          {stores.map((store) => (
            <div
              key={store.name}
              className={`relative flex h-[92px] flex-col items-center justify-center gap-[8px] rounded-tile border-[1.6px] ${
                store.selected
                  ? "border-accent bg-accent/[0.06]"
                  : "border-transparent bg-surface-2"
              }`}
            >
              {store.selected ? (
                <span className="absolute right-[8px] top-[8px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-accent text-white">
                  <svg viewBox="0 0 24 24" className="h-[11px] w-[11px]">
                    <path
                      d="m5 13 4.5 4.5L19 7"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : null}
              <span className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-surface-3 text-[15px] font-bold text-ink-soft">
                {store.letter}
              </span>
              <span className="text-[14px] font-semibold text-black">
                {store.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* common.continue */}
      <div className="absolute bottom-[34px] left-[20px] right-[20px]">
        <span className="flex h-[54px] items-center justify-center rounded-tile bg-accent text-[17px] font-semibold text-white">
          {t.continue}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export const appScreens = {
  plan: PlanScreen,
  shopping: ShoppingScreen,
  recipe: RecipeScreen,
  store: StoreScreen,
} as const;

export type AppScreenName = keyof typeof appScreens;
