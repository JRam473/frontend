// server.js - VERSIÓN CORREGIDA
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ SERVIR ARCHIVOS ESTÁTICOS PRIMERO (ANTES de cualquier ruta)
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  index: false
}));

// ✅ Servir otros archivos estáticos del build
app.use(express.static(path.join(__dirname, 'dist'), {
  index: false,
  dotfiles: 'deny'
}));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// ✅ MANEJO MEJORADO DE RUTAS - Los assets deben pasar primero
// Solo manejar rutas SPA que NO sean archivos
app.get(['/admin', '/admin/places', '/admin/usuarios', '/admin/configuracion'], (req, res) => {
  console.log(`🔐 Sirviendo admin route: ${req.path}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ✅ Rutas principales
app.get(['/', '/turismo', '/cultura', '/comunidad', '/galeria', '/contacto', '/login', '/perfil'], (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// ✅ Comodín mejorado - excluir archivos con extensiones
app.get(/^\/(?!.*\..*).*$/, (req, res) => {
  // Verificar si es una ruta de API o algo que no debería manejar el SPA
  if (req.path.startsWith('/api/') || req.path.startsWith('/health')) {
    return res.status(404).json({ error: 'Endpoint no encontrado' });
  }
  
  console.log(`🔄 Sirviendo SPA para ruta: ${req.path}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});