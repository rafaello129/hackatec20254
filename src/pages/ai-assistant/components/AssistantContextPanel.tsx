import { BarChart3, FileClock, Handshake, PackageSearch, Users } from "lucide-react";
import type { AssistantBusinessContext } from "@/types/assistant.types";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

export default function AssistantContextPanel({ context }: { context: AssistantBusinessContext }) {
  const items = [
    { label: "Clientes activos", value: context.activeCustomers, icon: Users },
    { label: "Bajo stock", value: context.lowStockItems, icon: PackageSearch },
    { label: "Cooperativos activos", value: context.activeCooperatives, icon: Handshake },
    { label: "Facturas pendientes", value: context.pendingInvoices, icon: FileClock },
  ];

  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Contexto del negocio</h2>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-2">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-2.5">
            <div className="flex items-center justify-between gap-2">
              <p className="line-clamp-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#42493f]">{label}</p>
              <Icon className="h-4 w-4 text-[#4F7302]" />
            </div>
            <p className="mt-1 font-['Hanken_Grotesk'] text-xl font-bold text-[#1a1c18]">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-[#D6D979] bg-[#fbfcf2] p-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-[#4F7302]" />
          <p className="text-sm font-semibold text-[#1a1c18]">Pulso financiero mensual</p>
        </div>
        <p className="mt-2 text-xs leading-5 text-[#42493f]">
          Ingresos {money.format(context.monthlyRevenue)} · Egresos {money.format(context.monthlyExpenses)} · Riesgo {context.riskLevel}
        </p>
      </div>
    </section>
  );
}
