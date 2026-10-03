import type { Locale } from "@/i18n/routing";
import { italyCities } from "@/content/cities";
import { images } from "@/shared/assets/images";
import type { CityRow } from "./city-index";

export function cityRows(locale: Locale): CityRow[] {
  return italyCities.map((city) => ({
    slug: city.slug,
    name: city.name[locale],
    rhythm: city.rhythm[locale],
    region: city.region[locale],
    image: images[city.image],
    imageAlt: city.imageAlt[locale],
  }));
}
