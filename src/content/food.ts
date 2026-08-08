import type { EnabledLocale } from "@/i18n/locales";

/**
 * Kuratierte Auswahl der Gerichtsfotos aus dem App-Repo.
 *
 * Quellen: `DishaApp/rezeptbilder/*.webp`, `DishaApp/Frühstück webp/*.webp`
 * und `DishaApp/Mittag Webp/*.webp`. Beim Kopieren nach `public/food/` wurden
 * die Dateinamen auf URL-sichere Slugs gebracht (keine Leerzeichen, keine
 * Umlaute) — die Zuordnung steht hier.
 *
 * Die `alt`-Texte benennen das Gericht, je Locale übersetzt. Wo ein Foto rein
 * dekorativ eingesetzt wird (Hintergrund, Halo), setzt die aufrufende
 * Komponente `alt=""`.
 */

export type FoodPhoto = { src: string; alt: string };
type LocalizedFoodPhoto = { src: string; alt: Record<EnabledLocale, string> };

function resolve(
  locale: EnabledLocale,
  photos: readonly LocalizedFoodPhoto[],
): readonly FoodPhoto[] {
  return photos.map(({ src, alt }) => ({ src, alt: alt[locale] }));
}

/** Erstes Hero-Band — läuft nach links. */
const marqueeRowOneByLocale: readonly LocalizedFoodPhoto[] = [
  {
    src: "haehnchen-reis-brokkoli.webp",
    alt: {
      de: "Hähnchenbrust mit Reis und Brokkoli",
      en: "Chicken breast with rice and broccoli",
    },
  },
  {
    src: "shakshuka.webp",
    alt: { de: "Shakshuka", en: "Shakshuka" },
  },
  {
    src: "kichererbsen-curry-bowl.webp",
    alt: {
      de: "Kichererbsen-Curry-Bowl",
      en: "Chickpea curry bowl",
    },
  },
  {
    src: "spaghetti-bolognese.webp",
    alt: { de: "Spaghetti Bolognese", en: "Spaghetti bolognese" },
  },
  {
    src: "lachs-ofengemuese.webp",
    alt: { de: "Lachs mit Ofengemüse", en: "Salmon with roasted vegetables" },
  },
  {
    src: "kaesespaetzle.webp",
    alt: { de: "Käsespätzle", en: "Käsespätzle (cheese spätzle)" },
  },
  {
    src: "burrito-bowl.webp",
    alt: { de: "Mexikanische Burrito-Bowl", en: "Mexican burrito bowl" },
  },
  {
    src: "vegetarische-lasagne.webp",
    alt: { de: "Vegetarische Lasagne", en: "Vegetarian lasagne" },
  },
  {
    src: "haehnchen-ramen.webp",
    alt: { de: "Hähnchen-Ramen", en: "Chicken ramen" },
  },
  {
    src: "kuerbissuppe.webp",
    alt: { de: "Kürbissuppe", en: "Pumpkin soup" },
  },
];

/** Zweites Hero-Band — läuft nach rechts. */
const marqueeRowTwoByLocale: readonly LocalizedFoodPhoto[] = [
  {
    src: "pesto-pasta.webp",
    alt: { de: "Pesto-Pasta mit Kirschtomaten", en: "Pesto pasta with cherry tomatoes" },
  },
  {
    src: "teriyaki-tofu-reis.webp",
    alt: { de: "Teriyaki-Tofu mit Reis", en: "Teriyaki tofu with rice" },
  },
  {
    src: "frikadellen-kartoffelpueree.webp",
    alt: {
      de: "Frikadellen mit Kartoffelpüree",
      en: "Meatballs with mashed potatoes",
    },
  },
  {
    src: "bauernsalat-fladenbrot.webp",
    alt: {
      de: "Griechischer Bauernsalat mit Fladenbrot",
      en: "Greek salad with flatbread",
    },
  },
  {
    src: "veganer-linsendal.webp",
    alt: { de: "Veganer Linsendal", en: "Vegan lentil dal" },
  },
  {
    src: "airfryer-lachs-spargel.webp",
    alt: {
      de: "Airfryer-Lachsfilet mit Spargel",
      en: "Air-fryer salmon fillet with asparagus",
    },
  },
  {
    src: "fruehstueck-porridge.webp",
    alt: { de: "Porridge zum Frühstück", en: "Porridge for breakfast" },
  },
  {
    src: "chili-sin-carne.webp",
    alt: { de: "Chili sin Carne", en: "Chili sin carne" },
  },
  {
    src: "mittag-wrap-veggie.webp",
    alt: { de: "Vegetarischer Wrap zum Mittag", en: "Vegetarian wrap for lunch" },
  },
  {
    src: "spinat-ricotta-gnocchi.webp",
    alt: {
      de: "Gnocchi mit Spinat und Ricotta",
      en: "Gnocchi with spinach and ricotta",
    },
  },
];

/** Collage in der Privacy-Section. */
const privacyCollageByLocale: readonly LocalizedFoodPhoto[] = [
  {
    src: "gemuesepfanne-tofu.webp",
    alt: { de: "Gemüsepfanne mit Tofu", en: "Vegetable stir-fry with tofu" },
  },
  {
    src: "rote-linsensuppe.webp",
    alt: { de: "Rote Linsensuppe", en: "Red lentil soup" },
  },
  {
    src: "schnitzel-kartoffeln.webp",
    alt: { de: "Schnitzel mit Kartoffeln", en: "Schnitzel with potatoes" },
  },
  {
    src: "fruehstueck-joghurt-bowl.webp",
    alt: { de: "Joghurt-Bowl zum Frühstück", en: "Yogurt bowl for breakfast" },
  },
];

export const marqueeRowOne = (locale: EnabledLocale) =>
  resolve(locale, marqueeRowOneByLocale);

export const marqueeRowTwo = (locale: EnabledLocale) =>
  resolve(locale, marqueeRowTwoByLocale);

export const privacyCollage = (locale: EnabledLocale) =>
  resolve(locale, privacyCollageByLocale);
