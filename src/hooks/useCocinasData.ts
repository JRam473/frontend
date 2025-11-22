// hooks/useCocinasData.ts
import { useState, useMemo } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

// Importar todos los archivos de idioma
import cocinasEs from '../archivos_data/cocinas-tradicionales.es.json';
import cocinasEn from '../archivos_data/cocinas-tradicionales.en.json';
import cocinasNah from '../archivos_data/cocinas-tradicionales.nah.json';

export const useCocinasData = () => {
  const { language } = useTranslation();
  const [cocinaActiva, setCocinaActiva] = useState(0);

  // Seleccionar datos según el idioma
  const cocinasData = useMemo(() => {
    switch (language) {
      case 'es':
        return (cocinasEs as any).cocinas;
      case 'en':
        return (cocinasEn as any).cocinas;
      case 'nah':
        return (cocinasNah as any).cocinas;
      default:
        return (cocinasEs as any).cocinas;
    }
  }, [language]);

  const cocina = cocinasData[cocinaActiva];

  const siguienteCocina = () => {
    const siguienteIndex = (cocinaActiva + 1) % cocinasData.length;
    setCocinaActiva(siguienteIndex);
  };

  const anteriorCocina = () => {
    const anteriorIndex = (cocinaActiva - 1 + cocinasData.length) % cocinasData.length;
    setCocinaActiva(anteriorIndex);
  };

  const handleCocinaChange = (index: number) => {
    setCocinaActiva(index);
  };

  return {
    cocinasData,
    cocina,
    cocinaActiva,
    setCocinaActiva,
    siguienteCocina,
    anteriorCocina,
    handleCocinaChange
  };
};