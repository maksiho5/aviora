import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { LanguageSwitch } from "@/shared/ui/language-switch";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { cityIds, getCity } from "../data";
import type { CityId } from "../model/types";
import { AppTabsDesktop, AppTabsMobile } from "./app-nav";
import { CitySwitch } from "./city-switch";

export function AppShell({ city, children }: { city: CityId; children: React.ReactNode }) {
  const t = useTranslations("first30");
  const nav = useTranslations("nav");
  const locale = useLocale() as Locale;

  return (
    <div className="min-h-dvh pb-24 md:pb-0">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-accent px-5 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {nav("skip")}
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-bg">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-4 px-[var(--gutter)]">
          <Link href="/" aria-label={nav("home")} className="font-serif text-2xl font-semibold tracking-[0.02em] no-underline">
            Aviora
          </Link>
          {cityIds.length > 1 ? (
            <CitySwitch current={city} />
          ) : (
            <span className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm font-semibold">
              {getCity(city).name[locale]}
            </span>
          )}
          <div className="ml-auto flex items-center gap-3">
            <AppTabsDesktop city={city} />
            <LanguageSwitch />
            <ThemeToggle className="hidden lg:inline-flex" />
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="mx-auto max-w-[1120px] px-[var(--gutter)] py-8 outline-none md:py-12">
        {children}
      </main>

      <footer className="mx-auto max-w-[1120px] border-t border-line px-[var(--gutter)] py-6 text-sm text-muted">
        <p>{t("footer")}</p>
        <Link href="/" className="mt-2 inline-flex min-h-11 items-center font-semibold text-text link-underline">
          {t("nav.back")}
        </Link>
      </footer>

      <AppTabsMobile city={city} />
    </div>
  );
}
