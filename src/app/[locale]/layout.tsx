import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/shared/config/site";
import { themeBootScript } from "@/shared/config/theme";
import { RevealObserver } from "@/shared/ui/reveal-observer";
import { sans, serif } from "../fonts";
import "../globals.css";

/** Only namespaces used by client components are serialized into the page. */
const CLIENT_NAMESPACES = ["nav", "theme", "telegram", "first30"] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: { default: t("title"), template: "%s · Aviora" },
    description: t("description"),
    applicationName: site.name,
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f3ed" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1d1e" },
  ],
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(CLIENT_NAMESPACES.map((key) => [key, messages[key]]));

  return (
    <html lang={locale} data-theme="light" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={clientMessages}>
          {children}
          <RevealObserver />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
