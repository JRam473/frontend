// components/ViewModeToggle.tsx
import { motion } from 'framer-motion';
import { useTranslation } from '../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface ViewModeToggleProps {
  viewMode: 'circular' | 'grid';
  onViewModeChange: (mode: 'circular' | 'grid') => void;
  isMobile?: boolean; // ✅ Nuevo prop
  shouldRemoveAnimations?: boolean;
}

export function ViewModeToggle({ viewMode, onViewModeChange, isMobile = false }: ViewModeToggleProps) {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  // En móvil, forzar vista grid y ocultar toggle
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 border border-blue-500/30">
          <div className="flex items-center gap-0 text-sm">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
              📱
            </div>
            <span className="text-white font-medium">
              {t('gallery.viewMode.mobileView')} {/* ← TRADUCIBLE */}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // En desktop, mostrar toggle normal
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="flex justify-center mb-8"
    >
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-1 border border-slate-700/50">
        <button
          onClick={() => onViewModeChange('circular')}
          className={`px-6 py-3 rounded-xl text-sm font-medium font-serif transition-all duration-300 ${
            viewMode === 'circular' 
              ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg' 
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          {t('gallery.viewMode.circularView')} {/* ← TRADUCIBLE */}
        </button>
        <button
          onClick={() => onViewModeChange('grid')}
          className={`px-6 py-3 rounded-xl text-sm font-serif transition-all duration-300 ${
            viewMode === 'grid' 
              ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg' 
              : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          {t('gallery.viewMode.gridView')} {/* ← TRADUCIBLE */}
        </button>
      </div>
    </motion.div>
  );
}