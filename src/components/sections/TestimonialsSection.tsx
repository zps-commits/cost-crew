"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/content";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function TestimonialsSection() {
  return (
    <section className="bg-sand px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <SectionLabel className="justify-center">Worn &amp; loved</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.1] text-ink">
              The tee you keep reaching for.
            </h2>
          </Reveal>
        </div>

        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.blockquote
              key={t.author}
              variants={fadeUp}
              className="flex flex-col justify-between rounded-[var(--radius-card)] border border-ink/8 bg-bone/70 p-8 backdrop-blur"
            >
              <p className="font-display text-2xl leading-snug text-ink">
                “{t.quote}”
              </p>
              <footer className="mt-8 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clay/20 font-display text-sm text-clay">
                  {t.author.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">
                    {t.author}
                  </span>
                  <span className="label !text-[0.58rem] text-ink-soft">
                    {t.role}
                  </span>
                </span>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
