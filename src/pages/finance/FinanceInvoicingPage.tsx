import { Plus, Search, X } from "lucide-react";
import PageIntro from "@/components/common/PageIntro";
import SectionCard from "@/components/common/SectionCard";
import type { InvoiceStatus } from "@/types/finance.types";
import FinanceAlertPanel from "./components/FinanceAlertPanel";
import FinanceSectionTabs from "./components/FinanceSectionTabs";
import InvoiceDetailPanel from "./components/InvoiceDetailPanel";
import InvoicesTable from "./components/InvoicesTable";
import { useFinance } from "./hooks/useFinance";

const invoiceStatuses: Array<{ value: InvoiceStatus | "all"; label: string }> = [
  { value: "all", label: "Todos los estados" },
  { value: "draft", label: "Borrador" },
  { value: "issued", label: "Emitida" },
  { value: "paid", label: "Pagada" },
  { value: "pending", label: "Pendiente" },
  { value: "overdue", label: "Vencida" },
  { value: "canceled", label: "Cancelada" },
];

export default function FinanceInvoicingPage() {
  const {
    alerts,
    clearInvoiceFilters,
    filteredInvoices,
    invoiceSearchText,
    invoiceStatusFilter,
    selectedInvoice,
    selectedInvoiceId,
    setInvoiceSearchText,
    setInvoiceStatusFilter,
    setSelectedInvoiceId,
  } = useFinance();

  return (
    <div className="w-full max-w-full space-y-6 overflow-hidden">
      <PageIntro
        title="Facturación"
        description="Control de facturas, cobranza y documentos ligados a clientes y acuerdos cooperativos."
        actions={
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white opacity-70"
          >
            <Plus className="h-4 w-4" />
            Nueva factura
          </button>
        }
      />
      <FinanceSectionTabs />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
        <SectionCard title="Facturas">
          <div className="mb-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_auto]">
            <label className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#42493f]" />
              <input
                value={invoiceSearchText}
                onChange={(event) => setInvoiceSearchText(event.target.value)}
                placeholder="Buscar por folio, cliente u oportunidad..."
                className="w-full rounded-lg border border-[#c2c9bc] bg-white py-2 pl-9 pr-3 text-sm text-[#1a1c18] outline-none focus:border-[#4F7302]"
              />
            </label>
            <select
              value={invoiceStatusFilter}
              onChange={(event) => setInvoiceStatusFilter(event.target.value as InvoiceStatus | "all")}
              className="rounded-lg border border-[#c2c9bc] bg-white px-3 py-2 text-sm text-[#1a1c18] outline-none focus:border-[#4F7302]"
            >
              {invoiceStatuses.map((status) => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={clearInvoiceFilters}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#c2c9bc] px-3 py-2 text-sm font-semibold text-[#42493f] hover:bg-[#f3f4ed]"
            >
              <X className="h-4 w-4" />
              Limpiar
            </button>
          </div>
          <InvoicesTable invoices={filteredInvoices} selectedInvoiceId={selectedInvoiceId} onSelectInvoice={setSelectedInvoiceId} />
        </SectionCard>

        <div className="min-w-0 space-y-4">
          <InvoiceDetailPanel invoice={selectedInvoice} />
          <FinanceAlertPanel alerts={alerts.filter((alert) => alert.relatedEntity.includes("FAC"))} limit={2} />
        </div>
      </div>
    </div>
  );
}
