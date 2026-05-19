import { Eye, Mail, Phone } from "lucide-react";
import type { Customer } from "@/types/customer.types";
import CustomerHealthScore from "./CustomerHealthScore";
import CustomerStatusBadge from "./CustomerStatusBadge";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

const formatShortDate = (dateISO: string) =>
  new Date(`${dateISO}T00:00:00`).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const segmentLabels: Record<Customer["segment"], string> = {
  enterprise: "Enterprise",
  pyme: "PyME",
  microbusiness: "Microbusiness",
  distributor: "Distributor",
  supplier: "Supplier",
  strategic_partner: "Strategic Partner",
};

interface CustomerTableProps {
  customers: Customer[];
  selectedCustomerId: string | null;
  onSelectCustomer: (customerId: string) => void;
}

export default function CustomerTable({ customers, selectedCustomerId, onSelectCustomer }: CustomerTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#e2e3dc]">
      <table className="min-w-[1060px] w-full text-left text-sm">
        <thead className="bg-[#f3f4ed] text-xs uppercase tracking-[0.06em] text-[#42493f]">
          <tr>
            <th className="px-3 py-3">Cliente</th>
            <th className="px-3 py-3">Estado</th>
            <th className="px-3 py-3">Segmento</th>
            <th className="px-3 py-3">Valor anual</th>
            <th className="px-3 py-3">Health score</th>
            <th className="px-3 py-3">Account manager</th>
            <th className="px-3 py-3">Ultima interaccion</th>
            <th className="px-3 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            const isSelected = customer.id === selectedCustomerId;

            return (
              <tr
                key={customer.id}
                onClick={() => onSelectCustomer(customer.id)}
                className={`cursor-pointer border-t border-[#e8e9e2] transition hover:bg-[#f9faf3] ${
                  isSelected ? "bg-[#f3f4ed]" : "bg-white"
                }`}
              >
                <td className="px-3 py-3">
                  <p className="font-semibold text-[#1a1c18]">{customer.companyName}</p>
                  <p className="text-xs text-[#42493f]">{customer.email}</p>
                </td>
                <td className="px-3 py-3">
                  <CustomerStatusBadge status={customer.status} />
                </td>
                <td className="px-3 py-3 text-[#42493f]">{segmentLabels[customer.segment]}</td>
                <td className="px-3 py-3 font-semibold text-[#1a1c18]">{formatCurrency(customer.annualValue)}</td>
                <td className="px-3 py-3">
                  <CustomerHealthScore score={customer.healthScore} />
                </td>
                <td className="px-3 py-3 text-[#42493f]">{customer.accountManager}</td>
                <td className="px-3 py-3 text-[#42493f]">{formatShortDate(customer.lastInteraction)}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      aria-label={`Ver cliente ${customer.companyName}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onSelectCustomer(customer.id);
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#c2c9bc] bg-white text-[#42493f] hover:bg-[#f3f4ed]"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Enviar correo a ${customer.companyName}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#c2c9bc] bg-white text-[#42493f] hover:bg-[#f3f4ed]"
                    >
                      <Mail className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Llamar a ${customer.companyName}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#c2c9bc] bg-white text-[#42493f] hover:bg-[#f3f4ed]"
                    >
                      <Phone className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {customers.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-3 py-8 text-center text-sm text-[#42493f]">
                No se encontraron clientes con los filtros actuales.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
