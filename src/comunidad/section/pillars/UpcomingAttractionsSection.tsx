import { motion, type Variants } from 'framer-motion';
import { Home, Zap, Construction, Calendar, MapPin, Users, TreePine, ArrowRight, Play, ExternalLink } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: [0, 0.55, 0.45, 1],
    } 
  },
};

export function UpcomingAttractionsSection() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [isLoading] = useState(false);
  const { t, language } = useTranslation(); // ← AGREGAR HOOK

  // Datos del proyecto con useMemo para estabilidad
  const projectData = useMemo(() => ({
    title: t('attractions.project.title'),
    subtitle: t('attractions.project.subtitle'),
    description: t('attractions.project.description'),
    status: t('attractions.project.status'),
    progress: 80,
    features: [
      { label: t('attractions.project.features.0.label'), value: t('attractions.project.features.0.value'), icon: Home },
      { label: t('attractions.project.features.1.label'), value: t('attractions.project.features.1.value'), icon: Calendar },
      { label: t('attractions.project.features.2.label'), value: t('attractions.project.features.2.value'), icon: Zap },
      { label: t('attractions.project.features.3.label'), value: t('attractions.project.features.3.value'), icon: MapPin },
      { label: t('attractions.project.features.4.label'), value: t('attractions.project.features.4.value'), icon: Users },
      { label: t('attractions.project.features.5.label'), value: t('attractions.project.features.5.value'), icon: TreePine },
    ],
   constructionImages: [
  {
    url: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_800/v1763062499/Cabanas_gjdkib.webp",
    title: t('attractions.project.constructionImages.0.title'),
    description: t('attractions.project.constructionImages.0.description')
  },
  {
    url: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_800/v1763072851/IMG-20251113-WA0008_qe5joq.jpg",
    title: t('attractions.project.constructionImages.1.title'),
    description: t('attractions.project.constructionImages.1.description')
  },
  {
    url: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_800/v1763074242/Puente_fwky8r.jpg",
    title: t('attractions.project.constructionImages.2.title'),
    description: t('attractions.project.constructionImages.2.description')
  },
  {
    url: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_800/v1763115688/cabanias_sywdlm.jpg",
    title: t('attractions.project.constructionImages.3.title'),
    description: t('attractions.project.constructionImages.3.description')
  }
],
    timeline: [
      { phase: t('attractions.project.timeline.0.phase'), progress: 100, date: t('attractions.project.timeline.0.date') },
      { phase: t('attractions.project.timeline.1.phase'), progress: 100, date: t('attractions.project.timeline.1.date') },
      { phase: t('attractions.project.timeline.2.phase'), progress: 90, date: t('attractions.project.timeline.2.date') },
      { phase: t('attractions.project.timeline.3.phase'), progress: 70, date: t('attractions.project.timeline.3.date') },
      { phase: t('attractions.project.timeline.4.phase'), progress: 40, date: t('attractions.project.timeline.4.date') },
      { phase: t('attractions.project.timeline.5.phase'), progress: 20, date: t('attractions.project.timeline.5.date') }
    ]
  }), [t, language]); // ← DEPENDENCIAS

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % projectData.constructionImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + projectData.constructionImages.length) % projectData.constructionImages.length);
  };

  const handleOpenPDF = () => {
  const a = document.createElement("a");
  a.href = "/documentos/plan-cabanas-turisticas.pdf";
  a.download = "plan-cabanas-turisticas.pdf";
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};


  return (
    <section id="atracciones-proximas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 mb-24">
      {/* Encabezado */}
      <motion.div
        className="relative text-center mb-16 bg-white/60 backdrop-blur-md rounded-2xl shadow-md p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 py-3 rounded-full mb-6 shadow-lg"
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Construction className="h-5 w-5" />
          <span className="font-medium font-serif">{t('attractions.projectInDevelopment')}</span> {/* ← TRADUCIBLE */}
        </motion.div>
        
        <h3 className="text-4xl font-bold font-serif text-slate-900 mb-4">
          {t('attractions.our')}{' '} {/* ← TRADUCIBLE */}
          <span className="bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent">
            {t('attractions.novelties')} {/* ← TRADUCIBLE */}
          </span>
        </h3>
        
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          {t('attractions.description')} {/* ← TRADUCIBLE */}
        </p>
        
        <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-emerald-600 mx-auto rounded-full mt-4"></div>
      </motion.div>

      {/* Tarjeta Principal del Proyecto */}
      <motion.div
        className="bg-white rounded-3xl shadow-2xl overflow-hidden lg:flex border border-slate-200"
        initial="hidden"
        whileInView="visible"
        variants={cardVariants}
        viewport={{ once: true }}
      >
        {/* Lado Izquierdo - Galería de Construcción */}
        <div className="lg:w-1/2 h-80 lg:h-auto bg-gradient-to-br from-slate-900 to-slate-700 relative overflow-hidden">
          {/* Imagen principal */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{ backgroundImage: `url(${projectData.constructionImages[selectedImage].url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
          
          {/* Overlay de información */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-lg font-bold font-serif mb-1">{projectData.constructionImages[selectedImage].title}</h4>
              <p className="text-sm text-slate-200">{projectData.constructionImages[selectedImage].description}</p>
            </motion.div>
          </div>

          {/* Controles de galería */}
          <div className="absolute top-4 left-4 flex space-x-2">
            {projectData.constructionImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedImage 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>

          {/* Botón de progreso */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold font-serif px-4 py-2 rounded-full text-sm shadow-lg backdrop-blur-sm">
            {projectData.status}
          </div>

          {/* Barra de progreso */}
          <div className="absolute top-16 right-4 left-4 bg-white/20 backdrop-blur-sm rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-teal-400 to-emerald-500 h-full rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${projectData.progress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* Botones de navegación */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Botón ver galería completa */}
          <button
            onClick={() => setShowGallery(true)}
            className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium font-serif transition-all flex items-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>{t('attractions.viewGallery')}</span> {/* ← TRADUCIBLE */}
          </button>
        </div>

        {/* Lado Derecho - Información */}
        <div className="lg:w-1/2 p-8 md:p-12">
          <h4 className="text-sm font-bold font-serif uppercase tracking-widest text-teal-600 mb-2 flex items-center">
            <Construction className="h-4 w-4 mr-2" />
            {t('attractions.communityProject')} {/* ← TRADUCIBLE */}
          </h4>
          <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-slate-900 mb-4">{projectData.title}</h2>
          <p className="text-lg text-slate-700 mb-8 leading-relaxed">{projectData.description}</p>

          {/* Timeline del proyecto */}
          <div className="mb-8">
            <h5 className="font-semibold font-serif text-slate-800 mb-4 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-teal-500" />
              {t('attractions.projectTimeline')} {/* ← TRADUCIBLE */}
            </h5>
            <div className="space-y-3">
              {projectData.timeline.map((phase, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 flex-1">{phase.phase}</span>
                  <div className="w-24 bg-slate-200 rounded-full h-2 mx-4">
                    <div 
                      className="bg-gradient-to-r from-teal-400 to-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 w-12 text-right">{phase.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Características */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {projectData.features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all cursor-pointer group"
              >
                <div className="bg-gradient-to-r from-teal-500 to-emerald-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <feature.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium font-serif">{feature.label}</p>
                  <p className="text-base font-semibold font-serif text-slate-800">{feature.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleOpenPDF}
              disabled={isLoading}
              className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-bold font-serif hover:from-teal-600 hover:to-emerald-700 transition-all shadow-lg shadow-teal-500/50 hover:shadow-xl hover:shadow-teal-500/70 flex items-center justify-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>{t('attractions.knowCompletePlan')}</span> {/* ← TRADUCIBLE */}
                  <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal de galería */}
      {/* Modal de galería OPTIMIZADO */}
{showGallery && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    onClick={() => setShowGallery(false)}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative max-w-4xl max-h-full"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={projectData.constructionImages[selectedImage].url}
        alt={projectData.constructionImages[selectedImage].title}
        className="max-w-full max-h-full object-contain rounded-lg"
        loading="eager"
        decoding="sync"
      />
      <button
        onClick={() => setShowGallery(false)}
        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all"
      >
        <ArrowRight className="h-5 w-5 rotate-45" />
      </button>
    </motion.div>
  </motion.div>
)}

      {/* Impacto en la comunidad */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-12 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-8 border border-teal-200"
      >
        <h4 className="text-2xl font-bold font-serif text-slate-900 mb-4 text-center">
          {t('attractions.communityImpact')} {/* ← TRADUCIBLE */}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Users className="h-8 w-8 text-teal-600 mx-auto mb-3" />
            <div className="text-2xl font-bold font-serif text-slate-900 mb-1">15+</div>
            <div className="text-slate-600">{t('attractions.jobsGenerated')}</div> {/* ← TRADUCIBLE */}
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Home className="h-8 w-8 text-teal-600 mx-auto mb-3" />
            <div className="text-2xl font-bold font-serif text-slate-900 mb-1">8</div>
            <div className="text-slate-600">{t('attractions.cabinsUnderConstruction')}</div> {/* ← TRADUCIBLE */}
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <TreePine className="h-8 w-8 text-teal-600 mx-auto mb-3" />
            <div className="text-2xl font-bold font-serif text-slate-900 mb-1">95%</div>
            <div className="text-slate-600">{t('attractions.localMaterials')}</div> {/* ← TRADUCIBLE */}
          </div>
        </div>
      </motion.div>
    </section>
  );
}