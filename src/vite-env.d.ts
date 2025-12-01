/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLOUD_NAME: string
  readonly VITE_API_KEY: string
  readonly VITE_CLOUD_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}