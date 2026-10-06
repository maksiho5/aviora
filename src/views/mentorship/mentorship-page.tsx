import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { approachQuestions, helpAreas, plans } from "@/content/mentorship";
import type { Locale } from "@/i18n/routing";
import { images } from "@/shared/assets/images";
import { cn } from "@/shared/lib/cn";
import { Check } from "@/shared/ui/icons";
import { Ornament } from "@/shared/ui/ornament";
import { PortraitSlot } from "@/shared/ui/portrait-slot";
import { TelegramButton } from "@/shared/ui/telegram-button";

export function MentorshipPage() {
  const t = useTranslations("mentorship");
  const locale = useLocale() as Locale;
  const story = t.raw("meetText") as string[];

  return (
    <>
      <header className="container-content relative grid items-center gap-12 pb-16 pt-14 lg:grid-cols-12 lg:pt-24">
        <div className="animate-rise lg:col-span-7">
          <p className="t-eyebrow text-muted">{t("eyebrow")}</p>
          <h1 className="t-h1 mt-5 max-w-[18ch]">{t("title")}</h1>
          <p className="t-lead mt-6 max-w-[34ch] text-muted">{t("lead")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <TelegramButton label="talk" />
            <a href="#formats" className="inline-flex min-h-11 items-center px-3 font-semibold link-underline">
              {t("formats")}
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[320px] lg:col-span-4 lg:col-start-9">
          <Image src={images.arches} alt="" sizes="480px" className="img-cut absolute -inset-16 -z-0 size-[calc(100%+8rem)] object-contain opacity-60" />
          <PortraitSlot initials="A" label="Aliya" className="relative" />
        </div>
      </header>

      <section className="section bg-surface-2">
        <div className="container-content grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="t-eyebrow text-muted">{t("meetEyebrow")}</p>
            <h2 className="t-h2 mt-4">{t("meetTitle")}</h2>
          </div>
          <div className="space-y-5 lg:col-span-6 lg:col-start-7">
            {story.map((paragraph) => (
              <p key={paragraph} className="t-body-l">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="container-content mt-16 grid gap-3 md:grid-cols-2">
          <div className="rounded-[var(--radius-lg)] bg-surface p-8">
            <p className="t-price">{t("researchNumber")}</p>
            <p className="mt-3 font-semibold">{t("researchLabel")}</p>
            <p className="mt-4 text-muted">{t("researchFinding")}</p>
          </div>
          <div className="rounded-[var(--radius-lg)] bg-surface p-8">
            <p className="t-price">{t("mvpLabel")}</p>
            <p className="mt-3 font-semibold">{t("mvpText")}</p>
            <p className="mt-4 font-serif text-[1.375rem] italic leading-snug text-muted">Aviora Student — Student-to-Student Mentoring</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-content">
          <p className="t-eyebrow text-muted">{t("helpEyebrow")}</p>
          <ol className="mt-8 grid gap-x-12 md:grid-cols-2">
            {helpAreas.map((area, index) => (
              <li key={area.title.en} data-reveal className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line-strong py-7">
                <span className="font-serif text-2xl italic text-muted">0{index + 1}</span>
                <div>
                  <h3 className="t-h3">{area.title[locale]}</h3>
                  <p className="mt-2 text-muted">{area.text[locale]}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-bg-warm">
        <div className="container-content grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-eyebrow text-muted">{t("approachEyebrow")}</p>
            <p className="t-body-l mt-6 max-w-[36ch] text-muted">{t("approachText")}</p>
            <Image src={images.goodThings} alt="Good things take time" placeholder="blur" sizes="360px" className="mt-10 hidden w-full max-w-[360px] rounded-[var(--radius-md)] lg:block" />
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {approachQuestions.map((question, index) => (
              <li key={question.en} data-reveal className="flex items-baseline gap-6 border-t border-line-strong py-6 last:border-b">
                <span className="font-serif text-xl italic text-muted">0{index + 1}</span>
                <span className={cn("t-display-l", index === approachQuestions.length - 1 && "text-accent")}>{question[locale]}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="formats" className="section relative overflow-hidden scroll-mt-16">
        <Image src={images.goldLines} alt="" sizes="320px" className="img-cut pointer-events-none absolute -top-10 right-[8%] hidden w-64 lg:block" />
        <div className="container-content relative">
          <p className="t-eyebrow text-muted">{t("pricingEyebrow")}</p>
          <h2 className="t-h2 mt-4">{t("pricingTitle")}</h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:items-start">
            {plans.map((plan) => (
              <li
                key={plan.id}
                className={cn(
                  "flex h-full flex-col rounded-[var(--radius-lg)] p-7",
                  plan.featured ? "bg-accent text-on-accent xl:-translate-y-6" : "border border-line bg-surface",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="t-eyebrow">{plan.name}</h3>
                  {plan.featured && (
                    <span className="rounded-full bg-on-accent/15 px-3 py-1 text-xs font-semibold">{t("mainFormat")}</span>
                  )}
                </div>
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="t-price">€{plan.price}</span>
                  <span className={cn("text-sm", plan.featured ? "text-on-accent/80" : "text-muted")}>
                    {plan.period ? plan.period[locale] : t("oneOff")}
                  </span>
                </p>
                <p className={cn("mt-3 font-medium", plan.featured ? "text-on-accent" : "text-text")}>{plan.lead[locale]}</p>
                <ul className="mt-6 flex-1 space-y-3 text-[0.9375rem]">
                  {plan.features.map((feature) => (
                    <li key={feature.en} className="flex gap-3">
                      <Check size={18} className="mt-0.5 shrink-0" />
                      {feature[locale]}
                    </li>
                  ))}
                </ul>
                <TelegramButton variant={plan.featured ? "inverse" : "secondary"} className="mt-8 w-full">
                  {t("choose", { plan: plan.name })}
                </TelegramButton>
              </li>
            ))}
          </ul>
          <p className="mt-12 rounded-[var(--radius-md)] bg-surface-2 p-6 text-sm leading-relaxed">{t("disclaimer")}</p>
        </div>
      </section>

      <section className="section bg-deep text-center text-on-deep">
        <div className="container-content">
          <Ornament className="mx-auto" />
          <h2 className="t-display-l mx-auto mt-8 max-w-[16ch]">{t("ctaTitle")}</h2>
          <p className="t-body-l mx-auto mt-5 max-w-[40ch] text-on-deep-muted">{t("ctaText")}</p>
          <TelegramButton label="talk" variant="inverse" className="mt-10" />
          <p className="mt-6 text-sm text-on-deep-muted">{t("ctaNote")}</p>
        </div>
      </section>
    </>
  );
}
