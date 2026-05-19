import type { PartnerType } from "@/types/businessNetwork.types";

const typeMap: Record<PartnerType, string> = {
  supplier: "Proveedor",
  manufacturer: "Manufactura",
  logistics: "Logistica",
  packaging: "Empaque",
  retail_partner: "Socio comercial",
  service_provider: "Servicio",
  cooperative_partner: "Cooperativo",
};

export default function NetworkPartnerTypeBadge({ type }: { type: PartnerType }) {
  return <span className="rounded-full bg-[#D6D979] px-2.5 py-1 text-xs font-semibold text-[#3E5902]">{typeMap[type]}</span>;
}
