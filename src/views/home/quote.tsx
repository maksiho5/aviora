import Image from "next/image";
import { useTranslations } from "next-intl";
import { images } from "@/shared/assets/images";
import { Ornament } from "@/shared/ui/ornament";
import { richTags } from "@/shared/ui/rich";

export function Quote() {
  const t = useTranslations("home");

  return (
    <section className="section relative overflow-hidden">
      <Image
        src={images.lily}
        alt=""
        sizes="360px"
        className="img-cut pointer-events-none absolute -bottom-6 -left-10 hidden w-[340px] opacity-80 md:block"
      />
      <figure className="container-content relative text-center">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-[var(--radius-lg)]">
          <Image src={images.goldenSun} alt="" placeholder="blur" sizes="(min-width: 768px) 768px, 100vw" className="aspect-[21/8] w-full object-cover" />
        </div>
        <Ornament className="mx-auto mt-10" />
        <blockquote className="mx-auto mt-10 max-w-[22ch]">
          <p className="t-display-l">“{t.rich("quote", richTags)}”</p>
        </blockquote>
        <figcaption className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-muted">{t("quoteBy")}</figcaption>
      </figure>
    </section>
  );
}
