import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

const entries = [
  { date: "2026-05-16", concept: "Cobro contrato GreenLeaf", type: "Ingreso", amount: "$48,200", account: "Bancos MXN" },
  { date: "2026-05-16", concept: "Pago de nómina operativa", type: "Egreso", amount: "$18,940", account: "Nómina" },
  { date: "2026-05-15", concept: "Ajuste inventario cíclico", type: "Ajuste", amount: "$3,150", account: "Inventario" },
];

export default function FinanceAccountingPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
      <SectionCard title="Movimientos contables">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[#e2e3dc] text-xs uppercase tracking-[0.06em] text-[#42493f]">
              <tr>
                <th className="px-2 py-3">Fecha</th>
                <th className="px-2 py-3">Concepto</th>
                <th className="px-2 py-3">Tipo</th>
                <th className="px-2 py-3">Monto</th>
                <th className="px-2 py-3">Cuenta</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={`${entry.date}-${entry.concept}`} className="border-b border-[#f0f1ea]">
                  <td className="px-2 py-3 text-[#42493f]">{entry.date}</td>
                  <td className="px-2 py-3 font-semibold text-[#1a1c18]">{entry.concept}</td>
                  <td className="px-2 py-3">
                    <StatusBadge
                      label={entry.type}
                      tone={entry.type === "Ingreso" ? "success" : entry.type === "Egreso" ? "danger" : "warning"}
                    />
                  </td>
                  <td className="px-2 py-3 text-[#1a1c18]">{entry.amount}</td>
                  <td className="px-2 py-3 text-[#42493f]">{entry.account}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <SectionCard title="Estado contable">
        <div className="space-y-3 text-sm">
          <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <p className="font-semibold text-[#1a1c18]">Cierre mensual</p>
            <p className="text-[#42493f]">Progreso 74% · 3 validaciones pendientes.</p>
          </div>
          <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <p className="font-semibold text-[#1a1c18]">Conciliación bancaria</p>
            <p className="text-[#42493f]">Última conciliación: 14 de mayo de 2026.</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
