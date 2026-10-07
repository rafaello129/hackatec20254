import { useCallback, useEffect, useState } from "react";
import { getHomeDashboard } from "@/services/home.service";
import type { HomeDashboardData } from "@/types/home.types";

export function useHomeDashboard() {
  const [data, setData] = useState<HomeDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const dashboard = await getHomeDashboard();
      setData(dashboard);
    } catch {
      setError("No pudimos cargar tu resumen.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  return {
    data,
    isLoading,
    error,
    reload: loadDashboard,
  };
}
