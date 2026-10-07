import { type CSSProperties, useEffect, useMemo, useState } from "react";
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
  const backgroundColumns = Math.max(9, steps.length + 3);

  const backgroundHexes = useMemo(() => {
    return Array.from({ length: backgroundColumns }, (_, columnIndex) => {
      const column = columnIndex + 1;
      const rows = column % 2 === 0 ? [1, 3] : [2];
      return rows.map((row) => ({ id: `bg-${column}-${row}`, column, row }));
    }).flat();
  }, [backgroundColumns]);

  if (!activeStep) return null;

  const ActiveIcon = icons[activeStep.label] ?? Check;
  const isBottleneck = activeStep.id === bottleneck?.id;
  const activeIndex = steps.findIndex((step) => step.id === activeStep.id);
  const gridStyle = {
    gridTemplateColumns: `repeat(${backgroundColumns}, var(--hex-step-x))`,
  } as CSSProperties;

  const detail = (
    <SpotlightCard
      className="production-detail-card"
      spotlightColor={isBottleneck ? "rgba(212, 163, 68, 0.14)" : "rgba(79, 115, 2, 0.12)"}
    >
      <div className="production-detail-stage">
        <span className="production-detail-kicker">ETAPA {String(activeIndex + 1).padStart(2, "0")}</span>
        <div className="production-detail-icon" data-status={activeStep.status}>
          <ActiveIcon size={19} />
        </div>
        <div>
          <h3>{activeStep.label === "Distribucion" ? "Distribución" : activeStep.label}</h3>
          <span className="production-detail-status" data-status={activeStep.status}>
            {activeStep.status === "completed" ? <Check size={11} /> : <span />}
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
          <p>El recorrido hexagonal representa la secuencia de actores que completa la operación.</p>
        </div>

        <div
          className="production-flow-summary"
          aria-label={`${resolved} de ${steps.length} etapas resueltas, ${pending} pendientes`}
        >
          <div className="production-summary-progress">
            <span>Avance</span>
            <strong>{resolved}/{steps.length}</strong>
            <span className="production-summary-mini-track" aria-hidden="true">
              <span style={{ width: `${steps.length ? (resolved / steps.length) * 100 : 0}%` }} />
            </span>
          </div>
          <span className="production-summary-divider" aria-hidden="true" />
          <div className="production-summary-pending" data-warning={pending > 0}>
            <CircleAlert size={13} />
            <strong>{pending}</strong>
            <span>{pending === 1 ? "pendiente" : "pendientes"}</span>
          </div>
        </div>
      </div>

      <AnimatedContent className="production-flow-board" distance={10} duration={0.4}>
        <div className="production-honeycomb-viewport">
          <div className="production-honeycomb-scene">
            <div className="production-honeycomb-background" style={gridStyle} aria-hidden="true">
              {backgroundHexes.map((cell) => (
                <span
                  key={cell.id}
                  className="production-bg-hex"
                  style={{ gridColumnStart: cell.column, gridRowStart: cell.row }}
                />
              ))}
            </div>

            <ol
              className="production-honeycomb"
              style={gridStyle}
              aria-label="Flujo de etapas de la cadena productiva"
            >
              {steps.map((step, index) => {
                const Icon = icons[step.label] ?? Check;
                const active = step.id === activeStep.id;
                const blocked = step.id === bottleneck?.id;
                const column = index + 2;
                const row = column % 2 === 0 ? 1 : 2;

                return (
                  <li
                    key={step.id}
                    className="production-honeycomb-item"
                    data-status={step.status}
                    data-active={active}
                    data-bottleneck={blocked}
                    style={{ gridColumnStart: column, gridRowStart: row }}
                  >
                    <button
                      type="button"
                      className="production-hex"
                      onClick={() => setActiveStepId(step.id)}
                      aria-pressed={active}
                      aria-label={`Etapa ${index + 1}, ${step.label}, ${statuses[step.status]}, ${step.partnerName}`}
                    >
                      <span className="production-hex-index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="production-hex-icon"><Icon size={22} /></span>
                      <strong>{step.label === "Distribucion" ? "Distribución" : step.label}</strong>
                      <small>{step.partnerName}</small>
                      <span className="production-hex-status">
                        {step.status === "completed" && <Check size={10} />}
                        {statuses[step.status]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="production-flow-direction" aria-hidden="true">
            <span>Inicio</span>
            <span className="production-flow-direction-line" />
            <ArrowRight size={13} />
            <span>Resultado</span>
          </div>
        </div>

        <div className="production-flow-detail-wrap">
          {isBottleneck ? (
            <BorderGlow className="production-detail-glow" color="#d4a344" radius={12}>
              {detail}
            </BorderGlow>
          ) : detail}
        </div>
      </AnimatedContent>
    </section>
  );
}
