// ExpandedModal.tsx - Versión corregida
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, BookOpen, Award, Phone, Star, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT
// Interfaces mejoradas con tipado fuerte
interface EspecialidadDestacada {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

interface Ubicacion {
  direccion: string;
  coordenadas?: {
    lat: number;
    lng: number;
  };
}

interface Horarios {
  lunesViernes: string;
  sabadoDomingo: string;
  festivos?: string;
}

interface Contacto {
  telefono: string;
  email?: string;
  website?: string;
}

interface Imagenes {
  ambiente: string;
  logo?: string;
  galeria?: string[];
}

interface Historia {
  contenido: string;
  fundacion?: string;
  tradicion?: string;
}

interface Restaurante {
  id: string;
  nombre: string;
  imagenes: Imagenes;
  ubicacion: Ubicacion;
  horarios: Horarios;
  contacto: Contacto;
  historia: Historia;
  servicios: string[];
  especialidadDestacada?: EspecialidadDestacada;
  calificacion?: number;
  precioPromedio?: string;
}

interface ExpandedModalProps {
  restauranteExpandido: Restaurante | null;
  onClose: () => void;
  getServiceIcon: (servicio: string) => React.ComponentType<{ size?: number | string; className?: string }>;
}

// Modal de imagen expandida
function ImageExpandedModal({ imageUrl, alt, onClose }: { imageUrl: string; alt: string; onClose: () => void }) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const { t } = useTranslation(); // ← AGREGAR HOOK

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.01;
    setScale(prev => Math.min(Math.max(0.5, prev + delta), 3));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [scale, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y
    });
  }, [isDragging, scale, startPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const resetTransform = useCallback(() => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, []);

  const rotateImage = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="relative max-w-4xl max-h-[90vh] w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Controles de imagen */}
        <div className="absolute top-4 right-4 left-4 z-10 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); resetTransform(); }}
              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
              aria-label={t('cocinas.expandedModal.resetImage')} // ← TRADUCIBLE
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); rotateImage(); }}
              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
              aria-label={t('cocinas.expandedModal.rotateImage')} // ← TRADUCIBLE
            >
              <ZoomIn size={20} />
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); setScale(prev => Math.max(0.5, prev - 0.2)); }}
              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
              aria-label={t('cocinas.expandedModal.zoomOut')} // ← TRADUCIBLE
            >
              <ZoomOut size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setScale(prev => Math.min(3, prev + 0.2)); }}
              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
              aria-label={t('cocinas.expandedModal.zoomIn')} // ← TRADUCIBLE
            >
              <ZoomIn size={20} />
            </button>
            <button
              onClick={onClose}
              className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
              aria-label={t('cocinas.expandedModal.closeImageViewer')} // ← TRADUCIBLE
            >
              <X size={20} />
            </button>
          </div>
        </div>
        {/* Imagen con transformaciones */}
        <motion.img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-contain cursor-grab active:cursor-grabbing"
          style={{
            scale,
            rotate: rotation,
            x: position.x,
            y: position.y,
          }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          draggable={false}
        />

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {Math.round(scale * 100)}%
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ExpandedModal({ restauranteExpandido, onClose, getServiceIcon }: ExpandedModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const { t } = useTranslation(); // ← AGREGAR HOOK

  // Manejo de teclado para accesibilidad
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (expandedImage) {
          setExpandedImage(null);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose, expandedImage]);

  // Memoizar servicios para mejor rendimiento - CORREGIDO
  const serviciosRender = useMemo(() => {
    if (!restauranteExpandido?.servicios) return null;
    
    return restauranteExpandido.servicios.slice(0, 6).map((servicio: string, index: number) => {
      const IconComponent = getServiceIcon(servicio);
      return (
        <div 
          key={index} 
          className="flex items-center space-x-2 sm:space-x-3 text-gray-600 text-sm sm:text-base"
          aria-label={`${t('cocinas.expandedModal.service')} ${servicio}`} // ← TRADUCIBLE
        >
          <IconComponent size={16} className="text-amber-600 flex-shrink-0" />
          <span className="font-medium font-serif break-words">{servicio}</span> {/* ← VIENE DEL JSON */}
        </div>
      );
    });
  }, [restauranteExpandido?.servicios, getServiceIcon, t]);

  if (!restauranteExpandido) return null;

  // Fallbacks para datos faltantes
  const imageUrl = restauranteExpandido.imagenes?.ambiente || 
                   restauranteExpandido.especialidadDestacada?.imagen || 
                   '/default-restaurant.jpg';

  const handleImageClick = () => {
    setExpandedImage(imageUrl);
  };

   return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl sm:rounded-3xl max-w-6xl w-full max-h-[95vh] shadow-2xl border border-amber-100 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header con imagen del restaurante - MEJORADO */}
            <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 flex-shrink-0">
              <img
                src={imageUrl}
                alt={`${t('cocinas.expandedModal.kitchenEnvironment')} ${restauranteExpandido.nombre}`} // ← TRADUCIBLE
                className="w-full h-full object-cover cursor-zoom-in transition-transform hover:scale-105"
                onClick={handleImageClick}
                onError={(e) => {
                  e.currentTarget.src = '/default-restaurant.jpg';
                }}
              />
              <button
                onClick={onClose}
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full hover:bg-white transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label={t('cocinas.expandedModal.closeModal')} // ← TRADUCIBLE
              >
                <X size={20} />
              </button>
              
              {/* Badge de imagen interactiva - Solo mostrar en desktop */}
              <div className="absolute bottom-3 left-3 bg-black/60 text-white px-2 py-1 rounded-lg text-xs backdrop-blur-sm hidden sm:block">
                <ZoomIn size={12} className="inline mr-1" />
                {t('cocinas.expandedModal.clickToExpand')} {/* ← TRADUCIBLE */}
              </div>
            </div>
            {/* Contenido con scroll interno - MEJORADO */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto"
            >
              {/* Header información - MEJORADO RESPONSIVE */}
              <div className="mb-4 sm:mb-6 lg:mb-8">
                <h2 
                  id="modal-title"
                  className="text-xl sm:text-2xl lg:text-4xl font-extrabold font-serif text-gray-900 mb-2 sm:mb-3 break-words"
                >
                  {restauranteExpandido.nombre}
                </h2>
                <div className="flex items-center text-gray-600 text-sm sm:text-base lg:text-lg flex-wrap gap-2">
                  <MapPin size={20} className="flex-shrink-0" />
                  <span className="break-words">{restauranteExpandido.ubicacion.direccion}</span>
                </div>
                
                {/* Información adicional en línea para móvil */}
                <div className="flex flex-wrap gap-4 mt-3 text-xs sm:text-sm">
                  {restauranteExpandido.calificacion && (
                    <div className="flex items-center space-x-1 bg-amber-100 px-2 py-1 rounded-full">
                      <Star size={12} className="text-amber-600" />
                      <span className="font-medium font-serif">{restauranteExpandido.calificacion}</span>
                    </div>
                  )}
                  {restauranteExpandido.precioPromedio && (
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium font-serif">
                      {restauranteExpandido.precioPromedio}
                    </div>
                  )}
                </div>
              </div>

              {/* Especialidad Destacada - MEJORADO */}
              {/* Especialidad Destacada - MEJORADO */}
            {restauranteExpandido.especialidadDestacada && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8 border border-amber-200">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <Star size={24} className="text-amber-600 flex-shrink-0" />
                  <h3 className="font-bold font-serif text-gray-900 text-base sm:text-lg lg:text-xl">
                    ⭐ {t('cocinas.expandedModal.featuredDish')} {/* ← TRADUCIBLE */}
                  </h3>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 sm:gap-6">
                  <div className="flex-1">
                    <h4 className="font-semibold font-serif text-gray-800 text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3">
                      {restauranteExpandido.especialidadDestacada.nombre} {/* ← VIENE DEL JSON */}
                    </h4>
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                      {restauranteExpandido.especialidadDestacada.descripcion} {/* ← VIENE DEL JSON */}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-amber-600 font-bold font-serif text-xl sm:text-2xl lg:text-3xl block text-center lg:text-right">
                      ${restauranteExpandido.especialidadDestacada.precio} {/* ← VIENE DEL JSON */}
                    </span>
                    <button 
                      onClick={() => setExpandedImage(restauranteExpandido.especialidadDestacada!.imagen)}
                      className="text-amber-600 text-sm mt-2 hover:text-amber-700 transition-colors flex items-center justify-center lg:justify-end w-full"
                    >
                      <ZoomIn size={12} className="mr-1" />
                      {t('cocinas.expandedModal.viewImage')} {/* ← TRADUCIBLE */}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Información detallada - LAYOUT MEJORADO */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Historia */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <BookOpen size={24} className="text-amber-600 flex-shrink-0" />
                  <h3 className="font-semibold font-serif  text-gray-800 text-lg sm:text-xl">
                    {t('cocinas.expandedModal.ourStory')} {/* ← TRADUCIBLE */}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed font-medium font-serif text-sm sm:text-base lg:text-lg">
                  {restauranteExpandido.historia?.contenido || t('cocinas.expandedModal.historicalInfoNotAvailable')} {/* ← TRADUCIBLE */}
                </p>
              </div>

              {/* Servicios */}
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Award size={24} className="text-amber-600 flex-shrink-0" />
                  <h3 className="font-semibold font-serif text-gray-800 text-lg sm:text-xl">
                    {t('cocinas.expandedModal.services')} {/* ← TRADUCIBLE */}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {serviciosRender}
                </div>
              </div>
            </div>

            {/* Horarios - MEJORADO */}
            <div className="mt-6 sm:mt-8 lg:mt-12 pt-4 sm:pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <Clock size={24} className="text-amber-600 flex-shrink-0" />
                <h3 className="font-semibold font-serif text-gray-800 text-lg sm:text-xl">
                  {t('cocinas.expandedModal.openingHours')} {/* ← TRADUCIBLE */}
                </h3>
              </div>
              <div className="text-gray-600 space-y-2 sm:space-y-3 font-medium font-serif text-sm sm:text-base lg:text-lg">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                  <span className="flex-1">{t('cocinas.expandedModal.mondayFriday')}:</span> {/* ← TRADUCIBLE */}
                  <span className="text-amber-600 font-bold font-serif text-right">{restauranteExpandido.horarios.lunesViernes}</span> {/* ← VIENE DEL JSON */}
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                  <span className="flex-1">{t('cocinas.expandedModal.saturdaySunday')}:</span> {/* ← TRADUCIBLE */}
                  <span className="text-amber-600 font-bold font-serif text-right">{restauranteExpandido.horarios.sabadoDomingo}</span> {/* ← VIENE DEL JSON */}
                </div>
                {restauranteExpandido.horarios.festivos && (
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
                    <span className="flex-1">{t('cocinas.expandedModal.holidays')}:</span> {/* ← TRADUCIBLE */}
                    <span className="text-amber-600 font-bold font-serif text-right">{restauranteExpandido.horarios.festivos}</span> {/* ← VIENE DEL JSON */}
                  </div>
                )}
              </div>
            </div>
          </div>

            {/* Footer del modal con CTA - MEJORADO */}
            <div className="border-t border-gray-200 p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
                <div className="text-gray-700 text-sm sm:text-base font-medium text-center sm:text-left">
                  <Phone size={16} className="inline mr-2" />
                  {t('cocinas.expandedModal.anyQuestions')} {/* ← TRADUCIBLE */}
                  <strong className="break-all ml-2 text-amber-700">
                    {restauranteExpandido.contacto.telefono} {/* ← VIENE DEL JSON */}
                  </strong>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Modal de imagen expandida */}
      <AnimatePresence>
        {expandedImage && (
          <ImageExpandedModal
            imageUrl={expandedImage}
            alt={`${t('cocinas.expandedModal.expandedImageOf')} ${restauranteExpandido.nombre}`} // ← TRADUCIBLE
            onClose={() => setExpandedImage(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}