// HeroSection.tsx - Versión corregida
import { motion } from 'framer-motion';
import { Sparkles, ChefHat, Award, BookOpen, Compass, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface HeroSectionProps {
  cocina: any;
  cocinaActiva: number;
  totalCocinas: number;
  onNavigate: (section: string) => void;
  onSiguienteCocina: () => void;
  onAnteriorCocina: () => void;
  onCocinaChange: (index: number) => void;
}

export function HeroSection({ 
  cocina, 
  cocinaActiva, 
  totalCocinas, 
  onNavigate, 
  onSiguienteCocina, 
  onAnteriorCocina,
}: HeroSectionProps) {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  return (
    <section id="cocinas" className="relative min-h-screen bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 text-white overflow-hidden">
      {/* Fondo con imagen de la cocina */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${cocina.imagenes.principal}')` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
      </div>
      
      <div className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 max-w-[100vw]">
        
        {/* Flecha Izquierda - MEJORADO RESPONSIVE */}
        <motion.button
          onClick={onAnteriorCocina}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-2 sm:left-4 md:left-6 lg:left-8 z-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-2 sm:p-3 md:p-4 text-white hover:bg-white/30 transition-all duration-300 shadow-2xl"
          aria-label={t('cocinas.hero.previousKitchen')} // ← TRADUCIBLE
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
        </motion.button>

        {/* Flecha Derecha - MEJORADO RESPONSIVE */}
        <motion.button
          onClick={onSiguienteCocina}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 sm:right-4 md:right-6 lg:right-8 z-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-2 sm:p-3 md:p-4 text-white hover:bg-white/30 transition-all duration-300 shadow-2xl"
          aria-label={t('cocinas.hero.nextKitchen')} // ← TRADUCIBLE
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
        </motion.button>

        {/* Contenido Principal - OPTIMIZADO RESPONSIVE */}
        <div className="text-center max-w-4xl mx-auto z-10 px-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6 md:mb-8"
          >
            {/* Indicador de cocina activa */}
            <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4 md:mb-6">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-amber-300" />
              <span className="text-xs sm:text-sm md:text-base font-semibold font-serif text-amber-200 bg-amber-900/50 px-2 sm:px-3 py-1 rounded-full">
                {cocinaActiva + 1} {t('cocinas.header.of')} {totalCocinas} {t('cocinas.hero.experiences')} {/* ← TRADUCIBLE */}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-serif mb-3 sm:mb-4 md:mb-6 leading-tight">
              {cocina.nombre} {/* ← VIENE DEL JSON */}
            </h1>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-3 md:space-x-4 lg:space-x-6 mb-3 sm:mb-4 md:mb-6">
              <div className="flex items-center text-amber-200 bg-amber-900/50 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                <ChefHat className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm md:text-base font-semibold font-serif">{cocina.tipo}</span> {/* ← VIENE DEL JSON */}
              </div>
              <div className="flex items-center text-amber-200 bg-amber-900/50 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm md:text-base font-semibold font-serif">
                  {cocina.generaciones} {t('cocinas.hero.generations')} {/* ← TRADUCIBLE */}
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed font-light font-serif"
          >
            {cocina.descripcionLarga} {/* ← VIENE DEL JSON */}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center items-center mb-6 sm:mb-8 md:mb-12"
          >
            <button
              onClick={() => onNavigate('informacion-restaurante')}
              className="group bg-white text-amber-900 px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl font-bold font-serif text-sm sm:text-base md:text-lg hover:bg-amber-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>{t('cocinas.hero.discoverOurStory')}</span> {/* ← TRADUCIBLE */}
            </button>
            <button
              onClick={() => onNavigate('ubicacion')}
              className="group border-2 border-white text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl font-bold font-serif text-sm sm:text-base md:text-lg hover:bg-white hover:text-amber-900 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <Compass className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>{t('cocinas.hero.howToGetThere')}</span> {/* ← TRADUCIBLE */}
            </button>
          </motion.div>

          {/* Indicadores de cocina - Parte inferior */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center space-y-3"
          >
            <p className="text-amber-200 text-xs sm:text-sm font-medium font-serif bg-amber-900/50 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-center">
              {t('cocinas.hero.useArrows')} {/* ← TRADUCIBLE */}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}