import { Plus } from "lucide-react";
import PageIntro from "@/components/common/PageIntro";
import { Link } from "react-router-dom";
import CooperativesSectionTabs from "./components/CooperativesSectionTabs";
import OpportunityFilters from "./components/OpportunityFilters";
import OpportunityList from "./components/OpportunityList";
import { useCooperatives } from "./hooks/useCooperatives";

export default function OpportunitiesPage() {
  const {
    isLoading,
    filteredOpportunities,
    searchText,
    setSearchText,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    clearFilters,
    typeOptions,
    statusOptions,
  } = useCooperatives();

  return (
    <div className="space-y-6">
      <PageIntro
        title="Oportunidades cooperativas"
        description="Mercado de compras textiles, ventas compartidas, campañas de moda, distribución y logística entre tiendas de ropa."
        actions={
            <Link
              to="/cooperatives/create"
              className="inline-flex items-center gap-2 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4" />
              Crear oportunidad
            </Link>
        }
      />

      <CooperativesSectionTabs />
      <OpportunityFilters
        searchText={searchText}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        typeOptions={typeOptions}
        statusOptions={statusOptions}
        onSearchChange={setSearchText}
        onTypeChange={setTypeFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={clearFilters}
      />

      {isLoading ? (
        <div className="rounded-lg border border-[#c2c9bc] bg-white p-8 text-sm text-[#42493f]">Cargando mercado...</div>
      ) : (
        <OpportunityList opportunities={filteredOpportunities} />
      )}
    </div>
  );
}
