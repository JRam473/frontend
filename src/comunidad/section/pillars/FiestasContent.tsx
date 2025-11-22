// src/sections/FiestasContent.tsx
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  PartyPopper, 
  Music, 
  Calendar,
  Users,
  Clock,
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Palette,
  Drum
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

// --- Imágenes del Carrusel Festivo ---
const carouselImages = [
  {
    url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763073856/dansz_psbbaj.jpg',
    titleKey: 'festivities.carousel.patronalFestival' as const,
    descriptionKey: 'festivities.carousel.patronalDescription' as const
  },
  {
    url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763093406/Captura_de_pantalla_395_uoumxl.png',
    titleKey: 'festivities.carousel.moorsDance' as const,
    descriptionKey: 'festivities.carousel.moorsDescription' as const
  },
  {
    url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763066439/culture-fallback_tajxm4.webp',
    titleKey: 'festivities.carousel.dayOfTheDead' as const,
    descriptionKey: 'festivities.carousel.dayOfTheDeadDescription' as const
  },
  {
    url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763072851/Tradiciones_h6vn7b.jpg',
    titleKey: 'festivities.carousel.traditionalCarnival' as const,
    descriptionKey: 'festivities.carousel.carnivalDescription' as const
  },
  {
    url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763052576/hero-home-image_anavv1.png',
    titleKey: 'festivities.carousel.holyWeek' as const,
    descriptionKey: 'festivities.carousel.holyWeekDescription' as const
  }
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

interface FiestasContentProps {
  onBack?: () => void;
}

// Componente del Carrusel
function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t } = useTranslation(); // ← AGREGAR HOOK

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <motion.div 
      className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <motion.div
        key={currentIndex}
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${carouselImages[currentIndex].url})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
            <div className="px-6 sm:px-8 pb-20 sm:pb-12 pt-16 text-white w-full">
              <motion.h3 
                className="text-2xl sm:text-3xl font-bold font-serif mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {t(carouselImages[currentIndex].titleKey)} {/* ← TRADUCIBLE */}
              </motion.h3>
              <motion.p 
                className="text-lg text-rose-100 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {t(carouselImages[currentIndex].descriptionKey)} {/* ← TRADUCIBLE */}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-[35%] sm:top-1/2 transform -translate-y-1/2 
        bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-full 
        p-2 sm:p-3 transition-all duration-300 group"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-[35%] sm:top-1/2 transform -translate-y-1/2 
        bg-white/30 hover:bg-white/40 backdrop-blur-sm rounded-full 
        p-2 sm:p-3 transition-all duration-300 group"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-rose-400 scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/50 backdrop-blur-sm 
rounded-full px-2.5 py-1 text-xs sm:text-sm text-white">
        {currentIndex + 1} / {carouselImages.length}
      </div>
    </motion.div>
  );
}

