// src/sections/EducacionContent.tsx
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  School2, 
  BookOpen, 
  GraduationCap,
  Users,
  Lightbulb,
  Trophy,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  Brain,
  Sparkles,
  Target,
  Rocket
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

// --- Datos del Carrusel Educativo CON useMemo ---
const useCarouselImages = () => {
  const { t } = useTranslation();
  
  return [
    {
      url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763116534/Escuelas_o9s56l.jpg',
      title: t('education.carousel.learningCommunity'),
      description: t('education.carousel.learningCommunityDesc')
    },
    {
      url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763116534/Escuelas_o9s56l.jpg',
      title: t('education.carousel.educationalFacilities'),
      description: t('education.carousel.educationalFacilitiesDesc')
    },
    {
      url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763116534/Escuelas_o9s56l.jpg',
      title: t('education.carousel.practicalActivities'),
      description: t('education.carousel.practicalActivitiesDesc')
    }
  ];
};

// --- Datos de Instituciones Educativas CON useMemo ---
const useInstitucionesData = () => {
  const { t } = useTranslation();
  
 return [
  {
    nombre: t('education.institutionss.0.name'),
    nivel: t('education.institutionss.0.level'),
    descripcion: t('education.institutionss.0.description'),
    estudiantes: 45,
    docentes: 3,
    fundacion: 1985,
    programas: [
      'Educación inicial',
      'Talleres para padres',
      'Activación física',
      'Estimulación temprana'
    ],
    color: 'from-cyan-500 to-blue-600',
    icon: BookOpen,
    enfoque: t('education.institutionss.0.focus'),
    lema: t('education.institutionss.0.motto')
  },
    {
      nombre: t('education.institutionss.1.name'),
      nivel: t('education.institutionss.1.level'),
      descripcion: t('education.institutionss.1.description'),
      estudiantes: 120,
      docentes: 8,
      fundacion: 1972,
      programas: ['Educación bilingüe', 'Huerto escolar', 'Taller de artes', 'Robótica básica'],
      color: 'from-blue-500 to-indigo-600',
      icon: School2,
      enfoque: t('education.institutionss.1.focus'),
      lema: t('education.institutionss.1.motto')
    },
    {
      nombre: t('education.institutionss.2.name'),
      nivel: t('education.institutionss.2.level'),
      descripcion: t('education.institutionss.2.description'),
      estudiantes: 85,
      docentes: 6,
      fundacion: 1990,
      programas: ['Club de ciencias', 'Proyectos sustentables', 'Orientación vocacional', 'Programación'],
      color: 'from-indigo-500 to-purple-600',
      icon: GraduationCap,
      enfoque: t('education.institutionss.2.focus'),
      lema: t('education.institutionss.2.motto')
    },
    {
      nombre: t('education.institutionss.3.name'),
      nivel: t('education.institutionss.3.level'),
      descripcion: t('education.institutionss.3.description'),
      estudiantes: 60,
      docentes: 5,
      fundacion: 2010,
      programas: ['Turismo sustentable', 'Agroecología', 'Tecnologías de la información', 'Emprendimiento'],
      color: 'from-violet-500 to-purple-700',
      icon: Users,
      enfoque: t('education.institutionss.3.focus'),
      lema: t('education.institutionss.3.motto')
    }
  ];
};

// --- Pilares Educativos CON useMemo ---
const usePilaresData = () => {
  const { t } = useTranslation();
  
  return [
    {
      titulo: t('education.pillars.0.title'),
      descripcion: t('education.pillars.0.description'),
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      metricas: t('education.pillars.0.metrics') as unknown as string[]
    },
    {
      titulo: t('education.pillars.1.title'),
      descripcion: t('education.pillars.1.description'),
      icon: HeartHandshake,
      color: 'from-purple-500 to-pink-500',
      metricas: t('education.pillars.1.metrics') as unknown as string[]
    },
    {
      titulo: t('education.pillars.2.title'),
      descripcion: t('education.pillars.2.description'),
      icon: Rocket,
      color: 'from-green-500 to-emerald-500',
      metricas: t('education.pillars.2.metrics') as unknown as string[]
    },
    {
      titulo: t('education.pillars.3.title'),
      descripcion: t('education.pillars.3.description'),
      icon: Sparkles,
      color: 'from-amber-500 to-orange-500',
      metricas: t('education.pillars.3.metrics') as unknown as string[]
    }
  ];
};

