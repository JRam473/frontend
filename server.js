// server.js - VERSIÓN CORREGIDA
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ SERVIR ASSETS DESDE LA RAIZ - ESTO ES CLAVE
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
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

// ✅ RUTAS ESPECÍFICAS DEL ADMIN - MANEJARLAS ÚNICAMENTE
app.get(['/admin', '/admin/places', '/admin/usuarios', '/admin/configuracion'], (req, res) => {
  console.log(`🔐 Sirviendo admin route: ${req.path}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ✅ RUTAS PRINCIPALES
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

// ✅ COMODÍN MEJORADO - EXCLUIR TODOS LOS ARCHIVOS CON EXTENSIONES
app.get(/^\/(?!.*\..*).*$/, (req, res) => {
  // No manejar rutas que ya son manejadas específicamente
  if (req.path.startsWith('/api/') || req.path === '/health') {
    return res.status(404).json({ error: 'Endpoint no encontrado' });
  }
  
  // Para cualquier otra ruta, servir el SPA
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Manejo de errores 404 para assets
app.use('/assets', (req, res) => {
  console.log(`❌ Asset no encontrado: ${req.path}`);
  res.status(404).json({ error: 'Asset no encontrado' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📁 Sirviendo assets desde: ${path.join(__dirname, 'dist/assets')}`);
});