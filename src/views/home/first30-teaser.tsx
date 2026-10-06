import Image from "next/image";
import { useTranslations } from "next-intl";
import { DashboardPreview } from "@/features/first30/ui/dashboard-preview";
import { images } from "@/shared/assets/images";
import { ButtonLink } from "@/shared/ui/button";

export function First30Teaser() {
  const t = useTranslations("home");

  return (
    <section className="section relative overflow-hidden bg-deep text-on-deep">
      <Image src={images.worldLights} alt="" sizes="100vw" className="pointer-events-none absolute inset-0 size-full object-cover opacity-25 mix-blend-screen" />
      <div className="container-content relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="t-eyebrow text-on-deep-muted">{t("first30Eyebrow")}</p>
          <h2 className="t-display-l mt-5 max-w-[12ch]">{t("first30Title")}</h2>
          <p className="t-body-l mt-6 max-w-[42ch] text-on-deep-muted">{t("first30Text")}</p>
          <ButtonLink href="/first-30" variant="inverse" className="mt-10">
            {t("first30Cta")}
          </ButtonLink>
          <Image
            src={images.boardingPass}
            alt={t("teaserAlt")}
            sizes="(min-width: 1024px) 360px, 80vw"
            className="mt-12 w-full max-w-[360px] -rotate-2 rounded-[var(--radius-sm)] shadow-[0_24px_48px_-24px_rgb(0_0_0/0.6)]"
          />
        </div>
        <div data-reveal className="mx-auto w-full max-w-[440px] lg:col-span-5 lg:col-start-8">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
