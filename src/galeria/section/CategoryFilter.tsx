// components/CategoryFilter.tsx
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-10 flex justify-center"
    >
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-3 border border-slate-700/50 max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category)}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50 border border-slate-600/50'
              }`}
            >
              {category === 'todas' ? 'Todas las Categorías' : 
               category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}