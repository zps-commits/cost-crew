import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.16em] transition-colors duration-500 ease-[var(--ease-coast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-bone hover:bg-chocolate",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-bone",
  ghost: "text-ink/70 hover:text-ink",
};

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-coast)] group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Props = {
  children: React.ReactNode;
  href: string;
  variant?: Variant;
  withArrow?: boolean;
  external?: boolean;
  className?: string;
  "aria-label"?: string;
};

export function Button({
  children,
  href,
  variant = "solid",
  withArrow = true,
  external = false,
  className,
  ...rest
}: Props) {
  const content = (
    <>
      <span>{children}</span>
      {withArrow && <Arrow />}
    </>
  );
  const classes = cn(base, variants[variant], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}
