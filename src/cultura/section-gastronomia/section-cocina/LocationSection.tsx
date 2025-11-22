import { motion } from 'framer-motion';
import { Compass, MapPin, Clock, Sparkles, ExternalLink } from 'lucide-react';
import { useTranslation } from '../../../contexts/TranslationContext';

interface LocationSectionProps {
  cocina: any;
}

export function LocationSection({ cocina }: LocationSectionProps) {
  const { t } = useTranslation();
  
  // Clave desde variables de entorno
  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapsEmbedUrl = import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL || 'https://www.google.com/maps/embed/v1/place';

  // Verificar que la clave esté disponible
  if (!mapsApiKey) {
    console.warn('Google Maps API key no configurada');
    return (
      <section id="ubicacion" className="relative overflow-hidden py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">Mapa no disponible temporalmente</p>
        </div>
      </section>
    );
  }

  const mapSrc = `${mapsEmbedUrl}?key=${mapsApiKey}&q=${encodeURIComponent(cocina.ubicacion.direccion)}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cocina.ubicacion.direccion)}`;

  return (
    <section id="ubicacion" className="relative overflow-hidden py-12 sm:py-16 lg:py-20 xl:py-24 bg-[url('https://res.cloudinary.com/dinsl266g/image/upload/v1763084436/Fondo-gastronomia--2_rvukkb.svg')] bg-no-repeat bg-center bg-cover">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          {/* Información de Contacto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <Compass className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-amber-600" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-gray-900">
                  {t('cocinas.location.visitUs')}
                </h2>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-amber-100">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mt-0.5 sm:mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold font-serif text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">
                      {t('cocinas.location.address')}
                    </h3>
                    <p className="text-gray-600 font-medium font-serif text-sm sm:text-base break-words">
                      {cocina.ubicacion.direccion}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
                      {cocina.ubicacion.puntoReferencia}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-amber-100">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mt-0.5 sm:mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold font-serif text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">
                      {t('cocinas.location.hours')}
                    </h3>
                    <div className="text-gray-600 space-y-1 sm:space-y-2 font-medium font-serif text-sm sm:text-base">
                      <div className="flex justify-between">
                        <span>{t('cocinas.location.mondayFriday')}:</span>
                        <span className="text-amber-600 font-semibold font-serif">{cocina.horarios.lunesViernes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t('cocinas.location.saturdaySunday')}:</span>
                        <span className="text-amber-600 font-semibold font-serif">{cocina.horarios.sabadoDomingo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recomendaciones - RESPONSIVE */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-amber-100 p-4 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-amber-600" />
                <h3 className="font-bold font-serif text-gray-900 text-base sm:text-lg">
                  {t('cocinas.location.recommendations')}
                </h3>
              </div>
              <ul className="text-gray-600 space-y-2 sm:space-y-3 font-medium font-serif text-sm sm:text-base">
                {cocina.recomendaciones.slice(0, 3).map((recomendacion: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                    <span className="break-words">{recomendacion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Mapa Seguro con Overlay para Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-amber-100 h-64 sm:h-80 lg:h-96 xl:h-auto min-h-[300px] group"
          >
            <div className="w-full h-full">
              <iframe
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.75rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${t('cocinas.location.locationOf')} ${cocina.nombre}`}
              />
            </div>
            
            {/* Overlay que aparece al hacer hover */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20 rounded-2xl sm:rounded-3xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg border border-amber-100 flex items-center space-x-2 sm:space-x-3 transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                <span className="font-semibold font-serif text-gray-900 text-sm sm:text-base">
                  {t('cocinas.location.locationOf') || 'Abrir en Google Maps'}
                </span>
              </motion.div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}