import { Send } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import type { Invoice } from "@/types/finance.types";
import InvoiceStatusBadge from "./InvoiceStatusBadge";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

export default function InvoiceDetailPanel({ invoice }: { invoice?: Invoice }) {
  if (!invoice) {
    return (
      <SectionCard title="Detalle de factura">
        <p className="text-sm text-[#42493f]">Selecciona una factura para revisar conceptos y estado.</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Detalle de factura">
      <div className="space-y-4">
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-['Hanken_Grotesk'] text-2xl font-bold leading-none text-[#1a1c18]">{invoice.folio}</p>
              <p className="mt-1 truncate text-sm text-[#42493f]">{invoice.customerName}</p>
            </div>
            <InvoiceStatusBadge status={invoice.status} />
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#73796e]">
            Emisión {invoice.issueDate} · Vence {invoice.dueDate}
          </p>
        </div>

        <div className="space-y-2">
          {invoice.items.map((item) => (
            <div key={item.id} className="rounded-lg border border-[#e2e3dc] bg-white p-3 text-sm">
              <div className="flex justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#1a1c18]">{item.description}</p>
                  <p className="text-xs text-[#42493f]">{item.quantity} x {money.format(item.unitPrice)}</p>
                </div>
                <p className="shrink-0 font-semibold text-[#1a1c18]">{money.format(item.quantity * item.unitPrice)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{money.format(invoice.subtotal)}</span></div>
          <div className="flex justify-between"><span>Impuestos</span><span>{money.format(invoice.taxes)}</span></div>
          <div className="flex justify-between border-t border-[#e2e3dc] pt-2 font-bold text-[#1a1c18]">
            <span>Total</span><span className="font-['Hanken_Grotesk'] text-xl">{money.format(invoice.total)}</span>
          </div>
        </div>

        <p className="rounded-lg border border-[#D6D979] bg-[#f9faf3] p-3 text-sm text-[#42493f]">{invoice.notes}</p>
        <button
          type="button"
          disabled
          className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-[#022601] px-4 py-2.5 text-sm font-semibold text-white opacity-80"
        >
          Enviar recordatorio
          <Send className="h-4 w-4" />
        </button>
      </div>
    </SectionCard>
  );
}
