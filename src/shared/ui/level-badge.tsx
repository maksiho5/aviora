import { cn } from "@/shared/lib/cn";

const flags = {
  en: ["#012169", "#ffffff", "#c8102e"],
  it: ["#008c45", "#f4f5f0", "#cd212a"],
} as const;

/** Recreated from the moodboard badges as live type, so it stays sharp and translatable. */
export function LevelBadge({ language, level, className }: { language: keyof typeof flags; level: string; className?: string }) {
  const [a, b, c] = flags[language];
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-sm font-semibold", className)}>
      <svg viewBox="0 0 18 12" className="h-3 w-[18px] rounded-[2px]" aria-hidden="true">
        <rect width="6" height="12" fill={a} />
        <rect x="6" width="6" height="12" fill={b} />
        <rect x="12" width="6" height="12" fill={c} />
      </svg>
      <span className="uppercase">{language}</span>
      <span className="num text-muted">{level}</span>
    </span>
  );
}
