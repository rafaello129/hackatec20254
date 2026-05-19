import type { DistributionPlan } from "@/types/cooperatives.types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);

export default function DistributionPlanPanel({ plan }: { plan?: DistributionPlan }) {
  if (!plan) return null;
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Plan de repartición</h3>
      <p className="mt-1 text-sm text-[#42493f]">{plan.description}</p>
      <div className="mt-3 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
        <p className="text-xs uppercase tracking-[0.06em] text-[#42493f]">Total calculado</p>
        <p className="font-semibold text-[#1a1c18]">{formatCurrency(plan.totalValue)} · {plan.calculatedAt}</p>
      </div>
      <div className="mt-3 space-y-2">
        {plan.items.map((item) => (
          <div key={item.participantId} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-semibold text-[#1a1c18]">{item.label}</span>
              <span className="font-semibold text-[#3E5902]">{item.percentage}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#e2e3dc]">
              <div className="h-full rounded-full bg-[#799833]" style={{ width: `${item.percentage}%` }} />
            </div>
            <p className="mt-1 text-xs text-[#42493f]">{formatCurrency(item.allocatedValue)} · {item.allocatedQuantity} unidades/lotes</p>
          </div>
        ))}
      </div>
    </section>
  );
}
