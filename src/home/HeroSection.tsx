import { Button } from '../components/ui/button';
import { ArrowDown, MapPin, Sparkles, Sun, Languages, Coins, Calendar } from 'lucide-react';
import { type FC, useEffect, useState, lazy, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext'; // ← IMPORTAR EL HOOK
import type { TranslationKey } from '@/i18n/types';

const AnimatedLetterTitle = lazy(() => 
  import('../animations/AnimatedLetterTitle').then(module => ({
    default: module.AnimatedLetterTitle
  }))
);
import { AnimatedTitleFallback } from '../animations/AnimatedTitleFallback';


// Componente de fallback móvil
const MobileFallback: FC = () => (
  <div className="text-white text-center">
    <div className="text-xl font-semibold font-serif">San Juan Tahitic</div>
    <div className="text-sm opacity-80 mt-2">Cargando experiencia...</div>
  </div>
);

/**
 * HeroSection: Sección principal de bienvenida - Optimizado para Móviles
 */
export const HeroSection: FC<HeroSectionProps> = ({ onDiscoverClick, onDiscoverCardClick }) => {
  const { t } = useTranslation(); // ← USAR EL HOOK AQUÍ
  const [visible, setVisible] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [clima, setClima] = useState<string>("Cargando...");
  const [climaError, setClimaError] = useState<string | null>(null);

  // Detectar móvil y preferencias de usuario
  useEffect(() => {
    const checkMobileAndPreferences = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Verificar preferencia de reducción de movimiento
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setReduceMotion(prefersReducedMotion);

      // Reducir animaciones en móviles low-end
      if (mobile && 'hardwareConcurrency' in navigator) {
        const cores = navigator.hardwareConcurrency || 4;
        if (cores < 4) {
          setReduceMotion(true);
        }
      }
    };

    checkMobileAndPreferences();
    window.addEventListener('resize', checkMobileAndPreferences);
    
    // Escuchar cambios en preferencias de movimiento
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    motionMediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkMobileAndPreferences);
      motionMediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

    // Obtener clima real desde Open-Meteo
  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=19.9366099&longitude=-97.5511631&current_weather=true")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener el clima");
        return res.json();
      })
      .then((data) => {
        const temperatura = data.current_weather.temperature;
        setClima(`${temperatura}°C`);
      })
      .catch((err) => setClimaError(err.message));
  }, []);

  // Ciclo de fade optimizado para móviles
  useEffect(() => {
    if (reduceMotion) {
      setVisible(true); // Siempre visible si hay reducción de movimiento
      return;
    }

    const intervalTime = isMobile ? 15000 : 10000; // 15s en móvil vs 10s en desktop
    
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => setVisible(true), isMobile ? 3000 : 4000);
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [isMobile, reduceMotion]);

  // Pausar animaciones cuando la página no es visible (especialmente en móviles)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pausar cuando la pestaña no es visible (cambio de app en móvil)
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Preload crítico optimizado para móviles
  /* useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = isMobile ? '/images/san_juan-mobile-optimized.jpg' : '/images/san_juan-poster.jpg';
    
    if ('fonts' in document) {
      document.fonts.load('1em Inter');
    }
  }, [isMobile]);*/

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden"
      aria-label="Sección de bienvenida San Juan Tahitic"
      style={{
        // Optimizaciones GPU para móviles
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      {/* Fondo optimizado para móviles */}
      <BackgroundLayer 
        onVideoLoad={() => setIsVideoLoaded(true)}
        isVideoLoaded={isVideoLoaded}
        isMobile={isMobile}
      />

      {/* Contenido animado con optimizaciones móviles */}
      <div className={reduceMotion ? 'reduce-motion' : ''}>
        <AnimatePresence>
          {(visible || reduceMotion) && (
            <motion.div
              key="heroContent"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ 
                duration: isMobile ? 1 : 1.5,
                ease: "easeOut"
              }}
              className="absolute inset-0 flex flex-col items-center justify-center w-full h-full z-10"
            >
              <Suspense fallback={<MobileFallback />}>
                <MainContent 
                  scrollToTourism={onDiscoverClick}
                  scrollToContact={onDiscoverCardClick} 
                  isVideoLoaded={isVideoLoaded}
                  isMobile={isMobile}
                  reduceMotion={reduceMotion}
                  clima={clima}
                  climaError={climaError}
                  t={t} // ← PASAR LA FUNCIÓN t COMO PROP
                />
              </Suspense>
              <ScrollIndicator isMobile={isMobile} reduceMotion={reduceMotion} t={t} /> {/* ← PASAR t */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

/**
 * Capa de fondo optimizada para móviles
 */
interface BackgroundLayerProps {
  onVideoLoad: () => void;
  isVideoLoaded: boolean;
  isMobile: boolean;
}

interface HeroSectionProps {
  onDiscoverClick: () => void;
  onDiscoverCardClick: () => void;
}

/**
 * Capa de fondo optimizada con Cloudinary - URLs DIRECTAS
 */
const BackgroundLayer: FC<BackgroundLayerProps> = ({ onVideoLoad, isVideoLoaded, isMobile }) => {
  const [videoError, setVideoError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // ✅ URLs DIRECTAS de Cloudinary - COPIAR TUS URLs EXACTAS AQUÍ
  const videoUrl = "https://res.cloudinary.com/dinsl266g/video/upload/v1763052085/hero-home-video.mp4_nn6ztj.mp4";
  const imageUrl = "https://res.cloudinary.com/dinsl266g/image/upload/v1763052576/hero-home-image_anavv1.png";

  const handleVideoError = useCallback(() => {
    console.warn('❌ Video de Cloudinary falló, usando imagen de respaldo');
    setVideoError(true);
    // Asegurarnos de marcar como cargado incluso si falla el video
    if (imageLoaded) {
      onVideoLoad();
    }
  }, [onVideoLoad, imageLoaded]);

  const handleVideoLoad = useCallback(() => {
    console.log('✅ Video de Cloudinary cargado correctamente');
    setVideoError(false);
    onVideoLoad();
  }, [onVideoLoad]);

  const handleImageLoad = useCallback(() => {
    console.log('✅ Imagen de Cloudinary cargada correctamente');
    setImageLoaded(true);
    // Si el video ya falló, marcar como cargado
    if (videoError) {
      onVideoLoad();
    }
  }, [onVideoLoad, videoError]);

  return (
    <div className="absolute inset-0 z-0">
      {/* Video optimizado con Cloudinary */}
      <video
        key="cloudinary-hero-video"
        autoPlay={!isMobile}
        loop
        muted
        playsInline
        preload={isMobile ? "metadata" : "auto"}
        poster={imageUrl}
        className={`
          absolute inset-0 w-full h-full min-h-screen object-cover bg-black
          ${isMobile ? 'object-center' : 'object-[60%_center] xl:object-[55%_bottom]'}
          transition-opacity duration-1000
          ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}
          ${videoError ? 'hidden' : ''}
        `}
        aria-label="Paisajes de San Juan Tahitic"
        onLoadedData={handleVideoLoad}
        onCanPlayThrough={handleVideoLoad}
        onError={handleVideoError}
      >
        {/* ✅ SOLO una fuente - URL directa de Cloudinary */}
        <source src={videoUrl} type="video/mp4" />
        
        {/* Fallback para navegadores antiguos */}
        <track kind="captions" src="/videos/captions.vtt" srcLang="es" label="Español" default />
      </video>

      {/* ✅ Fallback de imagen SOLO si video falla */}
      {videoError && (
        <img 
          src={imageUrl}
          alt="Paisajes de San Juan Tahitic"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          onLoad={handleImageLoad}
        />
      )}

      {/* Overlays optimizados para móviles */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/60"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      
      {/* Loading state móvil mejorado */}
      {!isVideoLoaded && !videoError && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-white text-lg animate-pulse">
            {isMobile ? 'Cargando desde la nube...' : 'Cargando experiencia...'}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Contenido principal optimizado para móviles
 */
interface MainContentProps {
  scrollToTourism: () => void;
  scrollToContact: () => void;
  isVideoLoaded: boolean;
  isMobile: boolean;
  reduceMotion: boolean;
  clima: string;
  climaError: string | null;
   t: (key: TranslationKey) => string; // ✅ CORRECTO
}

const MainContent: FC<MainContentProps> = ({ 
  scrollToTourism, 
  scrollToContact, 
  isVideoLoaded, 
  isMobile,
  reduceMotion,
  clima,
  climaError,
  t // ← RECIBIR t COMO PROP
}) => (
  <div className={`relative z-10 text-center max-w-4xl mx-auto px-4 py-8 sm:py-20 flex flex-col items-center transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
    
    {/* Badge superior optimizado para móviles - AHORA TRADUCIBLE */}
    <div className={`inline-flex items-center space-x-2 bg-white/25 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-2 rounded-md mb-10 sm:mb-12 border border-white/30 shadow-xl ${
      reduceMotion ? '' : 'animate-fade-in-down'
    }`}>
      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-green-900" aria-hidden="true" />
      <span className="text-black font-medium font-serif text-sm sm:text-base">
        {t('hero.region')} {/* ← TEXTO TRADUCIBLE */}
      </span>
      <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-blue-800 animate-pulse" aria-hidden="true" />
    </div>

    {/* Título animado con optimizaciones móviles */}
    <div className={`relative mb-10 sm:mb-12 w-full flex justify-center ${
      reduceMotion ? '' : 'animate-fade-in-up'
    }`}>
    <Suspense fallback={<AnimatedTitleFallback isMobile={isMobile} />}>
      {isVideoLoaded ? (
        <AnimatedLetterTitle />
      ) : (
        <AnimatedTitleFallback isMobile={isMobile} />
      )}
    </Suspense>
    </div>

    {/* Datos rápidos optimizados para móviles - AHORA TRADUCIBLES */}
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-4xl w-full mx-auto mb-12 sm:mb-14 ${
      reduceMotion ? '' : 'animate-fade-in-up'
    }`}>
      {[
        { 
          label: t('hero.weather'), // ← TRADUCIBLE
          value: climaError ? t('hero.error') : clima, // ← TRADUCIBLE
          icon: <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-800" aria-hidden="true" /> 
        },
        { 
          label: t('hero.language'), // ← TRADUCIBLE
          value: t('hero.spanish'), // ← TRADUCIBLE
          icon: <Languages className="h-4 w-4 sm:h-5 sm:w-5 text-black" aria-hidden="true" /> 
        },
        { 
          label: t('hero.currency'), // ← TRADUCIBLE
          value: "MXN", 
          icon: <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" aria-hidden="true" /> 
        },
        { 
          label: t('hero.season'), // ← TRADUCIBLE
          value: t('hero.seasonMonths'), // ← TRADUCIBLE
          icon: <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" aria-hidden="true" /> 
        }
      ].map((info, index) => (
        <div
          key={index}
          className="bg-white/20 backdrop-blur-md p-2 sm:p-4 rounded-lg sm:rounded-xl border border-white/20 shadow-lg hover:bg-white/15 transition-colors duration-300 flex flex-col items-center"
          role="listitem"
        >
          {info.icon}
          <div className="text-green-200 text-sm uppercase mt-1 sm:mt-2 font-semibold font-serif">{info.label}</div>
          <div className="text-white text-xs sm:text-sm font-medium font-serif mt-1">{info.value}</div>
        </div>
      ))}
    </div>

    {/* Botones optimizados para móviles - AHORA TRADUCIBLES */}
    <div className={`flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center w-full ${
      reduceMotion ? '' : 'animate-fade-in-up'
    }`}>
      <Button 
        size={isMobile ? "default" : "lg"}
        onClick={scrollToTourism}
        className="group relative w-full sm:w-auto overflow-hidden rounded-full border-0 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-base font-semibold font-serif text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-10 sm:py-4 sm:text-lg"
        aria-label={t('hero.discoverAria')} // ← ARIA LABEL TRADUCIBLE
      >
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-700 via-cyan-500 to-green-800 opacity-0 transition-opacity duration-500 group-hover:opacity-75" />
        {/* Efecto de brillo */}
        <span className="absolute inset-0 h-full w-full -translate-x-full transform bg-white opacity-20 transition-transform duration-700 ease-in-out group-hover:translate-x-full group-hover:duration-1000" />
        
        <span className="relative z-10 flex items-center justify-center">
          {t('hero.discoverButton')} {/* ← TEXTO DEL BOTÓN TRADUCIBLE */}
          <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-y-1" aria-hidden="true" />
        </span>
      </Button>

      <Button 
        variant="outline"
        size={isMobile ? "default" : "lg"}
        onClick={scrollToContact}
        className="group relative w-full sm:w-auto rounded-full border-2 border-transparent bg-white/10 px-6 py-3 text-base font-semibold font-serif text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-10 sm:py-4 sm:text-lg"
        aria-label={t('hero.adventureAria')} // ← ARIA LABEL TRADUCIBLE
      >
        {/* Contenedor del borde Aurora */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-green-400 opacity-0 transition-opacity duration-500 group-hover:opacity-75" />
        
        {/* Pseudo-elemento para la animación del borde */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-green-400 opacity-0 blur-lg transition-opacity duration-500 group-hover:animate-spin-slow group-hover:opacity-50" />

        <span className="relative z-10 flex items-center justify-center">
          {t('hero.adventureButton')} {/* ← TEXTO DEL BOTÓN TRADUCIBLE */}
          <Sparkles className="ml-2 h-5 w-5 transform transition-transform duration-500 ease-in-out group-hover:rotate-12 group-hover:scale-125" aria-hidden="true" />
        </span>
      </Button>
    </div>
  </div>
);

/**
 * Indicador de scroll optimizado para móviles
 */
interface ScrollIndicatorProps {
  isMobile: boolean;
  reduceMotion: boolean;
  t: (key: TranslationKey) => string; // ✅ CORRECTO
}

const ScrollIndicator: FC<ScrollIndicatorProps> = ({ isMobile, reduceMotion, t }) => (
  <div className={`absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 ${
    reduceMotion ? '' : 'animate-fade-in'
  }`}>
    <div className="flex flex-col items-center space-y-6 sm:space-y-4">
      <div className="text-white/60 text-xs sm:text-sm font-medium font-serif animate-pulse">
        {isMobile ? t('hero.scrollMobile') : t('hero.scrollDesktop')} {/* ← TEXTO TRADUCIBLE */}
      </div>
      <div className="relative">
        <div className={`relative bg-white/30 backdrop-blur-sm rounded-full border border-white/40 shadow-lg ${
          reduceMotion ? '' : 'animate-bounce'
        } ${isMobile ? 'p-2' : 'p-3'}`}>
          <ArrowDown className={isMobile ? "h-4 w-4 text-white" : "h-6 w-6 text-white"} aria-hidden="true" />
        </div>
      </div>
    </div>
  </div>
);