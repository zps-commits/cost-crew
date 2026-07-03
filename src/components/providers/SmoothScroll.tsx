"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const boundRef = useRef(false);

  useEffect(() => {
    // The ticker runs every frame regardless of mount ordering, and reads the
    // Lenis instance lazily — so scrolling can never lock if Lenis isn't ready
    // on the first effect pass. It also binds ScrollTrigger sync exactly once.
    const update = (time: number) => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;
      if (!boundRef.current) {
        lenis.on("scroll", ScrollTrigger.update);
        boundRef.current = true;
        // Recalculate pin positions once smooth scroll is live.
        ScrollTrigger.refresh();
      }
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Refresh again after everything (images/videos/fonts) has loaded so pinned
    // triggers land at the correct scroll positions.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("load", onLoad);
      // ReactLenis destroys its Lenis instance (and its listeners) on unmount.
      boundRef.current = false;
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
