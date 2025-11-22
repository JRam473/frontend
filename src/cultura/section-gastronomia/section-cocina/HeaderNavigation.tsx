// HeaderNavigation.tsx - Versión que solo funciona dentro de ViajeSensorialGastronomico
import { ChefHat, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useTranslation } from '../../../contexts/TranslationContext'; // ← AGREGAR IMPORT

interface HeaderNavigationProps {
  cocinas: any[];
  cocinaActiva: number;
  onCocinaChange: (index: number) => void;
  onNavigate: (section: string) => void;
  onSiguienteCocina: () => void;
  onAnteriorCocina: () => void;
}

export function HeaderNavigation({ 
  cocinas, 
  cocinaActiva, 
  onCocinaChange, 
  onSiguienteCocina,
  onAnteriorCocina
}: HeaderNavigationProps) {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  return (
    <>
      {/* Nav principal sticky - DENTRO del componente */}
      <div className="sticky top-0 z-50">
        <div className="bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <div className="flex items-center justify-between py-3 sm:py-4">
              
              {/* Logo y Título */}
              <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold font-serif text-gray-900 truncate">
                    {t('cocinas.header.gastronomicExperiences')} {/* ← TRADUCIBLE */}
                  </h1>
                  <p className="text-xs text-amber-600 font-medium font-serif hidden sm:block truncate">
                    {cocinas[cocinaActiva]?.nombre} {/* ← ESTE VIENE DEL JSON */}
                  </p>
                </div>
              </div>
              
              {/* Navegación entre cocinas */}
              <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6 flex-shrink-0">
                
                {/* Información de cocina activa */}
                <div className="hidden lg:flex items-center space-x-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <Sparkles className="h-4 w-4 text-amber-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-amber-700 whitespace-nowrap">
                    {cocinaActiva + 1} {t('cocinas.header.of')} {cocinas.length} {/* ← TRADUCIBLE */}
                  </span>
                </div>

                {/* Controles de navegación */}
                <div className="flex items-center space-x-1 sm:space-x-2 bg-amber-100 rounded-full p-1 border border-amber-200">
                  <button
                    onClick={onAnteriorCocina} 
                    className="p-2 rounded-full bg-white text-amber-700 hover:bg-amber-50 transition-all duration-200 shadow-sm hover:shadow-md border border-amber-200"
                    aria-label={t('cocinas.header.previousKitchen')} 
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  
                  {/* Indicadores de puntos */}
                  <div className="hidden md:flex space-x-1 mx-2">
                    {cocinas.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => onCocinaChange(index)}
                        className={`transition-all duration-200 ${
                          index === cocinaActiva 
                            ? 'bg-amber-600 w-3 h-3' 
                            : 'bg-amber-300 hover:bg-amber-400 w-2 h-2'
                        } rounded-full`}
                        aria-label={`${t('cocinas.header.goToKitchen')} ${index + 1}`} 
                      />
                    ))}
                  </div>

                  <button
                    onClick={onSiguienteCocina} 
                    className="p-2 rounded-full bg-white text-amber-700 hover:bg-amber-50 transition-all duration-200 shadow-sm hover:shadow-md border border-amber-200"
                    aria-label={t('cocinas.header.nextKitchen')} 
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}