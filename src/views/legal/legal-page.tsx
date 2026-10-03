import { useTranslations } from "next-intl";
import { TelegramButton } from "@/shared/ui/telegram-button";

const blocks = ["advice", "store", "cookies", "map"] as const;

export function LegalPage() {
  const t = useTranslations("legal");

  return (
    <article className="container-text py-16 lg:py-24">
      <h1 className="t-h1">{t("title")}</h1>
      {blocks.map((block) => (
        <section key={block} className="mt-12">
          <h2 className="t-h3">{t(`${block}Title`)}</h2>
          <p className="t-body-l mt-3 text-muted">{t(`${block}Text`)}</p>
        </section>
      ))}
      <section className="mt-12">
        <h2 className="t-h3">{t("contactTitle")}</h2>
        <p className="t-body-l mt-3 text-muted">{t("contactText")}</p>
        <TelegramButton variant="link" className="mt-2">
          @avioraItalyEu
        </TelegramButton>
      </section>
    </article>
  );
}
