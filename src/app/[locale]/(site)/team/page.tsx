import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/shared/config/seo";
import { TeamPage } from "@/views/team/team-page";

export async function generateMetadata({ params }: PageProps<"/[locale]/team">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  return pageMetadata(locale as Locale, "/team", { title: t("title"), description: t("lead") });
}

export default async function Page({ params }: PageProps<"/[locale]/team">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return <TeamPage />;
}
