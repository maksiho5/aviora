import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/shared/config/seo";
import { MentorshipPage } from "@/views/mentorship/mentorship-page";

export async function generateMetadata({ params }: PageProps<"/[locale]/mentorship">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "mentorship" });
  return pageMetadata(locale as Locale, "/mentorship", { title: t("eyebrow"), description: t("lead") });
}

export default async function Page({ params }: PageProps<"/[locale]/mentorship">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <MentorshipPage />;
}
