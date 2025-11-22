// components/GalleryVideo.tsx - VERSIÓN MEJORADA
import { motion } from 'framer-motion';
import { Play, Youtube } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface GalleryVideoProps {
  isGridMode?: boolean;
  onVideoClick: () => void;
  isVideoHovered: boolean;
  onVideoHover: (hovered: boolean) => void;
  shouldRemoveAnimations?: boolean;
}

export function GalleryVideo({ 
  isGridMode = false,
  onVideoClick,
  isVideoHovered,
  onVideoHover
}: GalleryVideoProps) {
  const { t } = useTranslation(); // ← AGREGAR HOOK
  
  // ✅ IDs de YouTube para probar (usa solo uno)
  const youtubeIds = [
    "4r2isHLCNFo", // Primer video de YouTube // Video 4K de paisajes
  ];
  const [currentYoutubeId] = useState(youtubeIds[0]); // Usa el primero
  const [thumbnailError, setThumbnailError] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${currentYoutubeId}/maxresdefault.jpg`;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className={`relative ${
        isGridMode 
          ? 'w-full h-full min-h-[300px] md:min-h-[400px]' // ✅ Altura mínima en grid
          : 'w-48 h-48 md:w-56 md:h-56' // ✅ Tamaño fijo en circular
      } rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-gradient-to-br from-blue-500 to-emerald-500 cursor-pointer group`}
      onClick={onVideoClick}
      onMouseEnter={() => onVideoHover(true)}
      onMouseLeave={() => onVideoHover(false)}
    >
      {/* Contenedor de thumbnail que ocupa todo el espacio */}
      <div className="w-full h-full flex items-center justify-center">
        {!thumbnailError ? (
          <img
            src={thumbnailUrl}
            alt={t('gallery.video.altText')} // ← TRADUCIBLE
            className="w-full h-full object-cover" // ✅ object-cover para llenar el espacio
            onError={() => setThumbnailError(true)}
          />
        ) : (
          // Fallback mejorado
          <div className="w-full h-full flex items-center justify-center flex-col p-6 text-white text-center bg-gradient-to-br from-blue-500 to-emerald-500">
            <Youtube className="h-12 w-12 mb-3 opacity-90" />
            <h3 className="font-semibold text-lg mb-2">
              {t('gallery.video.ourCommunity')} {/* ← TRADUCIBLE */}
            </h3>
            <p className="text-sm opacity-90 mb-4">
              {t('gallery.video.clickToWatch')} {/* ← TRADUCIBLE */}
            </p>
            <div className="bg-white/20 px-3 py-1 rounded-full text-xs">
              ▶️ {t('gallery.video.play')} {/* ← TRADUCIBLE */}
            </div>
          </div>
        )}
      </div>

      {/* Overlay de reproducción - MEJORADO */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 transition-all duration-300 ${
        isVideoHovered ? 'opacity-100' : 'opacity-70'
      } group-hover:opacity-100 flex flex-col justify-between`}>
        
        {/* Badge de YouTube - POSICIÓN MEJORADA */}
        <div className="flex justify-between items-start p-4">
          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 backdrop-blur-sm">
            <Youtube className="h-3 w-3" />
            {t('gallery.video.youtube')} {/* ← TRADUCIBLE */}
          </div>
        </div>

        {/* Información del video - MEJORADA */}
        <div className="p-4 text-white transform transition-transform duration-300">
          <h3 className={`
            font-semibold mb-2 
            ${isGridMode 
              ? 'text-lg md:text-xl text-center md:text-left' // ✅ Grande en grid
              : 'text-sm text-center' // ✅ Pequeño en circular
            }
          `}>
            {t('gallery.video.ourCommunity')} {/* ← TRADUCIBLE */}
          </h3>
          <p className={`
            opacity-90 mb-4 
            ${isGridMode 
              ? 'text-sm md:text-base text-center md:text-left' // ✅ Visible en grid
              : 'text-xs text-center hidden' // ✅ Oculto en circular (o muy pequeño)
            }
          `}>
            {t('gallery.video.discoverEssence')} {/* ← TRADUCIBLE */}
          </p>
          
          {/* Botón de reproducción - TAMAÑO CONDICIONAL */}
          <div className="flex justify-center md:justify-start">
            <motion.div
              animate={{ 
                scale: isVideoHovered ? [1, 1.1, 1] : 1 
              }}
              transition={{ 
                duration: 1.5, 
                repeat: isVideoHovered ? Infinity : 0 
              }}
              className={`
                bg-red-600 text-white rounded-full shadow-2xl border-2 border-white/30 
                flex items-center gap-2 hover:bg-red-700 transition-colors duration-200
                ${isGridMode 
                  ? 'px-6 py-3' // ✅ Tamaño grande para grid
                  : 'px-3 py-1.5' // ✅ Tamaño pequeño para circular
                }
              `}
            >
              <Play className={`
                fill-current 
                ${isGridMode ? 'h-5 w-5' : 'h-3 w-3'} // ✅ Icono más pequeño en circular
              `} />
              <span className={`
                font-semibold 
                ${isGridMode ? 'text-sm' : 'text-xs'} // ✅ Texto más pequeño en circular
              `}>
                {isGridMode 
                  ? t('gallery.video.playVideo') // ← TRADUCIBLE
                  : t('gallery.video.play') // ← TRADUCIBLE
                }
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Efecto de hover sutil */}
      <div className={`absolute inset-0 border-3 transition-all duration-300 rounded-2xl ${
        isVideoHovered ? 'border-red-500/40' : 'border-transparent'
      } group-hover:border-red-500/40`} />
    </motion.div>
  );
}