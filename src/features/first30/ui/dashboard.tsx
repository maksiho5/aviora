"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ButtonLink } from "@/shared/ui/button";
import { ArrowRight, Check, Lock, Speech } from "@/shared/ui/icons";
import { MONTH_LENGTH } from "../model/day";
import { headlineFor } from "../model/headline";
import type { PlannedTask } from "../model/priorities";
import { useFirst30Store } from "../model/store";
import type { CityId } from "../model/types";
import { useCityPlan } from "../model/use-city-plan";
import { PriorityCard } from "./priority-card";
import { StuckSheet } from "./stuck-sheet";

const pad = (day: number) => String(day).padStart(2, "0");

function DashboardSkeleton({ label }: { label: string }) {
  return (
    <div aria-busy="true" aria-label={label} className="animate-pulse space-y-4">
      <div className="h-3 w-24 rounded bg-surface-3" />
      <div className="h-12 w-3/4 rounded bg-surface-3" />
      {[0, 1, 2].map((key) => (
        <div key={key} className="h-[76px] rounded-[var(--radius-md)] bg-surface-2" />
      ))}
    </div>
  );
}

function AlsoChip({ item, city }: { item: PlannedTask; city: CityId }) {
  const t = useTranslations("first30.dashboard");
  const locale = useLocale() as Locale;
  const blocked = item.state === "blocked";
  const hint = blocked
    ? t("after", { task: item.waitingOn[0]?.title[locale] ?? "" })
    : item.state === "upcoming"
      ? t("opensOn", { day: item.task.window[0] })
      : null;

  return (
    <Link
      href={`/first-30/${city}/tasks/${item.task.id}`}
      className="flex min-h-11 items-center gap-3 rounded-[var(--radius-sm)] bg-surface-2 px-4 py-2.5 no-underline transition-colors hover:bg-surface-3"
    >
      {blocked && <Lock size={16} className="shrink-0 text-muted" />}
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9375rem] font-medium">{item.task.title[locale]}</span>
        {hint && <span className="block text-xs text-muted">{hint}</span>}
      </span>
      <ArrowRight size={16} className="shrink-0 text-muted" />
    </Link>
  );
}

