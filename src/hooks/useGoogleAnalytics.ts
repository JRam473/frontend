// hooks/useGoogleAnalytics.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useGoogleAnalytics = () => {
  const location = useLocation();
  
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    if (!measurementId) {
      console.warn('Google Analytics Measurement ID no configurado');
      return;
    }

    // 🔥 CORREGIDO - Función gtag sin errores
    const gtag = (...args: any[]) => {
      if (typeof window !== 'undefined') {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push(args);
      }
    };

    // Configurar gtag global
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId);

    // Cargar script de Google Analytics
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Track page views cuando cambia la ruta
  useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    
    if ((window as any).gtag && measurementId) {
      (window as any).gtag('config', measurementId, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
};