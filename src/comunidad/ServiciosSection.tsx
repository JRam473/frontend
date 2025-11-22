// ServiciosSection.tsx
import { useRef, useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter, Search, Grid3X3, List } from 'lucide-react';
import productsDataEs from '../archivos_data/cooperativa-products.json';
import productsDataEn from '../archivos_data/cooperativa-products.en.json'; // ← CREAR
import productsDataNah from '../archivos_data/cooperativa-products.nah.json'; // ← CREA
import { ProductCard } from '../comunidad/section-servicios/ProductCard';
import { ProductDetail } from '../comunidad/section-servicios/ProductDetail';
import { useTranslation } from '../contexts/TranslationContext'; // ← AGREGAR IMPORT
// tipos.ts o arriba en tu archivo
export interface Product {
  id: string;
  name: string;
  tag: string;
  category: string;
  mainImage: string;
  galleryImages: string[];
  story: string;
  description: string;
  materials: { icon: string; text: string }[];
  features: string[];
  price?: number;
  unit?: string;
  variants?: { name: string; price: number }[];
  available: boolean;
  stock: number;
  seasonal: boolean;
  highlight: boolean;
  color: string;
  producer: string;
  process: string;
}


export function ServiciosSection() {
    const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useTranslation(); // ← AGREGAR HOOK
  // Seleccionar datos según el idioma - MODIFICAR
  // Seleccionar datos según el idioma - NUEVO
  const productsData = useMemo(() => {
    switch (language) {
      case 'es':
        return productsDataEs;
      case 'en':
        return productsDataEn;
      case 'nah':
        return productsDataNah;
      default:
        return productsDataEs;
    }
  }, [language]);

  // Filtrar productos - MODIFICAR DEPENDENCIA
  useEffect(() => {
    let filtered = productsData;

    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, productsData]); // ← AGREGAR productsData
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(); // ← AGREGAR HOOK

  // Obtener categorías únicas
  const categories = ['todos', ...new Set(productsData.map(product => product.category))];

  // Filtrar productos
  useEffect(() => {
    let filtered = productsData;

    // Filtrar por categoría
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm]);

  // Reset scroll cuando se selecciona un producto
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  return (
    <section
    id="servicios"
    className="py-24 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dinsl266g/image/upload/v1763111232/Fondo-comunidad_nqg0wj.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
  >
  {/* capa translúcida para oscurecer o aclarar */}
      <div className="absolute inset-0 bg-black/10"></div>

    {/* Elementos decorativos opcionales */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-10 left-10 w-56 h-56 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>

    {/* Contenido principal */}
    <div
      ref={gridRef}
      className="relative max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 z-10"
    >
        
        {/* Controles de Filtro y Búsqueda */}
        {!selectedProduct && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Encabezado */}
<div className="text-center mb-8">
  <div className="inline-block bg-white/70 backdrop-blur-md border border-emerald-100 px-6 py-8 rounded-3xl shadow-lg shadow-emerald-900/10">
    <h2 className="text-4xl sm:text-5xl font-bold font-serif text-slate-900 mb-4">
      {t('services.ourCollection')}{' '} {/* ← TRADUCIBLE */}
      <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
        {/* Mantenemos "colección" como parte del diseño visual */}
        colección
      </span>
    </h2>
    <p className="text-lg text-slate-700 max-w-2xl mx-auto font-medium">
      {t('services.collectionDescription')} {/* ← TRADUCIBLE */}
    </p>
  </div>
</div>


            {/* Barra de controles */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-emerald-100">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Búsqueda */}
                <div className="flex-1 w-full lg:max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('services.searchPlaceholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap gap-3 items-center">
                  {/* Selector de categorías */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="pl-10 pr-8 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 appearance-none bg-white cursor-pointer transition-all duration-300"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'todos' 
                            ? t('services.allCategories') // ← TRADUCIBLE
                            : category.charAt(0).toUpperCase() + category.slice(1)
                          }
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selector de vista */}
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        viewMode === 'grid' 
                          ? 'bg-white text-emerald-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Grid3X3 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        viewMode === 'list' 
                          ? 'bg-white text-emerald-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Contador de resultados */}
              <div className="mt-4 text-center lg:text-left">
                <p className="text-sm text-gray-600">
                  {t('services.showingResults')}{' '} {/* ← TRADUCIBLE */}
                  <span className="font-semibold font-serif text-emerald-600">{filteredProducts.length}</span>{' '}
                  {t('services.of')}{' '} {/* ← TRADUCIBLE */}
                  <span className="font-semibold">{productsData.length}</span>{' '}
                  {t('services.products')} {/* ← TRADUCIBLE */}
                  {selectedCategory !== 'todos' && (
                    <span> {t('services.in')}{' '} <span className="font-semibold font-serif text-emerald-600">{selectedCategory}</span></span>
                  )}
                  {searchTerm && (
                    <span> {t('services.for')}{' '}"<span className="font-semibold font-serif text-emerald-600">{searchTerm}</span>"</span>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Cuadrícula de Productos */}
        {!selectedProduct && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {filteredProducts.length > 0 ? (
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' 
                  : 'space-y-6 max-w-4xl mx-auto'
                }
              `}>
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onSelect={() => setSelectedProduct(product)}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              /* Estado vacío */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto border border-emerald-100 shadow-lg">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold font-serif text-gray-900 mb-2">
                    {t('services.noProductsFound')} {/* ← TRADUCIBLE */}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {t('services.noProductsDescription')} {/* ← TRADUCIBLE */}
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('todos');
                    }}
                    className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-semibold font-serif hover:bg-emerald-600 transition-colors duration-300"
                  >
                    {t('services.showAllProducts')} {/* ← TRADUCIBLE */}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Vista Detallada del Producto */}
        <AnimatePresence>
          {selectedProduct && (
            <ProductDetail 
              product={selectedProduct} 
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 