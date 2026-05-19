import SectionCard from "@/components/common/SectionCard";
import type { FinanceSummary } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

export default function RevenueExpensePanel({ summary, compact = false }: { summary: FinanceSummary; compact?: boolean }) {
  const expenseRatio = Math.min(100, Math.round((summary.totalExpenses / summary.totalRevenue) * 100));
  const profitRatio = Math.min(100, Math.round((summary.netProfit / summary.totalRevenue) * 100));

  return (
    <SectionCard title="Ingresos vs egresos">
      <div className={compact ? "space-y-3" : "space-y-4"}>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">Margen neto</p>
            <p className="mt-1 font-['Hanken_Grotesk'] text-2xl font-bold leading-none text-[#1a1c18]">{profitRatio}%</p>
            <p className="mt-1 line-clamp-1 text-xs text-[#42493f]">{money.format(summary.netProfit)} utilidad</p>
          </div>
          <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">Peso egresos</p>
            <p className="mt-1 font-['Hanken_Grotesk'] text-2xl font-bold leading-none text-[#1a1c18]">{expenseRatio}%</p>
            <p className="mt-1 line-clamp-1 text-xs text-[#42493f]">Sobre ingreso del periodo</p>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <div className="mb-1 flex justify-between gap-3 font-semibold text-[#1a1c18]">
              <span>Ingresos</span>
              <span>{money.format(summary.totalRevenue)}</span>
            </div>
            <div className="h-2 rounded-full bg-[#e8e9e2]">
              <div className="h-2 rounded-full bg-[#4F7302]" style={{ width: "100%" }} />
            </div>
          </div>
          <div>
            <div className="mb-1 flex justify-between gap-3 font-semibold text-[#1a1c18]">
              <span>Egresos</span>
              <span>{money.format(summary.totalExpenses)}</span>
            </div>
            <div className="h-2 rounded-full bg-[#e8e9e2]">
              <div className="h-2 rounded-full bg-[#c5b73f]" style={{ width: `${expenseRatio}%` }} />
            </div>
          </div>
        </div>
        {!compact ? (
          <p className="rounded-lg bg-[#D6D979]/45 px-3 py-2 text-xs font-semibold text-[#3E5902]">
            Lectura rápida: el margen se mantiene sano, pero cobranza y delivery deben vigilarse por acuerdo.
          </p>
        ) : null}
      </div>
    </SectionCard>
  );
}
