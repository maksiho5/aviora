"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";
import { Check, Lock } from "@/shared/ui/icons";
import { MONTH_LENGTH } from "../model/day";
import type { PlannedTask } from "../model/priorities";
import type { CityId } from "../model/types";
import { useCityPlan } from "../model/use-city-plan";
import { TierDot } from "./tier-dot";

const weeks = [
  { week: 1, from: 1, to: 7 },
  { week: 2, from: 8, to: 14 },
  { week: 3, from: 15, to: 21 },
  { week: 4, from: 22, to: MONTH_LENGTH },
];

const filters = ["all", "important", "blocked", "done"] as const;
type Filter = (typeof filters)[number];

const matches: Record<Filter, (item: PlannedTask) => boolean> = {
  all: () => true,
  important: (item) => item.task.urgency !== "easy" && item.state !== "done" && item.state !== "skipped",
  blocked: (item) => item.state === "blocked" || item.state === "upcoming",
  done: (item) => item.state === "done" || item.state === "skipped",
};

const barTone = { red: "bg-red-tint", amber: "bg-amber-tint", green: "bg-green-tint" } as const;

function Row({ item, cityId, day }: { item: PlannedTask; cityId: CityId; day: number }) {
  const t = useTranslations("first30");
  const locale = useLocale() as Locale;
  const { task, state, tier } = item;
  const resolved = state === "done" || state === "skipped";
  const [from, due] = task.window;

  return (
    <li className="grid items-center gap-x-4 gap-y-2 border-b border-line py-4 md:grid-cols-[240px_1fr]">
      <div className="flex items-start gap-3">
        <span className="num mt-0.5 w-14 shrink-0 text-xs font-semibold text-muted">{t("timeline.dayChip", { day: from })}</span>
        <span className="min-w-0">
          <Link
            href={`/first-30/${cityId}/tasks/${task.id}`}
            className={cn("font-medium no-underline hover:underline", resolved && "text-muted line-through decoration-line-strong")}
          >
            {task.title[locale]}
          </Link>
          <span className="mt-0.5 flex items-center gap-2 text-xs text-muted">
            {resolved ? (
              <>
                <Check size={14} className="text-accent" />
                {state === "skipped" ? t("timeline.skippedNote") : t("task.done")}
              </>
            ) : state === "blocked" ? (
              <>
                <Lock size={14} />
                {t("dashboard.after", { task: item.waitingOn[0]?.title[locale] ?? "" })}
              </>
            ) : (
              <>
                <TierDot tier={tier} className="size-2.5" />
                {t("task.minutes", { count: task.minutes })}
              </>
            )}
          </span>
        </span>
      </div>
      <div className="relative hidden h-6 md:block" aria-hidden="true">
        <div className="absolute inset-y-[11px] left-0 right-0 bg-line" />
        <div
          className={cn("absolute inset-y-1 rounded-full", resolved ? "bg-surface-3" : barTone[tier])}
          style={{
            left: `${((from - 1) / MONTH_LENGTH) * 100}%`,
            width: `${((due - from + 1) / MONTH_LENGTH) * 100}%`,
          }}
        />
        {day >= 1 && day <= MONTH_LENGTH && (
          <div className="absolute inset-y-0 w-px bg-accent" style={{ left: `${((day - 0.5) / MONTH_LENGTH) * 100}%` }} />
        )}
      </div>
    </li>
  );
}

export function Timeline({ cityId }: { cityId: CityId }) {
  const t = useTranslations("first30.timeline");
  const view = useCityPlan(cityId);
  const [filter, setFilter] = useState<Filter>("all");

  if (!view.hydrated || !view.profile) {
    return <div aria-busy="true" className="h-96 animate-pulse rounded-[var(--radius-lg)] bg-surface-2" />;
  }

  const { plan, day } = view;
  const visible = plan.all.filter(matches[filter]).sort((a, b) => a.task.window[0] - b.task.window[0] || a.task.window[1] - b.task.window[1]);

  return (
    <div>
      <h1 className="t-display-l">{t("title")}</h1>
      <p className="t-body-l mt-3 text-muted">{t("lead")}</p>

      <div role="group" aria-label={t("title")} className="scrollbar-none mt-8 flex gap-2 overflow-x-auto">
        {filters.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
            className={cn(
              "min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors",
              filter === option ? "bg-accent text-on-accent" : "bg-surface-2 hover:bg-surface-3",
            )}
          >
            {t(`filters.${option}`)}
          </button>
        ))}
      </div>

      {weeks.map(({ week, from, to }) => {
        const rows = visible.filter((item) => item.task.window[0] >= from && item.task.window[0] <= to);
        const isCurrent = day >= from && day <= to;
        return (
          <section key={week} className="mt-10" aria-current={isCurrent ? "date" : undefined}>
            <h2 className="sticky top-16 z-10 flex items-baseline gap-3 border-b border-line-strong bg-bg py-3">
              <span className="font-serif text-2xl italic">{t("week", { week })}</span>
              <span className="num text-sm text-muted">{t("days", { from, to })}</span>
              {isCurrent && <span className="ml-auto rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-on-accent">{t("today")}</span>}
            </h2>
            {rows.length > 0 ? (
              <ul>
                {rows.map((item) => (
                  <Row key={item.task.id} item={item} cityId={cityId} day={day} />
                ))}
              </ul>
            ) : (
              <p className="py-4 text-sm text-muted">{t("empty")}</p>
            )}
          </section>
        );
      })}
    </div>
  );
}
