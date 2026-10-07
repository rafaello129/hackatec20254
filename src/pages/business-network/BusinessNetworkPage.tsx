import { useRef, useState } from "react";
import { ArrowRight, ChevronDown, Clock3, FileText, GitBranch, LayoutDashboard, Lightbulb, Network, Pencil, TrendingDown, Truck, Users, Wallet } from "lucide-react";
import AnimatedContent from "@/components/react-bits/AnimatedContent";
import DotGrid from "@/components/react-bits/DotGrid";
import FadeContent from "@/components/react-bits/FadeContent";
import GlareHover from "@/components/react-bits/GlareHover";
import PillNav from "@/components/react-bits/PillNav";
import NetworkAssistantPanel from "./components/NetworkAssistantPanel";
import NetworkProjectBuilder from "./components/NetworkProjectBuilder";
import NetworkSuggestionsPanel from "./components/NetworkSuggestionsPanel";
import ProductionChainVisualization from "./components/ProductionChainVisualization";
import RecommendedBusinessCards from "./components/RecommendedBusinessCards";
import NetworkPlanLauncher from "./components/NetworkPlanLauncher";
import { useBusinessNetwork } from "./hooks/useBusinessNetwork";
import type { PartnerType } from "@/types/businessNetwork.types";
import "./business-network.css";

const money = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

