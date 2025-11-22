import { ArrowDown, ArrowLeft, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom"; 
import { useTranslation } from '../../contexts/TranslationContext';

export function GastronomySection() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <section
      id="section-gastronomia"
      aria-labelledby="culture-heading"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Video de fondo en pantalla completa CON CLOUDINARY */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_1920/v1763167588/video_bg_poster_kwpvy5.webp"
          className="w-full h-full object-cover"
        >
          {/* ✅ SOLO una fuente - Cloudinary maneja formatos automáticamente */}
          <source 
            src="https://res.cloudinary.com/dinsl266g/video/upload/f_auto,q_auto/v1763167598/video-gastronomico_k5tnw3.mp4" 
            type="video/mp4" 
          />
          
          {/* Fallback para navegadores antiguos */}
          Tu navegador no soporta la reproducción de video.
        </video>

        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/30"></div>
      </div>

      {/* Contenido principal centrado */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Badge superior */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100/80 to-lime-100/80 px-4 py-2 rounded-full mb-6 backdrop-blur-sm shadow-sm">
            <Utensils className="h-5 w-5 text-amber-700" aria-hidden="true" />
            <span className="text-lime-800 font-medium font-serif">
              {t('gastronomysection.flavorsOfTahitic')}
            </span>
          </div>

          {/* Título principal */}
          <h2
            id="gastronomia-heading"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-serif leading-tight text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)] text-center"
          >
            {t('gastronomysection.mexicanGastronomy')}{' '}
            <span className="bg-gradient-to-r from-amber-500 via-red-500 to-lime-600 bg-clip-text text-transparent">
              Mexicana
            </span>
          </h2>

          {/* Descripción */}
          <p className="mt-4 text-base sm:text-lg text-white text-center drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)] max-w-3xl">
            {t('gastronomysection.description')}
          </p>
        </motion.div>

        {/* Botones centrados */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-amber-600 text-amber-700 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5" />
            {t('gastronomysection.back')}
          </motion.button>
          <motion.button
            onClick={() =>
              document.getElementById("cocinas")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold font-serif px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-colors animate-bounce"
          >
            {t('gastronomysection.exploreGastronomy')}
            <ArrowDown className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}