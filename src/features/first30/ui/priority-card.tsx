import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";
import type { PlannedTask } from "../model/priorities";
import type { CityId } from "../model/types";
import { TaskMeta } from "./task-meta";
import { TierDot } from "./tier-dot";

const tierInk = { red: "text-red-ink", amber: "text-amber-ink", green: "text-green-ink" } as const;

interface PriorityCardProps {
  item: PlannedTask;
  city: CityId;
  interactive?: boolean;
  action?: React.ReactNode;
}

export function PriorityCard({ item, city, interactive = true, action }: PriorityCardProps) {
  const t = useTranslations("first30.tier");
  const locale = useLocale() as Locale;
  const { task, tier, overdueBy } = item;
  const title = task.title[locale];

  return (
    <div
      className={cn(
        "relative flex min-h-[76px] items-start gap-3 rounded-[var(--radius-md)] border border-line bg-surface p-4",
        interactive && "transition-colors duration-[var(--dur-instant)] hover:bg-surface-2",
      )}
    >
      <span className="grid size-6 place-items-center pt-0.5">
        <TierDot tier={tier} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[1.0625rem] font-semibold leading-6 tracking-[-0.01em]">
          {interactive ? (
            <Link href={`/first-30/${city}/tasks/${task.id}`} className="stretched-link no-underline">
              {title}
            </Link>
          ) : (
            title
          )}
        </p>
        <p className="mt-0.5 text-sm text-muted">
          <TaskMeta task={task} />
        </p>
        <p className={cn("mt-1 text-sm font-medium", tierInk[tier])}>
          {overdueBy > 0 ? t("overdue", { days: overdueBy }) : t(tier)}
        </p>
      </div>
      {action && <div className="relative z-10 -my-1 -mr-1">{action}</div>}
    </div>
  );
}
