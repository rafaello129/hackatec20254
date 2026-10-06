import { ArrowUpRight, Check, CircleAlert, Factory, Lightbulb, PackageCheck, Store, Truck } from "lucide-react";
import type { PartnerType, ProductionChainStep } from "@/types/businessNetwork.types";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import "./production-chain.css";

const icons: Record<string, typeof Check> = { Idea: Lightbulb, Proveedor: PackageCheck, Manufactura: Factory, Empaque: PackageCheck, Distribucion: Truck, Venta: Store };
const statuses = { completed: "Completado", optimized: "Optimizado", pending: "Por cerrar", unresolved: "Pendiente" };

export default function ProductionChainVisualization({ steps, onSelectType, selectedType }: { steps: ProductionChainStep[]; onSelectType: (type: PartnerType | "") => void; selectedType: PartnerType | "" }) {
  const pending = steps.filter((step) => step.status === "pending" || step.status === "unresolved").length;
  return (
    <section className="network-chain" aria-labelledby="network-chain-title">
      <div className="network-section-heading"><div><p className="network-eyebrow">Mapa de operación</p><h2 id="network-chain-title">Cadena productiva</h2></div>
        <div className="production-chain-summary"><div><span>{steps.length} etapas</span><span><CircleAlert size={13} />{pending} por resolver</span></div>
          <div className="production-chain-track" aria-label={`${steps.length - pending} de ${steps.length} etapas completadas u optimizadas`} role="img">{steps.map((step) => <span key={step.id} data-status={step.status} />)}</div>
        </div>
      </div>
      <ol className="network-chain-steps">
        {steps.map((step, index) => {
          const Icon = icons[step.label] ?? Check;
          return (
            <li key={step.id} className="production-stage" data-status={step.status} data-selected={index !== 0 && selectedType === step.type}>
              <div className="production-stage-node"><span className="production-stage-icon"><Icon size={21} /></span><span className="production-stage-index">{String(index + 1).padStart(2, "0")}</span></div>
              <SpotlightCard className="production-stage-body" spotlightColor={step.status === "unresolved" ? "rgba(212, 163, 68, 0.22)" : step.status === "optimized" ? "rgba(62, 118, 140, 0.20)" : "rgba(79, 115, 2, 0.18)"}>
                <div className="production-stage-label"><h3>{step.label === "Distribucion" ? "Distribución" : step.label}</h3></div>
                <span className="production-stage-status">{step.status === "completed" ? <Check size={12} /> : <span className="production-status-dot" />}{statuses[step.status]}</span>
                <p className="production-stage-partner">{step.partnerName}</p>
                <p className="production-stage-description">{step.description}</p>
                <button onClick={() => onSelectType(index === 0 ? "" : step.type)} aria-pressed={index !== 0 && selectedType === step.type} aria-label={`Ver aliados: ${step.label}`} className="production-stage-action">Ver aliados <ArrowUpRight size={14} /></button>
              </SpotlightCard>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
