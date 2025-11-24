const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(compression());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Manejar SPA - todas las rutas van a index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error en servidor:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📁 Sirviendo archivos desde: ${path.join(__dirname, 'dist')}`);
  console.log(`🏥 Health check disponible en: http://0.0.0.0:${PORT}/health`);
});