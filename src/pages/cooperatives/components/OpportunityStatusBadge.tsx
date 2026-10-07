import type { CooperativeStatus } from "@/types/cooperatives.types";

const statusMap: Record<CooperativeStatus, { label: string; className: string }> = {
  published: { label: "Publicada", className: "bg-[#EEF2EA] text-[#607064]" },
  negotiation: { label: "En negociación", className: "bg-[#FFF0D8] text-[#8C6213]" },
  accepted: { label: "Aceptada", className: "bg-[#E6F3C8] text-[#42610A]" },
  in_agreement: { label: "En acuerdo", className: "bg-[#FFF0D8] text-[#8C6213]" },
  active: { label: "Activa", className: "bg-[#E6F3C8] text-[#42610A]" },
  in_delivery: { label: "En entrega", className: "bg-[#E7F0F3] text-[#397387]" },
  completed: { label: "Finalizada", className: "bg-[#EEF2EA] text-[#607064]" },
  canceled: { label: "Cancelada", className: "bg-[#FBE2D8] text-[#8B4A2B]" },
};

export default function OpportunityStatusBadge({ status }: { status: CooperativeStatus }) {
  const mapped = statusMap[status];
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${mapped.className}`}>{mapped.label}</span>;
}
