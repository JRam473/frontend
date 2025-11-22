// LazyImage.tsx - SOLUCIÓN COMPLETA
import { useState, useEffect } from 'react';
import type { LazyImageProps } from './types';
import { useTranslation } from '../../contexts/TranslationContext';

export const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  onLoad 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null); // ← INICIAL CON null
  const [hasError, setHasError] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // VALIDACIÓN EXTREMADAMENTE ROBUSTA
    if (!src || 
        src.trim() === '' || 
        src === 'undefined' || 
        src === 'null' ||
        !src.startsWith('http')) {
      console.warn(`Invalid image src detected: "${src}"`);
      setHasError(true);
      setImageLoaded(true);
      return;
    }

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
      onLoad?.();
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setHasError(true);
      setImageLoaded(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad]);

  if (hasError) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center rounded-2xl`}>
        <div className="text-gray-400 text-center p-4">
          <div className="w-8 h-8 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs">⚠️</span>
          </div>
          <span className="text-sm">{t('crafts.imageNotAvailable')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center rounded-2xl">
          <div className="text-gray-400">{t('crafts.loadingCraft')}</div>
        </div>
      )}
      {imageSrc && ( // ← SOLO RENDERIZAR SI HAY imageSrc VÁLIDO
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 rounded-2xl ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          loading="lazy"
        />
      )}
    </div>
  );
};