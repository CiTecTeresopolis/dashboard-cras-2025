import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartSection from "./ChartSection";

const TOOLTIP_STYLE = {
  borderRadius: "0.75rem",
  border: "1px solid hsl(220 13% 91% / 0.5)",
  fontSize: 13,
  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)",
};

interface BairrosChartProps {
  data: { name: string; value: number }[];
}

const BairrosChart = ({ data }: BairrosChartProps) => {
  return (
    <ChartSection
      title="Bairros de Origem"
      description="Top 10 bairros com mais atendimentos"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 10 }}>
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={130}
            tick={{ fontSize: 14, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(value: number) => [
              value.toLocaleString("pt-BR"),
              "Atendimentos",
            ]}
            cursor={{ fill: "hsl(var(--muted) / 0.4)" }}
          />
          <Bar
            dataKey="value"
            radius={[0, 8, 8, 0]}
            fill="#a7c957"
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};

export default BairrosChart;
