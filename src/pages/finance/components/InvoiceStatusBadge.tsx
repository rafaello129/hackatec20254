import StatusBadge from "@/components/common/StatusBadge";
import type { InvoiceStatus } from "@/types/finance.types";

const labels: Record<InvoiceStatus, string> = {
  draft: "Borrador",
  issued: "Emitida",
  paid: "Pagada",
  pending: "Pendiente",
  overdue: "Vencida",
  canceled: "Cancelada",
};

const tones: Record<InvoiceStatus, "neutral" | "success" | "warning" | "danger"> = {
  draft: "neutral",
  issued: "neutral",
  paid: "success",
  pending: "warning",
  overdue: "danger",
  canceled: "danger",
};

export default function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  return <StatusBadge label={labels[status]} tone={tones[status]} />;
}
