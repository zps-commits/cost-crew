import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("label inline-flex items-center gap-3 text-clay", className)}>
      <span className="h-px w-8 bg-current opacity-50" />
      {children}
    </span>
  );
}
