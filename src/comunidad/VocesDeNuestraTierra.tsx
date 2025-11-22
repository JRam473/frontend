import { AnimatePresence } from "framer-motion";
import { useTestimoniosData } from "../comunidad/section-voces/data";
import { useCarousel } from "../comunidad/section-voces/useCarousel";
import { CarouselSlide } from "../comunidad/section-voces/components/CarouselSlide";
import { CarouselControls } from "../comunidad/section-voces/components/CarouselControls";
import { CarouselHeader } from "../comunidad/section-voces/components/CarouselHeader";
import { MiniGallery } from "../comunidad/section-voces/components/MiniGallery";
import { ClosingSection } from "../comunidad/section-voces/components/ClosingSection";

export function VocesDeNuestraTierra() {
  const testimoniosData = useTestimoniosData(); 
  const { currentIndex, direction, next, prev, goTo, setIsPlaying } = useCarousel(testimoniosData.length);
  const current = testimoniosData[currentIndex];

  return (
    <section
      id="voces"
      className="relative w-full overflow-hidden py-12 sm:py-20 bg-[url('https://res.cloudinary.com/dinsl266g/image/upload/f_svg,q_auto/v1763111232/Fondo-comunidad_nqg0wj.svg')] bg-no-repeat bg-center bg-cover"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Capa translúcida para mejorar legibilidad */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
      
      {/* Contenido principal */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <CarouselHeader />
        <div className="relative overflow-hidden rounded-2xl shadow-xl min-h-[350px] sm:min-h-[600px] bg-white/70 backdrop-blur-sm">
          <AnimatePresence mode="wait" custom={direction}>
            <CarouselSlide testimonio={current} direction={direction} />
          </AnimatePresence>
          <CarouselControls prev={prev} next={next} />
        </div>
        <MiniGallery
          testimonios={testimoniosData}
          currentIndex={currentIndex}
          goTo={goTo}
        />
        <ClosingSection />
      </div>
    </section>
  );
}