import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; 
import { fileURLToPath } from 'url';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer', 'process', 'util'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      }
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
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-is'],
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
  define: {
    'process.env': '{}',
    'global': 'globalThis'
  },
  server: {
    port: 3000,
    host: true
  }
});