import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { italyCities } from "@/content/cities";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { images } from "@/shared/assets/images";
import { ButtonLink } from "@/shared/ui/button";
import { ArrowRight } from "@/shared/ui/icons";
import { LevelBadge } from "@/shared/ui/level-badge";
import { PageHeader } from "@/shared/ui/page-header";

const sections = [
  { id: "admissions", key: "admissions" },
  { id: "universities", key: "universities" },
  { id: "scholarships", key: "scholarships" },
  { id: "student-life", key: "studentLife" },
] as const;

export function StudyPage() {
  const t = useTranslations("study");
  const locale = useLocale() as Locale;
  const steps = t.raw("admissions.steps") as { title: string; text: string }[];
  const grants = t.raw("scholarships.items") as { title: string; text: string }[];

  return (
    <>
      <PageHeader
        kicker={t("kicker")}
        title={t("title")}
        lead={t("lead")}
        aside={
          <div className="grain overflow-hidden rounded-[4px]">
            <Image
              src={images.tuscany}
              alt={t("imageAlt")}
              placeholder="blur"
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="img-film aspect-[3/2] w-full object-cover"
            />
          </div>
        }
      />

      <nav aria-label={t("jump")} className="sticky top-0 z-30 border-y border-line bg-bg">
        <ul className="container-content scrollbar-none flex gap-2 overflow-x-auto py-3">
          {sections.map(({ id, key }) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                className="inline-flex min-h-11 items-center rounded-full bg-surface-2 px-4 text-sm font-semibold no-underline hover:bg-surface-3"
              >
                {t(`${key}.title`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="admissions" className="section">
        <div className="container-content grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="t-h2">{t("admissions.title")}</h2>
            <p className="t-body-l mt-4 max-w-[52ch] text-muted">{t("admissions.text")}</p>
            <ol className="mt-10">
              {steps.map((step, index) => (
                <li key={step.title} data-reveal className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line-strong py-7">
                  <span className="font-serif text-2xl italic text-muted">0{index + 1}</span>
                  <div>
                    <h3 className="t-h3">{step.title}</h3>
                    <p className="t-body-l mt-2 max-w-[52ch] text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-[var(--radius-lg)] bg-surface-2 p-7 lg:sticky lg:top-24">
              <p className="t-eyebrow text-muted">{t("admissions.glance")}</p>
              <p className="mt-4">{t("admissions.intake")}</p>
              <p className="mt-6 text-sm font-semibold">{t("admissions.languages")}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <LevelBadge language="en" level="B2/C1" />
                <LevelBadge language="it" level="A2/B1" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="universities" className="section bg-surface-2">
        <div className="container-content">
          <h2 className="t-h2">{t("universities.title")}</h2>
          <p className="t-body-l mt-4 max-w-[52ch] text-muted">{t("universities.text")}</p>
          <ul className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {italyCities.flatMap((city) =>
              city.universities.map((name) => (
                <li key={name} className="flex flex-col rounded-[var(--radius-md)] bg-surface p-6">
                  <p className="t-eyebrow text-muted">{city.name[locale]}</p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug">{name}</h3>
                  <Link
                    href={`/cities/${city.slug}#study`}
                    className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-sm font-semibold no-underline hover:underline"
                  >
                    {t("universities.cityGuide")}
                    <ArrowRight size={16} />
                  </Link>
                </li>
              )),
            )}
          </ul>
        </div>
      </section>

      <section id="scholarships" className="section">
        <div className="container-content">
          <h2 className="t-h2">{t("scholarships.title")}</h2>
          <p className="t-body-l mt-4 max-w-[52ch] text-muted">{t("scholarships.text")}</p>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {grants.map((grant) => (
              <li key={grant.title} data-reveal className="border-t border-line-strong pt-6">
                <h3 className="t-h3">{grant.title}</h3>
                <p className="mt-3 text-muted">{grant.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 rounded-[var(--radius-md)] border-l-[3px] border-official bg-surface p-5 text-sm">
            {t("scholarships.note")}
          </p>
        </div>
      </section>

      <section id="student-life" className="section bg-bg-warm">
        <div className="container-content grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="t-h2">{t("studentLife.title")}</h2>
            <p className="t-body-l mt-4 max-w-[48ch] text-muted">{t("studentLife.text")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/cities">{t("studentLife.cities")}</ButtonLink>
              <ButtonLink href="/life" variant="secondary">
                {t("studentLife.life")}
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-[var(--radius-lg)] bg-deep p-8 text-on-deep lg:col-span-5 lg:col-start-8">
            <p className="font-serif text-[2rem] italic leading-tight">{t("mentorTitle")}</p>
            <p className="mt-3 text-on-deep-muted">{t("mentorText")}</p>
            <ButtonLink href="/mentorship" variant="inverse" className="mt-6">
              {t("mentorCta")}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
