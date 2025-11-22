// src/sections/VocesDeNuestraTierra/components/CarouselControls.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface Props {
  prev: () => void;
  next: () => void;
}

export function CarouselControls({ prev, next }: Props) {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  return (
    <>
      <button
        onClick={prev}
        aria-label={t('voices.controls.previousTestimonial')} // ← TRADUCIBLE
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={next}
        aria-label={t('voices.controls.nextTestimonial')} // ← TRADUCIBLE
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center"
      >
        <ChevronRight />
      </button>
    </>
  );
}