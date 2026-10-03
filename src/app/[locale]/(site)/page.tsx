import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/shared/config/seo";
import { getTranslations } from "next-intl/server";
import { HomePage } from "@/views/home/home-page";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata(locale as Locale, "/", { title: t("title"), description: t("description") });
}

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <HomePage />;
}

export const dynamic = "error";
