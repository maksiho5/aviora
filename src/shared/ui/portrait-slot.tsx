import { cn } from "@/shared/lib/cn";

/** Same footprint as a real portrait, so adding photos later causes no layout shift. */
export function PortraitSlot({ initials, label, className }: { initials: string; label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("frame grid aspect-[4/5] w-full place-items-center bg-linen text-forest", className)}
    >
      <span className="font-serif text-[clamp(4rem,3rem+5vw,8rem)] italic leading-none" aria-hidden="true">
        {initials}
      </span>
    </div>
  );
}
