import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { images } from "@/shared/assets/images";
import { Eyebrow } from "@/shared/ui/eyebrow";
import { ArrowRight } from "@/shared/ui/icons";
import { LevelBadge } from "@/shared/ui/level-badge";

const tiles = ["admissions", "universities", "scholarships", "studentLife"] as const;
const anchors = { admissions: "admissions", universities: "universities", scholarships: "scholarships", studentLife: "student-life" };

export function StudySection() {
  const t = useTranslations("home");
  const study = useTranslations("study");

  return (
    <section className="section">
      <div className="container-content grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="arch grain mx-auto aspect-[3/4] max-w-[360px] lg:max-w-none">
            <Image
              src={images.desk}
              alt={t("studyAlt")}
              placeholder="blur"
              sizes="(min-width: 1024px) 30vw, 360px"
              className="img-film size-full object-cover"
            />
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Eyebrow>{t("studyEyebrow")}</Eyebrow>
          <h2 className="t-h2 mt-4 max-w-[18ch]">{t("studyTitle")}</h2>
          <p className="t-body-l mt-5 max-w-[48ch] text-muted">{t("studyText")}</p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {tiles.map((key, index) => (
              <li key={key} className="relative rounded-[var(--radius-md)] bg-surface-2 p-6 transition-colors hover:bg-surface-3">
                <span className="font-serif text-xl italic text-muted">0{index + 1}</span>
                <h3 className="t-h3 mt-3">
                  <Link href={`/study#${anchors[key]}`} className="stretched-link no-underline">
                    {study(`${key}.title`)}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{study(`${key}.text`)}</p>
                {key === "admissions" && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <LevelBadge language="en" level="B2/C1" />
                    <LevelBadge language="it" level="A2/B1" />
                  </div>
                )}
                <ArrowRight size={18} className="absolute right-6 top-6 text-muted" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
