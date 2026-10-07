import { ArrowRight } from "lucide-react";
import type { CustomerDisplayData } from "@/types/customer.types";

interface InactiveCustomersCardProps {
  customers: CustomerDisplayData[];
  onSelect: (customer: CustomerDisplayData) => void;
  onViewAll: () => void;
}

export default function InactiveCustomersCard({
  customers,
  onSelect,
  onViewAll,
}: InactiveCustomersCardProps) {
  const visible = customers.slice(0, 3);

  return (
    <article className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-[#172019]">
            Hace tiempo que no compran
          </h2>
          <p className="mt-1 text-[11px] text-[#7B867E]">
            {customers.length} {customers.length === 1 ? "cliente podría" : "clientes podrían"} necesitar seguimiento.
          </p>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-[#287839] transition hover:gap-1.5"
        >
          Ver todos
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="mt-4 divide-y divide-[#EEF0EB]">
        {visible.length === 0 ? (
          <div className="rounded-2xl bg-[#F6F8F3] px-3 py-4 text-[11px] text-[#66736A]">
            Todo en orden. No hay clientes pendientes de seguimiento.
          </div>
        ) : (
          visible.map((customer) => (
            <button
              key={customer.id}
              type="button"
              onClick={() => onSelect(customer)}
              className="group flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E6F1E4] text-[10px] font-semibold text-[#135C2F]">
                {customer.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-semibold text-[#2B352F]">
                  {customer.name}
                </span>
                <span className="mt-0.5 block truncate text-[10px] text-[#87918A]">
                  Última compra {customer.lastPurchaseLabel.toLowerCase()}
                </span>
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#8D9790] transition-transform group-hover:translate-x-0.5" />
            </button>
          ))
        )}
      </div>

      {visible.length > 0 ? (
        <div className="mt-4 rounded-[14px] bg-[#ECF5E8] px-3 py-2.5 text-[10px] leading-4 text-[#3F6948]">
          Puedes revisar qué compraron antes de volver a contactarlos.
        </div>
      ) : null}
    </article>
  );
}
