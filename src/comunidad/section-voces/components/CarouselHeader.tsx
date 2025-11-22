// src/sections/VocesDeNuestraTierra/components/CarouselHeader.tsx
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../variants";
import { Mic2 } from "lucide-react";
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

export function CarouselHeader() {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="text-center mb-6 sm:mb-10 lg:mb-8"
    >
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full text-teal-800 mb-4 mx-auto"
      >
        <Mic2 className="w-5 h-5" />
        <span className="font-medium font-serif text-sm sm:text-base">
          {t('voices.header.title')} {/* ← TRADUCIBLE */}
        </span>
      </motion.div>
      
      <motion.h2
        variants={itemVariants}
        className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-slate-800 tracking-tight"
      >
        {t('voices.header.mainTitle')}{' '} {/* ← TRADUCIBLE */}
        <span className="bg-gradient-to-r from-teal-800 to-cyan-600 bg-clip-text text-transparent">
          {t('voices.header.connect')} {/* ← TRADUCIBLE */}
        </span>{' '}
        {t('voices.header.generations')} {/* ← TRADUCIBLE */}
      </motion.h2>
      
      <motion.p
        variants={itemVariants}
        className="mt-4 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base"
      >
        {t('voices.header.description')} {/* ← TRADUCIBLE */}
      </motion.p>
    </motion.div>
  );
}