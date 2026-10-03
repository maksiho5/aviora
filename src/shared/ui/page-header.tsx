import { cn } from "@/shared/lib/cn";

interface PageHeaderProps {
  kicker: string;
  title: string;
  lead?: string;
  aside?: React.ReactNode;
  className?: string;
}

export function PageHeader({ kicker, title, lead, aside, className }: PageHeaderProps) {
  return (
    <header className={cn("container-content grid items-end gap-10 pb-12 pt-14 lg:grid-cols-12 lg:pb-20 lg:pt-24", className)}>
      <div className={cn("animate-rise", aside ? "lg:col-span-6" : "lg:col-span-10")}>
        <p className="t-eyebrow text-muted">{kicker}</p>
        <h1 className="t-h1 mt-5 max-w-[16ch]">{title}</h1>
        {lead && <p className="t-lead mt-6 max-w-[34ch] text-muted">{lead}</p>}
      </div>
      {aside && <div className="lg:col-span-6">{aside}</div>}
    </header>
  );
}
