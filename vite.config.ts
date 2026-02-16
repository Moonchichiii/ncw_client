/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { resolve } from "path";
import type { PreRenderedAsset } from "rollup";

export default defineConfig({
  plugins: [
    tanstackRouter({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/app/route-tree.gen.ts",
      quoteStyle: "double",
      autoCodeSplitting: true,
    }),
      react(),
      tailwindcss(),
    
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    sourcemap: false,
    modulePreload: {
      polyfill: true,
    },
    assetsInlineLimit: 2048,
    cssCodeSplit: true,
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        compact: true,
        manualChunks: {
          router: ["@tanstack/react-router"],
          "error-vendor": ["react-error-boundary"],          
          "form-validation": ["zod"],
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo: PreRenderedAsset) => {
          const name = assetInfo.name ?? "";
          const info = name.split(".");
          const ext = info[info.length - 1] ?? "";

          if (/png|jpe?g|svg|gif|webp|avif|tiff|bmp|ico/i.test(ext)) {
            return "images/[name]-[hash][extname]";
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return "fonts/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    chunkSizeWarningLimit: 400,
    reportCompressedSize: false,
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  preview: {
    port: 4173,
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "clsx", "@tanstack/react-router"],
    exclude: [],
  },
  esbuild: {
    target: "esnext",
    treeShaking: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    minifyWhitespace: true,
    drop: ["debugger"],
    legalComments: "none",
  },
});
