// PlatillosSection.tsx - Versión modularizada
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mouse, ChefHat } from 'lucide-react';
import { DishExpandedModal } from '../section-gastronomia/section-platillos/DishExpandedModal';
import { LazyImage } from '../section-gastronomia/section-platillos/LazyImage';
import { useTranslation } from '../../contexts/TranslationContext'; 
import { usePlatillosData, type Dish } from '@/hooks/usePlatillosData';

export function PlatillosSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const { t } = useTranslation(); // ← AGREGAR HOOK
  const gastronomyData = usePlatillosData();///RECUERDA CAMBIAR

  const backgroundPatternClass = "bg-orange-50/60 bg-[url('https://res.cloudinary.com/dinsl266g/image/upload/v1763084436/Fondo-gastronomia--2_rvukkb.svg')] bg-cover bg-center bg-no-repeat";

  // Preload de imágenes
  // Preload de imágenes - MODIFICADO para usar gastronomyData
  useEffect(() => {
    const preloadImages = async () => {
      const newPreloaded = new Set(preloadedImages);
      
      for (const dish of gastronomyData) {
        if (!newPreloaded.has(dish.image)) {
          const img = new Image();
          img.src = dish.image;
          img.onload = () => {
            newPreloaded.add(dish.image);
            setPreloadedImages(new Set(newPreloaded));
          };
        }
      }
    };

    preloadImages();
  }, [gastronomyData]);

  // Manejo de teclado
  // Manejo de teclado - MODIFICADO para usar gastronomyData
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && activeIndex !== null) {
      setActiveIndex(null);
      return;
    }
    
    if (activeIndex !== null) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const newIndex = (activeIndex + direction + gastronomyData.length) % gastronomyData.length;
        setActiveIndex(newIndex);
      }
    } else if (focusedIndex !== null && (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
      event.preventDefault();
      let newIndex = focusedIndex;
      
      switch (event.key) {
        case 'ArrowRight':
          newIndex = (focusedIndex + 1) % gastronomyData.length;
          break;
        case 'ArrowLeft':
          newIndex = (focusedIndex - 1 + gastronomyData.length) % gastronomyData.length;
          break;
        case 'ArrowDown':
          newIndex = Math.min(focusedIndex + 3, gastronomyData.length - 1);
          break;
        case 'ArrowUp':
          newIndex = Math.max(focusedIndex - 3, 0);
          break;
      }
      
      setFocusedIndex(newIndex);
      const element = document.getElementById(`dish-card-${newIndex}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeIndex, focusedIndex, gastronomyData]); // ← AGREGAR DEPENDENCIA

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleCardClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    setFocusedIndex(null);
  };

  const handleClose = () => {
    setActiveIndex(null);
    if (activeIndex !== null) {
      setTimeout(() => {
        const element = document.getElementById(`dish-card-${activeIndex}`);
        element?.focus();
      }, 100);
    }
  };

  const handleNext = () => {
    if (activeIndex !== null) {
      const newIndex = (activeIndex + 1) % gastronomyData.length;
      setActiveIndex(newIndex);
    }
  };

  const handlePrevious = () => {
    if (activeIndex !== null) {
      const newIndex = (activeIndex - 1 + gastronomyData.length) % gastronomyData.length;
      setActiveIndex(newIndex);
    }
  };

  const handleCardKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(index);
    }
  };

  return (
    <section 
      id="section-gastronomia-inmersiva-v2"
      className={`py-24 relative overflow-hidden ${backgroundPatternClass}`}
      aria-label="Sección de platillos gastronómicos de San Juan Tahitic"
    >
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-serif text-white mb-6 drop-shadow-lg">
            {t('platillos.title')} {/* ← TRADUCIBLE */}
          </h2>
          
          <div className="flex flex-col items-center gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 text-lg text-gray-800 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-orange-200"
            >
              <Mouse className="w-5 h-5 text-orange-600" />
              <span className="font-medium font-serif">{t('platillos.clickInstruction')}</span> {/* ← TRADUCIBLE */}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-black/70 p-6 rounded-2xl backdrop-blur-sm max-w-2xl"
            >
              <p className="text-white text-base md:text-lg leading-relaxed drop-shadow-lg">
                {t('platillos.description')} {/* ← TRADUCIBLE */}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Modal Expansivo - MODIFICADO */}
      <AnimatePresence>
        {activeIndex !== null && (
          <DishExpandedModal
            dish={gastronomyData[activeIndex]}
            isOpen={true}
            onClose={handleClose}
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentIndex={activeIndex}
            totalDishes={gastronomyData.length}
          />
        )}
      </AnimatePresence>

        {/* Grid de platillos */}
        <motion.div
          layout
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${
            activeIndex !== null ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          role="grid"
          aria-label="Grid de platillos gastronómicos"
        >
           {gastronomyData.map((dish, index) => (
            <motion.div
              key={index}
              id={`dish-card-${index}`}
              layout
              className="relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2"
              onClick={() => handleCardClick(index)}
              onKeyDown={(e) => handleCardKeyDown(e, index)}
              onFocus={() => setFocusedIndex(index)}
              whileHover={{ 
                y: -8,
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              role="gridcell"
              aria-label={`${dish.name} por ${dish.chef}. ${t('platillos.ariaLabel')}`} 
              tabIndex={0}
            >
              <LazyImage
                src={dish.image}
                alt={dish.name}
                className="rounded-3xl"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-2xl font-bold font-serif text-white mb-2">{dish.name}</h3>
                  <p className="text-amber-300 flex items-center gap-2 text-sm">
                    <ChefHat className="w-4 h-4" aria-hidden="true" /> 
                    {dish.chef}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-white/80 text-xs animate-bounce">
                    <Mouse className="w-3 h-3" />
                    <span>{t('platillos.clickForInfo')}</span> {/* ← TRADUCIBLE */}
                  </div>
                </motion.div>
              </div>

              <div className="md:hidden absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold font-serif px-2 py-1 rounded-full animate-pulse">
                {t('platillos.tap')} {/* ← TRADUCIBLE */}
              </div>

              {focusedIndex === index && (
                <div className="absolute inset-0 border-4 border-orange-400 rounded-3xl pointer-events-none" />
              )}
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center mt-8 text-white text-sm drop-shadow-lg"
            >
              <p>{t('platillos.exploreOthers')}</p> {/* ← TRADUCIBLE */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

     <div className="sr-only" aria-live="polite" aria-atomic="true">
      {activeIndex !== null 
        ? `${(gastronomyData[activeIndex] as Dish).name} ${t('platillos.screenReader.expanded')}` // ← CORREGIDO
        : t('platillos.screenReader.gridView')}
    </div>
    </section>
  );
}