"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ArrowLeft, ArrowRight, ArrowUpRight, Building, Check, Pin, Speech } from "@/shared/ui/icons";
import { getCity } from "../data";
import { tierOf, scoreTask } from "../model/priorities";
import { useFirst30Store } from "../model/store";
import type { CityId, Task } from "../model/types";
import { StuckSheet } from "./stuck-sheet";
import { StepChecklist, TaskActions, TaskStatusBanner, useTaskProgress } from "./task-status";
import { TaskMeta } from "./task-meta";
import { TierDot } from "./tier-dot";

function Cost({ task }: { task: Task }) {
  const t = useTranslations("first30.task");
  if (!task.costEur) return null;
  const [min, max] = task.costEur;
  const label = max === 0 ? t("free") : min === max ? t("costOne", { min }) : t("cost", { min, max });
  return <span className="num rounded-full bg-surface-2 px-3 py-1 text-sm font-medium">{label}</span>;
}

function DependencyBlock({ cityId, task }: { cityId: CityId; task: Task }) {
  const t = useTranslations("first30.task");
  const locale = useLocale() as Locale;
  const resolutions = useFirst30Store((state) => state.resolutions[cityId]);
  const city = getCity(cityId);
  const needs = task.dependsOn.flatMap((id) => city.tasks.find((item) => item.id === id) ?? []);
  const unlocks = city.tasks.filter((item) => item.dependsOn.includes(task.id));
  if (needs.length === 0 && unlocks.length === 0) return null;

  const chip = (item: Task, done: boolean) => (
    <li key={item.id}>
      <Link
        href={`/first-30/${cityId}/tasks/${item.id}`}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium no-underline hover:bg-surface-2"
      >
        {done ? <Check size={16} className="text-accent" /> : <span className="size-1.5 rounded-full bg-muted" aria-hidden="true" />}
        {item.title[locale]}
      </Link>
    </li>
  );

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {needs.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted">{t("needsFirst")}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">{needs.map((item) => chip(item, Boolean(resolutions?.[item.id])))}</ul>
        </div>
      )}
      {unlocks.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted">{t("unlocks")}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">{unlocks.map((item) => chip(item, Boolean(resolutions?.[item.id])))}</ul>
        </div>
      )}
    </div>
  );
}

export function TaskDetail({ cityId, task }: { cityId: CityId; task: Task }) {
  const t = useTranslations("first30.task");
  const tier = useTranslations("first30.tier");
  const stuckLabel = useTranslations("first30.dashboard");
  const locale = useLocale() as Locale;
  const { planned, day } = useTaskProgress(cityId, task.id);
  const currentTier = planned?.tier ?? tierOf(task, scoreTask(task, task.window[0], 0));
  const official = task.sources.filter((source) => source.kind === "official");
  const community = task.sources.filter((source) => source.kind === "community");

  return (
    <article className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <Link href={`/first-30/${cityId}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted no-underline hover:text-text">
          <ArrowLeft size={16} />
          {t("breadcrumb")}
        </Link>

        <p className="mt-6 flex items-center gap-2 text-sm font-medium">
          <TierDot tier={currentTier} />
          {tier(currentTier)}
        </p>
        <h1 className="mt-3 text-[clamp(2rem,1.6rem+2vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em]">{task.title[locale]}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-surface-2 px-3 py-1 text-sm font-medium">
            <TaskMeta task={task} />
          </span>
          <Cost task={task} />
        </div>

        <div className="mt-8 empty:hidden">
          <TaskStatusBanner cityId={cityId} task={task} />
        </div>

        <section className="mt-10">
          <h2 className="sr-only">{t("why")}</h2>
          <p className="t-lead">{task.summary[locale]}</p>
        </section>

        {task.steps.length > 0 && (
          <section className="mt-12">
            <h2 className="t-h3">{t("steps")}</h2>
            <div className="mt-4">
              <StepChecklist cityId={cityId} task={task} />
            </div>
          </section>
        )}

        <section className="mt-12">
          <h2 className="t-h3">{t("documents")}</h2>
          {task.documents.length > 0 ? (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {task.documents.map((doc) => (
                <li key={doc.en} className="rounded-[var(--radius-sm)] bg-surface-2 px-4 py-3">
                  {doc[locale]}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-muted">{t("noDocuments")}</p>
          )}
        </section>

        {task.tip && (
          <aside className="mt-10 rounded-[var(--radius-md)] border border-line p-5">
            <p className="text-sm font-semibold">{t("tip")}</p>
            <p className="mt-1 text-muted">{task.tip[locale]}</p>
          </aside>
        )}

        <section className="mt-12 space-y-4">
          <p className="text-sm text-muted">{t("legend")}</p>
          {official.length > 0 && (
            <div className="rounded-[var(--radius-md)] border-l-[3px] border-official bg-surface p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]">
                <Building size={16} />
                {t("official")}
              </h2>
              <ul className="mt-3 space-y-2">
                {official.map((source) => (
                  <li key={source.label.en}>
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1 font-medium text-link link-underline"
                      >
                        {source.label[locale]}
                        <ArrowUpRight size={16} />
                      </a>
                    ) : (
                      <span className="font-medium">{source.label[locale]}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {community.length > 0 && (
            <div className="rounded-[var(--radius-md)] border-l-[3px] border-dashed border-community bg-surface-2 p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]">
                <Speech size={16} />
                {t("community")}
              </h2>
              <p className="mt-1 text-xs text-muted">{t("communityBadge")}</p>
              <ul className="mt-3 space-y-3">
                {community.map((source) => (
                  <li key={source.label.en} className="font-serif text-[1.375rem] italic leading-snug">
                    “{source.label[locale]}”
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {task.place && (
          <section className="mt-12">
            <h2 className="t-h3">{t("where")}</h2>
            <a
              href={`https://www.openstreetmap.org/?mlat=${task.place.lat}&mlon=${task.place.lng}#map=17/${task.place.lat}/${task.place.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-4 rounded-[var(--radius-md)] border border-line p-5 no-underline hover:bg-surface-2"
            >
              <Pin className="shrink-0 text-accent" />
              <span className="flex-1">
                <span className="block font-semibold">{task.place.name}</span>
                <span className="block text-sm text-muted">{task.place.address}</span>
              </span>
              <ArrowUpRight size={18} className="text-muted" />
            </a>
          </section>
        )}

        <section className="mt-12 border-t border-line pt-8">
          <DependencyBlock cityId={cityId} task={task} />
        </section>
      </div>

      <aside className="lg:col-span-4">
        <div className="sticky bottom-[calc(64px+env(safe-area-inset-bottom))] z-30 -mx-[var(--gutter)] border-t border-line bg-bg/95 px-[var(--gutter)] py-4 md:bottom-0 lg:top-24 lg:mx-0 lg:rounded-[var(--radius-lg)] lg:border lg:bg-surface lg:p-6">
          <TaskActions
            cityId={cityId}
            task={task}
            stuck={
              <StuckSheet
                city={cityId}
                day={day}
                task={task}
                className="inline-flex min-h-12 items-center gap-1 rounded-full border border-control px-5 font-semibold hover:bg-surface-2"
              >
                {stuckLabel("stuck")} <ArrowRight size={16} />
              </StuckSheet>
            }
          />
        </div>
      </aside>
    </article>
  );
}
