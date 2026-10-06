"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Minus, Plus } from "@/shared/ui/icons";
import { getCity } from "../data";
import { budgetLines, firstMonthTotal, monthlyTotal, resolveBudget } from "../model/budget";
import { tasksForProfile } from "../model/priorities";
import { useFirst30Store, useStoreHydrated } from "../model/store";
import type { BudgetCategory, CityId } from "../model/types";

const STEP = 10;

const segmentColor: Record<BudgetCategory, string> = {
  rent: "bg-forest",
  food: "bg-olive",
  transport: "bg-mahogany",
  phone: "bg-oatmeal",
  health: "bg-linen",
  fun: "bg-surface-3",
};

export function Budget({ cityId }: { cityId: CityId }) {
  const t = useTranslations("first30.budget");
  const locale = useLocale() as Locale;
  const hydrated = useStoreHydrated();
  const overrides = useFirst30Store((state) => state.budgets[cityId]);
  const profile = useFirst30Store((state) => state.profiles[cityId]);
  const setBudgetLine = useFirst30Store((state) => state.setBudgetLine);
  const resetBudget = useFirst30Store((state) => state.resetBudget);

  const city = getCity(cityId);
  const budget = resolveBudget(city.budget, hydrated ? overrides : undefined);
  const monthly = monthlyTotal(budget);
  const tasks = tasksForProfile(city.tasks, { nonEu: profile?.nonEu ?? true });
  const firstMonth = firstMonthTotal(budget, tasks);
  const money = new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

  return (
    <div>
      <h1 className="t-display-l">{t("title")}</h1>
      <p className="t-body-l mt-3 text-muted">{t("lead")}</p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[var(--radius-lg)] bg-surface p-7">
          <p className="text-sm font-semibold text-muted">{t("typical")}</p>
          <p className="t-price mt-3" aria-live="polite">
            {money.format(monthly)}
          </p>
        </div>
        <div className="rounded-[var(--radius-lg)] bg-deep p-7 text-on-deep">
          <p className="text-sm font-semibold text-on-deep-muted">{t("firstMonth")}</p>
          <p className="t-price mt-3">{money.format(firstMonth)}</p>
          <p className="mt-2 text-sm text-on-deep-muted">{t("firstMonthNote")}</p>
        </div>
      </div>

      <div className="mt-10 flex h-3 overflow-hidden rounded-full" aria-hidden="true">
        {budgetLines.map((line) => (
          <div
            key={line}
            className={`${segmentColor[line]} border-r-2 border-bg transition-[flex-grow] duration-[var(--dur-base)] last:border-r-0`}
            style={{ flexGrow: budget[line] }}
          />
        ))}
      </div>

      <ul className="mt-6 divide-y divide-line rounded-[var(--radius-lg)] bg-surface">
        {budgetLines.map((line) => {
          const label = t(`lines.${line}`);
          const share = monthly > 0 ? Math.round((budget[line] / monthly) * 100) : 0;
          return (
            <li key={line} className="flex flex-wrap items-center gap-4 px-5 py-4">
              <span className={`size-3 shrink-0 rounded-full ${segmentColor[line]}`} aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <label htmlFor={`budget-${line}`} className="block font-medium">
                  {label}
                </label>
                <span className="block text-xs text-muted">{t("share", { percent: share })}</span>
              </span>
              <span className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setBudgetLine(cityId, line, budget[line] - STEP)}
                  aria-label={t("decrease", { line: label })}
                  className="grid size-11 place-items-center rounded-full border border-line hover:bg-surface-2"
                >
                  <Minus size={16} />
                </button>
                <span className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">€</span>
                  <input
                    id={`budget-${line}`}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={10000}
                    step={STEP}
                    value={budget[line]}
                    onChange={(event) => setBudgetLine(cityId, line, Math.min(10000, Number(event.target.value) || 0))}
                    className="num h-11 w-24 rounded-[var(--radius-sm)] border border-control bg-bg pl-7 pr-2 text-right font-semibold"
                  />
                </span>
                <button
                  type="button"
                  onClick={() => setBudgetLine(cityId, line, budget[line] + STEP)}
                  aria-label={t("increase", { line: label })}
                  className="grid size-11 place-items-center rounded-full border border-line hover:bg-surface-2"
                >
                  <Plus size={16} />
                </button>
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">{t("note")}</p>
        <button type="button" onClick={() => resetBudget(cityId)} className="min-h-11 text-sm font-semibold link-underline">
          {t("reset")}
        </button>
      </div>

    </div>
  );
}
