import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Ornament } from "@/shared/ui/ornament";
import { LanguageSwitch } from "@/shared/ui/language-switch";
import { TelegramButton } from "@/shared/ui/telegram-button";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

export function SiteFooter() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const columns = [
    {
      title: t("explore"),
      links: [
        { href: "/study", label: nav("study") },
        { href: "/life", label: nav("life") },
        { href: "/cities", label: nav("cities") },
        { href: "/practical", label: nav("practical") },
      ],
    },
    {
      title: t("about"),
      links: [
        { href: "/mentorship", label: nav("mentorship") },
        { href: "/team", label: nav("team") },
        { href: "/first-30", label: nav("first30") },
        { href: "/case-study", label: t("caseStudy") },
      ],
    },
  ];

  return (
    <footer className="bg-deep text-on-deep">
      <div className="container-content pb-10 pt-20 lg:pt-28">
        <p className="t-h1 max-w-[14ch]">{t("tagline")}</p>

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <p className="t-eyebrow text-on-deep-muted">{column.title}</p>
              <ul className="mt-4 space-y-1">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-11 items-center no-underline hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="t-eyebrow text-on-deep-muted">{t("follow")}</p>
            <p className="mt-4 text-on-deep-muted">{t("followText")}</p>
            <TelegramButton variant="link" className="mt-2">
              @avioraItalyEu
            </TelegramButton>
          </div>
        </div>

        <Ornament className="mx-auto mt-16 block" />

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-on-deep-muted md:flex-row md:items-center md:justify-between">
          <p>{t("rights", { year: new Date().getFullYear() })}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/legal" className="inline-flex min-h-11 items-center hover:text-on-deep">
              {t("legal")}
            </Link>
            <LanguageSwitch className="text-on-deep [&_a]:text-on-deep-muted [&_a[aria-current]]:text-on-deep" />
            <ThemeToggle className="bg-white/10" />
          </div>
        </div>
      </div>
    </footer>
  );
}
