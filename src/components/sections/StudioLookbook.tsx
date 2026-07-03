"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { TiltCard } from "@/components/ui/TiltCard";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/data/products";
import { easeCoast } from "@/lib/motion";
import { cn } from "@/lib/utils";

const labels: Record<string, string> = { sand: "A", olive: "B", brown: "C" };

export function StudioLookbook() {
  const [active, setActive] = useState(0);
  const n = products.length;
  const go = (dir: number) => setActive((a) => (a + dir + n) % n);

  return (
    <section
      id="lookbook"
      className="relative overflow-hidden bg-bone px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* header */}
      <div className="mx-auto flex max-w-[1400px] flex-col items-center text-center">
        <Reveal>
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink">
            <PlayIcon className="ml-0.5 h-4 w-4" />
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="label mt-5 text-ink-soft">Play. Swipe. Discover.</p>
        </Reveal>
        <Reveal delay={0.16}>
          <h2 className="mt-4 max-w-[20ch] font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.1] text-ink">
            Play the fit. <span className="italic text-clay">Feel the movement.</span>
          </h2>
        </Reveal>
      </div>

      {/* ---------- desktop stage ---------- */}
      <div className="relative mx-auto mt-16 hidden max-w-[1400px] sm:block">
        <div className="flex items-center justify-center gap-6 [perspective:1600px] lg:gap-10">
          {products.map((p, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={p.id}
                initial={false}
                animate={{
                  scale: isActive ? 1.06 : 0.92,
                  y: isActive ? -14 : 8,
                  opacity: isActive ? 1 : 0.82,
                }}
                transition={{ duration: 0.8, ease: easeCoast }}
                className="relative w-[clamp(220px,22vw,320px)] shrink-0"
                style={{ zIndex: isActive ? 20 : 10 }}
              >
                {/* larger, lightly-blurred multi-pose video behind the card */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-[4.5rem] -top-24 -bottom-16 -z-10 overflow-hidden rounded-[2.6rem]"
                >
                  <motion.div
                    animate={{ opacity: isActive ? 0.85 : 0.55 }}
                    transition={{ duration: 0.8 }}
                    className="h-full w-full scale-110 blur-[6px]"
                  >
                    <VideoPlayer
                      src={p.studioBackdrop}
                      poster={p.studioBackdropPoster}
                      objectPosition="center 28%"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-bone/40 via-transparent to-bone/20" />
                </div>

                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${p.name}`}
                  aria-pressed={isActive}
                  className="block w-full"
                >
                  <TiltCard max={isActive ? 10 : 6} scale={1.02}>
                    <FrontCard product={p} active={isActive} priority={i === 0} />
                  </TiltCard>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* arrows */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous look"
          className="absolute left-0 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-bone/70 text-ink backdrop-blur transition-colors hover:bg-ink hover:text-bone"
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next look"
          className="absolute right-0 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-bone/70 text-ink backdrop-blur transition-colors hover:bg-ink hover:text-bone"
        >
          <Chevron dir="right" />
        </button>
      </div>

      {/* ---------- mobile: swipe carousel ---------- */}
      <div className="mt-12 sm:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.map((p, i) => (
            <div
              key={p.id}
              className="w-[78vw] shrink-0 snap-center"
            >
              <FrontCard product={p} active priority={i === 0} />
            </div>
          ))}
        </div>
      </div>

      {/* dots + pill */}
      <div className="mt-10 flex flex-col items-center gap-5">
        <div className="hidden items-center gap-2.5 sm:flex">
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Show ${p.name}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === active ? "w-7 bg-ink" : "w-1.5 bg-ink/25 hover:bg-ink/50",
              )}
            />
          ))}
        </div>
        <span className="inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-bone/70 px-6 py-3 backdrop-blur">
          <PointerIcon />
          <span className="label !text-[0.62rem] text-ink-soft">
            <span className="hidden sm:inline">Drag to explore</span>
            <span className="sm:hidden">Swipe to explore</span>
          </span>
        </span>
      </div>
    </section>
  );
}

function FrontCard({
  product,
  active,
  priority,
}: {
  product: (typeof products)[number];
  active: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative aspect-[4/5] w-full overflow-hidden rounded-[1.8rem] border border-white/50 bg-bone-dim transition-shadow duration-700",
        active
          ? "shadow-[0_50px_90px_-35px_rgba(42,38,32,0.55)]"
          : "shadow-[0_24px_50px_-30px_rgba(42,38,32,0.4)]",
      )}
    >
      <VideoPlayer
        src={product.studioVideo}
        poster={product.studioPoster}
        objectPosition="center 40%"
        lazy={!priority}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-chocolate-deep/25 via-transparent to-transparent" />

      <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-bone/85 font-display text-sm text-ink backdrop-blur">
        {labels[product.id]}
      </span>
      <span className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-bone/85 text-ink backdrop-blur transition-transform duration-500 group-hover:scale-110">
        <PlayIcon className="ml-0.5 h-3.5 w-3.5" />
      </span>
      <span className="absolute bottom-3 right-3 text-right">
        <span className="block font-display text-base leading-tight text-bone drop-shadow">
          {product.colorName}
        </span>
      </span>
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PointerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-4 w-4 text-clay"
      aria-hidden="true"
    >
      <path
        d="M9 11V6a1.5 1.5 0 013 0v4m0 0V4.5a1.5 1.5 0 013 0V11m0-2a1.5 1.5 0 013 0v5a5 5 0 01-5 5h-2.2a4 4 0 01-3.1-1.5L6 15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={cn("h-5 w-5", dir === "left" && "rotate-180")}
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
