import { Search, X } from "lucide-react";
import PageIntro from "@/components/common/PageIntro";
import SectionCard from "@/components/common/SectionCard";
import type { AccountingEntryType, AccountingStatus } from "@/types/finance.types";
import AccountingTable from "./components/AccountingTable";
import FinanceAlertPanel from "./components/FinanceAlertPanel";
import FinanceSectionTabs from "./components/FinanceSectionTabs";
import RevenueExpensePanel from "./components/RevenueExpensePanel";
import { useFinance } from "./hooks/useFinance";

const accountingTypes: Array<{ value: AccountingEntryType | "all"; label: string }> = [
  { value: "all", label: "Todos los tipos" },
  { value: "income", label: "Ingreso" },
  { value: "expense", label: "Egreso" },
  { value: "adjustment", label: "Ajuste" },
  { value: "transfer", label: "Transferencia" },
  { value: "tax", label: "Impuesto" },
  { value: "cooperative_contribution", label: "Aportación cooperativa" },
];

const accountingStatuses: Array<{ value: AccountingStatus | "all"; label: string }> = [
  { value: "all", label: "Todos los estados" },
  { value: "registered", label: "Registrado" },
  { value: "pending", label: "Pendiente" },
  { value: "reconciled", label: "Conciliado" },
  { value: "canceled", label: "Cancelado" },
];

export default function FinanceAccountingPage() {
  const {
    accountingSearchText,
    accountingStatusFilter,
    accountingTypeFilter,
    alerts,
    clearAccountingFilters,
    filteredAccountingEntries,
    setAccountingSearchText,
    setAccountingStatusFilter,
    setAccountingTypeFilter,
    summary,
  } = useFinance();

  return (
    <div className="w-full max-w-full space-y-6 overflow-hidden">
      <PageIntro
        title="Contabilidad"
        description="Movimientos contables simulados para ingresos, egresos, aportaciones cooperativas y conciliación operativa."
      />
      <FinanceSectionTabs />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
        <SectionCard title="Movimientos contables">
          <div className="mb-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_180px_auto]">
            <label className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#42493f]" />
              <input
                value={accountingSearchText}
                onChange={(event) => setAccountingSearchText(event.target.value)}
                placeholder="Buscar por concepto, módulo o entidad..."
                className="w-full rounded-lg border border-[#c2c9bc] bg-white py-2 pl-9 pr-3 text-sm text-[#1a1c18] outline-none focus:border-[#4F7302]"
              />
            </label>
            <select
              value={accountingTypeFilter}
              onChange={(event) => setAccountingTypeFilter(event.target.value as AccountingEntryType | "all")}
              className="rounded-lg border border-[#c2c9bc] bg-white px-3 py-2 text-sm text-[#1a1c18] outline-none focus:border-[#4F7302]"
            >
              {accountingTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
            <select
              value={accountingStatusFilter}
              onChange={(event) => setAccountingStatusFilter(event.target.value as AccountingStatus | "all")}
              className="rounded-lg border border-[#c2c9bc] bg-white px-3 py-2 text-sm text-[#1a1c18] outline-none focus:border-[#4F7302]"
            >
              {accountingStatuses.map((status) => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={clearAccountingFilters}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#c2c9bc] px-3 py-2 text-sm font-semibold text-[#42493f] hover:bg-[#f3f4ed]"
            >
              <X className="h-4 w-4" />
              Limpiar
            </button>
          </div>
          <AccountingTable entries={filteredAccountingEntries} />
        </SectionCard>

        <div className="min-w-0 space-y-4">
          <RevenueExpensePanel summary={summary} compact />
          <FinanceAlertPanel alerts={alerts} limit={2} />
        </div>
      </div>
    </div>
  );
}
