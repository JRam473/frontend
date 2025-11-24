// server.js - Versión alternativa más robusta
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(express.static(path.join(__dirname, 'dist')));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 🔥 MANEJO EXPLÍCITO DE RUTAS CONOCIDAS + COMODÍN
const allowedRoutes = [
  '/',
  '/turismo',
  '/cultura', 
  '/comunidad',
  '/galeria',
  '/contacto',
  '/login',
  '/perfil',
  '/admin/places',
  '/calendario-cultural',
  '/section-gastronomia',
  '/section-atracciones',
  '/success',
  '/section-cooperativa',
  '/oauth-callback'
];

// Manejar rutas específicas
allowedRoutes.forEach(route => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
});

// Comodín para cualquier otra ruta
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor en puerto ${PORT}`);
});