// components/ImageGalleryModal.tsx - VERSIÓN MEJORADA CON ZOOM TÁCTIL
import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCw, Download, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePlaces } from '@/hooks/usePlaces';

interface GalleryImage {
  id: string;
  url_foto: string;
  descripcion: string;
  es_principal?: boolean;
  orden?: number;
}

interface ImageGalleryModalProps {
  placeId: string;
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// Constantes para gestos
const SWIPE_THRESHOLD = 50;
const VERTICAL_SWIPE_THRESHOLD = 100;
const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

export const ImageGalleryModal = ({
  placeId,
  initialIndex = 0,
  isOpen,
  onClose,
  title = 'Galería de imágenes'
}: ImageGalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(true);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Referencias para gestos
  const touchStartRef = useRef({ x: 0, y: 0, time: 0, distance: 0 });
  const touchEndRef = useRef({ x: 0, y: 0, time: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef(0);
  const isGestureActive = useRef(false);
  const initialTouchesRef = useRef<{ x: number; y: number }[]>([]);

  const { getPlaceGallery } = usePlaces();

  const currentImage = galleryImages[currentIndex];
  const hasMultipleImages = galleryImages.length > 1;

  // Cargar galería
  useEffect(() => {
    const loadGallery = async () => {
      if (!isOpen || !placeId) return;
      
      try {
        setLoading(true);
        setError(null);
        const images = await getPlaceGallery(placeId);
        setGalleryImages(images || []);
        
        if (initialIndex >= (images?.length || 0)) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex(initialIndex);
        }
      } catch {
        setError('Error al cargar la galería de imágenes');
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, [isOpen, placeId, getPlaceGallery, initialIndex]);

  // Resetear estado cuando cambia la imagen o se abre/cierra el modal
  useEffect(() => {
    if (isOpen && galleryImages.length > 0) {
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setShowControls(true);
      
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentIndex, galleryImages.length]);

  // Mostrar controles temporalmente cuando cambia la imagen
  useEffect(() => {
    if (galleryImages.length > 0) {
      setShowControls(true);
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, galleryImages.length]);

  const resetTransform = useCallback(() => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Funciones de navegación
  const goToPrevious = useCallback(() => {
    if (!hasMultipleImages) return;
    setCurrentIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    resetTransform();
  }, [hasMultipleImages, resetTransform, galleryImages.length]);

  const goToNext = useCallback(() => {
    if (!hasMultipleImages) return;
    setCurrentIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    resetTransform();
  }, [hasMultipleImages, resetTransform, galleryImages.length]);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.25, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 0.25, MIN_ZOOM);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const handleRotate = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  // 🆕 ZOOM CON DOBLE CLICK
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (zoom > 1) {
      // Si ya está zoom, resetear
      resetTransform();
    } else {
      // Hacer zoom al punto donde se hizo click
      
      setZoom(2.5);
      // Opcional: ajustar posición basada en el click
      // setPosition({ x: (rect.width / 2 - clickX) * 0.5, y: (rect.height / 2 - clickY) * 0.5 });
    }
    
    setShowControls(true);
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [zoom, resetTransform]);

  // 🆕 ZOOM TÁCTIL CON PINCH
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    isGestureActive.current = true;
    
    const touches = Array.from(e.touches);
    initialTouchesRef.current = touches.map(touch => ({
      x: touch.clientX,
      y: touch.clientY
    }));

    if (touches.length === 1) {
      // Gestos de un dedo para navegación/cierre
      const touch = touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
        distance: 0
      };
    } else if (touches.length === 2) {
      // Zoom con dos dedos - prevenir scroll
      e.preventDefault();
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isGestureActive.current) return;
    
    const touches = Array.from(e.touches);
    
    if (touches.length === 1 && zoom === 1) {
      // Seguimiento para gestos de navegación solo sin zoom
      const touch = touches[0];
      touchEndRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };
    } else if (touches.length === 2) {
      // ZOOM CON DOS DEDOS
      e.preventDefault();
      e.stopPropagation();
      
      const [touch1, touch2] = touches;
      const initialTouches = initialTouchesRef.current;
      
      if (initialTouches.length === 2) {
        // Calcular distancia actual entre dedos
        const currentDistance = Math.sqrt(
          Math.pow(touch1.clientX - touch2.clientX, 2) +
          Math.pow(touch1.clientY - touch2.clientY, 2)
        );
        
        // Calcular distancia inicial entre dedos
        const initialDistance = Math.sqrt(
          Math.pow(initialTouches[0].x - initialTouches[1].x, 2) +
          Math.pow(initialTouches[0].y - initialTouches[1].y, 2)
        );
        
        // Calcular factor de zoom
        const zoomFactor = currentDistance / initialDistance;
        const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom * zoomFactor));
        
        setZoom(newZoom);
        
        // Actualizar touches iniciales para zoom continuo
        initialTouchesRef.current = touches.map(touch => ({
          x: touch.clientX,
          y: touch.clientY
        }));
      }
    }
  }, [zoom]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isGestureActive.current) return;
    
