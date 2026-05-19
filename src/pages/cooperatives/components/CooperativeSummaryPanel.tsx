import type { CooperativeOpportunity } from "@/types/cooperatives.types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);

export default function CooperativeSummaryPanel({ opportunity }: { opportunity: CooperativeOpportunity }) {
  const progress = Math.round((opportunity.currentAmount / opportunity.targetAmount) * 100);
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <h3 className="mb-3 font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Resumen operativo</h3>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Monto objetivo</p>
          <p className="font-semibold text-[#1a1c18]">{formatCurrency(opportunity.targetAmount)}</p>
        </div>
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Monto actual</p>
          <p className="font-semibold text-[#1a1c18]">{formatCurrency(opportunity.currentAmount)} ({progress}%)</p>
        </div>
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Participantes</p>
          <p className="font-semibold text-[#1a1c18]">{opportunity.currentParticipants}/{opportunity.requestedParticipants}</p>
        </div>
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Ubicación</p>
          <p className="font-semibold text-[#1a1c18]">{opportunity.location}</p>
        </div>
      </div>
      <div className="mt-3 rounded-lg border border-[#e2e3dc] bg-white p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Requisitos</p>
        <ul className="mt-2 space-y-1 text-sm text-[#42493f]">
          {opportunity.requirements.map((requirement) => <li key={requirement}>- {requirement}</li>)}
        </ul>
      </div>
      <p className="mt-3 rounded-lg bg-[#D6D979]/60 p-3 text-sm font-semibold text-[#3E5902]">{opportunity.expectedBenefit}</p>
    </section>
  );
}
