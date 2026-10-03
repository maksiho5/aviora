import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/shared/config/seo";
import { LegalPage } from "@/views/legal/legal-page";

export async function generateMetadata({ params }: PageProps<"/[locale]/legal">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return pageMetadata(locale as Locale, "/legal", { title: t("title"), description: t("adviceText") });
}

export default async function Page({ params }: PageProps<"/[locale]/legal">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <LegalPage />;
}
