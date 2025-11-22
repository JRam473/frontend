import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
interface ExpandedImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: string;
  alt: string;
  hasGallery: boolean;
  onPrevImage: () => void;
  onNextImage: () => void;
  onGoToImage: (index: number) => void;
  currentImageIndex: number;
  allImages: string[];
  shouldRemoveAnimations?: boolean;
}
export function ExpandedImageModal({
  isOpen,
  onClose,
  currentImage,
  alt,
  hasGallery,
  onPrevImage,
  onNextImage,
  onGoToImage,
  currentImageIndex,
  allImages
}: ExpandedImageModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 text-white hover:bg-white/30 transition-colors duration-200 z-10"
            >
              <X className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>
            {/* Contenedor centrado para la imagen */}
            <div className="w-full h-full flex items-center justify-center p-4">
              <img
                src={currentImage}
                alt={alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
            {hasGallery && (
              <>
                <button
                  onClick={onPrevImage}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-4 text-white hover:bg-white/30 transition-colors duration-200"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                </button>
                <button
                  onClick={onNextImage}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-4 text-white hover:bg-white/30 transition-colors duration-200 rotate-180"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-6 sm:w-6" />
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}