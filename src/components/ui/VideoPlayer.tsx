"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** When false, the video won't autoplay/loop (used for click-to-play). */
  autoPlay?: boolean;
  loop?: boolean;
};

/**
 * Coastal video primitive: muted, inline, poster fallback, object-cover.
 * Pauses automatically when scrolled out of the viewport to save resources.
 */
export function VideoPlayer({
  src,
  poster,
  className,
  autoPlay = true,
  loop = true,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !autoPlay) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoPlay]);

  return (
    <video
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      poster={poster}
      muted
      loop={loop}
      playsInline
      autoPlay={autoPlay}
      preload="metadata"
      tabIndex={-1}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
