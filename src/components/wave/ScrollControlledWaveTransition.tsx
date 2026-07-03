"use client";

import { type ReactNode, useId } from "react";
import { useScrollWaveTransition } from "./useScrollWaveTransition";
import "./scroll-controlled-wave-transition.css";

export interface ScrollControlledWaveTransitionProps {
  videoSrc: string;
  posterSrc?: string;
  childrenBefore: ReactNode;
  childrenAfter: ReactNode;
  onCovered?: () => void;
  onComplete?: () => void;
  scrollLength?: number;
  className?: string;
}

function FoamFront() {
  const id = useId().replace(/:/g, "");
  const foamFilterId = `scroll-wave-foam-${id}`;
  const foamGradientId = `scroll-wave-foam-gradient-${id}`;

  return (
    <svg
      className="scroll-wave__foam"
      viewBox="0 0 1440 150"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter
          id={foamFilterId}
          x="-8%"
          y="-55%"
          width="116%"
          height="210%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".008 .052"
            numOctaves="2"
            seed="11"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="13"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
        <linearGradient
          id={foamGradientId}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".42" stopColor="#fffefa" stopOpacity=".96" />
          <stop offset=".69" stopColor="#fff" stopOpacity=".7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M-40 78 C63 39 139 95 244 68 C343 43 408 94 518 70 C631 46 697 101 809 72 C918 44 998 96 1109 67 C1215 40 1312 92 1480 57 L1480 137 C1330 160 1223 111 1116 139 C1005 168 924 116 815 145 C703 174 636 119 524 143 C414 167 348 116 250 141 C143 168 60 113 -40 151 Z"
        fill={`url(#${foamGradientId})`}
        filter={`url(#${foamFilterId})`}
      />
      <path
        className="scroll-wave__foam-line"
        d="M-30 79 C70 45 143 97 245 72 C345 48 410 97 519 74 C631 50 699 104 810 76 C919 49 999 100 1110 71 C1217 44 1315 95 1470 61"
      />
      <path
        className="scroll-wave__foam-line scroll-wave__foam-line--fine"
        d="M-20 101 C83 72 161 120 266 96 C370 72 435 119 545 98 C653 76 731 125 842 99 C951 73 1037 121 1147 96 C1254 72 1344 111 1460 88"
      />
    </svg>
  );
}

export function ScrollControlledWaveTransition({
  videoSrc,
  posterSrc,
  childrenBefore,
  childrenAfter,
  onCovered,
  onComplete,
  scrollLength = 3400,
  className = "",
}: ScrollControlledWaveTransitionProps) {
  const { containerRef, videoRef, isCovered, isComplete } =
    useScrollWaveTransition({
      scrollLength,
      onCovered,
      onComplete,
    });

  return (
    <div
      ref={containerRef}
      className={["scroll-wave", className].filter(Boolean).join(" ")}
      data-covered={isCovered}
      data-complete={isComplete}
    >
      <div className="scroll-wave__content">
        {isCovered ? childrenAfter : childrenBefore}
      </div>

      <div className="scroll-wave__media" data-wave-media aria-hidden="true">
        <div className="scroll-wave__video-mask">
          <video
            ref={videoRef}
            className="scroll-wave__video"
            src={videoSrc}
            poster={posterSrc}
            preload="metadata"
            muted
            playsInline
            tabIndex={-1}
          />
        </div>
        <FoamFront />
      </div>
    </div>
  );
}
