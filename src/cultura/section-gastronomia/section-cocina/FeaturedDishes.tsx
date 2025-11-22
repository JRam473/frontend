import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface FeaturedDishesProps {
  cocina: any;
  onExpandRestaurant: (restaurante: any) => void;
}

export function FeaturedDishes({ cocina, onExpandRestaurant }: FeaturedDishesProps) {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  return (
    <section 
      id="platillos-emblematicos" 
      className="py-16 sm:py-20 lg:py-24 relative bg-[url('https://res.cloudinary.com/dinsl266g/image/upload/v1763083311/Fondo-gastronomia1_zqexyb.svg')] bg-no-repeat bg-center bg-cover"
    >
      {/* capa translúcida para oscurecer o aclarar */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12 lg:mb-16"
        >
          {/* Fondo translúcido con efecto blur */}
          <div className="inline-block bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-lg shadow-amber-900/10 px-6 sm:px-8 py-8 sm:py-10 max-w-4xl mx-auto">
            {/* Encabezado con íconos decorativos */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-serif text-gray-900">
                {t('cocinas.featuredDishes.emblematicDishes')} {/* ← TRADUCIBLE */}
              </h2>
              <Star className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 flex-shrink-0" />
            </div>

            {/* Texto descriptivo */}
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-medium font-serif leading-relaxed">
              {t('cocinas.featuredDishes.discoverFlavors')} {/* ← TRADUCIBLE */}
            </p>
          </div>
        </motion.div>

        {/* Grid de Platillos - MEJORADO RESPONSIVE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {cocina.especialidades
            .filter((esp: any) => esp.esEmblema)
            .slice(0, 3)
            .map((especialidad: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-amber-50 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100 group cursor-pointer"
              onClick={() => onExpandRestaurant({...cocina, especialidadDestacada: especialidad})}
            >
              
              {/* Imagen del Platillo - ALTURAS MEJORADAS */}
              <div className="relative h-40 sm:h-44 md:h-48 lg:h-52">
                <img
                  src={especialidad.imagen}
                  alt={especialidad.nombre}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badge Emblema - MEJORADO RESPONSIVE */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold font-serif flex items-center space-x-1 shadow-lg">
                  <Star className="h-3 w-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">{t('cocinas.featuredDishes.emblem')}</span> {/* ← TRADUCIBLE */}
                </div>
                
                {/* Overlay Hover - MEJORADO */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3">
                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  </div>
                </div>
              </div>

              {/* Contenido del Card - PADDING MEJORADO */}
              <div className="p-4 sm:p-5 lg:p-6">
                
                {/* Título - MEJORADO PARA MÓVIL */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold font-serif text-gray-900 mb-2 sm:mb-3 group-hover:text-amber-700 transition-colors line-clamp-2 leading-tight">
                  {especialidad.nombre} {/* ← VIENE DEL JSON */}
                </h3>
                
                {/* Descripción - TEXTOS MEJORADOS */}
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 font-medium leading-relaxed">
                  {especialidad.descripcion} {/* ← VIENE DEL JSON */}
                </p>
                
                {/* Precio y Botón - MEJORADO ALINEACIÓN */}
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-xl font-bold font-serif text-amber-600">
                    {t('cocinas.featuredDishes.currency')}{especialidad.precio} {/* ← TRADUCIBLE */}
                  </span>
                  <button className="text-amber-600 hover:text-amber-700 font-semibold font-serif text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 group-hover:translate-x-1 transition-transform duration-200">
                    <span className="whitespace-nowrap">{t('cocinas.featuredDishes.seeMore')}</span> {/* ← TRADUCIBLE */}
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}