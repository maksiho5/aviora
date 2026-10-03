import { useLocale, useTranslations } from "next-intl";
import { affinityGroups, findings, type CaseVisual } from "@/content/case-study";
import type { Locale } from "@/i18n/routing";
import { ArrowRight } from "@/shared/ui/icons";

const palette = [
  { name: "Cotton", hex: "#F2F3ED" },
  { name: "Egg Shell", hex: "#EDE7DB" },
  { name: "Linen", hex: "#DDCCB7" },
  { name: "Olive", hex: "#9B9879" },
  { name: "Forest", hex: "#4C513A" },
  { name: "Cedar", hex: "#292728" },
];

function Affinity() {
  const locale = useLocale() as Locale;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {affinityGroups.map((group) => (
        <div key={group.title} className="rounded-[var(--radius-md)] bg-surface-2 p-5">
          <p className="t-eyebrow">{group.title}</p>
          <ul className="mt-4 space-y-2">
            {group.notes.map((note) => (
              <li key={note.en} className="rotate-[-0.6deg] rounded-[4px] bg-[#f3e6c8] px-3 py-2 text-sm text-[#292728] shadow-sm even:rotate-[0.8deg]">
                {note[locale]}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Findings() {
  const t = useTranslations("caseStudy");
  const locale = useLocale() as Locale;
  return (
    <ol className="grid gap-3 md:grid-cols-2">
      {findings.map((finding, index) => (
        <li key={finding.en} className="rounded-[var(--radius-md)] border border-line bg-surface p-6">
          <p className="t-eyebrow text-accent">{t("findingLabel", { number: index + 1 })}</p>
          <p className="mt-3 font-serif text-[1.625rem] italic leading-snug">{finding[locale]}</p>
        </li>
      ))}
    </ol>
  );
}

function Architecture() {
  const t = useTranslations("caseStudy");
  const items = t.raw("architecture") as { title: string; question: string }[];
  return (
    <ul className="grid gap-px overflow-hidden rounded-[var(--radius-md)] bg-line sm:grid-cols-5">
      {items.map((item) => (
        <li key={item.title} className="bg-surface p-5">
          <p className="font-semibold">{item.title}</p>
          <p className="mt-1 font-serif text-xl italic text-muted">{item.question}</p>
        </li>
      ))}
    </ul>
  );
}

function Flow() {
  const t = useTranslations("caseStudy");
  const steps = t.raw("flow") as string[];
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-full bg-surface-2 px-4 py-2 font-medium">{step}</span>
          {index < steps.length - 1 && <ArrowRight size={16} className="text-muted" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

function Iteration() {
  const t = useTranslations("caseStudy");
  const before = t.raw("beforeItems") as string[];
  const after = t.raw("afterItems") as string[];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[var(--radius-md)] border border-line bg-surface p-6">
        <p className="t-eyebrow text-muted">
          {t("before")} · {before.length}
        </p>
        <ul className="mt-4 space-y-1.5 text-sm text-muted">
          {before.map((item) => (
            <li key={item} className="rounded-[4px] bg-surface-2 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-[var(--radius-md)] bg-accent p-6 text-on-accent">
        <p className="t-eyebrow">
          {t("after")} · {after.length}
        </p>
        <ul className="mt-4 space-y-3">
          {after.map((item) => (
            <li key={item} className="rounded-[var(--radius-sm)] bg-on-accent/10 px-4 py-4 text-lg font-semibold">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Palette() {
  return (
    <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {palette.map((swatch) => (
        <li key={swatch.name}>
          <div className="aspect-square rounded-[var(--radius-sm)] border border-line" style={{ background: swatch.hex }} />
          <p className="mt-2 text-sm font-medium">{swatch.name}</p>
          <p className="num text-xs text-muted">{swatch.hex}</p>
        </li>
      ))}
    </ul>
  );
}

const visuals: Record<CaseVisual, () => React.ReactNode> = {
  affinity: Affinity,
  findings: Findings,
  architecture: Architecture,
  flow: Flow,
  iteration: Iteration,
  palette: Palette,
};

export function CaseVisualBlock({ visual }: { visual: CaseVisual }) {
  const Visual = visuals[visual];
  return <Visual />;
}
