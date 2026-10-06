import { Clock3, TrendingDown, Users, Wallet } from "lucide-react";
import type { NetworkSummary } from "@/types/businessNetwork.types";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

export default function NetworkSummaryBar({ summary, connectedCount, totalCount }: { summary: NetworkSummary; connectedCount: number; totalCount: number }) {
  return (
    <dl className="network-summary">
      <div><dt><Wallet size={16} /> Costo estimado</dt><dd>{money.format(summary.optimizedCost)} <small>MXN</small></dd></div>
      <div><dt><TrendingDown size={16} /> Ahorro estimado</dt><dd className="network-savings">{money.format(summary.originalCost - summary.optimizedCost)} <small>vs. {money.format(summary.originalCost)}</small></dd></div>
      <div><dt><Clock3 size={16} /> Tiempo de producción</dt><dd>{summary.estimatedLeadTime}</dd></div>
      <div><dt><Users size={16} /> Aliados conectados</dt><dd aria-live="polite">{connectedCount} <small>de {totalCount} recomendados</small></dd></div>
    </dl>
  );
}
