import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { team } from "@/content/mentorship";
import type { Locale } from "@/i18n/routing";
import { images } from "@/shared/assets/images";
import { PortraitSlot } from "@/shared/ui/portrait-slot";
import { TelegramButton } from "@/shared/ui/telegram-button";

export function TeamPage() {
  const t = useTranslations("team");
  const locale = useLocale() as Locale;
  const [founder, ...members] = team;

  return (
    <>
      <header className="container-content relative overflow-hidden pb-16 pt-14 lg:pt-24">
        <Image src={images.arches} alt="" sizes="560px" className="img-cut pointer-events-none absolute -right-24 -top-10 w-[560px] opacity-50" />
        <div className="animate-rise relative">
          <p className="t-eyebrow text-muted">{t("eyebrow")}</p>
          <h1 className="t-display-xl mt-5 max-w-[12ch]">{t("title")}</h1>
          <p className="t-lead mt-8 max-w-[38ch] text-muted">{t("lead")}</p>
        </div>
      </header>

      <section className="section border-t border-line">
        <div className="container-content grid items-center gap-12 lg:grid-cols-12">
          <div className="mx-auto w-full max-w-[360px] lg:col-span-4">
            <PortraitSlot initials={founder.initials} label={founder.name[locale]} />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="t-eyebrow text-accent">{t("founder")}</p>
            <h2 className="t-display-l mt-4">{founder.name[locale]}</h2>
            <p className="mt-4 text-sm font-medium text-muted">{founder.role[locale]}</p>
            <div className="mt-8 space-y-4">
              {founder.bio.map((paragraph) => (
                <p key={paragraph.en} className="t-body-l">
                  {paragraph[locale]}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface-2">
        <ul className="container-content grid gap-12 md:grid-cols-2">
          {members.map((member) => (
            <li key={member.initials} data-reveal>
              <div className="max-w-[280px]">
                <PortraitSlot initials={member.initials} label={member.name[locale]} />
              </div>
              <h2 className="t-h3 mt-8">{member.name[locale]}</h2>
              <p className="mt-2 text-sm font-medium text-muted">{member.role[locale]}</p>
              <div className="mt-5 space-y-3">
                {member.bio.map((paragraph) => (
                  <p key={paragraph.en} className="text-muted">
                    {paragraph[locale]}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section bg-bg-warm">
        <div className="container-content grid gap-8 lg:grid-cols-12">
          <h2 className="t-h2 lg:col-span-5">{t("behindTitle")}</h2>
          <p className="t-body-l text-muted lg:col-span-6 lg:col-start-7">{t("behindText")}</p>
        </div>
      </section>

      <section className="section relative overflow-hidden bg-deep text-center text-on-deep">
        <Image src={images.fireworks} alt="" sizes="100vw" className="pointer-events-none absolute inset-0 size-full object-cover opacity-45" />
        <div className="container-content relative">
          <p className="t-display-xl mx-auto max-w-[12ch]">{t("closing")}</p>
          <p className="t-body-l mx-auto mt-8 max-w-[48ch] text-on-deep-muted">{t("closingText")}</p>
          <TelegramButton variant="inverse" className="mt-10" />
        </div>
      </section>
    </>
  );
}
