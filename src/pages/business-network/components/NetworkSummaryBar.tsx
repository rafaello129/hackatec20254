import { Clock3, TrendingDown, Users, Wallet } from "lucide-react";
import CountUp from "@/components/react-bits/CountUp";
import type { NetworkSummary } from "@/types/businessNetwork.types";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

export default function NetworkSummaryBar({ summary, connectedCount, totalCount }: { summary: NetworkSummary; connectedCount: number; totalCount: number }) {
  const savings = summary.originalCost - summary.optimizedCost;
  return (
    <dl className="network-summary" aria-label="Resumen calculado de la red">
      <div>
        <dt><Wallet size={16} /> Costo estimado</dt>
        <dd aria-label={money.format(summary.optimizedCost)}><CountUp to={summary.optimizedCost} prefix="$" duration={0.76} /> <small>MXN optimizados</small></dd>
      </div>
      <div>
        <dt><TrendingDown size={16} /> Ahorro estimado</dt>
        <dd className="network-savings" aria-label={money.format(savings)}><CountUp to={savings} prefix="$" duration={0.82} delay={0.08} /> <small>vs. {money.format(summary.originalCost)}</small></dd>
      </div>
      <div><dt><Clock3 size={16} /> Tiempo de producción</dt><dd>{summary.estimatedLeadTime}<small>estimación de la red</small></dd></div>
      <div>
        <dt><Users size={16} /> Aliados conectados</dt>
        <dd aria-live="polite"><CountUp to={connectedCount} duration={0.55} /> <small>de {totalCount} recomendados</small></dd>
      </div>
    </dl>
  );
}
