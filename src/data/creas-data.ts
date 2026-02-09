export const TOTAL_ATENDIMENTOS = 854;

export const sexoData = [
  { name: "Masculino", value: 525, fill: "#6a994e" },
  { name: "Feminino", value: 329, fill: "#bc4749" },
];

export const faixaEtariaData = [
  { name: "Adulto (19-59)", value: 524 },
  { name: "Adolescente (13-18)", value: 144 },
  { name: "Idoso (60+)", value: 100 },
  { name: "Criança (0-12)", value: 86 },
];

export const escolaridadeData = [
  { name: "Fund. Incompleto", value: 489 },
  { name: "Médio Incompleto", value: 136 },
  { name: "Médio Completo", value: 92 },
  { name: "Fund. Completo", value: 66 },
  { name: "Não Escolarizado", value: 40 },
  { name: "Sup. Incompleto", value: 17 },
  { name: "Sup. Completo", value: 14 },
];

export const situacoesData = [
  { name: "Violência Intrafamiliar", value: 417, fill: "#bc4749" },
  { name: "Situação de Rua", value: 335, fill: "#6a994e" },
  { name: "Trabalho Infantil", value: 81, fill: "#a7c957" },
  { name: "Abandono", value: 20, fill: "#f18701" },
  { name: "Violência Patrimonial", value: 1, fill: "#7b2cbf" },
];

export const situacaoPorSexo = [
  { situacao: "Situação de Rua", Masculino: 300, Feminino: 35 },
  { situacao: "Violência Intrafamiliar", Masculino: 147, Feminino: 270 },
  { situacao: "Trabalho Infantil", Masculino: 70, Feminino: 11 },
  { situacao: "Abandono", Masculino: 10, Feminino: 10 },
];

export const faixaEtariaPorSituacao = [
  { situacao: "Trabalho Infantil", "Criança (0-12)": 0, "Adolescente (13-18)": 81, "Adulto (19-59)": 0, "Idoso (60+)": 0 },
  { situacao: "Violência Intrafamiliar", "Criança (0-12)": 86, "Adolescente (13-18)": 62, "Adulto (19-59)": 203, "Idoso (60+)": 66 },
  { situacao: "Situação de Rua", "Criança (0-12)": 0, "Adolescente (13-18)": 1, "Adulto (19-59)": 314, "Idoso (60+)": 20 },
];

export const bairrosViolencia = [
  { name: "São Pedro", value: 108 },
  { name: "Fonte Santa", value: 29 },
  { name: "Ermitage", value: 19 },
  { name: "Alto", value: 18 },
  { name: "Ilha do Caxangá", value: 16 },
];

export const servicosData = [
  { name: "Proteção e Atend. Especializado a Famílias", value: 663 },
  { name: "Medida Socioeducativa", value: 81 },
  { name: "Proteção Social Esp. (Deficiência/Idosos)", value: 71 },
  { name: "Abordagem Social", value: 39 },
];

export const CHART_COLORS = [
  "#386641",
  "#bc4749",
  "#6a994e",
  "#a7c957",
  "#f18701",
  "#f7b801",
];
