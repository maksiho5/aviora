import { useTranslations } from "next-intl";
import { site } from "@/shared/config/site";
import { cn } from "@/shared/lib/cn";
import { buttonClass, type ButtonVariant } from "./button";
import { PaperPlane } from "./icons";

type TelegramLabel = "follow" | "talk" | "ask";

interface TelegramButtonProps {
  label?: TelegramLabel;
  children?: React.ReactNode;
  variant?: ButtonVariant | "link";
  className?: string;
}

export function TelegramButton({ label = "follow", children, variant = "primary", className }: TelegramButtonProps) {
  const t = useTranslations("telegram");
  const classes =
    variant === "link"
      ? cn("inline-flex min-h-11 items-center gap-2 font-semibold link-underline", className)
      : buttonClass(variant, className);

  return (
    <a href={site.telegramUrl} target="_blank" rel="noopener noreferrer" className={classes}>
      {variant !== "link" && <PaperPlane size={18} />}
      {children ?? t(label)}
      <span className="sr-only"> {t("opens")}</span>
    </a>
  );
}
