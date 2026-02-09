import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { bairrosViolencia } from "@/data/creas-data";
import ChartSection from "./ChartSection";

const TOOLTIP_STYLE = {
  borderRadius: "0.75rem",
  border: "1px solid hsl(220 13% 91% / 0.5)",
  fontSize: 13,
  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)",
};

const BairrosChart = () => {
  return (
    <ChartSection title="Bairros — Violência Intrafamiliar" description="Top 5 bairros com maior incidência">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={bairrosViolencia} layout="vertical" margin={{ left: 10 }}>
          <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(value: number) => [value.toLocaleString("pt-BR"), "Casos"]}
            cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]} fill="hsl(var(--chart-4))" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};

export default BairrosChart;
