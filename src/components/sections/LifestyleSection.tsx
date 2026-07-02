"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { lifestyleMedia } from "@/data/media";

export function LifestyleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section
      id="lifestyle"
      ref={ref}
      className="overflow-hidden bg-olive-deep px-5 py-24 text-bone sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-3xl">
          <SectionLabel className="text-gold-soft">Coastal Movement</SectionLabel>
          <h2 className="mt-7 font-display text-[clamp(2.2rem,5.5vw,4.6rem)] leading-[1.03]">
            <RevealText>Designed for the rhythm</RevealText>
            <RevealText delay={0.08}>
              between <span className="italic text-gold-soft">surf, street</span>
            </RevealText>
            <RevealText delay={0.16}>and sunset.</RevealText>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-12 lg:grid-rows-2">
          {/* big skate video */}
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] lg:col-span-8 lg:row-span-2 lg:aspect-auto">
            <VideoPlayer
              src={lifestyleMedia.skateVideo}
              poster={lifestyleMedia.skatePoster}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/50 to-transparent" />
            <p className="absolute bottom-5 left-5 font-display text-2xl text-bone">
              On the coast road
            </p>
          </div>

          {/* surf still */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] lg:col-span-4">
            <motion.div style={{ y: y1 }} className="absolute inset-[-10%]">
              <Image
                src={lifestyleMedia.surf}
                alt="Surfer with board in a brown Cost Crew tee at golden hour"
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* skate closeup video */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] lg:col-span-4">
            <VideoPlayer
              src={lifestyleMedia.skateCloseupVideo}
              poster={lifestyleMedia.skateCloseupPoster}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive-deep/40 to-transparent" />
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-6 border-t border-bone/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-bone/70">
              From dawn patrol to the last light — Cost Crew moves the way you do.
            </p>
            <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-2xl">
              <motion.div style={{ y: y2 }} className="absolute inset-[-20%]">
                <Image
                  src={lifestyleMedia.skateBackview}
                  alt="Skater looking out to sea in an off-white tee"
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