export default function BusinessNetworkPage() {
  const { isLoading, isAnalyzing, project, partners, chainSteps, suggestions, messages, summary,
    builderInput, updateBuilderInput, analyzeProject, connectPartner, plans, activeId, selectPlan, addPlan, storageWarning } = useBusinessNetwork();
  const [editing, setEditing] = useState(false);
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [view, setView] = useState("overview");
  const [partnerType, setPartnerType] = useState<PartnerType | "">("");
  const partnersSection = useRef<HTMLDivElement>(null);
  const developmentSection = useRef<HTMLElement>(null);
  const connectedCount = partners.filter((partner) => partner.connected).length;
  const nextStep = chainSteps.find((step) => step.status === "unresolved") ?? chainSteps.find((step) => step.status === "pending");

  function showPartners(type: PartnerType | "") {
    setPartnerType(type);
    setView("partners");
    requestAnimationFrame(() => {
      partnersSection.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      partnersSection.current?.focus({ preventScroll: true });
    });
  }

  function handleConnectPartner(partnerId: string) {
    connectPartner(partnerId);
    setPartnerType("");
    setView("overview");
    requestAnimationFrame(() => developmentSection.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function resetWorkspace() {
    setView("overview");
    setEditing(false);
    setMetricsOpen(false);
    setPartnerType("");
  }

  const views = [
    { id: "overview", label: "Panorama", icon: <LayoutDashboard size={15} /> },
    { id: "processes", label: "Procesos", icon: <GitBranch size={15} /> },
    { id: "partners", label: "Aliados", icon: <Users size={15} />, badge: partners.length },
    { id: "analysis", label: "Análisis", icon: <Lightbulb size={15} /> },
  ];

  const statusLabel = !project ? "" : project.status === "draft" ? "Borrador" : project.status === "ready" ? "Red lista" : project.status === "optimized" ? "Optimizado" : "En desarrollo";

  return (
    <div className="network-page">
      <section className="network-hero network-hero-compact" aria-labelledby="network-page-title">
        <DotGrid className="network-hero-grid" dotColor="#b8c6ad" activeColor="#799833" spacing={28} />
        <AnimatedContent className="network-hero-content" distance={12} duration={0.46}>
          <p className="network-hero-eyebrow"><Network size={14} /> Inteligencia de red empresarial</p>
          <h1 id="network-page-title">Red de negocios</h1>
          <p>Convierte un objetivo empresarial en procesos, aliados y oportunidades coordinadas.</p>
        </AnimatedContent>
        <AnimatedContent className="network-hero-signal network-hero-signal-compact" direction="horizontal" reverse distance={14} duration={0.44} delay={0.08}>
          <span><span className="network-live-dot" /> Red activa</span>
          <strong>{plans.length}</strong>
          <small>{plans.length === 1 ? "planteamiento" : "planteamientos"}</small>
        </AnimatedContent>
      </section>

      <AnimatedContent distance={12} duration={0.42} delay={0.04}>
        <NetworkPlanLauncher plans={plans} activeId={activeId} onSelect={(id) => { selectPlan(id); resetWorkspace(); }} onCreate={(data) => { addPlan(data); resetWorkspace(); }} />
      </AnimatedContent>

      {storageWarning && <p role="status" className="network-storage-warning">Los cambios se conservan durante esta sesión. El navegador no permite guardarlos al cerrar.</p>}

      {isLoading || !project ? (
        <p role="status" className="py-8 text-sm text-[#42493f]">Cargando red de negocios...</p>
      ) : (
        <section ref={developmentSection} className="network-development network-development-compact" aria-label={`Desarrollo de ${project.title}`}>
          <div className="network-development-toolbar network-development-toolbar-condensed">
            <AnimatedContent className="network-development-heading network-development-heading-compact" distance={10} duration={0.38}>
              <div className="network-active-project-line">
                <h2>{project.title}</h2>
                <span className="network-development-status" data-status={project.status}>{statusLabel}</span>
              </div>
            </AnimatedContent>
            <PillNav items={views} activeId={view} onChange={setView} ariaLabel="Vistas del planteamiento" />
          </div>

          <FadeContent key={`${activeId}-${view}`} className="network-development-content" duration={0.24} distance={6}>
            {view === "overview" && (
              <section className="network-project network-project-snapshot" aria-label="Resumen del planteamiento">
                <div className="network-project-snapshot-main">
                  <div className="network-project-snapshot-copy">
                    <div className="network-project-snapshot-heading">
                      <p className="network-eyebrow"><Network size={13} /> Business brief</p>
                      <button className="network-edit network-edit-compact" aria-expanded={editing} aria-controls="network-project-editor" onClick={() => setEditing(!editing)}>
                        <Pencil size={13} /> Editar <ChevronDown size={13} className={editing ? "rotate-180" : ""} />
                      </button>
                    </div>
                    <p className="network-project-snapshot-objective">{project.description}</p>
                  </div>

                  <dl className="network-project-chip-grid" aria-label="Datos principales del planteamiento">
                    <div><dt>Volumen</dt><dd>{project.quantity.toLocaleString("es-MX")} <small>uds.</small></dd></div>
                    <div><dt>Categoría</dt><dd>{project.category}</dd></div>
                    <div><dt>Destino</dt><dd>{project.targetLocation}</dd></div>
                    <div><dt>Presupuesto</dt><dd>{money.format(project.budgetMin)} – {money.format(project.budgetMax)}</dd></div>
                  </dl>
                </div>

                {summary && (
                  <div className="network-project-snapshot-footer">
                    <div className="network-project-primary-metrics" aria-label="Indicadores principales">
                      <div>
                        <span className="network-project-metric-icon"><Wallet size={15} /></span>
                        <span><small>Costo estimado</small><strong>{money.format(summary.optimizedCost)}</strong></span>
                      </div>
                      <div>
                        <span className="network-project-metric-icon"><Users size={15} /></span>
                        <span><small>Aliados conectados</small><strong>{connectedCount} <em>/ {partners.length}</em></strong></span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="network-project-more"
                      aria-expanded={metricsOpen}
                      aria-controls="network-project-secondary-metrics"
                      onClick={() => setMetricsOpen((current) => !current)}
                    >
                      {metricsOpen ? "Ocultar métricas" : "Ver métricas"}
                      <ChevronDown size={14} className={metricsOpen ? "rotate-180" : ""} />
                    </button>
                  </div>
                )}

                {summary && metricsOpen && (
                  <div id="network-project-secondary-metrics" className="network-project-secondary-metrics">
                    <div>
                      <TrendingDown size={16} />
                      <span><small>Ahorro estimado</small><strong>{money.format(summary.originalCost - summary.optimizedCost)}</strong><em>vs. {money.format(summary.originalCost)}</em></span>
                    </div>
                    <div>
                      <Clock3 size={16} />
                      <span><small>Tiempo de producción</small><strong>{summary.estimatedLeadTime}</strong><em>estimación de la red</em></span>
                    </div>
                  </div>
                )}

                <div id="network-project-editor" hidden={!editing} className="network-project-editor network-project-editor-collapsible">
                  <NetworkProjectBuilder input={builderInput} isAnalyzing={isAnalyzing} onChange={updateBuilderInput} onAnalyze={analyzeProject} />
                </div>
              </section>
            )}

            {(view === "overview" || view === "processes") && (
              chainSteps.length
                ? <ProductionChainVisualization steps={chainSteps} onSelectType={showPartners} selectedType={partnerType} />
                : <div className="network-draft-empty"><GitBranch size={28} /><h3>Procesos por definir</h3><p>Este planteamiento todavía no tiene una cadena operativa ni aliados asignados.</p><button className="network-edit" onClick={() => { setView("overview"); setEditing(true); }}>Revisar datos del planteamiento</button></div>
            )}

            {(view === "overview" || view === "processes") && nextStep && (
              <div className="network-next-action">
                <span className="network-next-icon"><Truck size={21} /></span>
                <div><p>Siguiente paso · {nextStep.label === "Distribucion" ? "Distribución" : nextStep.label}</p><strong>{nextStep.description}</strong></div>
                <GlareHover className="network-next-glare" width="max-content" borderRadius="8px" glareOpacity={0.24} transitionDuration={560}>
                  <button onClick={() => showPartners(nextStep.type)}>Encontrar aliado <ArrowRight size={16} /></button>
                </GlareHover>
              </div>
            )}

            {(view === "overview" || view === "partners" || view === "analysis") && (
              <div className={`network-workspace ${view !== "overview" || !partners.length ? "network-workspace-single" : ""}`}>
                {(view === "overview" || view === "partners") && (
                  <div ref={partnersSection} tabIndex={-1} className="network-partners-section">
                    {partners.length
                      ? <RecommendedBusinessCards partners={partners} onConnect={handleConnectPartner} typeFilter={partnerType} onTypeChange={setPartnerType} />
                      : view === "partners" && <div className="network-draft-empty"><Users size={28} /><h3>Sin aliados asignados</h3><p>Las conexiones de este negocio aparecerán aquí.</p></div>}
                  </div>
                )}

                {(view === "analysis" || (view === "overview" && partners.length > 0)) && (
                  <aside className="network-insights" aria-label="Análisis y recomendaciones">
                    {partners.length > 0 && (
                      <section className="network-coverage" aria-label="Conexiones de la red">
                        <p className="network-eyebrow">Conexiones de la red</p>
                        <div><strong>{connectedCount}<small> / {partners.length}</small></strong><Network size={26} /></div>
                        <progress max={partners.length || 1} value={connectedCount} aria-label="Aliados conectados" />
                        <p>{partners.length - connectedCount} aliados por conectar</p>
                      </section>
                    )}
                    {suggestions.length > 0 && <NetworkSuggestionsPanel suggestions={suggestions} />}
                    {messages.length > 0
                      ? <NetworkAssistantPanel key={`${activeId}-${view}`} messages={messages} defaultOpen={view === "analysis"} />
                      : <div className="network-draft-empty"><FileText size={28} /><h3>Análisis pendiente</h3><p>No hay observaciones registradas para este planteamiento.</p></div>}
                  </aside>
                )}
              </div>
            )}
          </FadeContent>
        </section>
      )}
    </div>
  );
}
