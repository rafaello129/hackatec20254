import StatusBadge from "@/components/common/StatusBadge";
import type { AccountingStatus } from "@/types/finance.types";

const labels: Record<AccountingStatus, string> = {
  registered: "Registrado",
  pending: "Pendiente",
  reconciled: "Conciliado",
  canceled: "Cancelado",
};

const tones: Record<AccountingStatus, "neutral" | "success" | "warning" | "danger"> = {
  registered: "neutral",
  pending: "warning",
  reconciled: "success",
  canceled: "danger",
};

export default function AccountingStatusBadge({ status }: { status: AccountingStatus }) {
  return <StatusBadge label={labels[status]} tone={tones[status]} />;
}
