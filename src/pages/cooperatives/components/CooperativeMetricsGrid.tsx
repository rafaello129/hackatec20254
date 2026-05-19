import type { CooperativeAgreement, CooperativeOpportunity } from "@/types/cooperatives.types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);

const extractSavings = (text: string) => {
  const match = text.match(/(\d+)%/);
  return match ? Number(match[1]) : 14;
};

export default function CooperativeMetricsGrid({
  opportunity,
  agreement,
}: {
  opportunity: CooperativeOpportunity;
  agreement?: CooperativeAgreement | null;
}) {
  const participantCount = Math.max(opportunity.currentParticipants, 1);
  const savings = extractSavings(opportunity.expectedBenefit);
  const current = agreement?.distributionPlan.totalValue ?? opportunity.currentAmount;
  const estimatedCost = Math.round(current / participantCount);
  const metrics = [
    { label: "Meta", value: formatCurrency(opportunity.targetAmount), tone: "default" },
    { label: "Actual", value: formatCurrency(current), tone: "success" },
    { label: "Costo por miembro", value: formatCurrency(estimatedCost), tone: "default" },
    { label: "Ahorro proyectado", value: `${savings}%`, tone: "highlight" },
  ];

  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`rounded-lg border p-4 ${
              metric.tone === "highlight"
                ? "border-[#4F7302] bg-[#4F7302] text-white"
                : "border-[#e2e3dc] bg-[#f9faf3] text-[#1a1c18]"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-[0.08em] ${
                metric.tone === "highlight" ? "text-white/80" : "text-[#42493f]"
              }`}
            >
              {metric.label}
            </p>
            <p className={`mt-2 font-['Hanken_Grotesk'] text-2xl font-bold ${metric.tone === "success" ? "text-[#3E5902]" : ""}`}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
