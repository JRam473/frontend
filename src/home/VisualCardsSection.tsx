// src/components/VisualCardsSection.tsx
import { useRef, useEffect, useState, useCallback, forwardRef } from "react";
import { useTranslation } from '../contexts/TranslationContext';
import { Link } from "react-router-dom";

/* =============================
   Tipos
============================= */
interface CardData {
  title: string;
  description: string;
  image: string;
  link: string;
  priority?: boolean;
}

interface VisualCardProps {
  card: CardData;
  index: number;
  isMobile: boolean;
}

interface VisualCardsSectionProps {
  // puedes añadir props aquí si las necesitas en el futuro
}

/* =============================
   Datos optimizados - AHORA CON CLOUDINARY Y TRADUCCIONES
============================= */
const getCardsData = (t: (key: any) => string): CardData[] => [
  {
    title: t('cards.adelaRestaurant.title'),
    description: t('cards.adelaRestaurant.description'),
    image: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_600/v1763062497/Comedor_hfora9.webp",
    link: "/section-gastronomia",
    priority: true
  },
  {
    title: t('cards.loversWaterfall.title'),
    description: t('cards.loversWaterfall.description'),
    image: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_600/v1763062497/Cascada-enamorados_p0xiib.webp",
    link: "/turismo",
  },
  {
    title: t('cards.cabins.title'),
    description: t('cards.cabins.description'),
    image: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_600/v1763062499/Cabanas_gjdkib.webp",
    link: "/comunidad#atracciones-proximas",
  },
  {
    title: t('cards.viewpoints.title'),
    description: t('cards.viewpoints.description'),
    image: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_600/v1763062498/mirador_obezxk.webp",
    link: "/galeria",
  },
  {
    title: t('cards.dances.title'),
    description: t('cards.dances.description'),
    image: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_600/v1763062498/Danza_q46o3h.webp",
    link: "/cultura#danzas",
  },
  {
    title: t('cards.rivers.title'),
    description: t('cards.rivers.description'),
    image: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_600/v1763062498/Rios_uwkmkq.webp",
    link: "/turismo",
  },
];

/* =============================
   Hook personalizado para detección de dispositivo
============================= */
const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      // Móvil: < 768px, Tablet: 768px - 1024px
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1024);
    };

    checkDevice();
    
    // Debounce resize para mejor performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkDevice, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return { 
    isMobile, 
    isTablet,
    shouldRemoveAnimations: isMobile || isTablet // Eliminar animaciones en móviles Y tablets
  };
};

/* =============================
   Hook personalizado para scroll básico (SOLO DESKTOP)
============================= */
const useBasicScroll = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  isActive: boolean,
  shouldRemoveAnimations: boolean
) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoScroll = useCallback(() => {
    // NO auto-scroll en móviles/tablets
    if (shouldRemoveAnimations || !isActive) return;
    
    stopAutoScroll();

    intervalRef.current = setInterval(() => {
      const c = containerRef.current;
      if (!c) return;

      const scrollWidth = c.scrollWidth;
      const clientWidth = c.clientWidth;
      const current = Math.round(c.scrollLeft);

      if (current + clientWidth >= scrollWidth - 2) {
        c.scrollTo({ left: 0, behavior: 'auto' });
      } else {
        c.scrollBy({ left: 400, behavior: 'auto' });
      }
    }, 3000);
  }, [containerRef, isActive, shouldRemoveAnimations]);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const pauseThenResume = useCallback((delayMs = 3000) => {
    // Solo funciona en desktop
    if (shouldRemoveAnimations) return;
    
    stopAutoScroll();
    setTimeout(() => {
      if (isActive) startAutoScroll();
    }, delayMs);
  }, [stopAutoScroll, startAutoScroll, isActive, shouldRemoveAnimations]);

  useEffect(() => {
    return () => {
      stopAutoScroll();
    };
  }, [stopAutoScroll]);

  return {
    startAutoScroll,
    stopAutoScroll,
    pauseThenResume
  };
};

