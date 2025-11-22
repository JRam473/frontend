// hooks/useGallery.ts
import { useState, useRef, useEffect, type RefObject } from 'react';
import { useTranslation } from '../../../contexts/TranslationContext';
export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  date: string;
  location: string;
  photographer: string; 
}
export function useGallery(images: GalleryImage[]) {
  const { language } = useTranslation(); // ← AGREGAR HOOK
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [viewMode, setViewMode] = useState<'circular' | 'grid'>('circular');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  // ✅ Nuevos estados para YouTube
  const [isYouTubeModalOpen, setIsYouTubeModalOpen] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const categories = ['todas', ...new Set(images.map(img => img.category))];
  const filteredImages = images.filter(image => 
    selectedCategory === 'todas' || image.category === selectedCategory
  );

   // Función para formatear fecha según idioma - NUEVA
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    switch (language) {
      case 'es':
        return date.toLocaleDateString('es-ES', options);
      case 'en':
        return date.toLocaleDateString('en-US', options);
      case 'nah':
        // Para náhuatl, usar formato simple o español como fallback
        return date.toLocaleDateString('es-ES', options);
      default:
        return date.toLocaleDateString('es-ES', options);
    }
  };
  // Efecto para el video
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);
  const openImage = (src: string) => {
    const index = filteredImages.findIndex(img => img.src === src);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setSelectedImage(src);
      setZoomLevel(1);
    }
  };
  const closeImage = () => {
    setSelectedImage(null);
  };
  const nextImage = () => {
    if (filteredImages.length === 0) return;
    
    const nextIndex = currentImageIndex === filteredImages.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex].src);
    setZoomLevel(1);
  };
  const prevImage = () => {
    if (filteredImages.length === 0) return;
    
    const prevIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex].src);
    setZoomLevel(1);
  };
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 1));
  const handleResetZoom = () => setZoomLevel(1);
  const currentImage = selectedImage ? filteredImages[currentImageIndex] : undefined;
  // Calcular posiciones para el layout circular
  const getCircularPosition = (index: number, total: number, isMobile: boolean = false) => {
  // Radio más grande y adaptable
  const baseRadius = isMobile ? 120 : 180;
  const radius = baseRadius + (total * 3); // Más espacio entre imágenes
  // Ángulo con offset para empezar desde arriba
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  // Distribución más uniforme
  const scale = 0.9 + Math.random() * 0.3; // Menos variación de tamaño
  const rotate = (Math.random() - 0.5) * 8; // Menos rotación
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    switch (language) {
      case 'es':
        return date.toLocaleDateString('es-ES', options);
      case 'en':
        return date.toLocaleDateString('en-US', options);
      case 'nah':
        // Para náhuatl, usar formato simple o español como fallback
        return date.toLocaleDateString('es-ES', options);
      default:
        return date.toLocaleDateString('es-ES', options);
    }
  };
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    scale,
    formatDate,
    rotate
  };
};
// Agregar detección de mobile al hook
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth < 768);
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
}, []);
// En useGallery.ts - Agregar este useEffect:
useEffect(() => {
  if (isMobile && viewMode === 'circular') {
    setViewMode('grid');
  }
}, [isMobile, viewMode, setViewMode]);
  return {
    formatDate,
    // ✅ Agregar nuevos estados y funciones
    isYouTubeModalOpen,
    setIsYouTubeModalOpen,
    isVideoHovered,
    setIsVideoHovered,
    selectedImage,
    currentImageIndex,
    selectedCategory,
    viewMode,
    zoomLevel,
    isPlaying,
    isMuted,
    videoRef: videoRef as RefObject<HTMLVideoElement>, // Fix para el tipo
    categories,
    filteredImages,
    currentImage,
    setSelectedCategory,
    setViewMode,
    setIsPlaying,
    setIsMuted,
    openImage,
    closeImage,
    nextImage,
    prevImage,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    isMobile,
    getCircularPosition: (index: number, total: number) => getCircularPosition(index, total, isMobile)
  };
}