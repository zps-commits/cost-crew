import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import {
  WaveFoamTransition,
  FoamSentinel,
} from "@/components/ui/WaveFoamTransition";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandManifesto } from "@/components/sections/BrandManifesto";
import { FloatingImageCarousel } from "@/components/sections/FloatingImageCarousel";
import { StudioLookbook } from "@/components/sections/StudioLookbook";
import { CollectionSection } from "@/components/sections/CollectionSection";
import { QualitySection } from "@/components/sections/QualitySection";
import { LifestyleSection } from "@/components/sections/LifestyleSection";
import { PackagingSection } from "@/components/sections/PackagingSection";
import { EditorialGallery } from "@/components/sections/EditorialGallery";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <WaveFoamTransition />
      <Header />
      <main>
        <HeroSection />
        <FoamSentinel />
        <BrandManifesto />
        <FoamSentinel />
        <FloatingImageCarousel />
        <FoamSentinel />
        <StudioLookbook />
        <FoamSentinel />
        <CollectionSection />
        <FoamSentinel />
        <QualitySection />
        <FoamSentinel />
        <LifestyleSection />
        <FoamSentinel />
        <PackagingSection />
        <FoamSentinel />
        <EditorialGallery />
        <FoamSentinel />
        <TestimonialsSection />
        <FoamSentinel />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
