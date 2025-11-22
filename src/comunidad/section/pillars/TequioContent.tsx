// src/sections/TequioContent.tsx
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Handshake, 
  Users, 
  Hammer,
  TreePine,
  Wrench,
  Heart,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react'; // ← AGREGAR useMemo
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

// --- Imágenes del Carrusel ---
const useCarouselImages = () => {
  const { t } = useTranslation();
  
  return [
    {
      url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763117549/caminos-rurales_rjmkr2.jpg',
      title: t('tequio.carousel.collectiveWorkRoads'), // ← TRADUCIBLE
      description: t('tequio.carousel.roadsDescription') // ← TRADUCIBLE
    },
    {
      url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763117549/rurales_wast1n.jpg',
      title: t('tequio.carousel.communityReforestation'), // ← TRADUCIBLE
      description: t('tequio.carousel.reforestationDescription') // ← TRADUCIBLE
    },
    {
      url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763074242/Puente_fwky8r.jpg',
      title: t('tequio.carousel.springCleaning'), // ← TRADUCIBLE
      description: t('tequio.carousel.springDescription') // ← TRADUCIBLE
    },
    {
      url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763073856/dansz_psbbaj.jpg',
      title: t('tequio.carousel.tequioCelebration'), // ← TRADUCIBLE
      description: t('tequio.carousel.celebrationDescription') // ← TRADUCIBLE
    }
  ];
};

// --- Datos de Proyectos de Tequio ---
const useProyectosData = () => {
  const { t } = useTranslation();
  
  return [
    {
      nombre: t('tequio.projects.0.name'), // ← TRADUCIBLE
      descripcion: t('tequio.projects.0.description'), // ← TRADUCIBLE
      participantes: 50,
      frecuencia: 'Mensual',
      ultimaRealizacion: 'Octubre 2024',
      beneficios: t('tequio.projects.0.benefits') as unknown as string[], // ← TRADUCIBLE
      herramientas: t('tequio.projects.0.tools') as unknown as string[], // ← TRADUCIBLE
      color: 'from-emerald-500 to-teal-600',
      icon: Hammer
    },
    {
      nombre: t('tequio.projects.1.name'), // ← TRADUCIBLE
      descripcion: t('tequio.projects.1.description'), // ← TRADUCIBLE
      participantes: 35,
      frecuencia: 'Trimestral',
      ultimaRealizacion: 'Septiembre 2024',
      beneficios: t('tequio.projects.1.benefits') as unknown as string[], // ← TRADUCIBLE
      herramientas: t('tequio.projects.1.tools') as unknown as string[], // ← TRADUCIBLE
      color: 'from-green-500 to-emerald-600',
      icon: TreePine
    },
    {
      nombre: t('tequio.projects.2.name'), // ← TRADUCIBLE
      descripcion: t('tequio.projects.2.description'), // ← TRADUCIBLE
      participantes: 40,
      frecuencia: 'Bimestral',
      ultimaRealizacion: 'Agosto 2024',
      beneficios: t('tequio.projects.2.benefits') as unknown as string[], // ← TRADUCIBLE
      herramientas: t('tequio.projects.2.tools') as unknown as string[], // ← TRADUCIBLE
      color: 'from-cyan-500 to-blue-600',
      icon: Wrench
    },
    {
      nombre: t('tequio.projects.3.name'), // ← TRADUCIBLE
      descripcion: t('tequio.projects.3.description'), // ← TRADUCIBLE
      participantes: 25,
      frecuencia: 'Semestral',
      ultimaRealizacion: 'Julio 2024',
      beneficios: t('tequio.projects.3.benefits') as unknown as string[], // ← TRADUCIBLE
      herramientas: t('tequio.projects.3.tools') as unknown as string[], // ← TRADUCIBLE
      color: 'from-blue-500 to-cyan-600',
      icon: Users
    }
  ];
};

