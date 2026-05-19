import type { InventoryStatus } from "@/types/inventory.types";

const statusMap: Record<InventoryStatus, { label: string; className: string }> = {
  in_stock: { label: "En stock", className: "bg-[#D6D979] text-[#3E5902]" },
  low_stock: { label: "Bajo stock", className: "bg-[#fff2cc] text-[#7a5d00]" },
  out_of_stock: { label: "Sin stock", className: "bg-[#ffdad6] text-[#93000a]" },
  reserved: { label: "Reservado", className: "bg-[#e8e9e2] text-[#42493f]" },
  discontinued: { label: "Descontinuado", className: "bg-[#e2e3dc] text-[#586056]" },
};

interface InventoryStatusBadgeProps {
  status: InventoryStatus;
}

export default function InventoryStatusBadge({ status }: InventoryStatusBadgeProps) {
  const mapped = statusMap[status];
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${mapped.className}`}>{mapped.label}</span>;
}
