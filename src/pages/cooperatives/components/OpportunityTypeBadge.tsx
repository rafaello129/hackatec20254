import type { CooperativeOpportunityType } from "@/types/cooperatives.types";

export const opportunityTypeLabels: Record<CooperativeOpportunityType, string> = {
  joint_purchase: "Compra conjunta",
  joint_sale: "Venta conjunta",
  shared_campaign: "Campaña compartida",
  shared_distribution: "Distribución compartida",
  logistics_partnership: "Asociación logística",
};

export default function OpportunityTypeBadge({ type }: { type: CooperativeOpportunityType }) {
  return <span className="inline-flex rounded-full bg-[#E6F3C8] px-2.5 py-1 text-[10px] font-semibold text-[#42610A]">{opportunityTypeLabels[type]}</span>;
}
