import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import { Menu, MapPin, Phone, Mail, Sparkles, Languages } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AuthButton } from "./AuthButton";
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from './contexts/TranslationContext';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledPercent = (winScroll / height) * 100;
      setScrollProgress(scrolledPercent);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Definir en qué rutas mostrar TODOS los idiomas (incluyendo náhuatl)
  const showAllLanguages = ['/', '/comunidad', '/cultura', '/contacto'].includes(location.pathname);
  
  // El LanguageSwitcher ahora aparece en TODAS las páginas, pero con idiomas filtrados

  const navItems = [
    { to: '/', label: t('navigation.home') },
    { to: '/turismo', label: t('navigation.tourism') }, // Por ahora sin traducción
    { to: '/cultura', label: t('navigation.culture') },
    { to: '/comunidad', label: t('navigation.community') },
    { to: '/galeria', label: t('navigation.gallery') }, // Por ahora sin traducción
    { to: '/contacto', label: t('navigation.contact') }
  ];

  return (
    <nav
      className={`fixed -top-3 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/60 backdrop-blur-md shadow-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <style>
        {`
          @keyframes water-glow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Versión responsive */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer flex-shrink-0">
            <div className="relative bg-gradient-to-r from-green-500 to-blue-600 p-2 sm:p-3 rounded-full shadow-lg">
              <MapPin className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl lg:text-xl font-extrabold font-serif text-white drop-shadow-lg leading-tight">
                {t('navigation.title')} 
              </span>
              <span className="text-xs font-serif text-white/80 hidden sm:block">
                {t('navigation.description')}
              </span>
              <span className="text-xs font-serif text-white/80 sm:hidden">
                {t('navigation.description')}
              </span>
            </div>
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-300 animate-pulse flex-shrink-0" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 flex-1 justify-center max-w-2xl">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={`relative px-3 py-2 rounded-xl font-serif text-white text-sm xl:text-lg transition-all duration-500 
                    hover:text-emerald-300 hover:scale-105 flex-shrink-0
                    ${isActive ? 'text-emerald-300' : ''}
                  `}
                >
                  <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                  {isActive && (
                    <span className="absolute inset-0 bg-white/5 rounded-xl blur-sm"></span>
                  )}
                  <span
                    className={`absolute bottom-0 left-0 h-[3px] rounded-full transition-all duration-700 ease-out
                      ${isActive
                        ? 'w-full bg-[linear-gradient(90deg,var(--tw-gradient-stops))] from-green-400 via-teal-300 to-blue-400 animate-[water-glow_6s_ease-in-out_infinite] bg-[length:200%_200%] shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                        : 'w-0 bg-transparent'
                      }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions - Desktop */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            {/* Language Switcher - Ahora en TODAS las páginas, pero con idiomas filtrados */}
            <div className="flex items-center space-x-2 border-r border-white/20 pr-3">
              <LanguageSwitcher showAllLanguages={showAllLanguages} />
            </div>

            <AuthButton />
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-2 flex-shrink-0">
            {/* Language Switcher Mobile - Ahora en TODAS las páginas */}
            <div className="mr-1">
              <LanguageSwitcher variant="minimal" showAllLanguages={showAllLanguages} />
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="relative border border-white/40 bg-white/10 backdrop-blur-md shadow-lg flex-shrink-0"
                >
                  <Menu className="h-5 w-5 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-black/80 backdrop-blur-lg text-white font-medium font-serif border-l border-white/10"
              >
                <div className="flex flex-col mt-8 space-y-2">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setIsOpen(false)}
                        className={`p-4 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-200 shadow-[0_0_10px_rgba(56,189,248,0.4)]'
                            : 'hover:bg-white/10'
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}

                  {/* Language Switcher en Mobile Menu - Ahora en TODAS las páginas */}
                  <div className="p-4 border-t border-white/20 mt-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Languages className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-medium text-white/90">Seleccionar Idioma</span>
                    </div>
                    <LanguageSwitcher showAllLanguages={showAllLanguages} />
                  </div>

                  {/* Contact info */}
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-sm font-medium font-serif text-white/90 mb-3">
                      Contacto
                    </p>
                    <div className="space-y-2 text-sm text-white/70">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-green-400" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-blue-400" />
                        <span>info@sanjuantahitic.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </nav>
  );
}