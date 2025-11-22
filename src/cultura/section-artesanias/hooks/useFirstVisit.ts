// hooks/useFirstVisit.ts
import { useState, useEffect } from 'react';

export const useFirstVisit = (key: string) => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem(key);
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem(key, 'true');
      
      // Auto-ocultar después de 24 horas
      const timeout = setTimeout(() => {
        localStorage.removeItem(key);
      }, 24 * 60 * 60 * 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [key]);

  return isFirstVisit;
};