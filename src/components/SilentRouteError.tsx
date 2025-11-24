// components/SilentRouteError.tsx - NUEVO COMPONENTE
import { useEffect } from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';

export function SilentRouteError() {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    console.error('Error de ruta capturado:', error);
    
    // Redirigir al inicio después de un breve delay
    const timer = setTimeout(() => {
      console.log('🔄 Redirigiendo al inicio debido a error de ruta...');
      navigate('/', { replace: true });
    }, 1000);

    return () => clearTimeout(timer);
  }, [error, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirigiendo al inicio...</p>
      </div>
    </div>
  );
}