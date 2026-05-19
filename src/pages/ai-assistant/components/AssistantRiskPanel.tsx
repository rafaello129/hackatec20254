import { AlertTriangle } from "lucide-react";
import type { AssistantRiskAlert } from "@/types/assistant.types";

const severityStyles: Record<AssistantRiskAlert["severity"], string> = {
  info: "border-[#c2c9bc] bg-white",
  success: "border-[#D6D979] bg-[#f9faf3]",
  warning: "border-[#e3d279] bg-[#fffdf5]",
  critical: "border-[#f2c5bf] bg-[#fff8f6]",
};

const moduleLabels: Record<AssistantRiskAlert["module"], string> = {
  customers: "Clientes",
  inventory: "Inventario",
  cooperatives: "Cooperativos",
  finance: "Finanzas",
  general: "General",
};

export default function AssistantRiskPanel({ risks }: { risks: AssistantRiskAlert[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Riesgos detectados</h2>
        <span className="rounded-full bg-[#f3f4ed] px-2 py-1 text-xs font-semibold text-[#42493f]">
          {risks.length} señales
        </span>
      </div>
      <div className="space-y-2.5">
        {risks.slice(0, 2).map((risk) => (
          <article key={risk.id} className={`rounded-lg border p-3 ${severityStyles[risk.severity]}`}>
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#8b2e2e]" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="line-clamp-1 text-sm font-semibold text-[#1a1c18]">{risk.title}</p>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-[#3E5902]">
                    {moduleLabels[risk.module]}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#42493f]">{risk.description}</p>
                <p className="mt-2 line-clamp-2 rounded-md bg-white p-2 text-xs font-semibold leading-5 text-[#3E5902]">
                  Recomendación: {risk.recommendation}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
