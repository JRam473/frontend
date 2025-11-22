import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Calendar } from 'lucide-react';
import { type Product } from '../../ServiciosSection';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface ProductGalleryProps {
  product: Product;
  currentImageIndex: number;
  hasGallery: boolean;
  allImages: string[];
  onPrevImage: () => void;
  onNextImage: () => void;
  onGoToImage: (index: number) => void;
  onExpandImage: () => void;
  isMobile: boolean;
  shouldRemoveAnimations?: boolean;
}

export function ProductGallery({
  product,
  currentImageIndex,
  hasGallery,
  allImages,
  onPrevImage,
  onNextImage,
  onGoToImage,
  onExpandImage,
  isMobile
}: ProductGalleryProps) {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${
      isMobile ? 'h-64 sm:h-80 flex-shrink-0' : 'w-1/2 min-h-0'
    }`}>
      {/* Contenedor centrado para la imagen */}
      <div className="w-full h-full flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="flex items-center justify-center w-full h-full"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={allImages[currentImageIndex]}
              alt={product.name}
              className="max-w-full max-h-full object-contain cursor-zoom-in"
              onClick={onExpandImage}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {hasGallery && (
        <>
          <button
            onClick={onPrevImage}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
          </button>
          <button
            onClick={onNextImage}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-all duration-200 rotate-180"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
          </button>
          
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => onGoToImage(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-1 sm:gap-2">
        {product.highlight && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs font-bold font-serif flex items-center gap-1 shadow-lg">
            <Star className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">
              {t('services.featured')} {/* ← TRADUCIBLE */}
            </span>
          </div>
        )}
        {product.seasonal && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs font-bold font-serif flex items-center gap-1 shadow-lg">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">
              {t('services.season')} {/* ← TRADUCIBLE */}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}