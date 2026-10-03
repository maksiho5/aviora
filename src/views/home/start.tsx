import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { images } from "@/shared/assets/images";
import { Eyebrow } from "@/shared/ui/eyebrow";
import { ArrowRight } from "@/shared/ui/icons";
import { TelegramButton } from "@/shared/ui/telegram-button";

const doors = [
  { key: "read", href: "/study" },
  { key: "try", href: "/first-30" },
  { key: "talk", href: "/mentorship" },
] as const;

export function Start() {
  const t = useTranslations("home");

  return (
    <section className="section border-t border-line">
      <div className="container-content">
        <Eyebrow>{t("startEyebrow")}</Eyebrow>
        <h2 className="t-h2 mt-4 max-w-[18ch]">{t("startTitle")}</h2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] bg-line md:grid-cols-3">
          {doors.map(({ key, href }, index) => (
            <li key={key} className="relative bg-bg p-7 transition-colors hover:bg-surface sm:p-9">
              <span className="font-serif text-6xl italic leading-none text-line-strong">{index + 1}</span>
              <h3 className="t-h3 mt-8">
                <Link href={href} className="stretched-link no-underline">
                  {t(`doors.${key}.title`)}
                </Link>
              </h3>
              <p className="mt-2 max-w-[30ch] text-muted">{t(`doors.${key}.text`)}</p>
              <ArrowRight className="absolute right-7 top-9 text-muted" />
            </li>
          ))}
        </ol>

        <div className="mt-6 flex items-center gap-6 rounded-[var(--radius-lg)] bg-surface-2 p-7 sm:p-10">
          <Image src={images.hands} alt="" placeholder="blur" sizes="200px" className="img-mono hidden aspect-[3/4] w-40 rounded-[4px] object-cover lg:block" />
          <div className="flex-1">
            <p className="font-serif text-[2rem] italic leading-tight">{t("followTitle")}</p>
            <p className="mt-2 max-w-[48ch] text-muted">{t("followText")}</p>
            <TelegramButton className="mt-6" />
          </div>
          <Image src={images.jeans} alt="" placeholder="blur" sizes="200px" className="img-mono hidden aspect-[3/4] w-40 rounded-[4px] object-cover lg:block" />
        </div>
      </div>
    </section>
  );
}
