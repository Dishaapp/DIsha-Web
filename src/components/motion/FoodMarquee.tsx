import Image from "next/image";

type MarqueeRow = {
  /** Dateinamen aus /public/food, ohne Pfad. */
  images: readonly { src: string; alt: string }[];
  /** Laufrichtung. */
  reverse?: boolean;
  /** Dauer eines vollen Durchlaufs. Größer = langsamer. */
  durationSeconds?: number;
};

/**
 * Endlos laufendes Band mit echten Gerichtsfotos aus der App.
 *
 * Umsetzung ohne JavaScript: die Liste steht zweimal im DOM, das Band
 * verschiebt sich per CSS um exakt -50 %. Dadurch ist der Übergang nahtlos und
 * es gibt keinen Layout-Thrash beim Scrollen. Der zweite Durchlauf ist
 * `aria-hidden`, damit Screenreader die Bilder nicht doppelt vorlesen.
 */
export function FoodMarquee({
  images,
  reverse = false,
  durationSeconds = 70,
}: MarqueeRow) {
  const track = (
    <ul className="flex shrink-0 items-center gap-4 pr-4">
      {images.map((image) => (
        <li key={image.src} className="shrink-0">
          <div className="relative h-40 w-56 overflow-hidden rounded-card sm:h-48 sm:w-64">
            <Image
              src={`/food/${image.src}`}
              alt={image.alt}
              fill
              // Feste Kachelgröße → schmale Kandidaten reichen aus.
              sizes="(max-width: 640px) 224px, 256px"
              className="object-cover"
            />
            {/* Leichter Scrim, damit die Fotos auf Dunkel nicht ausbrechen */}
            <div className="pointer-events-none absolute inset-0 bg-night/15" />
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="fade-x overflow-hidden">
      <div
        className="flex w-max"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${durationSeconds}s linear infinite`,
        }}
      >
        {track}
        <div aria-hidden className="flex">
          {track}
        </div>
      </div>
    </div>
  );
}
