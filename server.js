// server.js - VERSIÓN MEJORADA
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ SERVIR ASSETS PRIMERO - con logging para debug
app.use('/assets', (req, res, next) => {
  console.log(`📁 Solicitud de asset: ${req.path}`);
  next();
});

app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  fallthrough: false // No pasar a otros middleware si no encuentra el archivo
}));

// Servir otros archivos estáticos
app.use(express.static(path.join(__dirname, 'dist'), {
  index: false,
  dotfiles: 'deny'
}));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    assetsPath: path.join(__dirname, 'dist/assets')
  });
});

// ✅ RUTA ESPECÍFICA PARA DEBUG DE ASSETS
app.get('/debug-assets', (req, res) => {
  const fs = require('fs');
  try {
    const assetsPath = path.join(__dirname, 'dist/assets');
    const files = fs.readdirSync(assetsPath);
    res.json({
      assetsPath,
      files: files.filter(f => f.endsWith('.js') || f.endsWith('.css'))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ TODAS LAS RUTAS SPA - incluyendo admin
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
  '/admin-places',
  '/admin/usuarios',
  '/admin/configuracion'
];

spaRoutes.forEach(route => {
  app.get(route, (req, res) => {
    console.log(`🔄 Sirviendo SPA para: ${route}`);
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
});

// Comodín para otras rutas SPA
app.get(/^\/(?!.*\..*).*$/, (req, res) => {
  if (req.path.startsWith('/api/') || req.path === '/health' || req.path === '/debug-assets') {
    return res.status(404).json({ error: 'Endpoint no encontrado' });
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Manejo de errores para assets no encontrados
app.use('/assets', (req, res) => {
  console.error(`❌ Asset no encontrado: ${req.path}`);
  res.status(404).json({ 
    error: 'Asset no encontrado',
    requested: req.path,
    suggestion: 'Verificar build de Vite'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📁 Directorio de assets: ${path.join(__dirname, 'dist/assets')}`);
  console.log(`🔍 Debug de assets disponible en: /debug-assets`);
});