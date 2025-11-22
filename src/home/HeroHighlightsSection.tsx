import { type FC, type JSX } from "react";
import { forwardRef } from 'react';
import { useTranslation } from '../contexts/TranslationContext';
// Importamos las animaciones pero las controlaremos condicionalmente
import FishAnimation from "../animations/FishAnimation";
import CasseroleAnimation from "../animations/CasseroleAnimation";
import CommunityAnimation from "../animations/CommunityAnimation";
import TraditionsAnimation from "../animations/TraditionsAnimation";
import { useEffect, useState } from "react";

/* ============================
  Hook para detección de dispositivo
============================ */
const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      // Móvil: < 768px, Tablet: 768px - 1024px
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1024);
    };

    checkDevice();
    
    // Debounce resize para mejor performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkDevice, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return { 
    isMobile, 
    isTablet,
    shouldRemoveAnimations: isMobile || isTablet // Eliminar animaciones en móviles Y tablets
  };
};

/* ============================
  1. Tipos y datos
=========================== */
interface HighlightSectionProps {
  title: string;
  text: string;
  image: string;
  icon: JSX.Element;
  gradient?: string;
  align?: "left" | "right" | "center";
  stats?: {value: string; label: string}[];
  backgroundAnimation?: JSX.Element;
}

interface StatsBlockProps {
  stats: { value: string; label: string }[];
  align: "left" | "right" | "center";
  shouldRemoveAnimations: boolean;
}

// ✅ URLs OPTIMIZADAS con Cloudinary - RESPONSIVE y MODERNAS
const getSections = (t: (key: any) => string): HighlightSectionProps[] => [
  {
    title: t('highlights.natureTitle'),
    text: t('highlights.natureText'),
    image: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_800/v1763061088/Monte_virgen_oznfhp.jpg",
    icon: <Mountain className="h-10 w-10 text-white" role="img" aria-label="Icono de montaña representando naturaleza" />,
    gradient: "from-blue-900/30 to-black/60",
    align: "center",
    stats: [
      {value: "150+", label: t('highlights.touristPlaces')},
    ],
    backgroundAnimation: <FishAnimation count={10} />,
  },
  {
    title: t('highlights.gastronomyTitle'),
    text: t('highlights.gastronomyText'),
    image: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_800/v1763061074/gastronomia_knugxq.jpg",
    icon: <Utensils className="h-10 w-10 text-white" role="img" aria-label="Icono de comida representando gastronomía" />,
    gradient: "from-amber-900/80 to-black/60",
    align: "left",
    stats: [
      {value: "20+", label: t('highlights.typicalDishes')},
    ],
    backgroundAnimation: <CasseroleAnimation count={20}/>,
  },
  {
    title: t('highlights.communityTitle'),
    text: t('highlights.communityText'),
    image: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_800/v1763061102/Comunidad_x2zn6s.jpg",
    icon: <Users className="h-10 w-10 text-white" role="img" aria-label="Icono de personas representando la comunidad" />,
    gradient: "from-cyan-900/80 to-black/60",
    align: "right",
    stats: [
      {value: "2500+", label: t('highlights.inhabitants')},
    ],
    backgroundAnimation: <CommunityAnimation count={20} />,
  },
  {
    title: t('highlights.traditionsTitle'),
    text: t('highlights.traditionsText'),
    image: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_800/v1763061095/Tradiciones_xizkdo.jpg",
    icon: <Sun className="h-10 w-10 text-white" role="img" aria-label="Icono de voladores representando tradiciones" />,
    gradient: "from-pink-900/80 to-black/60",
    align: "center",
    stats: [
      {value: "400+", label: t('highlights.yearsHistory')},
    ],
    backgroundAnimation: <TraditionsAnimation count={8} />,
  },
];

// Importamos los íconos de Lucide React
import { Mountain, Utensils, Users, Sun } from "lucide-react";

/* ===========================
   Componente de estadísticas SIN ANIMACIONES
=========================== */
const StatsBlock: FC<StatsBlockProps> = ({ stats, align }) => {
  return (
    <div
      className={`mt-8 flex flex-wrap gap-x-12 gap-y-6 ${
        align === "left"
          ? "justify-start"
          : align === "right"
          ? "justify-end"
          : "justify-center"
      }`}
    >
      {stats.map((s, i) => (
        <div 
          key={i} 
          className="flex flex-col items-center" 
          role="group" 
          aria-label={`${s.label}: ${s.value}`}
        >
          <span className="text-5xl md:text-6xl font-extrabold font-serif text-white leading-none">
            {s.value}
          </span>
          <span className="text-sm md:text-base text-gray-200 mt-2 text-center max-w-[120px]">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
};

/* ===========================
   2. Componente de sección individual OPTIMIZADO SIN ANIMACIONES
=========================== */
const HighlightSection: FC<HighlightSectionProps> = ({
  title,
  text,
  image,
  icon,
  gradient = "from-black/80 to-black/40",
  align = "center",
  stats,
  backgroundAnimation,
}) => {
  const { shouldRemoveAnimations } = useDeviceDetection();
  const alignment = align === "left" ? "items-start text-left" : align === "right" ? "items-end text-right" : "items-center text-center";

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo SIN animaciones */}
      <img
        src={image}
        alt={`Imagen representando ${title.toLowerCase()} en San Juan Tahitic`}
        className="absolute inset-0 w-full h-full object-cover z-0"
        loading="lazy"
        decoding="async"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
      />

      {/* Overlay degradado */}
      <div className={`absolute inset-0 bg-gradient-to-t ${gradient} z-0`} />

      {/* Animación de fondo SOLO en desktop */}
      {!shouldRemoveAnimations && backgroundAnimation}

      {/* Contenido */}
      <div className={`relative z-10 max-w-4xl mx-auto px-6 md:px-10 flex flex-col gap-6 ${alignment}`}>
        {/* Ícono SIN animación */}
        <div className="flex justify-center items-center mb-4 bg-white/20 rounded-full p-4 backdrop-blur-lg shadow-lg">
          {icon}
        </div>

        {/* Título */}
        <h2
          role="heading"
          aria-level={2}
          className="text-4xl md:text-6xl font-bold font-serif text-white drop-shadow-lg"
        >
          {title}
        </h2>

        {/* Texto descriptivo */}
        <p className="text-lg md:text-xl text-white max-w-2xl drop-shadow-md">
          {text}
        </p>
        
        {/* Estadísticas */}
        {stats?.length ? (
          <StatsBlock 
            stats={stats} 
            align={align} 
            shouldRemoveAnimations={shouldRemoveAnimations} 
          />
        ) : null}
      </div> 
    </section>
  );
};

/* ===========================
   3. Componente principal OPTIMIZADO
=========================== */
export const HeroHighlightsSection = forwardRef<HTMLDivElement>((_props, ref) => {
  const { t } = useTranslation();
  
  return (
    <div ref={ref} className="w-full">
      {getSections(t).map((section, index) => (
        <HighlightSection
          key={index}
          title={section.title}
          text={section.text}
          image={section.image}
          icon={section.icon}
          gradient={section.gradient}
          align={section.align}
          stats={section.stats}
          backgroundAnimation={section.backgroundAnimation}
        />
      ))}
    </div>
  );
});

HeroHighlightsSection.displayName = 'HeroHighlightsSection';