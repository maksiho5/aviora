import Image from "next/image";
import { useTranslations } from "next-intl";
import { images } from "@/shared/assets/images";
import { Building, Speech } from "@/shared/ui/icons";
import { PageHeader } from "@/shared/ui/page-header";
import { PracticalGrid, practicalTopics } from "@/widgets/practical-grid";

export function PracticalPage() {
  const t = useTranslations("practical");
  const task = useTranslations("first30.task");

  return (
    <>
      <PageHeader
        kicker={t("kicker")}
        title={t("title")}
        lead={t("lead")}
        aside={
          <div className="grain overflow-hidden rounded-[4px]">
            <Image
              src={images.papers}
              alt=""
              placeholder="blur"
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="img-film aspect-[16/9] w-full object-cover"
            />
          </div>
        }
      />

      <section className="container-content">
        <PracticalGrid showWhen />
      </section>

      <section className="section">
        <div className="container-content grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h2 className="t-h2">{t("officialTitle")}</h2>
              <p className="mt-4 text-muted">{t("officialText")}</p>
              <div className="mt-8 space-y-3">
                <p className="flex items-center gap-3 border-l-[3px] border-official bg-surface py-3 pl-4 text-sm font-semibold">
                  <Building size={18} />
                  {task("officialBadge")}
                </p>
                <p className="flex items-center gap-3 border-l-[3px] border-dashed border-community bg-surface-2 py-3 pl-4 text-sm font-semibold">
                  <Speech size={18} />
                  {task("communityBadge")}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {practicalTopics.map((topic, index) => (
              <article key={topic} id={topic} data-reveal className="scroll-mt-24 border-t border-line-strong py-10 first:border-t-0 first:pt-0">
                <p className="font-serif text-xl italic text-muted">0{index + 1}</p>
                <h3 className="t-h3 mt-2">{t(`topics.${topic}.title`)}</h3>
                <p className="mt-1 text-sm text-muted">
                  {t("useWhen")} {t(`topics.${topic}.when`)}
                </p>
                <p className="t-body-l mt-4">{t(`topics.${topic}.text`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
