import { DATA_MANIFEST } from "virtual:cras-data-manifest";

export interface DataStructureEntry {
  folder: string;
  years: string[];
}

const ESTRUTURA_LABELS: Record<string, string> = {
  alto: "CRAS Alto",
  barra: "CRAS Barra",
  prata: "CRAS Prata",
  meudon: "CRAS Meudon",
  barroso: "CRAS Barroso",
  saopedro: "CRAS São Pedro",
  bonsucesso: "CRAS Bonsucesso",
};

export function estruturaLabel(folder: string): string {
  if (ESTRUTURA_LABELS[folder]) return ESTRUTURA_LABELS[folder];
  const capitalized = folder.charAt(0).toUpperCase() + folder.slice(1);
  return `CRAS ${capitalized}`;
}

export const DATA_STRUCTURES: (DataStructureEntry & { label: string })[] =
  DATA_MANIFEST.map((entry) => ({
    ...entry,
    label: estruturaLabel(entry.folder),
  }));

export function getAvailableYears(folder: string): string[] {
  return (
    DATA_MANIFEST.find((entry) => entry.folder === folder)?.years ?? []
  );
}
