import { Eye } from "lucide-react";
import type { Invoice } from "@/types/finance.types";
import InvoiceStatusBadge from "./InvoiceStatusBadge";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

const paymentLabels: Record<Invoice["paymentMethod"], string> = {
  bank_transfer: "Transferencia",
  spei: "SPEI",
  credit_card: "Tarjeta",
  cash: "Efectivo",
  pending: "Pendiente",
};

interface InvoicesTableProps {
  invoices: Invoice[];
  selectedInvoiceId?: string;
  onSelectInvoice: (invoiceId: string) => void;
}

export default function InvoicesTable({ invoices, selectedInvoiceId, onSelectInvoice }: InvoicesTableProps) {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full min-w-[780px] table-fixed text-left text-sm">
        <thead className="border-b border-[#e2e3dc] bg-[#f3f4ed] text-xs uppercase tracking-[0.08em] text-[#42493f]">
          <tr>
            <th className="w-[128px] px-3 py-3">Folio</th>
            <th className="w-[210px] px-3 py-3">Cliente</th>
            <th className="w-[145px] px-3 py-3">Fechas</th>
            <th className="w-[120px] px-3 py-3 text-right">Total</th>
            <th className="w-[110px] px-3 py-3">Estado</th>
            <th className="w-[120px] px-3 py-3">Pago</th>
            <th className="w-[80px] px-3 py-3 text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className={`border-b border-[#f0f1ea] align-middle hover:bg-[#f9faf3] ${invoice.id === selectedInvoiceId ? "bg-[#f9faf3]" : ""}`}>
              <td className="px-3 py-3 font-semibold text-[#1a1c18]">{invoice.folio}</td>
              <td className="px-3 py-3">
                <p className="truncate font-semibold text-[#1a1c18]">{invoice.customerName}</p>
                <p className="truncate text-xs text-[#42493f]">{invoice.relatedOpportunityId ?? "Cliente CRM"}</p>
              </td>
              <td className="px-3 py-3 text-xs text-[#42493f]">
                <p>Emisión {invoice.issueDate}</p>
                <p>Vence {invoice.dueDate}</p>
              </td>
              <td className="px-3 py-3 text-right font-semibold text-[#1a1c18]">{money.format(invoice.total)}</td>
              <td className="px-3 py-3"><InvoiceStatusBadge status={invoice.status} /></td>
              <td className="px-3 py-3 text-[#42493f]">{paymentLabels[invoice.paymentMethod]}</td>
              <td className="px-3 py-3 text-center">
                <button
                  type="button"
                  onClick={() => onSelectInvoice(invoice.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#c2c9bc] text-[#3E5902] hover:bg-[#f3f4ed]"
                  aria-label={`Ver ${invoice.folio}`}
                >
                  <Eye className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {invoices.length === 0 ? (
        <div className="rounded-b-lg border-t border-[#e2e3dc] bg-[#f9faf3] p-6 text-center text-sm text-[#42493f]">
          No hay facturas con los filtros seleccionados.
        </div>
      ) : null}
    </div>
  );
}