export function Dashboard({ cityId }: { cityId: CityId }) {
  const t = useTranslations("first30.dashboard");
  const task = useTranslations("first30.task");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const view = useCityPlan(cityId);
  const resolveTask = useFirst30Store((state) => state.resolveTask);
  const reopenTask = useFirst30Store((state) => state.reopenTask);
  const resetCity = useFirst30Store((state) => state.resetCity);
  const [announcement, setAnnouncement] = useState("");

  if (!view.hydrated) return <DashboardSkeleton label={t("loading")} />;

  if (!view.profile) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="t-display-l">{t("noProfileTitle")}</h1>
        <p className="t-body-l mt-4 text-muted">{t("noProfileText")}</p>
        <ButtonLink href={`/first-30/${cityId}/onboarding`} className="mt-8">
          {t("noProfileCta")}
        </ButtonLink>
      </div>
    );
  }

  const { plan, day, tomorrow, progress, city, tasks, resolutions } = view;
  const cityName = city.name[locale];
  const tip = city.tips[Math.abs(day) % city.tips.length];
  const doneTasks = tasks.filter((item) => resolutions[item.id] === "done");

  const complete = (item: PlannedTask) => {
    resolveTask(cityId, item.task.id, "done");
    const next = plan.priorities.find((candidate) => candidate.task.id !== item.task.id);
    setAnnouncement(
      [t("announceDone", { task: item.task.title[locale] }), next ? t("announceNext", { task: next.task.title[locale] }) : ""]
        .filter(Boolean)
        .join(" "),
    );
  };

  const reset = () => {
    if (!window.confirm(t("resetConfirm", { city: cityName }))) return;
    resetCity(cityId);
    router.push(`/first-30/${cityId}/onboarding`);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        {day > 0 ? (
          <p className="t-eyebrow text-muted" aria-label={t("dayLabel", { day: Math.min(day, MONTH_LENGTH) })}>
            {t("day", { day: pad(Math.min(day, MONTH_LENGTH)) })}
          </p>
        ) : (
          <p className="t-eyebrow text-muted">
            {t("before")} · {t("beforeIn", { days: 1 - day })}
          </p>
        )}
        <h1 className="t-display-l mt-3">{t(`headline.${headlineFor(day, plan)}`)}</h1>

        <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{t("priorities")}</h2>
        {plan.priorities.length > 0 ? (
          <ol aria-label={t("priorities")} className="mt-3 space-y-3">
            {plan.priorities.map((item) => (
              <li key={item.task.id} className="animate-fade">
                <PriorityCard
                  item={item}
                  city={cityId}
                  action={
                    <button
                      type="button"
                      onClick={() => complete(item)}
                      aria-label={task("markDoneLabel", { task: item.task.title[locale] })}
                      className="grid size-11 place-items-center rounded-full border border-control text-muted transition-colors hover:border-accent hover:bg-accent hover:text-on-accent"
                    >
                      <Check size={18} />
                    </button>
                  }
                />
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-3 rounded-[var(--radius-md)] bg-surface-2 p-6">
            <p className="font-serif text-2xl italic">{t("nothingTitle")}</p>
            <p className="mt-1 text-muted">{t("nothingText")}</p>
          </div>
        )}
        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>

        <div className="mt-10">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">{t("progress")}</span>
            <span className="num text-muted">{progress}%</span>
          </div>
          <div
            role="progressbar"
            aria-label={t("progress")}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-2 h-1 overflow-hidden rounded-full bg-accent-soft"
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-[var(--dur-base)] ease-[var(--ease-soft)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-muted">
            {day > 0 && (
              <>
                <span className="num">{t("days", { day: Math.min(day, MONTH_LENGTH) })}</span>
                <span aria-hidden="true"> · </span>
              </>
            )}
            {t("importantLeft", { count: plan.importantLeft })}
          </p>
        </div>

        {doneTasks.length > 0 && (
          <details className="mt-8 rounded-[var(--radius-md)] border border-line">
            <summary className="flex min-h-12 cursor-pointer items-center px-4 text-sm font-semibold">
              {t("doneToday", { count: doneTasks.length })}
            </summary>
            <ul className="divide-y divide-line border-t border-line">
              {doneTasks.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 px-4 py-3">
                  <span className="flex items-center gap-2 text-muted line-through decoration-line-strong">
                    <Check size={16} className="text-accent" />
                    {item.title[locale]}
                  </span>
                  <button
                    type="button"
                    onClick={() => reopenTask(cityId, item.id)}
                    aria-label={task("undoLabel", { task: item.title[locale] })}
                    className="min-h-11 px-2 text-sm font-semibold link-underline"
                  >
                    {task("reopen")}
                  </button>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>

      <aside className="space-y-8 lg:sticky lg:top-24 lg:col-span-4 lg:col-start-9 lg:self-start">
        {plan.alsoNeeded.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-muted">{t("alsoNeed")}</h2>
            <ul className="mt-3 space-y-2">
              {plan.alsoNeeded.map((item) => (
                <li key={item.task.id}>
                  <AlsoChip item={item} city={cityId} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-[var(--radius-md)] border border-line bg-surface p-5">
          <h2 className="t-eyebrow text-muted">{t("tomorrow")}</h2>
          <p className="mt-2">
            {tomorrow.length > 0
              ? t("tomorrowNew", {
                  tasks: tomorrow.map((item) => item.title[locale]).join(", "),
                  count: tomorrow.length,
                })
              : t("tomorrowSame")}
          </p>
        </section>

        <blockquote className="border-l-[3px] border-dashed border-community pl-5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            <Speech size={14} />
            {t("fromStudents")}
          </p>
          <p className="mt-2 font-serif text-[1.5rem] italic leading-snug">“{tip.text[locale]}”</p>
        </blockquote>

        <p className="flex flex-wrap items-center gap-x-2 text-[0.9375rem]">
          <span className="text-muted">{t("needHelp")}</span>
          <StuckSheet city={cityId} day={day} className="inline-flex min-h-11 items-center gap-1 font-semibold link-underline">
            {t("stuck")} <ArrowRight size={16} />
          </StuckSheet>
        </p>

        <button type="button" onClick={reset} className="min-h-11 text-sm text-muted link-underline">
          {t("reset", { city: cityName })}
        </button>
      </aside>
    </div>
  );
}
