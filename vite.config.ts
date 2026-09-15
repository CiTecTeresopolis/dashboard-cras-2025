import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "node:fs";
import { componentTagger } from "lovable-tagger";

function crasDataManifest(): Plugin {
  const virtualId = "virtual:cras-data-manifest";
  const resolvedVirtualId = "\0" + virtualId;
  const dataDir = path.resolve(__dirname, "public/data");

  function buildManifest() {
    if (!fs.existsSync(dataDir)) return [];
    const entries: { folder: string; years: string[] }[] = [];

    for (const folder of fs.readdirSync(dataDir)) {
      const folderPath = path.join(dataDir, folder);
      if (!fs.statSync(folderPath).isDirectory()) continue;

      const years = fs
        .readdirSync(folderPath)
        .map((file) => /^completo-(\d{4})\.csv$/.exec(file)?.[1])
        .filter((year): year is string => Boolean(year))
        .sort();

      if (years.length === 0) continue;

      entries.push({ folder, years });
    }

    entries.sort((a, b) => a.folder.localeCompare(b.folder));
    return entries;
  }

  return {
    name: "cras-data-manifest",
    buildStart() {
      this.addWatchFile(dataDir);
    },
    resolveId(id) {
      if (id === virtualId) return resolvedVirtualId;
    },
    load(id) {
      if (id === resolvedVirtualId) {
        return `export const DATA_MANIFEST = ${JSON.stringify(buildManifest())};`;
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    crasDataManifest(),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
