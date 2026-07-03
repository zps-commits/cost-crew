import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
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
import { ClosingWaveScene } from "@/components/sections/ClosingWaveScene";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <BrandManifesto />
        <FloatingImageCarousel />
        <StudioLookbook />
        <CollectionSection />
        <QualitySection />
        <LifestyleSection />
        <PackagingSection />
        <EditorialGallery />
        <TestimonialsSection />
        <ClosingWaveScene />
      </main>
      <Footer />
    </>
  );
}
