// src/sections/GastronomiaContent.tsx
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Sprout, 
  Utensils, 
  Coffee, 
  Wheat,
  ChefHat,
  Trees,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react'; // ← AGREGAR useMemo
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

// --- Imágenes del Carrusel Gastronómico ---
const useCarouselImages = () => {
  const { t } = useTranslation();
  
  return [
    {
      url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763111724/jose_qkrpbz.webp',
      title: t('gastronomymodal.carousel.cornHarvest'), // ← TRADUCIBLE
      description: t('gastronomymodal.carousel.cornDescription') // ← TRADUCIBLE
    },
    {
      url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763117180/chayoteste_p2vzuf.jpg',
      title: t('gastronomymodal.carousel.organicMarket'), // ← TRADUCIBLE
      description: t('gastronomymodal.carousel.marketDescription') // ← TRADUCIBLE
    },
    {
      url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763061074/gastronomia_knugxq.jpg',
      title: t('gastronomymodal.carousel.molePreparation'), // ← TRADUCIBLE
      description: t('gastronomymodal.carousel.moleDescription') // ← TRADUCIBLE
    },
    {
      url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763114055/cafe-planta_q7jx3x.jpg',
      title: t('gastronomymodal.carousel.organicCoffee'), // ← TRADUCIBLE
      description: t('gastronomymodal.carousel.coffeeDescription') // ← TRADUCIBLE
    },
    {
      url: 'https://res.cloudinary.com/dinsl266g/image/upload/v1763082284/tamales-hoja_ycmxku.avif',
      title: t('gastronomymodal.carousel.beanTamales'), // ← TRADUCIBLE
      description: t('gastronomymodal.carousel.tamalesDescription') // ← TRADUCIBLE
    }
  ];
};

// --- Datos de Productos Agrícolas ---
const useProductosData = () => {
  const { t } = useTranslation();
  
  return [
    {
      nombre: t('gastronomymodal.products.0.name'), // ← TRADUCIBLE
      icon: Wheat,
      descripcion: t('gastronomymodal.products.0.description'), // ← TRADUCIBLE
      temporada: t('gastronomymodal.products.0.season'), // ← TRADUCIBLE
      caracteristicas: t('gastronomymodal.products.0.characteristics') as unknown as string[], // ← TRADUCIBLE
      color: 'from-amber-400 to-orange-500'
    },
    {
      nombre: t('gastronomymodal.products.1.name'), // ← TRADUCIBLE
      icon: Sprout,
      descripcion: t('gastronomymodal.products.1.description'), // ← TRADUCIBLE
      temporada: t('gastronomymodal.products.1.season'), // ← TRADUCIBLE
      caracteristicas: t('gastronomymodal.products.1.characteristics') as unknown as string[], // ← TRADUCIBLE
      color: 'from-purple-600 to-indigo-700'
    },
    {
      nombre: t('gastronomymodal.products.2.name'), // ← TRADUCIBLE
      icon: Coffee,
      descripcion: t('gastronomymodal.products.2.description'), // ← TRADUCIBLE
      temporada: t('gastronomymodal.products.2.season'), // ← TRADUCIBLE
      caracteristicas: t('gastronomymodal.products.2.characteristics') as unknown as string[], // ← TRADUCIBLE
      color: 'from-yellow-700 to-amber-800'
    },
    {
      nombre: t('gastronomymodal.products.3.name'), // ← TRADUCIBLE
      icon: Trees,
      descripcion: t('gastronomymodal.products.3.description'), // ← TRADUCIBLE
      temporada: t('gastronomymodal.products.3.season'), // ← TRADUCIBLE
      caracteristicas: t('gastronomymodal.products.3.characteristics') as unknown as string[], // ← TRADUCIBLE
      color: 'from-green-500 to-emerald-600'
    }
  ];
};

