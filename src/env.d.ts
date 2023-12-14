/// <reference types="astro/client" />

interface ImportMetaEnv {
  PUBLIC_CLERK_PUBLISHABLE_KEY: string
  CLERK_SECRET_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}