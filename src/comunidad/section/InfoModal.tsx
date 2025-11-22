// src/components/InfoModal.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { type ElementType, type ReactNode } from 'react';
import { useTranslation } from '../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  Icon: ElementType;
  gradient: string;
  children: ReactNode;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 25 } },
} as const;

export function InfoModal({ isOpen, onClose, title, Icon, gradient, children }: ModalProps) {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="relative bg-slate-50 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] flex flex-col"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex-shrink-0 bg-gradient-to-r ${gradient} p-6 flex items-center justify-between text-white rounded-t-2xl`}>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Icon className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold font-serif">{title}</h2>
              </div>
              <button
                onClick={onClose}
                className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
                aria-label={t('present.closeModal')} 
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="p-8">
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}