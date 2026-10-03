import { cn } from "@/shared/lib/cn";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("t-eyebrow text-muted", className)}>{children}</p>;
}
