import { ArrowRight, Clock3 } from "lucide-react";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import type { ReceivableItem } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const ageTone = (days: number) => {
  if (days > 30) {
    return "bg-[#FDE9E6] text-[#A54A42]";
  }
  if (days >= 15) {
    return "bg-[var(--peek-warning-soft)] text-[#8B6205]";
  }
  return "bg-[#F3F5F0] text-[#77827A]";
};

export default function ReceivablesCard({ items }: { items: ReceivableItem[] }) {
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <SpotlightCard
      spotlightColor="rgba(228, 172, 36, 0.10)"
      className="h-full min-h-[390px] rounded-[24px] border border-[var(--oe-border)] bg-white p-5"
    >
      <div className="relative z-[4] flex h-full flex-col">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
            Por cobrar
          </p>
          <p className="mt-2 font-['Hanken_Grotesk'] text-[32px] font-bold leading-none tracking-[-0.04em] text-[var(--oe-text)]">
            {money.format(total)}
          </p>
          <p className="mt-2 text-[11px] text-[var(--oe-text-muted)]">
            {items.length} {items.length === 1 ? "pago pendiente" : "pagos pendientes"}
          </p>
        </div>

        <div className="mt-5 flex-1 divide-y divide-[#EEF0EB]">
          {items.length === 0 ? (
            <div className="rounded-[16px] bg-[var(--peek-success-soft)] px-4 py-5 text-[11px] text-[#3F6948]">
              Todo cobrado. No tienes pagos pendientes.
            </div>
          ) : (
            items.slice(0, 4).map((item) => (
              <button
                key={item.id}
                type="button"
                className="group flex w-full items-center gap-3 py-3.5 text-left first:pt-0"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[#F3F6EF] text-[var(--oe-primary)]">
                  <Clock3 className="h-4 w-4" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-semibold text-[#2B352F]">
                    {item.customerName}
                  </span>
                  <span
                    className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[9px] font-semibold ${ageTone(item.daysPending)}`}
                  >
                    Hace {item.daysPending} días
                  </span>
                </span>

                <span className="text-right">
                  <span className="block text-[12px] font-bold text-[#2B352F]">
                    {money.format(item.amount)}
                  </span>
                  <ArrowRight className="ml-auto mt-1 h-3.5 w-3.5 text-[#8D9790] transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </button>
            ))
          )}
        </div>

        {items.length > 0 ? (
          <div className="mt-4 rounded-[14px] bg-[var(--peek-warning-soft)] px-3 py-3 text-[10px] leading-4 text-[#715C20]">
            Puedes revisar quién tiene pagos pendientes antes de enviar un recordatorio.
          </div>
        ) : null}
      </div>
    </SpotlightCard>
  );
}
