import type { CooperativeAgreement, CooperativeOpportunity } from "@/types/cooperatives.types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);

export default function AgreementSummary({
  agreement,
  opportunity,
}: {
  agreement: CooperativeAgreement | null;
  opportunity: CooperativeOpportunity | null;
}) {
  if (!agreement || !opportunity) {
    return (
      <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
        <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Acuerdo no disponible</h3>
        <p className="mt-1 text-sm text-[#42493f]">Esta oportunidad todavía no tiene acuerdo generado.</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">{agreement.title}</h3>
      <p className="mt-1 text-sm text-[#42493f]">{opportunity.description}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs uppercase tracking-[0.06em] text-[#42493f]">Estado</p>
          <p className="font-semibold text-[#1a1c18]">{agreement.status}</p>
        </div>
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs uppercase tracking-[0.06em] text-[#42493f]">Participantes</p>
          <p className="font-semibold text-[#1a1c18]">{agreement.participants.length}</p>
        </div>
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs uppercase tracking-[0.06em] text-[#42493f]">Valor total</p>
          <p className="font-semibold text-[#1a1c18]">{formatCurrency(agreement.distributionPlan.totalValue)}</p>
        </div>
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs uppercase tracking-[0.06em] text-[#42493f]">Creado</p>
          <p className="font-semibold text-[#1a1c18]">{agreement.createdAt}</p>
        </div>
      </div>
    </section>
  );
}
