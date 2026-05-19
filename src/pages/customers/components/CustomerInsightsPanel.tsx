import { AlertTriangle, ArrowUpRight, RefreshCcw, TrendingUp, UserRoundSearch } from "lucide-react";
import type { CustomerInsight } from "@/types/customer.types";

const insightIconMap: Record<CustomerInsight["type"], { icon: typeof AlertTriangle; tone: string }> = {
  risk: { icon: AlertTriangle, tone: "bg-[#ffdad6] text-[#93000a]" },
  upsell: { icon: TrendingUp, tone: "bg-[#D6D979] text-[#3E5902]" },
  follow_up: { icon: UserRoundSearch, tone: "bg-[#e8e9e2] text-[#42493f]" },
  reactivation: { icon: RefreshCcw, tone: "bg-[#fff2cc] text-[#7a5d00]" },
};

const priorityLabelMap: Record<CustomerInsight["priority"], string> = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
};

interface CustomerInsightsPanelProps {
  insights: CustomerInsight[];
}

export default function CustomerInsightsPanel({ insights }: CustomerInsightsPanelProps) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Insights CRM</h3>
        <span className="rounded-full bg-[#D6D979] px-2.5 py-1 text-xs font-semibold text-[#3E5902]">{insights.length} activos</span>
      </div>

      <ul className="space-y-2.5">
        {insights.map((insight) => {
          const mapped = insightIconMap[insight.type];
          const Icon = mapped.icon;

          return (
            <li key={insight.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md ${mapped.tone}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold text-[#1a1c18]">{insight.title}</p>
                </div>
                <span className="rounded-full bg-[#e8e9e2] px-2 py-0.5 text-xs font-semibold text-[#42493f]">
                  Prioridad {priorityLabelMap[insight.priority]}
                </span>
              </div>
              <p className="text-sm text-[#42493f]">{insight.summary}</p>
              <div className="mt-2 rounded-md border border-[#e2e3dc] bg-white p-2 text-xs text-[#1a1c18]">
                {insight.recommendation}
              </div>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#c2c9bc] bg-white px-3 py-2 text-sm font-semibold text-[#1a1c18] hover:bg-[#f3f4ed]"
      >
        Ver plan de acciones
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </section>
  );
}
