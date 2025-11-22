// GastronomyPage.tsx
import { GastronomySection } from "@/cultura/section-gastronomia/GastronomySection";
import { PlatillosSection } from "@/cultura/section-gastronomia/PlatillosSection";
import { ViajeSensorialGastronomico } from "@/cultura/section-gastronomia/ViajeSensorialGastronomico";
import { CallToAction} from "@/cultura/section-gastronomia/section-cocina/CallToAction"

export function GastronomyPage() {
  return (
    <>
      <GastronomySection />
      <ViajeSensorialGastronomico />
      <PlatillosSection />
      <CallToAction />
    </>
  );
}
