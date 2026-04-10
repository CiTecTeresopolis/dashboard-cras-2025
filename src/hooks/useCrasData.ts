import { useState, useEffect } from "react";
import { AggregatedData, loadCrasData, CRAS_UNITS } from "@/data/cras-data";

export function useCrasData(unitId: string, customCsvPath?: string) {
  const [data, setData] = useState<AggregatedData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const csvPath = customCsvPath || (CRAS_UNITS.find((u) => u.id === unitId)?.csvPath);
    if (!csvPath) return;

    setLoading(true);
    loadCrasData(csvPath)
      .then(setData)
      .finally(() => setLoading(false));
  }, [unitId, customCsvPath]);

  return { data, loading };
}
