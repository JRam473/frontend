// ViajeSensorialGastronomico.tsx - Versión híbrida MODIFICADA
import { useEffect, useState } from 'react';
import { FloatingNavigation } from '../section-gastronomia/section-cocina/FloatingNavigation';
import { HeroSection } from '../section-gastronomia/section-cocina/HeroSection';
import { RestaurantInfo } from '../section-gastronomia/section-cocina/RestaurantInfo';
import { FeaturedDishes } from '../section-gastronomia/section-cocina/FeaturedDishes';
import { LocationSection } from '../section-gastronomia/section-cocina/LocationSection';
import { ExpandedModal } from '../section-gastronomia/section-cocina/ExpandedModal';
import { useCocinasData } from '../../hooks/useCocinasData'; // ← AGREGAR IMPORT
import { Wifi, Car, TreePine, Users, Utensils, BookOpen, ChefHat, Sparkles, Calendar } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';
export function ViajeSensorialGastronomico() {
  // REEMPLAZAR todo el estado anterior con el hook
  const {
    cocinasData: cocinas,
    cocina,
    cocinaActiva,
    setCocinaActiva,
    siguienteCocina,
    anteriorCocina
  } = useCocinasData();

  const [restauranteExpandido, setRestauranteExpandido] = useState<any>(null);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const { t } = useTranslation();

  // Detectar cuando el usuario está en la sección de cocinas
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('cocinas-section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isInView = rect.top <= 100 && rect.bottom >= 100;
      
      setShowFloatingNav(isInView);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar estado inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ocultar floating nav después de interacción en móvil
  useEffect(() => {
    if (hasUserInteracted) {
      const timer = setTimeout(() => {
        setShowFloatingNav(false);
        setHasUserInteracted(false);
      }, 3000); // Ocultar después de 3 segundos de inactividad

      return () => clearTimeout(timer);
    }
  }, [hasUserInteracted]);

  const getServiceIcon = (servicio: string) => {
    const icons: { [key: string]: any } = {
      [t('cocinas.services.wifi')]: Wifi,
      [t('cocinas.services.parking')]: Car,
      [t('cocinas.services.garden')]: TreePine,
      [t('cocinas.services.groups')]: Users,
      [t('cocinas.services.takeaway')]: Utensils,
      [t('cocinas.services.reservations')]: BookOpen,
      [t('cocinas.services.outdoor')]: TreePine,
      [t('cocinas.services.demonstrations')]: ChefHat,
      [t('cocinas.services.workshops')]: Utensils,
      [t('cocinas.services.ingredients')]: Sparkles,
      [t('cocinas.services.events')]: Calendar
    };
    return icons[servicio] || Sparkles;
  };

  const handleNavigate = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCocinaChange = (index: number) => {
    setCocinaActiva(index);
    setHasUserInteracted(true);
  };

  return (
    <div 
      id="cocinas-section"
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 overflow-x-hidden relative"
    >
      {/* CONTENEDOR PARA STICKY RELATIVE */}
      <div className="relative">
        
        {/* Floating Navigation Contextual */}
        <FloatingNavigation
          cocinas={cocinas}
          cocinaActiva={cocinaActiva}
          onCocinaChange={handleCocinaChange}
          onSiguienteCocina={siguienteCocina}
          onAnteriorCocina={anteriorCocina}
          isVisible={showFloatingNav}
          onClose={() => setShowFloatingNav(false)}
        />

        {/* HERO SECTION CON NAVEGACIÓN INTEGRADA */}
        <HeroSection 
          cocina={cocina}
          cocinaActiva={cocinaActiva}
          totalCocinas={cocinas.length}
          onNavigate={handleNavigate}
          onSiguienteCocina={siguienteCocina}
          onAnteriorCocina={anteriorCocina}
          onCocinaChange={setCocinaActiva}
        />

        {/* Restaurant Info */}
        <RestaurantInfo cocina={cocina} />

        {/* Featured Dishes */}
        <FeaturedDishes 
          cocina={cocina}
          onExpandRestaurant={setRestauranteExpandido}
        />

        {/* Location Section */}
        <LocationSection cocina={cocina} />

        {/* Expanded Modal */}
        <ExpandedModal 
          restauranteExpandido={restauranteExpandido}
          onClose={() => setRestauranteExpandido(null)}
          getServiceIcon={getServiceIcon}
        />
      </div>
    </div>
  );
}