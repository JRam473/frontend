// components/ProtectedRoute.tsx - VERSIÓN MEJORADA
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = true }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin, loading, setRedirectPath } = useAuth();
  const location = useLocation();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Guardar la ruta actual para redirigir después del login
        const currentPath = location.pathname + location.search;
        console.log('🚫 No autenticado, guardando ruta:', currentPath);
        setRedirectPath(currentPath);
      }
      setCheckedAuth(true);
    }
  }, [loading, isAuthenticated, location, setRedirectPath]);

  // Mostrar loading mientras verifica
  if (loading || !checkedAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="text-gray-600">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Redirigir si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirigir si requiere admin y no lo es
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};