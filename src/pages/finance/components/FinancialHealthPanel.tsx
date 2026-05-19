import { CheckCircle2 } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import type { FinanceSummary } from "@/types/finance.types";

export default function FinancialHealthPanel({ summary }: { summary: FinanceSummary }) {
  const overdueRisk = summary.overdueInvoices > 1;
  const cashRatio = summary.availableCashflow / Math.max(summary.totalExpenses, 1);
  const status = overdueRisk ? "Atención" : cashRatio > 0.28 ? "Saludable" : "Riesgo";
  const statusTone =
    status === "Saludable"
      ? "border-[#D6D979] bg-[#f9faf3] text-[#3E5902]"
      : status === "Atención"
        ? "border-[#e3d279] bg-[#fffaf0] text-[#7a5d00]"
        : "border-[#f2b8b5] bg-[#fff5f3] text-[#93000a]";

  return (
    <SectionCard title="Salud financiera">
      <div className="space-y-3">
        <div className={`rounded-lg border p-3 ${statusTone}`}>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            <p className="font-['Hanken_Grotesk'] text-xl font-bold text-[#1a1c18]">{status}</p>
          </div>
          <p className="mt-2 text-sm leading-5 text-[#42493f]">
            Flujo suficiente para operación inmediata; la cobranza vencida requiere seguimiento ejecutivo.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-[#42493f]">
          <p className="font-semibold text-[#1a1c18]">Recomendaciones clave</p>
          <p className="rounded-md bg-[#f9faf3] px-3 py-2">Priorizar cobranza antes de abrir nuevos servicios post-acuerdo.</p>
          <p className="rounded-md bg-[#f9faf3] px-3 py-2">Separar delivery por acuerdo para preservar margen cooperativo.</p>
        </div>
      </div>
    </SectionCard>
  );
}
