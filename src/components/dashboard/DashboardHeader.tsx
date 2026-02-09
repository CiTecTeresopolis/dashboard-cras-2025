import { Shield, TrendingUp } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="relative overflow-hidden dashboard-gradient rounded-3xl p-8 md:p-10 text-primary-foreground mb-8">
      {/* Decorative orbs */}
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5 blur-2xl" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
      
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
            <Shield className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              CREAS 2025
            </h1>
            <p className="text-sm text-primary-foreground/60 mt-1 font-medium">
              Centro de Referência Especializado de Assistência Social
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
          <TrendingUp className="h-4 w-4 text-primary-foreground/70" />
          <span className="text-sm font-semibold">Dashboard de Métricas</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
