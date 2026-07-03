"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { easeCoast } from "@/lib/motion";

/**
 * Cinematic scene transition. A warm off-white foam curtain sweeps up over the
 * viewport as the reader crosses a scene boundary, covering the current scene
 * and revealing the next — so scrolling feels like changing scenes, not paging.
 *
 * Usage: render <WaveFoamTransition /> once (it is fixed to the viewport) and
 * place <FoamSentinel /> markers between the sections you want to separate.
 *
 * Respects prefers-reduced-motion: the curtain is disabled and sections simply
 * fade in via their existing reveal animations.
 */
export function WaveFoamTransition() {
  const controls = useAnimationControls();
  const animating = useRef(false);
  const lastY = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    lastY.current = window.scrollY;

    const onScroll = () => {
      lastY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    async function sweep() {
      if (animating.current) return;
      animating.current = true;
      await controls.start({
        y: "0%",
        transition: { duration: 0.55, ease: easeCoast },
      });
      await controls.start({
        y: "-112%",
        transition: { duration: 0.7, ease: easeCoast },
      });
      controls.set({ y: "100%" });
      animating.current = false;
    }

    // Fire when a sentinel enters the central band while scrolling down.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const goingDown = window.scrollY > lastY.current - 4;
          if (entry.isIntersecting && goingDown) sweep();
        }
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );

    const sentinels = document.querySelectorAll("[data-foam-sentinel]");
    sentinels.forEach((s) => io.observe(s));

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [controls]);

  return (
    <motion.div
      aria-hidden
      initial={{ y: "100%" }}
      animate={controls}
      className="pointer-events-none fixed inset-0 z-[45] will-change-transform"
    >
      <div className="foam-grain relative h-full w-full">
        {/* foam crest riding the leading (top) edge */}
        <svg
          className="absolute -top-[7vh] left-0 h-[8vh] w-[220%] -translate-x-[10%]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,120 L0,60 C180,10 360,10 540,45 C740,84 900,4 1120,32 C1280,52 1380,84 1440,60 L1440,120 Z"
            fill="#f4ecdd"
          />
          <path
            d="M0,72 C180,26 360,26 540,58 C740,94 900,20 1120,46 C1280,64 1380,92 1440,72"
            fill="none"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="6"
          />
        </svg>

        <div className="foam-body absolute inset-0" />
        <div className="foam-bubbles absolute inset-0 opacity-60" />

        {/* foam edge on the trailing (bottom) side */}
        <svg
          className="absolute -bottom-[7vh] left-0 h-[8vh] w-[220%] -translate-x-[6%]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,0 L0,60 C200,110 380,110 560,72 C760,30 920,110 1140,84 C1290,66 1380,30 1440,56 L1440,0 Z"
            fill="#efe5d2"
          />
        </svg>
      </div>
    </motion.div>
  );
}

/** Invisible boundary marker between two scenes. */
export function FoamSentinel() {
  return <div data-foam-sentinel aria-hidden className="h-px w-full" />;
}
