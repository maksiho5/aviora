import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { images } from "@/shared/assets/images";
import { Eyebrow } from "@/shared/ui/eyebrow";

const moments = ["coffee", "train", "market"] as const;

export function Moments() {
  const t = useTranslations("home");

  return (
    <section className="section bg-surface-2">
      <div className="container-content">
        <Eyebrow>{t("lifeEyebrow")}</Eyebrow>
        <h2 className="t-h2 mt-4 max-w-[18ch]">{t("lifeTitle")}</h2>
      </div>
      <ul className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-auto md:grid md:max-w-[calc(80rem+2*var(--gutter))] md:grid-cols-4 md:overflow-visible">
        {moments.map((key) => (
          <li
            key={key}
            className="relative flex min-h-[340px] w-[280px] shrink-0 snap-start flex-col rounded-[var(--radius-lg)] bg-surface p-7 md:w-auto"
          >
            <p className="num font-serif text-[3.5rem] italic leading-none tracking-[-0.02em]">{t(`moments.${key}.time`)}</p>
            <h3 className="t-h3 mt-auto pt-10">
              <Link href="/life" className="stretched-link no-underline">
                {t(`moments.${key}.title`)}
              </Link>
            </h3>
            <p className="mt-2 text-muted">{t(`moments.${key}.text`)}</p>
          </li>
        ))}
        <li className="relative min-h-[340px] w-[280px] shrink-0 snap-start overflow-hidden rounded-[var(--radius-lg)] md:w-auto">
          <Image src={images.bellaItalia} alt="Bella Italia" sizes="(min-width: 768px) 25vw, 280px" className="absolute inset-0 size-full object-cover" />
        </li>
      </ul>
    </section>
  );
}
