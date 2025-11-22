import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { type Product } from '../../ServiciosSection';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface ProductSectionsProps {
  product: Product;
  activeSection: string | null;
  onToggleSection: (section: string) => void;
  isMobile: boolean;
  shouldRemoveAnimations?: boolean;
}

import { 
  Coffee, Leaf, Sun, Wine, Droplet, FlaskConical,
  Sprout, Flower, Beef, Star, Calendar, Users,
  Shield
} from 'lucide-react';

const iconMap: { [key: string]: React.ComponentType<any> } = { 
  Coffee, 
  Leaf, 
  Sun, 
  Wine, 
  Droplet, 
  FlaskConical,
  Sprout, 
  Flower, 
  Beef, 
  Star, 
  Calendar, 
  Users, 
  Shield, 
  CheckCircle 
};

const getIconComponent = (iconName: string): React.ComponentType<any> => {
  return iconMap[iconName] || iconMap.Leaf;
};

export function ProductSections({ 
  product, 
  activeSection, 
  onToggleSection, 
  isMobile 
}: ProductSectionsProps) {
  const { t } = useTranslation(); // ← AGREGAR HOOK
  
  const hasFeatures = product.features && product.features.length > 0;

  const sections = [
    {
      id: 'description',
      title: t('services.description'), // ← TRADUCIBLE
      content: product.description,
      icon: null,
      alwaysOpen: true
    },
    {
      id: 'story',
      title: t('services.ourStory'), // ← TRADUCIBLE
      content: product.story,
      icon: iconMap.Users,
      alwaysOpen: false
    },
    {
      id: 'materials',
      title: t('services.ingredientsProcess'), // ← TRADUCIBLE
      content: null,
      icon: iconMap.Shield,
      alwaysOpen: false,
      customContent: (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium font-serif text-gray-700 mb-3">
              {t('services.mainMaterials')} {/* ← TRADUCIBLE */}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.materials.map((material, index) => {
                const Icon = getIconComponent(material.icon);
                return (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Icon className="h-4 w-4 text-amber-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{material.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {product.process && (
            <div>
              <h4 className="font-medium font-serif text-gray-700 mb-2">
                {t('services.artisanalProcess')} {/* ← TRADUCIBLE */}
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm bg-amber-50 p-4 rounded-lg border border-amber-100">
                {product.process}
              </p>
            </div>
          )}
        </div>
      )
    },
    ...(hasFeatures ? [{
      id: 'features',
      title: t('services.featuredCharacteristics'), // ← TRADUCIBLE
      content: null,
      icon: CheckCircle,
      alwaysOpen: false,
      customContent: (
        <div className="grid grid-cols-1 gap-3">
          {product.features!.map((feature, index) => (
            <div key={index} className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      )
    }] : []),
    ...(product.producer ? [{
      id: 'producer',
      title: t('services.madeBy'), // ← TRADUCIBLE
      content: product.producer,
      icon: null,
      alwaysOpen: false
    }] : [])
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      {sections.map((section) => {
        const isOpen = section.alwaysOpen || activeSection === section.id;
        const SectionIcon = section.icon;
        if (isMobile && !section.alwaysOpen) {
          return (
            <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => onToggleSection(section.id)}
                className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  {SectionIcon && <SectionIcon className="h-5 w-5 text-amber-600" />}
                  <span className="font-semibold font-serif text-gray-800">{section.title}</span>
                </div>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-white">
                      {section.customContent || (
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                          {section.content}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }
        return (
          <div key={section.id} className="bg-white rounded-xl p-4 sm:p-0 sm:bg-transparent">
            <div className="flex items-center gap-3 mb-3">
              {SectionIcon && <SectionIcon className="h-5 w-5 text-amber-600" />}
              <h3 className="font-semibold font-serif text-gray-800 text-lg">{section.title}</h3>
            </div>
            {section.customContent || (
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {section.content}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}