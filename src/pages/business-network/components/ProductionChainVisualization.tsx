import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Factory,
  Lightbulb,
  PackageCheck,
  Store,
  Truck,
} from "lucide-react";
import AnimatedContent from "@/components/react-bits/AnimatedContent";
import BorderGlow from "@/components/react-bits/BorderGlow";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import type { PartnerType, ProductionChainStep } from "@/types/businessNetwork.types";
import "./production-chain.css";

const icons: Record<string, typeof Check> = {
  Idea: Lightbulb,
  Proveedor: PackageCheck,
  Manufactura: Factory,
  Empaque: PackageCheck,
  Distribucion: Truck,
  Venta: Store,
};

const statuses = {
  completed: "Completado",
  optimized: "Optimizado",
  pending: "Por cerrar",
  unresolved: "Pendiente",
};

export default function ProductionChainVisualization({
  steps,
  onSelectType,
  selectedType,
}: {
  steps: ProductionChainStep[];
  onSelectType: (type: PartnerType | "") => void;
  selectedType: PartnerType | "";
}) {
  const bottleneck = useMemo(
    () => steps.find((step) => step.status === "unresolved") ?? steps.find((step) => step.status === "pending"),
    [steps],
  );
  const [activeStepId, setActiveStepId] = useState(() => bottleneck?.id ?? steps[0]?.id ?? "");

  useEffect(() => {
    if (selectedType) {
      const matching = steps.find((step) => step.type === selectedType);
      if (matching) setActiveStepId(matching.id);
      return;
    }
    if (!steps.some((step) => step.id === activeStepId)) {
      setActiveStepId(bottleneck?.id ?? steps[0]?.id ?? "");
    }
  }, [selectedType, steps, activeStepId, bottleneck]);

  const activeStep = steps.find((step) => step.id === activeStepId) ?? bottleneck ?? steps[0];
  const resolved = steps.filter((step) => step.status === "completed" || step.status === "optimized").length;
  const pending = steps.length - resolved;
  const progress = steps.length > 1 ? Math.max(0, Math.min(100, ((resolved - 1) / (steps.length - 1)) * 100)) : 100;

  if (!activeStep) return null;

  const ActiveIcon = icons[activeStep.label] ?? Check;
  const isBottleneck = activeStep.id === bottleneck?.id;

  const detail = (
    <SpotlightCard
      className="production-detail-card"
      spotlightColor={isBottleneck ? "rgba(212, 163, 68, 0.14)" : "rgba(79, 115, 2, 0.12)"}
    >
      <div className="production-detail-stage">
        <span className="production-detail-kicker">ETAPA {String(steps.findIndex((step) => step.id === activeStep.id) + 1).padStart(2, "0")}</span>
        <div className="production-detail-icon" data-status={activeStep.status}>
          <ActiveIcon size={23} />
        </div>
        <div>
          <h3>{activeStep.label === "Distribucion" ? "Distribución" : activeStep.label}</h3>
          <span className="production-detail-status" data-status={activeStep.status}>
            {activeStep.status === "completed" ? <Check size={12} /> : <span />}
            {statuses[activeStep.status]}
          </span>
        </div>
      </div>

      <div className="production-detail-copy">
        <span className="production-detail-label">Responsable / aliado</span>
        <strong>{activeStep.partnerName}</strong>
        <p>{activeStep.description}</p>
      </div>

      <div className="production-detail-action">
        <span>{isBottleneck ? "Acción recomendada" : "Explorar alternativas"}</span>
        <button
          onClick={() => onSelectType(activeStep.type)}
          aria-label={`Ver aliados para ${activeStep.label}`}
        >
          {isBottleneck ? "Resolver etapa" : "Ver aliados"}
          <ArrowRight size={15} />
        </button>
      </div>
    </SpotlightCard>
  );

  return (
    <section className="network-chain production-flow" aria-labelledby="network-chain-title">
      <div className="production-flow-header">
        <div>
          <p className="network-eyebrow">Mapa de operación</p>
          <h2 id="network-chain-title">Cadena productiva</h2>
          <p>Visualiza el avance de punta a punta y enfócate en la etapa que requiere atención.</p>
        </div>

        <div className="production-flow-summary" aria-label="Resumen de la cadena">
          <div>
            <strong>{resolved}/{steps.length}</strong>
            <span>resueltas</span>
          </div>
          <div data-warning={pending > 0}>
            <CircleAlert size={15} />
            <strong>{pending}</strong>
            <span>pendientes</span>
          </div>
        </div>
      </div>

      <AnimatedContent className="production-flow-board" distance={12} duration={0.42}>
        <div className="production-flow-rail-wrap">
          <div className="production-flow-rail" aria-hidden="true">
            <span className="production-flow-rail-progress" style={{ width: `${progress}%` }} />
          </div>

          <ol className="production-flow-steps">
            {steps.map((step, index) => {
              const Icon = icons[step.label] ?? Check;
              const active = step.id === activeStep.id;
              const blocked = step.id === bottleneck?.id;

              return (
                <li key={step.id} data-status={step.status} data-active={active} data-bottleneck={blocked}>
                  <button
                    type="button"
                    className="production-flow-node"
                    onClick={() => setActiveStepId(step.id)}
                    aria-pressed={active}
                    aria-label={`${step.label}: ${statuses[step.status]}`}
                  >
                    <span className="production-flow-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="production-flow-circle">
                      <Icon size={19} />
                      {step.status === "completed" && <span className="production-flow-check"><Check size={10} /></span>}
                    </span>
                    <span className="production-flow-node-copy">
                      <strong>{step.label === "Distribucion" ? "Distribución" : step.label}</strong>
                      <small>{step.partnerName}</small>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="production-flow-detail-wrap">
          {isBottleneck ? (
            <BorderGlow className="production-detail-glow" color="#d4a344" radius={16}>
              {detail}
            </BorderGlow>
          ) : detail}
        </div>
      </AnimatedContent>
    </section>
  );
}
