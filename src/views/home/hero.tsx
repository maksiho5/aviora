import Image from "next/image";
import { useTranslations } from "next-intl";
import { images } from "@/shared/assets/images";
import { buttonClass } from "@/shared/ui/button";
import { Eyebrow } from "@/shared/ui/eyebrow";
import { TelegramButton } from "@/shared/ui/telegram-button";
import { HeroVideo } from "./hero-video";

export function Hero() {
  const t = useTranslations("home");

  return (
    <section className="container-content relative grid min-h-[min(100svh-72px,880px)] items-center gap-12 py-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
      <Image src={images.sparkles} alt="" sizes="64px" className="img-cut absolute left-[44%] top-16 hidden w-16 lg:block" />
      <div className="animate-rise lg:col-span-6">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="t-display-xl mt-5 max-w-[11ch] [overflow-wrap:normal] lg:text-[clamp(4rem,1rem+5.4vw,6.75rem)]">{t("title")}</h1>
        <p className="t-lead mt-6 max-w-[26ch] text-muted">{t("lead")}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#idea" className={buttonClass("primary")}>
            {t("explore")}
          </a>
          <TelegramButton variant="secondary" />
        </div>
      </div>

      <div className="relative lg:col-span-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="frame grain relative col-span-2 aspect-[16/10] lg:col-span-1 lg:row-span-2 lg:aspect-auto">
            <HeroVideo label={t("heroAlt")} />
          </div>
          <div className="frame grain aspect-[4/3]">
            <Image
              src={images.duomo}
              alt={t("duomoAlt")}
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 24vw, 50vw"
              className="img-film size-full object-cover"
            />
          </div>
          <div className="frame grain aspect-[4/3]">
            <Image
              src={images.palms}
              alt={t("palmsAlt")}
              placeholder="blur"
              sizes="(min-width: 1024px) 24vw, 50vw"
              className="img-film size-full object-cover"
            />
          </div>
        </div>
        <Image
          src={images.stamp}
          alt=""
          sizes="112px"
          className="absolute -right-2 -top-10 hidden w-28 rotate-6 rounded-[4px] shadow-[var(--shadow-pop)] sm:block"
        />
      </div>
    </section>
  );
}
