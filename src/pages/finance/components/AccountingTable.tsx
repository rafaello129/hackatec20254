import type { AccountingEntry } from "@/types/finance.types";
import AccountingEntryTypeBadge from "./AccountingEntryTypeBadge";
import AccountingStatusBadge from "./AccountingStatusBadge";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

export default function AccountingTable({ entries }: { entries: AccountingEntry[] }) {
  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full min-w-[840px] table-fixed text-left text-sm">
        <thead className="border-b border-[#e2e3dc] bg-[#f3f4ed] text-xs uppercase tracking-[0.08em] text-[#42493f]">
          <tr>
            <th className="w-[96px] px-3 py-3">Fecha</th>
            <th className="w-[280px] px-3 py-3">Concepto</th>
            <th className="w-[140px] px-3 py-3">Tipo</th>
            <th className="w-[130px] px-3 py-3">Categoría</th>
            <th className="w-[120px] px-3 py-3 text-right">Monto</th>
            <th className="w-[120px] px-3 py-3">Estado</th>
            <th className="w-[150px] px-3 py-3">Origen</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="border-b border-[#f0f1ea] align-middle hover:bg-[#f9faf3]">
              <td className="px-3 py-2.5 text-xs font-semibold text-[#42493f]">{entry.date}</td>
              <td className="px-3 py-2.5">
                <p className="truncate font-semibold text-[#1a1c18]">{entry.concept}</p>
                <p className="truncate text-xs text-[#42493f]">{entry.relatedEntity} · {entry.notes}</p>
              </td>
              <td className="px-3 py-2.5"><AccountingEntryTypeBadge type={entry.type} /></td>
              <td className="px-3 py-2.5 text-[#42493f]"><span className="line-clamp-1">{entry.category}</span></td>
              <td className="px-3 py-2.5 text-right font-semibold text-[#1a1c18]">{money.format(entry.amount)}</td>
              <td className="px-3 py-2.5"><AccountingStatusBadge status={entry.status} /></td>
              <td className="px-3 py-2.5 text-[#42493f]"><span className="line-clamp-1">{entry.sourceModule}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      {entries.length === 0 ? (
        <div className="rounded-b-lg border-t border-[#e2e3dc] bg-[#f9faf3] p-6 text-center text-sm text-[#42493f]">
          No hay movimientos con los filtros seleccionados.
        </div>
      ) : null}
    </div>
  );
}
