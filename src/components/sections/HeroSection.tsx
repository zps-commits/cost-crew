"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { heroMedia } from "@/data/media";
import { easeCoast } from "@/lib/motion";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.42, 0.72]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="grain relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-chocolate-deep"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <VideoPlayer
          src={heroMedia.video}
          poster={heroMedia.poster}
          className="scale-105"
        />
      </motion.div>

      {/* warm tone overlays */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-chocolate-deep via-chocolate-deep/20 to-transparent"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-chocolate-deep/30 via-transparent to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-20 sm:px-8 sm:pb-24"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <motion.p
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: easeCoast, delay: 0.4 }}
            className="label text-bone/80"
          >
            Coastal Streetwear · SS ’24
          </motion.p>

          <h1 className="display-hero mt-5 max-w-[16ch] text-bone text-[clamp(3.2rem,11vw,10rem)]">
            <Line delay={0.55}>Find your</Line>
            <Line delay={0.7}>
              <span className="italic text-gold-soft">coast.</span>
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeCoast, delay: 1 }}
            className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-bone/75"
          >
            Premium oversized essentials inspired by coastal movement — surf,
            skate and the warm rhythm of endless summer.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeCoast, delay: 1.15 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton>
              <Button href="#collection" variant="solid" className="!bg-bone !text-ink hover:!bg-sand">
                Explore Collection
              </Button>
            </MagneticButton>
            <Button
              href="#lookbook"
              variant="outline"
              withArrow={false}
              className="!border-bone/40 !text-bone hover:!bg-bone hover:!text-ink"
            >
              View Lookbook
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="label !text-[0.6rem] text-bone/60">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-bone/25">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-1/2 bg-bone"
          />
        </span>
      </motion.div>
    </section>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: easeCoast, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
