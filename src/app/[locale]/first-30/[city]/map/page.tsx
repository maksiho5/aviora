import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { cityOrNotFound } from "@/features/first30/model/city-param";
import { PlacesMap } from "@/features/first30/ui/places-map";

export async function generateMetadata({ params }: PageProps<"/[locale]/first-30/[city]/map">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "first30.nav" });
  return { title: `${t("map")} · FIRST 30` };
}

export default async function Page({ params }: PageProps<"/[locale]/first-30/[city]/map">) {
  const { locale, city } = await params;
  setRequestLocale(locale as Locale);
  return <PlacesMap cityId={cityOrNotFound(city)} />;
}
