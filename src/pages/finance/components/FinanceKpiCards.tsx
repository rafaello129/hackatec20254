import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { FinanceKpi } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });
const number = new Intl.NumberFormat("es-MX");

function formatValue(kpi: FinanceKpi) {
  if (kpi.format === "currency") return money.format(kpi.value);
  if (kpi.format === "percent") return `${kpi.value}%`;
  return number.format(kpi.value);
}

function TrendIcon({ trend }: { trend: FinanceKpi["trend"] }) {
  if (trend === "up") return <ArrowUpRight className="h-4 w-4 text-[#4F7302]" />;
  if (trend === "down") return <ArrowDownRight className="h-4 w-4 text-[#93000a]" />;
  return <Minus className="h-4 w-4 text-[#799833]" />;
}

export default function FinanceKpiCards({ kpis }: { kpis: FinanceKpi[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.slice(0, 4).map((kpi) => (
        <article key={kpi.id} className="min-h-[116px] rounded-lg border border-[#c2c9bc] bg-white p-4">
          <div className="flex items-start justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">{kpi.label}</span>
            <span className="grid h-7 w-7 place-items-center rounded-md bg-[#f3f4ed]">
              <TrendIcon trend={kpi.trend} />
            </span>
          </div>
          <p className="mt-3 font-['Hanken_Grotesk'] text-3xl font-bold leading-none text-[#1a1c18]">{formatValue(kpi)}</p>
          {kpi.hint ? <p className="mt-2 line-clamp-1 text-sm text-[#42493f]">{kpi.hint}</p> : null}
        </article>
      ))}
    </div>
  );
}
