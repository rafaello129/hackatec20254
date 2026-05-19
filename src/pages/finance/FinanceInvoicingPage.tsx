import { Plus } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

const invoices = [
  { id: "INV-2026-0948", client: "GreenLeaf Solutions", amount: "$18,200", due: "2026-05-25", status: "pagada" },
  { id: "INV-2026-0952", client: "TerraCorp Global", amount: "$9,400", due: "2026-05-28", status: "pendiente" },
  { id: "INV-2026-0961", client: "Apex Dynamics", amount: "$6,100", due: "2026-05-12", status: "vencida" },
];

const toneMap: Record<string, "success" | "warning" | "danger"> = {
  pagada: "success",
  pendiente: "warning",
  vencida: "danger",
};

export default function FinanceInvoicingPage() {
  return (
    <SectionCard
      title="Facturación"
      actions={
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3E5902]">
          <Plus className="h-4 w-4" />
          Nueva factura
        </button>
      }
    >
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#e2e3dc] text-xs uppercase tracking-[0.06em] text-[#42493f]">
            <tr>
              <th className="px-2 py-3">Folio</th>
              <th className="px-2 py-3">Cliente</th>
              <th className="px-2 py-3">Monto</th>
              <th className="px-2 py-3">Vencimiento</th>
              <th className="px-2 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-[#f0f1ea]">
                <td className="px-2 py-3 font-semibold text-[#1a1c18]">{invoice.id}</td>
                <td className="px-2 py-3 text-[#42493f]">{invoice.client}</td>
                <td className="px-2 py-3 text-[#1a1c18]">{invoice.amount}</td>
                <td className="px-2 py-3 text-[#42493f]">{invoice.due}</td>
                <td className="px-2 py-3">
                  <StatusBadge label={invoice.status} tone={toneMap[invoice.status]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
