"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import { CalendarIcon, Pin, Today, Wallet } from "@/shared/ui/icons";
import type { CityId } from "../model/types";

const tabs = [
  { segment: "", key: "today", Icon: Today },
  { segment: "/timeline", key: "timeline", Icon: CalendarIcon },
  { segment: "/map", key: "map", Icon: Pin },
  { segment: "/budget", key: "budget", Icon: Wallet },
] as const;

function useTabs(city: CityId) {
  const pathname = usePathname();
  const base = `/first-30/${city}`;
  return tabs.map((tab) => {
    const href = `${base}${tab.segment}`;
    const current = tab.segment === "" ? pathname === base || pathname.startsWith(`${base}/tasks`) : pathname.startsWith(href);
    return { ...tab, href, current };
  });
}

export function AppTabsDesktop({ city }: { city: CityId }) {
  const t = useTranslations("first30.nav");
  return (
    <nav aria-label={t("app")} className="hidden md:block">
      <ul className="flex rounded-full bg-surface-2 p-1">
        {useTabs(city).map(({ href, key, current }) => (
          <li key={key}>
            <Link
              href={href}
              aria-current={current ? "page" : undefined}
              className={cn(
                "inline-flex min-h-10 items-center rounded-full px-4 text-sm font-semibold no-underline transition-colors",
                current ? "bg-surface text-text shadow-[var(--shadow-pop)]" : "text-muted hover:text-text",
              )}
            >
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function AppTabsMobile({ city }: { city: CityId }) {
  const t = useTranslations("first30.nav");
  return (
    <nav
      aria-label={t("app")}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-4">
        {useTabs(city).map(({ href, key, current, Icon }) => (
          <li key={key}>
            <Link
              href={href}
              aria-current={current ? "page" : undefined}
              className={cn(
                "flex h-16 flex-col items-center justify-center gap-1 text-xs font-semibold no-underline",
                current ? "text-accent" : "text-muted",
              )}
            >
              <Icon size={22} />
              {t(key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
