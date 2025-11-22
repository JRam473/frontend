// components/FloatingNavigation.tsx
import { ChevronLeft, ChevronRight, X, Navigation, Sparkles, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface FloatingNavigationProps {
  cocinas: any[];
  cocinaActiva: number;
  onCocinaChange: (index: number) => void;
  onSiguienteCocina: () => void;
  onAnteriorCocina: () => void;
  isVisible: boolean;
  onClose: () => void;
}

export function FloatingNavigation({
  cocinas,
  cocinaActiva,
  onCocinaChange,
  onSiguienteCocina,
  onAnteriorCocina,
  isVisible,
  onClose
}: FloatingNavigationProps) {
  // Estados con valores iniciales explícitos
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation(); // ← AGREGAR HOOK

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true); // En móvil empezar colapsado
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Ocultar tooltip después de 5 segundos
  useEffect(() => {
    if (showTooltip && isVisible) {
      timeoutRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [showTooltip, isVisible]);

  const handleInteraction = () => {
    setShowTooltip(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const cocinaActual = cocinas[cocinaActiva]?.nombre || `${t('cocinas.floatingNav.kitchen')} ${cocinaActiva + 1}`; // ← TRADUCIBLE

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Contenedor Principal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed z-50 ${
              isMobile 
                ? 'bottom-20 left-4 right-4'
                : 'bottom-8 left-1/2 transform -translate-x-1/2'
            }`}
            onMouseEnter={handleInteraction}
            onTouchStart={handleInteraction}
          >
            <div className="bg-white/25 backdrop-blur-md border-2 border-red-700 rounded-2xl shadow-2xl px-4 py-3">
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-amber-600 font-medium font-serif truncate">
                      {t('cocinas.floatingNav.currentlyViewing')} {/* ← TRADUCIBLE */}
                    </p>
                    <p className="text-sm font-bold font-serif text-gray-900 truncate">
                      {cocinaActual}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 ml-2">
                  {isMobile && (
                    <button
                      onClick={() => setIsCollapsed(!isCollapsed)}
                      className="p-1 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={onClose}
                    className="p-1 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all"
                    aria-label={t('cocinas.floatingNav.close')} 
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Controles de Navegación */}
              <AnimatePresence>
                {(!isMobile || !isCollapsed) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center justify-between gap-4 pt-2 border-t border-amber-100">
                      <button
                        onClick={onAnteriorCocina}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all duration-200 shadow-sm hover:shadow-md border border-amber-200 font-medium font-serif"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        {!isMobile && <span>{t('cocinas.floatingNav.previous')}</span>} {/* ← TRADUCIBLE */}
                      </button>

                      <div className="flex items-center gap-3 flex-1 justify-center">
                        <div className="bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                          <span className="text-sm font-bold font-serif text-amber-700 whitespace-nowrap">
                            {cocinaActiva + 1} / {cocinas.length}
                          </span>
                        </div>

                        {!isMobile && (
                          <div className="flex space-x-1">
                            {cocinas.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => onCocinaChange(index)}
                                className={`transition-all duration-800 transform ${
                                  index === cocinaActiva 
                                    ? 'bg-orange-900 w-3 h-3 scale-125' 
                                    : 'bg-amber-600 hover:bg-amber-400 w-2 h-2 hover:scale-110'
                                } rounded-full hover:shadow-md`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={onSiguienteCocina}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all duration-200 shadow-sm hover:shadow-md border border-amber-200 font-medium font-serif"
                      >
                        {!isMobile && <span>{t('cocinas.floatingNav.next')}</span>} {/* ← TRADUCIBLE */}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Tooltip Educativo */}
          <AnimatePresence>
            {showTooltip ? (
              // --- Tooltip expandido ---
              <motion.div
                key="expanded-tooltip"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={`text-center mt-3 ${isMobile ? 'mx-4' : 'mx-auto max-w-xs'}`}
              >
                <div className="bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg relative">
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="absolute top-1 right-1 text-white/80 hover:text-white transition"
                    aria-label={t('cocinas.floatingNav.minimize')} 
                  >
                    <X className="w-3 h-3" />
                  </button>

                  <p className="text-sm font-medium font-serif flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {t('cocinas.floatingNav.tooltip.title')} {/* ← TRADUCIBLE */}
                  </p>
                  <p className="text-xs opacity-90 mt-1 font-serif">
                    {t('cocinas.floatingNav.tooltip.description')} {/* ← TRADUCIBLE */}
                  </p>
                </div>
                <div className="w-4 h-4 bg-red-500 rotate-45 transform mx-auto -mt-2"></div>
              </motion.div>
            ) : (
              // --- Tooltip minimizado ---
              <motion.button
                key="collapsed-tooltip"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={() => setShowTooltip(true)}
                className={`mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-all ${
                  isMobile ? 'mx-auto' : 'mx-auto animate-bounce'
                }`}
                aria-label={t('cocinas.floatingNav.showInfo')}
              >
                <Navigation className="w-4 h-4" />
                <span className="text-xs font-serif font-medium hidden sm:inline">
                  {t('cocinas.floatingNav.view')} {/* ← TRADUCIBLE */}
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          </motion.div>

          {/* Botón flotante para móvil */}
          <AnimatePresence>
            {isMobile && isCollapsed && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={() => setIsCollapsed(false)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-amber-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-amber-600 transition-all hover:scale-110 animate-bounce"
              >
                <Plus className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-700 text-white text-xs rounded-full flex items-center justify-center font-bold font-serif">
                  {cocinaActiva + 1}
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}