// components/ImageModal.tsx
import { Dialog, DialogContent } from '../../components/ui/dialog';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { 
  X, ChevronLeft, ChevronRight, 
  ZoomIn, ZoomOut, RotateCw,
  MapPin, Calendar, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryImage } from './hooks/useGallery';
import { useState } from 'react';
import { useTranslation } from '../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image?: GalleryImage;
  currentIndex: number;
  totalImages: number;
  zoomLevel: number;
  onNext: () => void;
  onPrev: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  formatDate: (dateString: string) => string; // ← AGREGAR ESTA PROPIEDAD
  shouldRemoveAnimations?: boolean;
}

export function ImageModal({
  isOpen,
  onClose,
  image,
  currentIndex,
  totalImages,
  zoomLevel,
  onNext,
  onPrev,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  formatDate // ← AGREGAR ESTE PARÁMETRO
}: ImageModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t } = useTranslation(); // ← AGREGAR HOOK

  // Función para obtener el nombre traducido de la categoría
  const getTranslatedCategory = (category: string) => {
    switch (category) {
      case 'paisajes': return t('gallery.landscapes');
      case 'naturaleza': return t('gallery.nature');
      case 'cultura': return t('gallery.culture');
      case 'comunidad': return t('gallery.community');
      case 'tradiciones': return t('gallery.traditions');
      default: return category;
    }
  };

  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 overflow-hidden bg-slate-900/5 backdrop-blur-sm border-0">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full flex flex-col lg:flex-row"
            >
              {/* Panel de imagen */}
              <div className="flex-1 relative flex items-center justify-center p-3 sm:p-4 min-h-[45vh] lg:min-h-0">
                {/* Controles superiores */}
                <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-center">
                  <button
                    onClick={onClose}
                    className="bg-slate-800/80 text-white p-3 rounded-full hover:bg-slate-700/80 transition-colors duration-200 backdrop-blur-sm"
                    aria-label={t('gallery.modal.close')} // ← TRADUCIBLE
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={onZoomOut}
                      disabled={zoomLevel <= 1}
                      className="bg-slate-800/80 text-white p-3 rounded-full hover:bg-slate-700/80 transition-colors duration-200 backdrop-blur-sm disabled:opacity-50"
                      aria-label={t('gallery.modal.zoomOut')} // ← TRADUCIBLE
                    >
                      <ZoomOut className="h-5 w-5" />
                    </button>
                    <button
                      onClick={onResetZoom}
                      className="bg-slate-800/80 text-white p-3 rounded-full hover:bg-slate-700/80 transition-colors duration-200 backdrop-blur-sm"
                      aria-label={t('gallery.modal.resetZoom')} // ← TRADUCIBLE
                    >
                      <RotateCw className="h-5 w-5" />
                    </button>
                    <button
                      onClick={onZoomIn}
                      disabled={zoomLevel >= 3}
                      className="bg-slate-800/80 text-white p-3 rounded-full hover:bg-slate-700/80 transition-colors duration-200 backdrop-blur-sm disabled:opacity-50"
                      aria-label={t('gallery.modal.zoomIn')} // ← TRADUCIBLE
                    >
                      <ZoomIn className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Navegación entre imágenes */}
                {totalImages > 1 && (
                  <>
                    <button
                      onClick={onPrev}
                      className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 text-white p-3 lg:p-4 rounded-full hover:bg-slate-700/80 transition-colors duration-200 backdrop-blur-sm z-20"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    
                    <button
                      onClick={onNext}
                      className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 text-white p-3 lg:p-4 rounded-full hover:bg-slate-700/80 transition-colors duration-200 backdrop-blur-sm z-20"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Imagen con zoom */}
                <motion.div
                  className={`relative overflow-hidden rounded-lg ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-500`}
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="max-w-full max-h-[40vh] lg:max-h-[70vh] object-contain"
                    onLoad={() => setImageLoaded(true)}
                  />
                </motion.div>

                {/* Indicador de imagen */}
                {totalImages > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800/80 text-white px-4 py-2 rounded-full backdrop-blur-sm text-sm">
                    {currentIndex + 1} / {totalImages}
                  </div>
                )}
              </div>

              {/* Panel de información */}
              <motion.div
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: 300 }}
                className="w-full lg:w-96 bg-slate-800/25 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto max-h-[45vh] lg:max-h-none border-t lg:border-t-0 lg:border-l border-slate-700/50"
              >
                <div className="space-y-4 sm:space-y-6 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-3 font-serif">{image.title}</h2>
                    <p className="text-slate-300 leading-relaxed">{image.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span>{image.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <Calendar className="h-4 w-4 text-emerald-400" />
                      <span>{formatDate(image.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <Users className="h-4 w-4 text-violet-400" />
                      <span>{t('gallery.modal.photographer')} {image.photographer}</span> {/* ← TRADUCIBLE */}
                    </div>
                  </div>

                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
                    <span className="text-slate-300 text-sm font-medium">
                      {t('gallery.modal.category')} <span className="text-blue-400 capitalize">
                        {getTranslatedCategory(image.category)} {/* ← TRADUCIBLE */}
                      </span>
                    </span>
                  </div>

                  {/* Información técnica */}
                  <div className="pt-4 border-t border-slate-700/50">
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">
                      {t('gallery.modal.technicalInfo')} {/* ← TRADUCIBLE */}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                      <div>
                        {t('gallery.modal.zoom')} {(zoomLevel * 100).toFixed(0)}% {/* ← TRADUCIBLE */}
                      </div>
                      <div>
                        {t('gallery.modal.imageOf')} {currentIndex + 1} {t('gallery.modal.imageOf')} {totalImages} {/* ← TRADUCIBLE */}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}