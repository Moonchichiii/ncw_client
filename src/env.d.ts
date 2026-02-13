/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Cloudinary cloud name (public — used for image URLs) */
  readonly VITE_CLOUD_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}