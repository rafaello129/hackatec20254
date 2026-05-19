import { useEffect, useMemo, useState } from "react";
import { getCooperativeKpis, getCooperativeOpportunities } from "@/services/cooperatives.service";
import type {
  CooperativeKpi,
  CooperativeOpportunity,
  CooperativeOpportunityType,
  CooperativeStatus,
} from "@/types/cooperatives.types";

export type OpportunityTypeFilter = CooperativeOpportunityType | "all";
export type OpportunityStatusFilter = CooperativeStatus | "all";

export const opportunityTypeOptions: Array<{ value: OpportunityTypeFilter; label: string }> = [
  { value: "all", label: "Todos los tipos" },
  { value: "joint_purchase", label: "Compra conjunta" },
  { value: "joint_sale", label: "Venta conjunta" },
  { value: "shared_campaign", label: "Campaña compartida" },
  { value: "shared_distribution", label: "Distribución compartida" },
  { value: "logistics_partnership", label: "Asociación logística" },
];

export const opportunityStatusOptions: Array<{ value: OpportunityStatusFilter; label: string }> = [
  { value: "all", label: "Todos los estados" },
  { value: "published", label: "Publicada" },
  { value: "negotiation", label: "En negociación" },
  { value: "accepted", label: "Aceptada" },
  { value: "in_agreement", label: "En acuerdo" },
  { value: "active", label: "Activa" },
  { value: "in_delivery", label: "En entrega" },
  { value: "completed", label: "Finalizada" },
  { value: "canceled", label: "Cancelada" },
];

export function useCooperatives() {
  const [isLoading, setIsLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<CooperativeOpportunity[]>([]);
  const [kpis, setKpis] = useState<CooperativeKpi[]>([]);
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState<OpportunityTypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<OpportunityStatusFilter>("all");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setIsLoading(true);
      const [opportunitiesData, kpiData] = await Promise.all([
        getCooperativeOpportunities(),
        getCooperativeKpis(),
      ]);
      if (!mounted) return;
      setOpportunities(opportunitiesData);
      setKpis(kpiData);
      setIsLoading(false);
    };
    void load();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredOpportunities = useMemo(() => {
    const term = searchText.trim().toLowerCase();
    return opportunities.filter((opportunity) => {
      const matchesText =
        term.length === 0 ||
        opportunity.title.toLowerCase().includes(term) ||
        opportunity.description.toLowerCase().includes(term) ||
        opportunity.creatorCompany.toLowerCase().includes(term) ||
        opportunity.tags.some((tag) => tag.toLowerCase().includes(term));
      const matchesType = typeFilter === "all" || opportunity.type === typeFilter;
      const matchesStatus = statusFilter === "all" || opportunity.status === statusFilter;
      return matchesText && matchesType && matchesStatus;
    });
  }, [opportunities, searchText, statusFilter, typeFilter]);

  const featuredOpportunities = useMemo(
    () => opportunities.filter((opportunity) => opportunity.status !== "canceled").slice(0, 4),
    [opportunities],
  );

  const clearFilters = () => {
    setSearchText("");
    setTypeFilter("all");
    setStatusFilter("all");
  };

  return {
    isLoading,
    opportunities,
    filteredOpportunities,
    featuredOpportunities,
    kpis,
    searchText,
    setSearchText,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    clearFilters,
    typeOptions: opportunityTypeOptions,
    statusOptions: opportunityStatusOptions,
  };
}
