import { useState, useEffect, useRef, type KeyboardEvent, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Sparkles, MapPin, Calendar, Star, Download, Video, Eye, RefreshCw } from 'lucide-react';
import { useCalendarData } from '../../hooks/useCalendarData.ts';
import { CongratsModal } from '../../cultura/section/CongratsModal.tsx';
import { useTranslation } from '../../contexts/TranslationContext.tsx';

export function CalendarSection() {
  const { t } = useTranslation();
  const { calendarData, loading, error } = useCalendarData();

  // ↓↓↓ TODOS LOS HOOKS DEBEN IR PRIMERO ↓↓↓
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const [, setIsPlaying] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [collectedStamps, setCollectedStamps] = useState<string[]>([]);
  const [loadingVideos, setLoadingVideos] = useState<{[key: number]: boolean}>({});
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  const [videoErrors, setVideoErrors] = useState<{[key: number]: boolean}>({});
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  const videoRefs = useRef<{[key: number]: HTMLVideoElement | null}>({});
  const eventCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const events = calendarData?.events || [];

  // Mover la lógica de detección de dispositivo aquí
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Cargar estado persistente desde localStorage
  useEffect(() => {
    const savedStamps = localStorage.getItem('tahitic-collected-stamps');
    const savedVisitorCount = localStorage.getItem('tahitic-visitor-count');
    
    if (savedStamps) {
      setCollectedStamps(JSON.parse(savedStamps));
    }
    
    if (savedVisitorCount) {
      setVisitorCount(parseInt(savedVisitorCount, 10));
    }
  }, []);

  // Simular contador de visitantes optimizado
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => {
        const newCount = prev + Math.floor(Math.random() * 3);
        localStorage.setItem('tahitic-visitor-count', newCount.toString());
        return newCount;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Guardar stamps en localStorage cuando cambien
  useEffect(() => {
    if (collectedStamps.length > 0) {
      localStorage.setItem('tahitic-collected-stamps', JSON.stringify(collectedStamps));
    }
  }, [collectedStamps]);

  const handleEventClick = useCallback((index: number, _stamp: string) => {
    const target = eventCardRefs.current[index];
    if (target) {
      target.scrollIntoView({ 
        behavior: isMobile ? 'auto' : 'smooth', 
        block: isMobile ? 'start' : 'center' 
      });

      setHighlightedIndex(index);
      setTimeout(() => setHighlightedIndex(null), 1200);
    }

    setActiveEvent(activeEvent === index ? null : index);
  }, [activeEvent, isMobile]);

  const handleVideoPlay = useCallback((index: number) => {
    setIsPlaying(true);
    const stamp = events[index].stamp;
    if (!collectedStamps.includes(stamp)) {
      const newStamps = [...collectedStamps, stamp];
      setCollectedStamps(newStamps);
    }
    
    // Pausar otros videos
    Object.keys(videoRefs.current).forEach(key => {
      const videoIndex = parseInt(key);
      if (videoIndex !== index && videoRefs.current[videoIndex]) {
        videoRefs.current[videoIndex]?.pause();
      }
    });
  }, [collectedStamps, events]);

  const handleVideoPause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleImageError = useCallback((stamp: string) => {
    setImageErrors(prev => ({ ...prev, [stamp]: true }));
  }, []);

  const handleVideoError = useCallback((index: number) => {
    setVideoErrors(prev => ({ ...prev, [index]: true }));
    setLoadingVideos(prev => ({ ...prev, [index]: false }));
  }, []);

  const handleVideoLoaded = useCallback((index: number) => {
    setLoadingVideos(prev => ({ ...prev, [index]: false }));
  }, []);

  useEffect(() => {
    // Solo mostrar si hay stamps y se completó la colección
    if (collectedStamps.length > 0 && collectedStamps.length === events.length) {
      setShowCongrats(true);
    }
  }, [collectedStamps.length, events.length]);

  // ↑↑↑ TODOS LOS HOOKS TERMINAN AQUÍ ↑↑↑

  // ↓↓↓ AHORA SÍ PUEDES HACER RETURN TEMPRANO ↓↓↓
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando eventos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }
  // ↑↑↑ FIN DE RETURN TEMPRANO ↑↑↑

  // ... resto de funciones que NO son hooks
  const handleStickersClick = () => {
    const pdfUrl = '/videos/calendario/STICKER San Juan Tahitic.pdf';
    window.open(pdfUrl, '_blank');
  };

  const resetProgress = () => {
    setCollectedStamps([]);
    localStorage.removeItem('tahitic-collected-stamps');
    setActiveEvent(null);
    setIsPlaying(false);
  };

  // Función para truncar texto largo en móviles
  const truncateText = (text: string, maxLength: number) => {
    // En móvil, permitir más texto antes de truncar
    const mobileMaxLength = isMobile ? maxLength * 1.5 : maxLength;
    if (text.length > mobileMaxLength) {
      return text.substring(0, mobileMaxLength) + '...';
    }
    return text;
  };

  // Función para traducir categorías
  const translateCategory = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      'Cultural': t('calendar.categoryCultural'),
      'Religioso': t('calendar.categoryReligious'),
      'Ceremonial': t('calendar.categoryCeremonial'),
      'Feria': t('calendar.categoryFair'),
      'Naturaleza': t('calendar.categoryNature'),
      'Agricultura': t('calendar.categoryAgriculture'),
      'Astronomía': t('calendar.categoryAstronomy'),
      'Galaxias': t('calendar.categoryGalaxies'),
      'Tlamantli': t('calendar.categoryCultural'),
    };
    return categoryMap[category] || category;
  };

  // Manejo de teclado para accesibilidad
  const handleKeyPress = (event: KeyboardEvent, index: number, stamp: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleEventClick(index, stamp);
    }
  };

  const allVisited = collectedStamps.length === events.length;

  // Determinar si debemos eliminar animaciones
  const shouldRemoveAnimations = isMobile || isTablet;

  return (
    <section 
      id="cultura" 
      className="bg-[url('https://res.cloudinary.com/dinsl266g/image/upload/v1763084436/Fondo-gastronomia--2_rvukkb.svg')] bg-cover bg-center bg-scroll min-h-screen py-8 sm:py-16 px-4 sm:px-6 relative"
      aria-labelledby="cultura-title"
    >
      {/* Modal de felicitación */}
      <CongratsModal
        show={showCongrats}
        onClose={() => setShowCongrats(false)}
        pdfUrl="/videos/calendario/STICKER San Juan Tahitic.pdf"
      />
      
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/20" aria-hidden="true"></div>
      
      {/* Decorativos de fondo - Reducidos en móvil */}
      {!shouldRemoveAnimations && (
        <>
          <div className="absolute top-10 right-4 w-20 h-20 sm:w-40 sm:h-40 bg-orange-200/30 rounded-full blur-2xl sm:blur-3xl" aria-hidden="true"></div>
          <div className="absolute bottom-10 left-4 w-16 h-16 sm:w-32 sm:h-32 bg-amber-200/30 rounded-full blur-2xl sm:blur-3xl" aria-hidden="true"></div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative">
        {/* Header optimizado para móvil */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full mb-4 shadow-lg max-w-xs sm:max-w-none mx-auto">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" aria-hidden="true" />
            <span className="text-orange-800 font-semibold text-sm sm:text-base">
              {visitorCount}+ {t('calendar.visitors')}
            </span>
          </div>
          <h1
            id="cultura-title"
            className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 px-2 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
          >
            {t('calendar.titlePart1')}{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              {t('calendar.titlePart2')}
            </span>
          </h1>
          <p className="text-base sm:text-2xl text-white max-w-2xl mx-auto leading-relaxed px-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            {t('calendar.subtitle')}
          </p>
        </div>

        {/* Botón de reset optimizado */}
        <div className="text-center mb-4">
          <button
            onClick={resetProgress}
            className={`inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-3 text-sm sm:text-base font-semibold text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg shadow-md hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-500 ${
              shouldRemoveAnimations ? '' : 'hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300'
            }`}
            aria-label={t('calendar.resetAria')}
          >
            <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
            {t('calendar.resetProgress')}
          </button>
        </div>

        {/* Pasaporte Cultural RESPONSIVE */}
        <div 
          className="bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-6 mb-6 sm:mb-8 border-2 border-orange-200 shadow-lg mx-1 sm:mx-0"
          role="region"
          aria-labelledby="pasaporte-title"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h2 id="pasaporte-title" className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 flex items-center justify-center sm:justify-start">
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-orange-600" aria-hidden="true" />
              {t('calendar.routeTitle')}
            </h2>
            <span className="text-xs sm:text-sm text-gray-600 text-center sm:text-right" aria-live="polite">
              {collectedStamps.length}/{events.length} {t('calendar.completed')}
            </span>
          </div>

          {/* Indicador de recompensa responsive */}
          <div className="flex items-center p-3 bg-amber-50 border border-amber-300 rounded-lg mb-4 text-center sm:text-left">
            <Star className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 fill-amber-300 mr-2 flex-shrink-0" aria-hidden="true" />
            <p className="text-gray-700 font-semibold text-sm sm:text-base">
              {t('calendar.rewardMessage')}
            </p>
          </div>
          
          {/* Grid de stamps responsive */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 mb-4" role="list" aria-label="Experiencias culturales">
            {events.map((event, index) => (
              <div 
                key={index} 
                className="text-center"
                role="listitem"
              >
                <div
                  ref={el => { eventCardRefs.current[index] = el; }}
                  tabIndex={0}
                  className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full border-3 overflow-hidden ${
                    collectedStamps.includes(event.stamp)
                      ? 'border-green-500 bg-green-100 focus:ring-2 focus:ring-green-500 focus:ring-offset-1'
                      : 'border-gray-300 bg-gray-100 opacity-60 focus:ring-2 focus:ring-orange-500 focus:ring-offset-1'
                  } flex items-center justify-center cursor-pointer shadow-sm ${
                    shouldRemoveAnimations ? '' : 'hover:scale-105 active:scale-95 transition-all duration-300'
                  }`}
                  onClick={() => handleEventClick(index, event.stamp)}
                  onKeyPress={(e) => handleKeyPress(e, index, event.stamp)}
                  aria-label={`${event.title}. ${collectedStamps.includes(event.stamp) ? t('calendar.completedAria') : t('calendar.eventAria')}`}
                  aria-expanded={activeEvent === index}
                  aria-controls={`event-details-${index}`}
                >
                  {imageErrors[event.stamp] ? (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Video className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    </div>
                  ) : (
                    <img
                      src={event.videoThumbnail}
                      alt={`Miniatura de ${event.title}`}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(event.stamp)}
                      loading="lazy"
                    />
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium block ${collectedStamps.includes(event.stamp) ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                  {collectedStamps.includes(event.stamp) ? '✓' : '○'}
                </span>
              </div>
            ))}
          </div>

          {allVisited && (
            <button
              onClick={handleStickersClick}
              className={`w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center mt-3 focus:ring-2 focus:ring-offset-1 focus:ring-orange-500 text-sm sm:text-base ${
                shouldRemoveAnimations ? '' : 'hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300'
              }`}
              aria-label={t('calendar.downloadAria')} 
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" aria-hidden="true" />
              {t('calendar.downloadStickers')}
            </button>
          )}

          {!allVisited && (
            <p className="text-xs sm:text-sm text-gray-600 mt-2 text-center px-2" aria-live="polite">
              {t('calendar.progressMessage').replace('{current}', collectedStamps.length.toString()).replace('{total}', events.length.toString())}
            </p>
          )}
        </div>

        {/* Eventos Calendario - COMPLETAMENTE RESPONSIVE SIN ANIMACIONES */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 mx-1 sm:mx-0"
          role="list"
          aria-label="Eventos del calendario cultural"
        >
          {events.map((event, index) => (
            <Card
              key={index}
              id={`event-details-${index}`}
              ref={el => { eventCardRefs.current[index] = el; }}
              className={`group border-l-4 border-orange-400 bg-white/90 backdrop-blur-sm overflow-hidden cursor-pointer relative focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 ${
                highlightedIndex === index ? 'ring-2 ring-orange-400 scale-[1.02]' : ''
              } ${
                shouldRemoveAnimations ? '' : 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
              }`}
              onClick={() => handleEventClick(index, event.stamp)}
              onKeyPress={(e) => handleKeyPress(e, index, event.stamp)}
            >
              
              {/* ENCABEZADO COMPACTO - EN FLUJO NORMAL */}
              <div className="flex justify-between items-center p-3 sm:p-4 border-b border-orange-100 bg-orange-50/50">
                {/* Categoría a la izquierda */}
                <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-3 py-1.5 rounded-full border border-orange-200">
                  {translateCategory(event.category)}
                </span>
                
                {/* Fecha a la derecha */}
                <div className="bg-orange-500 text-white py-1.5 px-3 rounded-full shadow-sm flex items-center">
                  <Calendar className="h-3 w-3 mr-1.5" aria-hidden="true" />
                  <span className="font-bold text-xs">{event.date}</span>
                </div>
              </div>

              {/* CardHeader - SIN elementos de fecha/categoría */}
              <CardHeader className="flex flex-row items-start space-y-0 pb-2 sm:pb-3 pt-3 sm:pt-4">
                <div className="relative mr-3 sm:mr-4">
                  <div className="relative p-1 sm:p-2 rounded-xl shadow-md overflow-hidden bg-white">
                    {imageErrors[event.stamp] ? (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 flex items-center justify-center rounded-lg">
                        <Video className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      </div>
                    ) : (
                      <img 
                        src={event.videoThumbnail} 
                        alt={`Miniatura de ${event.title}`}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                        onError={() => handleImageError(event.stamp)}
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
                <div className="flex-1 relative min-w-0">
                  <div className="flex items-start justify-between">
                    <CardTitle 
                      id={`event-title-${index}`}
                      className={`text-base sm:text-lg lg:text-xl font-extrabold text-gray-900 mb-1 line-clamp-2 leading-tight ${
                        shouldRemoveAnimations ? '' : 'group-hover:text-orange-700 transition-colors duration-300'
                      }`}
                    >
                      {event.title}
                    </CardTitle>
                    {collectedStamps.includes(event.stamp) && (
                      <Star 
                        className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 fill-current ml-2 flex-shrink-0 mt-1" 
                        aria-label={t('calendar.completedAria')} 
                      />
                    )}
                  </div>
                  <CardDescription 
                    id={`event-desc-${index}`}
                    className="text-gray-600 text-xs sm:text-sm leading-relaxed max-h-[60px] overflow-y-auto custom-scrollbar mb-2"
                  >
                    {event.description}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="relative pb-4 max-h-[400px] sm:max-h-none overflow-y-auto custom-scrollbar">
                {/* Overlay de video optimizado - SOLO en desktop */}
                {activeEvent !== index && !shouldRemoveAnimations && (
                  <div 
                    className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  >
                    <button 
                      className="bg-white/90 text-orange-700 font-bold py-2 px-4 rounded-full shadow-lg flex items-center transform group-hover:scale-105 transition-transform text-sm"
                      tabIndex={-1}
                    >
                      <Eye className="h-4 w-4 mr-2" aria-hidden="true" />
                      {t('calendar.viewExperience')}
                    </button>
                  </div>
                )}

                {/* Video preview responsivo */}
                {activeEvent === index && (
                  <div className="mb-3 rounded-lg overflow-hidden shadow-lg mx-[-8px] sm:mx-0">
                    <div className="relative aspect-video bg-black">
                      {loadingVideos[index] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                          <div className="text-white text-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-1"></div>
                            <p className="text-xs">{t('calendar.loading')}</p>
                          </div>
                        </div>
                      )}
                      
                      {videoErrors[index] ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 p-2">
                          <div className="text-white text-center">
                            <Video className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-1 text-gray-400" />
                            <p className="text-sm">{t('calendar.videoUnavailable')}</p>
                          </div>
                        </div>
                      ) : (
                        <video
                          ref={el => { videoRefs.current[index] = el; }}
                          src={activeEvent === index ? event.videoPreview : ''}
                          className="w-full h-full object-cover"
                          controls
                          autoPlay={!isMobile}
                          onPlay={() => handleVideoPlay(index)}
                          onPause={handleVideoPause}
                          onError={() => handleVideoError(index)}
                          onLoadedData={() => handleVideoLoaded(index)}
                          preload="none"
                          aria-label={`Video de ${event.title}`}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Lista de detalles optimizada */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-800 border-b border-orange-200 pb-1 mb-2">
                    {t('calendar.activities')}:
                  </p>
                  <div className="space-y-2 max-h-[120px] sm:max-h-none overflow-y-auto pr-2">
                    {event.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start text-gray-700">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 mt-1.5 flex-shrink-0" aria-hidden="true"></div>
                        <span className="font-medium text-xs sm:text-sm leading-relaxed flex-1">
                          {truncateText(detail, isMobile ? 100 : 150)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Barra de progreso decorativa - SOLO en desktop */}
                {!shouldRemoveAnimations && (
                  <div 
                    className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden"
                    aria-hidden="true"
                  >
                    <div className="h-full bg-orange-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 shadow-lg"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}