// components/CircularGallery.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import type { GalleryImage } from "./hooks/useGallery";
interface CircularGalleryProps {
  images: GalleryImage[];
  getCircularPosition: (index: number, total: number) => any;
  onImageClick: (src: string) => void;
  isMobile: boolean;
  shouldRemoveAnimations?: boolean;
}
export function CircularGallery({ images, getCircularPosition, onImageClick, isMobile }: CircularGalleryProps) {
  // Función para calcular el z-index dinámicamente
  const getZIndex = (index: number, total: number) => {
    return total - index;
  };
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <AnimatePresence>
        {images.map((image, index) => {
          const position = getCircularPosition(index, images.length);
          const zIndex = getZIndex(index, images.length);
          return (
            <motion.div
              key={`${image.src}-${index}`}
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0, 
                opacity: 0,
                rotate: 0 
              }}
              animate={{ 
                x: position.x, 
                y: position.y, 
                scale: position.scale,
                opacity: 1,
                rotate: position.rotate
              }}
              exit={{ 
                x: 0, 
                y: 0, 
                scale: 0, 
                opacity: 0,
                rotate: 0 
              }}
              transition={{ 
                duration: isMobile ? 0.4 : 0.8, 
                delay: isMobile ? index * 0.05 : index * 0.1,
                type: isMobile ? "tween" : "spring",
                stiffness: isMobile ? undefined : 50,
                damping: isMobile ? undefined : 15
              }}
              whileHover={!isMobile ? { 
                scale: position.scale * 1.15,
                rotate: 0,
                zIndex: 1000,
                transition: { 
                  duration: 0.3,
                  type: "spring", 
                  stiffness: 300
                }
              } : undefined}
              className="absolute left-1/2 top-1/2"
              style={{ 
                zIndex,
                marginLeft: `-${images.length > 8 ? '5rem' : '4rem'}`,
                marginTop: `-${images.length > 8 ? '5rem' : '4rem'}`
              }}
            >
              <motion.div
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-2xl border-2 border-white/10 hover:border-white/30 transition-all duration-500 bg-slate-800/50 backdrop-blur-sm"
                style={{
                  width: images.length > 8 ? '10rem' : '12rem',
                  height: images.length > 8 ? '10rem' : '12rem'
                }}
                onClick={() => onImageClick(image.src)}
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay elegante mejorado */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xs font-semibold mb-1 line-clamp-1 text-center">{image.title}</h3>
                    <div className="text-[10px] opacity-90 bg-black/70 px-2 py-1 rounded-full inline-block mx-auto text-center w-fit">
                      {image.category}
                    </div>
                  </div>
                </div>
                {/* Efecto de brillo sutil */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      {/* Líneas guía decorativas (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {/* Círculo guía */}
          <div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-white rounded-full"
            style={{
              width: `${images.length > 8 ? '24rem' : '28rem'}`,
              height: `${images.length > 8 ? '24rem' : '28rem'}`
            }}
          />
          {/* Cruz guía */}
          <div className="absolute left-1/2 top-0 w-0.5 h-full bg-white/30 transform -translate-x-1/2" />
          <div className="absolute left-0 top-1/2 w-full h-0.5 bg-white/30 transform -translate-y-1/2" />
        </div>
      )}
    </div>
  );
}