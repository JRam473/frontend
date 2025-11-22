import { Button } from '../components/ui/button';
import { ArrowDown, MapPin, Sparkles } from 'lucide-react';
import { type FC, useEffect, useState, lazy, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext'; // ← AGREGAR IMPORT
// Lazy loading para componentes pesados
// Lazy loading para componentes pesados
const AnimatedTitleTourism = lazy(() => 
  import('../animations/AnimatedTitleTourism').then(module => ({
    default: module.AnimatedTitleTourism
  }))
);

// ✅ AGREGAR ESTA LÍNEA (import estático del fallback)
import { AnimatedTitleTourismFallback } from '../animations/AnimatedTitleTourismFallback';

// Componente de fallback móvil
const MobileFallback: FC = () => {
  const { t } = useTranslation(); // ← AGREGAR HOOK
  return (
    <div className="text-white text-center">
      <div className="text-xl font-semibold font-serif">San Juan Tahitic</div>
      <div className="text-sm opacity-80 mt-2">{t('heroturism.loadingExperience')}</div> {/* ← TRADUCIBLE */}
    </div>
  );
};
/**
 * HeroSection: Sección principal de bienvenida - Optimizado para Móviles
 */
export const HeroSection: FC<HeroSectionProps> = ({ onDiscoverClick, onDiscoverCardClick }) => {
  const { t } = useTranslation(); // ← AGREGAR HOOK
  const [visible, setVisible] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [clima, setClima] = useState<string>(t('heroturism.weatherLoading')); // ← TRADUCIBLE
  const [climaError, setClimaError] = useState<string | null>(null);

  // Detectar móvil y preferencias de usuario
  useEffect(() => {
    const checkMobileAndPreferences = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setReduceMotion(prefersReducedMotion);

      if (mobile && 'hardwareConcurrency' in navigator) {
        const cores = navigator.hardwareConcurrency || 4;
        if (cores < 4) {
          setReduceMotion(true);
        }
      }
    };
    checkMobileAndPreferences();
    window.addEventListener('resize', checkMobileAndPreferences);
    
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
        if (!res.ok) throw new Error(t('heroturism.weatherError')); // ← TRADUCIBLE
        return res.json();
      })
      .then((data) => {
        const temperatura = data.current_weather.temperature;
        setClima(`${temperatura}°C`);
      })
      .catch((err) => setClimaError(err.message));
  }, [t]);

  // Ciclo de fade optimizado para móviles
  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const intervalTime = isMobile ? 15000 : 10000;
    
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => setVisible(true), isMobile ? 3000 : 4000);
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [isMobile, reduceMotion]);

  // Pausar animaciones cuando la página no es visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Preload crítico optimizado para móviles
  /*useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = isMobile ? '/images/san_juan-mobile-optimized1.webp' : '/images/san_juan-poster1.webp';
    
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
                />
              </Suspense>
              <ScrollIndicator isMobile={isMobile} reduceMotion={reduceMotion} />
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
  onDiscoverCardClick: () => void; // Nueva prop
}
/**
 * Capa de fondo optimizada con Cloudinary - URLs DIRECTAS
 */
