import { useState, useRef, useEffect } from 'react';
import { type Product } from '../ServiciosSection';
import { useMobileDetection } from './ProductDetailComponents/hooks/useMobileDetection';
import { useProductImages } from './ProductDetailComponents/hooks/useProductImages';
import { useShareProduct } from './ProductDetailComponents/hooks/useShareProduct';
import { ProductHeader } from './ProductDetailComponents/ProductHeader';
import { ProductGallery } from './ProductDetailComponents/ProductGallery';
import { ProductSections } from './ProductDetailComponents/ProductSections';
import { ExpandedImageModal } from './ProductDetailComponents/ExpandedImageModal';
import { CheckCircle, Users } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export function ProductDetail({ product, onClose }: ProductDetailProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  
  const isMobile = useMobileDetection();
  
  const {
    currentImageIndex,
    isImageExpanded,
    setIsImageExpanded,
    allImages,
    hasGallery,
    nextImage,
    prevImage,
    goToImage
  } = useProductImages(product);

  const {
    showShareOptions,
    setShowShareOptions,
    copiedToClipboard,
    setCopiedToClipboard,
    handleShare,
    shareOnSocialMedia
  } = useShareProduct(product);

  // Scroll al top cuando cambia el producto
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [product]);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const hasVariants = product.variants && product.variants.length > 0;

  // Detectar si es tablet para eliminar animaciones
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const shouldRemoveAnimations = isMobile || isTablet;

  return (
    <>
      {/* Modal Principal - SIN ANIMACIONES */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="max-w-6xl w-full h-[95vh] sm:h-[90vh] bg-white rounded-3xl sm:rounded-3xl shadow-2xl overflow-hidden relative flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <ProductHeader
            onClose={onClose}
            onExpandImage={() => setIsImageExpanded(true)}
            showShareOptions={showShareOptions}
            setShowShareOptions={setShowShareOptions}
            copiedToClipboard={copiedToClipboard}
            setCopiedToClipboard={setCopiedToClipboard} 
            handleShare={handleShare}
            shareOnSocialMedia={shareOnSocialMedia}
            shouldRemoveAnimations={shouldRemoveAnimations}
          />

          <div className={`flex-1 min-h-0 flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
            <ProductGallery
              product={product}
              currentImageIndex={currentImageIndex}
              hasGallery={hasGallery}
              allImages={allImages}
              onPrevImage={prevImage}
              onNextImage={nextImage}
              onGoToImage={goToImage}
              onExpandImage={() => setIsImageExpanded(true)}
              isMobile={isMobile}
              shouldRemoveAnimations={shouldRemoveAnimations}
            />

            {/* Columna de Información */}
            <div className={`flex flex-col flex-1 min-h-0 ${
              isMobile ? 'border-t border-gray-200' : ''
            }`}>
              <div 
                ref={contentRef}
                className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"
              >
                {/* Header información */}
                <div className="mb-4 sm:mb-6">
                  <h2 
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-gray-900 leading-tight"
                  >
                    {product.name}
                  </h2>
                  
                  <div 
                    className={`inline-block bg-gradient-to-r ${
                      product.color || 'from-gray-500 to-gray-600'
                    } text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold font-serif mt-2 sm:mt-3 shadow-lg`}
                  >
                    {product.tag}
                  </div>
                </div>

                {/* Información de precio */}
                {product.price && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl sm:rounded-2xl border border-emerald-100">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-2xl sm:text-3xl font-bold font-serif text-emerald-600">
                        ${product.price}
                      </span>
                      {product.unit && (
                        <span className="text-base sm:text-lg text-gray-500">/{product.unit}</span>
                      )}
                      {hasVariants && (
                        <span className="text-xs sm:text-sm text-gray-500 ml-2">
                          ({product.variants!.length} {t('services.variantsCount')})
                        </span>
                      )}
                    </div>
                    
                    {/* Estado de stock */}
                    <div className="flex items-center gap-2 sm:gap-3 mt-2">
                      {product.available ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="font-semibold font-serif text-sm sm:text-base">
                            {t('services.available')}
                          </span>
                          {product.stock && (
                            <span className="text-xs sm:text-sm text-green-700">
                              {t('services.visitUs')}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-red-600">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                          <span className="font-semibold font-serif text-sm sm:text-base">
                            {t('services.soldOut')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <ProductSections
                  product={product}
                  activeSection={activeSection}
                  onToggleSection={toggleSection}
                  isMobile={isMobile}
                  shouldRemoveAnimations={shouldRemoveAnimations}
                />
              </div>

              {/* Botones de acción */}
              <div className="p-4 sm:p-6 lg:p-8 border-t border-gray-200 bg-white">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="/contacto"
                    className={`flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-center py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-bold font-serif shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base ${
                      shouldRemoveAnimations ? '' : 'hover:shadow-xl transition-all duration-300 hover:scale-105'
                    }`}
                  >
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                    {t('services.requestInfo')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar el menú de compartir - SIN ANIMACIONES */}
      {showShareOptions && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowShareOptions(false)}
        />
      )}

      <ExpandedImageModal
        isOpen={isImageExpanded}
        onClose={() => setIsImageExpanded(false)}
        currentImage={allImages[currentImageIndex]}
        alt={product.name}
        hasGallery={hasGallery}
        onPrevImage={prevImage}
        onNextImage={nextImage}
        onGoToImage={goToImage}
        currentImageIndex={currentImageIndex}
        allImages={allImages}
        shouldRemoveAnimations={shouldRemoveAnimations}
      />
    </>
  );
}