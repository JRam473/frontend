import { useRef } from 'react';
import { HeroSection } from '@/home/HeroSection';
import { HeroHighlightsSection } from '@/home/HeroHighlightsSection';
import { VisualCardsSection } from '@/home/VisualCardsSection';

export function HomePage() {
  const highlightsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleScrollToHighlights = () => {
    highlightsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleScrollToCards = () => {
    cardsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <HeroSection 
        onDiscoverClick={handleScrollToHighlights} 
        onDiscoverCardClick={handleScrollToCards} 
      />
      
      <HeroHighlightsSection ref={highlightsRef} />
      
      <VisualCardsSection ref={cardsRef} />
    </>
  );
}