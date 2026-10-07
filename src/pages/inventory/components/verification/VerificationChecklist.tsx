import {
  AlertCircle,
  Check,
  Clock3,
  ListChecks,
} from "lucide-react";
import type { ProductVerificationCheck } from "@/types/product-verification.types";

export default function VerificationChecklist({
  checks,
}: {
  checks: ProductVerificationCheck[];
}) {
  if (checks.length === 0) return null;

  return (
    <section className="h-full rounded-[22px] border border-[var(--oe-border)] bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-[#EEF6E9] text-[#2E6D36]">
          <ListChecks className="h-4 w-4" />
        </span>
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
            Comprobaciones
          </p>
          <h3 className="mt-0.5 text-[16px] font-semibold text-[#263129]">
            Qué revisa PÉEK
          </h3>
        </div>
      </div>

      <div className="mt-4 divide-y divide-[#EDF0EB]">
        {checks.map((check) => {
          const meta =
            check.status === "passed"
              ? {
                  icon: Check,
                  circle: "bg-[#EAF4E6] text-[#2E6D36]",
                  status: "Comprobado",
                }
              : check.status === "needs_action"
                ? {
                    icon: AlertCircle,
                    circle: "bg-[#FDE9E6] text-[#A54A42]",
                    status: "Falta información",
                  }
                : {
                    icon: Clock3,
                    circle: "bg-[#FFF4D8] text-[#8B6205]",
                    status: "En revisión",
                  };

          const Icon = meta.icon;

          return (
            <div
              key={check.id}
              className="flex gap-2.5 py-3 first:pt-0 last:pb-0"
            >
              <span
                className={[
                  "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full",
                  meta.circle,
                ].join(" ")}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[10px] font-semibold text-[#344039]">
                    {check.label}
                  </p>
                  <span className="text-[8px] font-semibold text-[#7A867E]">
                    {meta.status}
                  </span>
                </div>
                <p className="mt-0.5 text-[9px] leading-4 text-[#7A867E]">
                  {check.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
