"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Tile = {
  src: string;
  alt: string;
  caption: string;
  area: string; // desktop md grid-area class
  mobileSpan: string; // mobile col span + aspect
  pos: string; // object-position to frame the subject
};

// Bento that fully tiles a 4x3 grid on desktop (no empty cells):
//   A A B C
//   A A D D
//   E F D D
const tiles: Tile[] = [
  {
    src: "/images/skate-road-brown.jpg",
    alt: "Skater in a brown tee riding a palm-lined coastal road at sunset",
    caption: "Coast road",
    area: "md:[grid-area:A]",
    mobileSpan: "col-span-2 aspect-[16/10]",
    pos: "center 32%",
  },
  {
    src: "/images/olive-rocks.jpg",
    alt: "Man in an olive tee sitting on coastal rocks",
    caption: "Olive",
    area: "md:[grid-area:B]",
    mobileSpan: "aspect-[4/5]",
    pos: "center 22%",
  },
  {
    src: "/images/surf-brown-beach.jpg",
    alt: "Surfer holding a board in a brown tee at golden hour",
    caption: "Surf",
    area: "md:[grid-area:C]",
    mobileSpan: "aspect-[4/5]",
    pos: "center 18%",
  },
  {
    src: "/images/fabric-brown-logo.jpg",
    alt: "Macro of brown cotton fabric with the Cost Crew wave logo",
    caption: "Fabric",
    area: "md:[grid-area:D]",
    mobileSpan: "col-span-2 aspect-[16/10]",
    pos: "center 55%",
  },
  {
    src: "/images/skate-backview.jpg",
    alt: "Skater from behind looking out to sea in an off-white tee",
    caption: "Coast",
    area: "md:[grid-area:E]",
    mobileSpan: "aspect-[4/5]",
    pos: "center 30%",
  },
  {
    src: "/images/packaging-box.jpg",
    alt: "Premium kraft packaging with folded tee, tag and pouch",
    caption: "Unboxing",
    area: "md:[grid-area:F]",
    mobileSpan: "aspect-[4/5]",
    pos: "center 50%",
  },
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
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className={cn(
            "editorial-bento mt-14 grid grid-cols-2 gap-4 sm:gap-5",
            "md:h-[clamp(34rem,48vw,48rem)] md:grid-cols-4 md:grid-rows-3",
          )}
        >
          {tiles.map((t) => (
            <motion.figure
              key={t.src}
              variants={fadeUp}
              className={cn(
                "group relative overflow-hidden rounded-[var(--radius-card)] bg-sand md:aspect-auto",
                t.mobileSpan,
                t.area,
              )}
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                quality={90}
                style={{ objectPosition: t.pos }}
                className="object-cover transition-transform duration-[900ms] ease-[var(--ease-coast)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-deep/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="label absolute bottom-4 left-4 translate-y-2 text-[0.6rem] text-bone opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {t.caption}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
