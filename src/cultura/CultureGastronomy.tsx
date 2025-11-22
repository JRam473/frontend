import { Card, CardContent, CardDescription, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Utensils, Leaf, Star, Calendar, Sparkles, Heart, MousePointer2, Cookie } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext';
import { useGastronomiaData } from '../hooks/useGastronomiaData'; // ← NUEVO IMPORT
import { Link } from 'react-router-dom';

export function CultureGastronomySection() {
  const { t } = useTranslation();
  const { dishesData } = useGastronomiaData(); // ← NUEVO HOOK

  const highlights = [
    { icon: Utensils, number: "50+", label: t('gastronomy.highlights.traditionalRecipes'), color: "text-amber-600" },
    { icon: Leaf, number: "100%", label: t('gastronomy.highlights.localIngredients'), color: "text-orange-600" },
    { icon: Calendar, number: "3", label: t('gastronomy.highlights.annualFairs'), color: "text-rose-600" },
    { icon: Heart, number: "100%", label: t('gastronomy.highlights.flavorTradition'), color: "text-red-600" }
  ];

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '-1', 10);
          if (entry.isIntersecting) {
            if (window.innerWidth <= 768) setPlayingVideo(index);
          } else {
            if (window.innerWidth <= 768 && playingVideo === index) setPlayingVideo(null);
          }
        });
      },
      { threshold: 0.7 }
    );

    videoRefs.current.forEach((el) => el && observer.observe(el));

    return () => {
      videoRefs.current.forEach((el) => el && observer.unobserve(el));
      observer.disconnect();
    };
  }, [playingVideo]);

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth > 768) setPlayingVideo(index);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) setPlayingVideo(null);
  };

  useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      if (!videoRef) return;
      if (playingVideo === index) {
        videoRef.play().catch(() => {});
      } else {
        videoRef.pause();
        videoRef.currentTime = 0;
      }
    });
  }, [playingVideo]);

  return (
    <section id="gastronomia" className="py-24 relative overflow-hidden bg-[url('https://res.cloudinary.com/dinsl266g/image/upload/v1763084436/Fondo-gastronomia--2_rvukkb.svg')] bg-no-repeat bg-center bg-cover">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.5s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 sm:mb-20">
          {/* 🔹 Sello decorativo superior */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-100/80 to-amber-100/80 backdrop-blur-md 
              px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md shadow-amber-800/10">
              <Utensils className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
              <span className="text-orange-800 text-sm sm:text-base font-medium font-serif">
                {t('gastronomy.ancestralFlavors')}
              </span>
            </div>
          </div>

          {/* 🔹 Bloque translúcido principal */}
          <div className="
              inline-block bg-white/70 backdrop-blur-md rounded-3xl 
              px-6 sm:px-8 py-8 sm:py-10 shadow-xl shadow-amber-900/20
              w-[90%] sm:w-auto max-w-4xl lg:max-w-5xl mx-auto
            "
          >
            <h2 className="
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                font-bold font-serif text-gray-900 mb-4 sm:mb-6
              "
            >
              {t('gastronomy.journey')}{' '}
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">
                {t('gastronomy.gastronomic')}
              </span>
            </h2>

            <p className="
                text-base sm:text-lg md:text-xl 
                text-gray-800 leading-relaxed 
                max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto
              "
            >
              {t('gastronomy.description')}
            </p>
          </div>
        </div>

        {/* Grid de tarjetas - AHORA USA dishesData */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {dishesData.map((dish, idx) => (
            <Card
              key={dish.id}
              className="group h-full hover:shadow-culture transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm overflow-hidden"
              onMouseEnter={() => handleMouseEnter(idx)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <ImageWithFallback
                  src={dish.image}
                  alt={dish.name}
                  className={`w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover transform transition-opacity duration-500 ${
                    playingVideo === idx ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                <video
                  ref={el => {videoRefs.current[idx] = el}}
                  data-index={idx}
                  src={dish.video}
                  className={`absolute inset-0 w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover transform transition-opacity duration-500 ${
                    playingVideo === idx ? 'opacity-100' : 'opacity-0'
                  }`}
                  loop
                  muted
                  playsInline
                  preload="none"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 to-transparent rounded-t-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-xl">
                  <Star className="h-4 w-4 text-orange-700" />
                </div>

                <div
                  className={`hidden md:flex items-center gap-2 absolute bottom-3 left-1/2 -translate-x-1/2 
                              bg-white/40 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-md
                              text-sm text-gray-800 transition-opacity duration-300
                              ${playingVideo === idx ? 'opacity-0' : 'opacity-100'} group-hover:opacity-0 pointer-events-none`}
                  aria-hidden="true"
                >
                  <MousePointer2 className="h-4 w-4 text-orange-700" />
                  <span>{t('gastronomy.hoverVideo')}</span>
                </div>
              </div>

              <CardContent className="p-6 relative">
                <CardTitle className="text-xl font-bold font-serif text-gray-900 group-hover:text-orange-700 transition-colors duration-300">
                  {dish.name}
                </CardTitle>

                <CardDescription className="mt-2 text-gray-600 text-sm leading-relaxed">
                  {dish.description}
                </CardDescription>

                <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
                  {dish.origin && (
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-amber-600 mt-0.5" />
                      <p className="text-gray-700">
                        <span className="font-semibold font-serif">{t('gastronomy.origin')}</span> {dish.origin}
                      </p>
                    </div>
                  )}
                  {dish.ingredients && dish.ingredients.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Leaf className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-gray-700">
                        <span className="font-semibold font-serif">{t('gastronomy.ingredients')}</span> {dish.ingredients.slice(0, 4).join(', ')}
                        {dish.ingredients.length > 4 ? '…' : ''}
                      </p>
                    </div>
                  )}
                  {dish.spiceLevel && (
                    <div className="flex items-start gap-2">
                      <Utensils className="h-4 w-4 text-orange-600 mt-0.5" />
                      <p className="text-gray-700">
                        <span className="font-semibold font-serif">{t('gastronomy.spiceLevel')}</span> {dish.spiceLevel}
                      </p>
                    </div>
                  )}
                  {dish.festival && (
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-rose-600 mt-0.5" />
                      <p className="text-gray-700">
                        <span className="font-semibold font-serif">{t('gastronomy.seasonFestivity')}</span> {dish.festival}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {highlights.map((item, idx) => (
            <div 
              key={idx}
              className="group bg-gradient-to-br from-white to-orange-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-100"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
              </div>
              <div className={`text-3xl font-bold font-serif mb-2 ${item.color}`}>
                {item.number}
              </div>
              <p className="text-gray-600 font-medium font-serif">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-20 relative">
          <motion.div
            className="absolute inset-0 flex justify-center"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-64 h-16 bg-gradient-to-r from-orange-400/30 via-amber-300/20 to-orange-400/30 rounded-full blur-3xl"></div>
          </motion.div>

         <motion.div
          className="relative z-10 flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            to="/section-gastronomia"
            className="relative inline-flex items-center gap-3 
            bg-white text-orange-700 
            text-lg font-semibold font-serif 
            px-10 py-4 rounded-full shadow-lg
            transition-all duration-800 animate-bounce 
            hover:scale-105 hover:shadow-2xl"

          >
            {t('gastronomy.exploreOurCuisine')}
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Cookie className="w-6 h-6" />
            </motion.span>
          </Link>
        </motion.div>

        </div>
      </div>
    </section>
  );
}