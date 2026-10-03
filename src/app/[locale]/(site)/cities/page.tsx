import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/shared/config/seo";
import { CitiesPage } from "@/views/cities/cities-page";

export async function generateMetadata({ params }: PageProps<"/[locale]/cities">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cities" });
  return pageMetadata(locale as Locale, "/cities", { title: t("title"), description: t("lead") });
}

export default async function Page({ params }: PageProps<"/[locale]/cities">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <CitiesPage />;
}