// --- Datos de Platos Típicos ---
const usePlatosData = () => {
  const { t } = useTranslation();
  
  return [
    {
      nombre: t('gastronomymodal.dishes.0.name'), // ← TRADUCIBLE
      descripcion: t('gastronomymodal.dishes.0.description'), // ← TRADUCIBLE
      ingredientes: t('gastronomymodal.dishes.0.ingredients') as unknown as string[], // ← TRADUCIBLE
      temporada: 'Octubre',
      icon: ChefHat,
      preparacion: t('gastronomymodal.dishes.0.preparation') // ← TRADUCIBLE
    },
    {
      nombre: t('gastronomymodal.dishes.1.name'), // ← TRADUCIBLE
      descripcion: t('gastronomymodal.dishes.1.description'), // ← TRADUCIBLE
      ingredientes: t('gastronomymodal.dishes.1.ingredients') as unknown as string[], // ← TRADUCIBLE
      temporada: 'Todo el año',
      icon: Utensils,
      preparacion: t('gastronomymodal.dishes.1.preparation') // ← TRADUCIBLE
    },
    {
      nombre: t('gastronomymodal.dishes.2.name'), // ← TRADUCIBLE
      descripcion: t('gastronomymodal.dishes.2.description'), // ← TRADUCIBLE
      ingredientes: t('gastronomymodal.dishes.2.ingredients') as unknown as string[], // ← TRADUCIBLE
      temporada: 'Temporada de frío',
      icon: Coffee,
      preparacion: t('gastronomymodal.dishes.2.preparation') // ← TRADUCIBLE
    }
  ];
};

// --- Saberes Ancestrales ---
const useSaberesData = () => {
  const { t } = useTranslation();
  
  return [
    {
      titulo: t('gastronomymodal.knowledge.0.title'), // ← TRADUCIBLE
      descripcion: t('gastronomymodal.knowledge.0.description'), // ← TRADUCIBLE
      icon: Sprout,
      color: 'bg-green-100 text-green-700'
    },
    {
      titulo: t('gastronomymodal.knowledge.1.title'), // ← TRADUCIBLE
      descripcion: t('gastronomymodal.knowledge.1.description'), // ← TRADUCIBLE
      icon: Utensils,
      color: 'bg-amber-100 text-amber-700'
    },
    {
      titulo: t('gastronomymodal.knowledge.2.title'), // ← TRADUCIBLE
      descripcion: t('gastronomymodal.knowledge.2.description'), // ← TRADUCIBLE
      icon: Trees,
      color: 'bg-orange-100 text-orange-700'
    },
    {
      titulo: t('gastronomymodal.knowledge.3.title'), // ← TRADUCIBLE
      descripcion: t('gastronomymodal.knowledge.3.description'), // ← TRADUCIBLE
      icon: ChefHat,
      color: 'bg-emerald-100 text-emerald-700'
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

interface GastronomiaContentProps {
  onBack?: () => void;
}

// Componente del Carrusel
function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t, language } = useTranslation(); // ← AGREGAR HOOK
  const carouselImages = useMemo(() => useCarouselImages(), [t, language]); // ← USAR useMemo

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
  }, [isAutoPlaying, carouselImages.length]); // ← AGREGAR DEPENDENCIA

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
                className="text-lg text-amber-100 max-w-2xl"
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
                ? 'bg-amber-400 scale-125' 
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

