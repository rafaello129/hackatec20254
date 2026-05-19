import SectionCard from "@/components/common/SectionCard";
import type { CashflowPoint } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

export default function CashflowChart({ points }: { points: CashflowPoint[] }) {
  const maxValue = Math.max(...points.flatMap((point) => [point.revenue, point.expenses, point.netFlow]));

  return (
    <SectionCard
      title="Flujo de efectivo"
      actions={
        <div className="hidden flex-wrap gap-3 text-xs font-semibold text-[#42493f] sm:flex">
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#4F7302]" />Ingresos</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#c5b73f]" />Egresos</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#022601]" />Neto</span>
        </div>
      }
    >
      <div className="grid h-72 grid-cols-6 items-end gap-3">
        {points.map((point) => (
          <div key={point.period} className="flex h-full min-w-0 flex-col justify-end gap-2">
            <div className="relative flex h-56 items-end justify-center gap-1.5 overflow-hidden rounded-lg border border-[#e8e9e2] bg-[#f9faf3] px-2 pb-3 pt-5">
              <div className="absolute inset-x-2 top-4 h-px bg-[#e2e3dc]" />
              <div className="absolute inset-x-2 top-1/2 h-px bg-[#e2e3dc]/70" />
              <span className="w-3 rounded-t bg-[#4F7302]" style={{ height: `${(point.revenue / maxValue) * 88}%` }} title={money.format(point.revenue)} />
              <span className="w-3 rounded-t bg-[#c5b73f]" style={{ height: `${(point.expenses / maxValue) * 88}%` }} title={money.format(point.expenses)} />
              <span className="w-3 rounded-t bg-[#022601]" style={{ height: `${(point.netFlow / maxValue) * 88}%` }} title={money.format(point.netFlow)} />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-[#1a1c18]">{point.period}</p>
              <p className="hidden text-[11px] text-[#73796e] lg:block">{money.format(point.netFlow)}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
