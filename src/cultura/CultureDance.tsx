import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useWindowSize } from '../../src/hooks/useWindowSize';
import { DanceCard } from './section-dance/DanceCard'; 
import { CTACard } from './section-dance/CTACard';
import { useTranslation } from '../contexts/TranslationContext';
import { useDancesData } from '../hooks/useDancesData';

// --- Mapeo de Iconos ---
const iconMap = {
  Shirt: Shirt, 
  Feather: Feather, 
  Music: Music, 
  Sunrise: Sunrise, 
  Leaf: Leaf, 
  Footprints: Footprints, 
  Heart: Heart, 
  Wind: Wind, 
  BookOpen: BookOpen
};

// Necesitamos importar los iconos
import { Feather, Music, Sunrise, Shirt, Leaf, Footprints, Heart, Wind, BookOpen } from 'lucide-react';

export function CultureDance() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { dances } = useDancesData(); // ← SOLO dances, sin isLoading
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;

  const totalItems = dances.length + 1;
  const ctaCardIndex = dances.length;
  const googleMapsUrl = "https://maps.app.goo.gl/V1TAxyGHhc3cUKpj7";

  const navigate = (direction: 'prev' | 'next') => {
    setActiveIndex((prev) => 
      direction === 'next' 
        ? (prev + 1) % totalItems 
        : (prev - 1 + totalItems) % totalItems
    );
  };

  useEffect(() => {
    if (expandedIndex !== null) return; 

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExpandedIndex(null);
      if (event.key === 'ArrowRight') navigate('next');
      if (event.key === 'ArrowLeft') navigate('prev');
      
      if ((event.key === 'Enter' || event.key === ' ') && activeIndex !== ctaCardIndex) {
        setExpandedIndex(activeIndex);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, expandedIndex, totalItems, ctaCardIndex]);

  return (
    <section id="danzas" className="py-16 sm:py-24 relative overflow-hidden min-h-screen flex flex-col justify-center bg-[url('https://res.cloudinary.com/dinsl266g/image/upload/v1763089444/Fondo-danzas_kkrc28.svg')] bg-no-repeat bg-center bg-cover">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Encabezado */}
       <motion.div 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }}
  className="relative text-center mb-12 md:mb-16"
>
  {/* Fondo translúcido cálido */}
  <div className="absolute inset-0 bg-gradient-to-br from-white via-amber-400/15 to-orange-600 backdrop-blur-md rounded-3xl pointer-events-none"></div>

  {/* Contenido */}
  <div className="relative z-10 p-6 sm:p-10 lg:p-12">
    
    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100/80 to-amber-100/80 px-4 py-2 rounded-md mb-6">
      <Sparkles className="h-5 w-5 text-orange-600" />
      <span className="text-orange-800 font-medium font-serif">
        {t('dance.traditionsInMotion')}
      </span>
    </div>

    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-orange-900 mb-8 drop-shadow-lg">
      {t('dance.ancestralDances')}{' '}
      <span className="bg-gradient-to-r from-orange-900 via-amber-800 to-black bg-clip-text text-transparent">
        ancestrales
      </span>
    </h2>

    <p className="text-lg sm:text-xl text-black max-w-4xl mx-auto leading-relaxed drop-shadow">
      {t('dance.description')}
    </p>
  </div>
</motion.div>

        
        <div className="relative h-[550px] md:h-[600px] flex items-center justify-center">
          
          {/* Botones de Navegación */}
          <AnimatePresence>
            {expandedIndex === null && (
              <>
                <motion.button 
                  key="nav-left"
                  onClick={() => navigate('prev')} 
                  className="absolute left-2 md:left-0 z-20 p-2 bg-white/80 rounded-full shadow-xl hover:bg-white transition" 
                  aria-label={t('dance.previousDance')}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                > 
                  <ChevronLeft className="h-6 w-6 text-gray-700"/> 
                </motion.button>
                <motion.button 
                  key="nav-right"
                  onClick={() => navigate('next')} 
                  className="absolute right-2 md:right-0 z-20 p-2 bg-white/80 rounded-full shadow-xl hover:bg-white transition"
                  aria-label={t('dance.nextDance')}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  <ChevronRight className="h-6 w-6 text-gray-700"/>
                </motion.button>
              </>
            )}
          </AnimatePresence>
          
          {/* Contenedor del Carrusel */}
          <div className="relative w-full h-full max-w-sm md:max-w-4xl">
            
            {dances.map((dance: any, index: number) => (
              <DanceCard
                key={dance.id}
                dance={dance}
                index={index}
                activeIndex={activeIndex}
                expandedIndex={expandedIndex}
                setExpandedIndex={setExpandedIndex}
                setActiveIndex={setActiveIndex}
                iconMap={iconMap}
                isMobile={isMobile}
                totalItems={totalItems}
              />
            ))}

            <CTACard
              index={ctaCardIndex}
              activeIndex={activeIndex}
              isMobile={isMobile}
              totalItems={totalItems}
              googleMapsUrl={googleMapsUrl}
              setActiveIndex={setActiveIndex}
            />

          </div>
        </div>
      </div>
    </section>
  );
}