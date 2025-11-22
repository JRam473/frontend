// ArtesaniaCard.tsx - VERSIÓN CORREGIDA
import { motion } from 'framer-motion';
import type{ ArtisanCraft } from './types';
import { LazyImage } from './LazyImage';
import { useCategoryNames } from './types';
import { Scissors, Palette, Brush, Hand } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
interface ArtesaniaCardProps {
  craft: ArtisanCraft;
  onClick: (id: number) => void;
}
const iconComponents = {
  textiles: Scissors,
  ceramica: Palette,
  madera: Brush
};
export const ArtesaniaCard: React.FC<ArtesaniaCardProps> = ({ craft, onClick }) => {
  const categoryNames = useCategoryNames();
  const { t } = useTranslation();
  const CategoryIcon = iconComponents[craft.category];
  const categoryColorClass = craft.category === 'textiles' ? 'bg-blue-600' :
                            craft.category === 'ceramica' ? 'bg-amber-600' :
                            'bg-emerald-600';

  // 🔥 FUNCIÓN CORREGIDA - EVITA RECARGA
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // ← EVITA COMPORTAMIENTO POR DEFECTO DEL NAVEGADOR
    e.stopPropagation(); // ← EVITA PROPAGACIÓN DEL EVENTO
    onClick(craft.id);
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group cursor-pointer"
      onClick={handleClick} // ← USA LA FUNCIÓN CORREGIDA
    >
      {/* Indicador de interactividad - Nuevo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg animate-bounce"
      >
        <Hand className="w-4 h-4 text-amber-600" />
      </motion.div>

      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col border-2 border-transparent hover:border-amber-300 group">
        {/* Imagen con overlay interactivo */}
        <div className="relative h-64 overflow-hidden">
          <LazyImage
            src={craft.image}
            alt={craft.name}
            className="group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Overlay de hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="text-white text-sm font-semibold bg-amber-600/90 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2"
            >
              <Hand className="w-4 h-4" />
              {t('crafts.viewDetails')}
            </motion.div>
          </div>
          
          {/* Versión móvil del indicador - Siempre visible en móvil */}
          <div className="lg:hidden absolute bottom-4 right-4 z-20 bg-amber-600 text-white px-3 py-2 rounded-full shadow-lg flex items-center gap-2">
            <Hand className="w-3 h-3" />
            <span className="text-xs font-semibold">{t('crafts.viewDetails')}</span>
          </div>
          
          {/* Badge de categoría */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium font-serif text-white ${categoryColorClass}`}>
              <CategoryIcon className="w-3 h-3 inline mr-1" />
              {categoryNames[craft.category]}
            </span>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold font-serif text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
            {craft.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
            {craft.description}
          </p>

          {/* Información del artesano */}
          <div className="border-t border-gray-100 pt-4 mt-auto">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="font-medium text-gray-700">{craft.artisan.name}</span>
              <span>{craft.timeRequired}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {craft.artisan.experience}
            </div>
          </div>

          {/* Precio */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-lg font-bold text-amber-700">
              {craft.priceRange}
            </div>
          </div>
        </div>

        {/* Indicador de click en el borde inferior - Nuevo */}
        <motion.div
          className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scaleX: 1.05 }}
        />
      </div>
    </motion.div>
  );
};