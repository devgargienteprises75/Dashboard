import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/webhook': {
        target: 'https://n8n-dashboard-workflow.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/webhook/, '/webhook'),
        cors: true
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'charts': ['recharts'],
          'icons': ['lucide-react']
        }
      }
    }
  }
})