// --- Logros Colectivos CON useMemo ---
const useLogrosColectivosData = () => {
  const { t } = useTranslation();
  
  return [
    {
      año: t('education.achievements.0.year'),
      logro: t('education.achievements.0.achievement'),
      descripcion: t('education.achievements.0.description'),
      participantes: 'Toda la comunidad educativa',
      icon: Trophy,
      impacto: t('education.achievements.0.impact')
    },
    {
      año: t('education.achievements.1.year'),
      logro: t('education.achievements.1.achievement'),
      descripcion: t('education.achievements.1.description'),
      participantes: 'Estudiantes de bachillerato',
      icon: Lightbulb,
      impacto: t('education.achievements.1.impact')
    },
    {
      año: t('education.achievements.2.year'),
      logro: t('education.achievements.2.achievement'),
      descripcion: t('education.achievements.2.description'),
      participantes: 'Comunidad completa',
      icon: Sparkles,
      impacto: t('education.achievements.2.impact')
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

interface EducacionContentProps {
  onBack?: () => void;
}

// Componente del Carrusel
function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { language } = useTranslation();
  
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

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselImages.length]); // ← AGREGAR DEPENDENCIA

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
        key={`carousel-${currentIndex}-${language}`} // ← KEY CON IDIOMA
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
                {carouselImages[currentIndex].title}
              </motion.h3>
              <motion.p 
                className="text-lg text-blue-100 max-w-2xl"
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
      
      {/* Controles del carrusel (sin cambios) */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-[35%] sm:top-1/2 transform -translate-y-1/2 
        bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full 
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
            key={`indicator-${index}`}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-blue-400 scale-125' 
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

export function EducacionContent({}: EducacionContentProps) {
  const { t, language } = useTranslation();
  
  // USAR HOOKS CON useMemo
  const institucionesData = useInstitucionesData();
  const pilaresData = usePilaresData();
  const logrosColectivosData = useLogrosColectivosData();

  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-indigo-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header con Diseño de Libro Abierto --- */}
        <motion.div
          className="text-center mb-8 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative flex justify-center mb-6 px-4">
  {/* Glow de fondo */}
  <div className="absolute inset-0 max-w-md mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>

  {/* Tarjeta principal */}
  <div className="relative bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-200 w-full max-w-2xl">
    <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 text-center sm:text-left">
      
      {/* Icono */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 sm:p-4 rounded-xl mb-3 sm:mb-0">
        <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
      </div>

      {/* Texto */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-900 leading-tight">
          {t('education.transformativeEducation')}{' '}
          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          </span>
        </h1>

        <p className="text-slate-600 text-xs sm:text-sm mt-2">
          {t('education.knowledgeCommunityPurpose')}
        </p>
      </div>

    </div>
  </div>
</div>

          <p className="text-lg text-slate-600 max-w-3xl mx-auto mt-4">
            {t('education.investmentDescription')}
          </p>
        </motion.div>

        {/* --- Carrusel de Imágenes --- */}
        <ImageCarousel />

        {/* --- Hero Section con Diseño de Escalera Académica --- */}
        <motion.div
          className="relative bg-white rounded-3xl p-8 md:p-12 mb-16 shadow-2xl border border-blue-100 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full translate-x-20 translate-y-20"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
  {/* Columna izquierda (texto + estadísticas) */}
  <div className="lg:col-span-2">

    {/* Título */}
    <div className="flex flex-col sm:flex-row sm:items-center mb-5 sm:mb-6">
      <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 mb-3 sm:mb-0 sm:mr-4" />
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-slate-900 leading-tight">
        {t('education.buildingFutures')}{' '}
        <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          {t('education.purpose')}
        </span>
      </h2>
    </div>

    {/* Descripción */}
    <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6">
      {t('education.educationDescription')}
    </p>

    {/* Estadísticas responsivas */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
      
      <div className="text-center">
        <div className="text-xl sm:text-2xl font-bold font-serif text-blue-600">310+</div>
        <div className="text-xs sm:text-sm text-slate-600">{t('education.students')}</div>
      </div>

      <div className="text-center">
        <div className="text-xl sm:text-2xl font-bold font-serif text-indigo-600">22</div>
        <div className="text-xs sm:text-sm text-slate-600">{t('education.teachers')}</div>
      </div>

      <div className="text-center">
        <div className="text-xl sm:text-2xl font-bold font-serif text-blue-600">4</div>
        <div className="text-xs sm:text-sm text-slate-600">{t('education.institutions')}</div>
      </div>

      <div className="text-center">
        <div className="text-xl sm:text-2xl font-bold font-serif text-indigo-600">49</div>
        <div className="text-xs sm:text-sm text-slate-600">{t('education.yearsTradition')}</div>
      </div>

    </div>
  </div>
</div>

        </motion.div>

        {/* --- Pilares Educativos en Diseño de Diamante --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4">
              {t('education.educationPillars')}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('education.educationPillarsDescription')}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-4"></div>
          </motion.div>
          
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {pilaresData.map((pilar, index) => (
              <motion.div
                key={`pilar-${index}-${language}`} // ← KEY CON IDIOMA
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-blue-100 group hover:scale-105"
              >
                <div className={`bg-gradient-to-r ${pilar.color} p-4 rounded-xl inline-flex mb-4 group-hover:scale-110 transition-transform`}>
                  <pilar.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-bold font-serif text-slate-800 text-lg mb-3">{pilar.titulo}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{pilar.descripcion}</p>
                <div className="space-y-2">
                  {pilar.metricas.map((metrica, idx) => (
                    <div key={`metrica-${idx}`} className="flex items-center text-slate-500 text-xs">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      {metrica}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Trayectoria Educativa en Diseño de Línea de Tiempo Vertical --- */}
<div className="mb-20">
  {/* Título */}
  <motion.div
    className="text-center mb-12"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4">
      {t('education.educationalPath')}
    </h3>
    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
      {t('education.educationalPath')}
    </p>
    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-4"></div>
  </motion.div>

  <div className="relative">
    {/* Línea central en Desktop / Lateral en Mobile */}
    <div className="absolute sm:left-1/2 sm:-translate-x-1/2 left-2 top-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 h-full rounded-full"></div>

    <div className="space-y-12">
      {institucionesData.map((institucion, index) => {
        const isEven = index % 2 === 0;

        return (
          <motion.div
            key={`institucion-${index}-${language}`}
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            
            className={`
              flex 
              flex-col sm:flex-row 
              ${isEven ? "sm:flex-row" : "sm:flex-row-reverse"} 
              items-center sm:items-start
              gap-6
            `}
          >
            {/* CONTAINER PRINCIPAL */}
            <div className="sm:w-5/12 w-full sm:px-6">
              <div className={`bg-white rounded-2xl shadow-lg p-6 border border-blue-100`}>
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${institucion.color} mr-4`}>
                    <institucion.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold font-serif text-slate-800 text-lg">{institucion.nombre}</h4>
                    <p className="text-blue-600 text-sm">{institucion.nivel}</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-3">{institucion.descripcion}</p>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{institucion.estudiantes} {t('education.students').toLowerCase()}</span>
                  <span>Fundada {institucion.fundacion}</span>
                </div>
              </div>
            </div>

            {/* Punto en la línea */}
            <div className="flex justify-center sm:justify-center w-full sm:w-2/12">
              <div className={`w-6 h-6 rounded-full border-4 border-white bg-gradient-to-r ${institucion.color} shadow-lg z-10`}></div>
            </div>

            {/* Información adicional */}
            <div className="sm:w-5/12 w-full sm:px-6">
              <div className={`bg-blue-50 rounded-xl p-4`}>
                <p className="text-blue-800 text-sm font-medium font-serif mb-2">{institucion.enfoque}</p>
                <p className="text-blue-600 text-xs italic">"{institucion.lema}"</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
</div>

        {/* --- Logros Colectivos en Diseño de Medallas --- */}
        <div className="mb-16">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4">
              {t('education.collectiveAchievements')}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('education.collectiveAchievementsDescription')}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {logrosColectivosData.map((logro, index) => (
              <motion.div
                key={`logro-${index}-${language}`} // ← KEY CON IDIOMA
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-all duration-300 text-center group"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <logro.icon className="h-8 w-8 text-white" />
                </div>
                
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold font-serif inline-block mb-3">
                  {logro.año}
                </div>
                
                <h4 className="font-bold font-serif text-slate-800 text-lg mb-3">{logro.logro}</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{logro.descripcion}</p>
                
                <div className="space-y-2 text-xs text-slate-500">
                  <div className="flex items-center justify-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{logro.participantes}</span>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <span className="text-blue-700 font-medium font-serif">{logro.impacto}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Sección Final con Diseño de Diploma --- */}
        <motion.div
          className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 translate-y-16"></div>
          
          <div className="relative">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 inline-flex mb-6">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold font-serif text-white mb-4">
              {t('education.educationTransforms')}
            </h3>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-6">
              {t('education.finalMessage')}
            </p>
            <div className="bg-white/20 rounded-xl p-4 inline-flex backdrop-blur-sm">
              <span className="text-white font-semibold font-serif">{t('education.learningCreatesFutures')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}