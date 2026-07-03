"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { TiltCard } from "@/components/ui/TiltCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { carouselItems } from "@/data/media";
import { cn } from "@/lib/utils";
import { easeCoast } from "@/lib/motion";

export function FloatingImageCarousel() {
  const [active, setActive] = useState(0);
  const n = carouselItems.length;

  const go = (dir: number) => setActive((a) => (a + dir + n) % n);

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  }

  return (
    <section className="relative overflow-hidden bg-bone-dim px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <SectionLabel className="justify-center">Interactive concept</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] text-ink">
              Hover to <span className="italic text-clay">explore</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-3 text-ink-soft">A floating carousel that moves with you.</p>
          </Reveal>
        </div>

        {/* Stage */}
        <div className="relative mt-14 flex h-[clamp(340px,52vw,560px)] items-center justify-center [perspective:1400px] sm:mt-16">
          <motion.div
            className="relative h-full w-full touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
          >
            {carouselItems.map((item, i) => {
              let offset = i - active;
              if (offset > n / 2) offset -= n;
              if (offset < -n / 2) offset += n;
              const abs = Math.abs(offset);
              const isActive = offset === 0;

              if (abs > 2) return null;

              return (
                <motion.div
                  key={item.src}
                  className="absolute left-1/2 top-1/2"
                  style={{ zIndex: 10 - abs }}
                  animate={{
                    x: `calc(-50% + ${offset * 46}%)`,
                    y: "-50%",
                    rotateY: offset * -22,
                    scale: isActive ? 1 : 0.82 - abs * 0.05,
                    opacity: abs > 1.6 ? 0 : 1 - abs * 0.28,
                    filter: isActive ? "blur(0px)" : "blur(2px)",
                  }}
                  transition={{ duration: 0.7, ease: easeCoast }}
                >
                  <div
                    className={cn(
                      "h-[clamp(300px,46vw,500px)] w-[clamp(240px,36vw,400px)]",
                      !isActive && "pointer-events-none",
                    )}
                  >
                    {isActive ? (
                      <TiltCard className="h-full w-full">
                        <Card item={item} priority />
                      </TiltCard>
                    ) : (
                      <button
                        type="button"
                        aria-label={`Show ${item.caption}`}
                        onClick={() => setActive(i)}
                        className="block h-full w-full"
                      >
                        <Card item={item} />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* arrows */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="absolute left-1 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-bone/60 text-ink backdrop-blur transition-colors hover:bg-ink hover:text-bone sm:left-4"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className="absolute right-1 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-bone/60 text-ink backdrop-blur transition-colors hover:bg-ink hover:text-bone sm:right-4"
          >
            <Chevron dir="right" />
          </button>
        </div>

        {/* caption + dots */}
        <div className="mt-10 flex flex-col items-center gap-5">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="label text-clay"
            >
              {carouselItems[active].caption}
            </motion.p>
          </AnimatePresence>
          <div className="flex items-center gap-2.5">
            {carouselItems.map((item, i) => (
              <button
                key={item.src}
                type="button"
                aria-label={`Go to ${item.caption}`}
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === active ? "w-7 bg-ink" : "w-1.5 bg-ink/25 hover:bg-ink/50",
                )}
              />
            ))}
          </div>
          <p className="label !text-[0.6rem] text-ink-soft/70">
            Move your cursor to rotate
          </p>
        </div>
      </div>
    </section>
  );
}

function Card({ item, priority }: { item: (typeof carouselItems)[number]; priority?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[var(--radius-card)] bg-sand shadow-[0_40px_80px_-30px_rgba(42,38,32,0.45)]">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 70vw, 400px"
        quality={90}
        className="object-cover"
        priority={priority}
        draggable={false}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-chocolate-deep/20 to-transparent" />
    </div>
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
