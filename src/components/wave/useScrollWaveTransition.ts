"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface UseScrollWaveTransitionOptions {
  scrollLength?: number;
  onCovered?: () => void;
  onComplete?: () => void;
}

export interface UseScrollWaveTransitionResult {
  containerRef: RefObject<HTMLDivElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  isCovered: boolean;
  isComplete: boolean;
}

const COVERED_PROGRESS = 0.5;
const COMPLETE_PROGRESS = 0.999;

export function useScrollWaveTransition({
  scrollLength = 3400,
  onCovered,
  onComplete,
}: UseScrollWaveTransitionOptions = {}): UseScrollWaveTransitionResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const onCoveredRef = useRef(onCovered);
  const onCompleteRef = useRef(onComplete);
  const coveredRef = useRef(false);
  const completedRef = useRef(false);
  const lastProgressRef = useRef(0);
  const [isCovered, setIsCovered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    onCoveredRef.current = onCovered;
    onCompleteRef.current = onComplete;
  }, [onComplete, onCovered]);

  useGSAP(
    () => {
      const container = containerRef.current;
      const video = videoRef.current;

      if (!container || !video) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const updateState = (progress: number) => {
        if (progress >= COVERED_PROGRESS && !coveredRef.current) {
          coveredRef.current = true;
          setIsCovered(true);
          onCoveredRef.current?.();
        } else if (progress < COVERED_PROGRESS && coveredRef.current) {
          coveredRef.current = false;
          setIsCovered(false);
        }

        if (progress >= COMPLETE_PROGRESS && !completedRef.current) {
          completedRef.current = true;
          setIsComplete(true);
          onCompleteRef.current?.();
        } else if (progress < COMPLETE_PROGRESS && completedRef.current) {
          completedRef.current = false;
          setIsComplete(false);
        }
      };

      const seekVideo = (progress: number) => {
        lastProgressRef.current = progress;
        updateState(progress);

        const mediaLayer = video.closest<HTMLElement>("[data-wave-media]");
        if (mediaLayer) {
          mediaLayer.style.visibility =
            progress <= 0.001 || progress >= COMPLETE_PROGRESS
              ? "hidden"
              : "visible";
        }

        // A máscara avança até cobrir a viewport e depois recua.
        const visualProgress = reducedMotion
          ? progress < COVERED_PROGRESS
            ? 0
            : progress < COMPLETE_PROGRESS
              ? COVERED_PROGRESS
              : 1
          : progress;
        const cover = 1 - Math.abs(visualProgress * 2 - 1);
        const edge = cover * 116 - 8;
        container.style.setProperty("--wave-edge", `${edge}%`);

        video.style.visibility =
          progress <= 0.001 || progress >= COMPLETE_PROGRESS
            ? "hidden"
            : "visible";

        if (!Number.isFinite(video.duration) || video.duration <= 0) return;

        // Em reduced motion, troca apenas entre frames-chave.
        const mediaProgress = visualProgress;

        const nextTime = Math.min(
          video.duration,
          Math.max(0, mediaProgress * video.duration),
        );

        if (Math.abs(video.currentTime - nextTime) > 1 / 120) {
          video.currentTime = nextTime;
        }
      };

      const trigger = ScrollTrigger.create({
        trigger: container,
        pin: true,
        scrub: true,
        start: "top top",
        end: `+=${Math.max(1, scrollLength)}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => seekVideo(self.progress),
      });

      const handleLoadedMetadata = () => {
        video.pause();
        seekVideo(lastProgressRef.current);
      };

      video.pause();
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      seekVideo(trigger.progress);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.pause();
        trigger.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [scrollLength],
      revertOnUpdate: true,
    },
  );

  return {
    containerRef,
    videoRef,
    isCovered,
    isComplete,
  };
}
