import { motion } from 'framer-motion';
import { Sparkles, Heart, Utensils, Star, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

export function CallToAction() {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  return (
    <section className="bg-gradient-to-br from-amber-600 via-amber-700 to-orange-700 text-white py-16 sm:py-20 lg:py-24 xl:py-28 relative overflow-hidden">
      {/* Fondos decorativos sutiles */}
      <div className="absolute inset-0 bg-black/5"></div>
      
      {/* Patrón de elementos decorativos */}
      <div className="absolute top-10 right-10 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 
                     bg-amber-300/10 rounded-full animate-pulse">
      </div>
      
      <div className="absolute bottom-10 left-10 w-12 h-12 sm:w-20 sm:h-20 lg:w-28 lg:h-28 
                     bg-orange-300/10 rounded-full animate-pulse delay-1000">
      </div>
      
      <div className="absolute top-1/2 left-1/4 w-8 h-8 sm:w-14 sm:h-14 lg:w-20 lg:h-20 
                     bg-amber-200/5 rounded-full animate-pulse delay-500">
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icono principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-6 sm:mb-8"
        >
          <div className="relative inline-block">
            <Sparkles className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 text-amber-300 animate-pulse" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border-2 border-amber-300/30 rounded-full"
            ></motion.div>
          </div>
        </motion.div>

        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif mb-4 sm:mb-6 leading-tight">
            {t('call.discoverThe')}{' '} {/* ← TRADUCIBLE */}
            <span className="text-amber-300 bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
              {t('call.magic')} {/* ← TRADUCIBLE */}
            </span>{' '}
            {t('call.ofOurCuisine')} {/* ← TRADUCIBLE */}
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl lg:text-2xl opacity-90 font-light font-serif max-w-3xl mx-auto leading-relaxed"
          >
            {t('call.subtitle')} {/* ← TRADUCIBLE */}
          </motion.p>
        </motion.div>

        {/* Elementos destacados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16 max-w-2xl mx-auto"
        >
          {/* Ingredientes locales */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 mb-2 inline-block">
              <Utensils className="h-6 w-6 sm:h-8 sm:w-8 text-amber-300 mx-auto" />
            </div>
            <p className="text-xs sm:text-sm font-medium font-serif text-amber-200 whitespace-pre-line">
              {t('call.features.localIngredients')} {/* ← TRADUCIBLE */}
            </p>
          </motion.div>

          {/* Tradición familiar */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 mb-2 inline-block">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-amber-300 mx-auto" />
            </div>
            <p className="text-xs sm:text-sm font-medium font-serif text-amber-200 whitespace-pre-line">
              {t('call.features.familyTradition')} {/* ← TRADUCIBLE */}
            </p>
          </motion.div>

          {/* Calidad garantizada */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 mb-2 inline-block">
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-amber-300 mx-auto" />
            </div>
            <p className="text-xs sm:text-sm font-medium font-serif text-amber-200 whitespace-pre-line">
              {t('call.features.qualityGuaranteed')} {/* ← TRADUCIBLE */}
            </p>
          </motion.div>

          {/* Ambiente único */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 sm:p-4 mb-2 inline-block">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-amber-300 mx-auto" />
            </div>
            <p className="text-xs sm:text-sm font-medium font-serif text-amber-200 whitespace-pre-line">
              {t('call.features.cozyAtmosphere')} {/* ← TRADUCIBLE */}
            </p>
          </motion.div>
        </motion.div>

        {/* Call to Action principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block w-full max-w-sm sm:max-w-md"
          >
            <Card className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 sm:px-12 py-4 sm:py-6 rounded-2xl font-bold font-serif text-lg sm:text-xl lg:text-2xl hover:from-amber-600 hover:to-orange-600 transition-all duration-500 shadow-2xl hover:shadow-3xl cursor-pointer border-0 relative overflow-hidden">
              {/* Efecto de brillo al hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <div className="flex items-center justify-center space-x-3 sm:space-x-4 relative z-10">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                <span>{t('call.ctaButton')}</span> {/* ← TRADUCIBLE */}
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Mensaje final inspirador */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="space-y-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-amber-200 text-base sm:text-lg lg:text-xl italic max-w-2xl mx-auto leading-relaxed"
          >
            "{t('call.inspirationalQuote')}" {/* ← TRADUCIBLE */}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 }}
            className="flex justify-center items-center space-x-2 text-amber-300/70 text-sm sm:text-base"
          >
            <div className="w-8 h-px bg-amber-300/50"></div>
            <span>{t('call.waitingMessage')}</span> {/* ← TRADUCIBLE */}
            <div className="w-8 h-px bg-amber-300/50"></div>
          </motion.div>
        </motion.div>

        {/* Elemento decorativo final */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "100px" }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-8 sm:mt-12 mx-auto h-1 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent rounded-full"
        ></motion.div>
      </div>
    </section>
  );
}