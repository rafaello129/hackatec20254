import { Eye, Mail, Phone, MoreVertical } from "lucide-react";
import type { Customer } from "@/types/customer.types";
import CustomerHealthScore from "./CustomerHealthScore";
import CustomerStatusBadge from "./CustomerStatusBadge";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

interface CustomerTableProps {
  customers: Customer[];
}

export default function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#e2e3dc] bg-white">
      <table className="min-w-[900px] w-full text-left text-sm">
        <thead className="bg-[#f3f4ed] text-xs uppercase tracking-[0.06em] text-[#42493f]">
          <tr>
            <th className="px-4 py-4">Cliente</th>
            <th className="px-4 py-4">Estado</th>
            <th className="px-4 py-4">Valor anual</th>
            <th className="px-4 py-4">Salud</th>
            <th className="px-4 py-4">Responsable</th>
            <th className="px-4 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return (
              <tr
                key={customer.id}
                className="border-t border-[#e8e9e2] bg-white transition hover:bg-[#f9faf3]"
              >
                <td className="px-4 py-4">
                  <p className="font-semibold text-[#1a1c18]">{customer.companyName}</p>
                  <p className="text-xs text-[#42493f]">{customer.email}</p>
                </td>
                <td className="px-4 py-4">
                  <CustomerStatusBadge status={customer.status} />
                </td>
                <td className="px-4 py-4 font-semibold text-[#1a1c18]">{formatCurrency(customer.annualValue)}</td>
                <td className="px-4 py-4">
                  <CustomerHealthScore score={customer.healthScore} />
                </td>
                <td className="px-4 py-4 text-[#42493f]">{customer.accountManager}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      aria-label={`Ver cliente ${customer.companyName}`}
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
                    <button
                      type="button"
                      aria-label={`Más acciones para ${customer.companyName}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#c2c9bc] bg-white text-[#42493f] hover:bg-[#f3f4ed]"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {customers.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-sm text-[#42493f]">
                No se encontraron clientes con los filtros actuales.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
