import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from './contexts/TranslationContext'; // ← AGREGAR IMPORT

export function Footer() {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  const quickLinks = [
    { href: '/', label: t('footer.home') },
    { href: '/turismo', label: t('footer.attractions') },
    { href: '/cultura', label: t('footer.culture') },
    { href: '/comunidad', label: t('footer.community') },
    { href: '/galeria', label: t('footer.gallery') },
    { href: '/contacto', label: t('footer.contact') },
  ];

  const services = [
    t('footer.regionalGastronomy'),
    t('footer.handicrafts'),
    t('footer.transportation'),
    t('footer.culturalEvents')
  ];

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Información Principal */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="h-9 w-9 text-indigo-400" />
              <span className="text-3xl font-bold font-serif text-white tracking-wide">San Juan Tahitic</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-400">{t('footer.address')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-indigo-400" />
                <span className="text-gray-400">info@sanjuantahitic.com</span>
              </div>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-xl font-semibold font-serif mb-6 text-white">
              {t('footer.explore')}
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 text-lg font-medium font-serif"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-xl font-semibold font-serif mb-6 text-white">
              {t('footer.keyServices')}
            </h3>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="text-gray-400 font-serif text-lg">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Redes Sociales, AuthButton y Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex space-x-6 mb-6 md:mb-0">
                    <a 
                        href="https://www.facebook.com/share/16Pi8HTdzA/"
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 transform hover:scale-110"
                    >
                        <Facebook className="h-7 w-7" />
                    </a>
                    <a 
                        href="https://www.instagram.com/zacapoaxtlamagica?igsh=MXFmcmFlNGlqcGxrMA=="
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 transform hover:scale-110"
                    >
                        <Instagram className="h-7 w-7" />
                    </a>
                </div>

                <div className="text-gray-500 font-serif text-sm text-center md:text-right">
                    <p>{t('footer.rights')}</p>
                    <p className="mt-1">{t('footer.developed')}</p>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}