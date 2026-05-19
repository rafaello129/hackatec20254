import type { CooperativeOpportunity } from "@/types/cooperatives.types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);

const extractSavings = (text: string) => {
  const match = text.match(/(\d+)%/);
  return match ? Number(match[1]) : 14;
};

export default function CooperativeProgressPanel({ opportunity }: { opportunity: CooperativeOpportunity }) {
  const progress = Math.min(100, Math.round((opportunity.currentAmount / opportunity.targetAmount) * 100));
  const remaining = Math.max(0, opportunity.targetAmount - opportunity.currentAmount);
  const savings = extractSavings(opportunity.expectedBenefit);
  const originalCost = Math.round(opportunity.targetAmount / Math.max(1, opportunity.requestedParticipants));
  const negotiatedCost = Math.round(opportunity.currentAmount / Math.max(1, opportunity.currentParticipants));
  const saved = Math.max(0, originalCost - negotiatedCost);

  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Progreso del acuerdo</h2>
          <p className="mt-1 text-sm text-[#42493f]">Monto comprometido contra la meta de la iniciativa.</p>
        </div>
        <span className="rounded-full bg-[#D6D979] px-3 py-1 text-sm font-bold text-[#3E5902]">{progress}%</span>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#e2e3dc]">
        <div className="h-full rounded-full bg-[#4F7302]" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-3 text-sm font-semibold text-[#1a1c18]">
        {formatCurrency(opportunity.currentAmount)} comprometidos, {formatCurrency(remaining)} restantes.
      </p>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[#e2e3dc] pt-4 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#73796e]">Original</p>
          <p className="font-bold text-[#ba1a1a]">{formatCurrency(originalCost)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#73796e]">Negociado</p>
          <p className="font-bold text-[#3E5902]">{formatCurrency(negotiatedCost)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#73796e]">Ahorro</p>
          <p className="font-bold text-[#3E5902]">{saved > 0 ? formatCurrency(saved) : `${savings}%`}</p>
        </div>
      </div>
    </section>
  );
}
