import { useTranslations } from "next-intl";
import type { Task } from "../model/types";

export function TaskMeta({ task }: { task: Task }) {
  const t = useTranslations("first30");
  return (
    <span className="num">
      {t("task.minutes", { count: task.minutes })} · {t(`badge.${task.category}`)}
    </span>
  );
}
