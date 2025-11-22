// components/ExperienceImageModal.tsx - VERSIÓN MEJORADA CON GESTOS TÁCTILES
import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download,
  Calendar,
  MapPin,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExperienceImageModalProps {
  experience: Experience | null;
  isOpen: boolean;
  onClose: () => void;
}

interface Experience {
  id: string;
  url_foto: string;
  descripcion: string;
  creado_en: string;
  contador_vistas: number;
  lugar_nombre?: string;
  estado?: 'aprobado' | 'pendiente' | 'rechazado';
  nombre_usuario?: string;
}

// Constantes para gestos
const VERTICAL_SWIPE_THRESHOLD = 100; // Para cerrar el modal

export const ExperienceImageModal = ({
  experience,
  isOpen,
  onClose,
}: ExperienceImageModalProps) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(true);

  // Referencias para gestos táctiles
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const touchEndRef = useRef({ x: 0, y: 0, time: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Resetear estado cuando cambia la experiencia o se abre/cierra el modal
  useEffect(() => {
    if (isOpen && experience) {
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setShowControls(true);
      
      // Ocultar controles después de 3 segundos
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, experience]);

  // Mostrar controles temporalmente
  useEffect(() => {
    if (experience) {
      setShowControls(true);
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [experience]);

  // Funciones de utilidad
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.25, 1));
  }, []);

  const handleRotate = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  const resetTransform = useCallback(() => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Navegación con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !experience) return;

      switch (e.key) {
        case 'Escape':
          onClose();
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
  }, [isOpen, experience, onClose, handleZoomIn, handleZoomOut, handleRotate, resetTransform]);

  // 🆕 GESTOS TÁCTILES PARA MÓVIL
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (zoom > 1) return; // No hacer gestos si estamos en zoom
    
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
  }, [zoom]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (zoom > 1) return;
    
    const touch = e.touches[0];
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };
  }, [zoom]);

  const handleTouchEnd = useCallback(() => {
    if (zoom > 1) return;
    
    const { x: startX, y: startY } = touchStartRef.current;
    const { x: endX, y: endY } = touchEndRef.current;
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const timeDelta = touchEndRef.current.time - touchStartRef.current.time;
    
    // Verificar que sea un gesto rápido (menos de 300ms)
    if (timeDelta > 300) return;
    
    // Determinar dirección del gesto
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);
    
    // Si el movimiento vertical es significativo hacia abajo, cerrar modal
    if (deltaY > VERTICAL_SWIPE_THRESHOLD && absDeltaY > absDeltaX) {
      onClose();
    }
  }, [zoom, onClose]);

  // 🆕 GESTOS DE ARRASTRE PARA CERRAR (cuando no hay zoom)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom <= 1) {
      // Modo gestos para navegación/cierre
      touchStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        time: Date.now()
      };
      setIsDragging(true);
    } else {
      // Modo arrastre para zoom
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [zoom, position.x, position.y]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    if (zoom <= 1) {
      // Seguimiento para gestos con mouse (para desktop)
      touchEndRef.current = {
        x: e.clientX,
        y: e.clientY,
        time: Date.now()
      };
    } else {
      // Arrastre normal para zoom
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      const limit = (zoom - 1) * 100;
      setPosition({
        x: Math.max(Math.min(newX, limit), -limit),
        y: Math.max(Math.min(newY, limit), -limit)
      });
    }
  }, [isDragging, zoom, dragStart.x, dragStart.y]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    if (zoom <= 1) {
      // Procesar gesto con mouse (similar a touch)
      const { x: startX, y: startY } = touchStartRef.current;
      const { x: endX, y: endY } = touchEndRef.current;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);
      
      // Solo cerrar con gesto vertical hacia abajo
      if (deltaY > VERTICAL_SWIPE_THRESHOLD && absDeltaY > absDeltaX) {
        onClose();
      }
    }
    
    setIsDragging(false);
  }, [isDragging, zoom, onClose]);

  const handleDownload = useCallback(() => {
    if (!experience) return;
    
    const link = document.createElement('a');
    link.href = experience.url_foto;
    link.download = `experiencia-${experience.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [experience]);

  const toggleControls = useCallback(() => {
    setShowControls(prev => !prev);
  }, []);

  // 🆕 Cerrar con gesto en el contenido principal
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  // No renderizar si no está abierto o no hay experiencia
  if (!isOpen || !experience) return null;

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
            disabled={zoom >= 3}
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

      {/* 🆕 CONTENEDOR PRINCIPAL CON GESTOS */}
      <div 
        className="relative max-w-full max-h-full flex items-center justify-center"
        onDoubleClick={toggleControls}
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
            "relative transition-transform duration-200",
            isDragging && zoom <= 1 ? "cursor-grabbing" : 
            zoom > 1 ? "cursor-grab" : "cursor-default"
          )}
          style={{
            transform: `scale(${zoom}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: 'center center'
          }}
        >
          <img
            src={experience.url_foto}
            alt={experience.descripcion}
            className="max-w-screen max-h-screen object-contain rounded-lg shadow-lg select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Información de la experiencia */}
      {showControls && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40 max-w-2xl w-full px-4">
          <div className="bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg">
            {/* Estado y título */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-3 h-3 rounded-full",
                  experience.estado === 'aprobado' ? 'bg-green-500' :
                  experience.estado === 'pendiente' ? 'bg-yellow-500' : 'bg-red-500'
                )} />
                <span className="text-sm font-medium capitalize">
                  {experience.estado || 'aprobado'}
                </span>
              </div>
              
              {/* Indicadores de zoom y rotación */}
              {(zoom !== 1 || rotation !== 0) && (
                <div className="flex gap-4 text-xs text-gray-300">
                  {zoom > 1 && <span>Zoom: {zoom.toFixed(1)}x</span>}
                  {rotation !== 0 && <span>Rotación: {rotation}°</span>}
                </div>
              )}
            </div>
            
            {/* Descripción */}
            <p className="text-lg leading-relaxed mb-3">{experience.descripcion}</p>
            
            {/* Metadatos */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(experience.creado_en)}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{experience.contador_vistas} vistas</span>
              </div>
              
              {experience.lugar_nombre && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.lugar_nombre}</span>
                </div>
              )}

              {/* 🆕 Mostrar nombre de usuario si existe */}
              {experience.nombre_usuario && (
                <div className="flex items-center gap-1 text-blue-300">
                  <span>Por: {experience.nombre_usuario}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🆕 INDICADOR DE GESTOS PARA MÓVIL */}
      {!showControls && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-40 bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm text-center">
          <p>↓ Desliza abajo para cerrar</p>
        </div>
      )}

      {/* Instrucciones de uso para desktop */}
      {showControls && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-40 bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm text-center">
          <p>Doble clic para controles • Espacio para mostrar/ocultar • ESC para salir</p>
          <p className="text-xs mt-1">Click fuera para cerrar • Desliza abajo (móvil)</p>
        </div>
      )}
    </div>
  );
};