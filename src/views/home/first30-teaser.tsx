import { useTranslations } from "next-intl";
import { DashboardPreview } from "@/features/first30/ui/dashboard-preview";
import { ButtonLink } from "@/shared/ui/button";

export function First30Teaser() {
  const t = useTranslations("home");

  return (
    <section className="section bg-deep text-on-deep">
      <div className="container-content grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="t-eyebrow text-on-deep-muted">{t("first30Eyebrow")}</p>
          <h2 className="t-display-l mt-5 max-w-[12ch]">{t("first30Title")}</h2>
          <p className="t-body-l mt-6 max-w-[42ch] text-on-deep-muted">{t("first30Text")}</p>
          <ButtonLink href="/first-30" variant="inverse" className="mt-10">
            {t("first30Cta")}
          </ButtonLink>
        </div>
        <div data-reveal className="mx-auto w-full max-w-[440px] lg:col-span-5 lg:col-start-8">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
