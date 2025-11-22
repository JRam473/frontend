import { useState } from 'react';
import { type Product } from '../../../ServiciosSection';

export const useProductImages = (product: Product) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const allImages = [product.mainImage, ...(product.galleryImages || [])];
  const hasGallery = allImages.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return {
    currentImageIndex,
    isImageExpanded,
    setIsImageExpanded,
    allImages,
    hasGallery,
    nextImage,
    prevImage,
    goToImage
  };
};