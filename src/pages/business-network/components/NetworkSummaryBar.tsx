import { Download, Flag } from "lucide-react";
import type { NetworkSummary } from "@/types/businessNetwork.types";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

export default function NetworkSummaryBar({ summary }: { summary: NetworkSummary }) {
  return (
    <section className="rounded-xl border border-[#c2c9bc] bg-white p-4">
      <div className="grid gap-3 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto] lg:items-center">
        <div><p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Tiempo estimado</p><p className="font-['Hanken_Grotesk'] text-xl font-bold text-[#1a1c18]">{summary.estimatedLeadTime}</p></div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Costo optimizado</p><p className="font-['Hanken_Grotesk'] text-xl font-bold text-[#4F7302]">{money.format(summary.optimizedCost)}</p></div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Costo original</p><p className="font-['Hanken_Grotesk'] text-xl font-bold text-[#73796e] line-through">{money.format(summary.originalCost)}</p></div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#42493f]">Socios involucrados</p><p className="font-['Hanken_Grotesk'] text-xl font-bold text-[#1a1c18]">{summary.partnersEngaged}</p></div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-[#c2c9bc] bg-white px-3 py-2 text-sm font-semibold text-[#1a1c18] hover:bg-[#f3f4ed]"><Download className="h-4 w-4" />Exportar plan</button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#4F7302] px-3 py-2 text-sm font-semibold text-white hover:bg-[#3E5902]"><Flag className="h-4 w-4" />Finalizar red</button>
        </div>
      </div>
    </section>
  );
}
