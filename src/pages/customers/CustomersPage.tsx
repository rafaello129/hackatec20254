import { ChevronLeft, ChevronRight, Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import CustomerFilters from "./components/CustomerFilters";
import CustomerTable from "./components/CustomerTable";
import { useCustomers } from "./hooks/useCustomers";

export default function CustomersPage() {
  const {
    isLoading,
    filteredCustomers,
    kpis,
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    segmentFilter,
    setSegmentFilter,
    clearFilters,
    statusOptions,
    segmentOptions,
  } = useCustomers();

  const activeKpi = kpis.find((kpi) => kpi.id === "active");
  const churnKpi = kpis.find((kpi) => kpi.id === "churn_risk");

  const trendBars = [
    { label: "JAN", height: 62 },
    { label: "FEB", height: 68 },
    { label: "MAR", height: 64 },
    { label: "APR", height: 77 },
    { label: "MAY", height: 74 },
    { label: "JUN", height: 86 },
    { label: "JUL", height: 82 },
  ];

  return (
    <div className="space-y-4 pb-2">



      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-['Hanken_Grotesk'] text-3xl font-bold text-[#1a1c18]">Clientes</h1>
          <p className="mt-1 text-sm text-[#42493f]">Gestiona cuentas de boutiques, distribuidores y socios estratégicos de la tienda de ropa.</p>
        </div>

      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.9fr)_320px]">
        <SectionCard title="Retention Trend">
          <div className="flex items-center justify-end gap-4 text-xs text-[#42493f]">
            <span className="inline-flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#799833]" />
              Cuentas activas
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#c2c9bc]" />
              Objetivo
            </span>
          </div>

          <div className="mt-3 grid h-[170px] grid-cols-7 items-end gap-1 rounded-lg bg-[#f9faf3] p-3">
            {trendBars.map((bar) => (
              <div key={bar.label} className="flex h-full items-end">
                <div
                  className="w-full rounded-t-md bg-[#4F7302]"
                  style={{ height: `${bar.height}%` }}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#42493f]">
            {trendBars.map((bar) => (
              <span key={bar.label}>{bar.label}</span>
            ))}
          </div>
        </SectionCard>

        <div className="space-y-3">
          <article className="rounded-lg border border-[#c2c9bc] bg-[#c5f17a] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#4c6f00]">Cuentas activas</p>
            <p className="mt-2 font-['Hanken_Grotesk'] text-2xl font-bold text-[#1a1c18]">{activeKpi?.formattedValue ?? "0"}</p>
            <p className="mt-1 text-sm text-[#3E5902]">{activeKpi?.hint ?? "Cartera en operación"}</p>
            <p className="mt-3 text-sm text-[#4F7302]">↗ +12.5% vs año anterior</p>
          </article>

          <article className="rounded-lg border border-[#c2c9bc] bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#93000a]">Riesgo de fuga</p>
            <p className="mt-2 font-['Hanken_Grotesk'] text-2xl font-bold text-[#1a1c18]">{churnKpi?.formattedValue ?? "0%"}</p>
            <p className="mt-1 text-sm text-[#42493f]">{churnKpi?.hint ?? "Cuentas requieren seguimiento"}</p>
            <div className="mt-3 inline-flex items-center gap-2 text-sm text-[#42493f]">
              <Filter className="h-4 w-4" />
              Por debajo del umbral
            </div>
          </article>
        </div>
      </div>

      <SectionCard title="Directorio de clientes">
        <div className="flex flex-col gap-3 border-b border-[#e2e3dc] bg-white px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-[#c2c9bc] bg-[#f9faf3] px-3 text-sm text-[#1a1c18] hover:bg-[#f3f4ed]"
            >
              <Filter className="h-4 w-4" />
              Filtros
            </button>
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-[#c2c9bc] bg-[#f9faf3] px-3 text-sm text-[#1a1c18] hover:bg-[#f3f4ed]"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Últimos 30 días
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#42493f]">
            <span>Mostrando 1-10 de {filteredCustomers.length.toLocaleString("es-MX")}</span>
            <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#c2c9bc] bg-white hover:bg-[#f3f4ed]">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#c2c9bc] bg-white hover:bg-[#f3f4ed]">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="border-b border-[#e2e3dc] bg-[#f9faf3] px-4 py-3">
          <CustomerFilters
            statusFilter={statusFilter}
            segmentFilter={segmentFilter}
            statusOptions={statusOptions}
            segmentOptions={segmentOptions}
            onStatusChange={setStatusFilter}
            onSegmentChange={setSegmentFilter}
            onClearFilters={clearFilters}
          />
        </div>

        <div className="px-4 py-4">
          {isLoading ? (
            <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-6 text-sm text-[#42493f]">
              Cargando información de clientes...
            </div>
          ) : (
            <CustomerTable customers={filteredCustomers} />
          )}
          <p className="mt-3 text-center text-sm font-medium text-[#4F7302]">
            Ver todos los {filteredCustomers.length.toLocaleString("es-MX")} clientes <span aria-hidden="true">→</span>
          </p>
        </div>
      </SectionCard>
    </div>
  );
}
