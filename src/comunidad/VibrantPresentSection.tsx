// src/sections/VibrantPresentSection.tsx
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { InfoModal } from './section/InfoModal';
import { UpcomingAttractionsSection } from './section/pillars/UpcomingAttractionsSection';
import { EducacionContent } from './section/pillars/EducacionContent';
import { FiestasContent } from './section/pillars/FiestasContent';
import { GastronomiaContent } from './section/pillars/GastronomiaContent';
import { TequioContent } from './section/pillars/TequioContent';

import { 
  Handshake, 
  Sprout, 
  PartyPopper, 
  School2,
  Users,
  Home,
  MapPin,
  Heart,
} from 'lucide-react';
import React from 'react';
import { useEffect, useRef, useState, useMemo } from 'react'; // ← AGREGAR useMemo
import { useTranslation } from '../contexts/TranslationContext';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    } 
  },
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

// --- Componente para Animar el Conteo de Números ---
function AnimatedNumber({ to, suffix }: { to: number, suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration: 2, ease: "easeOut" });
    }
  }, [inView, count, to]);

  return (
    <div className="flex items-baseline justify-center" ref={ref}>
      <motion.span className="text-5xl md:text-6xl font-bold font-serif">{rounded}</motion.span>
      {suffix && <span className="text-3xl md:text-4xl font-bold font-serif ml-1">{suffix}</span>}
    </div>
  );
}

export function VibrantPresentSection() {
  const [activePillar, setActivePillar] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, language } = useTranslation(); // ← AGREGAR currentLanguage

  // --- Datos de los Pilares de la Comunidad CON useMemo ---
  const pillarsData = useMemo(() => [
    {
      title: t('present.pillars.0.title'),
      description: t('present.pillars.0.description'),
      Icon: Handshake,
      color: 'from-emerald-500 to-teal-600',
      ContentComponent: TequioContent,
    },
    {
      title: t('present.pillars.1.title'),
      description: t('present.pillars.1.description'),
      Icon: Sprout,
      color: 'from-amber-500 to-orange-600',
      ContentComponent: GastronomiaContent,
    },
    {
      title: t('present.pillars.2.title'),
      description: t('present.pillars.2.description'),
      Icon: PartyPopper,
      color: 'from-rose-500 to-pink-600',
      ContentComponent: FiestasContent,
    },
    {
      title: t('present.pillars.3.title'),
      description: t('present.pillars.3.description'),
      Icon: School2,
      color: 'from-blue-500 to-indigo-600',
      ContentComponent: EducacionContent
    },
  ], [t, language]); // ← SE RECALCULA SOLO CUANDO CAMBIA EL IDIOMA

  // --- Datos para la Radiografía Cuantitativa CON useMemo ---
  const statsData = useMemo(() => [
    { value: 2500, suffix: undefined, label: t('present.stats.0.label'), icon: Users, color: 'text-blue-400' },
    { value: 45, suffix: '%', label: t('present.stats.1.label'), icon: Heart, color: 'text-rose-400' },
    { value: 5, suffix: undefined, label: t('present.stats.2.label'), icon: School2, color: 'text-amber-400' },
    { value: 98, suffix: '%', label: t('present.stats.3.label'), icon: Home, color: 'text-emerald-400' },
  ], [t, language]); // ← SE RECALCULA SOLO CUANDO CAMBIA EL IDIOMA
  
  const activePillarData = pillarsData[activePillar];
  const ContentComponent = activePillarData.ContentComponent;
  
  return (
    <section id="presente" className="relative w-full bg-gradient-to-b from-slate-50 to-blue-50 py-16 sm:py-24 overflow-hidden">
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dinsl266g/image/upload/v1763114788/Fondos-numericos_wvaraf.svg')",
        }}
      ></div>
      
      <div className="absolute inset-0 bg-sky-900/5"></div>

      {/* Contenido principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Encabezado Mejorado --- */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-3 rounded-full mb-6 shadow-lg"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <MapPin className="h-5 w-5" />
            <span className="font-medium font-serif">{t('present.sanJuanToday')}</span>
          </motion.div>
          <h2 className="text-4xl sm:text-6xl font-bold font-serif text-slate-900 leading-tight mb-6">
            {t('present.ourVibrant')}{' '}
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              {t('present.community')}
            </span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-slate-600 leading-relaxed">
            {t('present.description')}
          </p>
        </motion.div>

        {/* --- Pilares de la Comunidad - Diseño Mejorado --- */}
        <div className="mb-24">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4">
              {t('present.communityPillars')}
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Navegación de Pilares */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h4 className="text-lg font-semibold font-serif text-slate-800 mb-4">
                  {t('present.ourValues')}
                </h4>
                <div className="space-y-3">
                  {pillarsData.map((pillar, index) => (
                    <button
                      key={`pillar-${index}`} // ← KEY ESTABLE
                      onClick={() => setActivePillar(index)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                        activePillar === index 
                          ? `bg-gradient-to-r ${pillar.color} text-white shadow-md` 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <div className="flex items-center">
                        <pillar.Icon className="h-5 w-5 mr-3" />
                        <span className="font-medium font-serif">{pillar.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contenido del Pilar Activo */}
            <div className="lg:w-3/4">
              <motion.div
                key={`pillar-content-${activePillar}`} // ← KEY ESTABLE
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className={`h-64 bg-gradient-to-r ${pillarsData[activePillar].color} flex items-center justify-center`}>
                  <div className="text-white text-center p-6">
                    <div className="bg-white/20 p-4 rounded-full inline-flex mb-4">
                      {React.createElement(pillarsData[activePillar].Icon, { className: 'h-12 w-12' })}
                    </div>
                    <h3 className="text-3xl font-bold font-serif">{pillarsData[activePillar].title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {pillarsData[activePillar].description}
                  </p>
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className={`bg-gradient-to-r ${activePillarData.color} text-white px-6 py-2 rounded-lg font-medium font-serif hover:opacity-90 transition-opacity shadow-md`}
                    >
                      {t('present.learnMore')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- Dashboard de Radiografía Mejorado --- */}
        <div className="mb-24">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4">
              {t('present.communityInNumbers')}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('present.numbersDescription')}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full mt-4"></div>
          </motion.div>
          
          <motion.div 
            className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 p-8 md:p-12 rounded-3xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Fondo con imagen */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage: "url('https://res.cloudinary.com/dinsl266g/image/upload/v1763114788/Fondos-numericos_wvaraf.svg')",
              }}
            ></div>

            <div className="absolute inset-0 bg-slate-900/30"></div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {statsData.map((stat, index) => (
                <motion.div 
                  key={`stat-${index}`} // ← KEY ESTABLE
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/15 transition-all duration-300"
                  variants={cardVariants}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-white/10">
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-sky-400 mb-2">
                    <AnimatedNumber to={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-slate-300 text-sm font-medium font-serif">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="text-center">
                <p className="text-white text-sm">
                  {t('present.lastUpdate')} Octubre 2023 • {t('present.source')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* --- Nueva Sección: Próximos Eventos --- */}
        <UpcomingAttractionsSection />
        
        {/* --- Llamada a la Acción --- */}
        <motion.div
          className="text-center bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-10 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold font-serif text-white mb-4">
            {t('present.wouldYouLikeToVisit')}
          </h3>
          <p className="text-sky-100 text-lg max-w-2xl mx-auto mb-6">
            {t('present.visitDescription')}
          </p>
        </motion.div>
      </div>
      
      {/* Modal */}
      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={activePillarData.title}
        Icon={activePillarData.Icon}
        gradient={activePillarData.color}
      >
        <ContentComponent />
      </InfoModal>
    </section>
  );
}