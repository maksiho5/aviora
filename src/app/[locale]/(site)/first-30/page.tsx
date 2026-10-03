import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/shared/config/seo";
import { First30Landing } from "@/views/first30/landing-page";

export async function generateMetadata({ params }: PageProps<"/[locale]/first-30">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata(locale as Locale, "/first-30", { title: t("first30Title"), description: t("first30Description") });
}

export default async function Page({ params }: PageProps<"/[locale]/first-30">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <First30Landing />;
}
