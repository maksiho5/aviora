import type { DayPlan } from "./priorities";
import { MONTH_LENGTH } from "./day";

export type HeadlineKey = "overdue" | "before" | "first" | "early" | "middle" | "nearly" | "late" | "thirty" | "after";

export function headlineFor(day: number, plan: DayPlan): HeadlineKey {
  const overdueCritical = plan.priorities.some((item) => item.overdueBy > 0 && item.task.urgency === "critical");
  if (overdueCritical) return "overdue";
  if (day <= 0) return "before";
  if (day === 1) return "first";
  if (day <= 10) return "early";
  if (day <= 20) return "middle";
  if (day < MONTH_LENGTH) return plan.importantLeft <= 2 ? "nearly" : "late";
  if (day === MONTH_LENGTH) return "thirty";
  return "after";
}
