// components/YouTubeModal.tsx - CORREGIR iframe
import { Dialog, DialogContent } from '../../components/ui/dialog';
import { X, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface YouTubeModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  shouldRemoveAnimations?: boolean;
}

export function YouTubeModal({ isOpen, onClose, videoId }: YouTubeModalProps) {
  const { t } = useTranslation(); // ← AGREGAR HOOK
  const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] p-0 overflow-hidden bg-black border-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full h-full bg-black"
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-black/80 text-white p-3 rounded-full hover:bg-red-600 transition-all duration-200 backdrop-blur-sm border border-white/20"
            aria-label={t('gallery.modal.close')} // ← TRADUCIBLE
          >
            <X className="h-5 w-5" />
          </button>

          {/* Enlace para ver en YouTube */}
          <a
            href={`https://youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 left-4 z-50 bg-black/80 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-200 backdrop-blur-sm border border-white/20 flex items-center gap-2 text-sm"
          >
            <ExternalLink className="h-4 w-4" />
            {t('gallery.youtubeModal.watchOnYouTube')} {/* ← TRADUCIBLE */}
          </a>

          {/* Video de YouTube - SIN ESPACIOS */}
          <div className="w-full h-full flex items-center justify-center bg-black">
            <div className="w-full h-full max-w-4xl max-h-full">
              <iframe
                src={youtubeUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={t('gallery.youtubeModal.videoTitle')}
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}