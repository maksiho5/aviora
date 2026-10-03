import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { italyCities, type ItalyCity } from "@/content/cities";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { images } from "@/shared/assets/images";
import { ButtonLink } from "@/shared/ui/button";
import { ArrowLeft, ArrowRight } from "@/shared/ui/icons";
import { monthlyRange } from "./cost";

const lenses = ["study", "live", "cost", "discover"] as const;

function neighbours(slug: string) {
  const index = italyCities.findIndex((city) => city.slug === slug);
  const size = italyCities.length;
  return {
    prev: italyCities[(index - 1 + size) % size],
    next: italyCities[(index + 1) % size],
  };
}

export function CityPage({ city }: { city: ItalyCity }) {
  const t = useTranslations("cities");
  const locale = useLocale() as Locale;
  const { prev, next } = neighbours(city.slug);
  const [min, max] = monthlyRange(city);

  return (
    <>
      <header className="container-content grid items-end gap-10 pb-10 pt-14 lg:grid-cols-12 lg:pt-20">
        <div className="animate-rise lg:col-span-7">
          <p className="t-eyebrow text-muted">
            {city.region[locale]} · {city.rhythm[locale]}
          </p>
          <h1 className="t-display-xl mt-5">{city.name[locale]}</h1>
          <p className="t-lead mt-6 max-w-[34ch] text-muted">{city.intro[locale]}</p>
        </div>
        <div className="mx-auto w-full max-w-[380px] lg:col-span-4 lg:col-start-9 lg:max-w-none">
          <div className="arch grain aspect-[4/5]">
            <Image
              src={images[city.image]}
              alt={city.imageAlt[locale]}
              placeholder="blur"
              priority
              sizes="(min-width: 1024px) 30vw, 380px"
              className="img-film size-full object-cover"
            />
          </div>
        </div>
      </header>

      <nav aria-label={city.name[locale]} className="sticky top-0 z-30 border-y border-line bg-bg">
        <ul className="container-content grid grid-cols-4">
          {lenses.map((lens) => (
            <li key={lens}>
              <a
                href={`#${lens}`}
                className="flex min-h-12 items-center justify-center text-xs font-semibold uppercase tracking-[0.1em] no-underline hover:text-accent sm:text-sm"
              >
                {t(`lenses.${lens}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-content">
        <section id="study" className="grid gap-8 border-b border-line py-16 lg:grid-cols-12 lg:py-24">
          <h2 className="t-h2 lg:col-span-4">{t("lenses.study")}</h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="t-body-l">{city.study[locale]}</p>
            <p className="t-eyebrow mt-10 text-muted">{t("universities")}</p>
            <ul className="mt-4 space-y-2">
              {city.universities.map((name) => (
                <li key={name} className="rounded-[var(--radius-sm)] bg-surface-2 px-5 py-4 font-medium">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="live" className="grid gap-8 border-b border-line py-16 lg:grid-cols-12 lg:py-24">
          <h2 className="t-h2 lg:col-span-4">{t("lenses.live")}</h2>
          <p className="t-body-l lg:col-span-7 lg:col-start-6">{city.live[locale]}</p>
        </section>

        <section id="cost" className="grid gap-8 border-b border-line py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <h2 className="t-h2">{t("lenses.cost")}</h2>
            <p className="t-price mt-6 num">
              €{min}–{max}
            </p>
            <p className="mt-2 text-sm text-muted">{t("perMonth")}</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <dl className="divide-y divide-line rounded-[var(--radius-md)] bg-surface">
              {city.cost.map((line) => (
                <div key={line.label.en} className="flex items-center justify-between gap-6 px-5 py-4">
                  <dt>{line.label[locale]}</dt>
                  <dd className="num font-semibold">
                    €{line.range[0]}–{line.range[1]}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-muted">{t("estimate")}</p>
            {city.hasFirst30 && (
              <Link href="/first-30/milan/budget" className="link-underline mt-4 inline-flex min-h-11 items-center font-semibold">
                {t("budgetTool")}
              </Link>
            )}
          </div>
        </section>

        <section id="discover" className="grid gap-8 py-16 lg:grid-cols-12 lg:py-24">
          <h2 className="t-h2 lg:col-span-4">{t("lenses.discover")}</h2>
          <ol className="lg:col-span-7 lg:col-start-6">
            {city.discover.map((place, index) => (
              <li key={place.en} className="flex items-baseline gap-5 border-t border-line-strong py-5 last:border-b">
                <span className="font-serif text-xl italic text-muted">0{index + 1}</span>
                <span className="font-serif text-[1.75rem] italic leading-tight">{place[locale]}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {city.hasFirst30 && (
        <section className="section bg-deep text-on-deep">
          <div className="container-content grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="t-eyebrow text-on-deep-muted">FIRST 30</p>
              <h2 className="t-display-l mt-4">{t("firstHere")}</h2>
              <p className="t-body-l mt-4 max-w-[44ch] text-on-deep-muted">{t("firstHereText")}</p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <ButtonLink href="/first-30/milan/onboarding" variant="inverse">
                {t("firstHereCta")}
              </ButtonLink>
            </div>
          </div>
        </section>
      )}

      <nav aria-label={t("kicker")} className="container-content grid grid-cols-2 border-t border-line">
        <Link href={`/cities/${prev.slug}`} className="group flex min-h-28 flex-col justify-center gap-1 py-8 no-underline">
          <span className="flex items-center gap-2 text-sm text-muted">
            <ArrowLeft size={16} />
            {t("prev")}
          </span>
          <span className="font-serif text-[2rem] italic leading-none group-hover:text-accent">{prev.name[locale]}</span>
        </Link>
        <Link href={`/cities/${next.slug}`} className="group flex min-h-28 flex-col items-end justify-center gap-1 py-8 text-right no-underline">
          <span className="flex items-center gap-2 text-sm text-muted">
            {t("next")}
            <ArrowRight size={16} />
          </span>
          <span className="font-serif text-[2rem] italic leading-none group-hover:text-accent">{next.name[locale]}</span>
        </Link>
      </nav>
    </>
  );
}
