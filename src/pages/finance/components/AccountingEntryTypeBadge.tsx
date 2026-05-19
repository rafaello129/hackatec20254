import StatusBadge from "@/components/common/StatusBadge";
import type { AccountingEntryType } from "@/types/finance.types";

const labels: Record<AccountingEntryType, string> = {
  income: "Ingreso",
  expense: "Egreso",
  adjustment: "Ajuste",
  transfer: "Transferencia",
  tax: "Impuesto",
  cooperative_contribution: "Aportación cooperativa",
};

const tones: Record<AccountingEntryType, "neutral" | "success" | "warning" | "danger"> = {
  income: "success",
  expense: "danger",
  adjustment: "warning",
  transfer: "neutral",
  tax: "warning",
  cooperative_contribution: "success",
};

export default function AccountingEntryTypeBadge({ type }: { type: AccountingEntryType }) {
  return <StatusBadge label={labels[type]} tone={tones[type]} />;
}
