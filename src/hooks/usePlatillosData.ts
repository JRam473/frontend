// hooks/useGastronomiaData.ts
import { useMemo } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

// Importar todos los archivos de idioma
import platillosEs from '../archivos_data/platillos.es.json';
import platillosEn from '../archivos_data/platillos.en.json'; // ← CREAR
import platillosNah from '../archivos_data/platillos.nah.json'; // ← CREAR

export interface Dish {
  name: string;
  chef: string;
  greeting: string;
  address: string;
  owner: string;
  suggestions: string[];
  hours: string;
  image: string;
  lat: number;
  lng: number;
  phone?: string;
}

export const usePlatillosData = () => {
  const { language } = useTranslation();

  // Seleccionar datos según el idioma
  const dishesData: Dish[] = useMemo(() => {
    switch (language) {
      case 'es':
        return platillosEs as Dish[];
      case 'en':
        return platillosEn as Dish[];
      case 'nah':
        return platillosNah as Dish[];
      default:
        return platillosEs as Dish[];
    }
  }, [language]);

  return dishesData;
};