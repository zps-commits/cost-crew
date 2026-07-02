"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { manifestoMedia } from "@/data/media";

export function BrandManifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const clip = useTransform(
    scrollYProgress,
    [0, 0.55],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
  );

  return (
    <section className="bg-bone px-5 py-24 sm:px-8 sm:py-36" id="manifesto">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <SectionLabel>The essence</SectionLabel>
          <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05] text-ink">
            <RevealText>Made for the days</RevealText>
            <RevealText delay={0.08}>
              that feel <span className="italic text-clay">endless.</span>
            </RevealText>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
              Soft cotton, relaxed silhouettes and the quiet rhythm of the
              coast. Cost Crew is built for slow mornings, warm evenings and
              everything the tide brings in between.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-10 flex gap-10">
              <Stat value="100%" label="Cotton hand-feel" />
              <Stat value="3" label="Coastal tones" />
              <Stat value="∞" label="Endless summer" />
            </div>
          </Reveal>
        </div>

        <motion.div
          ref={ref}
          style={{ clipPath: clip }}
          className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)]"
        >
          <motion.div style={{ y }} className="absolute inset-[-8%]">
            <VideoPlayer
              src={manifestoMedia.editorialVideo}
              poster={manifestoMedia.editorialPoster}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-chocolate-deep/25 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-4xl text-ink">{value}</p>
      <p className="mt-1 max-w-[10ch] text-xs leading-tight text-ink-soft">
        {label}
      </p>
    </div>
  );
}
