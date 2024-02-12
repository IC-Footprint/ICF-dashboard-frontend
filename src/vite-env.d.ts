/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_HOST: string;
  readonly VITE_APP_API_KEY: string;
  readonly VITE_APP_DASHBOARD_REFRESH_MINUTES_INTERVAL: string;
  readonly VITE_APP_SUSTAINABILITY_REPORT_YEAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
