import {
  AlertCircle,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import type { ProductVerificationStatus } from "@/types/product-verification.types";

const meta = {
  verified: {
    label: "Origen verificado",
    icon: ShieldCheck,
    className: "bg-[#EAF4E6] text-[#2F6E38]",
  },
  pending: {
    label: "En revisión",
    icon: Clock3,
    className: "bg-[#FFF4D8] text-[#8B6205]",
  },
  needs_action: {
    label: "Falta información",
    icon: AlertCircle,
    className: "bg-[#FDE9E6] text-[#A54A42]",
  },
  not_requested: {
    label: "Sin verificar",
    icon: ShieldCheck,
    className: "bg-[#F1F3EF] text-[#66736A]",
  },
} as const;

export default function ProductVerificationBadge({
  status,
  compact = false,
}: {
  status: ProductVerificationStatus;
  compact?: boolean;
}) {
  const item = meta[status];
  const Icon = item.icon;

  return (
    <span
      className={[
        "inline-flex items-center rounded-full font-semibold",
        item.className,
        compact
          ? "gap-1 px-2 py-1 text-[9px]"
          : "gap-1.5 px-3 py-1.5 text-[10px]",
      ].join(" ")}
    >
      <Icon className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {item.label}
    </span>
  );
}
