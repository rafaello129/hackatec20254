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
      <div className="hidden overflow-hidden md:block">
        <table className="w-full table-fixed text-left">
          <thead>
            <tr className="border-b border-[#E8ECE6] text-[10px] font-medium text-[#79847C]">
              <th className="w-[36%] pb-3 font-medium">Cliente</th>
              <th className="w-[23%] pb-3 font-medium">Última compra</th>
              <th className="w-[13%] pb-3 font-medium">Compras</th>
              <th className="w-[20%] pb-3 font-medium">Total comprado</th>
              <th className="w-[8%] pb-3" aria-label="Abrir cliente" />
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
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
                className="group cursor-pointer border-b border-[#EEF0EB] outline-none transition last:border-b-0 hover:bg-[#F9FAF7] focus-visible:bg-[#F4F8F1] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9AC84B]/45"
              >
                <td className="py-3.5 pr-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E6F1E4] text-[10px] font-semibold text-[#135C2F]">
                      {customer.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[12px] font-semibold text-[#263129]">
                        {customer.name}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1 text-[10px] text-[#849087]">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </span>
                    </span>
                  </div>
                </td>
                <td className="py-3.5 pr-3 text-[11px] text-[#667169]">
                  {customer.lastPurchaseLabel}
                </td>
                <td className="py-3.5 pr-3 text-[11px] font-semibold text-[#2B352F]">
                  {customer.totalPurchases}
                </td>
                <td className="py-3.5 pr-3 text-[11px] font-semibold text-[#2B352F]">
                  {money.format(customer.totalSpent)}
                </td>
                <td className="py-3.5 text-right">
                  <ChevronRight className="ml-auto h-4 w-4 text-[#929C95] transition-transform group-hover:translate-x-0.5" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2 md:hidden">
        {customers.map((customer) => (
          <button
            key={customer.id}
            type="button"
            onClick={() => onSelect(customer)}
            className="w-full rounded-[18px] border border-[#E4E8E1] bg-white p-4 text-left transition hover:border-[#CFD8CC] hover:bg-[#FAFBF8]"
          >
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E6F1E4] text-[10px] font-semibold text-[#135C2F]">
                {customer.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-[#263129]">
                  {customer.name}
                </p>
                <p className="mt-0.5 text-[10px] text-[#849087]">
                  {customer.phone}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-[#929C95]" />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[#F7F8F5] p-3">
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
        ))}
      </div>
    </>
  );
}
