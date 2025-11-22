// components/DishExpandedModal.tsx
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, ChefHat, Clock, Utensils, X, Maximize2, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';
import { LazyImage } from './LazyImage';
import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface Dish {
  name: string;
  chef: string;
  greeting: string;
  address: string;
  owner: string;
  suggestions: string[];
  hours: string;
  image: string;
  lat: number;
  lng: number;
  phone?: string;
}

interface DishExpandedModalProps {
  dish: Dish;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalDishes: number;
}

export function DishExpandedModal({
  dish,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  currentIndex,
  totalDishes
}: DishExpandedModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const { t } = useTranslation(); // ← AGREGAR HOOK

  const generateMapsUrl = (lat: number, lng: number): string => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  };

  // Detectar si es móvil
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Manejo de teclado para pantalla completa
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isFullscreen) return;

    switch (event.key) {
      case 'Escape':
        handleExitFullscreen();
        break;
      case 'ArrowRight':
        onNext();
        break;
      case 'ArrowLeft':
        onPrevious();
        break;
    }
  }, [isFullscreen, onNext, onPrevious]);

  useEffect(() => {
    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, handleKeyDown]);

  const handleFullscreen = () => {
    setIsFullscreen(true);
  };

  const handleExitFullscreen = () => {
    setIsFullscreen(false);
    handleResetTransform();
  };

  const handleZoomIn = () => {
    setImageScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setImageScale(prev => Math.max(prev - 0.5, 1));
  };

  const handleResetTransform = () => {
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
  };

  // Manejo de touch para móviles
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isFullscreen || imageScale <= 1) return;
    
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - imagePosition.x,
        y: e.touches[0].clientY - imagePosition.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isFullscreen || imageScale <= 1) return;
    
    if (e.touches.length === 1) {
      setImagePosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Manejo de wheel para zoom en desktop
  const handleWheel = (e: React.WheelEvent) => {
    if (!isFullscreen || isMobile) return;
    
    e.preventDefault();
    const delta = -e.deltaY * 0.005;
    setImageScale(prev => Math.min(Math.max(1, prev + delta), 3));
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      onClose();
    }
  };

  if (!isOpen) return null;

  // Vista de pantalla completa simplificada
  if (isFullscreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50"
        role="dialog"
        aria-modal="true"
        aria-label={`${t('platillos.modal.fullscreenView')} ${dish.name}`}
      >
        {/* Controles superiores simplificados */}
        <div className={`absolute top-4 z-10 w-full px-4 ${isMobile ? 'flex justify-between' : 'flex justify-end'}`}>
          
          {/* Solo mostrar información en móvil */}
          {isMobile && (
            <div className="bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm max-w-[60%]">
              <h3 className="font-bold text-sm truncate">{dish.name}</h3>
              <p className="text-xs text-gray-300 truncate">
                {t('platillos.modal.by')} {dish.chef} {/* ← TRADUCIBLE */}
              </p>
            </div>
          )}

          {/* Controles de zoom solo cuando la imagen está ampliada */}
          {imageScale > 1 && (
            <div className="flex gap-2">
              <button
                onClick={handleZoomOut}
                className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={t('platillos.modal.zoomOut')} // ← TRADUCIBLE
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetTransform}
                className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={t('platillos.modal.resetZoom')} // ← TRADUCIBLE
              >
                <span className="text-xs font-bold">100%</span>
              </button>
              <button
                onClick={handleZoomIn}
                className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={t('platillos.modal.zoomIn')} // ← TRADUCIBLE
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Controles de navegación y cierre */}
          <div className="flex gap-2">
            {!isMobile && (
              <>
                <button
                  onClick={onPrevious}
                  className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label={t('platillos.modal.previousDish')} // ← TRADUCIBLE
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={onNext}
                  className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label={t('platillos.modal.nextDish')} // ← TRADUCIBLE
                >
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </>
            )}
            <button
              onClick={handleExitFullscreen}
              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={t('platillos.modal.exitFullscreen')} // ← TRADUCIBLE
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Indicador de navegación en desktop */}
        {!isMobile && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg backdrop-blur-sm">
            <span className="text-sm font-medium">
              {currentIndex + 1} / {totalDishes}
            </span>
          </div>
        )}

        {/* Imagen con transformaciones */}
        <motion.div
          className="w-full h-full flex items-center justify-center touch-none"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: imageScale > 1 ? 'grab' : 'default' }}
        >
          <motion.img
            src={dish.image}
            alt={dish.name}
            className="max-w-full max-h-full object-contain select-none"
            style={{
              scale: imageScale,
              x: imagePosition.x,
              y: imagePosition.y,
            }}
            draggable={false}
          />
        </motion.div>

        {/* Controles de navegación para móvil en la parte inferior */}
        {isMobile && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <button
              onClick={onPrevious}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={t('platillos.modal.previousDish')} // ← TRADUCIBLE
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="text-sm font-medium">
                {currentIndex + 1} / {totalDishes}
              </span>
            </div>
            <button
              onClick={onNext}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={t('platillos.modal.nextDish')} // ← TRADUCIBLE
            >
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
          </div>
        )}
      </motion.div>
    );
  }

  // Vista normal del modal
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-3xl shadow-3xl w-full max-w-6xl max-h-[90vh] lg:max-h-[90vh] overflow-hidden mx-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar (X) en esquina superior derecha */}
        <button
          onClick={onClose}
          onKeyDown={handleButtonKeyDown}
          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          aria-label={t('platillos.modal.closeModal')} // ← TRADUCIBLE
        >
          <X className="w-5 h-5" />
        </button>

        {/* Botón de pantalla completa */}
        <button
          onClick={handleFullscreen}
          className="absolute top-4 right-16 z-10 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          aria-label={t('platillos.modal.fullscreen')} // ← TRADUCIBLE
        >
          <Maximize2 className="w-5 h-5" />
        </button>

        <div className="flex flex-col lg:flex-row h-full">
          {/* Columna de la Imagen */}
          <div className="lg:w-1/2 h-64 lg:h-full relative">
            <LazyImage
              src={dish.image}
              alt={dish.name}
              className="w-full h-full"
            />
          </div>

          {/* Columna de Información */}
          <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col overflow-y-auto max-h-[60vh] lg:max-h-none pb-8">
            <div className="flex-1 overflow-y-auto">
              <h3 id="modal-title" className="text-3xl lg:text-4xl font-extrabold font-serif text-gray-900 mb-2">
                {dish.name}
              </h3>
              <p className="text-lg font-medium font-serif text-amber-600 mb-4 flex items-center gap-2">
                <ChefHat className="w-5 h-5" aria-hidden="true" /> 
                {dish.chef}
              </p>
              
              <p className="text-gray-700 italic border-l-4 border-amber-500 pl-4 py-1 mb-6">
                {dish.greeting}
              </p>

              <div className="grid gap-4 text-gray-800">
                <div>
                  <h4 className="font-bold font-serif text-orange-600 flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4" aria-hidden="true" /> 
                    {t('platillos.modal.location')} {/* ← TRADUCIBLE */}
                  </h4>
                  <p><strong>{t('platillos.modal.address')}</strong> {dish.address}</p> {/* ← TRADUCIBLE */}
                  <p><strong>{t('platillos.modal.owner')}</strong> {dish.owner}</p> {/* ← TRADUCIBLE */}
                  <p><strong>{t('platillos.modal.phone')}</strong> {dish.phone || t('platillos.modal.phoneNotAvailable')}</p> {/* ← TRADUCIBLE */}
                  
                  <motion.a
                    href={generateMapsUrl(dish.lat, dish.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-3 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold font-serif py-2 px-4 rounded-full transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    aria-label={`${t('platillos.modal.viewOnMaps')} ${dish.name}`} // ← TRADUCIBLE
                  >
                    <MapPin className="w-5 h-5" /> 
                    {t('platillos.modal.viewOnMaps')} {/* ← TRADUCIBLE */}
                  </motion.a>
                </div>

                <div>
                  <h4 className="font-bold font-serif text-orange-600 flex items-center gap-2 mb-1">
                    <Utensils className="w-4 h-4" aria-hidden="true" /> 
                    {t('platillos.modal.suggestions')} {/* ← TRADUCIBLE */}
                  </h4>
                  <div role="list" aria-label={t('platillos.modal.suggestions')} className="flex flex-wrap gap-2">
                    {dish.suggestions.map((suggestion, index) => (
                      <span 
                        key={index} 
                        className="bg-orange-100 text-orange-800 text-xs font-semibold font-serif px-3 py-1 rounded-full"
                        role="listitem"
                      >
                        {suggestion}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Horario y Botón de Cierre */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-bold font-serif text-orange-600 flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4" aria-hidden="true" /> 
                {t('platillos.modal.openingHours')} {/* ← TRADUCIBLE */}
              </h4>
              <p className="text-2xl lg:text-3xl font-extrabold font-serif text-green-700 mb-4">{dish.hours}</p>

              <motion.button
                onClick={onClose}
                onKeyDown={handleButtonKeyDown}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold font-serif py-3 rounded-full shadow-lg flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                aria-label={t('platillos.modal.backToGallery')} // ← TRADUCIBLE
              >
                <ArrowLeft className="w-5 h-5" aria-hidden="true" /> 
                {t('platillos.modal.backToGallery')} {/* ← TRADUCIBLE */}
              </motion.button>

              <div className="mt-3 text-center text-sm text-gray-500" aria-hidden="true">
                {t('platillos.modal.keyboardShortcuts')} {/* ← TRADUCIBLE */}
              </div>
            </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}