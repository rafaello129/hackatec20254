import { ArrowRight, ShieldCheck, TrendingDown, TrendingUp } from "lucide-react";
import type { CooperativeOpportunity } from "@/types/cooperatives.types";

const extractSavings = (text: string) => {
  const match = text.match(/(\d+)%/);
  return match ? Number(match[1]) : 14;
};

export default function CooperativeHealthPanel({
  opportunity,
  variant = "detail",
}: {
  opportunity: CooperativeOpportunity;
  variant?: "detail" | "agreement";
}) {
  const progress = Math.min(100, Math.round((opportunity.currentAmount / opportunity.targetAmount) * 100));
  const score = Math.min(98, Math.max(72, Math.round(76 + progress * 0.22)));
  const savings = extractSavings(opportunity.expectedBenefit);
  const healthLabel = score >= 90 ? "Excelente crecimiento" : score >= 80 ? "Avance saludable" : "Requiere seguimiento";

  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold uppercase tracking-[0.02em] text-[#1a1c18]">
          Salud de la iniciativa
        </h2>
        <span className="rounded-md bg-[#e8e9e2] px-2.5 py-1 text-xs font-bold text-[#3E5902]">{score}% score</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-full border-[5px] border-[#4F7302] bg-[#f9faf3] font-['Hanken_Grotesk'] text-xl font-bold text-[#3E5902]">
          {score}
        </div>
        <div>
          <p className="font-semibold text-[#1a1c18]">{healthLabel}</p>
          <p className="mt-1 text-sm leading-5 text-[#42493f]">
            Alta respuesta de participantes y avance financiero consistente.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t border-[#e2e3dc] pt-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[#42493f]">
            <ShieldCheck className="h-4 w-4" /> Rating organizador
          </span>
          <strong className="text-[#1a1c18]">4.9/5</strong>
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[#42493f]">
            <TrendingUp className="h-4 w-4" /> Ahorro actual
          </span>
          <strong className="text-[#3E5902]">{savings}%</strong>
        </div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[#42493f]">
            <TrendingDown className="h-4 w-4" /> Riesgo operativo
          </span>
          <strong className="text-[#1a1c18]">{score >= 85 ? "Bajo" : "Medio"}</strong>
        </div>
      </div>

      <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#022601] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3E5902]">
        {variant === "agreement" ? "Activar acuerdo" : "Unirme a la iniciativa"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}
