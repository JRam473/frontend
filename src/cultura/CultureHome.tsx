// src/sections/CultureHome.tsx
import { ArrowDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';
import { useState, useEffect } from 'react';

export function CultureHome() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detección de dispositivo
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const shouldRemoveAnimations = isMobile || isTablet;

  const handleExploreClick = () => {
    const target = document.getElementById("cultura-section");
    if (target) {
      target.scrollIntoView({ 
        behavior: shouldRemoveAnimations ? 'auto' : 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <section
      id="cultura"
      aria-labelledby="culture-heading"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Video de fondo en pantalla completa CON CLOUDINARY */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_1920/v1763066439/culture-fallback_tajxm4.webp"
          className="w-full h-full object-cover"
        >
          {/* ✅ SOLO una fuente - Cloudinary maneja formatos automáticamente */}
          <source 
            src="https://res.cloudinary.com/dinsl266g/video/upload/f_auto,q_auto,w_1920/v1763066440/Negritos_optimizado_yhrkpl.mp4" 
            type="video/mp4" 
          />
          
          {/* ✅ Fallback accesible */}
          <p className="text-white text-center p-8">
            Tu navegador no soporta la reproducción de video.
          </p>
        </video>

        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/30"></div>
      </div>

      {/* Contenido principal centrado */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          {/* Badge superior */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100/80 to-amber-100/80 px-4 py-2 rounded-full mb-6 backdrop-blur-sm shadow-sm">
            <Sparkles className="h-5 w-5 text-orange-600" aria-hidden="true" />
            <span className="text-orange-800 font-medium font-serif">
              {t('culture.heritageBadge')}
            </span>
          </div>

          {/* Título principal */}
          <h2
            id="culture-heading"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-serif leading-tight text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
          >
            {t('culture.titlePart1')}{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-red-500 bg-clip-text text-transparent">
              {t('culture.titlePart2')}
            </span>
          </h2>

          {/* Descripción */}
          <p className="text-lg sm:text-xl text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
            {t('culture.description')}
          </p>
        </div>

        {/* Botones centrados */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleExploreClick}
            className={`inline-flex items-center gap-2 bg-orange-500 text-white font-medium font-serif px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 transition-colors ${
              shouldRemoveAnimations ? '' : 'hover:scale-105 active:scale-95'
            }`}
          >
            {t('culture.exploreButton')}
            <ArrowDown className="h-5 w-5" />
          </button>
          <Link
            to="/calendario-cultural"
            className={`border-2 border-orange-500 text-orange-100 hover:bg-orange-500/20 px-8 py-4 rounded-full font-medium font-serif text-center backdrop-blur-sm transition-colors ${
              shouldRemoveAnimations ? '' : 'hover:scale-105 transition-transform'
            }`}
          >
            {t('culture.calendarButton')}
          </Link>
        </div>
      </div>
    </section>
  );
}