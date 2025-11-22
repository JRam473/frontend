// components/NarrativaHistoricaCompleta.tsx
import { useState, useRef, useMemo } from 'react';
import { useNavigate } from "react-router-dom"; 
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, MapPin, Users, Book, Play, Calendar, 
  Quote, ArrowRight, Star, X, Volume2, VolumeX,
  Maximize2,Pause,
  ArrowLeft 
} from 'lucide-react';
// Importar todos los archivos JSON
import historiasDataEs from '../../archivos_data/atractivos-turisticos.json';
import historiasDataEn from '../../archivos_data/atractivos-turisticos.en.json';
import historiasDataNah from '../../archivos_data/atractivos-turisticos.nah.json';

import { useTranslation } from '../../contexts/TranslationContext'; // ← AGREGAR IMPORT

export function ExploradorAtractivosTuristicos() {
   const { language } = useTranslation();
   // Cargar datos según el idioma
  const historiasData = useMemo(() => {
    switch (language) {
      case 'es': return historiasDataEs;
      case 'en': return historiasDataEn;
      case 'nah': return historiasDataNah;
      default: return historiasDataEs;
    }
  }, [language]);
  const [lugarSeleccionado, setLugarSeleccionado] = useState(0);
  const [seccionActiva, setSeccionActiva] = useState('historia');
  const [imagenExpandida, setImagenExpandida] = useState<string | null>(null);
  const [videoExpandido, setVideoExpandido] = useState<string | null>(null);
  const [videoReproduciendo, setVideoReproduciendo] = useState<string | null>(null);
  const [volumenActivo, setVolumenActivo] = useState(true);
  const { t } = useTranslation(); // ← AGREGAR HOOK

  const navigate = useNavigate();

  const coloresLugares = [
    {
      nombre: 'teal',
      from: 'from-teal-700',
      to: 'to-emerald-600',
      text: 'text-teal-700',
      border: 'border-teal-600',
    },
    {
      nombre: 'amber',
      from: 'from-amber-700',
      to: 'to-orange-600',
      text: 'text-amber-700',
      border: 'border-amber-600',
    },
    {
      nombre: 'rose',
      from: 'from-rose-700',
      to: 'to-pink-600',
      text: 'text-rose-700',
      border: 'border-rose-600',
    },
  ];

  const videoRef = useRef<HTMLVideoElement>(null);
  const lugar = historiasData.lugaresHistoricos[lugarSeleccionado];

  const secciones = [
    { id: 'historia', nombre: t('tourismsection.sections.history'), icono: Book }, // ← TRADUCIBLE
    { id: 'leyenda', nombre: t('tourismsection.sections.legend'), icono: Star }, // ← TRADUCIBLE
    { id: 'cronologia', nombre: t('tourismsection.sections.timeline'), icono: Calendar }, // ← TRADUCIBLE
    { id: 'testimonios', nombre: t('tourismsection.sections.voices'), icono: Users } // ← TRADUCIBLE
  ];

  // Controladores de Video (sin cambios)
  const toggleReproduccion = () => {
    if (videoRef.current) {
      if (videoReproduciendo === lugar.videoDocumental) {
        videoRef.current.pause();
        setVideoReproduciendo(null);
      } else {
        videoRef.current.play();
        setVideoReproduciendo(lugar.videoDocumental || null);
      }
    }
  };
  const toggleVolumen = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setVolumenActivo(!videoRef.current.muted);
    }
  };

  const colorActual = coloresLugares[lugarSeleccionado % coloresLugares.length];

  return (
    <section className="min-h-screen relative py-8 sm:py-16">
      {/* Contenedor de fondo */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://res.cloudinary.com/dinsl266g/image/upload/v1763076653/Viejo_zoi3ur.jpg")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/10 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="mb-2">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-200 text-emerald-700 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            {t('tourismsection.back')} {/* ← TRADUCIBLE */}
          </button>
        </div>

        {/* Encabezado Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md mb-4 sm:mb-6 shadow-lg text-sm sm:text-base"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Book className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium font-serif">{t('tourismsection.livingMemory')}</span> {/* ← TRADUCIBLE */}
          </motion.div>

          <h1 className={`text-2xl sm:text-4xl font-bold font-serif text-slate-900 mb-4 sm:mb-6`}>
            {t('tourismsection.treasuresNarrated')}{' '} {/* ← TRADUCIBLE */}
            
          </h1>

          <p className="text-base sm:text-xl text-slate-900 max-w-3xl mx-auto leading-relaxed px-4">
            {t('tourismsection.description')} {/* ← TRADUCIBLE */}
          </p>
        </motion.div>

        {/* Selector de Lugares */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex overflow-x-auto pb-4 mb-6 sm:mb-8 gap-2 sm:gap-3 scrollbar-hide px-2"
        >
          {historiasData.lugaresHistoricos.map((lugar, index) => (
            <motion.button
              key={lugar.id}
              onClick={() => {
                setLugarSeleccionado(index);
                setVideoReproduciendo(null);
              }}
              whileHover={{ scale: 1.07, boxShadow: "0px 4px 12px rgba(0,0,0,0.15)" }}
              whileTap={{ scale: 0.96 }}
              animate={{
                scale: lugarSeleccionado === index ? 1.05 : 1,
                opacity: lugarSeleccionado === index ? 1 : 0.9,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold font-serif whitespace-nowrap text-sm sm:text-base transition-colors duration-300 
                ${
                  lugarSeleccionado === index
                    ? `bg-gradient-to-r ${colorActual.from} ${colorActual.to} text-white`
                    : 'bg-white text-slate-700 border border-slate-300 hover:border-green-600'
                }`}
            >
              {lugar.nombre}
            </motion.button>
          ))}
        </motion.div>

        {/* Contenido Principal */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Columna Izquierda - Imagen/Video y Metadatos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3"
          >
            <div className={`rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden transition-all duration-700 ease-in-out 
               bg-white border-4 ${colorActual.border}`}>
              
              {/* Reproductor de Video Mejorado */}
              {lugar.videoDocumental ? (
                <div className="relative">
                  <div className="relative aspect-video bg-black">
                    <video
                      ref={videoRef}
                      src={lugar.videoDocumental}
                      poster={lugar.thumbnailVideo || lugar.imagenPrincipal}
                      className="w-full h-full object-cover"
                      onClick={toggleReproduccion}
                    />
                    
                    {/* Overlay de Controles */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-3 sm:p-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <button
                          onClick={toggleReproduccion}
                          className="bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-colors"
                          aria-label={videoReproduciendo === lugar.videoDocumental ? t('tourismsection.videoControls.pause') : t('tourismsection.videoControls.play')} // ← TRADUCIBLE
                        >
                          {videoReproduciendo === lugar.videoDocumental ? (
                            <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                          ) : (
                            <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                          )}
                        </button>
                        
                        <button
                          onClick={toggleVolumen}
                          className="bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-colors"
                          aria-label={volumenActivo ? t('tourismsection.videoControls.mute') : t('tourismsection.videoControls.unmute')} // ← TRADUCIBLE
                        >
                          {volumenActivo ? (
                            <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          ) : (
                            <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                          )}
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                          {lugar.duracionVideo}
                        </span>
                        <button
                          onClick={() => setVideoExpandido(lugar.videoDocumental || null)}
                          className="bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-colors"
                          aria-label={t('tourismsection.videoControls.fullscreen')} // ← TRADUCIBLE
                        >
                          <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Indicador de reproducción en centro */}
                    {videoReproduciendo !== lugar.videoDocumental && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={toggleReproduccion}
                          className="bg-white/20 backdrop-blur-sm text-white p-4 sm:p-5 rounded-full hover:bg-white/30 transition-all transform hover:scale-110"
                        >
                          <Play className="h-6 w-6 sm:h-8 sm:w-8 fill-current" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Fallback a imagen si no hay video
                <div className="relative aspect-video sm:aspect-square overflow-hidden">
                  <img
                    src={lugar.imagenPrincipal}
                    alt={lugar.nombre}
                    className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                    onClick={() => setImagenExpandida(lugar.imagenPrincipal)}
                  />
                </div>
              )}

              {/* Metadatos Responsive */}
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold font-serif text-emerald-800 bg-green-300 px-2 sm:px-3 py-1 rounded-full">
                    {lugar.epoca}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-500 capitalize">
                    {lugar.tipo.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center text-slate-600">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-emerald-600" />
                    <span className="text-xs sm:text-sm">{lugar.historia.periodoHistorico}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-emerald-600" />
                    <span className="text-xs sm:text-sm">{lugar.coordenadas}</span>
                  </div>
                </div>

                {/* Datos Específicos Responsive */}
                {(lugar.datosArqueologicos || lugar.datosNaturales) && (
                  <div className="pt-3 sm:pt-4 border-t border-slate-200">
                    <h4 className="font-semibold font-serif text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base">
                      {lugar.datosArqueologicos ? t('tourismsection.metadata.archaeologicalData') : t('tourismsection.metadata.naturalData')} {/* ← TRADUCIBLE */}
                    </h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-slate-600">
                      {Object.entries(lugar.datosArqueologicos || lugar.datosNaturales || {}).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="font-medium font-serif text-slate-800">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Columna Derecha - Contenido Narrativo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:w-2/3"
          >
            <div className={`rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden transition-all duration-700 ease-in-out 
                  bg-white border-4 ${colorActual.border}`}>
              
              {/* Navegación de Secciones Responsive */}
              <div className="border-b border-slate-200">
                <div className="flex overflow-x-auto scrollbar-hide">
                  {secciones.map((seccion) => {
                    const Icono = seccion.icono;
                    return (
                      <button
                        key={seccion.id}
                        onClick={() => setSeccionActiva(seccion.id)}
                        className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold font-serif transition-all border-b-2 flex-shrink-0 text-sm sm:text-base ${
                          seccionActiva === seccion.id
                            ? `${colorActual.border} ${colorActual.text} border-b-2`
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        <Icono className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{seccion.nombre}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contenido de la Sección Responsive */}
              <div className="p-4 sm:p-6 lg:p-8 max-h-[60vh] sm:max-h-none overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={seccionActiva}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    
                    {/* SECCIÓN HISTORIA */}
                    {seccionActiva === 'historia' && (
                      <div className="space-y-4 sm:space-y-6">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-slate-900">
                          {lugar.historia.titulo}
                        </h2>
                        <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed">
                          {lugar.historia.contenido}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4">
                          <div className="bg-amber-50 rounded-xl p-3 sm:p-4">
                            <h4 className="font-semibold font-serif text-slate-800 mb-1 sm:mb-2 text-sm sm:text-base">
                              {t('tourismsection.historySection.culturalSignificance')} {/* ← TRADUCIBLE */}
                            </h4>
                            <p className="text-slate-700 text-xs sm:text-sm">{lugar.historia.significadoCultural}</p>
                          </div>
                          <div className="bg-orange-50 rounded-xl p-3 sm:p-4">
                            <h4 className="font-semibold font-serif text-slate-800 mb-1 sm:mb-2 text-sm sm:text-base">
                              {t('tourismsection.historySection.firstRecord')} {/* ← TRADUCIBLE */}
                            </h4>
                            <p className="text-slate-700 text-xs sm:text-sm">{lugar.historia.fechaDescubrimiento}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECCIÓN LEYENDA */}
                    {seccionActiva === 'leyenda' && (
                      <div className="space-y-4 sm:space-y-6">
                        <div className="bg-gradient-to-r from-teal-900 to-emerald-950 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
                          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif mb-3 sm:mb-4">
                            {lugar.leyenda.titulo}
                          </h2>
                          <p className="text-amber-100 text-sm sm:text-base lg:text-lg leading-relaxed">
                            {lugar.leyenda.contenido}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                          <div>
                            <h4 className="font-semibold font-serif text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base">
                              {t('tourismsection.legendSection.characters')} {/* ← TRADUCIBLE */}
                            </h4>
                            <ul className="space-y-1 sm:space-y-2">
                              {lugar.leyenda.personajes.map((personaje, idx) => (
                                <li key={idx} className="flex items-center text-slate-700 text-sm sm:text-base">
                                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 sm:mr-3"></div>
                                  {personaje}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-slate-50 rounded-xl p-3 sm:p-4">
                            <h4 className="font-semibold font-serif text-slate-800 mb-1 sm:mb-2 text-sm sm:text-base">
                              {t('tourismsection.legendSection.teaching')} {/* ← TRADUCIBLE */}
                            </h4>
                            <p className="text-slate-700 italic text-xs sm:text-sm">{lugar.leyenda.moral}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECCIÓN LÍNEA DE TIEMPO */}
                    {seccionActiva === 'cronologia' && (
                      <div className="space-y-4 sm:space-y-6">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-slate-900 mb-4 sm:mb-6">
                          {t('tourismsection.timelineSection.title')} {/* ← TRADUCIBLE */}
                        </h2>
                        
                        <div className="space-y-4 sm:space-y-6">
                          {lugar.cronologia.map((evento, index) => (
                            <div key={index} className="flex">
                              <div className="flex flex-col items-center mr-3 sm:mr-4">
                                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full border-2 sm:border-4 border-white shadow-lg"></div>
                                {index < lugar.cronologia.length - 1 && (
                                  <div className="w-0.5 h-full bg-emerald-200 mt-1 sm:mt-2"></div>
                                )}
                              </div>
                              
                              <div className="flex-1 pb-4 sm:pb-6">
                                <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1 sm:gap-0">
                                    <span className="font-bold font-serif text-teal-600 text-sm sm:text-base">{evento.fecha}</span>
                                    <div className="hidden sm:block w-2 h-2 bg-teal-500 rounded-full"></div>
                                  </div>
                                  <h4 className="font-semibold font-serif text-slate-800 mb-1 sm:mb-2 text-sm sm:text-base">{evento.evento}</h4>
                                  <p className="text-slate-600 text-xs sm:text-sm">{evento.descripcion}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Leyenda de la línea de tiempo */}
                        <div className="bg-slate-50 rounded-xl p-3 sm:p-4 mt-4 sm:mt-6">
                          <div className="flex items-center space-x-2 text-slate-600 text-xs sm:text-sm">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                            <span>{t('tourismsection.timelineSection.legend')}</span> {/* ← TRADUCIBLE */}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SECCIÓN VOCES */}
                    {seccionActiva === 'testimonios' && (
                      <div className="space-y-4 sm:space-y-6">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-slate-900">
                          {t('tourismsection.voicesSection.title')} {/* ← TRADUCIBLE */}
                        </h2>
                        
                        {/* Testimonios */}
                        {lugar.testimonios && lugar.testimonios.length > 0 ? (
                          <div className="space-y-4 sm:space-y-6">
                            {lugar.testimonios.map((testimonio, index) => (
                              <div key={index} className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                                <div className="flex items-start space-x-3 sm:space-x-4">
                                  <div className="bg-green-500 text-white p-2 sm:p-3 rounded-full flex-shrink-0">
                                    <Quote className="h-4 w-4 sm:h-5 sm:w-5" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 mb-2 sm:mb-3">
                                      <span className="font-semibold font-serif text-slate-800 text-sm sm:text-base">{testimonio.persona}</span>
                                      <span className="text-slate-500 text-xs sm:text-sm">{testimonio.edad} {t('tourismsection.voicesSection.age')}</span> {/* ← TRADUCIBLE */}
                                    </div>
                                    <p className="text-slate-700 leading-relaxed italic text-sm sm:text-base">
                                      "{testimonio.testimonio}"
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-slate-100 rounded-2xl p-6 sm:p-8 text-center">
                            <Users className="h-8 w-8 sm:h-12 sm:w-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
                            <p className="text-slate-600 text-sm sm:text-base">
                              {t('tourismsection.voicesSection.noTestimonials')} {/* ← TRADUCIBLE */}
                            </p>
                          </div>
                        )}

                        {/* Técnicas Tradicionales */}
                        {lugar.tecnicasTradicionales && lugar.tecnicasTradicionales.length > 0 && (
                          <div className="mt-6 sm:mt-8">
                            <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 mb-3 sm:mb-4">
                              {t('tourismsection.voicesSection.traditionalTechniques')} {/* ← TRADUCIBLE */}
                            </h3>
                            <div className="grid gap-3 sm:gap-4">
                              {lugar.tecnicasTradicionales.map((tecnica, index) => (
                                <div key={index} className="bg-amber-50 rounded-xl p-3 sm:p-4 border border-amber-200">
                                  <h4 className="font-semibold font-serif text-slate-800 mb-1 sm:mb-2 text-sm sm:text-base">{tecnica.nombre}</h4>
                                  <p className="text-slate-700 mb-2 text-xs sm:text-sm">{tecnica.descripcion}</p>
                                  <div className="flex items-center text-slate-600 text-xs sm:text-sm">
                                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                    <span>{t('tourismsection.voicesSection.origin')}: {tecnica.origen}</span> {/* ← TRADUCIBLE */}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Galería Histórica Responsive */}
                {lugar.galeriaHistorica && lugar.galeriaHistorica.length > 0 && (
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200">
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 mb-3 sm:mb-4">
                      {t('tourismsection.gallery.historicalArchive')} {/* ← TRADUCIBLE */}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                      {lugar.galeriaHistorica.map((imagen, index) => (
                        <motion.div
                          key={index}
                          className="relative aspect-square bg-slate-100 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setImagenExpandida(imagen.url)}
                        >
                          <img
                            src={imagen.url}
                            alt={imagen.titulo}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-2 sm:p-3">
                            <div className="transform translate-y-1 sm:translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                              <p className="text-white text-xs sm:text-sm font-semibold font-serif line-clamp-1">
                                {imagen.titulo}
                              </p>
                              <p className="text-white/80 text-xs">
                                {imagen.epoca}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navegación entre Lugares Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-between items-center mt-8 sm:mt-12 gap-4"
        >
          <button
            onClick={() => {
              setLugarSeleccionado(prev => Math.max(0, prev - 1));
              setVideoReproduciendo(null);
            }}
            disabled={lugarSeleccionado === 0}
            className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold font-serif 
              transition-all text-sm sm:text-base flex-1 sm:flex-none justify-center 
              disabled:opacity-50 disabled:cursor-not-allowed 
              ${
                lugarSeleccionado > 0
                  ? `bg-gradient-to-r ${colorActual.from} ${colorActual.to} text-white shadow-lg`
                  : 'bg-white border border-slate-300 text-slate-700 hover:border-green-600'
              }`}
          >
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 rotate-180" />
            <span className="hidden sm:inline">{t('tourismsection.navigation.previous')}</span> {/* ← TRADUCIBLE */}
          </button>

          <div className="flex items-center space-x-1 sm:space-x-2">
            {historiasData.lugaresHistoricos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setLugarSeleccionado(index);
                  setVideoReproduciendo(null);
                }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  lugarSeleccionado === index
                    ? 'bg-teal-600 scale-125'
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              setLugarSeleccionado(prev => Math.min(historiasData.lugaresHistoricos.length - 1, prev + 1));
              setVideoReproduciendo(null);
            }}
            disabled={lugarSeleccionado === historiasData.lugaresHistoricos.length - 1}
            className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold font-serif 
              transition-all text-sm sm:text-base flex-1 sm:flex-none justify-center 
              disabled:opacity-50 disabled:cursor-not-allowed 
              ${
                lugarSeleccionado < historiasData.lugaresHistoricos.length - 1
                  ? `bg-gradient-to-r ${colorActual.from} ${colorActual.to} text-white shadow-lg`
                  : 'bg-white border border-slate-300 text-slate-700 hover:border-green-600'
              }`}
          >
            <span className="hidden sm:inline">{t('tourismsection.navigation.next')}</span> {/* ← TRADUCIBLE */}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </motion.div>
      </div>

      {/* Modal para Imagen Expandida */}
      <AnimatePresence>
        {imagenExpandida && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setImagenExpandida(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imagenExpandida}
                alt="Imagen expandida"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setImagenExpandida(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-colors"
                aria-label={t('tourismsection.modals.close')} // ← TRADUCIBLE
              >
                <X className="h-4 w-4 sm:h-6 sm:w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal para Video Expandido */}
      <AnimatePresence>
        {videoExpandido && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setVideoExpandido(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={videoExpandido}
                controls
                autoPlay
                className="w-full h-full object-cover rounded-2xl"
              />
              <button
                onClick={() => setVideoExpandido(null)}
                className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all"
                aria-label={t('tourismsection.modals.close')} // ← TRADUCIBLE
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}