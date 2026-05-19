import { AlertTriangle, CircleDollarSign, TrendingUp, Users } from "lucide-react";
import type { CustomerKpi } from "@/types/customer.types";

const iconMap: Record<CustomerKpi["id"], typeof Users> = {
  active: Users,
  annual_value: CircleDollarSign,
  churn_risk: AlertTriangle,
  opportunities: TrendingUp,
};

interface CustomerKpiCardsProps {
  kpis: CustomerKpi[];
}

export default function CustomerKpiCards({ kpis }: CustomerKpiCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = iconMap[kpi.id];
        return (
          <article key={kpi.id} className="rounded-lg border border-[#c2c9bc] bg-white p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">{kpi.label}</p>
              <Icon className="h-4 w-4 text-[#799833]" />
            </div>
            <p className="mt-2 font-['Hanken_Grotesk'] text-3xl font-bold text-[#1a1c18]">{kpi.formattedValue}</p>
            <p className="mt-1 text-sm text-[#42493f]">{kpi.hint}</p>
          </article>
        );
      })}
    </div>
  );
}
