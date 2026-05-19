import { AlertTriangle, ArrowUpRight, CheckCircle2, Info } from "lucide-react";
import type { AssistantInsight } from "@/types/assistant.types";

const severityStyles: Record<AssistantInsight["severity"], string> = {
  info: "border-[#e2e3dc] bg-white",
  success: "border-[#D6D979] bg-[#fbfcf2]",
  warning: "border-[#e3d279] bg-[#fffdf5]",
  critical: "border-[#f2c5bf] bg-[#fff8f6]",
};

const moduleLabels: Record<AssistantInsight["module"], string> = {
  customers: "Clientes",
  inventory: "Inventario",
  cooperatives: "Cooperativos",
  finance: "Finanzas",
  general: "General",
};

function SeverityIcon({ severity }: { severity: AssistantInsight["severity"] }) {
  if (severity === "success") return <CheckCircle2 className="h-4 w-4 text-[#4F7302]" />;
  if (severity === "warning" || severity === "critical") return <AlertTriangle className="h-4 w-4 text-[#93000a]" />;
  return <Info className="h-4 w-4 text-[#4F7302]" />;
}

export default function AssistantInsightCards({ insights }: { insights: AssistantInsight[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Resumen inteligente</h2>
          <p className="text-sm text-[#42493f]">Señales priorizadas para la demo ejecutiva.</p>
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#4F7302]">4 módulos conectados</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {insights.slice(0, 4).map((insight) => (
          <article key={insight.id} className={`min-w-0 rounded-lg border p-3 ${severityStyles[insight.severity]}`}>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white text-[#4F7302]">
                <SeverityIcon severity={insight.severity} />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-[#3E5902]">
                    {moduleLabels[insight.module]}
                  </span>
                  <span className="text-[11px] font-semibold uppercase text-[#73796e]">{insight.severity}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-[#1a1c18]">{insight.title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#42493f]">{insight.description}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#3E5902]">
                  {insight.actionLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
