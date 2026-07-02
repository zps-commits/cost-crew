"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/data/products";
import { easeCoast } from "@/lib/motion";

const labels: Record<string, string> = { sand: "A", olive: "B", brown: "C" };
const backdrop = (studioVideo: string) => studioVideo.replace(".mp4", "-alt.mp4");

export function StudioLookbook() {
  const [activeId, setActiveId] = useState(products[0].id);
  const active = products.find((p) => p.id === activeId)!;
  const others = products.filter((p) => p.id !== activeId);

  return (
    <section
      id="lookbook"
      className="relative overflow-hidden bg-bone px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* soft blurred backdrop of the active model */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -inset-24 opacity-30 blur-3xl">
          <VideoPlayer
            key={active.id}
            src={backdrop(active.studioVideo)}
            poster={active.studioPoster}
          />
        </div>
        <div className="absolute inset-0 bg-bone/55" />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <SectionLabel className="justify-center">Studio Lookbook</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2.2rem,5.5vw,4.4rem)] text-ink">
              Play. Swipe. <span className="italic text-clay">Discover.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:gap-5">
          {/* main card */}
          <div className="relative aspect-[3/4] lg:aspect-auto lg:h-[620px]">
            <LookCard
              product={active}
              main
              onSelect={() => {}}
            />
          </div>

          {/* stacked small cards */}
          <div className="grid grid-rows-2 gap-4 lg:gap-5">
            {others.map((p) => (
              <div key={p.id} className="relative min-h-[220px]">
                <LookCard product={p} onSelect={() => setActiveId(p.id)} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="flex items-center gap-2.5">
            {products.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Show ${p.name}`}
                onClick={() => setActiveId(p.id)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  p.id === activeId ? "w-7 bg-ink" : "w-1.5 bg-ink/25 hover:bg-ink/50"
                }`}
              />
            ))}
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-bone/70 px-5 py-2.5 backdrop-blur">
            <PointerIcon />
            <span className="label !text-[0.62rem] text-ink-soft">
              Tap a card to explore
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}

function LookCard({
  product,
  main = false,
  onSelect,
}: {
  product: (typeof products)[number];
  main?: boolean;
  onSelect: () => void;
}) {
  const Wrapper = main ? "div" : "button";
  return (
    <motion.div
      layoutId={`look-${product.id}`}
      transition={{ duration: 0.7, ease: easeCoast }}
      className="group absolute inset-0"
    >
      <Wrapper
        {...(!main ? { type: "button", onClick: onSelect } : {})}
        className="relative block h-full w-full overflow-hidden rounded-[var(--radius-card)] bg-sand text-left shadow-[0_50px_90px_-40px_rgba(42,38,32,0.5)]"
      >
        <VideoPlayer
          src={product.studioVideo}
          poster={product.studioPoster}
          className="transition-transform duration-700 ease-[var(--ease-coast)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate-deep/40 via-transparent to-transparent" />

        {/* label chip */}
        <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-bone/85 font-display text-sm text-ink backdrop-blur">
          {labels[product.id]}
        </span>

        {/* play dot */}
        <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-bone/85 text-ink backdrop-blur transition-transform duration-500 group-hover:scale-110">
          <PlayIcon />
        </span>

        {main && (
          <div className="absolute bottom-5 right-5 text-right">
            <p className="font-display text-xl text-bone">{product.colorName}</p>
            <p className="label !text-[0.6rem] text-bone/70">{product.name}</p>
          </div>
        )}
      </Wrapper>
    </motion.div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-3.5 w-3.5" aria-hidden="true">
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
