/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_PLIVO_ENDPOINT_USERNAME: string
  readonly VITE_PLIVO_ENDPOINT_PASSWORD: string
  readonly VITE_PLIVO_CALLER_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
