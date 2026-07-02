import { cn } from "@/lib/utils";

export function WaveMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 34"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-auto w-9", className)}
      aria-hidden="true"
    >
      <path d="M6 20c4-9 10-14 16-14 5 0 8 4 8 9" />
      <path d="M20 20c4-7 8-10 12-10 4 0 6 3 6 7" />
      <path d="M33 20c3-5 6-7 9-7 3 0 5 2 5 5" />
      <path d="M3 27h58" />
      <path d="M8 32h48" opacity={0.5} />
    </svg>
  );
}

export function Logo({
  className,
  showTagline = false,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <WaveMark className="w-8" />
      <span className="flex flex-col leading-none">
        <span className="label !tracking-[0.24em] text-[0.95rem] font-semibold">
          COST CREW
        </span>
        {showTagline && (
          <span className="mt-1 font-display italic text-[0.8rem] tracking-normal opacity-70">
            find your coast.
          </span>
        )}
      </span>
    </span>
  );
}
