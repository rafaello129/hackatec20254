import { ArrowLeft, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import SectionCard from "@/components/common/SectionCard";
import type { InvoiceStatus } from "@/types/finance.types";
import InvoiceDetailPanel from "./components/InvoiceDetailPanel";
import InvoicesTable from "./components/InvoicesTable";
import { useFinance } from "./hooks/useFinance";

const invoiceStatuses: Array<{ value: InvoiceStatus | "all"; label: string }> = [
  { value: "all", label: "Todas" },
  { value: "paid", label: "Pagadas" },
  { value: "pending", label: "Pendientes" },
  { value: "overdue", label: "Vencidas" },
  { value: "issued", label: "Emitidas" },
  { value: "draft", label: "Borradores" },
  { value: "canceled", label: "Canceladas" },
];

export default function FinanceInvoicingPage() {
  const {
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
    <div className="space-y-5 pb-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/finance/summary"
            className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#667169] transition hover:text-[var(--oe-primary)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver a Mi dinero
          </Link>
          <h1 className="mt-3 font-['Hanken_Grotesk'] text-[30px] font-bold leading-none text-[var(--oe-text)]">
            Facturas
          </h1>
          <p className="mt-2 text-[12px] text-[var(--oe-text-muted)]">
            Revisa pagos y documentos relacionados con tus clientes.
          </p>
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
        <SectionCard title="Facturas">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row">
            <label className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6F7A72]" />
              <input
                value={invoiceSearchText}
                onChange={(event) => setInvoiceSearchText(event.target.value)}
                placeholder="Buscar por folio o cliente..."
                className="h-10 w-full rounded-full border border-[#DDE3DA] bg-white pl-9 pr-3 text-[11px] text-[#263129] outline-none focus:border-[#8AAA5E]"
              />
            </label>

            <select
              value={invoiceStatusFilter}
              onChange={(event) =>
                setInvoiceStatusFilter(event.target.value as InvoiceStatus | "all")
              }
              className="h-10 rounded-[13px] border border-[#DDE3DA] bg-white px-3 text-[11px] text-[#344039] outline-none focus:border-[#8AAA5E]"
            >
              {invoiceStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={clearInvoiceFilters}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-[13px] border border-[#DDE3DA] px-3 text-[10px] font-semibold text-[#657068] transition hover:bg-[#F6F8F4]"
            >
              <X className="h-3.5 w-3.5" />
              Limpiar
            </button>
          </div>

          <InvoicesTable
            invoices={filteredInvoices}
            selectedInvoiceId={selectedInvoiceId}
            onSelectInvoice={setSelectedInvoiceId}
          />
        </SectionCard>

        <InvoiceDetailPanel invoice={selectedInvoice} />
      </div>
    </div>
  );
}
