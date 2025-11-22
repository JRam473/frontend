import { ArrowDown, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext'; // ← AGREGAR IMPORT

export function CommunityHome() {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  return (
    <section
      id="comunidad"
      aria-labelledby="community-heading"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Video de fondo representativo de la comunidad */}
            {/* Video de fondo con Cloudinary - OPTIMIZADO */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_1920/v1763067116/poster-hero_xsde4t.webp"
          className="w-full h-full object-cover"
        >
          {/* ✅ SOLO una fuente - Cloudinary optimiza automáticamente */}
          <source 
            src="https://res.cloudinary.com/dinsl266g/video/upload/f_auto,q_70,w_1920/v1763067192/Hero-com_ix9wg0.mp4" 
            type="video/mp4" 
          />
          {/* Fallback para navegadores antiguos */}
          Tu navegador no soporta la reproducción de video.
        </video>

        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/30"></div>
      </div>

      {/* Contenido principal centrado */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Badge superior temático */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-100/80 to-cyan-100/80 px-4 py-2 rounded-full mb-6 backdrop-blur-sm shadow-sm">
            <HeartHandshake className="h-5 w-5 text-teal-600" aria-hidden="true" />
            <span className="text-teal-800 font-medium font-serif">
              {t('community.ourPeopleOurStrength')} {/* ← TRADUCIBLE */}
            </span>
          </div>

          {/* Título principal optimizado para SEO */}
          <h1
            id="community-heading"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-serif leading-tight text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
          >
            {t('community.unitedBy')}{' '} {/* ← TRADUCIBLE */}
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
              {t('community.tradition')} {/* ← TRADUCIBLE */}
            </span>
          </h1>

          {/* Descripción */}
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]">
            {t('community.description')} {/* ← TRADUCIBLE */}
          </p>
        </motion.div>

        {/* Botones de llamada a la acción */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() =>
              document.getElementById("raices")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-teal-500 text-white font-semibold font-serif px-6 py-3 rounded-full shadow-lg hover:bg-teal-600 transition-colors"
          >
            {t('community.learnOurHistory')} {/* ← TRADUCIBLE */}
            <ArrowDown className="h-5 w-5" />
          </motion.button>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/section-cooperativa"
              className="block border-2 border-cyan-400 text-cyan-100 hover:bg-cyan-500/20 px-8 py-3 rounded-full font-semibold font-serif transition-all duration-300 text-center backdrop-blur-sm"
            >
              {t('community.communityCooperative')} {/* ← TRADUCIBLE */}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}