// --- Testimonios de Participantes ---
const useTestimoniosData = () => {
  const { t } = useTranslation();
  
  return [
    {
      nombre: t('tequio.testimonials.0.name'), // ← TRADUCIBLE
      edad: 68,
      participacion: t('tequio.testimonials.0.participation'), // ← TRADUCIBLE
      testimonio: t('tequio.testimonials.0.testimonial'), // ← TRADUCIBLE
      icon: Heart
    },
    {
      nombre: t('tequio.testimonials.1.name'), // ← TRADUCIBLE
      edad: 42,
      participacion: t('tequio.testimonials.1.participation'), // ← TRADUCIBLE
      testimonio: t('tequio.testimonials.1.testimonial'), // ← TRADUCIBLE
      icon: Award
    },
    {
      nombre: t('tequio.testimonials.2.name'), // ← TRADUCIBLE
      edad: 28,
      participacion: t('tequio.testimonials.2.participation'), // ← TRADUCIBLE
      testimonio: t('tequio.testimonials.2.testimonial'), // ← TRADUCIBLE
      icon: Users
    }
  ];
};

// --- Beneficios del Tequio ---
const useBeneficiosData = () => {
  const { t } = useTranslation();
  
  return [
    {
      titulo: t('tequio.benefits.0.title'), // ← TRADUCIBLE
      descripcion: t('tequio.benefits.0.description'), // ← TRADUCIBLE
      icon: Users,
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      titulo: t('tequio.benefits.1.title'), // ← TRADUCIBLE
      descripcion: t('tequio.benefits.1.description'), // ← TRADUCIBLE
      icon: TreePine,
      color: 'bg-green-100 text-green-700'
    },
    {
      titulo: t('tequio.benefits.2.title'), // ← TRADUCIBLE
      descripcion: t('tequio.benefits.2.description'), // ← TRADUCIBLE
      icon: Heart,
      color: 'bg-rose-100 text-rose-700'
    },
    {
      titulo: t('tequio.benefits.3.title'), // ← TRADUCIBLE
      descripcion: t('tequio.benefits.3.description'), // ← TRADUCIBLE
      icon: Award,
      color: 'bg-amber-100 text-amber-700'
    }
  ];
};

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

interface TequioContentProps {
  onBack?: () => void;
}

// Componente del Carrusel
function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselImages = useCarouselImages(); // ← USAR HOOK

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselImages.length]);

  return (
    <motion.div 
      className="relative h-96 sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Imagen Principal */}
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
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
            <div className="p-8 text-white w-full">
              <motion.h3 
                className="text-2xl sm:text-3xl font-bold font-serif mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {carouselImages[currentIndex].title}
              </motion.h3>
              <motion.p 
                className="text-lg text-emerald-100 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {carouselImages[currentIndex].description}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Botones de Navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
      >
        <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-emerald-400 scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
      {/* Contador */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
        {currentIndex + 1} / {carouselImages.length}
      </div>
    </motion.div>
  );
}

