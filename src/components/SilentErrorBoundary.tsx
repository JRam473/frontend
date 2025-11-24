// components/SilentErrorBoundary.tsx - VERSIÓN MEJORADA
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class SilentErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('Error capturado por SilentErrorBoundary:', error);
    console.warn('Component stack:', errorInfo.componentStack);
    
    // Recarga automática después de un breve delay
    setTimeout(() => {
      console.log('🔄 Recargando aplicación debido a error...');
      window.location.href = '/'; // Redirigir al inicio en lugar de recargar
    }, 500);
  }

  public render() {
    if (this.state.hasError) {
      // Mostrar un fallback minimalista durante el breve momento antes del redirect
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Restableciendo aplicación...</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}