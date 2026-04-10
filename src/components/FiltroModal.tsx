import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FiltroModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (selection: {
    csvPath: string;
    unitLabel: string;
    periodLabel: string;
    unitId: string;
  }) => void;
}

const FiltroModal: React.FC<FiltroModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  const [ano, setAno] = useState<string>("");
  const [mes, setMes] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [estrutura, setEstrutura] = useState<string>("");
  const [periodo, setPeriodo] = useState<string>("ano-todo");
  const hasConfirmedOnceRef = useRef(false);

  const estruturas = [
    { name: "alto", label: "CRAS Alto" },
    { name: "barra", label: "CRAS Barra" },
    { name: "prata", label: "CRAS Prata" },
    { name: "meudon", label: "CRAS Meudon" },
    { name: "barroso", label: "CRAS Barroso" },
    { name: "saopedro", label: "CRAS São Pedro" },
    { name: "bonsucesso", label: "CRAS Bonsucesso" },
  ];
  const anos = ["2025", "2026"];
  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const handleConfirmar = async () => {
    setError("");

    if (!estrutura || !ano || (periodo === "mes" && !mes)) {
      setError("Preencha todos os filtros antes de confirmar.");
      return;
    }

    const selected = estruturas.find((est) => est.name === estrutura);
    const unitLabel = selected?.label || estrutura;
    const periodLabel =
      periodo === "ano-todo"
        ? `Ano Todo ${ano}`
        : `${mes.charAt(0).toUpperCase() + mes.slice(1)} ${ano}`;

    const caminho =
      periodo === "ano-todo"
        ? `/data/${estrutura}/completo-${ano}.csv`
        : `/data/${estrutura}/${mes}-${ano}.csv`;

    setLoading(true);
    try {
      const response = await fetch(caminho);
      if (!response.ok) {
        throw new Error("Arquivo não encontrado");
      }

      const contentType = response.headers.get("content-type") || "";
      const text = await response.text();
      const normalizedText = text.trimStart();

      if (
        contentType.includes("text/html") ||
        normalizedText.startsWith("<") ||
        normalizedText.length === 0
      ) {
        throw new Error("Arquivo inválido ou não encontrado");
      }

      onConfirm({
        csvPath: caminho,
        unitLabel,
        periodLabel,
        unitId: estrutura,
      });
      hasConfirmedOnceRef.current = true;
      onOpenChange(false);
    } catch (err) {
      setError(`Este arquivo não está disponível.`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && !hasConfirmedOnceRef.current) {
      toast.error("Selecione um arquivo CSV antes de fechar");
      return;
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Selecionar Filtros</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="estrutura" className="text-right">
              Estrutura
            </label>
            <Select value={estrutura} onValueChange={setEstrutura}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione a estrutura" />
              </SelectTrigger>
              <SelectContent>
                {estruturas.map((est) => (
                  <SelectItem key={est.name} value={est.name}>
                    {est.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="ano" className="text-right">
              Ano
            </label>
            <Select value={ano} onValueChange={setAno}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>
              <SelectContent>
                {anos.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="periodo" className="text-right">
              Período
            </label>
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ano-todo">Ano Todo</SelectItem>
                <SelectItem value="mes">Mês Específico</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {periodo === "mes" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="mes" className="text-right">
                Mês
              </label>
              <Select value={mes} onValueChange={setMes}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o mês" />
                </SelectTrigger>
                <SelectContent>
                  {meses.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m.charAt(0).toUpperCase() + m.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        {error ? (
          <div className="rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}
        <div className="flex justify-end">
          <Button onClick={handleConfirmar} disabled={loading}>
            {loading ? "Validando..." : "Confirmar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FiltroModal;
