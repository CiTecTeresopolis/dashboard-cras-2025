import { Shield, TrendingUp } from "lucide-react";
import AnaliseModal from "./AnaliseModal";

const DashboardHeader = () => {
  return (
    <header className="relative overflow-hidden dashboard-gradient rounded-3xl p-8 md:p-10 text-primary-foreground mb-8">
      {/* Decorative orbs */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5 blur-2xl" />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-2xl bg-white backdrop-blur-sm border border-white/10">
            <img src="logo.svg" style={{ width: 120 }} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Centro de Referência Especializado de Assistência Social (CREAS)
            </h1>
            <p className="text-sm text-primary-foreground/80 mt-1 font-medium">
              Referência 2025
            </p>
          </div>
        </div>
        <div className="flex flex-col bg-red gap-2">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
            <TrendingUp className="h-4 w-4 text-primary-foreground/70" />
            <a
              target="_blank"
              href="https://dados.teresopolis.rj.gov.br/dataset/creas-centro-de-referencia-especializado-de-assistencia-social/resource/b75d3473-01d0-4e45-b042-3c5d246bbcd1"
            >
              <span className="text-sm font-semibold">Base de Dados</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
            <img src="assistencia.png" className="h-10 w-10" />
            <a
              target="_blank"
              href="https://www.teresopolis.rj.gov.br/estrutura/desenvolvimento-social/"
            >
              <span className="text-sm font-semibold">Assistência Social</span>
            </a>
          </div>
          <AnaliseModal />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
