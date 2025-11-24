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

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));

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

// 🔥 CORRECIÓN: Manejar TODAS las rutas - enviar index.html para SPA
app.get('/', (req, res) => {
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
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
  console.log('Recibido SIGTERM, cerrando servidor...');
  process.exit(0);
});