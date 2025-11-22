import  { createContext, useContext, useState, type ReactNode } from 'react';
import type { Language, TranslationKey } from '../i18n/types';
import { getTranslation, languageNames } from '../i18n';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  availableLanguages: { code: Language; name: string }[];
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  const availableLanguages = Object.entries(languageNames).map(([code, name]) => ({
    code: code as Language,
    name
  }));

  return (
    <TranslationContext.Provider
      value={{
        language,
        setLanguage,
        t,
        availableLanguages
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}