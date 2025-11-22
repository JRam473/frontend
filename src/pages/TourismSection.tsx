import { HeroSection } from '@/turismo/HeroSection';
import { useRef } from 'react';
import  Places  from '../turismo/Places';
import { AdventureActivities } from '../turismo/AdventureActivities ';

export function TourismSection() {
  // ELIMINAR las refs y usar IDs directamente
  //manera facil de hacer scrooll de la manera mas simple
  
  const handleScrollToHighlights = () => {
    document.getElementById('places')?.scrollIntoView({ behavior: 'smooth' });
  };
    const cardsRef = useRef<HTMLDivElement>(null);

    
    const handleScrollToCards = () => {
      cardsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  return (
    <>
      <HeroSection
      onDiscoverClick={handleScrollToHighlights} 
        onDiscoverCardClick={handleScrollToCards} />
      {/* Sección principal de lugares destacados */}
      <Places/>
      {/* Actividades de aventura */}
      <AdventureActivities ref={cardsRef}/>

      
    </>
  );
}