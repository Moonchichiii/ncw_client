import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  
  build: {
    target: 'esnext',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react'],
        },
      },
    },
  },
  
  server: {
    port: 5173,
    open: true,
  },
})