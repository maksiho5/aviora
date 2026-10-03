import Image from "next/image";
import { useTranslations } from "next-intl";
import { images } from "@/shared/assets/images";
import { ButtonLink } from "@/shared/ui/button";
import { PageHeader } from "@/shared/ui/page-header";

interface Moment {
  time: string;
  title: string;
  text: string;
  fact: string;
}

export function LifePage() {
  const t = useTranslations("life");
  const nav = useTranslations("nav");
  const moments = t.raw("moments") as Moment[];

  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} lead={t("lead")} />

      <section className="container-content pb-[var(--section-y)]">
        <ol>
          {moments.map((moment) => (
            <li key={moment.title} data-reveal className="grid gap-6 border-t border-line-strong py-12 lg:grid-cols-12 lg:py-16">
              <p className="num font-serif text-[clamp(3rem,2rem+4vw,5.5rem)] italic leading-none tracking-[-0.02em] lg:col-span-3">
                {moment.time}
              </p>
              <div className="lg:col-span-5">
                <h2 className="t-h3">{moment.title}</h2>
                <p className="t-body-l mt-4 text-muted">{moment.text}</p>
              </div>
              <p className="self-end text-sm font-semibold uppercase tracking-[0.1em] text-accent lg:col-span-3 lg:col-start-10">
                {moment.fact}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-6 grid items-center gap-8 rounded-[var(--radius-lg)] bg-surface-2 p-6 sm:grid-cols-[200px_1fr] sm:p-8">
          <Image
            src={images.vinyl}
            alt={t("radioAlt")}
            placeholder="blur"
            sizes="200px"
            className="img-film aspect-square w-full max-w-[200px] rounded-full object-cover"
          />
          <div>
            <h2 className="font-serif text-[2rem] italic leading-tight">{t("radioTitle")}</h2>
            <p className="mt-2 max-w-[44ch] text-muted">{t("radioText")}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-3">
          <p className="mr-4 font-semibold">{t("next")}</p>
          <ButtonLink href="/cities" variant="secondary">
            {nav("cities")}
          </ButtonLink>
          <ButtonLink href="/practical" variant="secondary">
            {nav("practical")}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
