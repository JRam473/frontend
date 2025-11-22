import { motion } from 'framer-motion';
import { BookOpen, Award, Sparkles, Wifi, Car, TreePine, Users, Utensils, BookOpen as Reservations, ChefHat, Calendar } from 'lucide-react';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface RestaurantInfoProps {
  cocina: any;
}

export function RestaurantInfo({ cocina }: RestaurantInfoProps) {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  // Mover la función getServiceIcon aquí ya que es específica de este componente
  const getServiceIcon = (servicio: string) => {
    const icons: { [key: string]: any } = {
      [t('cocinas.services.wifi')]: Wifi, // ← TRADUCIBLE
      [t('cocinas.services.parking')]: Car, // ← TRADUCIBLE
      [t('cocinas.services.garden')]: TreePine, // ← TRADUCIBLE
      [t('cocinas.services.groups')]: Users, // ← TRADUCIBLE
      [t('cocinas.services.takeaway')]: Utensils, // ← TRADUCIBLE
      [t('cocinas.services.reservations')]: Reservations, // ← TRADUCIBLE
      [t('cocinas.services.outdoor')]: TreePine, // ← TRADUCIBLE
      [t('cocinas.services.demonstrations')]: ChefHat, // ← TRADUCIBLE
      [t('cocinas.services.workshops')]: Utensils, // ← TRADUCIBLE
      [t('cocinas.services.ingredients')]: Sparkles, // ← TRADUCIBLE
      [t('cocinas.services.events')]: Calendar // ← TRADUCIBLE
    };
    return icons[servicio] || Sparkles;
  };

  return (
    <section
      id="informacion-restaurante"
      className="relative py-16 sm:py-20 lg:py-24 bg-[url('https://res.cloudinary.com/dinsl266g/image/upload/v1763083311/Fondo-gastronomia1_zqexyb.svg')] bg-no-repeat bg-center bg-cover"
    >
      {/* capa translúcida para oscurecer o aclarar */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Contenido principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          
          {/* Columna Izquierda - Historia y Servicios */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 lg:space-y-10"
          >
            
            {/* Historia */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-lg shadow-amber-900/10 p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 flex-shrink-0" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-serif text-gray-900">
                  {t('cocinas.restaurantInfo.ourStory')} {/* ← TRADUCIBLE */}
                </h2>
              </div>
              
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 mb-4 sm:mb-6 font-medium font-serif">
                {cocina.historia.contenido} {/* ← VIENE DEL JSON */}
              </p>

              <blockquote className="border-l-4 border-amber-500 pl-4 sm:pl-6 italic text-gray-700 my-4 sm:my-6 text-base sm:text-lg lg:text-xl font-light font-serif bg-amber-50/80 py-3 sm:py-4 rounded-r-xl">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 mb-1 sm:mb-2 inline-block mr-2" />
                “{cocina.historia.fraseEmblematica}” {/* ← VIENE DEL JSON */}
              </blockquote>
            </div>

            {/* Servicios del Restaurante - MEJORADO RESPONSIVE */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8 border border-amber-100">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 flex-shrink-0" />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-serif text-gray-900">
                  {t('cocinas.restaurantInfo.servicesWeOffer')} {/* ← TRADUCIBLE */}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                {cocina.servicios.map((servicio: string, index: number) => {
                  const IconComponent = getServiceIcon(servicio);
                  return (
                    <div 
                      key={index} 
                      className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors duration-200 group border border-amber-200/50"
                    >
                      <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                      </div>
                      <span className="text-xs sm:text-sm lg:text-base text-gray-700 font-medium font-serif break-words flex-1">
                        {servicio} {/* ← VIENE DEL JSON */}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
          </motion.div>

          {/* Columna Derecha - Imagen Ambiental */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-amber-100 transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src={cocina.imagenes.ambiente}
                alt={`${t('cocinas.restaurantInfo.kitchenAmbiance')} ${cocina.nombre}`}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover"
              />
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold font-serif text-gray-900">
                    {t('cocinas.restaurantInfo.theAmbiance')} {/* ← TRADUCIBLE */}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed font-medium font-serif">
                  {cocina.descripcionAmbiente} {/* ← VIENE DEL JSON */}
                </p>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}