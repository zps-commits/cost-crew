"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { qualityBlocks } from "@/data/content";
import { qualityMedia } from "@/data/media";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function QualitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      id="quality"
      className="bg-chocolate-deep px-5 py-24 text-bone sm:px-8 sm:py-36"
    >
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel className="text-gold-soft">Quality &amp; Fabric</SectionLabel>
          <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05]">
            <RevealText>Soft structure.</RevealText>
            <RevealText delay={0.08}>Heavy feel.</RevealText>
            <RevealText delay={0.16}>
              <span className="italic text-gold-soft">Everyday comfort.</span>
            </RevealText>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-bone/70">
              Built with a relaxed oversized shape, natural tones and a tactile
              cotton feel that softens with every wash.
            </p>
          </Reveal>

          <div ref={ref} className="mt-10 grid grid-cols-2 gap-4">
            <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
              <motion.div style={{ y }} className="absolute inset-[-12%]">
                <Image
                  src={qualityMedia.detail}
                  alt="Close-up of collar stitching and woven wave label"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
              <VideoPlayer
                src={qualityMedia.fabricVideo}
                poster={qualityMedia.fabricPoster}
              />
            </div>
          </div>
        </div>

        <motion.ul
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col"
        >
          {qualityBlocks.map((block) => (
            <motion.li
              key={block.n}
              variants={fadeUp}
              className="flex gap-6 border-t border-bone/15 py-8 first:border-t-0 first:pt-0"
            >
              <span className="font-display text-2xl text-gold-soft">{block.n}</span>
              <div>
                <h3 className="font-display text-2xl">{block.title}</h3>
                <p className="mt-2 max-w-sm text-bone/65">{block.text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
