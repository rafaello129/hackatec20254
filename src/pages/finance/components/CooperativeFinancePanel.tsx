import SectionCard from "@/components/common/SectionCard";
import type { CooperativeFinancialRecord } from "@/types/finance.types";
import InvoiceStatusBadge from "./InvoiceStatusBadge";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

const distributionLabels: Record<CooperativeFinancialRecord["distributionStatus"], string> = {
  pending: "Pendiente",
  calculated: "Calculado",
  in_review: "En revisión",
  completed: "Completado",
};

export default function CooperativeFinancePanel({ records }: { records: CooperativeFinancialRecord[] }) {
  return (
    <SectionCard title="Pipeline financiero cooperativo">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-[#e2e3dc] bg-[#f3f4ed] text-xs uppercase tracking-[0.08em] text-[#42493f]">
            <tr>
              <th className="px-3 py-3">Acuerdo</th>
              <th className="px-3 py-3 text-right">Valor</th>
              <th className="px-3 py-3 text-right">Pendiente</th>
              <th className="px-3 py-3">Cobrado</th>
              <th className="px-3 py-3">Reparto</th>
              <th className="px-3 py-3">Pago</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              const collectedRatio = Math.round((record.contributionsCollected / Math.max(record.totalAgreementValue, 1)) * 100);
              return (
                <tr key={record.id} className="border-b border-[#f0f1ea]">
                  <td className="max-w-[260px] px-3 py-3">
                    <p className="truncate font-semibold text-[#1a1c18]">{record.opportunityTitle}</p>
                    <p className="text-xs text-[#42493f]">{record.participants.length} participantes · {record.agreementId}</p>
                  </td>
                  <td className="px-3 py-3 text-right font-semibold text-[#1a1c18]">{money.format(record.totalAgreementValue)}</td>
                  <td className="px-3 py-3 text-right font-semibold text-[#1a1c18]">{money.format(record.pendingContributions)}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-[#e8e9e2]">
                        <div className="h-full rounded-full bg-[#799833]" style={{ width: `${collectedRatio}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-[#42493f]">{collectedRatio}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[#42493f]">{distributionLabels[record.distributionStatus]}</td>
                  <td className="px-3 py-3"><InvoiceStatusBadge status={record.invoiceStatus} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
