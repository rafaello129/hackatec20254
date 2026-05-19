import { BarChart3, FileClock, Handshake, PackageSearch, Users } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
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
    <SectionCard title="Contexto del negocio">
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">{label}</p>
              <Icon className="h-4 w-4 text-[#4F7302]" />
            </div>
            <p className="mt-2 font-['Hanken_Grotesk'] text-2xl font-bold text-[#1a1c18]">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-[#D6D979] bg-[#f9faf3] p-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-[#4F7302]" />
          <p className="text-sm font-semibold text-[#1a1c18]">Pulso financiero mensual</p>
        </div>
        <p className="mt-2 text-sm text-[#42493f]">
          Ingresos {money.format(context.monthlyRevenue)} · Egresos {money.format(context.monthlyExpenses)} · Riesgo {context.riskLevel}
        </p>
      </div>
    </SectionCard>
  );
}
