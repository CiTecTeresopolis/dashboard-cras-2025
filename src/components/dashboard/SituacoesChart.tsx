import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { situacoesData } from "@/data/creas-data";
import ChartSection from "./ChartSection";

const TOOLTIP_STYLE = {
  borderRadius: "0.75rem",
  border: "1px solid hsl(220 13% 91% / 0.5)",
  fontSize: 13,
  boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)",
};

const SituacoesChart = () => {
  return (
    <ChartSection
      title="Situações de Vulnerabilidade"
      description="Principais situações registradas"
    >
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={situacoesData}
            cx="50%"
            cy="45%"
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
            cornerRadius={4}
            label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
            labelLine={false}
          >
            {situacoesData.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            formatter={(value: number, name: string) => [
              value.toLocaleString("pt-BR"),
              name,
            ]}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={9}
            formatter={(value) => (
              <span className="text-xs text-foreground ml-1 font-medium">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartSection>
  );
};

export default SituacoesChart;
