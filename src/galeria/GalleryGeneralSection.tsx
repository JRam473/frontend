// GalleryGeneralSection.tsx
import { useGallery } from './section/hooks/useGallery';
import { GalleryVideo } from './section/GalleryVideo';
import { CircularGallery } from './section/CircularGallery';
import { GridGallery } from './section/GridGallery';
import { ImageModal } from './section/ImageModal';
import { ViewModeToggle } from './section/ViewModeToggle';
import { YouTubeModal } from './section/YouTubeModal';
import { useTranslation } from '../contexts/TranslationContext';
import { useMemo, useRef, useEffect, useState } from 'react';

// Importar todos los archivos de datos
import galleryDataEs from '../archivos_data/gallery-data.es.json';
import galleryDataEn from '../archivos_data/gallery-data.en.json';
import galleryDataNah from '../archivos_data/gallery-data.nah.json';

export function GalleryGeneralSection() {
  const { language, t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detección de dispositivo
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    
    // Debounce para mejor performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkDevice, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const shouldRemoveAnimations = isMobile || isTablet;

  // Seleccionar datos según el idioma
  const galleryImages = useMemo(() => {
    switch (language) {
      case 'es':
        return (galleryDataEs as any).galleryImages;
      case 'en':
        return (galleryDataEn as any).galleryImages;
      case 'nah':
        return (galleryDataNah as any).galleryImages;
      default:
        return (galleryDataEs as any).galleryImages;
    }
  }, [language]);

  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const {
    selectedImage,
    currentImageIndex,
    selectedCategory,
    viewMode,
    zoomLevel,
    categories,
    filteredImages,
    currentImage,
    setSelectedCategory,
    setViewMode,
    openImage,
    closeImage,
    nextImage,
    prevImage,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    getCircularPosition,
    isYouTubeModalOpen,
    setIsYouTubeModalOpen,
    isVideoHovered,
    setIsVideoHovered,
    formatDate,
  } = useGallery(galleryImages);

  useEffect(() => {
    // Hacer scroll cuando cambia la categoría
    if (galleryContainerRef.current && selectedCategory !== 'todas') {
      setTimeout(() => {
        galleryContainerRef.current?.scrollIntoView({ 
          behavior: shouldRemoveAnimations ? 'auto' : 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }, 100);
    }
  }, [selectedCategory, shouldRemoveAnimations]);

  // Función para obtener el nombre traducido de la categoría
  const getTranslatedCategory = (category: string) => {
    switch (category) {
      case 'paisajes': return t('gallery.landscapes');
      case 'naturaleza': return t('gallery.nature');
      case 'cultura': return t('gallery.culture');
      case 'comunidad': return t('gallery.community');
      case 'tradiciones': return t('gallery.traditions');
      default: return category;
    }
  };

  const handleVideoClick = () => {
    setIsYouTubeModalOpen(true);
  };

  const handleVideoHover = (hovered: boolean) => {
    setIsVideoHovered(hovered);
  };

  return (
    <section id="galeria" className="py-20 relative overflow-hidden min-h-screen">
      {/* Fondo con imagen SVG */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://res.cloudinary.com/dinsl266g/image/upload/v1763074398/fondo-galeria_urye7x.svg)' }}
      />

      {/* Overlay para mejor legibilidad */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado - SIN ANIMACIONES */}
        <div className="text-center mb-16">
          <h2 id="roots-heading" className="text-5xl lg:text-6xl font-bold font-serif text-gray-200 mb-6">
            {t('gallery.titlePart1')}{' '}
            <span className="bg-gradient-to-r from-teal-300 via-blue-400 to-emerald-500 bg-clip-text text-transparent">
              {t('gallery.titlePart2')}{' '}
            </span>
            <span className="bg-gradient-to-r from-teal-100 via-blue-200 to-emerald-300 bg-clip-text text-transparent">
              {t('gallery.titlePart3')}
            </span>
          </h2>
        </div>

        {/* ✅ LAYOUT MEJORADO SIN ANIMACIONES */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* SIDEBAR IZQUIERDO COMPLETO - ESTÁTICO */}
          <div className="w-full lg:w-64 flex-shrink-0 lg:-ml-4">
            <div className="bg-slate-800/20 backdrop-blur-sm rounded-4xl p-6 border border-slate-700/50 sticky top-8 space-y-6">
              
              {/* ✅ VIEW MODE TOGGLE EN SIDEBAR */}
              <ViewModeToggle
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                isMobile={isMobile}
                shouldRemoveAnimations={shouldRemoveAnimations}
              />

              {/* ✅ CATEGORÍAS VERTICALES - SIN ANIMACIONES */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-4 font-serif">
                  {t('gallery.categoriesTitle')}
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg'
                          : 'text-slate-300 hover:text-white hover:bg-slate-700/50 border border-slate-600/50'
                      } ${shouldRemoveAnimations ? '' : 'transition-colors duration-300'}`}
                    >
                      {category === 'todas' 
                        ? `🌄 ${t('gallery.allCategories')}`
                        : `${
                            category === 'paisajes' ? '🏔️ ' :
                            category === 'naturaleza' ? '🌿 ' :
                            category === 'cultura' ? '🎨 ' :
                            category === 'comunidad' ? '👥 ' :
                            category === 'tradiciones' ? '📜 ' : '📸 '
                          }${getTranslatedCategory(category)}`
                      }
                    </button>
                  ))}
                </div>
              </div>

              {/* ✅ CONTADOR DE IMÁGENES */}
              <div className="pt-4 border-t border-slate-700/50">
                <p className="text-slate-400 text-sm">
                  {filteredImages.length} {filteredImages.length === 1 
                    ? t('gallery.imagesCount')
                    : t('gallery.imagesCount_plural')
                  }
                </p>
                <p className="text-slate-500 text-xs mt-1">
                  {t('gallery.categoryLabel')} {selectedCategory === 'todas' 
                    ? t('gallery.allCategoriesLabel')
                    : getTranslatedCategory(selectedCategory)
                  }
                </p>
              </div>
            </div>
          </div>

          {/* ✅ CONTENIDO PRINCIPAL - MÁS ESPACIO CON REF PARA SCROLL */}
          <div ref={galleryContainerRef} className="flex-1 w-full min-w-0">
            {/* ✅ VIEW MODE TOGGLE EN PARTE SUPERIOR DERECHA */}
            <div className="flex justify-between items-start mb-6">
              {/* Espacio izquierdo para balance */}
              <div className="w-0 lg:w-32"></div>
              
              {/* Espacio derecho para balance */}
              <div className="w-0 lg:w-32"></div>
            </div>

            {/* ✅ GALERÍA PRINCIPAL CON MÁXIMO ESPACIO */}
            <div className="relative">
              <div className={`relative w-full mx-auto ${
                viewMode === 'grid' 
                  ? 'flex flex-col' 
                  : 'flex items-center justify-center min-h-[75vh]'
              }`}>
                
                {/* Video */}
                <div className={`
                  ${viewMode === 'grid' 
                    ? 'w-full mb-6' 
                    : 'relative z-10'
                  }
                `}>
                  <div className={`
                    ${viewMode === 'grid' 
                      ? 'w-full max-w-4xl mx-auto h-[350px] md:h-[450px] rounded-2xl overflow-hidden'
                      : 'w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden'
                    }
                  `}>
                    <GalleryVideo
                      isGridMode={viewMode === 'grid'}
                      onVideoClick={handleVideoClick}
                      isVideoHovered={isVideoHovered}
                      onVideoHover={handleVideoHover}
                      shouldRemoveAnimations={shouldRemoveAnimations}
                    />
                  </div>
                </div>

                {/* Galería Circular */}
                {viewMode === 'circular' && filteredImages.length > 0 && (
                  <div className={`absolute inset-0 ${
                    isMobile ? 'scale-90' : 'scale-100'
                  }`}>
                    <CircularGallery
                      images={filteredImages}
                      getCircularPosition={getCircularPosition}
                      onImageClick={openImage}
                      isMobile={isMobile}
                      shouldRemoveAnimations={shouldRemoveAnimations}
                    />
                  </div>
                )}

                {/* Grid Gallery */}
                {viewMode === 'grid' && filteredImages.length > 0 && (
                  <div className="w-full max-w-4xl mx-auto">
                    <GridGallery
                      images={filteredImages}
                      onImageClick={openImage}
                      isMobile={isMobile}
                      shouldRemoveAnimations={shouldRemoveAnimations}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ✅ LLAMADA A LA ACCIÓN - SIN ANIMACIONES */}
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-yellow-800 to-amber-900 rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-serif">
                  {t('gallery.communityCallToAction')}
                </h3>
                <p className="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
                  {t('gallery.communityDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ MODALES */}
        <ImageModal
          isOpen={!!selectedImage}
          onClose={closeImage}
          image={currentImage}
          currentIndex={currentImageIndex}
          totalImages={filteredImages.length}
          zoomLevel={zoomLevel}
          onNext={nextImage}
          onPrev={prevImage}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          formatDate={formatDate}
          shouldRemoveAnimations={shouldRemoveAnimations}
        />
        
        <YouTubeModal
          isOpen={isYouTubeModalOpen}
          onClose={() => setIsYouTubeModalOpen(false)}
          videoId="4r2isHLCNFo"
          shouldRemoveAnimations={shouldRemoveAnimations}
        />
      </div>
    </section>
  );
}