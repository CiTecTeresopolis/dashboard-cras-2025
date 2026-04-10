import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  selectedUnitLabel: string;
  selectedPeriodLabel: string;
  onOpenFilter: () => void;
}

const DashboardHeader = ({
  selectedUnitLabel,
  selectedPeriodLabel,
  onOpenFilter,
}: DashboardHeaderProps) => {
  return (
    <header className="relative overflow-hidden dashboard-gradient rounded-3xl p-8 md:p-10 text-primary-foreground mb-8">
      {/* Decorative orbs */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5 blur-2xl" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-2xl bg-white backdrop-blur-sm border border-white/10">
            <img src="logo.svg" style={{ width: 120 }} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Centro de Referência de Assistência Social (CRAS)
            </h1>
            <p className="text-md text-primary-foreground/80 mt-1 font-medium">
              Dashboard de Atendimentos - {selectedUnitLabel} (
              {selectedPeriodLabel})
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {/* <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
            <TrendingUp className="h-4 w-4 text-primary-foreground/70" />
            <a
              target="_blank"
              href="https://dados.teresopolis.rj.gov.br"
            >
              <span className="text-sm font-semibold">Base de Dados</span>
            </a>
          </div> */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
            <img src="assistencia.png" className="h-10 w-10" />
            <a
              target="_blank"
              href="https://www.teresopolis.rj.gov.br/estrutura/desenvolvimento-social/"
            >
              <span className="text-sm font-semibold">Assistência Social</span>
            </a>
          </div>

          <div
            className="space-y-2 p-4 rounded-3xl bg-white/10 border border-white/10 backdrop-blur-sm text-center cursor-pointer hover:bg-white/20 transition-colors"
            onClick={onOpenFilter}
            title="Clique para alterar os filtros"
          >
            <div className="text-base font-semibold text-primary-foreground">
              {selectedUnitLabel}
            </div>
            <div className="text-base font-semibold text-primary-foreground">
              {selectedPeriodLabel}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
