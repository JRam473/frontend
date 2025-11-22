// components/LazyImage.tsx
import { useState, useEffect } from 'react';
import { Loader, Utensils } from 'lucide-react';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  onLoad, 
  onError 
}: LazyImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const { t } = useTranslation(); // ← AGREGAR HOOK

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
      onLoad?.();
    };
    
    img.onerror = () => {
      setImageError(true);
      onError?.();
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, onError]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader className="w-6 h-6 text-gray-400 animate-spin" />
            <span className="text-gray-500 text-sm">
              {t('platillos.loading')} {/* ← TRADUCIBLE */}
            </span>
          </div>
        </div>
      )}
      
      {imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
          <div className="text-center text-amber-600">
            <Utensils className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">
              {t('platillos.imageNotAvailable')} {/* ← TRADUCIBLE */}
            </p>
          </div>
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-500 ${
          imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        } ${imageError ? 'hidden' : ''} ${className}`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}