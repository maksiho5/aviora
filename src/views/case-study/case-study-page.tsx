import { useLocale, useTranslations } from "next-intl";
import { caseSections } from "@/content/case-study";
import { DashboardPreview } from "@/features/first30/ui/dashboard-preview";
import type { Locale } from "@/i18n/routing";
import { ButtonLink } from "@/shared/ui/button";
import { CaseVisualBlock } from "./visuals";

const pad = (index: number) => String(index + 1).padStart(2, "0");

export function CaseStudyPage() {
  const t = useTranslations("caseStudy");
  const locale = useLocale() as Locale;

  return (
    <>
      <header className="container-content pb-16 pt-14 lg:pt-24">
        <div className="animate-rise">
          <p className="t-eyebrow text-muted">{t("kicker")} · FIRST 30</p>
          <h1 className="t-display-xl mt-5 max-w-[13ch]">{t("title")}</h1>
          <p className="t-lead mt-6 max-w-[40ch] text-muted">{t("lead")}</p>
        </div>
        <dl className="mt-12 grid gap-6 border-t border-line pt-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">{t("roleLabel")}</dt>
            <dd className="mt-1 font-medium">{t("role")}</dd>
          </div>
          <div>
            <dt className="text-muted">{t("scopeLabel")}</dt>
            <dd className="mt-1 font-medium">{t("scope")}</dd>
          </div>
        </dl>
      </header>

      <div className="container-content grid gap-12 pb-[var(--section-y)] lg:grid-cols-12">
        <nav aria-label={t("contents")} className="hidden lg:col-span-3 lg:block">
          <ol className="sticky top-24 space-y-1 text-sm">
            {caseSections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="flex min-h-9 items-center gap-3 text-muted no-underline hover:text-text">
                  <span className="num w-6">{pad(index)}</span>
                  {section.kicker[locale]}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="lg:col-span-9">
          {caseSections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 border-t border-line py-14 first:border-t-0 first:pt-0">
              <p className="t-eyebrow text-muted">
                <span className="num">{pad(index)}</span> — {section.kicker[locale]}
              </p>
              <h2 className="t-h2 mt-4 max-w-[24ch]">{section.title[locale]}</h2>
              <p className="t-body-l mt-5 max-w-[60ch] text-muted">{section.body[locale]}</p>
              {section.items && (
                <ul className="mt-6 space-y-2">
                  {section.items.map((item) => (
                    <li key={item.en} className="font-serif text-[1.375rem] italic leading-snug">
                      — {item[locale]}
                    </li>
                  ))}
                </ul>
              )}
              {section.visual && (
                <div className="mt-10">
                  <CaseVisualBlock visual={section.visual} />
                </div>
              )}
              {section.id === "prototype" && (
                <div className="mt-10 grid items-center gap-8 md:grid-cols-2">
                  <DashboardPreview />
                  <div>
                    <ButtonLink href="/first-30/milan/onboarding">{t("tryIt")}</ButtonLink>
                  </div>
                </div>
              )}
              {section.id === "final" && <p className="mt-6 font-medium">{t("scale")}</p>}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
