import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/shared/config/seo";
import { StudyPage } from "@/views/study/study-page";

export async function generateMetadata({ params }: PageProps<"/[locale]/study">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "study" });
  return pageMetadata(locale as Locale, "/study", { title: t("kicker"), description: t("lead") });
}

export default async function Page({ params }: PageProps<"/[locale]/study">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <StudyPage />;
}
