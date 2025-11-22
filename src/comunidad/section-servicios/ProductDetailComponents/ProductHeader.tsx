import { ArrowLeft, Maximize2, X } from 'lucide-react';
import { ProductShare } from './ProductShare';
import { useTranslation } from '../../../contexts/TranslationContext';
import {  useCallback } from 'react';


interface ProductHeaderProps {
  onClose: () => void;
  onExpandImage: () => void;

  // ESTADOS PASADOS DESDE EL PADRE
  showShareOptions: boolean;
  setShowShareOptions: (show: boolean) => void;
  copiedToClipboard: boolean;
  setCopiedToClipboard: (state: boolean) => void;
  handleShare: () => void;
  shareOnSocialMedia: (platform: string) => void;
  shouldRemoveAnimations?: boolean;
}

export function ProductHeader({
  onClose,
  onExpandImage,
  showShareOptions,
  setShowShareOptions,
  copiedToClipboard,
  setCopiedToClipboard,
  handleShare,
  shareOnSocialMedia
}: ProductHeaderProps) {

  const { t } = useTranslation();

  // Nueva función requerida por ProductShare.tsx
  const resetCopiedState = useCallback(() => {
    setCopiedToClipboard(false);
  }, [setCopiedToClipboard]);

  return (
    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-20 flex justify-between items-center">

      {/* Grupo de botones a la izquierda */}
      <div className="flex gap-1 sm:gap-2 relative">

        {/* Botón de regresar */}
        <button
          onClick={onClose}
          aria-label={t('services.goBack')}
          className="bg-white/80 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
        </button>

        {/* Botón de expandir */}
        <button
          onClick={onExpandImage}
          aria-label={t('services.expandImage')}
          className="bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
        </button>

        {/* Botón de compartir (optimizado) */}
        <ProductShare
          showShareOptions={showShareOptions}
          setShowShareOptions={setShowShareOptions}
          copiedToClipboard={copiedToClipboard}
          handleShare={handleShare}
          shareOnSocialMedia={shareOnSocialMedia}
          resetCopiedState={resetCopiedState}   // ← NUEVO
        />
      </div>

      {/* Botón de cierre */}
      <button
        onClick={onClose}
        aria-label={t('services.close')}
        className="bg-black backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-transform duration-200"
      >
        <X className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
      </button>

    </div>
  );
}
