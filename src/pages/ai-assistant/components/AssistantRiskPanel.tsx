import { AlertTriangle } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import type { AssistantRiskAlert } from "@/types/assistant.types";

const severityStyles: Record<AssistantRiskAlert["severity"], string> = {
  info: "border-[#c2c9bc] bg-white",
  success: "border-[#D6D979] bg-[#f9faf3]",
  warning: "border-[#e3d279] bg-[#fffaf0]",
  critical: "border-[#ffb4ab] bg-[#ffdad6]",
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
    <SectionCard title="Riesgos detectados">
      <div className="space-y-3">
        {risks.map((risk) => (
          <article key={risk.id} className={`rounded-lg border p-3 ${severityStyles[risk.severity]}`}>
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 text-[#93000a]" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-[#1a1c18]">{risk.title}</p>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-[#3E5902]">
                    {moduleLabels[risk.module]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#42493f]">{risk.description}</p>
                <p className="mt-2 rounded-md bg-white p-2 text-xs font-semibold text-[#3E5902]">
                  Recomendacion: {risk.recommendation}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
