import { useState } from "react";
import { CRAS_UNITS } from "@/data/cras-data";
import { useCrasData } from "@/hooks/useCrasData";
import KPICard from "@/components/dashboard/KPICard";
import SexoChart from "@/components/dashboard/SexoChart";
import BairrosChart from "@/components/dashboard/BairrosChart";
import DistritoChart from "@/components/dashboard/DistritoChart";
import { Users, MapPin, BookOpen, UserCheck } from "lucide-react";
import ProgramasChart from "@/components/dashboard/ProgramasChart";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FaixaEtariaChart from "@/components/dashboard/FaixaEtariaChart";
import EscolaridadeChart from "@/components/dashboard/EscolaridadeChart";
import ProgramaSexoChart from "@/components/dashboard/ProgramaSexoChart";
import FaixaEtariaProgramaChart from "@/components/dashboard/FaixaEtariaProgramaChart";

const Index = () => {
  const [selectedUnit, setSelectedUnit] = useState(CRAS_UNITS[0].id);
  const { data, loading } = useCrasData(selectedUnit);
  const unit = CRAS_UNITS.find((u) => u.id === selectedUnit);

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/3 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto px-4 md:px-6 py-8 md:py-12">
        <DashboardHeader
          selectedUnit={selectedUnit}
          onUnitChange={setSelectedUnit}
        />

        {loading || !data ? (
          <div className="flex items-center justify-center py-32">
            <div className="text-muted-foreground text-lg animate-pulse">
              Carregando dados...
            </div>
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
              <KPICard
                title="Total de Atendimentos"
                value={data.total}
                icon={Users}
                accent
                description={unit?.label || ""}
              />
              <KPICard
                title="Vínculos Ativos"
                value={data.programasData.length}
                icon={BookOpen}
                description="Modalidades vinculadas"
              />
              <KPICard
                title="Bairros Atendidos"
                value={data.bairrosData.length}
                icon={MapPin}
                description="Territórios de origem"
              />
              <KPICard
                title=" Público Feminino"
                value={`${(((data.sexoData.find((s) => s.name === "Feminino")?.value || 0) / data.total) * 100).toFixed(1)}%`}
                icon={UserCheck}
                description={`${data.sexoData.find((s) => s.name === "Feminino")?.value || 0} atendimentos`}
              />
            </div>

            {/* Row 1: Demographics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-5">
              <SexoChart data={data.sexoData} />
              <FaixaEtariaChart data={data.faixaEtariaData} />
              <EscolaridadeChart data={data.escolaridadeData} />
            </div>

            {/* Row 2: Cross analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 mb-5">
              <ProgramaSexoChart data={data.programaPorSexo} />
              <FaixaEtariaProgramaChart data={data.faixaEtariaPorPrograma} />
            </div>

            {/* Row 3: Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-5">
              <BairrosChart data={data.bairrosData.slice(0, 10)} />
              <DistritoChart data={data.distritosData} />
              <ProgramasChart data={data.programasData} />
            </div>
          </>
        )}

        {/* Footer */}
        <footer className="flex justify-center align-center text-center py-8 text-xs text-muted-foreground/60 font-medium">
          <img
            style={{ width: 250, height: 100, marginRight: 25 }}
            src="cie.png"
          />
          <p style={{ marginTop: 50 }}>
            Prefeitura Municipal de Teresópolis // 2026 // Departamento de
            Governança e Dados
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
