import { CHART_COLORS } from "@/data/cras-data";
import ChartSection from "./ChartSection";

interface ProgramasChartProps {
  data: { name: string; value: number }[];
}

const ProgramasChart = ({ data }: ProgramasChartProps) => {
  const total = data.reduce((acc, s) => acc + s.value, 0);

  return (
    <ChartSection
      title="Programas Vinculados"
      description="Volume por tipo de programa"
    >
      <div className="space-y-4">
        {data.map((programa, index) => {
          const pct = ((programa.value / total) * 100).toFixed(1);
          return (
            <div key={programa.name} className="group">
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-xs text-foreground font-semibold leading-tight max-w-[70%]">
                  {programa.name}
                </span>
                <span className="text-xs font-mono font-bold text-foreground">
                  {programa.value}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-muted/60 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 group-hover:brightness-110"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </ChartSection>
  );
};

export default ProgramasChart;
