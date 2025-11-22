// src/sections/CooperativaHero.tsx
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom"; 
import { 
  ShoppingBag, 
  HeartHandshake, 
  Users,
  Sparkles,
  ArrowDown,
  Leaf,
  Award,
  Shield,
  ArrowBigLeft
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../contexts/TranslationContext'; // ← AGREGAR IMPORT

const floatingIcons = [
  { icon: Leaf, delay: 0 },
  { icon: Award, delay: 0.3 },
  { icon: Shield, delay: 0.6 },
  { icon: HeartHandshake, delay: 0.9 }
];

interface CooperativaHeroProps {
  onDiscoverClick?: () => void;
}

export function CooperativaHero({ onDiscoverClick }: CooperativaHeroProps) {
  const [currentIcon, setCurrentIcon] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation(); // ← AGREGAR HOOK

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % floatingIcons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dinsl266g/image/upload/v1763113272/Fondo-cooperativa_j6jccz.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      {/* Capa translúcida */}
      <div className="absolute inset-0 bg-emerald-50/50 backdrop-blur-[2px]"></div>

      {/* Fondos decorativos animados */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-300/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full py-20">
          
          {/* Contenido textual */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge de bienvenida */}
            <motion.div
              className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-emerald-200 shadow-sm mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles className="h-4 w-4 text-emerald-600 mr-2" />
              <span className="text-sm font-medium font-serif text-emerald-700">
                {t('cooperativesection.communityCooperative')} {/* ← TRADUCIBLE */}
              </span>
            </motion.div>

            {/* Título principal */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-slate-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {t('cooperativesection.flavorsAndKnowledge')} {/* ← TRADUCIBLE */}
              </span>
              <br />
              <span className="text-slate-800">{t('cooperativesection.ofOurLand')}</span> {/* ← TRADUCIBLE */}
            </motion.h1>

            {/* Descripción */}
            <motion.p
              className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              {t('cooperative.description')} {/* ← TRADUCIBLE */}
            </motion.p>

            {/* Estadísticas */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold font-serif text-emerald-600">50+</div>
                <div className="text-sm text-slate-500">{t('cooperativesection.uniqueProducts')}</div> {/* ← TRADUCIBLE */}
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold font-serif text-teal-600">30+</div>
                <div className="text-sm text-slate-500">{t('cooperativesection.yearsOfTradition')}</div> {/* ← TRADUCIBLE */}
              </div>
              <div className="text-center lg:text-left col-span-2 sm:col-span-1">
                <div className="text-2xl font-bold font-serif text-green-600">100%</div>
                <div className="text-sm text-slate-500">{t('cooperativesection.organicAndNatural')}</div> {/* ← TRADUCIBLE */}
              </div>
            </motion.div>

            {/* Botones de acción */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
            >
              <button  
                onClick={() => navigate(-1)}
                className="bg-gradient-to-r from-emerald-500 to-teal-900 text-white px-8 py-4 rounded-2xl font-bold font-serif hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center">
                <ArrowBigLeft className="h-5 w-5 mr-2" />
                {t('cooperativesection.back')} {/* ← TRADUCIBLE */}
              </button>
              <button  
                onClick={onDiscoverClick} 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold font-serif hover:shadow-xl transition-all duration-900 hover:scale-105 flex items-center justify-center animate-bounce">
                <ShoppingBag className="h-5 w-5 mr-2" />
                {t('cooperativesection.exploreProducts')} {/* ← TRADUCIBLE */}
              </button>
            </motion.div>
          </motion.div>

          {/* Lado derecho - Elementos visuales */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {/* Tarjeta principal flotante */}
            <motion.div
              className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-emerald-100 mx-auto max-w-sm"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl mb-6">
                <ShoppingBag className="h-16 w-16 text-white mx-auto" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-slate-900 text-center mb-4">
                {t('cooperativesection.solidarityEconomy')} {/* ← TRADUCIBLE */}
              </h3>
              <p className="text-slate-600 text-center mb-6 leading-relaxed">
                {t('cooperativesection.solidarityDescription')} {/* ← TRADUCIBLE */}
              </p>
              <div className="flex justify-center space-x-4">
                {floatingIcons.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 rounded-xl ${
                      index === currentIcon 
                        ? 'bg-emerald-100 text-emerald-600 scale-110' 
                        : 'bg-gray-100 text-gray-400'
                    } transition-all duration-300`}
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: item.delay,
                    }}
                  >
                    <item.icon className="h-6 w-6" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Elementos decorativos flotantes */}
            <motion.div
              className="absolute -top-4 -left-4 bg-emerald-100/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-emerald-200"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <HeartHandshake className="h-8 w-8 text-emerald-600" />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 bg-teal-100/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-teal-200"
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Users className="h-8 w-8 text-teal-600" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-emerald-600 animate-bounce"
        >
          <span className="text-sm font-medium font-serif mb-2">
            {t('cooperativesection.discoverMore')} {/* ← TRADUCIBLE */}
          </span>
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}