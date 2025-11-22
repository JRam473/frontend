// components/GridGallery.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import type { GalleryImage } from './hooks/useGallery';
interface GridGalleryProps {
  images: GalleryImage[];
  onImageClick: (src: string) => void;
  isMobile: boolean; // ← AGREGAR ESTA PROP
  shouldRemoveAnimations?: boolean;
}
export function GridGallery({ images, onImageClick, isMobile }: GridGalleryProps) {
  return (
    <motion.div
      layout
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <AnimatePresence>
        {images.map((image, index) => (
          <motion.div
            key={`grid-${image.src}-${index}`}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: isMobile ? 0.3 : 0.5, 
              delay: isMobile ? index * 0.05 : index * 0.1 
            }}
            className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg ${
            !isMobile ? 'hover:shadow-2xl transform transition-all duration-500' : ''
          }`}
            onClick={() => onImageClick(image.src)}
          >
            <ImageWithFallback
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay minimalista */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-sm font-semibold mb-1">{image.title}</h3>
                <div className="text-xs opacity-80 bg-black/50 px-2 py-1 rounded-full inline-block">
                  {image.category}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}