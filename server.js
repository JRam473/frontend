// server.js - Versión mejorada con manejo robusto de errores
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(express.static(path.join(__dirname, 'dist'), {
  index: false, // Evitar que sirva index.html automáticamente
  fallthrough: true // Permitir que las rutas continúen si el archivo no existe
}));

// Health check mejorado
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 🔥 RUTAS PERMITIDAS - MÁS COMPLETAS Y ORGANIZADAS
const allowedRoutes = [
  // Rutas principales
  '/',
  '/turismo',
  '/cultura', 
  '/comunidad',
  '/galeria',
  '/contacto',
  
  // Rutas de autenticación y usuario
  '/login',
  '/registro',
  '/perfil',
  '/recuperar-contrasena',
  
  // Rutas administrativas (IMPORTANTE: incluir todas las subrutas posibles)
  '/admin',
  '/admin/',
  '/admin/places',
  '/admin/places/',
  '/admin/usuarios',
  '/admin/configuracion',
  
  // Rutas de contenido dinámico
  '/calendario-cultural',
  '/section-gastronomia',
  '/section-atracciones',
  '/section-cooperativa',
  
  // Rutas de procesos y callbacks
  '/success',
  '/oauth-callback',
  '/callback',
  
  // Rutas de API (si las tienes) - para evitar que caigan en el comodín
  '/api/health'
];

// 🔥 MIDDLEWARE DE LOGGING PARA DEBUG
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 🔥 MANEJO ESPECÍFICO DE RUTAS ADMIN
app.get('/admin/places', (req, res, next) => {
  console.log('Accediendo a ruta administrativa de lugares');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      console.error('Error sirviendo admin/places:', err);
      next(err);
    }
  });
});

// 🔥 MANEJO DE RUTAS PERMITIDAS CON VALIDACIÓN
allowedRoutes.forEach(route => {
  // Remover el * para coincidencia exacta o parcial
  const cleanRoute = route.replace('/', '');
  
  app.get(cleanRoute, (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
      if (err) {
        console.error(`Error sirviendo ruta ${cleanRoute}:`, err);
        next(err);
      }
    });
  });
});

// 🔥 COMODÍN MEJORADO PARA RUTAS DESCONOCIDAS
app.get('/', (req, res, next) => {
  // Verificar si la ruta parece ser un archivo estático (con extensión)
  const hasExtension = path.extname(req.path) !== '';
  
  if (hasExtension) {
    // Si es un archivo estático que no existe, devolver 404
    return res.status(404).json({ 
      error: 'Archivo no encontrado',
      path: req.path 
    });
  }
  
  // Para cualquier otra ruta, servir el SPA
  console.log(`Ruta no definida pero sirviendo SPA: ${req.path}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      console.error('Error sirviendo SPA para ruta desconocida:', err);
      next(err);
    }
  });
});

// 🔥 MANEJO CENTRALIZADO DE ERRORES
app.use((error, req, res, next) => {
  console.error('Error del servidor:', error);
  
  // En producción, evitar mostrar detalles del error al usuario
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
  
  res.status(500).json({
    error: 'Error interno del servidor',
    message: error.message,
    stack: error.stack
  });
});

// 🔥 MIDDLEWARE PARA RUTAS NO ENCONTRADAS (backup)
app.use((req, res) => {
  // Si llegamos aquí, ninguna ruta coincidió
  res.status(404).sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
  console.log('Recibido SIGTERM, cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Recibido SIGINT, cerrando servidor...');
  process.exit(0);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📁 Directorio estático: ${path.join(__dirname, 'dist')}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});