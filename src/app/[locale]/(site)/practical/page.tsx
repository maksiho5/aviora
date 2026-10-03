import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/shared/config/seo";
import { PracticalPage } from "@/views/practical/practical-page";

export async function generateMetadata({ params }: PageProps<"/[locale]/practical">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "practical" });
  return pageMetadata(locale as Locale, "/practical", { title: t("kicker"), description: t("lead") });
}

export default async function Page({ params }: PageProps<"/[locale]/practical">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <PracticalPage />;
}
