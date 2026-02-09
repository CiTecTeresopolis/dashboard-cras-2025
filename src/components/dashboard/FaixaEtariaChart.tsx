import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { faixaEtariaData, CHART_COLORS } from "@/data/creas-data";
import ChartSection from "./ChartSection";

const TOOLTIP_STYLE = {
  borderRadius: "0.75rem",
  border: "1px solid hsl(220 13% 91% / 0.5)",
  fontSize: 13,
  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)",
};

const FaixaEtariaChart = () => {
  return (
    <ChartSection title="Faixa Etária" description="Distribuição dos atendidos por idade">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={faixaEtariaData} layout="vertical" margin={{ left: 10 }}>
          <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(value: number) => [value.toLocaleString("pt-BR"), "Atendimentos"]}
            cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={CHART_COLORS[0]} stopOpacity={0.8} />
              <stop offset="100%" stopColor={CHART_COLORS[0]} />
            </linearGradient>
          </defs>
          <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="url(#barGradient)" barSize={22} />
        </BarChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};

export default FaixaEtariaChart;
