// src/sections/VocesDeNuestraTierra/components/ClosingSection.tsx
import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import { containerVariants, itemVariants } from "../variants";
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

export function ClosingSection() {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-12 sm:mt-16 text-center"
    >
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 bg-rose-100 px-4 py-2 rounded-full text-rose-700 mb-4"
      >
        <HeartHandshake className="w-5 h-5" />
        <span className="font-medium font-serif text-sm sm:text-base">
          {t('voices.closing.title')} {/* ← TRADUCIBLE */}
        </span>
      </motion.div>

      <motion.h3
        variants={itemVariants}
        className="text-lg sm:text-2xl font-semibold font-serif text-slate-800 max-w-2xl mx-auto"
      >
        {t('voices.closing.subtitle')} {/* ← TRADUCIBLE */}
      </motion.h3>

      <motion.p
        variants={itemVariants}
        className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto"
      >
        {t('voices.closing.description')} {/* ← TRADUCIBLE */}
      </motion.p>
    </motion.div>
  );
}