// src/comunidad/CooperativaSection.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Coffee, Wine, Leaf, Droplet, Users, ShoppingBag, Award, Sparkles, Mountain } from 'lucide-react';
import { Link } from "react-router-dom";
import { useTranslation } from '../contexts/TranslationContext';
import { useState, useEffect } from 'react';

export function CooperativaSection() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detección de dispositivo optimizada
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

  const productos = [
    {
      icon: Coffee,
      title: t('cooperative.products.coffee.title'),
      description: t('cooperative.products.coffee.description'),
      image: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_400/v1763112532/cafe-coperariva_on9kzm.jpg",
      gradient: "from-amber-400 to-orange-600",
      accent: "text-amber-600"
    },
    {
      icon: Wine,
      title: t('cooperative.products.punch.title'),
      description: t('cooperative.products.punch.description'),
      image: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_400/v1763112532/licores_pyndrs.jpg",
      gradient: "from-purple-400 to-pink-600",
      accent: "text-purple-600"
    },
    {
      icon: Leaf,
      title: t('cooperative.products.soaps.title'),
      description: t('cooperative.products.soaps.description'),
      image: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_400/v1763112532/jabones_ul1wyl.jpg",
      gradient: "from-green-400 to-emerald-600",
      accent: "text-green-600"
    },
    {
      icon: Droplet,
      title: t('cooperative.products.juices.title'),
      description: t('cooperative.products.juices.description'),
      image: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_400/v1763072850/IMG-20251113-WA0005_f3sq5h.jpg",
      gradient: "from-red-400 to-orange-600",
      accent: "text-red-600"
    }
  ];

  const impacto = [
    { 
      icon: Award, 
      number: "10+", 
      label: t('cooperative.impact.stats.yearsProduction'),
      color: "text-amber-600", 
      bg: "from-amber-400 to-orange-600" 
    },
    { 
      icon: Users, 
      number: "50+", 
      label: t('cooperative.impact.stats.familiesBenefited'),
      color: "text-purple-600", 
      bg: "from-purple-400 to-pink-600" 
    },
    { 
      icon: ShoppingBag, 
      number: "20+", 
      label: t('cooperative.impact.stats.communityProducts'),
      color: "text-green-600", 
      bg: "from-green-400 to-emerald-600" 
    },
    { 
      icon: Sparkles, 
      number: "100%", 
      label: t('cooperative.impact.stats.artisanalProduction'),
      color: "text-red-600", 
      bg: "from-red-400 to-orange-600" 
    }
  ];

  return (
    <section
      id="cooperativa"
      className="py-24 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dinsl266g/image/upload/v1763111232/Fondo-comunidad_nqg0wj.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      {/* Capa translúcida para mejorar legibilidad */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
      
      {/* Fondos decorativos - SOLO en desktop */}
      {!shouldRemoveAnimations && (
        <>
          <div className="absolute top-20 left-10 w-40 h-40 bg-amber-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl" />
        </>
      )}

      {/* Contenido principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Encabezado */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-400/80 to-blue-500/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-md shadow-blue-900/10">
            <Users className="h-5 w-5 text-white" />
            <span className="text-black font-medium font-serif">
              {t('cooperative.communityProduction')}
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold font-serif text-gray-900 mb-6">
            {t('cooperative.our')}{' '}
            <span className="bg-gradient-to-r from-teal-600 via-blue-500 to-emerald-600 bg-clip-text text-transparent">
              {t('cooperative.cooperative')}
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {t('cooperative.description')}
          </p>
        </div>

        {/* Productos - COMPLETAMENTE ESTÁTICOS en móviles/tablets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {productos.map((item, index) => (
            <div key={index}>
              <Card 
                className={`border-0 bg-white/90 backdrop-blur-sm overflow-hidden ${
                  shouldRemoveAnimations ? '' : 'hover:shadow-xl transition-all duration-500'
                }`}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    loading={index < 2 ? "eager" : "lazy"} // Priorizar primeras imágenes
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  {/* Efecto de gradiente overlay - SOLO hover en desktop */}
                  {!shouldRemoveAnimations && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-25 transition-opacity duration-500`}></div>
                  )}
                  
                  {/* Icono estático en móviles */}
                  <div className="absolute bottom-4 left-4">
                    <div className={`bg-gradient-to-br ${item.gradient} p-3 rounded-xl shadow-xl`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-900 font-serif">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Impacto de la cooperativa - ESTÁTICO en móviles/tablets */}
        <div className="bg-teal-100/50 backdrop-blur-xl rounded-3xl p-8 lg:p-16 shadow-lg border border-amber-100 relative overflow-hidden mb-20">
          <div className="text-center mb-16 relative">
            <div className="inline-flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full mb-6">
              <Award className="h-5 w-5 text-orange-600" />
              <span className="text-orange-800 font-medium font-serif">
                {t('cooperative.impact.localImpact')}
              </span>
            </div>
            <h3 className="text-4xl font-bold font-serif text-gray-900 mb-6">
              {t('cooperative.impact.moreThanProducts')}{' '}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                {t('cooperative.impact.opportunities')}
              </span>
            </h3>
            <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
              {t('cooperative.impact.impactDescription')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impacto.map((data, index) => (
              <div
                key={index}
                className="text-center bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100"
              >
                <div className="mb-6 relative">
                  {/* Efecto de fondo blur - SOLO en desktop */}
                  {!shouldRemoveAnimations && (
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-200/50 to-pink-200/50 rounded-2xl blur-xl opacity-50"></div>
                  )}
                  <div className={`relative bg-gradient-to-br ${data.bg} p-4 rounded-2xl shadow-xl mx-auto w-fit`}>
                    <data.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className={`text-4xl md:text-5xl font-bold font-serif mb-3 ${data.color}`}>
                  {data.number}
                </div>
                <div className="text-gray-600 font-medium font-serif leading-relaxed">{data.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA - OPTIMIZADO para móviles */}
        <div className="text-center mt-20 relative">
          {/* Efecto de resplandor - SOLO en desktop */}
          {!shouldRemoveAnimations && (
            <div className="absolute inset-0 flex justify-center">
              <div className="w-64 h-16 bg-gradient-to-r from-teal-400/30 via-green-300/80 to-lime-200/50 rounded-full blur-3xl"></div>
            </div>
          )}

          {/* Botón principal - SIN EFECTOS en móviles/tablets */}
          <div className="relative inline-flex">
            <Link
              to="/section-cooperativa"
              className="relative inline-flex items-center gap-4 bg-gradient-to-r from-teal-300 via-emerald-300 to-green-400 text-gray-900 text-lg font-bold font-serif px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-xl border-2 border-white/30 backdrop-blur-sm overflow-hidden"
            >
              {/* Efecto de brillo al hover - SOLO en desktop */}
              {!shouldRemoveAnimations && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              )}
              
              {/* Texto y icono */}
              <span className="relative z-10 drop-shadow-sm">
                {t('cooperative.cta')}
              </span>
              <div className="relative z-10">
                <Mountain className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-sm" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}