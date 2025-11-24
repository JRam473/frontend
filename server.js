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
  contentSecurityPolicy: false, // Puedes configurar esto según tus necesidades
}));
app.use(compression());

// Servir archivos estáticos con cache headers
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: false
}));

// Health check endpoint para Railway
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Manejar SPA - todas las rutas van a index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📁 Sirviendo archivos desde: ${path.join(__dirname, 'dist')}`);
  console.log(`🏥 Health check disponible en: http://0.0.0.0:${PORT}/health`);
});