/* =============================
   Tarjeta individual SIN ANIMACIONES para móviles/tablets
============================= */
const VisualCard = ({ card }: VisualCardProps) => {
  const { t } = useTranslation();
  const { shouldRemoveAnimations } = useDeviceDetection();

  return (
    <div
      className="relative snap-center flex-shrink-0 w-[calc(100vw-48px)] max-w-[350px] mx-auto sm:w-[350px] lg:w-[400px] h-[400px] sm:h-[450px] rounded-2xl overflow-hidden shadow-xl cursor-pointer group bg-gray-900"
      role="article"
      aria-label={`${t('cards.goToCard')} ${card.title}`}
    >
      {/* Imagen optimizada SIN efectos */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={card.image}
          alt={card.title}
          width={600}
          height={450}
          className="w-full h-full object-cover object-center"
          loading={card.priority ? "eager" : "lazy"}
          decoding="async"
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 400px"
        />
      </div>

      {/* Overlay básico SIN transiciones */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Contenido */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end h-full text-white">
        <h3 className="text-xl sm:text-2xl font-bold font-serif mb-2 drop-shadow-lg leading-tight">
          {card.title}
        </h3>
        <p className="text-gray-200 text-xs sm:text-sm drop-shadow-md line-clamp-2">
          {card.description}
        </p>

        {/* Botón siempre visible en móviles/tablets, SIN animaciones */}
        <Link
          to={card.link}
          aria-label={`${t('cards.exploreButton')} ${card.title}`}
          className={`
            mt-4 sm:mt-6 inline-block w-fit px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium font-serif
            border border-white/80 rounded-full bg-white/10 backdrop-blur-sm
            hover:bg-white hover:text-gray-900 shadow-md
            focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900
            ${shouldRemoveAnimations ? 'opacity-100 translate-y-0' : ''}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {t('cards.exploreButton')}
        </Link>
      </div>
    </div>
  );
};

/* =============================
   Sección principal OPTIMIZADA SIN ANIMACIONES
============================= */
export const VisualCardsSection = forwardRef<HTMLDivElement, VisualCardsSectionProps>(
  (_props, ref) => {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { isMobile, shouldRemoveAnimations } = useDeviceDetection();
    
    const {
      startAutoScroll,
      stopAutoScroll,
      pauseThenResume
    } = useBasicScroll(containerRef, true, shouldRemoveAnimations);

    // Efectos MUY simplificados para móviles/tablets
    useEffect(() => {
      // Solo activar auto-scroll en desktop
      if (!shouldRemoveAnimations) {
        startAutoScroll();
        
        const el = containerRef.current;
        if (!el) return;

        const onInteract = () => pauseThenResume(8000);
        const onEnter = () => stopAutoScroll();
        const onLeave = () => pauseThenResume(3000);

        el.addEventListener("mouseenter", onEnter, { passive: true });
        el.addEventListener("mouseleave", onLeave, { passive: true });
        el.addEventListener("touchstart", onInteract, { passive: true });

        return () => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
          el.removeEventListener("touchstart", onInteract);
          stopAutoScroll();
        };
      }
    }, [shouldRemoveAnimations, startAutoScroll, stopAutoScroll, pauseThenResume]);

    // Preload de primera imagen crítica
    useEffect(() => {
      const preloadImage = new Image();
      preloadImage.src = getCardsData(t)[0].image;
    }, [t]);

    return (
      <section 
        ref={ref}
        className="relative bg-black py-16 sm:py-24 px-0 overflow-hidden"
        aria-label={t('cards.exploreTitle')}
      >
        {/* Título SIN animaciones */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white text-center drop-shadow-2xl">
            {t('cards.exploreTitle')}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mt-3 sm:mt-4 text-center max-w-2xl mx-auto">
            {t('cards.exploreSubtitle')}
          </p>
        </div>

        {/* Flechas SOLO en desktop */}
        {!shouldRemoveAnimations && (
          <>
            <button
              aria-label={t('cards.previous')}
              onClick={() => {
                const c = containerRef.current;
                if (!c) return;
                c.scrollBy({ left: -400, behavior: 'auto' });
                pauseThenResume();
              }}
              className="hidden sm:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-30 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              aria-label={t('cards.next')}
              onClick={() => {
                const c = containerRef.current;
                if (!c) return;
                c.scrollBy({ left: 400, behavior: 'auto' });
                pauseThenResume();
              }}
              className="hidden sm:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-30 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 lg:w-6 lg:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Carrusel optimizado */}
        <div
          ref={containerRef}
          className="flex flex-nowrap gap-6 sm:gap-8 py-4 px-4 sm:px-6 lg:px-8 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
          role="region"
          aria-label={t('cards.exploreTitle')}
          aria-live="polite"
        >
          {getCardsData(t).map((card, index) => (
            <VisualCard 
              key={`${card.title}-${index}`}
              card={card} 
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Indicadores de progreso para móvil/tablet */}
        {(isMobile || shouldRemoveAnimations) && (
          <div className="flex justify-center mt-6 space-x-2">
            {getCardsData(t).map((_, index) => (
              <button
                key={index}
                aria-label={`${t('cards.goToCard')} ${index + 1}`}
                className="w-2 h-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => {
                  const c = containerRef.current;
                  if (c) {
                    const cards = c.querySelectorAll<HTMLElement>('.snap-center');
                    if (cards[index]) {
                      const cardStep = cards[index].offsetLeft;
                      c.scrollTo({ left: cardStep, behavior: 'auto' });
                    }
                  }
                }}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
);

VisualCardsSection.displayName = 'VisualCardsSection';