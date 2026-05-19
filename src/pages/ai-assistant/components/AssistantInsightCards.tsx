import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { AssistantInsight } from "@/types/assistant.types";

const severityStyles: Record<AssistantInsight["severity"], string> = {
  info: "border-[#c2c9bc] bg-white",
  success: "border-[#D6D979] bg-[#f9faf3]",
  warning: "border-[#e3d279] bg-[#fffaf0]",
  critical: "border-[#ffb4ab] bg-[#ffdad6]",
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
    <div className="grid gap-3 md:grid-cols-2">
      {insights.map((insight) => (
        <article key={insight.id} className={`rounded-lg border p-3 ${severityStyles[insight.severity]}`}>
          <div className="flex items-start gap-2">
            <SeverityIcon severity={insight.severity} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-[#1a1c18]">{insight.title}</p>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-[#3E5902]">
                  {moduleLabels[insight.module]}
                </span>
              </div>
              <p className="mt-1 text-sm text-[#42493f]">{insight.description}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#3E5902]">{insight.actionLabel}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
