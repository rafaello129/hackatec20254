import type { ProductionChainStepStatus } from "@/types/businessNetwork.types";

const statusMap: Record<ProductionChainStepStatus, { label: string; className: string }> = {
  completed: { label: "Completado", className: "bg-[#D6D979] text-[#3E5902]" },
  optimized: { label: "Optimizado", className: "bg-[#c5f17a] text-[#344e00]" },
  unresolved: { label: "Pendiente", className: "bg-[#fff2cc] text-[#7a5d00]" },
  pending: { label: "Por cerrar", className: "bg-[#e8e9e2] text-[#42493f]" },
};

export default function NetworkStatusBadge({ status }: { status: ProductionChainStepStatus }) {
  const mapped = statusMap[status];
  return <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${mapped.className}`}>{mapped.label}</span>;
}
