"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { packagingDetails } from "@/data/content";
import { packagingMedia } from "@/data/media";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function PackagingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <section className="bg-sand px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div
          ref={ref}
          className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-clay/20 lg:order-2"
        >
          <motion.div style={{ scale }} className="absolute inset-0">
            <Image
              src={packagingMedia.image}
              alt="Premium kraft packaging with folded Cost Crew tee, tag and cotton pouch"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        <div className="lg:order-1">
          <SectionLabel>The Unboxing</SectionLabel>
          <h2 className="mt-7 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] text-ink">
            <RevealText>From the first touch</RevealText>
            <RevealText delay={0.08}>
              to the first <span className="italic text-clay">wear.</span>
            </RevealText>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
              Every detail matters. Recycled materials, natural tones and a
              considered unboxing that feels like part of the coast.
            </p>
          </Reveal>

          <motion.ul
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4"
          >
            {packagingDetails.map((d) => (
              <motion.li
                key={d}
                variants={fadeUp}
                className="flex items-center gap-3 text-sm text-ink"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                {d}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
