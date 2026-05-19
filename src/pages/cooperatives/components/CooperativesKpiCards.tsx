import { CircleDollarSign, Handshake, Route, Users } from "lucide-react";
import type { CooperativeKpi } from "@/types/cooperatives.types";

const iconMap: Record<CooperativeKpi["id"], typeof Handshake> = {
  active_opportunities: Handshake,
  negotiating_agreements: Users,
  estimated_value: CircleDollarSign,
  post_services: Route,
};

export default function CooperativesKpiCards({ kpis }: { kpis: CooperativeKpi[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = iconMap[kpi.id];
        return (
          <article key={kpi.id} className="rounded-lg border border-[#c2c9bc] bg-white p-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#42493f]">{kpi.label}</p>
              <Icon className="h-4 w-4 text-[#799833]" />
            </div>
            <p className="mt-2 font-['Hanken_Grotesk'] text-2xl font-bold text-[#1a1c18]">{kpi.formattedValue}</p>
            <p className="mt-1 text-xs text-[#42493f]">{kpi.hint}</p>
          </article>
        );
      })}
    </div>
  );
}
