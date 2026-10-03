import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { images } from "@/shared/assets/images";
import { Eyebrow } from "@/shared/ui/eyebrow";
import { richTags } from "@/shared/ui/rich";

export function Idea() {
  const t = useTranslations("home");

  return (
    <section id="idea" className="section relative overflow-hidden">
      <Image
        src={images.arches}
        alt=""
        sizes="640px"
        className="img-cut pointer-events-none absolute -left-40 top-10 w-[640px] opacity-60"
      />
      <div className="container-content relative grid gap-8 lg:grid-cols-12">
        <Eyebrow className="lg:col-span-3 lg:pt-4">{t("ideaEyebrow")}</Eyebrow>
        <div data-reveal className="lg:col-span-8">
          <p className="t-h2 max-w-[24ch]">{t.rich("ideaText", richTags)}</p>
          <div className="mt-10 grid items-end gap-8 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="t-body-l max-w-[56ch] text-muted">{t("ideaMore")}</p>
              <Link href="/team" className="link-underline mt-6 inline-flex min-h-11 items-center font-semibold">
                {t("ideaSign")}
              </Link>
            </div>
            <Image src={images.bulb} alt="" sizes="200px" className="img-cut mask-soft w-36 justify-self-end sm:w-48" />
          </div>
        </div>
      </div>
    </section>
  );
}
