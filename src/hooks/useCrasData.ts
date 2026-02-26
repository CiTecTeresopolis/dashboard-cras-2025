import { useState, useEffect } from "react";
import { AggregatedData, loadCrasData, CRAS_UNITS } from "@/data/cras-data";

export function useCrasData(unitId: string) {
  const [data, setData] = useState<AggregatedData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unit = CRAS_UNITS.find((u) => u.id === unitId);
    if (!unit) return;

    setLoading(true);
    loadCrasData(unit.csvPath)
      .then(setData)
      .finally(() => setLoading(false));
  }, [unitId]);

  return { data, loading };
}
