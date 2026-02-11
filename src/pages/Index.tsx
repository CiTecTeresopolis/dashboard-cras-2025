import { Users, Home, AlertTriangle, UserCheck } from "lucide-react";
import { TOTAL_ATENDIMENTOS } from "@/data/creas-data";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPICard from "@/components/dashboard/KPICard";
import SexoChart from "@/components/dashboard/SexoChart";
import FaixaEtariaChart from "@/components/dashboard/FaixaEtariaChart";
import EscolaridadeChart from "@/components/dashboard/EscolaridadeChart";
import SituacoesChart from "@/components/dashboard/SituacoesChart";
import SituacaoSexoChart from "@/components/dashboard/SituacaoSexoChart";
import FaixaEtariaSituacaoChart from "@/components/dashboard/FaixaEtariaSituacaoChart";
import BairrosChart from "@/components/dashboard/BairrosChart";
import ServicosChart from "@/components/dashboard/ServicosChart";
import AnaliseModal from "@/components/dashboard/AnaliseModal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/3 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto px-4 md:px-6 py-8 md:py-12">
        <DashboardHeader />
        <AnaliseModal />

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
          <KPICard
            title="Total de Atendimentos"
            value={TOTAL_ATENDIMENTOS}
            icon={Users}
            accent
            description="Em 2025"
          />
          <KPICard
            title="Violência Intrafamiliar"
            value={417}
            icon={AlertTriangle}
            description="48,8% do total"
          />
          <KPICard
            title="Situação de Rua"
            value={335}
            icon={Home}
            description="39,2% do total"
          />
          <KPICard
            title="Serviços Ofertados"
            value={4}
            icon={UserCheck}
            description="Modalidades ativas"
          />
        </div>
        {/* Row 1: Demographics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-5">
          <SexoChart />
          <FaixaEtariaChart />
          <SituacoesChart />
        </div>
        {/* Row 2: Cross analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 mb-5">
          <SituacaoSexoChart />
          <FaixaEtariaSituacaoChart />
        </div>
        {/* Row 3: Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-5">
          <EscolaridadeChart />
          <BairrosChart />
          <ServicosChart />
        </div>
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
