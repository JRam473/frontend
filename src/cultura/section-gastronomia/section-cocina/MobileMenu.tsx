import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Compass, Star } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

export function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  const handleNavigation = (section: string) => {
    onNavigate(section);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden border-t border-amber-200 pt-4 pb-2"
        >
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => handleNavigation('informacion-restaurante')}
              className="flex items-center space-x-3 text-gray-700 hover:text-amber-600 transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              <span>Nuestra Historia</span>
            </button>
            <button
              onClick={() => handleNavigation('ubicacion')}
              className="flex items-center space-x-3 text-gray-700 hover:text-amber-600 transition-colors"
            >
              <Compass className="h-5 w-5" />
              <span>Ubicación</span>
            </button>
            <button
              onClick={() => handleNavigation('platillos-emblematicos')}
              className="flex items-center space-x-3 text-gray-700 hover:text-amber-600 transition-colors"
            >
              <Star className="h-5 w-5" />
              <span>Platillos Emblemáticos</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}