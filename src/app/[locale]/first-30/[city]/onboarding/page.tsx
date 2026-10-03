import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { cityOrNotFound } from "@/features/first30/model/city-param";
import { Onboarding } from "@/features/first30/ui/onboarding";

export async function generateMetadata({ params }: PageProps<"/[locale]/first-30/[city]/onboarding">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "first30.nav" });
  return { title: `${t("today")} · FIRST 30` };
}

export default async function Page({ params }: PageProps<"/[locale]/first-30/[city]/onboarding">) {
  const { locale, city } = await params;
  setRequestLocale(locale as Locale);
  return <Onboarding cityId={cityOrNotFound(city)} />;
}
