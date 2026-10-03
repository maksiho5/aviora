import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { cityOrNotFound } from "@/features/first30/model/city-param";
import { Timeline } from "@/features/first30/ui/timeline";

export async function generateMetadata({ params }: PageProps<"/[locale]/first-30/[city]/timeline">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "first30.nav" });
  return { title: `${t("timeline")} · FIRST 30` };
}

export default async function Page({ params }: PageProps<"/[locale]/first-30/[city]/timeline">) {
  const { locale, city } = await params;
  setRequestLocale(locale as Locale);
  return <Timeline cityId={cityOrNotFound(city)} />;
}
