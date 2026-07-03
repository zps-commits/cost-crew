"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { galleryItems } from "@/data/media";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

// bespoke editorial grid spans for rhythm
const spans = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
  "",
];

export function EditorialGallery() {
  return (
    <section className="bg-bone px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <SectionLabel>Editorial</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] text-ink">
                Moments from the <span className="italic text-clay">coast.</span>
              </h2>
            </Reveal>
          </div>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid auto-rows-[minmax(180px,1fr)] grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5"
        >
          {galleryItems.map((item, i) => (
            <motion.figure
              key={item.src}
              variants={fadeUp}
              className={cn(
                "group relative overflow-hidden rounded-[var(--radius-card)] bg-sand",
                spans[i],
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                quality={90}
                className="object-cover transition-transform duration-[900ms] ease-[var(--ease-coast)] group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-deep/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="label absolute bottom-4 left-4 translate-y-2 text-[0.6rem] text-bone opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {item.caption}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
