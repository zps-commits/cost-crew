"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** When false, the video won't autoplay/loop (used for click-to-play). */
  autoPlay?: boolean;
  loop?: boolean;
  /** CSS object-position, e.g. "center 30%". */
  objectPosition?: string;
  /** Only attach the <source> once the element is near/into the viewport. */
  lazy?: boolean;
};

/**
 * Coastal video primitive: muted, inline, poster fallback, object-cover.
 * Pauses automatically when scrolled out of the viewport to save resources,
 * and (when `lazy`) only downloads once it is close to the viewport.
 */
export function VideoPlayer({
  src,
  poster,
  className,
  autoPlay = true,
  loop = true,
  objectPosition,
  lazy = true,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(!lazy);

  // Lazy-mount the source when near viewport.
  useEffect(() => {
    if (!lazy) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [lazy]);

  // Pause when off-screen; play when visible.
  useEffect(() => {
    const el = ref.current;
    if (!el || !autoPlay || !ready) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoPlay, ready]);

  return (
    <video
      ref={ref}
      className={cn("h-full w-full object-cover", className)}
      style={objectPosition ? { objectPosition } : undefined}
      poster={poster}
      muted
      loop={loop}
      playsInline
      autoPlay={autoPlay}
      preload="none"
      tabIndex={-1}
    >
      {ready && <source src={src} type="video/mp4" />}
    </video>
  );
}
