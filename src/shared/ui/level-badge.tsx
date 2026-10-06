import { cn } from "@/shared/lib/cn";

function UkFlag() {
  return (
    <svg viewBox="0 0 60 30" className="h-3 w-[24px] rounded-[2px]" aria-hidden="true">
      <clipPath id="uk-flag-clip">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-flag-clip)" stroke="#c8102e" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  );
}

function ItalyFlag() {
  return (
    <svg viewBox="0 0 18 12" className="h-3 w-[18px] rounded-[2px]" aria-hidden="true">
      <rect width="6" height="12" fill="#008c45" />
      <rect x="6" width="6" height="12" fill="#f4f5f0" />
      <rect x="12" width="6" height="12" fill="#cd212a" />
    </svg>
  );
}

const flags = { en: UkFlag, it: ItalyFlag } as const;

/** Recreated from the moodboard badges as live type, so it stays sharp and translatable. */
export function LevelBadge({ language, level, className }: { language: keyof typeof flags; level: string; className?: string }) {
  const Flag = flags[language];
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-sm font-semibold", className)}>
      <Flag />
      <span className="uppercase">{language}</span>
      <span className="num text-muted">{level}</span>
    </span>
  );
}
