// server.js - VERSIÓN MEJORADA
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ SERVIR ASSETS PRIMERO - con headers de cache optimizados
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    // Headers específicos para archivos JS y CSS
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Servir otros archivos estáticos
app.use(express.static(path.join(__dirname, 'dist'), {
  index: false,
  dotfiles: 'deny'
}));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ✅ RUTAS SPA - solo después de los assets
const spaRoutes = [
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
  '/oauth-callback',
  '/admin',
  '/admin/places',
  '/admin/usuarios',
  '/admin/configuracion'
];

spaRoutes.forEach(route => {
  app.get(route, (req, res) => {
    console.log(`🔄 Sirviendo SPA para: ${route}`);
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
});

// ✅ Comodín para otras rutas SPA (excluyendo archivos con extensiones)
app.get(/^\/(?!.*\..*).*$/, (req, res) => {
  // Excluir rutas que no deberían manejar el SPA
  if (req.path.startsWith('/api/') || req.path === '/health') {
    return res.status(404).json({ error: 'Endpoint no encontrado' });
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Manejo de errores
app.use((error, req, res, next) => {
  console.error('Error del servidor:', error);
  res.status(500).sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📁 Sirviendo desde: ${path.join(__dirname, 'dist')}`);
});