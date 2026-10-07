import { CircleDollarSign, Handshake, Route, Users } from "lucide-react";
import type { CooperativeKpi } from "@/types/cooperatives.types";

const iconMap: Record<CooperativeKpi["id"], typeof Handshake> = {
  active_opportunities: Handshake,
  negotiating_agreements: Users,
  estimated_value: CircleDollarSign,
  post_services: Route,
};

const order: CooperativeKpi["id"][] = ["estimated_value", "active_opportunities", "negotiating_agreements", "post_services"];

export default function CooperativesKpiCards({ kpis }: { kpis: CooperativeKpi[] }) {
  const ordered = order.map((id) => kpis.find((kpi) => kpi.id === id)).filter((kpi): kpi is CooperativeKpi => Boolean(kpi));

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {ordered.map((kpi, index) => {
        const Icon = iconMap[kpi.id];
        const featured = index === 0;
        return (
          <article
            key={kpi.id}
            className={
              featured
                ? "peek-dark-surface min-h-[142px] rounded-[24px] bg-[linear-gradient(135deg,#063A12_0%,#0D571E_58%,#9AC84B_140%)] p-5 text-white"
                : "min-h-[142px] rounded-[24px] bg-[#FFF8F6] p-5 ring-1 ring-[#F0ECE8]"
            }
          >
            <div className="flex items-start justify-between gap-3">
              <p className={featured ? "text-lg text-white" : "text-lg text-[#35523B]"}>{kpi.label}</p>
              <Icon className={featured ? "h-5 w-5 text-white" : "h-5 w-5 text-[#6E8A73]"} />
            </div>
            <p className={
              featured
                ? "mt-2 text-[32px] font-medium leading-none tracking-[-0.04em] text-white sm:text-[36px]"
                : "mt-2 text-[42px] font-medium leading-none tracking-tight text-[#35523B]"
            }>
              {kpi.formattedValue}
            </p>
            <p className={featured ? "mt-3 text-xs text-white/75" : "mt-3 text-xs text-[#758178]"}>{kpi.hint}</p>
          </article>
        );
      })}
    </section>
  );
}
