import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { cityOrNotFound, cityStaticParams } from "@/features/first30/model/city-param";
import { AppShell } from "@/features/first30/ui/app-shell";

export const dynamicParams = false;

export const generateStaticParams = cityStaticParams;

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default async function First30Layout({ children, params }: LayoutProps<"/[locale]/first-30/[city]">) {
  const { locale, city } = await params;
  setRequestLocale(locale as Locale);
  return <AppShell city={cityOrNotFound(city)}>{children}</AppShell>;
}
