import { resolve } from "path";
import { defineConfig } from "vitest/config";

// Standalone Vitest config. Kept separate from vite.config.ts because
// vitest 2.x bundles Vite 5 internally while the app builds with Vite 6;
// sharing one config file causes plugin type conflicts under `tsc -b`.
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    jsx: "automatic",
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    css: false,
  },
});
