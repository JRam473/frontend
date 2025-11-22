import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, CheckCheck } from 'lucide-react';
import { useTranslation } from '../../../contexts/TranslationContext';

interface ProductShareProps {
  showShareOptions: boolean;
  setShowShareOptions: (show: boolean) => void;
  copiedToClipboard: boolean;
  handleShare: () => void;
  shareOnSocialMedia: (platform: string) => void;
  resetCopiedState: () => void; // ← NUEVO
}

export function ProductShare({
  showShareOptions,
  setShowShareOptions,
  copiedToClipboard,
  handleShare,
  shareOnSocialMedia,
  resetCopiedState
}: ProductShareProps) {

  const { t } = useTranslation();

  const toggleMenu = () => {
    // Si el usuario vuelve a abrir el menú, limpiamos la marca de copiado
    if (!showShareOptions && copiedToClipboard) {
      resetCopiedState();
    }
    setShowShareOptions(!showShareOptions);
  };

  const handleCopyOrShare = () => {
    handleShare();
    setShowShareOptions(false); // cerrar después de copiar o usar Web Share API
  };

  const handleSocialShare = (platform: string) => {
    shareOnSocialMedia(platform);
    setShowShareOptions(false); // cerrar después de compartir
  };

  return (
    <div className="relative">
      {/* Botón principal */}
      <button
        onClick={toggleMenu}
        aria-label={t('services.toggleShareOptions')} // ← ACCESIBILIDAD
        className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-transform duration-200"
      >
        {copiedToClipboard ? (
          <CheckCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
        ) : (
          <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
        )}
      </button>

      <AnimatePresence>
        {showShareOptions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 
           bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl 
           border border-gray-200 p-3 min-w-[220px] z-30"
          >
            <div className="space-y-2">

              {/* Compartir nativo o copiar enlace */}
              <button
                onClick={handleCopyOrShare}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 text-left"
              >
                {typeof navigator.share === 'function' ? (
                  <>
                    <Share2 className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium font-serif text-gray-700">
                      {t('services.share')}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium font-serif text-gray-700">
                      {t('services.copyLink')}
                    </span>
                  </>
                )}
              </button>

              <div className="border-t border-gray-200 my-2" />

              {/* Redes sociales */}
              <div className="grid grid-cols-2 gap-2">

                <button
                  onClick={() => handleSocialShare('whatsapp')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-50 transition-colors duration-200"
                >
                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold font-serif">WA</span>
                  </div>
                  <span className="text-xs text-gray-700">
                    {t('services.whatsapp')}
                  </span>
                </button>

                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold font-serif">f</span>
                  </div>
                  <span className="text-xs text-gray-700">
                    {t('services.facebook')}
                  </span>
                </button>

                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="w-6 h-6 bg-blue-400 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold font-serif">X</span>
                  </div>
                  <span className="text-xs text-gray-700">
                    {t('services.twitter')}
                  </span>
                </button>

                <button
                  onClick={() => handleSocialShare('telegram')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold font-serif">TG</span>
                  </div>
                  <span className="text-xs text-gray-700">
                    {t('services.telegram')}
                  </span>
                </button>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
