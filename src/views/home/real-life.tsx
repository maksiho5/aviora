import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { images } from "@/shared/assets/images";
import { ArrowRight } from "@/shared/ui/icons";
import { Eyebrow } from "@/shared/ui/eyebrow";

const items = [
  { key: "media", href: "/cities" },
  { key: "mentorship", href: "/mentorship" },
  { key: "tools", href: "/first-30" },
] as const;

export function RealLife() {
  const t = useTranslations("home");

  return (
    <section className="section bg-bg-warm">
      <div className="container-content">
        <div className="grain overflow-hidden rounded-[4px]">
          <Image
            src={images.books}
            alt={t("realAlt")}
            placeholder="blur"
            sizes="(min-width: 1280px) 1199px, 100vw"
            className="img-mono aspect-[3/2] w-full object-cover lg:aspect-[21/9]"
          />
        </div>
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{t("realEyebrow")}</Eyebrow>
              <h2 className="t-h2 mt-4 max-w-[16ch]">{t("realTitle")}</h2>
              <p className="t-body-l mt-6 max-w-[40ch] text-muted">{t("realText")}</p>
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {items.map(({ key, href }, index) => (
              <li key={key} data-reveal className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line-strong py-8 last:border-b">
                <span className="font-serif text-2xl italic text-muted">0{index + 1}</span>
                <div>
                  <h3 className="t-h3">{t(`realItems.${key}.title`)}</h3>
                  <p className="mt-2 max-w-[44ch] text-muted">{t(`realItems.${key}.text`)}</p>
                  <Link href={href} className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold no-underline hover:underline">
                    {t(`realItems.${key}.link`)}
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
