"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cities, cityIds } from "@/features/first30/data";
import { dayOfStay } from "@/features/first30/model/day";
import { useFirst30Store, useStoreHydrated } from "@/features/first30/model/store";
import { buttonClass } from "@/shared/ui/button";
import { TelegramButton } from "@/shared/ui/telegram-button";

const terms = {
  milan: ["Codice fiscale", "Permesso", "ATM"],
  amsterdam: ["BSN", "Gemeente", "OVpay"],
} as const;

export function CityCards() {
  const t = useTranslations("first30.landing");
  const locale = useLocale() as Locale;
  const hydrated = useStoreHydrated();
  const profiles = useFirst30Store((state) => state.profiles);

  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {cityIds.map((id) => {
        const city = cities[id];
        const profile = hydrated ? profiles[id] : undefined;
        const day = profile ? Math.max(1, dayOfStay(profile.arrivalDate, new Date())) : null;
        return (
          <li key={id} className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-7">
            <p className="t-eyebrow text-muted">{city.country[locale]}</p>
            <h3 className="mt-3 font-serif text-[2.75rem] italic leading-none">{city.name[locale]}</h3>
            <p className="mt-4 text-muted">{city.tagline[locale]}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {terms[id].map((term) => (
                <li key={term} className="rounded-full bg-surface-2 px-3 py-1 text-sm">
                  {term}
                </li>
              ))}
            </ul>
            <p className="num mt-6 text-sm text-muted">
              {t("tasks", { count: city.tasks.length })} · {day ? t("continue", { day }) : t("notStarted")}
            </p>
            <Link
              href={profile ? `/first-30/${id}` : `/first-30/${id}/onboarding`}
              className={buttonClass(id === "milan" ? "primary" : "secondary", "mt-6 self-start")}
            >
              {t("open", { city: city.name[locale] })}
            </Link>
          </li>
        );
      })}
      <li className="flex flex-col rounded-[var(--radius-lg)] border border-dashed border-line-strong p-7">
        <p className="font-serif text-[2rem] italic leading-tight">{t("nextCity")}</p>
        <p className="mt-3 text-muted">{t("nextCityText")}</p>
        <TelegramButton variant="link" className="mt-auto pt-6" />
      </li>
    </ul>
  );
}
