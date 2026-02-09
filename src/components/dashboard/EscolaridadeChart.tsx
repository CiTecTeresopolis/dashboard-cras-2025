import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { escolaridadeData, CHART_COLORS } from "@/data/creas-data";
import ChartSection from "./ChartSection";

const TOOLTIP_STYLE = {
  borderRadius: "0.75rem",
  border: "1px solid hsl(220 13% 91% / 0.5)",
  fontSize: 13,
  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)",
};

const EscolaridadeChart = () => {
  return (
    <ChartSection title="Escolaridade" description="Nível de escolaridade dos atendidos">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={escolaridadeData} layout="vertical" margin={{ left: 10 }}>
          <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <YAxis dataKey="name" type="category" width={130} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(value: number) => [value.toLocaleString("pt-BR"), "Atendimentos"]}
            cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]} fill={CHART_COLORS[1]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};

export default EscolaridadeChart;
