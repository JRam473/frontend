// ProductCard.tsx
import { motion } from 'framer-motion';
import { 
  Star, 
  Leaf, 
  Calendar,
  Zap,
  Coffee,
  Wine,
  FlaskConical,
  Sprout,
  Flower,
  Beef, // Usamos Beef en lugar de Bee
  Target,
  Clock,
  Shield
} from 'lucide-react';
import { type Product } from '../ServiciosSection';
import { useTranslation } from '../../contexts/TranslationContext'; // ← AGREGAR IMPORT

// Mapeo de íconos para los materiales con tipado seguro
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Coffee: Coffee,
  Leaf: Leaf,
  Sun: Zap,
  Wine: Wine,
  Droplet: FlaskConical,
  FlaskConical: FlaskConical,
  Sprout: Sprout,
  Flower: Flower,
  Bee: Beef, // Usamos Beef como sustituto
  Target: Target,
  Clock: Clock,
  Shield: Shield
};

interface ProductCardProps {
  product: Product;
  onSelect: () => void;
  index: number;
}

export function ProductCard({ product, onSelect, index }: ProductCardProps) {
  // Ícono por defecto si no se encuentra el específico
  const defaultIcon = Leaf;
  const { t } = useTranslation(); // ← AGREGAR HOOK
  
  // Obtener el componente de ícono de manera segura
  const getIconComponent = (iconName: string): React.ComponentType<any> => {
    return iconMap[iconName] || defaultIcon;
  };

  const firstMaterialIcon = product.materials[0]?.icon;
  const IconComponent = firstMaterialIcon ? getIconComponent(firstMaterialIcon) : defaultIcon;

  return (
    <motion.div
      layoutId={`product-card-${product.id}`}
      onClick={onSelect}
      className="group cursor-pointer rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-emerald-200"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      {/* Header con imagen y etiquetas */}
      <div className="relative overflow-hidden">
        <motion.img
          layoutId={`product-image-${product.id}`}
          src={product.mainImage}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay de gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Etiquetas superpuestas */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.highlight && (
            <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold font-serif flex items-center gap-1 shadow-lg">
              <Star className="h-3 w-3" />
              {t('services.featured')} {/* ← TRADUCIBLE */}
            </div>
          )}
          
          {product.seasonal && (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold font-serif flex items-center gap-1 shadow-lg">
              <Calendar className="h-3 w-3" />
              {t('services.seasonal')} {/* ← TRADUCIBLE */}
            </div>
          )}
        </div>

        {/* Badge de categoría */}
        <div className="absolute top-3 right-3">
          <div className={`bg-gradient-to-r ${product.color} text-white px-3 py-1 rounded-full text-xs font-bold font-serif shadow-lg`}>
            {product.tag}
          </div>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-5">
        {/* Header del contenido */}
        <div className="flex items-start justify-between mb-3">
          <motion.h3 
            layoutId={`product-name-${product.id}`}
            className="text-xl font-bold font-serif text-gray-900 leading-tight flex-1"
          >
            {product.name}
          </motion.h3>
          <div className="bg-emerald-50 p-2 rounded-xl ml-3">
            <IconComponent className="h-5 w-5 text-emerald-600" />
          </div>
        </div>

        {/* Descripción breve */}
        <motion.p 
          layoutId={`product-description-${product.id}`}
          className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2"
        >
          {product.description}
        </motion.p>

        {/* Materiales principales */}
        <div className="flex items-center gap-3 mb-4">
          {product.materials.slice(0, 2).map((material, idx) => {
            const MaterialIcon = getIconComponent(material.icon);
            return (
              <div key={idx} className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                <MaterialIcon className="h-3 w-3 text-gray-500" />
                <span className="text-xs text-gray-600">{material.text}</span>
              </div>
            );
          })}
          {product.materials.length > 2 && (
            <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
              +{product.materials.length - 2} {t('services.moreItems')} {/* ← TRADUCIBLE */}
            </div>
          )}
        </div>

        {/* Información de precio y disponibilidad */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {product.price && (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-serif text-emerald-600">
                  ${product.price}
                </span>
                {product.unit && (
                  <span className="text-sm text-gray-500">/{product.unit}</span>
                )}
              </div>
            )}
            
            {product.variants && (
              <span className="text-sm text-gray-500">
                {product.variants.length} {t('services.variants')} {/* ← TRADUCIBLE */}
              </span>
            )}
          </div>

          {/* Estado de stock */}
          <div className="flex items-center gap-2">
            {product.available ? (
              <div className="flex items-center gap-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium font-serif">
                  {t('services.available')} {/* ← TRADUCIBLE */}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs font-medium font-serif">
                  {t('services.soldOut')} {/* ← TRADUCIBLE */}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Productor */}
        {product.producer && (
          <motion.p 
            layoutId={`product-producer-${product.id}`}
            className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100"
          >
            {t('services.by')} {product.producer} {/* ← TRADUCIBLE */}
          </motion.p>
        )}
      </div>

      {/* Efecto de brillo al hacer hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/0 via-emerald-200/0 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}