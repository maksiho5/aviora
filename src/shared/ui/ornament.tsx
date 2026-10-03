import { cn } from "@/shared/lib/cn";

/** Gold hairline divider. Used where the photographed ornament cannot sit on a dark band. */
export function Ornament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 16" aria-hidden="true" className={cn("h-4 w-48 text-gold", className)}>
      <path d="M0 8h82M118 8h82" stroke="currentColor" strokeWidth="1" />
      <path d="M100 1l7 7-7 7-7-7z" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="88" cy="8" r="1.5" fill="currentColor" />
      <circle cx="112" cy="8" r="1.5" fill="currentColor" />
    </svg>
  );
}
