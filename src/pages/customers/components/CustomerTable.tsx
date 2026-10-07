import { ChevronRight, Phone } from "lucide-react";
import type { CustomerDisplayData } from "@/types/customer.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

interface CustomerTableProps {
  customers: CustomerDisplayData[];
  onSelect: (customer: CustomerDisplayData) => void;
}

const behaviorMeta = {
  new: {
    label: "Nuevo",
    dot: "bg-[var(--peek-accent-lime)]",
    avatar: "bg-[#EEF8D9] text-[#416509]",
  },
  frequent: {
    label: "Frecuente",
    dot: "bg-[var(--oe-primary)]",
    avatar: "bg-[var(--peek-surface-soft)] text-[var(--oe-primary)]",
  },
  inactive: {
    label: "Sin compra reciente",
    dot: "bg-[var(--peek-warning)]",
    avatar: "bg-[var(--peek-warning-soft)] text-[#946500]",
  },
  regular: {
    label: "Cliente",
    dot: "bg-[#9AA69D]",
    avatar: "bg-[#EEF1EC] text-[#5D6A61]",
  },
} as const;

export default function CustomerTable({
  customers,
  onSelect,
}: CustomerTableProps) {
  if (customers.length === 0) {
    return (
      <div className="rounded-[18px] border border-dashed border-[#DDE4D9] bg-[#F8FAF6] px-5 py-10 text-center">
        <p className="text-sm font-semibold text-[#344039]">
          No encontramos clientes con estos filtros.
        </p>
        <p className="mt-1 text-[11px] text-[#7E8981]">
          Prueba con otro nombre, teléfono o categoría.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-[18px] border border-[var(--oe-border)] bg-white md:block">
        <table className="w-full table-fixed text-left">
          <thead className="bg-[linear-gradient(90deg,#F4F8F1_0%,#FAFBF8_100%)]">
            <tr className="text-[10px] font-medium uppercase tracking-[0.055em] text-[#718078]">
              <th className="w-[36%] px-4 py-3.5 font-semibold">Cliente</th>
              <th className="w-[23%] px-3 py-3.5 font-semibold">Última compra</th>
              <th className="w-[13%] px-3 py-3.5 font-semibold">Compras</th>
              <th className="w-[20%] px-3 py-3.5 font-semibold">Total comprado</th>
              <th className="w-[8%] px-4 py-3.5" aria-label="Abrir cliente" />
            </tr>
          </thead>

          <tbody>
            {customers.map((customer, index) => {
              const meta = behaviorMeta[customer.behavior];

              return (
                <tr
                  key={customer.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => onSelect(customer)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelect(customer);
                    }
                  }}
                  className="peek-customer-row group cursor-pointer border-t border-[#EEF0EB] outline-none focus-visible:bg-[#F4F8F1] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9AC84B]/45"
                  style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-[10px] font-bold transition-transform duration-200 group-hover:scale-105 ${meta.avatar}`}
                      >
                        {customer.initials}
                      </span>

                      <span className="min-w-0">
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="truncate text-[12px] font-semibold text-[#263129]">
                            {customer.name}
                          </span>
                          <span
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`}
                            aria-label={meta.label}
                            title={meta.label}
                          />
                        </span>
                        <span className="mt-1 flex items-center gap-1 text-[10px] text-[#849087]">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </span>
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="inline-flex rounded-full bg-[#F5F7F2] px-2.5 py-1 text-[10px] font-medium text-[#667169] transition-colors duration-200 group-hover:bg-[#EAF3E6] group-hover:text-[#416149]">
                      {customer.lastPurchaseLabel}
                    </span>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="text-[12px] font-bold text-[#2B352F]">
                      {customer.totalPurchases}
                    </span>
                    <span className="ml-1 text-[9px] text-[#87918A]">
                      {customer.totalPurchases === 1 ? "vez" : "veces"}
                    </span>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="text-[12px] font-bold text-[#2B352F]">
                      {money.format(customer.totalSpent)}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <span className="ml-auto grid h-8 w-8 place-items-center rounded-full text-[#929C95] transition-all duration-200 group-hover:bg-[var(--peek-surface-soft)] group-hover:text-[var(--oe-primary)]">
                      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-2.5 md:hidden">
        {customers.map((customer, index) => {
          const meta = behaviorMeta[customer.behavior];

          return (
            <button
              key={customer.id}
              type="button"
              onClick={() => onSelect(customer)}
              className="peek-customer-row-mobile w-full rounded-[18px] border border-[#E4E8E1] bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#CFD8CC] hover:shadow-sm"
              style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-[10px] font-bold ${meta.avatar}`}
                >
                  {customer.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-[12px] font-semibold text-[#263129]">
                      {customer.name}
                    </p>
                    <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                  </div>
                  <p className="mt-0.5 text-[10px] text-[#849087]">
                    {customer.phone}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-[#929C95]" />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[linear-gradient(135deg,#F7F9F4_0%,#F3F7EF_100%)] p-3">
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-[#889289]">
                    Última compra
                  </p>
                  <p className="mt-1 text-[10px] font-semibold text-[#344039]">
                    {customer.lastPurchaseLabel}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-[#889289]">
                    Compras
                  </p>
                  <p className="mt-1 text-[10px] font-semibold text-[#344039]">
                    {customer.totalPurchases}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-[#889289]">
                    Total
                  </p>
                  <p className="mt-1 text-[10px] font-semibold text-[#344039]">
                    {money.format(customer.totalSpent)}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