    e.stopPropagation();
    
    const { x: startX, y: startY } = touchStartRef.current;
    const { x: endX, y: endY } = touchEndRef.current;
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const timeDelta = touchEndRef.current.time - touchStartRef.current.time;
    
    // Solo procesar gestos rápidos para navegación (sin zoom)
    if (zoom === 1 && timeDelta < 300) {
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);
      
      // Swipe horizontal para navegación
      if (absDeltaX > absDeltaY && absDeltaX > SWIPE_THRESHOLD) {
        e.preventDefault();
        if (deltaX > 0) {
          goToPrevious();
        } else {
          goToNext();
        }
      }
      // Swipe vertical para cerrar
      else if (deltaY > VERTICAL_SWIPE_THRESHOLD && absDeltaY > absDeltaX) {
        e.preventDefault();
        onClose();
      }
    }
    
    // 🆕 TAP DOBLE PARA ZOOM EN MÓVIL
    const currentTime = Date.now();
    const tapLength = currentTime - lastTapRef.current;
    
    if (tapLength < 300 && tapLength > 0) {
      // Doble tap detectado
      e.preventDefault();
      if (zoom > 1) {
        resetTransform();
      } else {
        setZoom(2.5);
      }
    }
    
    lastTapRef.current = currentTime;
    isGestureActive.current = false;
    initialTouchesRef.current = [];
  }, [zoom, goToPrevious, goToNext, onClose, resetTransform]);

  // 🆕 GESTOS MEJORADOS PARA DESKTOP
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (zoom <= 1) {
      touchStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
        distance: 0
      };
      setIsDragging(true);
    } else {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [zoom, position.x, position.y]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    if (zoom <= 1) {
      touchEndRef.current = {
        x: e.clientX,
        y: e.clientY,
        time: Date.now()
      };
    } else {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      const limit = (zoom - 1) * 150; // Mayor límite para mejor experiencia
      setPosition({
        x: Math.max(Math.min(newX, limit), -limit),
        y: Math.max(Math.min(newY, limit), -limit)
      });
    }
  }, [isDragging, zoom, dragStart.x, dragStart.y]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    if (zoom <= 1) {
      const { x: startX, y: startY } = touchStartRef.current;
      const { x: endX, y: endY } = touchEndRef.current;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);
      
      if (absDeltaX > absDeltaY && absDeltaX > SWIPE_THRESHOLD) {
        if (deltaX > 0) {
          goToPrevious();
        } else {
          goToNext();
        }
      } else if (deltaY > VERTICAL_SWIPE_THRESHOLD && absDeltaY > absDeltaX) {
        onClose();
      }
    }
    
    setIsDragging(false);
  }, [isDragging, zoom, goToPrevious, goToNext, onClose]);

  const handleDownload = useCallback(() => {
    if (!currentImage) return;
    
    const link = document.createElement('a');
    link.href = currentImage.url_foto;
    link.download = `imagen-${currentIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [currentImage, currentIndex]);


  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isGestureActive.current) {
      onClose();
    }
  }, [onClose]);

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || galleryImages.length === 0) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
        case 'r':
        case 'R':
          handleRotate();
          break;
        case '0':
          resetTransform();
          break;
        case ' ':
          setShowControls(prev => !prev);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpen, 
    galleryImages.length, 
    onClose, 
    goToPrevious, 
    goToNext, 
    handleZoomIn, 
    handleZoomOut, 
    handleRotate, 
    resetTransform
  ]);

  // No renderizar si no está abierto
  if (!isOpen) return null;

  // Estados de carga (igual que antes)
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
        <div className="text-white text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-sm text-gray-300">Cargando galería...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="text-white text-center">
          <p className="text-lg mb-4">❌ Error</p>
          <p className="text-sm text-gray-300 mb-4">{error}</p>
          <Button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700"
          >
            Cerrar
          </Button>
        </div>
      </div>
    );
  }

  if (!currentImage || galleryImages.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="text-white text-center">
          <p className="text-lg mb-4">📷</p>
          <p className="text-sm text-gray-300">No hay imágenes en la galería</p>
          <Button
            onClick={onClose}
            className="mt-4 bg-gray-600 hover:bg-gray-700"
          >
            Cerrar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 touch-none"
      onClick={handleBackdropClick}
    >
      {/* Botón de cerrar */}
      {showControls && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-40 bg-black/50 rounded-full p-2 backdrop-blur-sm"
        >
          <X className="w-8 h-8" />
        </button>
      )}

      {/* Controles superiores */}
      {showControls && (
        <div className="absolute top-4 left-4 z-40 flex items-center gap-2 bg-black/50 rounded-lg p-3 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownload}
            className="text-white hover:bg-white/20"
            title="Descargar imagen"
          >
            <Download className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRotate}
            className="text-white hover:bg-white/20"
            title="Rotar imagen (R)"
          >
            <RotateCw className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            disabled={zoom <= 1}
            className="text-white hover:bg-white/20 disabled:opacity-50"
            title="Zoom out (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            disabled={zoom >= MAX_ZOOM}
            className="text-white hover:bg-white/20 disabled:opacity-50"
            title="Zoom in (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={resetTransform}
            disabled={zoom === 1 && rotation === 0}
            className="text-white hover:bg-white/20 disabled:opacity-50"
            title="Reset transformación (0)"
          >
            <span className="text-sm">⟲</span>
          </Button>
        </div>
      )}

      {/* Navegación entre imágenes */}
      {hasMultipleImages && showControls && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 text-white hover:bg-white/20 bg-black/50 backdrop-blur-sm"
            title="Imagen anterior (←)"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 text-white hover:bg-white/20 bg-black/50 backdrop-blur-sm"
            title="Siguiente imagen (→)"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </>
      )}

      {/* 🆕 CONTENEDOR PRINCIPAL CON ZOOM TÁCTIL MEJORADO */}
      <div 
        className="relative max-w-full max-h-full flex items-center justify-center"
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className={cn(
            "relative transition-transform duration-200 ease-out",
            isDragging && zoom <= 1 ? "cursor-grabbing" : 
            zoom > 1 ? "cursor-grab" : "cursor-default"
          )}
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
        >
          <img
            src={currentImage.url_foto}
            alt={currentImage.descripcion}
            className="max-w-screen max-h-screen object-contain rounded-lg shadow-lg select-none"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {/* Información de la imagen */}
      {showControls && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40 max-w-2xl w-full px-4">
          <div className="bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg text-center">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              {hasMultipleImages && (
                <span className="text-sm text-gray-300 bg-black/50 px-2 py-1 rounded">
                  {currentIndex + 1} / {galleryImages.length}
                </span>
              )}
            </div>
            
            {currentImage.descripcion && (
              <p className="text-sm leading-relaxed">{currentImage.descripcion}</p>
            )}
            
            {(zoom !== 1 || rotation !== 0) && (
              <div className="flex justify-center gap-4 mt-2 text-xs text-gray-300">
                {zoom > 1 && <span>Zoom: {zoom.toFixed(1)}x</span>}
                {rotation !== 0 && <span>Rotación: {rotation}°</span>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Indicador de posición */}
      {!showControls && hasMultipleImages && (
        <div className="absolute bottom-4 right-4 z-40 bg-black/70 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm">
          <span>{currentIndex + 1} / {galleryImages.length}</span>
        </div>
      )}

      {/* 🆕 INDICADORES MEJORADOS PARA MÓVIL */}
      {!showControls && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-40 bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm text-center max-w-xs">
          {hasMultipleImages && <p className="mb-1">← Desliza → para navegar</p>}
          <p className="mb-1">↓ Desliza abajo para cerrar</p>
          
          
        </div>
      )}

      {/* Instrucciones de uso para desktop */}
      {showControls && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-40 bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm text-center">
          <p>Doble clic para {zoom > 1 ? 'resetear' : 'zoom'} • Espacio para controles • ESC para salir</p>
          <p className="text-xs mt-1">← → para navegar • Click fuera para cerrar • Rueda del ratón para zoom</p>
        </div>
      )}
    </div>
  );
};