// pages/Login.tsx - VERSIÓN CORREGIDA
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [redirecting, setRedirecting] = useState(false);

  const { signIn, signInWithGoogle, isAuthenticated, admin, setRedirectPath } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Valores para efecto 3D basado en el cursor - CORREGIDOS
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // ✅ Funciones de manejo de mouse - CORREGIDAS
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - rect.left - rect.width / 2;
    const posY = e.clientY - rect.top - rect.height / 2;
    x.set(posX / 10);
    y.set(posY / 10);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // ✅ REDIRECCIÓN MEJORADA - Controlada y única
  useEffect(() => {
    const handleRedirection = async () => {
      if (isAuthenticated && admin && !redirecting) {
        setRedirecting(true);
        console.log('✅ Usuario administrador autenticado, redirigiendo...');
        
        // Pequeño delay para mejor UX
        setTimeout(() => {
          navigate('/admin-places', { replace: true });
        }, 1000);
      }
    };

    handleRedirection();
  }, [isAuthenticated, admin, navigate, redirecting]);

  // 🆕 Guardar ruta actual al montar
  useEffect(() => {
    const currentPath = location.pathname + location.search;
    if (currentPath !== '/login') {
      console.log('📍 Login - Guardando ruta actual:', currentPath);
      setRedirectPath(currentPath);
    }
  }, [location, setRedirectPath]);

  // ✅ Validaciones
  const isAuthorizedAdmin = (email: string): boolean => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    return email === adminEmail;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Formato de email inválido');
      return false;
    }
    
    if (!isAuthorizedAdmin(email)) {
      setEmailError('No tienes permisos para acceder al panel administrativo');
      return false;
    }
    
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // 🆕 Función de login mejorada
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let isValid = true;
    if (!validateEmail(email)) isValid = false;
    if (!validatePassword(password)) isValid = false;

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      await signIn(email, password);
      // 🆕 NO redirigir aquí - La redirección se maneja en el useEffect
      console.log('✅ Login exitoso, esperando redirección automática...');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido durante el login');
      }
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      // 🆕 La redirección se maneja automáticamente con OAuth
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido durante el login con Google');
      }
      setLoading(false);
    }
  };

  // 🆕 Estado de loading/redirección mejorado
  if (redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Redirigiendo al panel...</h2>
          <p className="text-gray-300">Autenticación exitosa</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Fondo animado con partículas - IMAGEN ACTUALIZADA */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'linear' }}
      >
        {/* ✅ IMAGEN ACTUALIZADA CON URL DE CLOUDINARY */}
        <img 
          src="https://res.cloudinary.com/dva96am1o/image/upload/v1763833761/puenteApolateno_oj0xsh.jpg" 
          alt="Puente Apolateno" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-green-900/30" />
        {/* Partículas simples */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'easeInOut' }}
        >
          {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-white/30 rounded-full" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} />
          ))}
        </motion.div>
      </motion.div>

      <TooltipProvider>
        {/* Card interactiva - CORREGIDA */}
        <motion.div
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-md cursor-pointer"
        >
          <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl rounded-3xl overflow-hidden hover:scale-105 transform transition-transform duration-500 border-glow">
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-3xl font-extrabold text-white drop-shadow-lg animate-pulse">
                Panel Administrativo
              </CardTitle>
              <CardDescription className="text-white/80">
                Acceso restringido - Solo administradores autorizados
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <Input
                      type="email"
                      placeholder="Correo electrónico de administrador"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                      className={`transition-all duration-300 ${emailError ? 'border-red-500' : 'focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400'}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-slate-100/90 backdrop-blur-sm text-gray-900 shadow-lg">
                    {emailError || 'Solo el administrador autorizado puede acceder'}
                  </TooltipContent>
                </Tooltip>

                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      className={`transition-all duration-300 ${passwordError ? 'border-red-500' : 'focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400'}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-slate-100/90 backdrop-blur-sm text-gray-900 shadow-lg">
                    {passwordError || 'Mínimo 6 caracteres, combina letras y números'}
                  </TooltipContent>
                </Tooltip>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm p-2 rounded-md bg-red-100/20 border border-red-400/30"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white shadow-lg transition-transform duration-300"
                    disabled={loading}
                  >
                    {loading ? 'Verificando acceso...' : 'Acceder al Panel Admin'}
                  </Button>
                </motion.div>
              </form>

              {/* Divider */}
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <div className="flex-1 border-t border-white/20"></div>
                  <span className="text-white/60 text-xs">O continúa con</span>
                  <div className="flex-1 border-t border-white/20"></div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-white/30 bg-white/20 text-white hover:bg-white/30 hover:text-gray-900 backdrop-blur-md transition-all duration-300"
                    onClick={handleGoogleLogin}
                    type="button"
                    disabled={loading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                </motion.div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/"
                  className="text-sm text-white/70 hover:text-white transition"
                >
                  ← Volver al inicio
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </TooltipProvider>
    </section>
  );
};