import { site } from "@/config/site";
import type { Content } from "@/content/de";

/**
 * English website copy.
 *
 * Origin and rules — mirrors `de.ts`:
 * - Marketing copy adapted from
 *   `DishaApp/appstore/ASO_AppStore_Listing.md` (section „🇬🇧 ENGLISH
 *   (en-US)“) — not invented from scratch.
 * - Terminology aligned with `DishaApp/src/locales/en.json`: Meal Plan ·
 *   Shopping List · Weekly budget · Supermarket · Household · Diet ·
 *   Produce · Dairy · Pantry & legumes · Meat & fish · Everything ·
 *   Vegetarian · Vegan · High Protein.
 * - Tone: calm, concrete, no exclamation marks, no "SAVE NOW".
 * - Premium is an auto-renewing subscription. Never advertise it as
 *   "no subscription" or "one-time purchase".
 */

export const en = {
  meta: {
    /* App Store name (28 chars) + subtitle (29) from the ASO doc, so web SEO
       and App Store ASO share the same core terms. */
    title: "Disha: Budget Meal Planner | AI Weekly Plan & Grocery List",
    titleTemplate: "%s | Disha",
    description:
      "Disha plans your entire week, matched to your budget, your store, and your taste. 7-day plan with recipes and a ready-made shopping list. First plan free, no account needed.",
    ogAlt: "Disha: your weekly plan, your budget, in seconds",
    ogTagline: "AI weekly plan with recipes and a ready-made shopping list",
    keywords: [
      "meal planner",
      "weekly plan",
      "shopping list",
      "budget",
      "meal prep",
      "recipes",
      "cook cheap",
      "menu plan",
      "vegetarian",
      "vegan",
    ],
  },

  nav: {
    howItWorks: "How it works",
    features: "Features",
    pricing: "Pricing",
    faq: "FAQ",
    cta: "Start for free",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
    homeAriaLabel: "Disha – Home",
    mainNav: "Main navigation",
    mainNavMobile: "Main navigation (mobile)",
  },

  hero: {
    headline: ["Your weekly plan.", "Your budget.", "In seconds."],
    subline:
      "Disha plans your entire week, matched to your budget, your store, and your taste.",
    primaryCta: "Start for free",
    secondaryCta: "How it works",
    reassurance: "First plan free · No account needed",
    stats: [
      { value: "7", label: "days planned" },
      { value: "3", label: "meals per day" },
      { value: "0", label: "accounts needed" },
    ],
    marqueeLabel: "Dishes from real Disha weekly plans",
    phoneLabel: "The weekly plan in the Disha app",
    budgetChip: {
      label: "Weekly budget",
      amount: "€51.10",
      remaining: "€8.90 under budget",
    },
    storesAvailability: (iosUrl: string, androidUrl: string) =>
      `Disha is free on the App Store (${iosUrl}) and on Google Play (${androidUrl}).`,
  },

  howItWorks: {
    eyebrow: "In three steps",
    headline: "No more asking “What should I cook this week?”",
    intro:
      "Tell us your weekly budget, where you shop, and how you eat. Disha takes it from there.",
    steps: [
      {
        n: "01",
        title: "Enter budget, store & diet",
        body: "You enter your weekly budget, your supermarket, and how many people you're planning for, plus how you eat. Allergies and ingredients you don't like are excluded right away.",
      },
      {
        n: "02",
        title: "Disha builds your 7-day plan",
        body: "In seconds you have your complete weekly plan: breakfast, lunch, and dinner with real recipes, photos, prep time, and step-by-step instructions.",
      },
      {
        n: "03",
        title: "Check off the shopping list & go",
        body: "Your shopping list is created automatically, sorted by your supermarket's aisles. Check it off with a tap and share it with family or roommates. No backtracking in the store.",
      },
    ],
    phoneLabel: "Onboarding: choosing a supermarket",
  },

  features: {
    eyebrow: "What's inside",
    headline: "Your personal budget cook",
    intro:
      "Everything you need to cook through a relaxed week, and nothing you don't.",
    items: [
      {
        icon: "calendar",
        title: "A complete weekly plan in seconds",
        body: "7 days, up to 3 meals a day. You choose which meals and which days of the week get planned.",
      },
      {
        icon: "wallet",
        title: "Reliably stays in budget",
        body: "You see the estimated costs up front: per dish and for the whole week. No guessing at checkout.",
      },
      {
        icon: "recycle",
        title: "Smart use of leftovers",
        body: "Disha reuses ingredients across multiple dishes: less waste, less leftovers piling up in your fridge.",
      },
      {
        icon: "cart",
        title: "Matched to your supermarket",
        body: "Your plans and prices are tuned to Lidl, Aldi, Rewe, Edeka, Penny, Netto, Kaufland, and more. Your shopping list follows your store's aisles.",
      },
      {
        icon: "leaf",
        title: "For every diet",
        body: "Everything, vegetarian, vegan, pescatarian, high protein, low carb: you choose what fits you. Allergies and unwanted ingredients are handled automatically.",
      },
      {
        icon: "users",
        title: "For 1 to 4+ people",
        body: "Your quantities and budget adjust automatically to your household, from “just me” to “4 or more”.",
      },
      {
        icon: "shield",
        title: "Private by design",
        body: "No account, no sign-up, no email. Your plans stay local on your device. No tracking, no ads.",
      },
      {
        icon: "swap",
        title: "Don't like a dish? Swap it.",
        body: "Replace any dish with a new one in one tap. The shopping list updates automatically.",
      },
    ],
  },

  showcase: {
    eyebrow: "What Disha feels like",
    headline: "Food comes first. Everything else steps back.",
    intro:
      "Three screens you use every day, calm, fast, and without a menu maze.",
    scenes: [
      {
        screen: "plan" as const,
        label: "Weekly plan",
        title: "Your week at a glance",
        body: "At the top you see your weekly budget with progress, below it every day with its dishes. Tap a dish to open the recipe, swipe to switch days.",
        highlights: [
          "Weekly budget with estimated costs",
          "Breakfast, lunch, and dinner per day",
          "Supermarket, household, and diet always visible",
        ],
      },
      {
        screen: "recipe" as const,
        label: "Recipe",
        title: "Real recipes, no placeholders",
        body: "You get the ingredients in the right amount for your household, step-by-step preparation, nutrition facts per serving, and the estimated price.",
        highlights: [
          "Prep time and servings",
          "Nutrition facts per serving",
          "Save or swap a dish",
        ],
      },
      {
        screen: "shopping" as const,
        label: "Shopping list",
        title: "Sorted by your store's aisles",
        body: "Produce, dairy, pantry & legumes: everything grouped the way you walk through the store. Check items off with a tap and share by message.",
        highlights: [
          "Live progress and total",
          "Grouped by supermarket aisle",
          "Shareable with family or roommates",
        ],
      },
    ],
    phoneLabel: "The Disha app on iPhone",
    scenePhoneLabel: (label: string) => `${label} in the Disha app`,
  },

  privacy: {
    eyebrow: "Private by design",
    headline: "We don't know what you're cooking.",
    body: "Disha doesn't need an account or an email address. All plans, shopping lists, and settings live exclusively on your device. When you create a new plan, only your plan settings are sent to the AI: budget, country, supermarket, household size, diet, allergies, unwanted ingredients, preferences, and kitchen equipment. No name, no email, no precise location.",
    points: [
      {
        title: "No account",
        body: "No sign-up, no login, no email required. You open the app and get going.",
      },
      {
        title: "Data stays local",
        body: "Your plans and shopping lists stay stored on your device. There is no cloud sync.",
      },
      {
        title: "No tracking",
        body: "No ad trackers, no usage profile, no ads. Not even on this website.",
      },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    headline: "First weekly plan free. You decide after that.",
    intro:
      "Your first plan after onboarding is completely free: no teaser, ready to use right away. Disha Premium unlocks unlimited AI weekly plans and the full shopping list.",
    plans: [
      {
        id: "monthly" as const,
        name: "Monthly",
        price: site.pricing.monthly.amount,
        period: "per month",
        note: "Stay flexible",
        recommended: false,
        cta: "Open in App Store",
      },
      {
        id: "yearly" as const,
        name: "Yearly",
        price: site.pricing.yearly.amount,
        period: "per year",
        note: "Equivalent to €3.75 per month",
        badge: "Save 25%",
        recommended: true,
        cta: "Open in App Store",
      },
    ],
    includes: {
      title: "Included in Disha Premium",
      items: [
        "Unlimited AI weekly plans",
        "Full shopping list, sorted by aisle",
        "Unlimited dish swaps",
        "Every diet style, allergies & exclusions",
        "Nutrition facts per serving",
        "Share your list and check off together",
      ],
    },
    reassurance:
      "First weekly plan completely free · Auto-renewing subscription · Cancel anytime",
    /* Legal text mirrors the App Store description (Guideline 3.1.2). */
    legal:
      "Disha Premium is an auto-renewable subscription: €4.99 per month or €44.99 per year (about 25% off). Payment is charged to your Apple ID account at confirmation of purchase. The subscription renews automatically unless canceled at least 24 hours before the end of the current period. Your account is charged for renewal within 24 hours prior to the end of the current period. Manage or cancel subscriptions anytime in your Apple ID account settings. Prices may vary by region.",
    eulaLabel: "Terms of Use (EULA)",
  },

  faq: {
    eyebrow: "Frequently asked questions",
    headline: "What you want to know before you download",
    items: [
      {
        q: "Do I need an account?",
        a: "No. Disha has no account and no login. You don't need an email address and don't have to register anywhere. After onboarding, your plan is ready.",
      },
      {
        q: "What happens after the first free plan?",
        a: "Your first weekly plan is fully usable and costs nothing. If you then want to create new plans with AI or use the full shopping list, Disha Premium unlocks that: €4.99 per month or €44.00 per year. Your first plan stays yours to keep.",
      },
      {
        q: "How do I cancel my subscription?",
        a: "Disha Premium is an auto-renewing subscription and can be canceled anytime. It's managed through your store account: on iPhone under Settings → Apple ID → Subscriptions, on Android in the Play Store under Payments & subscriptions. Cancel at least 24 hours before the end of the current period so it doesn't renew.",
      },
      {
        q: "Does Disha work for vegetarian or vegan diets?",
        a: "Yes. You choose between everything, vegetarian, vegan, pescatarian, halal, low carb, gluten-free, and lactose-free. On top of that come allergies and intolerances, as well as individual ingredients you can specifically exclude. Disha leaves them out of every plan.",
      },
      {
        q: "Is my data stored or shared anywhere?",
        a: "Your plans, shopping lists, and settings stay local on your device. There's no account and no cloud sync. For a new AI plan, only your plan settings are transmitted: budget, country, supermarket, household size, diet, allergies, unwanted ingredients, preferences, and kitchen equipment. No name, no email, no precise location. Disha contains no ad trackers.",
      },
      {
        q: "Which supermarkets are supported?",
        a: "In Germany, among others, Aldi Süd/Nord, Lidl, Penny, Netto, Rewe, Edeka, Kaufland, Globus, and tegut. You can choose up to three. Disha calculates using their price level and sorts your shopping list by their aisles. Austria, Switzerland, and other countries are also supported, and the list keeps growing.",
      },
      {
        q: "Is Disha also available for Android?",
        a: "Yes. Disha is available on the App Store for iPhone and on the Google Play Store for Android.",
      },
      {
        q: "Does Disha need an internet connection?",
        a: "Only when you create a new AI plan or swap a dish. Your already-created weekly plan, including recipes and shopping list, works offline, handy when the signal is weak at the supermarket.",
      },
      {
        q: "How accurate are the price estimates?",
        a: "Disha calculates using the typical price level of your supermarket in your region and shows the estimated costs up front: per dish and for the week. These are estimates, not up-to-the-minute checkout prices: promotions, private-label products, and regional differences can vary.",
      },
    ],
  },

  finalCta: {
    headline: "Get your first weekly plan.",
    body: "Free, no account, you'll be ready to go in under two minutes.",
    reassurance: "First plan free · No account · No tracking",
  },

  footer: {
    tagline:
      "Your meal planner that knows your budget. One weekly plan, one shopping list, no guesswork.",
    productHeading: "Product",
    legalHeading: "Legal",
    contactHeading: "Contact",
    contactLabel: "Questions, feedback, or a problem?",
    copyright: (year: number) => `© ${year} Disha. All rights reserved.`,
    appleDisclaimer:
      "Apple, the Apple logo, and App Store are trademarks of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.",
  },

  badges: {
    appStore: "Download on the App Store",
    googlePlay: "Get it on Google Play",
  },

  legalCommon: {
    backToHome: "Back to homepage",
    lastUpdated: "Last updated",
    tocHeading: "On this page",
    todoHeading: "To clarify before launch",
  },
} satisfies Content;
