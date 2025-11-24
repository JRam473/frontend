// server.js - VERSIÓN MEJORADA
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 SERVIR ARCHIVOS ESTÁTICOS CON CACHE
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  index: false
}));

// Servir otros archivos estáticos
app.use(express.static(path.join(__dirname, 'dist'), {
  index: false, // No servir index.html automáticamente
  dotfiles: 'deny'
}));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 🔥 MANEJO ESPECÍFICO PARA RUTAS DE ADMIN
const adminRoutes = [
  '/admin',
  '/admin/',
  '/admin/places',
  '/admin/usuarios',
  '/admin/configuracion'
];

adminRoutes.forEach(route => {
  app.get(route, (req, res) => {
    console.log(`🔐 Sirviendo admin route: ${route}`);
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
});

// 🔥 MANEJO DE RUTAS PRINCIPALES
const mainRoutes = [
  '/',
  '/turismo',
  '/cultura', 
  '/comunidad',
  '/galeria',
  '/contacto',
  '/login',
  '/perfil',
  '/calendario-cultural',
  '/section-gastronomia',
  '/section-atracciones',
  '/section-cooperativa',
  '/success',
  '/oauth-callback'
];

mainRoutes.forEach(route => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
});

// 🔥 COMODÍN PARA OTRAS RUTAS (usando expresión regular)
app.get(/^\/(?!.*\..*).*$/, (req, res) => {
  console.log(`🔄 Sirviendo SPA para ruta: ${req.path}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Manejo de errores
app.use((error, req, res, next) => {
  console.error('Error del servidor:', error);
  res.status(500).sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📁 Directorio: ${path.join(__dirname, 'dist')}`);
});