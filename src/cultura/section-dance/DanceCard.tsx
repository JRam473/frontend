import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Plus } from 'lucide-react';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react'; // ← Agregar estos imports
import type{ Dance } from '../../i18n/types'; 
import { useTranslation } from '../../contexts/TranslationContext'; // ← AGREGAR IMPORT

// Definimos las props para el componente
interface DanceCardProps {
  dance: Dance;
  index: number;
  activeIndex: number;
  expandedIndex: number | null;
  setExpandedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  iconMap: Record<string, React.ElementType>;
  isMobile: boolean;
  totalItems: number;
}

// --- NUEVO SUBCOMPONENTE: InteractiveOverlay ---
interface InteractiveOverlayProps {
    isExpanded: boolean;
    isMobile: boolean;
    isVideoPlaying: boolean;
}

const InteractiveOverlay: React.FC<InteractiveOverlayProps> = ({ 
  isExpanded, 
  isMobile,
  isVideoPlaying // ← AGREGAR ESTE PARÁMETRO
}) => {
  const { t } = useTranslation();

  // ✅ CONDICIÓN MEJORADA: No mostrar si expandido O si video reproduciéndose
  if (isExpanded || isVideoPlaying) return null;

  // Variante de Framer Motion para el botón
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  // Estilos base para el botón (cumpliendo con 44x44px en móvil)
  const baseClasses = "flex items-center justify-center font-semibold font-serif rounded-full shadow-lg transition-all duration-300 whitespace-nowrap bg-amber-500 text-gray-900 border-2 border-white/50";
  
  if (isMobile) {
    // Móvil: Fijo y discreto (esquina inferior derecha)
    return (
      <motion.div 
        className={`absolute bottom-20 right-6 z-20 h-9 w-11 ${baseClasses}`}
        initial="hidden"
        animate="visible"
        variants={buttonVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        role="button"
        aria-label={t('dance.tapToLearnMore')}
      >
        <Plus size={20} className="h-5 w-5" />
      </motion.div>
    );
  }

  // Desktop: Flotante y visible solo al hacer hover (usando 'group-hover')
  return (
    <AnimatePresence>
      <motion.div 
        className={`absolute top-12 left-10 -translate-x-1/2 -translate-y-1/2 z-20 py-3 px-6 text-lg ${baseClasses} opacity-0 group-hover:opacity-100 group-hover:scale-105`}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={buttonVariants}
        transition={{ duration: 0.2 }}
        role="button"
        aria-hidden="true"
      >
        <ArrowUpRight size={20} className="mr-2 h-5 w-5 animate-bounce" />
        {t('dance.learnMore')}
      </motion.div>
    </AnimatePresence>
  );
};

// --- Componente DanceCard ---

export const DanceCard: React.FC<DanceCardProps> = ({
  dance,
  index,
  activeIndex,
  expandedIndex,
  setExpandedIndex,
  setActiveIndex,
  iconMap,
  isMobile,
}) => {
  // 🎥 ESTADOS NUEVOS PARA VIDEO
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useTranslation(); // ← AGREGAR HOOK

  const isActive = index === activeIndex;
  const isExpanded = index === expandedIndex;
  const position = index - activeIndex;
  
  // Cálculo de animación (se mantiene igual)
  const x = isMobile ? position * 100 : position * 50;
  const rotateY = isMobile ? 0 : position * -20;
  const scale = 1 - Math.abs(position) * 0.2;
  const opacity = isActive || isExpanded ? 1 : (isMobile ? 0 : 1 - Math.abs(position) * 0.4);

  // MODIFICAR la función handleClick existente
const handleClick = (e: React.MouseEvent) => {
  // 🎥 DETECCIÓN CRÍTICA: Si el click viene del botón de video, NO hacer nada más
  const target = e.target as HTMLElement;
  const isVideoButton = target.closest('button[aria-label*="video"]') || 
                       target.closest('.video-control') ||
                       target.closest('video');
  
  if (isVideoButton) {
    // El click es para control de video - ya se manejó en toggleVideoPlayback
    return;
  }
  
  e.preventDefault();
  e.stopPropagation();
  
  if (isExpanded) {
    setExpandedIndex(null);
  } else if (isActive) {
    setExpandedIndex(index);
  } else {
    setActiveIndex(index);
  }
};

// 🎥 FUNCIONES NUEVAS PARA CONTROL DE VIDEO
const toggleVideoPlayback = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  
  if (!videoRef.current) return;
  
  if (isVideoPlaying) {
    videoRef.current.pause();
    setIsVideoPlaying(false);
  } else {
    videoRef.current.play().catch(console.error);
    setIsVideoPlaying(true);
  }
};

const handleVideoLoad = () => {
  setIsVideoLoaded(true);
};

// 🎥 EFECTO PARA PAUSAR VIDEO CUANDO NO ESTÁ ACTIVO
useEffect(() => {
  if ((!isActive && !isExpanded) && videoRef.current) {
    videoRef.current.pause();
    setIsVideoPlaying(false);
  }
}, [isActive, isExpanded]);

// 🎥 AGREGAR después del useEffect existente
useEffect(() => {
  if (!videoRef.current || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && videoRef.current && isVideoPlaying) {
          // Si el video sale de la vista y está reproduciéndose, pausarlo
          videoRef.current.pause();
          setIsVideoPlaying(false);
        }
      });
    },
    { threshold: 0.3 } // 30% visible
  );

  observer.observe(videoRef.current);
  return () => observer.disconnect();
}, [isVideoPlaying]);

  return (
    <motion.div
      key={dance.id}
      layout
      className={`absolute w-full h-full origin-center cursor-pointer group ${isExpanded ? 'z-30' : 'z-10'}`}
      initial={false}
      animate={{ 
        x: `${x}%`, 
        scale: isExpanded ? 1.05 : scale, 
        opacity: opacity, 
        rotateY: isExpanded ? 0 : rotateY, 
        zIndex: isExpanded ? 10 : (index === activeIndex ? 5 : (index === activeIndex + 1 || index === activeIndex - 1 ? 4 : 1)) 
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      onClick={(e) => handleClick(e)}  // ← PASA EL EVENTO EXPLÍCITAMENTE
      role="button"
      tabIndex={isActive ? 0 : -1}
      aria-expanded={isExpanded}
      aria-label={`${t('dance.danceDetails')} ${dance.name}. Pulsa para ${isExpanded ? t('dance.close') : t('dance.expand')}`} // ← TRADUCIBLE
    >
      <div className="w-full h-full bg-black rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-orange-400/50 relative">
        
<div className="absolute inset-0 w-full h-full">
  {/* Imagen de fondo (siempre visible) */}
  <img
    src={dance.image}
    alt={dance.name}
    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
      isVideoPlaying ? 'opacity-0' : 'opacity-100'
    }`}
  />
  
  {/* Video con controles */}
  <div className={`absolute inset-0 transition-opacity duration-500 ${
    isVideoPlaying ? 'opacity-100' : 'opacity-0'
  }`}>
    <video
      ref={videoRef}
      src={dance.video}
      className="w-full h-full object-cover video-control" // ← agregar clase
      loop
      muted
      playsInline
      preload="metadata"
      onLoadedData={handleVideoLoad}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onPlay={() => setIsVideoPlaying(true)}
      onPause={() => setIsVideoPlaying(false)}
    />
  </div>

  {/* Overlay de controles de video */}
<div className={`absolute ${
  isMobile 
    ? 'bottom-4 right-4' 
    : 'inset-0 flex items-center justify-center'
} transition-opacity duration-300 z-20 ${
  isVideoPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
} ${isExpanded && isMobile ? 'hidden' : ''}`}>
  <button
  onClick={toggleVideoPlayback}
  className={`video-control bg-white/90 backdrop-blur-sm rounded-full shadow-2xl transform transition-all duration-300 ${
    isMobile 
      ? 'p-2 hover:scale-105' 
      : 'p-3 hover:scale-110 flex items-center justify-center'
  } group z-30`}
>
    {isVideoPlaying ? (
      <Pause className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-gray-900`} />
    ) : (
      <Play className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-gray-900 ${!isMobile ? 'ml-0.5' : ''}`} />
    )}
  </button>
</div>

  {/* Overlay para mejorar legibilidad (mantener existente) */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-t-2xl"></div>
  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

  {/* Indicador de video disponible */}
  {!isVideoPlaying && (
    <div className={`absolute top-4 left-4 bg-black/70 text-white ${
  isMobile ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-xs'
} rounded-full font-medium backdrop-blur-sm flex items-center gap-1`}>
      <Play className="w-3 h-3" />
      <span>Video</span>
    </div>
  )}
</div>
        
        {/* Llama al nuevo componente Overlay */}
        <InteractiveOverlay 
          isExpanded={isExpanded} 
          isMobile={isMobile}
          isVideoPlaying={isVideoPlaying} // ← AGREGAR ESTE PROP NUEVO
        />
        
        {/* Contenido en la vista normal/base */}
        <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 lg:p-8 text-white">
          <motion.h3 layout="position" className="text-2xl xs:text-3xl sm:text-4xl font-bold font-serif transition duration-300 group-hover:text-amber-300 leading-tight">
            {dance.name} {/* ← ESTE VIENE DEL JSON TRADUCIDO */}
          </motion.h3>
          <AnimatePresence>
            {!isExpanded && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }} exit={{ opacity: 0 }} className="text-sm xs:text-base sm:text-lg mt-1 sm:mt-2 font-light font-serif leading-relaxed">
                {dance.description} {/* ← ESTE VIENE DEL JSON TRADUCIDO */}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Contenido expandido */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 pt-3 sm:pt-4 bg-gradient-to-t from-black via-black/95 to-transparent max-h-[70%] md:max-h-[60%] lg:max-h-[55%] overflow-y-auto custom-scrollbar" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }} 
              exit={{ opacity: 0 }}
            >
              <p className="text-gray-300 mb-4 sm:mb-6 text-xs xs:text-sm sm:text-base italic border-l-4 border-amber-500 pl-3 sm:pl-4 leading-relaxed">
                "{dance.details.story}" {/* ← ESTE VIENE DEL JSON TRADUCIDO */}
              </p>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {dance.details.elements.map((el) => { 
                  const Icon = iconMap[el.icon]; 
                  return ( 
                    <div key={el.title} className="bg-white/10 p-2 sm:p-3 rounded-lg backdrop-blur-sm"> 
                      <h4 className="font-bold font-serif text-xs xs:text-sm sm:text-base flex items-center gap-1 sm:gap-2 text-amber-300 mb-1 leading-tight">
                        <Icon size={18}/> {el.title} {/* ← ESTE VIENE DEL JSON TRADUCIDO */}
                      </h4> 
                      <p className="text-gray-300 text-xs xs:text-sm sm:text-sm leading-relaxed">
                        {el.text} {/* ← ESTE VIENE DEL JSON TRADUCIDO */}
                      </p> 
                    </div> 
                  ); 
                })}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setExpandedIndex(null); }} 
                className="absolute top-4 right-4 p-2 bg-white/30 rounded-full hover:bg-white/50 transition z-40"
                aria-label={t('dance.closeDanceDetails')} // ← TRADUCIBLE
              >
                <X className="h-5 w-5 text-white"/>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};