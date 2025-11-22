import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; 
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    // 🔥 AGREGAR: Analizador de bundle (solo en build)
    visualizer({
      filename: 'dist/stats.html',
      open: false, // No abrir automáticamente
      gzipSize: true,
      brotliSize: true,
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1500, // 🔥 AUMENTAR temporalmente
    // 🔥 AGREGAR: Configuración de chunks optimizada
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar librerías por categorías
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          charts: ['recharts'],
          ui: [
            'lucide-react', 
            '@radix-ui/react-dialog',
            '@radix-ui/react-select',
            '@radix-ui/react-toast'
          ],
          utils: ['date-fns', 'clsx', 'tailwind-merge']
        }
      }
    }
  },
  server: {
    port: 3000
  }
});