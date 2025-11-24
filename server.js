// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de seguridad y performance
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(compression());

// Servir archivos estáticos desde la carpeta dist
app.use(express.static(path.join(__dirname, 'dist'), {
  index: false // Importante: no servir index.html automáticamente
}));

// Health check endpoint para Railway
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    env: process.env.NODE_ENV || 'development'
  });
});

// 🔥 CORRECIÓN COMPLETA: Manejar TODAS las rutas para SPA
// Esta debe ser la ÚLTIMA ruta definida
app.get('/', (req, res) => {
  console.log(`📄 Sirviendo index.html para ruta: ${req.path}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error en servidor:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📁 Sirviendo archivos desde: ${path.join(__dirname, 'dist')}`);
  console.log(`🏥 Health check disponible en: http://0.0.0.0:${PORT}/health`);
  console.log(`🔧 Modo: ${process.env.NODE_ENV || 'development'}`);
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
  console.log('Recibido SIGTERM, cerrando servidor...');
  process.exit(0);
});