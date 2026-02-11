import { Download, FileText, AlertTriangle, Home, GraduationCap, Users, MapPin, BookOpen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Section = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <div className="p-1.5 rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
    </div>
    <div className="text-sm text-muted-foreground leading-relaxed pl-9 space-y-2">
      {children}
    </div>
  </div>
);

const AnaliseModal = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Analise_dos_Dados_do_CREAS.docx";
    link.download = "Analise_dos_Dados_do_CREAS.docx";
    link.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 glass-card border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all"
        >
          <FileText className="h-4 w-4" />
          Análise Completa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 glass-card border-white/10 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4 bg-gradient-to-r from-primary/5 to-accent/5">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Análise dos Dados do CREAS – Teresópolis (2025)
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Diagnóstico completo baseado nos 854 atendimentos realizados em 2025.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="px-6 pb-2" style={{ maxHeight: "calc(85vh - 180px)" }}>
          <div className="space-y-6 py-2">
            {/* Visão Geral */}
            <div className="rounded-xl bg-primary/5 border border-primary/10 p-4 space-y-2">
              <p className="text-sm font-medium text-foreground">
                O painel mostra <strong>854 atendimentos</strong> em 2025, com forte concentração em:
              </p>
              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold">
                  Violência intrafamiliar – 48,8%
                </span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-xs font-semibold">
                  Situação de rua – 39,2%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Esses dois grupos somam <strong>88%</strong> de toda a demanda.
              </p>
            </div>

            <Separator className="bg-white/5" />

            {/* 1.1 */}
            <Section icon={AlertTriangle} title="Violência Intrafamiliar (417 casos)">
              <p>Concentração territorial em <strong>São Pedro, Fonte Santa, Ermitage, Alto e Ilha do Caxangá</strong>.</p>
              <p>Forte presença de mulheres entre as vítimas (padrão nacional). Faixa etária predominante: adultos, com presença relevante de crianças e adolescentes.</p>
              <div className="rounded-lg bg-muted/50 p-3 border border-white/5 text-xs">
                <strong className="text-foreground">Indicação:</strong> Necessidade de políticas de proteção à mulher, fortalecimento familiar e prevenção à violência nos territórios mais vulneráveis.
              </div>
            </Section>

            <Separator className="bg-white/5" />

            {/* 1.2 */}
            <Section icon={Home} title="Situação de Rua (335 casos – 39,2%)">
              <p>Maior incidência entre <strong>homens adultos</strong>. Conexão provável com questões de saúde mental, dependência química e desemprego.</p>
              <div className="rounded-lg bg-muted/50 p-3 border border-white/5 text-xs">
                <strong className="text-foreground">Indicação:</strong> Exige políticas intersetoriais de habitação, saúde mental e emprego.
              </div>
            </Section>

            <Separator className="bg-white/5" />

            {/* 1.3 */}
            <Section icon={Users} title="Trabalho Infantil (9,48%)">
              <p>Concentração em crianças e adolescentes. Indica fragilidade socioeconômica e ausência de políticas de proteção escolar.</p>
            </Section>

            <Separator className="bg-white/5" />

            {/* 1.4 */}
            <Section icon={GraduationCap} title="Escolaridade dos Atendidos">
              <p>Predomínio de <strong>fundamental incompleto</strong> e <strong>médio incompleto</strong>. A baixa escolaridade é fator de risco para vulnerabilidade social.</p>
              <div className="rounded-lg bg-muted/50 p-3 border border-white/5 text-xs">
                <strong className="text-foreground">Indicação:</strong> Políticas de EJA e qualificação profissional são essenciais para esse público.
              </div>
            </Section>

            <Separator className="bg-white/5" />

            {/* 1.5 */}
            <Section icon={BookOpen} title="Serviços Prestados">
              <p><strong>Proteção e Atendimento Especializado a Famílias</strong> é o mais demandado (663 atendimentos). Abordagem Social aparece com apenas 39 — muito baixo para o número de pessoas em situação de rua.</p>
              <div className="rounded-lg bg-muted/50 p-3 border border-white/5 text-xs">
                <strong className="text-foreground">Indicação:</strong> A equipe de abordagem social pode estar subdimensionada e a demanda reprimida pode ser maior.
              </div>
            </Section>

            <Separator className="bg-white/5" />

            {/* Diagnóstico */}
            <Section icon={MapPin} title="Diagnóstico Geral">
              <p>O CREAS enfrenta três grandes desafios estruturais:</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li><strong>Violência doméstica</strong> como principal demanda — requer políticas integradas com saúde, educação, segurança e assistência.</li>
                <li><strong>Situação de rua em crescimento</strong> — exige políticas intersetoriais de habitação, saúde mental e emprego.</li>
                <li><strong>Vulnerabilidade concentrada em bairros específicos</strong> — necessidade de territorialização das políticas públicas.</li>
              </ol>
            </Section>

            <Separator className="bg-white/5" />

            {/* Conclusão */}
            <div className="rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 p-4">
              <h3 className="font-semibold text-foreground mb-2">Conclusão</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Os dados do CREAS revelam um cenário de <strong>alta vulnerabilidade social</strong>, com forte concentração em violência intrafamiliar e situação de rua. As políticas públicas precisam ser <strong>intersetoriais, territorializadas e baseadas em evidências</strong>.
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t border-white/5 flex justify-end">
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Baixar Análise (.docx)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnaliseModal;
