"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { products } from "@/data/products";
import { WHATSAPP_URL } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function CollectionSection() {
  return (
    <section id="collection" className="bg-bone px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <SectionLabel>The Collection</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] text-ink">
                Three tones. One <span className="italic text-clay">coast.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              Each tee is cut oversized and washed for a lived-in softness from
              the very first wear.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((p) => (
            <motion.article key={p.id} variants={fadeUp} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-sand">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease-coast)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate-deep/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-between rounded-full bg-bone/90 px-5 py-3 text-ink opacity-0 backdrop-blur transition-all duration-500 ease-[var(--ease-coast)] group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <span className="label !text-[0.62rem]">Shop now</span>
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: p.swatch }}
                  />
                </a>
              </div>

              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl text-ink">{p.name}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{p.description}</p>
                </div>
                <span
                  className="mt-1.5 h-5 w-5 shrink-0 rounded-full ring-1 ring-ink/10"
                  style={{ backgroundColor: p.swatch }}
                  aria-hidden="true"
                />
              </div>
            </motion.article>
          ))}
        </motion.div>

        <Reveal delay={0.1} className="mt-16 flex justify-center">
          <Button href={WHATSAPP_URL} external variant="solid">
            Shop the full collection
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
