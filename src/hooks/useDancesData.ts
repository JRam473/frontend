// hooks/useDancesData.ts - VERSIÓN ORIGINAL ESTABLE
import { useMemo } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

import danzasEs from '../archivos_data/danzas.json';
import danzasEn from '../archivos_data/danzas.en.json';
import danzasNah from '../archivos_data/danzas.nah.json';

export const useDancesData = () => {
  const { language } = useTranslation();

  const dances = useMemo(() => {
    let data: any;
    switch (language) {
      case 'es':
        data = danzasEs;
        break;
      case 'en':
        data = danzasEn;
        break;
      case 'nah':
        data = danzasNah;
        break;
      default:
        data = danzasEs;
    }
    return data.dances || data.danzas || []; // ← FLEXIBLE
  }, [language]);

  return {
    dances
  };
};