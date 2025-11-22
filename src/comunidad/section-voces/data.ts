// src/sections/VocesDeNuestraTierra/data.ts
import {
  BookOpen,
  Sprout,
  Users,
  Music,
  Heart,
  Handshake,
  Star
} from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

export interface Testimonio {
  id: number;
  nombre: string;
  rol: string;
  testimonio: string;
  imagen: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
  detalles: string;
  tagline: string;
}

// ✅ URLs OPTIMIZADAS de Cloudinary
const CLOUDINARY_IMAGES = {
  1: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_400/v1763111723/artesana_n5sxwf.webp",
  2: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_400/v1763111724/jose_qkrpbz.webp",
  3: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_400/v1763111724/joven_tqwssy.webp",
  4: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_400/v1763111723/musico_e6iava.jpg",
  5: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_400/v1763111724/cocinera_ob3u0z.png",
  6: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_400/v1763111724/coordinador_f8hxwx.jpg",
  7: "https://res.cloudinary.com/dinsl266g/image/upload/f_auto,q_auto,w_400/v1763111724/maestra_nuixxo.jpg"
};

// ✅ Función auxiliar para rutas de imágenes - ACTUALIZADA con Cloudinary
const getImagePath = (id: number) => {
  return CLOUDINARY_IMAGES[id as keyof typeof CLOUDINARY_IMAGES] || CLOUDINARY_IMAGES[1];
};

// ✅ Función auxiliar para asignar iconos y colores (MANTENIDA)
const getIconAndColor = (id: number) => {
  const iconMap = {
    1: { icon: BookOpen, color: "from-teal-500 to-cyan-600", bgColor: "bg-teal-50", borderColor: "border-teal-200" },
    2: { icon: Sprout, color: "from-blue-500 to-sky-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
    3: { icon: Users, color: "from-sky-500 to-blue-600", bgColor: "bg-sky-50", borderColor: "border-sky-200" },
    4: { icon: Music, color: "from-cyan-500 to-teal-600", bgColor: "bg-cyan-50", borderColor: "border-cyan-200" },
    5: { icon: Heart, color: "from-teal-600 to-cyan-700", bgColor: "bg-teal-50", borderColor: "border-teal-200" },
    6: { icon: Handshake, color: "from-blue-600 to-sky-700", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
    7: { icon: Star, color: "from-sky-600 to-blue-700", bgColor: "bg-sky-50", borderColor: "border-sky-200" }
  };

  return iconMap[id as keyof typeof iconMap] || iconMap[1];
};

// ✅ Hook para obtener testimonios traducidos - ACTUALIZADO con Cloudinary
export const useTestimoniosData = (): Testimonio[] => {
  const { t } = useTranslation();
  
  const testimoniosTraducidos = t('voices.testimonials') as unknown as Array<{
    id: number;
    nombre: string;
    rol: string;
    testimonio: string;
    detalles: string;
    tagline: string;
  }>;

  // ✅ Mapear los datos traducidos con Cloudinary
  return testimoniosTraducidos.map(testimonio => {
    const iconData = getIconAndColor(testimonio.id);
    
    return {
      ...testimonio,
      imagen: getImagePath(testimonio.id), // ✅ Ahora usa Cloudinary
      ...iconData
    };
  });
};

// ✅ Datos estáticos de respaldo (OPCIONAL - para compatibilidad)
// Si algún componente todavía usa estos datos directamente, seguirán funcionando
// pero con las imágenes de Cloudinary
export const testimoniosData: Testimonio[] = [
  {
    id: 1,
    nombre: "Doña Rosa Mendoza",
    rol: "Artesana Textil",
    testimonio: "Mis manos no solo tejen hilos, tejen los sueños y las historias...",
    imagen: CLOUDINARY_IMAGES[1], // ✅ Cloudinary
    icon: BookOpen,
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    detalles: "35 años tejiendo tradición",
    tagline: "Guardiana de técnicas ancestrales"
  },
  {
    id: 2,
    nombre: "Don Javier Hernández",
    rol: "Agricultor",
    testimonio: "Esta tierra no es un recurso, es nuestra madre...",
    imagen: CLOUDINARY_IMAGES[2], // ✅ Cloudinary
    icon: Sprout,
    color: "from-blue-500 to-sky-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    detalles: "Cultivando maíz criollo por 40 años",
    tagline: "Custodio de la tierra y sus cultivos"
  },
  {
    id: 3,
    nombre: "Ana López",
    rol: "Joven Líder",
    testimonio: "Cargamos con el orgullo de nuestro pasado, pero nuestros pies caminan hacia el futuro. Nuestro sueño es tender un puente para que el mundo conozca nuestra cultura..",
    imagen: CLOUDINARY_IMAGES[3], // ✅ Cloudinary
    icon: Users,
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    detalles: "Promotora de turismo sostenible",
    tagline: "Constructor de puentes culturales"
  },
  {
    id: 4,
    nombre: "Maestro Carlos Ruiz",
    rol: "Músico Tradicional",
    testimonio: "Cada nota de nuestra música cuenta la historia de nuestras montañas y ríos. No solo tocamos instrumentos, mantenemos viva la voz de nuestros ancestros a través de las melodías que nos heredaron.",
    imagen: CLOUDINARY_IMAGES[4], // ✅ Cloudinary
    icon: Music,
    color: "from-cyan-500 to-teal-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    detalles: "50 años preservando sonidos ancestrales",
    tagline: "Portador de la memoria sonora"
  },
  {
    id: 5,
    nombre: "Doña Elena Martínez",
    rol: "Cocinera Tradicional",
    testimonio: "En mi cocina, los sabores son cartas de amor a nuestra tierra. Cada platillo cuenta una historia de siembras, cosechas y las manos que hicieron posible este milagro diario.",
    imagen: CLOUDINARY_IMAGES[5], // ✅ Cloudinary
    icon: Heart,
    color: "from-teal-600 to-cyan-700",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    detalles: "Especialista en cocina de maíz",
    tagline: "Guardiana de los sabores ancestrales"
  },
  {
    id: 6,
    nombre: "Don Miguel Torres",
    rol: "Coordinador de Tequios",
    testimonio: "El tequio nos recuerda que somos más fuertes juntos. Cuando trabajamos hombro con hombro, no solo construimos caminos o escuelas, tejemos la confianza que nos hace una verdadera comunidad.",
    imagen: CLOUDINARY_IMAGES[6], // ✅ Cloudinary
    icon: Handshake,
    color: "from-blue-600 to-sky-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    detalles: "30 años organizando trabajo comunitario",
    tagline: "Tejedor de solidaridad"
  },
  {
    id: 7,
    nombre: "Profesora Sofia Reyes",
    rol: "Educadora Comunitaria",
    testimonio: "Enseñar aquí no es solo transmitir conocimientos, es ayudar a nuestros niños a encontrar el equilibrio entre el orgullo de sus raíces y las oportunidades del mundo moderno.",
    imagen: CLOUDINARY_IMAGES[7], // ✅ Cloudinary
    icon: Star,
    color: "from-sky-600 to-blue-700",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    detalles: "25 años formando nuevas generaciones",
    tagline: "Guía entre tradición y futuro"
  }
];