"use client";

import { useLocale, useTranslations } from "next-intl";
import { useId, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import { getCity } from "../data";
import { dayOfStay, parseIsoDate, toIsoDate } from "../model/day";
import { tasksForProfile } from "../model/priorities";
import { useFirst30Store, useStoreHydrated } from "../model/store";
import type { CityId } from "../model/types";
import { useToday } from "../model/use-today";

type Permit = "no" | "yes" | "unsure";
type Step = 0 | 1 | 2 | 3;

const TOTAL_STEPS = 3;
const PAST_LIMIT_DAYS = 60;
const FUTURE_LIMIT_DAYS = 365;

function shiftDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function Choice({ checked, onChange, children }: { checked: boolean; onChange: () => void; children: React.ReactNode }) {
  return (
    <label
      className={cn(
        "flex min-h-16 cursor-pointer items-center gap-4 rounded-[var(--radius-md)] border px-5 py-4 transition-colors",
        checked ? "border-accent bg-accent-soft" : "border-line bg-surface hover:bg-surface-2",
      )}
    >
      {children}
      <input type="radio" name="permit" checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden="true"
        className={cn("ml-auto size-5 shrink-0 rounded-full border-2", checked ? "border-accent bg-accent shadow-[inset_0_0_0_3px_var(--surface)]" : "border-control")}
      />
    </label>
  );
}

export function Onboarding({ cityId }: { cityId: CityId }) {
  const t = useTranslations("first30.onboarding");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const startJourney = useFirst30Store((state) => state.startJourney);
  const city = getCity(cityId);
  const dateId = useId();
  const errorId = useId();

  const hydrated = useStoreHydrated();
  const todayIso = useToday();
  const today = parseIsoDate(todayIso);
  const [step, setStep] = useState<Step>(0);
  const [arrival, setArrival] = useState(todayIso);
  const [dateError, setDateError] = useState(false);
  const [permit, setPermit] = useState<Permit>("yes");
  const [alreadyDone, setAlreadyDone] = useState<string[]>([]);

  const minDate = toIsoDate(shiftDays(today, -PAST_LIMIT_DAYS));
  const maxDate = toIsoDate(shiftDays(today, FUTURE_LIMIT_DAYS));
  const nonEu = permit !== "no";

  const quickWins = tasksForProfile(city.tasks, { nonEu }).filter(
    (task) => task.window[0] <= 2 && task.urgency !== "easy",
  );

  const next = () => {
    if (step === 0 && (!arrival || arrival < minDate || arrival > maxDate)) {
      setDateError(true);
      document.getElementById(dateId)?.focus();
      return;
    }
    setDateError(false);
    if (step === 2) {
      startJourney({ city: cityId, arrivalDate: arrival, nonEu }, alreadyDone);
    }
    setStep((value) => Math.min(value + 1, 3) as Step);
  };

  const toggleDone = (id: string) =>
    setAlreadyDone((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  if (step === 3) {
    const day = dayOfStay(arrival, today);
    return (
      <div className="animate-rise mx-auto max-w-[560px] py-8 text-center">
        <h1 className="t-display-l">{t("readyTitle")}</h1>
        <p className="t-body-l mt-5 text-muted">
          {day > 0 ? t("readyDay", { day }) : day === 0 ? t("readyDay", { day: 0 }) : t("readyBefore", { days: 1 - day })}
        </p>
        <Button className="mt-10" onClick={() => router.push(`/first-30/${cityId}`)}>
          {t("finish")}
        </Button>
        <p className="mt-6 text-sm text-muted">{t("privacy")}</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        next();
      }}
      className="mx-auto max-w-[560px]"
    >
      <p className="text-sm font-semibold text-muted">{t("step", { current: step + 1, total: TOTAL_STEPS })}</p>
      <div className="mt-3 h-1 rounded-full bg-accent-soft" aria-hidden="true">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-[var(--dur-base)]"
          style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {step === 0 && (
        <fieldset key="arrival" className="animate-fade mt-10">
          <legend className="t-display-l">{t("arrivalQuestion", { city: city.name[locale] })}</legend>
          <p className="mt-4 text-muted">{t("arrivalHelp")}</p>
          <div className="mt-8 flex flex-wrap items-end gap-3">
            <div className="flex-1">
              <label htmlFor={dateId} className="text-sm font-semibold">
                {t("arrivalLabel")}
              </label>
              <input
                id={dateId}
                type="date"
                value={arrival}
                min={minDate}
                max={maxDate}
                required
                aria-invalid={dateError}
                aria-describedby={dateError ? errorId : undefined}
                onChange={(event) => setArrival(event.target.value)}
                className="mt-2 block min-h-14 w-full rounded-[var(--radius-sm)] border border-control bg-surface px-4 text-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => setArrival(todayIso)}
              className="min-h-14 rounded-[var(--radius-sm)] border border-line bg-surface-2 px-5 font-semibold hover:bg-surface-3"
            >
              {t("today")}
            </button>
          </div>
          {dateError && (
            <p id={errorId} className="mt-3 text-sm font-medium text-red-ink">
              {t("arrivalError")}
            </p>
          )}
        </fieldset>
      )}

      {step === 1 && (
        <fieldset key="permit" className="animate-fade mt-10">
          <legend className="t-display-l">{t("permitQuestion")}</legend>
          <p className="mt-4 text-muted">{t("permitHelp")}</p>
          <div className="mt-8 space-y-3">
            {(["no", "yes", "unsure"] as const).map((option) => (
              <Choice key={option} checked={permit === option} onChange={() => setPermit(option)}>
                <span className="font-medium">{t(`permit${option[0].toUpperCase()}${option.slice(1)}` as "permitNo")}</span>
              </Choice>
            ))}
          </div>
          {permit === "unsure" && <p className="mt-4 text-sm text-muted">{t("permitUnsureNote")}</p>}
        </fieldset>
      )}

      {step === 2 && (
        <fieldset key="done" className="animate-fade mt-10">
          <legend className="t-display-l">{t("doneQuestion")}</legend>
          <p className="mt-4 text-muted">{t("doneHelp")}</p>
          <div className="mt-8 space-y-3">
            {quickWins.map((task) => {
              const checked = alreadyDone.includes(task.id);
              return (
                <label
                  key={task.id}
                  className={cn(
                    "flex min-h-16 cursor-pointer items-center gap-4 rounded-[var(--radius-md)] border px-5 py-4 transition-colors",
                    checked ? "border-accent bg-accent-soft" : "border-line bg-surface hover:bg-surface-2",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleDone(task.id)}
                    className="size-5 shrink-0 accent-[var(--accent)]"
                  />
                  <span className="font-medium">{task.title[locale]}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="mt-12 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((value) => (value - 1) as Step)}
            className="min-h-11 px-2 font-semibold link-underline"
          >
            {t("back")}
          </button>
        ) : (
          <span />
        )}
        <Button type="submit" disabled={!hydrated}>{step === 2 && alreadyDone.length === 0 ? t("nothingYet") : t("continue")}</Button>
      </div>
      <p className="mt-8 text-center text-sm text-muted">{t("privacy")}</p>
    </form>
  );
}
