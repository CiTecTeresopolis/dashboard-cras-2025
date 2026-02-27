export const CHART_COLORS = [
  "#a7c957",
  "#6a994e",
  "#386641",
  "#f7b801",
  "#f18701",
  "#bc4749",
];

export interface CrasRecord {
  sexo: string;
  idade: number;
  escolaridade: string;
  bairro: string;
  distrito: string;
  referencia: string;
  localAtendimento: string;
  programa: string;
}

export interface CrasUnit {
  id: string;
  label: string;
  csvPath: string;
}

export const CRAS_UNITS: CrasUnit[] = [
  { id: "prata", label: "CRAS Prata", csvPath: "/data/cras-prata.csv" },
  // Adicione novas unidades aqui:
  // { id: "exemplo", label: "CRAS Exemplo", csvPath: "/data/cras-exemplo.csv" },
];

function getFaixaEtaria(idade: number): string {
  if (idade <= 12) return "Criança (0-12)";
  if (idade <= 18) return "Adolescente (13-18)";
  if (idade <= 29) return "Jovem (19-29)";
  if (idade <= 59) return "Adulto (30-59)";
  return "Idoso (60+)";
}

export function parseCsv(text: string): CrasRecord[] {
  const lines = text.split("\n").slice(1); // skip header
  const records: CrasRecord[] = [];

  for (const line of lines) {
    const cols = line.split(",");
    const sexo = cols[0]?.trim();
    const idadeStr = cols[1]?.trim();
    const escolaridade = cols[2]?.trim();
    const bairro = cols[3]?.trim();
    const distrito = cols[4]?.trim();
    const referencia = cols[5]?.trim();
    const localAtendimento = cols[6]?.trim();
    const programa = cols[7]?.trim();

    if (!sexo || !idadeStr) continue;
    const idade = parseInt(idadeStr, 10);
    if (isNaN(idade)) continue;

    records.push({ sexo, idade, escolaridade, bairro, distrito, referencia, localAtendimento, programa });
  }

  return records;
}

export interface AggregatedData {
  total: number;
  mediaIdade: string;
  sexoData: { name: string; value: number; fill: string }[];
  faixaEtariaData: { name: string; Masculino: number; Feminino: number }[];
  escolaridadeData: { name: string; Masculino: number; Feminino: number }[];
  bairrosData: { name: string; value: number }[];
  programasData: { name: string; value: number }[];
  programaPorSexo: { programa: string; Masculino: number; Feminino: number }[];
  faixaEtariaPorPrograma: Record<string, unknown>[];
  distritosData: { name: string; value: number }[]; 
}

function countBy<T>(arr: T[], keyFn: (item: T) => string): Map<string, number> {
  const map = new Map<string, number>();
  for (const item of arr) {
    const key = keyFn(item);
    map.set(key, (map.get(key) || 0) + 1);
  }
  return map;
}

function sortedEntries(map: Map<string, number>, limit?: number): { name: string; value: number }[] {
  const entries = Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name, value }));
  return limit ? entries.slice(0, limit) : entries;
}

function calculateAverageAge(records: CrasRecord[]): string {
  if (records.length === 0) return "0.00";
  const sum = records.reduce((acc, curr) => acc + curr.idade, 0);
  return (sum / records.length).toFixed(0); // Retorna com 2 casas decimais
}

export function aggregateData(records: CrasRecord[]): AggregatedData {
  const total = records.length;

  const mediaIdade = calculateAverageAge(records);

  // Sexo
  const sexoMap = countBy(records, (r) => r.sexo);
  const sexoData = [
    { name: "Masculino", value: sexoMap.get("Masculino") || 0, fill: "#6a994e" },
    { name: "Feminino", value: sexoMap.get("Feminino") || 0, fill: "#bc4749" },
  ];

  // Faixa Etária (contagem por sexo)
  const faixaOrder = ["Criança (0-12)", "Adolescente (13-18)", "Jovem (19-29)", "Adulto (30-59)", "Idoso (60+)"];
  const faixaEtariaData = faixaOrder.map((name) => {
    const filtered = records.filter((r) => getFaixaEtaria(r.idade) === name);
    return {
      name,
      Masculino: filtered.filter((r) => r.sexo === "Masculino").length,
      Feminino: filtered.filter((r) => r.sexo === "Feminino").length,
    };
  });

  // Escolaridade (contagem por sexo)
  const escMap = new Map<string, { Masculino: number; Feminino: number }>();
  for (const r of records) {
    const name = r.escolaridade || "";
    if (!escMap.has(name)) {
      escMap.set(name, { Masculino: 0, Feminino: 0 });
    }
    const obj = escMap.get(name)!;
    if (r.sexo === "Masculino") obj.Masculino += 1;
    else if (r.sexo === "Feminino") obj.Feminino += 1;
  }
  const escolaridadeData = Array.from(escMap.entries())
    .map(([name, counts]) => ({ name, ...counts }))
    .sort((a, b) => b.Masculino + b.Feminino - (a.Masculino + a.Feminino));

  // Bairros (top 10)
  const bairroMap = countBy(records, (r) => r.bairro);
  const bairrosData = sortedEntries(bairroMap);

   // Bairros (top 10)
  const distritoMap = countBy(records, (r) => r.distrito);
  const distritosData = sortedEntries(distritoMap);


  // Programas
  const progMap = countBy(records, (r) => r.programa);
  const programasData = sortedEntries(progMap);

  // Programa por Sexo
  const programas = programasData.map((p) => p.name);
  const programaPorSexo = programas.map((programa) => {
    const filtered = records.filter((r) => r.programa === programa);
    return {
      programa,
      Masculino: filtered.filter((r) => r.sexo === "Masculino").length,
      Feminino: filtered.filter((r) => r.sexo === "Feminino").length,
    };
  });

  // Faixa Etária por Programa (top 4 programas)
  const topProgramas = programas.slice(0, 4);
  const faixaEtariaPorPrograma = topProgramas.map((programa) => {
    const filtered = records.filter((r) => r.programa === programa);
    const faixaCounts = countBy(filtered, (r) => getFaixaEtaria(r.idade));
    const entry: Record<string, unknown> = { programa };
    for (const faixa of faixaOrder) {
      entry[faixa] = faixaCounts.get(faixa) || 0;
    }
    return entry;
  });

  return {
    total,
    sexoData,
    mediaIdade,
    faixaEtariaData,
    escolaridadeData,
    bairrosData,
    programasData,
    programaPorSexo,
    faixaEtariaPorPrograma,
    distritosData,
  };
}

export async function loadCrasData(csvPath: string): Promise<AggregatedData> {
  const response = await fetch(csvPath);
  const text = await response.text();
  const records = parseCsv(text);
  return aggregateData(records);
}
