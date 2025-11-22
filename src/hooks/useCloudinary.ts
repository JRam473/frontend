// hooks/useCloudinary.ts
import { useCallback } from 'react';

export const useCloudinary = () => {
  
  const generateUrl = useCallback((
    publicId: string,
    options: {
      width?: number;
      quality?: 'auto' | number;
      format?: 'auto' | 'webp' | 'jpg';
      type?: 'image' | 'video';
    } = {}
  ) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    
    if (!cloudName) {
      console.error('Cloudinary cloud name no está configurado');
      return '';
    }

    const { width, quality = 'auto', format = 'auto', type = 'image' } = options;
    
    const transformations = [
      format !== 'auto' && `f_${format}`,
      quality !== 'auto' && `q_${quality}`,
      width && `w_${width}`,
      type === 'video' && 'f_auto,q_auto'
    ].filter(Boolean).join(',');

    const transformationString = transformations ? `${transformations}/` : '';

    return `https://res.cloudinary.com/${cloudName}/${type}/upload/${transformationString}${publicId}`;
  }, []);

  return { generateUrl };
};