import type { CooperativeOpportunityType } from "@/types/cooperatives.types";

export const opportunityTypeLabels: Record<CooperativeOpportunityType, string> = {
  joint_purchase: "Compra conjunta",
  joint_sale: "Venta conjunta",
  shared_campaign: "Campaña compartida",
  shared_distribution: "Distribución compartida",
  logistics_partnership: "Asociación logística",
};

export default function OpportunityTypeBadge({ type }: { type: CooperativeOpportunityType }) {
  return (
    <span className="inline-flex rounded-full bg-[#D6D979] px-2.5 py-1 text-xs font-semibold text-[#3E5902]">
      {opportunityTypeLabels[type]}
    </span>
  );
}
