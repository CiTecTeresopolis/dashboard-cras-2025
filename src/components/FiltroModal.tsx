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
import { DATA_STRUCTURES, getAvailableYears } from "@/data/dataManifest";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [estrutura, setEstrutura] = useState<string>("");
  const hasConfirmedOnceRef = useRef(false);

  const anos = getAvailableYears(estrutura);

  const handleSelectEstrutura = (value: string) => {
    setEstrutura(value);
    setAno("");
  };

  const handleConfirmar = async () => {
    setError("");

    if (!estrutura || !ano) {
      setError("Preencha todos os filtros antes de confirmar.");
      return;
    }

    const selected = DATA_STRUCTURES.find((est) => est.folder === estrutura);
    const unitLabel = selected?.label || estrutura;
    const periodLabel = `Ano ${ano}`;

    const caminho = `/data/${estrutura}/completo-${ano}.csv`;

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
            <Select
              value={estrutura}
              onValueChange={handleSelectEstrutura}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione a estrutura" />
              </SelectTrigger>
              <SelectContent>
                {DATA_STRUCTURES.map((est) => (
                  <SelectItem key={est.folder} value={est.folder}>
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
            <Select value={ano} onValueChange={setAno} disabled={!estrutura}>
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
        </div>
        {error ? (
          <div className="rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}
        <div className="flex justify-between mt-4">
          <a
            href="https://pain-is-responsivos.vercel.app/"
            className="text-red-500 hover:underline mt-2"
          >
            {"Voltar aos Painéis"}
          </a>
          <Button onClick={handleConfirmar} disabled={loading}>
            {loading ? "Validando..." : "Confirmar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FiltroModal;
