// FilterButtons.tsx
import { motion } from 'framer-motion';
import type{ FilterType } from './types';
import { Scissors, Palette, Brush } from 'lucide-react';
import { useCategoryNames } from './types'; // ← AGREGAR IMPORT

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  currentFilter, 
  onFilterChange 
}) => {
  const categoryNames = useCategoryNames(); // ← AGREGAR HOOK

  // Usar las categorías traducidas - MODIFICADO
  const translatedFilterOptions = [
    { key: 'todos' as const, label: categoryNames.todos, icon: null }, // ← TRADUCIBLE
    { key: 'textiles' as const, label: categoryNames.textiles, icon: Scissors }, // ← TRADUCIBLE
    { key: 'ceramica' as const, label: categoryNames.ceramica, icon: Palette }, // ← TRADUCIBLE
    { key: 'madera' as const, label: categoryNames.madera, icon: Brush }, // ← TRADUCIBLE
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-wrap justify-center gap-4 mb-12"
    >
      {translatedFilterOptions.map(({ key, label, icon: IconComponent }) => (
        <button
          key={key}
          onClick={(e) => {
            console.log('🔄 FilterButtons click - Previniendo recarga');
            e.preventDefault();
            e.stopPropagation(); // ← SOLO ESTA LÍNEA
            onFilterChange(key);
          }}
          className={`px-6 py-3 rounded-full font-semibold font-serif transition-all duration-300 flex items-center gap-2 ${
            currentFilter === key 
              ? 'bg-amber-600 text-white shadow-lg' 
              : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
          }`}
          type="button" // ← ESTO ES CRÍTICO
        >
          {IconComponent && <IconComponent className="w-4 h-4" />}
          {label}
        </button>
      ))}
    </motion.div>
  );
};