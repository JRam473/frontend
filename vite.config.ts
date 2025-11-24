import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; 

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
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
    port: 3000,
    host: true
  },
  preview: {
    port: 3000,
    host: true
  }
});