import Image from "next/image";
import { useTranslations } from "next-intl";
import { images } from "@/shared/assets/images";
import { ButtonLink } from "@/shared/ui/button";

export function NotFoundView() {
  const t = useTranslations("notFound");
  const footer = useTranslations("footer");

  return (
    <section className="container-content grid min-h-[70dvh] items-center gap-12 py-16 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <p className="t-eyebrow text-muted">404</p>
        <h1 className="t-h1 mt-5 max-w-[14ch]">{t("title")}</h1>
        <p className="t-lead mt-6 text-muted">{t("text")}</p>
        <ButtonLink href="/" className="mt-10">
          {t("home")}
        </ButtonLink>
        <p className="mt-10 font-serif text-xl italic text-muted">{footer("tagline")}</p>
      </div>
      <div className="lg:col-span-5 lg:col-start-8">
        <Image src={images.laceFlag} alt={t("alt")} placeholder="blur" sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-video w-full rounded-[4px] object-cover" />
      </div>
    </section>
  );
}
