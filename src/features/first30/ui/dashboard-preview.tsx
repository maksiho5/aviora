import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { cities } from "../data";
import { planDay, progressPercent, tasksForProfile, type Resolutions } from "../model/priorities";
import { PriorityCard } from "./priority-card";

const PREVIEW_DAY = 7;
const previewDone: Resolutions = {
  "emergency-basics": "done",
  "housing-proof": "done",
  "tax-code": "done",
  "sim-card": "done",
};

/** The real dashboard building blocks on a fixed day-7 fixture, so the site advertises the actual UI. */
export function DashboardPreview() {
  const t = useTranslations("first30.dashboard");
  const home = useTranslations("home");
  const locale = useLocale() as Locale;
  const tasks = tasksForProfile(cities.milan.tasks, { nonEu: true });
  const plan = planDay(tasks, previewDone, PREVIEW_DAY);
  const progress = progressPercent(tasks, previewDone);
  const tip = cities.milan.tips[0];

  return (
    <figure className="rounded-[var(--radius-lg)] bg-bg p-5 text-text shadow-[var(--shadow-pop)] sm:p-7">
      <figcaption className="sr-only">{home("previewLabel")}</figcaption>
      <div inert className="select-none">
        <p className="t-eyebrow text-muted">{t("day", { day: "07" })}</p>
        <p className="mt-2 font-serif text-[2.25rem] italic leading-none tracking-[-0.02em]">{t("headline.early")}</p>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{t("priorities")}</p>
        <ol className="mt-3 space-y-2">
          {plan.priorities.map((item) => (
            <li key={item.task.id}>
              <PriorityCard item={item} city="milan" interactive={false} />
            </li>
          ))}
        </ol>
        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="font-medium">{t("progress")}</span>
          <span className="num text-muted">{progress}%</span>
        </div>
        <div className="mt-2 h-1 rounded-full bg-accent-soft">
          <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-5 text-sm text-muted">{t("alsoNeed")}</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {plan.alsoNeeded.map(({ task }) => (
            <li key={task.id} className="rounded-full bg-surface-2 px-3 py-1.5 text-sm">
              {task.title[locale]}
            </li>
          ))}
        </ul>
        <blockquote className="mt-6 border-l-2 border-dashed border-community pl-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{t("fromStudents")}</p>
          <p className="mt-1 font-serif text-[1.375rem] italic leading-snug">“{tip.text[locale]}”</p>
        </blockquote>
      </div>
    </figure>
  );
}
