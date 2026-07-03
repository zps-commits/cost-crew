"use client";

import Image from "next/image";
import { ScrollControlledWaveTransition } from "@/components/wave/ScrollControlledWaveTransition";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ctaMedia, lifestyleMedia } from "@/data/media";
import { WHATSAPP_URL } from "@/lib/constants";

/**
 * Signature closing transition: a GSAP scroll-scrubbed foam wave washes over the
 * coastal "before" scene and reveals the final call-to-action beneath it.
 */
export function ClosingWaveScene() {
  return (
    <ScrollControlledWaveTransition
      videoSrc="/videos/wave-foam-scrub.mp4"
      posterSrc="/posters/wave-foam-scrub.jpg"
      scrollLength={2600}
      className="cost-closing-wave"
      childrenBefore={<BeforeScene />}
      childrenAfter={<AfterScene />}
    />
  );
}

function BeforeScene() {
  return (
    <div className="grain relative flex h-full w-full items-center justify-center overflow-hidden bg-olive-deep text-center text-bone">
      <Image
        src={lifestyleMedia.surf}
        alt="Surfer at golden hour on the coast"
        fill
        sizes="100vw"
        className="object-cover object-[center_35%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-olive-deep via-olive-deep/40 to-olive-deep/60" />
      <div className="relative z-10 px-6">
        <p className="label text-bone/70">One last wave</p>
        <h2 className="display-hero mt-5 text-[clamp(2.6rem,8vw,6rem)] text-bone">
          The tide is turning.
        </h2>
      </div>
    </div>
  );
}

function AfterScene() {
  return (
    <div className="grain relative flex h-full w-full items-center justify-center overflow-hidden bg-chocolate-deep text-center text-bone">
      <Image
        src={ctaMedia.image}
        alt="Coastal road at sunset with palm trees and ocean"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-chocolate-deep via-chocolate-deep/45 to-chocolate-deep/30" />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <h2 className="display-hero text-[clamp(3rem,10vw,8rem)] text-bone">
          Find your <span className="italic text-gold-soft">coast.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg text-bone/75">
          Start with the tee that moves with you.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton>
            <Button href="#collection" className="!bg-bone !text-ink hover:!bg-sand">
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
        </div>
      </div>
    </div>
  );
}
