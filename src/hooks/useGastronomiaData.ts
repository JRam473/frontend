import { useMemo } from 'react';
import type { Dish } from '../i18n/types';
import { useTranslation } from '../contexts/TranslationContext';

// Importar archivos JSON
import gastronomiaEs from '../archivos_data/gastronomia.es.json';
import gastronomiaEn from '../archivos_data/gastronomia.en.json';
import gastronomiaNah from '../archivos_data/gastronomia.nah.json';

export const useGastronomiaData = () => {
  const { language } = useTranslation();

  // Seleccionar datos según el idioma
  const dishesData: Dish[] = useMemo(() => {
    switch (language) {
      case 'es':
        return (gastronomiaEs as any).platillos;
      case 'en':
        return (gastronomiaEn as any).platillos;
      case 'nah':
        return (gastronomiaNah as any).platillos;
      default:
        return (gastronomiaEs as any).platillos;
    }
  }, [language]);

  return {
    dishesData
  };
};