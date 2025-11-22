// src/pages/CalendarPage.tsx
import { CalendarSection } from '@/cultura/section/CalendarSection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { InmersiveCarousel } from '@/cultura/section/InmersiveCarousel';
import { useTranslation } from '../contexts/TranslationContext'; // ← AGREGAR IMPORT

export function CalendarPage() {
  const { t } = useTranslation(); // ← AGREGAR HOOK

  const breadcrumbItems = [
    { label: t('breadcrumbs.home'), path: "/" }, // ← TRADUCIBLE
    { label: t('breadcrumbs.culture'), path: "/cultura" }, // ← TRADUCIBLE
    { label: t('breadcrumbs.culturalCalendar') }, // ← TRADUCIBLE
  ];

  
    return (
      <div className="bg-[url('https://res.cloudinary.com/dinsl266g/image/upload/v1763076653/Viejo_zoi3ur.jpg')] bg-cover bg-center min-h-screen py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs arriba */}
          <Breadcrumbs items={breadcrumbItems} />
          {/* Contenido principal */}
          <CalendarSection />
          <InmersiveCarousel />
        </div>
      </div>
    );
  }