export function TequioContent({  }: TequioContentProps) {
  const { t } = useTranslation(); // ← AGREGAR HOOK
  
  // USAR useMemo PARA ESTABILIZAR LOS DATOS
  const proyectosData = useMemo(() => useProyectosData(), [t]);
  const beneficiosData = useMemo(() => useBeneficiosData(), [t]);
  const testimoniosData = useMemo(() => useTestimoniosData(), [t]);

  return (
    <section className="w-full bg-gradient-to-b from-emerald-50 to-teal-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Header --- */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-slate-900 mb-4">
            {t('tequio.title')}{' '} {/* ← TRADUCIBLE */}
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              {t('tequio.title').split(': ')[1]} {/* ← MANTIENE "Trabajo Colectivo" */}
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t('tequio.subtitle')} {/* ← TRADUCIBLE */}
          </p>
        </motion.div>

        {/* --- Carrusel de Imágenes --- */}
        <ImageCarousel />

        {/* --- Hero Section Informativa --- */}
        <motion.div
          className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 text-white mb-16 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
                {t('tequio.unitedForCommonGood')} {/* ← TRADUCIBLE */}
              </h2>
              <p className="text-emerald-100 text-lg leading-relaxed mb-6">
                {t('tequio.heroDescription')} {/* ← TRADUCIBLE */}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold font-serif">{t('tequio.ancestralTradition')}</span> {/* ← TRADUCIBLE */}
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold font-serif">{t('tequio.solidarity')}</span> {/* ← TRADUCIBLE */}
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="font-semibold font-serif">{t('tequio.collectiveProgress')}</span> {/* ← TRADUCIBLE */}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                <Handshake className="h-24 w-24 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Proyectos de Tequio --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4">
              {t('tequio.communityProjects')} {/* ← TRADUCIBLE */}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('tequio.projectsDescription')} {/* ← TRADUCIBLE */}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {proyectosData.map((proyecto, index) => (
              <motion.div
                key={`proyecto-${index}`} // ← KEY ESTABLE
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-emerald-100"
              >
                {/* Header con gradiente */}
                <div className={`bg-gradient-to-r ${proyecto.color} p-6 text-white`}>
                  <div className="flex items-center">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm mr-4">
                      <proyecto.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold font-serif text-xl">{proyecto.nombre}</h4>
                      <p className="text-emerald-100 text-sm mt-1">
                        {proyecto.frecuencia} • {proyecto.participantes} {t('tequio.participants').toLowerCase()} {/* ← TRADUCIBLE */}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {proyecto.descripcion}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-emerald-50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold font-serif text-emerald-600">{proyecto.participantes}</div>
                      <div className="text-xs text-emerald-800">{t('tequio.participants')}</div> {/* ← TRADUCIBLE */}
                    </div>
                    <div className="bg-teal-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold font-serif text-teal-600">{proyecto.frecuencia}</div>
                      <div className="text-xs text-teal-800">{t('tequio.frequency')}</div> {/* ← TRADUCIBLE */}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="font-semibold font-serif text-slate-800 mb-3 text-sm">
                      {t('tequio.benefitsForCommunity')} {/* ← TRADUCIBLE */}
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      {proyecto.beneficios.map((beneficio, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                          <span className="text-slate-700 text-sm">{beneficio}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-xl p-4">
                    <h5 className="font-semibold font-serif text-emerald-800 mb-2 text-sm">
                      {t('tequio.toolsUsed')} {/* ← TRADUCIBLE */}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {proyecto.herramientas.map((herramienta, idx) => (
                        <span 
                          key={idx}
                          className="bg-white text-emerald-700 px-3 py-1 rounded-full text-sm border border-emerald-200"
                        >
                          {herramienta}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Beneficios del Tequio --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4">
              {t('tequio.whyTequioStrengthens')} {/* ← TRADUCIBLE */}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('tequio.benefitsDescription')} {/* ← TRADUCIBLE */}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {beneficiosData.map((beneficio, index) => (
              <motion.div
                key={`beneficio-${index}`} // ← KEY ESTABLE
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-emerald-100"
              >
                <div className={`p-3 rounded-xl ${beneficio.color} inline-flex mb-4`}>
                  <beneficio.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold font-serif text-slate-800 text-lg mb-3">{beneficio.titulo}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{beneficio.descripcion}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Testimonios --- */}
        <div className="mb-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4">
              {t('tequio.communityVoices')} {/* ← TRADUCIBLE */}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('tequio.testimonialsDescription')} {/* ← TRADUCIBLE */}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimoniosData.map((testimonio, index) => (
              <motion.div
                key={`testimonio-${index}`} // ← KEY ESTABLE
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-emerald-100 p-3 rounded-xl mr-4">
                    <testimonio.icon className="h-6 w-6 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold font-serif text-slate-800">{testimonio.nombre}</h4>
                    <p className="text-emerald-600 text-sm">{testimonio.edad} años • {testimonio.participacion}</p>
                  </div>
                </div>
                <p className="text-slate-600 italic leading-relaxed">
                  "{testimonio.testimonio}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Sección Informativa Final --- */}
        <motion.div
          className="text-center bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-10 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Handshake className="h-16 w-16 text-white mx-auto mb-4" />
          <h3 className="text-3xl font-bold font-serif text-white mb-4">
            {t('tequio.culturalHeritage')} {/* ← TRADUCIBLE */}
          </h3>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto mb-6">
            {t('tequio.heritageDescription')} {/* ← TRADUCIBLE */}
          </p>
          <div className="bg-white/20 rounded-xl p-4 inline-flex backdrop-blur-sm">
            <span className="text-white font-semibold font-serif">{t('tequio.organizedCommunity')}</span> {/* ← TRADUCIBLE */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}