import type { Translations, Language, TranslationKey } from './types';

// Importaciones de archivos de traducción
import esTranslations from './es.json';
import enTranslations from './en.json';
import nahTranslations from './nah.json';
export const translations: Record<Language, Translations> = {
  es: esTranslations,
  en: enTranslations,
  nah: nahTranslations,
};

export const languageNames: Record<Language, string> = {
  es: 'Español',
  en: 'English',
  nah: 'Náhuatl',
};

// Función helper para obtener traducciones
export const getTranslation = (language: Language, key: TranslationKey): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || translations.es[key as keyof Translations] || key;
};