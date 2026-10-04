import type { MetadataRoute } from "next";
import { italyCities } from "@/content/cities";
import { cities, cityIds } from "@/features/first30/data";
import { routing } from "@/i18n/routing";
import { site } from "@/shared/config/site";

export const dynamic = "force-static";

const staticPaths = ["", "/study", "/life", "/cities", "/practical", "/mentorship", "/team", "/first-30", "/case-study", "/legal"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPaths,
    ...italyCities.map((city) => `/cities/${city.slug}`),
    ...cityIds.flatMap((city) => cities[city].tasks.map((task) => `/first-30/${city}/tasks/${task.id}`)),
  ];

  return paths.map((path) => ({
    url: `${site.url}/${routing.defaultLocale}${path}`,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((locale) => [locale, `${site.url}/${locale}${path}`])),
    },
  }));
}
