import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "./site";

export function pageMetadata(locale: Locale, path: string, meta: { title: string; description?: string }): Metadata {
  const suffix = path === "/" ? "" : path;
  return {
    title: path === "/" ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}${suffix}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${suffix}`])),
        "x-default": `/${routing.defaultLocale}${suffix}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: site.name,
      locale,
      type: "website",
    },
  };
}
