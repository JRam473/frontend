// TooltipInformativo.tsx - versión mejorada
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Hand, X, Smartphone } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface TooltipInformativoProps {
  isFirstVisit?: boolean;
}

export const TooltipInformativo: React.FC<TooltipInformativoProps> = ({ 
  isFirstVisit = false 
}) => {
  const [isVisible, setIsVisible] = useState(isFirstVisit);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation(); // ← AGREGAR HOOK

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar automáticamente después de 8 segundos si es primera visita
  useEffect(() => {
    if (isFirstVisit) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        className="fixed bottom-6 left-6 z-40 max-w-sm lg:max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden">
          {/* Header del tooltip */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              {isMobile ? <Smartphone className="w-5 h-5" /> : <Hand className="w-5 h-5" />}
              <span className="font-semibold font-serif">
                {isMobile 
                  ? t('crafts.tooltip.tapToExplore') // ← TRADUCIBLE
                  : t('crafts.tooltip.discoverMore') // ← TRADUCIBLE
                }
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                {isMinimized ? '↑' : '↓'}
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Contenido del tooltip */}
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4"
            >
              <p className="text-gray-700 text-sm mb-3">
                {isMobile ? (
                  <>
                    <strong>{t('crafts.tooltip.mobileInstruction')}</strong> {/* ← TRADUCIBLE */}
                  </>
                ) : (
                  <>
                    <strong>{t('crafts.tooltip.desktopInstruction')}</strong> {/* ← TRADUCIBLE */}
                  </>
                )}
              </p>
              <div className="flex items-center gap-2 text-amber-600 text-xs">
                <span className="bg-amber-100 px-2 py-1 rounded-full">💡</span>
                <span>
                  {isMobile 
                    ? t('crafts.tooltip.mobileNavigationTip') // ← TRADUCIBLE
                    : t('crafts.tooltip.desktopNavigationTip') // ← TRADUCIBLE
                  }
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};