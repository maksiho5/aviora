"use client";

import { useLocale, useTranslations } from "next-intl";
import { useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";
import { Close } from "@/shared/ui/icons";
import { TelegramButton } from "@/shared/ui/telegram-button";
import { getCity } from "../data";
import { useFirst30Store } from "../model/store";
import type { CityId, Task } from "../model/types";

const reasons = ["understand", "missing", "closed", "notApplicable", "other"] as const;
type Reason = (typeof reasons)[number];

interface StuckSheetProps {
  city: CityId;
  day: number;
  task?: Task;
  className?: string;
  children: React.ReactNode;
}

export function StuckSheet({ city, day, task, className, children }: StuckSheetProps) {
  const t = useTranslations("first30.stuck");
  const locale = useLocale() as Locale;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [reason, setReason] = useState<Reason | null>(null);
  const [copied, setCopied] = useState(false);
  const resolveTask = useFirst30Store((state) => state.resolveTask);

  const open = () => {
    setReason(null);
    setCopied(false);
    dialogRef.current?.showModal();
  };

  const copySummary = async () => {
    const summary = t("summary", {
      city: getCity(city).name[locale],
      day: Math.max(day, 1),
      task: task ? task.title[locale] : "-",
      reason: reason ? t(reason) : "-",
    });
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <button type="button" onClick={open} aria-haspopup="dialog" className={className}>
        {children}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="m-0 mt-auto max-h-[90dvh] w-full max-w-none rounded-t-[var(--radius-lg)] bg-surface p-0 text-text shadow-[var(--shadow-sheet)] backdrop:bg-black/40 open:animate-[rise_320ms_var(--ease-soft)_both] sm:m-auto sm:max-w-[480px] sm:rounded-[var(--radius-lg)]"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="font-serif text-[2rem] italic leading-tight">
              {t("title")}
            </h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={t("close")}
              className="-mr-2 -mt-1 grid size-11 shrink-0 place-items-center rounded-full hover:bg-surface-2"
            >
              <Close />
            </button>
          </div>

          <fieldset className="mt-6">
            <legend className="sr-only">{t("title")}</legend>
            <div className="space-y-2">
              {reasons.map((option) => (
                <label
                  key={option}
                  className={cn(
                    "flex min-h-12 cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] border px-4 py-3 text-[0.9375rem] transition-colors",
                    reason === option ? "border-accent bg-accent-soft" : "border-line hover:bg-surface-2",
                  )}
                >
                  <input
                    type="radio"
                    name="stuck-reason"
                    value={option}
                    checked={reason === option}
                    onChange={() => setReason(option)}
                    className="size-4 accent-[var(--accent)]"
                  />
                  {t(option)}
                </label>
              ))}
            </div>
          </fieldset>

          {reason && reason !== "other" && (
            <div className="animate-fade mt-6 rounded-[var(--radius-md)] bg-surface-2 p-5" aria-live="polite">
              <p>{t(`${reason}Answer`)}</p>
              {reason === "missing" && task && task.documents.length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                  {task.documents.map((doc) => (
                    <li key={doc.en}>{doc[locale]}</li>
                  ))}
                </ul>
              )}
              {reason === "notApplicable" && task && (
                <button
                  type="button"
                  onClick={() => {
                    resolveTask(city, task.id, "skipped");
                    dialogRef.current?.close();
                  }}
                  className="mt-4 inline-flex min-h-11 items-center rounded-full border border-control px-4 text-sm font-semibold hover:bg-surface"
                >
                  {t("notApplicable")}
                </button>
              )}
            </div>
          )}

          <div className="mt-8 border-t border-line pt-6">
            <p className="font-semibold">{t("talkTitle")}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <TelegramButton label="ask" />
              <button
                type="button"
                onClick={copySummary}
                className="inline-flex min-h-11 items-center rounded-full border border-control px-5 text-[0.9375rem] font-semibold hover:bg-surface-2"
              >
                <span aria-live="polite">{copied ? t("copied") : t("copy")}</span>
              </button>
            </div>
            <p className="mt-4 text-sm text-muted">
              {t("nothingSent")} {t("notAdvice")}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