const BackgroundLayer: FC<BackgroundLayerProps> = ({ onVideoLoad, isVideoLoaded, isMobile }) => {
  const [videoError, setVideoError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // ✅ URLs DIRECTAS de Cloudinary para Turismo
  const videoUrl = "https://res.cloudinary.com/dinsl266g/video/upload/f_auto,q_auto,w_1920/v1763063459/san_juan-optimized1_e8zpxo.mp4";
  const imageUrl = "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_1920/v1763063517/san_juan-poster1_ai2yxx.jpg";

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
        key="cloudinary-tourism-video"
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
        aria-label="Paisajes turísticos de San Juan Tahitic"
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
          alt="Paisajes turísticos de San Juan Tahitic"
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
            {isMobile ? 'Cargando turismo...' : 'Cargando experiencia turística...'}
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
}
const MainContent: FC<MainContentProps> = ({ 
  scrollToTourism, 
  scrollToContact, 
  isVideoLoaded, 
  isMobile,
  reduceMotion
}) => {
  const { t } = useTranslation(); // ← AGREGAR HOOK
  
  return (
    <div className={`relative z-10 text-center max-w-4xl mx-auto px-4 py-8 sm:py-20 flex flex-col items-center transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Badge superior optimizado para móviles */}
      <div className={`inline-flex items-center space-x-2 bg-white/25 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-2 rounded-md mb-10 sm:mb-12 border border-white/30 shadow-xl ${
        reduceMotion ? '' : 'animate-fade-in-down'
      }`}>
        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-orange-300" aria-hidden="true" />
        <span className="font-medium font-serif text-sm sm:text-base bg-gradient-to-r from-lime-300 via-teal-400 to-emerald-300 bg-clip-text text-transparent">
          {t('heroturism.beautifulPlace')} {/* ← TRADUCIBLE */}
        </span>
        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-300 animate-pulse" aria-hidden="true" />
      </div>
      
      {/* Título animado con optimizaciones móviles */}
      <div className={`relative mb-10 sm:mb-12 w-full flex justify-center ${
        reduceMotion ? '' : 'animate-fade-in-up'
      }`}>
        <Suspense fallback={<AnimatedTitleTourismFallback isMobile={isMobile} />}>
          {isVideoLoaded ? (
            <AnimatedTitleTourism />
          ) : (
            <AnimatedTitleTourismFallback isMobile={isMobile} />
          )}
        </Suspense>
      </div>
      
      {/* Botones optimizados para móviles */}
      <div className={`flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center w-full ${
        reduceMotion ? '' : 'animate-fade-in-up'
      }`}>
        <Button 
          size={isMobile ? "default" : "lg"}
          onClick={scrollToTourism}
          className="group relative w-full sm:w-auto overflow-hidden rounded-full border-0 bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-base font-semibold font-serif text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-10 sm:py-4 sm:text-lg"
          aria-label="Descubre más sobre el turismo en San Juan Tahitic"
        >
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-700 via-cyan-500 to-green-800 opacity-0 transition-opacity duration-500 group-hover:opacity-75" />
          <span className="absolute inset-0 h-full w-full -translate-x-full transform bg-white opacity-20 transition-transform duration-700 ease-in-out group-hover:translate-x-full group-hover:duration-1000" />
          
          <span className="relative z-10 flex items-center justify-center">
            {t('heroturism.liveSanJuanTahitic')} {/* ← TRADUCIBLE */}
            <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-y-1" aria-hidden="true" />
          </span>
        </Button>
        
        <Button 
          variant="outline"
          size={isMobile ? "default" : "lg"}
          onClick={scrollToContact}
          className="group relative w-full sm:w-auto rounded-full border-2 border-transparent bg-white/10 px-6 py-3 text-base font-semibold font-serif text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-10 sm:py-4 sm:text-lg"
          aria-label="Comienza tu aventura en San Juan Tahitic"
        >
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-green-400 opacity-0 transition-opacity duration-500 group-hover:opacity-75" />
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-green-400 opacity-0 blur-lg transition-opacity duration-500 group-hover:animate-spin-slow group-hover:opacity-50" />
          
          <span className="relative z-10 flex items-center justify-center">
            {t('heroturism.startYourAdventure')} {/* ← TRADUCIBLE */}
            <Sparkles className="ml-2 h-5 w-5 transform transition-transform duration-500 ease-in-out group-hover:rotate-12 group-hover:scale-125" aria-hidden="true" />
          </span>
        </Button>
      </div>
    </div>
  );
};

/**
 * Indicador de scroll optimizado para móviles
 */
const ScrollIndicator: FC<{ isMobile: boolean; reduceMotion: boolean }> = ({ isMobile, reduceMotion }) => {
  const { t } = useTranslation(); // ← AGREGAR HOOK
  
  return (
    <div className={`absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 ${
      reduceMotion ? '' : 'animate-fade-in'
    }`}>
      <div className="flex flex-col items-center space-y-6 sm:space-y-4">
        <div className="text-white/60 text-xs sm:text-sm font-medium font-serif animate-pulse">
          {isMobile ? t('heroturism.swipe') : t('heroturism.discoverMore')} {/* ← TRADUCIBLE */}
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
};