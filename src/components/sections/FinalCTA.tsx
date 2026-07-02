"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealText } from "@/components/ui/Reveal";
import { ctaMedia } from "@/data/media";
import { WHATSAPP_URL } from "@/lib/constants";

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[90svh] items-center justify-center overflow-hidden bg-chocolate-deep px-5 py-32 text-center text-bone"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src={ctaMedia.image}
          alt="Coastal road at sunset with palm trees and ocean"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-chocolate-deep via-chocolate-deep/45 to-chocolate-deep/30" />

      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className="display-hero text-[clamp(3rem,10vw,8rem)] text-bone">
          <RevealText>Find your</RevealText>
          <RevealText delay={0.08}>
            <span className="italic text-gold-soft">coast.</span>
          </RevealText>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mx-auto mt-6 max-w-md text-lg text-bone/75"
        >
          Start with the tee that moves with you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton>
            <Button
              href="#collection"
              className="!bg-bone !text-ink hover:!bg-sand"
            >
              Explore Collection
            </Button>
          </MagneticButton>
          <Button
            href={WHATSAPP_URL}
            external
            variant="outline"
            className="!border-bone/40 !text-bone hover:!bg-bone hover:!text-ink"
          >
            Talk on WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
