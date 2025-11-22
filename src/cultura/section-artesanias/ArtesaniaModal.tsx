// ArtesaniaModal.tsx - VERSIÓN COMPLETA CORREGIDA
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { ArtisanCraft } from './types';
import { LazyImage } from './LazyImage';
import { categoryColors, useCategoryNames } from './types';
import { ArrowLeft, MapPin, User, Clock, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

interface ArtesaniaModalProps {
  craft: ArtisanCraft;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: number) => void;
}
export const ArtesaniaModal: React.FC<ArtesaniaModalProps> = ({ 
  craft, 
  isOpen, 
  onClose 
}) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const { t } = useTranslation();
  
  const handleImageClick = () => {
    setIsImageExpanded(true);
  };

  const handleCloseExpandedImage = () => {
    setIsImageExpanded(false);
  };

  const categoryNames = useCategoryNames();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-3xl shadow-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden mx-auto"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
          >
            {/* Botón de cierre en esquina superior derecha */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 z-30 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
              aria-label={t('crafts.modal.close')}
            >
              <X className="w-5 h-5 text-gray-700" />
            </motion.button>

            <div className="flex flex-col lg:flex-row h-full">
              {/* Columna de la Imagen */}
              <div className="lg:w-1/2 h-64 lg:h-full relative">
                <div 
                  className="w-full h-full cursor-zoom-in relative"
                  onClick={handleImageClick}
                >
                  <LazyImage
                    src={craft.image}
                    alt={craft.name}
                    className="w-full h-full object-cover rounded-none"
                  />
                  
                  {/* Overlay con indicador de zoom */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg flex items-center gap-2"
                    >
                      <ZoomIn className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-semibold text-gray-700">
                        {t('crafts.modal.clickToZoom')}
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Columna de Información */}
              <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col overflow-y-auto max-h-[80vh] relative">
                <div className="flex-1 overflow-y-auto pr-2">
                  {/* Header con categoría */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold font-serif border ${categoryColors[craft.category]}`}>
                      {categoryNames[craft.category]}
                    </span>
                  </div>

                  <h3 id="modal-title" className="text-3xl lg:text-4xl font-extrabold font-serif text-gray-900 mb-4">
                    {craft.name}
                  </h3>
                  
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {craft.description}
                  </p>

                  {/* Historia del Artesano */}
                  <div className="bg-amber-50 rounded-2xl p-6 mb-6">
                    <h4 className="font-bold font-serif text-amber-800 text-lg mb-3">
                      {t('crafts.modal.theStoryBehind')}
                    </h4>
                    <p className="text-amber-900 italic leading-relaxed">
                      "{craft.story}"
                    </p>
                  </div>

                  {/* Información del Artesano */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-bold font-serif text-gray-900 mb-3 flex items-center gap-2">
                        <User className="w-5 h-5 text-amber-600" />
                        {t('crafts.modal.theArtisan')}
                      </h4>
                      <p className="text-gray-800 font-semibold font-serif">{craft.artisan.name}</p>
                      <p className="text-gray-600 text-sm">{craft.artisan.experience}</p>
                      <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" />
                        {craft.artisan.location}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold font-serif text-gray-900 mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-amber-600" />
                        {t('crafts.modal.details')}
                      </h4>
                      <p className="text-gray-800">
                        <strong>{t('crafts.modal.productionTime')}</strong> {craft.timeRequired}
                      </p>
                      <p className="text-gray-800">
                        <strong>{t('crafts.modal.price')}</strong> {craft.priceRange}
                      </p>
                    </div>
                  </div>

                  {/* Materiales y Técnicas - CORREGIDO */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold font-serif text-gray-900 mb-2">
                        {t('crafts.modal.materialsUsed')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {craft.materials.map((material, index) => (
                          <span 
                            key={`material-${craft.id}-${index}`}
                            className="bg-white border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-sm"
                          >
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold font-serif text-gray-900 mb-2">
                        {t('crafts.modal.ancestralTechniques')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {craft.techniques.map((technique, index) => (
                          <span 
                            key={`technique-${craft.id}-${index}`}
                            className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                          >
                            {technique}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón de Cierre */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex-shrink-0">
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold font-serif py-3 rounded-full shadow-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    {t('crafts.modal.viewMoreCrafts')}
                  </motion.button>

                  <div className="mt-3 text-center text-sm text-gray-500">
                    {t('crafts.modal.keyboardShortcuts')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Modal de imagen expandida */}
      <AnimatePresence>
        {isImageExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={handleCloseExpandedImage}
          >
            {/* Botón de cerrar imagen expandida */}
            <motion.button
              onClick={handleCloseExpandedImage}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 z-70 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20 hover:border-white/40 transition-all duration-200"
              aria-label={t('crafts.modal.close')}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Botón de zoom out */}
            <motion.button
              onClick={handleCloseExpandedImage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-70 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg border border-white/30 hover:bg-white/30 transition-all duration-200"
            >
              <ZoomOut className="w-5 h-5" />
              <span className="font-semibold">
                {t('crafts.modal.closeZoom')}
              </span>
            </motion.button>

            {/* Contenedor de la imagen expandida */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={craft.image}
                alt={`Vista ampliada de ${craft.name}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              />
              
              {/* Información de la imagen en la parte inferior */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-4 text-white"
              >
                <h3 className="text-xl font-bold font-serif mb-1">{craft.name}</h3>
                <p className="text-white/80 text-sm">
                  {t('crafts.modal.by')} {craft.artisan.name}
                </p>
                <p className="text-white/60 text-xs mt-1">{craft.description}</p>
              </motion.div>
            </motion.div>

            {/* Indicador de navegación por teclado */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-6 left-6 z-70 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white/80 text-sm"
            >
              {t('crafts.modal.zoomInstructions')}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};