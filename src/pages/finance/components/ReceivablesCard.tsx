import { ArrowRight, Clock3 } from "lucide-react";
import type { ReceivableItem } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export default function ReceivablesCard({ items }: { items: ReceivableItem[] }) {
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <article className="rounded-[22px] border border-[var(--oe-border)] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-[var(--oe-text)]">
            Por cobrar
          </h2>
          <p className="mt-1 text-[11px] text-[var(--oe-text-muted)]">
            Dinero que todavía no ha entrado.
          </p>
        </div>
        <span className="rounded-full bg-[var(--peek-warning-soft)] px-2.5 py-1 text-[10px] font-semibold text-[#8B6205]">
          {money.format(total)}
        </span>
      </div>

      <div className="mt-4 divide-y divide-[#EEF0EB]">
        {items.length === 0 ? (
          <div className="rounded-2xl bg-[#F6F8F3] px-3 py-4 text-[11px] text-[#66736A]">
            No tienes pagos pendientes.
          </div>
        ) : (
          items.slice(0, 3).map((item) => (
            <button
              key={item.id}
              type="button"
              className="group flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[#F3F6EF] text-[var(--oe-primary)]">
                <Clock3 className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-semibold text-[#2B352F]">
                  {item.customerName}
                </span>
                <span className="mt-0.5 block text-[10px] text-[#87918A]">
                  Hace {item.daysPending} días
                </span>
              </span>
              <span className="text-right">
                <span className="block text-[11px] font-bold text-[#2B352F]">
                  {money.format(item.amount)}
                </span>
                <ArrowRight className="ml-auto mt-1 h-3.5 w-3.5 text-[#8D9790] transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          ))
        )}
      </div>

      {items.length > 0 ? (
        <p className="mt-4 rounded-[14px] bg-[#ECF5E8] px-3 py-2.5 text-[10px] leading-4 text-[#3F6948]">
          Después podrás enviar un recordatorio o marcar el pago como recibido.
        </p>
      ) : null}
    </article>
  );
}
