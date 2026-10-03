import type { Tier } from "../model/priorities";
import { cn } from "@/shared/lib/cn";

const color: Record<Tier, string> = {
  red: "text-red",
  amber: "text-amber",
  green: "text-green",
};

/** Shape carries the meaning too: solid, half, ring. Colour is never the only cue. */
export function TierDot({ tier, className }: { tier: Tier; className?: string }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className={cn("size-3 shrink-0", color[tier], className)}>
      {tier === "red" && <circle cx="6" cy="6" r="6" fill="currentColor" />}
      {tier === "amber" && (
        <>
          <circle cx="6" cy="6" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 0a6 6 0 0 0 0 12z" fill="currentColor" />
        </>
      )}
      {tier === "green" && (
        <>
          <circle cx="6" cy="6" r="5.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6" cy="6" r="2" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