export function FiestasContent({}: FiestasContentProps) {
  const { t, language } = useTranslation(); // ← AGREGAR HOOK

  // --- Datos de Festividades Principales CON useMemo ---
  const festividadesData = useMemo(() => [
    {
      nombre: t('festivities.festivals.0.name'),
      fecha: t('festivities.festivals.0.date'),
      descripcion: t('festivities.festivals.0.description'),
      actividades: t('festivities.festivals.0.activities') as unknown as string[],
      duracion: t('festivities.festivals.0.duration'),
      color: 'from-blue-500 to-cyan-600',
      icon: Star,
      participantes: t('festivities.festivals.0.participants'),
      elementoDestacado: t('festivities.festivals.0.highlight')
    },
    {
      nombre: t('festivities.festivals.1.name'),
      fecha: t('festivities.festivals.1.date'),
      descripcion: t('festivities.festivals.1.description'),
      actividades: t('festivities.festivals.1.activities') as unknown as string[],
      duracion: t('festivities.festivals.1.duration'),
      color: 'from-purple-500 to-pink-600',
      icon: Heart,
      participantes: t('festivities.festivals.1.participants'),
      elementoDestacado: t('festivities.festivals.1.highlight')
    },
    {
      nombre: t('festivities.festivals.2.name'),
      fecha: t('festivities.festivals.2.date'),
      descripcion: t('festivities.festivals.2.description'),
      actividades: t('festivities.festivals.2.activities') as unknown as string[],
      duracion: t('festivities.festivals.2.duration'),
      color: 'from-rose-500 to-red-600',
      icon: PartyPopper,
      participantes: t('festivities.festivals.2.participants'),
      elementoDestacado: t('festivities.festivals.2.highlight')
    },
    {
      nombre: t('festivities.festivals.3.name'),
      fecha: t('festivities.festivals.3.date'),
      descripcion: t('festivities.festivals.3.description'),
      actividades: t('festivities.festivals.3.activities') as unknown as string[],
      duracion: t('festivities.festivals.3.duration'),
      color: 'from-violet-500 to-purple-600',
      icon: Users,
      participantes: t('festivities.festivals.3.participants'),
      elementoDestacado: t('festivities.festivals.3.highlight')
    }
  ], [t, language]);

  // --- Danzas y Expresiones Culturales CON useMemo ---
  const danzasData = useMemo(() => [
    {
      nombre: t('festivities.dances.0.name'),
      descripcion: t('festivities.dances.0.description'),
      origen: t('festivities.dances.0.origin'),
      participantes: t('festivities.dances.0.participants'),
      temporada: t('festivities.dances.0.season'),
      icon: Drum,
      vestimenta: t('festivities.dances.0.clothing'),
      significado: t('festivities.dances.0.meaning')
    },
    {
      nombre: t('festivities.dances.1.name'),
      descripcion: t('festivities.dances.1.description'),
      origen: t('festivities.dances.1.origin'),
      participantes: t('festivities.dances.1.participants'),
      temporada: t('festivities.dances.1.season'),
      icon: Music,
      vestimenta: t('festivities.dances.1.clothing'),
      significado: t('festivities.dances.1.meaning')
    },
    {
      nombre: t('festivities.dances.2.name'),
      descripcion: t('festivities.dances.2.description'),
      origen: t('festivities.dances.2.origin'),
      participantes: t('festivities.dances.2.participants'),
      temporada: t('festivities.dances.2.season'),
      icon: PartyPopper,
      vestimenta: t('festivities.dances.2.clothing'),
      significado: t('festivities.dances.2.meaning')
    }
  ], [t, language]);

  // --- Patrimonio Cultural Inmaterial CON useMemo ---
  const patrimonioData = useMemo(() => [
    {
      titulo: t('festivities.heritage.0.title'),
      descripcion: t('festivities.heritage.0.description'),
      icon: Music,
      color: 'from-blue-500 to-cyan-500',
      estado: t('festivities.heritage.0.status')
    },
    {
      titulo: t('festivities.heritage.1.title'),
      descripcion: t('festivities.heritage.1.description'),
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      estado: t('festivities.heritage.1.status')
    },
    {
      titulo: t('festivities.heritage.2.title'),
      descripcion: t('festivities.heritage.2.description'),
      icon: Heart,
      color: 'from-rose-500 to-red-500',
      estado: t('festivities.heritage.2.status')
    },
    {
      titulo: t('festivities.heritage.3.title'),
      descripcion: t('festivities.heritage.3.description'),
      icon: Users,
      color: 'from-violet-500 to-purple-500',
      estado: t('festivities.heritage.3.status')
    }
  ], [t, language]);

  return (
    <section className="w-full bg-gradient-to-b from-rose-50 to-pink-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header con Diseño Circular --- */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
            <div className="relative bg-white rounded-full p-4 shadow-lg">
              <PartyPopper className="h-12 w-12 text-rose-600" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-slate-900 mb-4">
            {t('festivities.title')}{' '} {/* ← TRADUCIBLE */}
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              {t('festivities.title').split(' ')[1]} {/* ← TRADUCIBLE */}
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t('festivities.subtitle')} {/* ← TRADUCIBLE */}
          </p>
        </motion.div>

        {/* --- Carrusel de Imágenes --- */}
        <ImageCarousel />

        {/* --- Hero Section con Diseño Asimétrico --- */}
        <motion.div
          className="relative bg-white rounded-3xl p-8 md:p-12 mb-16 shadow-2xl border border-rose-100 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/10 to-pink-600/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-rose-500/5 to-pink-600/5 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Sparkles className="h-8 w-8 text-rose-500 mr-3" />
                <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900">
                  {t('festivities.celebratingOurIdentity')} {/* ← TRADUCIBLE */}
                </h2>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                {t('festivities.identityDescription')} {/* ← TRADUCIBLE */}
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-rose-100 text-rose-800 rounded-full px-4 py-2 text-sm font-medium font-serif">
                  {t('festivities.livingTradition')} {/* ← TRADUCIBLE */}
                </div>
                <div className="bg-pink-100 text-pink-800 rounded-full px-4 py-2 text-sm font-medium font-serif">
                  {t('festivities.communityUnity')} {/* ← TRADUCIBLE */}
                </div>
                <div className="bg-rose-50 text-rose-700 rounded-full px-4 py-2 text-sm font-medium font-serif">
                  {t('festivities.culturalHeritage')} {/* ← TRADUCIBLE */}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-8 rounded-2xl text-white shadow-lg">
                  <Users className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-rose-200">
                  <Calendar className="h-8 w-8 text-rose-600" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Festividades en Timeline Horizontal --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4">
              {t('festivities.annualFestiveCalendar')} {/* ← TRADUCIBLE */}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('festivities.calendarDescription')} {/* ← TRADUCIBLE */}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {festividadesData.map((festividad, index) => (
              <motion.div
                key={`festival-${index}`}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-rose-100 group"
              >
                <div className={`bg-gradient-to-r ${festividad.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <festividad.icon className="h-8 w-8 text-white" />
                      <span className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium font-serif">
                        {festividad.duracion}
                      </span>
                    </div>
                    <h4 className="font-bold font-serif text-xl mb-2">{festividad.nombre}</h4>
                    <p className="text-white/90 text-sm">{festividad.fecha}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-700 leading-relaxed mb-4 text-sm">
                    {festividad.descripcion}
                  </p>

                  <div className="mb-4">
                    <h5 className="font-semibold font-serif text-slate-800 mb-2 text-sm">
                      {t('festivities.labels.highlightedActivities')}: {/* ← TRADUCIBLE */}
                    </h5>
                    <div className="space-y-1">
                      {festividad.actividades.slice(0, 3).map((actividad, idx) => (
                        <div key={idx} className="flex items-center text-slate-600 text-sm">
                          <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-2"></div>
                          {actividad}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-rose-50 rounded-lg p-3">
                    <p className="text-rose-700 text-sm font-medium font-serif text-center">
                      {festividad.elementoDestacado}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Danzas Tradicionales con Diseño de Tarjetas Expandidas --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4">
              {t('festivities.danceExpressions')} {/* ← TRADUCIBLE */}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('festivities.danceDescription')} {/* ← TRADUCIBLE */}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {danzasData.map((danza, index) => (
              <motion.div
                key={`dance-${index}`}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-rose-100 group"
              >
                <div className="bg-gradient-to-r from-rose-400 to-pink-500 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <danza.icon className="h-8 w-8 text-white" />
                    <span className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium font-serif">
                      {danza.temporada}
                    </span>
                  </div>
                  <h4 className="font-bold font-serif text-xl mt-3">{danza.nombre}</h4>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-700 mb-4 leading-relaxed text-sm">
                    {danza.descripcion}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-slate-600 text-sm">
                      <Clock className="h-4 w-4 mr-2 text-rose-500" />
                      <span><strong>{t('festivities.labels.origin')}:</strong> {danza.origen}</span> {/* ← TRADUCIBLE */}
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <Users className="h-4 w-4 mr-2 text-rose-500" />
                      <span><strong>Participantes:</strong> {danza.participantes}</span>
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <Palette className="h-4 w-4 mr-2 text-rose-500" />
                      <span><strong>{t('festivities.labels.clothing')}:</strong> {danza.vestimenta}</span> {/* ← TRADUCIBLE */}
                    </div>
                  </div>

                  <div className="bg-rose-50 rounded-lg p-3">
                    <p className="text-rose-700 text-sm text-center">
                      <strong>{t('festivities.labels.meaning')}:</strong> {danza.significado} {/* ← TRADUCIBLE */}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Patrimonio Cultural con Diseño de Mosaico --- */}
        <div className="mb-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4">
              {t('festivities.culturalHeritage')} {/* ← TRADUCIBLE */}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('festivities.heritageDescription')} {/* ← TRADUCIBLE */}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-pink-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {patrimonioData.map((item, index) => (
              <motion.div
                key={`heritage-${index}`}
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-rose-100 group hover:scale-105"
              >
                <div className={`bg-gradient-to-r ${item.color} p-4 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold font-serif text-slate-800 text-lg mb-3">{item.titulo}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.descripcion}</p>
                <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-medium font-serif">
                  {item.estado}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Sección Final con Diseño de Medallón --- */}
        <motion.div
          className="text-center bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12"></div>
          
          <div className="relative">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 inline-flex mb-6">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold font-serif text-white mb-4">
              {t('festivities.memoryBecomesCelebration')} {/* ← TRADUCIBLE */}
            </h3>
            <p className="text-rose-100 text-lg max-w-2xl mx-auto mb-6">
              {t('festivities.finalDescription')} {/* ← TRADUCIBLE */}
            </p>
            <div className="bg-white/20 rounded-xl p-4 inline-flex backdrop-blur-sm">
              <span className="text-white font-semibold font-serif">
                {t('festivities.whereTraditionLives')} {/* ← TRADUCIBLE */}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}