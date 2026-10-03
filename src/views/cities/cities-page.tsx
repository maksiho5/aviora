import { useLocale, useTranslations } from "next-intl";
import { italyCities } from "@/content/cities";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ArrowRight } from "@/shared/ui/icons";
import { PageHeader } from "@/shared/ui/page-header";
import { CityIndex } from "@/widgets/city-index";
import { cityRows } from "@/widgets/city-rows";
import { monthlyRange } from "./cost";

const lenses = ["study", "live", "cost", "discover"] as const;

export function CitiesPage() {
  const t = useTranslations("cities");
  const locale = useLocale() as Locale;

  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} lead={t("lead")} />

      <section className="container-content">
        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-lg)] bg-line sm:grid-cols-2 lg:grid-cols-4">
          {lenses.map((lens) => (
            <li key={lens} className="bg-surface p-6">
              <p className="t-eyebrow text-accent">{t(`lenses.${lens}`)}</p>
              <p className="mt-2 text-muted">{t(`lensText.${lens}`)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="container-content">
          <CityIndex rows={cityRows(locale)} />
        </div>
      </section>

      <section className="section bg-surface-2">
        <div className="container-content">
          <h2 className="t-h2">{t("monthly")}</h2>
          <p className="mt-3 max-w-[56ch] text-sm text-muted">{t("estimate")}</p>
          <div className="mt-10 overflow-x-auto rounded-[var(--radius-lg)] bg-surface">
            <table className="w-full min-w-[640px] text-left">
              <caption className="sr-only">{t("monthly")}</caption>
              <thead>
                <tr className="border-b border-line text-sm text-muted">
                  <th scope="col" className="p-5 font-semibold">
                    <span className="sr-only">{t("kicker")}</span>
                  </th>
                  {italyCities.map((city) => (
                    <th key={city.slug} scope="col" className="p-5 font-serif text-xl font-medium italic text-text">
                      <Link href={`/cities/${city.slug}`} className="no-underline hover:underline">
                        {city.name[locale]}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="num">
                {italyCities[0].cost.map((line, row) => (
                  <tr key={line.label.en} className="border-b border-line">
                    <th scope="row" className="p-5 text-sm font-medium">
                      {line.label[locale]}
                    </th>
                    {italyCities.map((city) => (
                      <td key={city.slug} className="p-5 text-sm text-muted">
                        €{city.cost[row].range[0]}–{city.cost[row].range[1]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="p-5 font-semibold">
                    {t("perMonth")}
                  </th>
                  {italyCities.map((city) => {
                    const [min, max] = monthlyRange(city);
                    return (
                      <td key={city.slug} className="p-5 font-semibold">
                        €{min}–{max}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          <Link
            href="/first-30"
            className="mt-10 flex items-center justify-between gap-6 rounded-[var(--radius-lg)] bg-deep p-7 text-on-deep no-underline transition-colors hover:bg-accent sm:p-9"
          >
            <span className="font-serif text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] italic leading-tight">{t("bridge")}</span>
            <ArrowRight size={28} className="shrink-0" />
          </Link>
        </div>
      </section>
    </>
  );
}
