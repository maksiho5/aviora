import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getItalyCity, italyCities } from "@/content/cities";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/shared/config/seo";
import { CityPage } from "@/views/cities/city-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => italyCities.map((city) => ({ locale, slug: city.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/cities/[slug]">) {
  const { locale, slug } = await params;
  const city = getItalyCity(slug);
  if (!city) return {};
  const lang = locale as Locale;
  return pageMetadata(lang, `/cities/${slug}`, { title: city.name[lang], description: city.intro[lang] });
}

export default async function Page({ params }: PageProps<"/[locale]/cities/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const city = getItalyCity(slug);
  if (!city) notFound();
  return <CityPage city={city} />;
}
