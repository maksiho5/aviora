"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";

export function LanguageSwitch({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")} className={cn("flex items-center text-sm font-semibold", className)}>
      {routing.locales.map((target, index) => (
        <span key={target} className="flex items-center">
          {index > 0 && <span aria-hidden="true" className="px-1 text-line-strong">/</span>}
          <Link
            href={pathname}
            locale={target}
            hrefLang={target}
            lang={target}
            aria-label={new Intl.DisplayNames([target], { type: "language" }).of(target)}
            aria-current={target === locale ? "page" : undefined}
            className={cn(
              "grid min-h-11 min-w-11 place-items-center uppercase no-underline",
              target === locale ? "text-text" : "text-muted hover:text-text",
            )}
          >
            {target}
          </Link>
        </span>
      ))}
    </nav>
  );
}
