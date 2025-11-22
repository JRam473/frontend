// hooks/useTimelineData.ts
import { useMemo } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

// Importar todos los archivos de idioma
import timelineEs from '../archivos_data/timeline.json';
import timelineEn from '../archivos_data/timeline.en.json';
import timelineNah from '../archivos_data/timeline.nah.json';

// 👇 DEFINIR LOS ICONOS PERMITIDOS
export const timelineIcons = {
  Building: 'Building',
  Church: 'Church', 
  User: 'User',
  Sparkles: 'Sparkles',
  RefreshCcw: 'RefreshCcw',
  PartyPopper: 'PartyPopper',
} as const;

export type TimelineIcon = keyof typeof timelineIcons;

export interface TimelineItem {
  id: number;
  year: string;
  category: string;
  icon: TimelineIcon; // 👈 CAMBIAR A TimelineIcon
  title: string;
  description: string;
  image: string;
  modalContent?: {
    text: string;
    images?: string[];
  } | null;
  link: string | null;
}

export const useTimelineData = () => {
  const { language } = useTranslation();

  // Seleccionar datos según el idioma
  const timelineData: TimelineItem[] = useMemo(() => {
    switch (language) {
      case 'es':
        return timelineEs as TimelineItem[];
      case 'en':
        return timelineEn as TimelineItem[];
      case 'nah':
        return timelineNah as TimelineItem[];
      default:
        return timelineEs as TimelineItem[];
    }
  }, [language]);

  return {
    timelineData
  };
};