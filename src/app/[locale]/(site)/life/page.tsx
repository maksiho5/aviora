import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/shared/config/seo";
import { LifePage } from "@/views/life/life-page";

export async function generateMetadata({ params }: PageProps<"/[locale]/life">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "life" });
  return pageMetadata(locale as Locale, "/life", { title: t("kicker"), description: t("lead") });
}

export default async function Page({ params }: PageProps<"/[locale]/life">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <LifePage />;
}
