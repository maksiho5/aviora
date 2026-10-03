import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { cityOrNotFound } from "@/features/first30/model/city-param";
import { Budget } from "@/features/first30/ui/budget";

export async function generateMetadata({ params }: PageProps<"/[locale]/first-30/[city]/budget">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "first30.nav" });
  return { title: `${t("budget")} · FIRST 30` };
}

export default async function Page({ params }: PageProps<"/[locale]/first-30/[city]/budget">) {
  const { locale, city } = await params;
  setRequestLocale(locale as Locale);
  return <Budget cityId={cityOrNotFound(city)} />;
}
