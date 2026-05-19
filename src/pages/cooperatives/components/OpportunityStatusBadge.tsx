import type { CooperativeStatus } from "@/types/cooperatives.types";

const statusMap: Record<CooperativeStatus, { label: string; className: string }> = {
  published: { label: "Publicada", className: "bg-[#e8e9e2] text-[#42493f]" },
  negotiation: { label: "En negociación", className: "bg-[#fff2cc] text-[#7a5d00]" },
  accepted: { label: "Aceptada", className: "bg-[#D6D979] text-[#3E5902]" },
  in_agreement: { label: "En acuerdo", className: "bg-[#fff2cc] text-[#7a5d00]" },
  active: { label: "Activa", className: "bg-[#D6D979] text-[#3E5902]" },
  in_delivery: { label: "En entrega", className: "bg-[#D6D979] text-[#3E5902]" },
  completed: { label: "Finalizada", className: "bg-[#e8e9e2] text-[#42493f]" },
  canceled: { label: "Cancelada", className: "bg-[#ffdad6] text-[#93000a]" },
};

export default function OpportunityStatusBadge({ status }: { status: CooperativeStatus }) {
  const mapped = statusMap[status];
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${mapped.className}`}>{mapped.label}</span>;
}
