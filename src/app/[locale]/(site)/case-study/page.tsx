import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/shared/config/seo";
import { CaseStudyPage } from "@/views/case-study/case-study-page";

export async function generateMetadata({ params }: PageProps<"/[locale]/case-study">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudy" });
  return pageMetadata(locale as Locale, "/case-study", { title: t("title"), description: t("lead") });
}

export default async function Page({ params }: PageProps<"/[locale]/case-study">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <CaseStudyPage />;
}
