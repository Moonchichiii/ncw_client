import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ...(process.env.NODE_ENV === 'production' ? ['transform-remove-console'] : [])
        ]
      }
    }),
    tailwindcss()
  ],
 
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
 
  build: {
    target: 'esnext',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        safari10: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'animation-vendor': ['gsap'],
          'ui-vendor': ['lucide-react', 'clsx'],
          'error-vendor': ['react-error-boundary']
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') ?? []
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext ?? '')) {
            return `images/[name]-[hash][extname]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext ?? '')) {
            return `fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    },
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    assetsInlineLimit: 4096
  },
 
  server: {
    port: 5173,
    open: true,
    middlewareMode: false,
    hmr: {
      overlay: true
    }
  },

  preview: {
    port: 4173,
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      'clsx',
      'gsap'
    ],
    exclude: []
  },

  esbuild: {
    target: 'esnext',
    treeShaking: true,
    minifyIdentifiers: true,
    minifySyntax: true
  }
})
