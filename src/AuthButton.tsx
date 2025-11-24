import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const AuthButton = () => {
  const { admin, signOut, loading, isAuthenticated, setRedirectPath } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    // ✅ Guardar la página completa (path + query params) antes de ir al login
    const currentPath = location.pathname + location.search;
    if (currentPath !== '/login') {
      console.log('📍 AuthButton - Guardando ruta para login normal:', currentPath);
      setRedirectPath(currentPath);
    }
    navigate('/login');
  };

  const handleAdminPanelClick = () => {
    navigate('/admin/places');
  };

  if (loading) {
    return (
      <div className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg animate-pulse">
        Cargando...
      </div>
    );
  }

  // ✅ Si está autenticado Y es administrador, mostrar el dropdown de admin
  if (isAuthenticated && admin) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="ml-4 flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-4 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <Avatar className="h-8 w-8 border-2 border-white/20">
              <AvatarImage src={admin.avatar_url || undefined} alt={admin.usuario} />
              <AvatarFallback className="bg-white/20">
                {admin.usuario?.charAt(0).toUpperCase() || 'A'}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium hidden md:block">{admin.usuario}</span>
            <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
              <Shield className="h-3 w-3 mr-1" />
              Admin
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-white/30 backdrop-blur-sm border border-white/20 p-2 text-gray-900 dark:text-gray-100 dark:bg-black/30 dark:border-gray-700 shadow-lg rounded-md"
        >
          <DropdownMenuLabel className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Panel Administrativo
            <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
              Admin
            </Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={handleAdminPanelClick}
            className="flex items-center gap-2 text-blue-600 font-medium cursor-pointer"
          >
            <MapPin className="h-4 w-4" />
            Gestionar Lugares
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={() => {
              signOut();
              navigate('/');
            }}
            className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // ✅ Si está autenticado pero NO es administrador, mostrar botón de "Sin permisos"
  if (isAuthenticated && !admin) {
    return (
      <Button
        onClick={() => {
          // Mostrar mensaje y redirigir al inicio
          alert('No tienes permisos de administrador. Serás redirigido al inicio.');
          navigate('/');
        }}
        className="ml-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-6 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        Sin Permisos
      </Button>
    );
  }

  // ✅ Si NO está autenticado, mostrar botón de "Panel Admin" en lugar de "Iniciar Sesión"
  return (
    <Button
      onClick={handleLoginClick}
      className="ml-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white p-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
      aria-label="Acceso administrativo"
    >
      <Users className="w-5 h-5" />
    </Button>
  );
};