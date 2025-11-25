// hooks/useAuth.ts
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../lib/axios';

interface Admin {
  id: string;
  usuario: string;
  email: string;
  rol: string;
  avatar_url?: string;
}

interface ApiResponse {
  token: string;
  administrador: Admin;
}

interface AuthContextType {
  admin: Admin | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signOut: () => void;
  signInWithGoogle: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
  getPreLoginPath: () => string;
  checkAuthStatus: () => Promise<boolean>;
}

// ✅ Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Exportar el Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/');
  const [authChecked, setAuthChecked] = useState(false);
  const isAdmin = isAuthenticated;

  // 🆕 Función centralizada para verificar autenticación
  const checkAuthStatus = useCallback(async (): Promise<boolean> => {
    if (authChecked) return isAuthenticated;
    
    const token = localStorage.getItem('admin_token');
    
    if (!token) {
      setIsAuthenticated(false);
      setAdmin(null);
      setAuthChecked(true);
      return false;
    }

    try {
      const response = await api.get<{ administrador: Admin }>('/api/admin/perfil', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setAdmin(response.data.administrador);
      setIsAuthenticated(true);
      setAuthChecked(true);
      return true;
    } catch (error) {
      console.error('❌ Token inválido o expirado:', error);
      localStorage.removeItem('admin_token');
      setIsAuthenticated(false);
      setAdmin(null);
      setAuthChecked(true);
      return false;
    }
  }, [authChecked, isAuthenticated]);

  // ✅ Verificar autenticación al cargar la app (SOLO UNA VEZ)
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      await checkAuthStatus();
      setLoading(false);
    };

    initializeAuth();
  }, [checkAuthStatus]);

  // ✅ Login para administradores - VERSIÓN MEJORADA
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.post<ApiResponse>('/api/admin/login', { 
        email, 
        password 
      });
      
      const { token, administrador } = response.data;
      
      // 🆕 Limpiar estado anterior
      localStorage.setItem('admin_token', token);
      setAdmin(administrador);
      setIsAuthenticated(true);
      setAuthChecked(true);
      
    } catch (error: unknown) {
      console.error('Error en login:', error);
      // 🆕 Limpiar estado completamente
      localStorage.removeItem('admin_token');
      setIsAuthenticated(false);
      setAdmin(null);
      setAuthChecked(true);
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { error?: string } } };
        if (axiosError.response?.data?.error) {
          throw new Error(axiosError.response.data.error);
        }
      }
      throw new Error('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const signOut = (): void => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('pre_login_path');
    setAdmin(null);
    setIsAuthenticated(false);
    setAuthChecked(false);
    setRedirectPath('/');
  };

  // ✅ Obtener ruta guardada
  const getPreLoginPath = (): string => {
    const path = redirectPath || localStorage.getItem('pre_login_path') || '/admin-places';
    console.log('📍 getPreLoginPath - Ruta recuperada:', path);
    localStorage.removeItem('pre_login_path');
    return path;
  };

  const signInWithGoogle = (): void => {
    const pathToSave = redirectPath !== '/' ? redirectPath : '/admin-places';
    
    console.log('📍 signInWithGoogle - Ruta a guardar:', pathToSave);
    
    localStorage.setItem('pre_login_path', pathToSave);
    
    const googleAuthUrl = `${import.meta.env.VITE_API_URL}/api/auth/google?state=${encodeURIComponent(pathToSave)}`;
    console.log('🔗 Redirigiendo a Google OAuth con estado:', googleAuthUrl);
    
    window.location.href = googleAuthUrl;
  };

  const value: AuthContextType = {
    admin, 
    loading, 
    isAuthenticated,
    isAdmin,
    signOut, 
    signInWithGoogle,
    signIn,
    redirectPath,
    setRedirectPath,
    getPreLoginPath,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ **HOOK useAuth - CORREGIDO**
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};

// ✅ Exportar tipos si son necesarios en otros archivos
export type { Admin, AuthContextType };