"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode, PointerEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * 3D tilt wrapper reacting to cursor position (rotateX / rotateY).
 * Degrades to a static card on touch / reduced-motion.
 */
export function TiltCard({
  children,
  className,
  max = 12,
  scale = 1.03,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springCfg = { stiffness: 150, damping: 18, mass: 0.4 };
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), springCfg);
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), springCfg);
  const s = useSpring(1, springCfg);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    s.set(scale);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
    s.set(1);
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        scale: s,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );
}
