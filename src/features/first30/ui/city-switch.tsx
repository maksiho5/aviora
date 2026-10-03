"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";
import { Check, ChevronDown } from "@/shared/ui/icons";
import { cities, cityIds } from "../data";
import { useFirst30Store } from "../model/store";
import type { CityId } from "../model/types";

export function CitySwitch({ current }: { current: CityId }) {
  const t = useTranslations("first30");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const setActiveCity = useFirst30Store((state) => state.setActiveCity);
  const profiles = useFirst30Store((state) => state.profiles);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const choose = (city: CityId) => {
    setOpen(false);
    setActiveCity(city);
    router.push(profiles[city] ? `/first-30/${city}` : `/first-30/${city}/onboarding`);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={t("city.current", { city: cities[current].name[locale] })}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold"
      >
        {cities[current].name[locale]}
        <ChevronDown size={16} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="animate-fade absolute left-0 top-full z-50 mt-2 w-64 rounded-[var(--radius-md)] border border-line bg-surface p-2 shadow-[var(--shadow-pop)]">
          <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">{t("city.switch")}</p>
          <ul>
            {cityIds.map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => choose(id)}
                  aria-current={id === current ? "true" : undefined}
                  className="flex min-h-12 w-full items-center justify-between gap-3 rounded-[var(--radius-sm)] px-3 text-left hover:bg-surface-2"
                >
                  <span>
                    <span className="block font-semibold">{cities[id].name[locale]}</span>
                    <span className="block text-xs text-muted">{cities[id].country[locale]}</span>
                  </span>
                  {id === current && <Check size={18} className="text-accent" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
