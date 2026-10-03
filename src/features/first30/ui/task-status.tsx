"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";
import { Check, Lock } from "@/shared/ui/icons";
import { useFirst30Store } from "../model/store";
import type { CityId, Task } from "../model/types";
import { useCityPlan } from "../model/use-city-plan";

/** Everything on the task page that depends on the student's own progress. */
export function useTaskProgress(cityId: CityId, taskId: string) {
  const view = useCityPlan(cityId);
  const planned = view.profile ? view.plan.all.find((item) => item.task.id === taskId) : undefined;
  const nextPriority = view.profile ? view.plan.priorities.find((item) => item.task.id !== taskId) : undefined;
  return { hydrated: view.hydrated, planned, nextPriority, day: view.profile ? view.day : 1 };
}

export function TaskStatusBanner({ cityId, task }: { cityId: CityId; task: Task }) {
  const t = useTranslations("first30.task");
  const locale = useLocale() as Locale;
  const { planned } = useTaskProgress(cityId, task.id);
  if (!planned) return null;

  if (planned.state === "blocked") {
    return (
      <div className="flex gap-3 rounded-[var(--radius-md)] bg-surface-2 p-5">
        <Lock size={20} className="mt-0.5 shrink-0 text-muted" />
        <p>
          {t("needsFirst")}:{" "}
          {planned.waitingOn.map((dep, index) => (
            <span key={dep.id}>
              {index > 0 && ", "}
              <Link href={`/first-30/${cityId}/tasks/${dep.id}`} className="font-semibold link-underline">
                {dep.title[locale]}
              </Link>
            </span>
          ))}
        </p>
      </div>
    );
  }

  if (planned.state === "upcoming") {
    return <p className="rounded-[var(--radius-md)] bg-surface-2 p-5">{t("upcoming", { day: task.window[0] })}</p>;
  }

  if (planned.overdueBy > 0) {
    return <p className="rounded-[var(--radius-md)] bg-amber-tint p-5 text-amber-ink">{t("overdue", { day: task.window[1] })}</p>;
  }

  return null;
}

export function StepChecklist({ cityId, task }: { cityId: CityId; task: Task }) {
  const t = useTranslations("first30.task");
  const locale = useLocale() as Locale;
  const checks = useFirst30Store((state) => state.stepChecks[cityId]?.[task.id]) ?? [];
  const toggleStep = useFirst30Store((state) => state.toggleStep);
  const resolution = useFirst30Store((state) => state.resolutions[cityId]?.[task.id]);
  const resolveTask = useFirst30Store((state) => state.resolveTask);
  const allChecked = task.steps.length > 0 && checks.length === task.steps.length;

  return (
    <>
      <ol className="space-y-2">
        {task.steps.map((step, index) => {
          const checked = checks.includes(index);
          return (
            <li key={step.en}>
              <label className="flex min-h-12 cursor-pointer gap-4 rounded-[var(--radius-sm)] p-3 transition-colors hover:bg-surface-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleStep(cityId, task.id, index)}
                  className="mt-1 size-5 shrink-0 accent-[var(--accent)]"
                />
                <span className={cn("t-body-l", checked && "text-muted line-through decoration-line-strong")}>
                  <span className="num mr-2 text-muted">{index + 1}.</span>
                  {step[locale]}
                </span>
              </label>
            </li>
          );
        })}
      </ol>
      {allChecked && !resolution && (
        <div className="animate-fade mt-4 flex flex-wrap items-center gap-4 rounded-[var(--radius-md)] bg-accent-soft p-4">
          <p className="flex-1">{t("lastStep")}</p>
          <button
            type="button"
            onClick={() => resolveTask(cityId, task.id, "done")}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 font-semibold text-on-accent"
          >
            <Check size={18} />
            {t("markDone")}
          </button>
        </div>
      )}
    </>
  );
}

export function TaskActions({ cityId, task, stuck }: { cityId: CityId; task: Task; stuck: React.ReactNode }) {
  const t = useTranslations("first30.task");
  const locale = useLocale() as Locale;
  const resolution = useFirst30Store((state) => state.resolutions[cityId]?.[task.id]);
  const resolveTask = useFirst30Store((state) => state.resolveTask);
  const reopenTask = useFirst30Store((state) => state.reopenTask);
  const { nextPriority } = useTaskProgress(cityId, task.id);

  if (resolution) {
    return (
      <div className="animate-fade space-y-3" aria-live="polite">
        <p className="flex items-center gap-2 font-semibold">
          <Check size={18} className="text-accent" />
          {resolution === "done"
            ? nextPriority
              ? t("doneNext", { task: nextPriority.task.title[locale] })
              : t("doneAll")
            : t("skipped")}
        </p>
        <div className="flex flex-wrap gap-3">
          {nextPriority && (
            <Link
              href={`/first-30/${cityId}/tasks/${nextPriority.task.id}`}
              className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-semibold text-on-accent no-underline"
            >
              {nextPriority.task.title[locale]}
            </Link>
          )}
          <button type="button" onClick={() => reopenTask(cityId, task.id)} className="min-h-11 px-2 font-semibold link-underline">
            {t("reopen")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => resolveTask(cityId, task.id, "done")}
        className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-on-accent hover:bg-accent-hover sm:flex-none"
      >
        <Check size={18} />
        {t("markDone")}
      </button>
      {stuck}
      <button
        type="button"
        onClick={() => resolveTask(cityId, task.id, "skipped")}
        className="min-h-11 px-2 text-sm text-muted link-underline"
      >
        {t("notApplicable")}
      </button>
    </div>
  );
}
