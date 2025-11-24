// server.js - VERSIÓN CORREGIDA
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware estático
app.use(express.static(path.join(__dirname, 'dist')));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString()
  });
});

// 🔥 RUTAS ESPECÍFICAS DEL SPA
const spaRoutes = [
  '/',
  '/turismo',
  '/cultura', 
  '/comunidad',
  '/galeria',
  '/contacto',
  '/login',
  '/registro',
  '/perfil',
  '/recuperar-contrasena',
  '/admin',
  '/admin/places',
  '/admin/usuarios',
  '/admin/configuracion',
  '/calendario-cultural',
  '/section-gastronomia',
  '/section-atracciones',
  '/section-cooperativa',
  '/success',
  '/oauth-callback',
  '/callback'
];

// 🔥 MANEJO DE RUTAS ESPECÍFICAS
spaRoutes.forEach(route => {
  app.get(route, (req, res) => {
    console.log(`📦 Sirviendo SPA para: ${route}`);
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
});

// 🔥 COMODÍN CORREGIDO - usa '*' no '/'
app.get('*', (req, res, next) => {
  // Si es un archivo estático (tiene extensión), pasar al siguiente middleware
  if (path.extname(req.path)) {
    return next();
  }
  
  // Para cualquier otra ruta sin extensión, servir el SPA
  console.log(`🔄 Ruta no definida, sirviendo SPA: ${req.path}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Manejo de errores simplificado
app.use((error, req, res, next) => {
  console.error('Error del servidor:', error);
  res.status(500).sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📁 Sirviendo desde: ${path.join(__dirname, 'dist')}`);
});