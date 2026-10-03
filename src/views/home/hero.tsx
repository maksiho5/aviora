import Image from "next/image";
import { useTranslations } from "next-intl";
import { images } from "@/shared/assets/images";
import { buttonClass } from "@/shared/ui/button";
import { Eyebrow } from "@/shared/ui/eyebrow";
import { TelegramButton } from "@/shared/ui/telegram-button";

export function Hero() {
  const t = useTranslations("home");

  return (
    <section className="container-content relative grid min-h-[min(100svh-72px,880px)] items-center gap-12 py-12 lg:grid-cols-12 lg:gap-6 lg:py-16">
      <Image
        src={images.sparkles}
        alt=""
        sizes="64px"
        className="img-cut absolute left-[46%] top-16 hidden w-16 lg:block"
      />
      <div className="animate-rise lg:col-span-7">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="t-display-xl mt-5 max-w-[11ch]">{t("title")}</h1>
        <p className="t-lead mt-6 max-w-[26ch] text-muted">{t("lead")}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#idea" className={buttonClass("primary")}>
            {t("explore")}
          </a>
          <TelegramButton variant="secondary" />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[420px] lg:col-span-5 lg:max-w-none">
        <div className="arch grain aspect-[4/5] w-full">
          <Image
            src={images.seaArch}
            alt={t("heroAlt")}
            priority
            fetchPriority="high"
            placeholder="blur"
            sizes="(min-width: 1024px) 34vw, (min-width: 480px) 420px, 92vw"
            className="img-film size-full scale-[1.04] animate-[rise_900ms_var(--ease-soft)_both] object-cover object-[62%_50%]"
          />
        </div>
        <div className="absolute -bottom-8 -left-4 w-[52%] max-w-[280px] overflow-hidden rounded-[var(--radius-md)] border-4 border-bg shadow-[var(--shadow-pop)] sm:-left-12">
          <Image
            src={images.lakeBalcony}
            alt={t("lakeAlt")}
            placeholder="blur"
            sizes="280px"
            className="img-film aspect-[4/3] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
