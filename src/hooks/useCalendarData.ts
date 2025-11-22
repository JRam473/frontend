import { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/TranslationContext';

interface Event {
  stamp: string;
  title: string;
  description: string;
  category: string;
  date: string;
  videoThumbnail: string;
  videoPreview: string;
  details: string[];
}

interface CalendarData {
  events: Event[];
}

export const useCalendarData = () => {
  const { language } = useTranslation();
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCalendarData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Determinar qué archivo cargar según el idioma
        let dataFile;
        switch (language) {
          case 'en':
            dataFile = await import('../archivos_data/eventosTahitic-en.json');
            break;
          case 'nah':
            dataFile = await import('../archivos_data/eventosTahitic-nah.json');
            break;
          default:
            dataFile = await import('../archivos_data/eventosTahitic-es.json');
        }

        setCalendarData(dataFile.default);
      } catch (err) {
        console.error('Error loading calendar data:', err);
        setError('Error al cargar los datos del calendario');
        
        // Fallback al español si hay error
        try {
          const fallbackData = await import('../archivos_data/eventosTahitic-es.json');
          setCalendarData(fallbackData.default);
        } catch (fallbackErr) {
          setError('No se pudieron cargar los datos del calendario');
        }
      } finally {
        setLoading(false);
      }
    };

    loadCalendarData();
  }, [language]);

  return { calendarData, loading, error };
};