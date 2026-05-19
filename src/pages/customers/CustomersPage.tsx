import { Plus } from "lucide-react";
import PageIntro from "@/components/common/PageIntro";
import SectionCard from "@/components/common/SectionCard";
import CustomerDetailPanel from "./components/CustomerDetailPanel";
import CustomerFilters from "./components/CustomerFilters";
import CustomerInsightsPanel from "./components/CustomerInsightsPanel";
import CustomerKpiCards from "./components/CustomerKpiCards";
import CustomerTable from "./components/CustomerTable";
import { useCustomers } from "./hooks/useCustomers";

export default function CustomersPage() {
  const {
    isLoading,
    filteredCustomers,
    kpis,
    insights,
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    segmentFilter,
    setSegmentFilter,
    clearFilters,
    selectedCustomer,
    selectedCustomerInteractions,
    selectedCustomerId,
    setSelectedCustomerId,
    statusOptions,
    segmentOptions,
  } = useCustomers();

  return (
    <div className="space-y-6">
      <PageIntro
        title="Clientes"
        description="Gestiona relaciones empresariales, salud de cuenta y seguimiento comercial."
        actions={
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white opacity-80"
          >
            <Plus className="h-4 w-4" />
            Agregar cliente
          </button>
        }
      />

      <CustomerKpiCards kpis={kpis} />

      <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <SectionCard title="Directorio de clientes">
          <div className="space-y-3">
            <CustomerFilters
              searchText={searchText}
              statusFilter={statusFilter}
              segmentFilter={segmentFilter}
              statusOptions={statusOptions}
              segmentOptions={segmentOptions}
              onSearchChange={setSearchText}
              onStatusChange={setStatusFilter}
              onSegmentChange={setSegmentFilter}
              onClearFilters={clearFilters}
            />

            {isLoading ? (
              <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-6 text-sm text-[#42493f]">
                Cargando informacion CRM...
              </div>
            ) : (
              <CustomerTable
                customers={filteredCustomers}
                selectedCustomerId={selectedCustomerId}
                onSelectCustomer={setSelectedCustomerId}
              />
            )}
          </div>

          <p className="mt-3 text-sm text-[#42493f]">
            Mostrando {filteredCustomers.length} cuentas en el flujo actual de seguimiento comercial.
          </p>
        </SectionCard>

        <div className="space-y-4">
          <CustomerInsightsPanel insights={insights} />
          <CustomerDetailPanel customer={selectedCustomer} interactions={selectedCustomerInteractions} />
        </div>
      </div>
    </div>
  );
}
