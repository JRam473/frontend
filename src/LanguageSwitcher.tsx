import { useState, useRef, useEffect } from 'react';
import { useTranslation } from './contexts/TranslationContext';
import { ChevronDown, Check, Languages } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'minimal';
  showAllLanguages?: boolean;
}

export function LanguageSwitcher({ className = "", variant = 'default', showAllLanguages = false }: LanguageSwitcherProps) {
  const { language, setLanguage, availableLanguages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtrar idiomas disponibles según la página
  const filteredLanguages = showAllLanguages 
    ? availableLanguages // Todas las páginas: español, inglés, náhuatl
    : availableLanguages.filter(lang => lang.code !== 'nah'); // Otras páginas: solo español e inglés

  const currentLanguage = filteredLanguages.find(lang => lang.code === language) || filteredLanguages[0];

  // Versión ultra-compacta para mobile
  if (variant === 'minimal') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-1.5 text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-emerald-400"
        >
          <Languages className="h-3 w-3" />
          <span className="text-xs font-medium font-serif">
            {currentLanguage?.code.toUpperCase()}
          </span>
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-1 w-36 bg-white/95 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="py-1">
              {filteredLanguages.map(({ code, name }) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left transition-all duration-200 ${
                    code === language
                      ? 'bg-emerald-50 text-emerald-700 font-semibold font-serif'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xs font-medium font-serif">
                    {name}
                  </span>
                  {code === language && (
                    <Check className="h-3 w-3 text-emerald-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Versión desktop normal
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-1.5 text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        <Languages className="h-4 w-4" />
        <span className="text-sm font-medium font-serif hidden sm:block">
          {currentLanguage?.name}
        </span>
        <span className="text-sm font-medium font-serif sm:hidden">
          {currentLanguage?.code.toUpperCase()}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="py-1">
            {filteredLanguages.map(({ code, name }) => (
              <button
                key={code}
                onClick={() => {
                  setLanguage(code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-all duration-200 ${
                  code === language
                    ? 'bg-emerald-50 text-emerald-700 font-semibold font-serif'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm ${code === language ? 'font-semibold font-serif' : 'font-medium font-serif'}`}>
                    {name}
                  </span>
                </div>
                {code === language && (
                  <Check className="h-4 w-4 text-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}