export function GastronomiaContent({ }: GastronomiaContentProps) {
  const { t, language } = useTranslation(); // ← AGREGAR HOOK
  
  // USAR useMemo PARA TODOS LOS DATOS
  const productosData = useMemo(() => useProductosData(), [t, language]);
  const platosData = useMemo(() => usePlatosData(), [t, language]);
  const saberesData = useMemo(() => useSaberesData(), [t, language]);

  return (
    <section className="w-full bg-gradient-to-b from-amber-50 to-orange-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-slate-900 mb-4">
            {t('gastronomymodal.title')}{' '} {/* ← TRADUCIBLE */}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              {t('gastronomymodal.subtitle')} {/* ← TRADUCIBLE */}
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t('gastronomymodal.description')} {/* ← TRADUCIBLE */}
          </p>
        </motion.div>

        {/* --- Carrusel de Imágenes --- */}
        <ImageCarousel />
        
        {/* --- Hero Section Informativa --- */}
        <motion.div
          className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white mb-16 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
                {t('gastronomymodal.heroTitle')} {/* ← TRADUCIBLE */}
              </h2>
              <p className="text-amber-100 text-lg leading-relaxed mb-6">
                {t('gastronomymodal.heroDescription')} {/* ← TRADUCIBLE */}
              </p>
              <div className="flex flex-wrap gap-4">
                {(t('gastronomymodal.heroTags') as unknown as string[]).map((tag, index) => ( // ← TRADUCIBLE
                  <div key={index} className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                    <span className="font-semibold font-serif">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm">
                <Sprout className="h-24 w-24 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Nuestros Productos --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4">
              {t('gastronomymodal.ourProducts')} {/* ← TRADUCIBLE */}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('gastronomymodal.productsDescription')} {/* ← TRADUCIBLE */}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full mt-4"></div>
          </motion.div>
          
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {productosData.map((producto, index) => (
              <motion.div
                key={`product-${index}`} // ← KEY ESTABLE
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-amber-100"
              >
                {/* Header con gradiente */}
                <div className={`bg-gradient-to-r ${producto.color} p-6 text-white`}>
                  <div className="flex items-center justify-center mb-2">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                      <producto.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h4 className="font-bold font-serif text-xl text-center">{producto.nombre}</h4>
                  <p className="text-amber-100 text-sm text-center mt-1">
                    {producto.temporada}
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-slate-700 leading-relaxed mb-4 text-sm">
                    {producto.descripcion}
                  </p>
                  <div className="bg-amber-50 rounded-xl p-4">
                    <h5 className="font-semibold font-serif text-amber-800 mb-2 text-sm">
                      {t('gastronomymodal.characteristics')} {/* ← TRADUCIBLE */}
                    </h5>
                    <ul className="text-slate-700 space-y-1 text-sm">
                      {producto.caracteristicas.map((caracteristica, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></div>
                          {caracteristica}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Continuará en la siguiente parte... */}
                {/* --- Platos Típicos --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4">
              {t('gastronomymodal.flavorsOfTheLand')} {/* ← TRADUCIBLE */}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('gastronomymodal.flavorsDescription')} {/* ← TRADUCIBLE */}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full mt-4"></div>
          </motion.div>
          
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {platosData.map((plato, index) => (
              <motion.div
                key={`dish-${index}`} // ← KEY ESTABLE
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-amber-100"
              >
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 text-white">
                  <div className="flex items-center justify-center">
                    <plato.icon className="h-8 w-8 mr-3" />
                    <h4 className="text-xl font-bold font-serif">{plato.nombre}</h4>
                  </div>
                  <p className="text-amber-100 text-sm text-center mt-2">{plato.temporada}</p>
                </div>
                <div className="p-6">
                  <p className="text-slate-700 mb-4 leading-relaxed text-sm">{plato.descripcion}</p>
                  <div className="mb-4">
                    <h5 className="font-semibold font-serif text-slate-800 mb-2 text-sm">
                      {t('gastronomymodal.mainIngredients')} {/* ← TRADUCIBLE */}
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {plato.ingredientes.map((ingrediente) => (
                        <span 
                          key={ingrediente}
                          className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs"
                        >
                          {ingrediente}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 text-center">
                    <p className="text-amber-700 text-sm font-medium font-serif">
                      {plato.preparacion}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Saberes Ancestrales --- */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-serif text-slate-900 mb-4">
              {t('gastronomymodal.ancestralKnowledge')} {/* ← TRADUCIBLE */}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t('gastronomymodal.knowledgeDescription')} {/* ← TRADUCIBLE */}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto rounded-full mt-4"></div>
          </motion.div>
          
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {saberesData.map((saber, index) => (
              <motion.div
                key={`knowledge-${index}`} // ← KEY ESTABLE
                variants={cardVariants}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-amber-100"
              >
                <div className={`p-3 rounded-xl ${saber.color} inline-flex mb-4`}>
                  <saber.icon className="h-6 w-6" />
                </div>
                <h4 className="font-bold font-serif text-slate-800 text-lg mb-3">{saber.titulo}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{saber.descripcion}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Sección Informativa Final --- */}
        <motion.div
          className="text-center bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-10 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Sprout className="h-16 w-16 text-white mx-auto mb-4" />
          <h3 className="text-3xl font-bold font-serif text-white mb-4">
            {t('gastronomymodal.livingHeritage')} {/* ← TRADUCIBLE */}
          </h3>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto mb-6">
            {t('gastronomymodal.heritageDescription')} {/* ← TRADUCIBLE */}
          </p>
          <div className="bg-white/20 rounded-xl p-4 inline-flex backdrop-blur-sm">
            <span className="text-white font-semibold font-serif">
              {t('gastronomymodal.heritageTag')} {/* ← TRADUCIBLE */}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}