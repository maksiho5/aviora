import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import { ArrowRight } from "@/shared/ui/icons";

export const practicalTopics = [
  "documents",
  "housing",
  "transport",
  "banking",
  "healthcare",
  "university",
  "expenses",
  "services",
] as const;

export type PracticalTopic = (typeof practicalTopics)[number];

const glyphs: Record<PracticalTopic, string> = {
  documents: "M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5",
  housing: "M4 11 12 4l8 7M6 10v10h12V10M10 20v-5h4v5",
  transport: "M6 4h12a1 1 0 0 1 1 1v11H5V5a1 1 0 0 1 1-1ZM5 11h14M8 16l-2 4M16 16l2 4M8.5 13.5h.01M15.5 13.5h.01",
  banking: "M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3l9 5H3z",
  healthcare: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10ZM12 9v5M9.5 11.5h5",
  university: "M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6",
  expenses: "M12 3v18M16 7H10a2.5 2.5 0 0 0 0 5h4a2.5 2.5 0 0 1 0 5H8",
  services: "M4 7h16v12H4zM4 7l8 6 8-6",
};

export function PracticalGrid({ compact = false, showWhen = false }: { compact?: boolean; showWhen?: boolean }) {
  const t = useTranslations("practical");

  return (
    <ul className={cn("grid gap-3", compact ? "grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-4")}>
      {practicalTopics.map((topic) => (
        <li key={topic} className="relative flex flex-col rounded-[var(--radius-md)] bg-surface p-5 transition-colors hover:bg-surface-3 sm:p-6">
          <svg viewBox="0 0 24 24" className="size-6 text-accent" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={glyphs[topic]} />
          </svg>
          <h3 className="mt-6 text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em]">
            <Link href={`/practical#${topic}`} className="stretched-link no-underline">
              {t(`topics.${topic}.title`)}
            </Link>
          </h3>
          {showWhen && (
            <p className="mt-2 text-sm text-muted">
              {t("useWhen")} {t(`topics.${topic}.when`)}
            </p>
          )}
          <ArrowRight size={18} className="mt-auto self-end pt-4 text-muted" />
        </li>
      ))}
    </ul>
  );
}
