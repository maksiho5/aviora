import { useLocale, useTranslations } from "next-intl";
import { cities } from "@/features/first30/data";
import { DashboardPreview } from "@/features/first30/ui/dashboard-preview";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ButtonLink } from "@/shared/ui/button";
import { ArrowRight, Building, Speech } from "@/shared/ui/icons";
import { richTags } from "@/shared/ui/rich";
import { CityCards } from "./city-cards";

interface HoodRow {
  label: string;
  milan: string;
  amsterdam: string;
}

export function First30Landing() {
  const t = useTranslations("first30.landing");
  const task = useTranslations("first30.task");
  const locale = useLocale() as Locale;
  const steps = t.raw("how") as string[];
  const rows = t.raw("hoodRows") as HoodRow[];
  const officialSample = cities.milan.tasks.find((item) => item.id === "tax-code");
  const tip = cities.milan.tips[0];

  return (
    <>
      <section className="container-content grid items-center gap-14 pb-20 pt-14 lg:grid-cols-12 lg:pt-20">
        <div className="animate-rise lg:col-span-7">
          <p className="t-eyebrow text-muted">{t("eyebrow")}</p>
          <h1 className="t-display-xl mt-5 max-w-[10ch]">{t("title")}</h1>
          <p className="t-lead mt-6 text-muted">{t("lead")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/first-30/milan/onboarding">{t("start")}</ButtonLink>
            <ButtonLink href="/first-30/amsterdam/onboarding" variant="secondary">
              {t("seeAmsterdam")}
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted">{t("note")}</p>
        </div>
        <div className="mx-auto w-full max-w-[440px] lg:col-span-5">
          <DashboardPreview />
        </div>
      </section>

      <section className="section bg-surface-2 text-center">
        <p className="t-display-l container-content mx-auto max-w-[22ch]">{t.rich("insight", richTags)}</p>
      </section>

      <section className="section">
        <div className="container-content">
          <p className="t-eyebrow text-muted">{t("howEyebrow")}</p>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-lg)] bg-line md:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step} data-reveal className="bg-bg p-7">
                <span className="font-serif text-5xl italic leading-none text-line-strong">{index + 1}</span>
                <p className="t-h3 mt-8">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-bg-warm">
        <div className="container-content grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-eyebrow text-muted">{t("grammarEyebrow")}</p>
            <p className="t-body-l mt-5 text-muted">{t("grammarText")}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:col-span-8">
            {officialSample && (
              <div className="rounded-[var(--radius-md)] border-l-[3px] border-official bg-surface p-6">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]">
                  <Building size={16} />
                  {task("official")}
                </p>
                <p className="mt-4 font-semibold">{officialSample.title[locale]}</p>
                <p className="mt-2 text-muted">{officialSample.steps[2][locale]}</p>
                <p className="mt-4 text-sm font-medium text-link">Agenzia delle Entrate</p>
              </div>
            )}
            <div className="rounded-[var(--radius-md)] border-l-[3px] border-dashed border-community bg-surface-2 p-6">
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]">
                <Speech size={16} />
                {task("community")}
              </p>
              <p className="mt-4 font-serif text-[1.75rem] italic leading-snug">“{tip.text[locale]}”</p>
              <p className="mt-3 text-xs text-muted">{task("communityBadge")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-content">
          <p className="t-eyebrow text-muted">{t("citiesEyebrow")}</p>
          <div className="mt-8">
            <CityCards />
          </div>
        </div>
      </section>

      <section className="section bg-surface-2">
        <div className="container-content grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-eyebrow text-muted">{t("hoodEyebrow")}</p>
            <h2 className="t-h2 mt-4">{t("hoodTitle")}</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="overflow-x-auto rounded-[var(--radius-lg)] bg-surface">
              <table className="w-full min-w-[480px] text-left">
                <caption className="sr-only">{t("hoodChanges")}</caption>
                <thead>
                  <tr className="border-b border-line text-sm text-muted">
                    <th scope="col" className="p-5 font-semibold">
                      {t("hoodChanges")}
                    </th>
                    <th scope="col" className="p-5 font-serif text-xl font-medium italic text-text">
                      {cities.milan.name[locale]}
                    </th>
                    <th scope="col" className="p-5 font-serif text-xl font-medium italic text-text">
                      {cities.amsterdam.name[locale]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.label} className="border-b border-line last:border-0">
                      <th scope="row" className="p-5 text-sm font-medium">
                        {row.label}
                      </th>
                      <td className="p-5">{row.milan}</td>
                      <td className="p-5">{row.amsterdam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6">
              <span className="font-semibold">{t("hoodStays")}: </span>
              <span className="text-muted">{t("hoodSame")}</span>
            </p>
            <Link href="/case-study" className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold no-underline hover:underline">
              {t("caseStudy")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
