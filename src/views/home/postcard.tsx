import Image from "next/image";
import { useTranslations } from "next-intl";
import { images } from "@/shared/assets/images";
import { Eyebrow } from "@/shared/ui/eyebrow";

export function Postcard() {
  const t = useTranslations("home");
  const lines = t.raw("postcardLines") as string[];

  return (
    <section className="section overflow-hidden bg-bg-warm">
      <div className="container-content grid items-center gap-14 lg:grid-cols-12">
        <figure className="relative mx-auto w-full max-w-[420px] -rotate-2 bg-white p-3 shadow-[var(--shadow-pop)] lg:col-span-5 lg:max-w-none">
          <Image
            src={images.postmark}
            alt=""
            sizes="160px"
            className="pointer-events-none absolute -right-10 -top-12 z-10 w-40 rotate-12 opacity-80 mix-blend-multiply"
          />
          <div className="grain">
            <Image
              src={images.colosseum}
              alt={t("postcardAlt")}
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, 420px"
              className="img-film aspect-[4/3] w-full object-cover"
            />
          </div>
          <figcaption className="flex items-center justify-between px-1 pb-1 pt-3 font-serif text-lg italic text-[#292728]">
            <span>Roma</span>
            <Image src={images.stamp} alt="" sizes="48px" className="w-12 rotate-3" />
          </figcaption>
        </figure>
        <div className="lg:col-span-6 lg:col-start-7">
          <Eyebrow>{t("postcardEyebrow")}</Eyebrow>
          <ul className="mt-6 space-y-1">
            {lines.map((line, index) => (
              <li
                key={line}
                className={
                  index === lines.length - 1
                    ? "font-serif text-[clamp(2.5rem,1.6rem+4.2vw,5rem)] italic leading-none tracking-[-0.02em] text-accent"
                    : "text-[clamp(2rem,1.3rem+3vw,3.75rem)] font-extrabold leading-[1.02] tracking-[-0.04em] lowercase"
                }
              >
                {line}
              </li>
            ))}
          </ul>
          <p className="t-body-l mt-8 max-w-[46ch] text-muted">{t("postcardText")}</p>
        </div>
      </div>
      <div className="container-content mt-16">
        <div className="grain overflow-hidden rounded-[4px]">
          <Image
            src={images.colosseumSummer}
            alt={t("postcardRawAlt")}
            placeholder="blur"
            sizes="(min-width: 768px) 685px, 100vw"
            className="aspect-[21/9] w-full object-cover md:ml-auto md:max-w-[685px]"
          />
        </div>
      </div>
      <Image src={images.laceFlag} alt="" sizes="100vw" className="mt-16 h-3 w-full object-cover opacity-90" />
    </section>
  );
}
