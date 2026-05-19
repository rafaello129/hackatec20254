import type { CustomerStatus } from "@/types/customer.types";

const statusMap: Record<CustomerStatus, { label: string; className: string }> = {
  active: { label: "Activo", className: "bg-[#D6D979] text-[#3E5902]" },
  prospect: { label: "Prospecto", className: "bg-[#e8e9e2] text-[#42493f]" },
  at_risk: { label: "En riesgo", className: "bg-[#fff2cc] text-[#7a5d00]" },
  churned: { label: "Perdido", className: "bg-[#ffdad6] text-[#93000a]" },
  inactive: { label: "Inactivo", className: "bg-[#e8e9e2] text-[#586056]" },
};

interface CustomerStatusBadgeProps {
  status: CustomerStatus;
}

export default function CustomerStatusBadge({ status }: CustomerStatusBadgeProps) {
  const mapped = statusMap[status];

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${mapped.className}`}>{mapped.label}</span>;
}
