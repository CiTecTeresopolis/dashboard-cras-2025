/// <reference types="vite/client" />

declare module "virtual:cras-data-manifest" {
  export const DATA_MANIFEST: { folder: string; years: string[] }[];
}
