import { useState, useEffect, type RefObject } from 'react';

export function useScrollIndicator(scrollRef: RefObject<HTMLDivElement | null>) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollHeight, clientHeight } = scrollRef.current;
        setShowScrollIndicator(scrollHeight > clientHeight);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [scrollRef]);

  return showScrollIndicator;
}