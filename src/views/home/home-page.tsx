import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Eyebrow } from "@/shared/ui/eyebrow";
import { CityIndex } from "@/widgets/city-index";
import { cityRows } from "@/widgets/city-rows";
import { PracticalGrid } from "@/widgets/practical-grid";
import { First30Teaser } from "./first30-teaser";
import { Hero } from "./hero";
import { Idea } from "./idea";
import { Moments } from "./moments";
import { Postcard } from "./postcard";
import { Quote } from "./quote";
import { RealLife } from "./real-life";
import { Start } from "./start";
import { StudySection } from "./study";

export function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale() as Locale;

  return (
    <>
      <Hero />
      <Idea />
      <RealLife />
      <StudySection />
      <Moments />

      <section className="section">
        <div className="container-content">
          <Eyebrow>{t("citiesEyebrow")}</Eyebrow>
          <h2 className="t-h2 mb-12 mt-4 max-w-[20ch]">{t("citiesTitle")}</h2>
          <CityIndex rows={cityRows(locale)} />
        </div>
      </section>

      <section className="section bg-surface-2">
        <div className="container-content">
          <Eyebrow>{t("practicalEyebrow")}</Eyebrow>
          <h2 className="t-h2 mb-12 mt-4 max-w-[24ch]">{t("practicalTitle")}</h2>
          <PracticalGrid compact />
        </div>
      </section>

      <First30Teaser />
      <Postcard />
      <Quote />
      <Start />
    </>
  );
}
