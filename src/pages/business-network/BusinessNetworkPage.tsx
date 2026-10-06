import { useRef, useState } from "react";
import { ArrowRight, ChevronDown, FileText, GitBranch, LayoutDashboard, Lightbulb, Network, Pencil, Truck, Users } from "lucide-react";
import PageIntro from "@/components/common/PageIntro";
import NetworkAssistantPanel from "./components/NetworkAssistantPanel";
import NetworkProjectBuilder from "./components/NetworkProjectBuilder";
import NetworkSuggestionsPanel from "./components/NetworkSuggestionsPanel";
import NetworkSummaryBar from "./components/NetworkSummaryBar";
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
  const [view, setView] = useState("overview");
  const [partnerType, setPartnerType] = useState<PartnerType | "">("");
  const partnersSection = useRef<HTMLDivElement>(null);
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
  function resetWorkspace() { setView("overview"); setEditing(false); setPartnerType(""); }
  const views = [{ id: "overview", label: "Panorama", icon: LayoutDashboard }, { id: "processes", label: "Procesos", icon: GitBranch }, { id: "partners", label: "Aliados", icon: Users }, { id: "analysis", label: "Análisis", icon: Lightbulb }];

  return (
    <div className="network-page">
      <PageIntro title="Red de negocios" description="Planteamientos, procesos y alianzas para desarrollar tus negocios." />
      <NetworkPlanLauncher plans={plans} activeId={activeId} onSelect={(id) => { selectPlan(id); resetWorkspace(); }} onCreate={(data) => { addPlan(data); resetWorkspace(); }} />
      {storageWarning && <p role="status" className="network-storage-warning">Los cambios se conservan durante esta sesión. El navegador no permite guardarlos al cerrar.</p>}
      {isLoading || !project ? (
        <p role="status" className="py-8 text-sm text-[#42493f]">Cargando red de negocios...</p>
      ) : (
        <section className="network-development" aria-label={`Desarrollo de ${project.title}`}>
          <div className="network-development-heading"><div><p className="network-eyebrow">DESARROLLO DEL NEGOCIO</p><h2>{project.title}</h2></div><span className="network-development-status">{project.status === "draft" ? "Borrador" : "En desarrollo"}</span></div>
          <div className="network-development-tabs" role="group" aria-label="Vistas del planteamiento">
            {views.map(({ id, label, icon: Icon }) => <button key={id} aria-pressed={view === id} onClick={() => setView(id)}><Icon size={16} />{label}{id === "partners" && <span>{partners.length}</span>}</button>)}
          </div>
          <div key={activeId} className="network-development-content">
          {view === "overview" && <>
          <section className="network-project" aria-labelledby="network-project-title">
            <div className="network-project-heading">
              <div><p className="network-eyebrow"><Network size={14} /> Definición del negocio</p><h2 id="network-project-title">Objetivo y alcance</h2></div>
              <button className="network-edit" aria-expanded={editing} aria-controls="network-project-editor" onClick={() => setEditing(!editing)}>
                <Pencil size={15} /> Editar proyecto <ChevronDown size={15} className={editing ? "rotate-180" : ""} />
              </button>
            </div>
            <p className="network-project-objective">{project.description}</p>
            <dl className="network-project-facts">
              <div><dt>Volumen</dt><dd>{project.quantity.toLocaleString("es-MX")} unidades</dd></div>
              <div><dt>Categoría</dt><dd>{project.category}</dd></div>
              <div><dt>Destino</dt><dd>{project.targetLocation}</dd></div>
              <div><dt>Presupuesto</dt><dd>{money.format(project.budgetMin)} – {money.format(project.budgetMax)}</dd></div>
            </dl>
            <div id="network-project-editor" hidden={!editing}>
              <NetworkProjectBuilder input={builderInput} isAnalyzing={isAnalyzing} onChange={updateBuilderInput} onAnalyze={analyzeProject} />
            </div>
            {summary && <NetworkSummaryBar summary={summary} connectedCount={connectedCount} totalCount={partners.length} />}
          </section>
          </>}
          {(view === "overview" || view === "processes") && (chainSteps.length ? <ProductionChainVisualization steps={chainSteps} onSelectType={showPartners} selectedType={partnerType} /> : <div className="network-draft-empty"><GitBranch size={28} /><h3>Procesos por definir</h3><p>Este planteamiento todavía no tiene una cadena operativa ni aliados asignados.</p><button className="network-edit" onClick={() => { setView("overview"); setEditing(true); }}>Revisar datos del planteamiento</button></div>)}
          {(view === "overview" || view === "processes") && nextStep && <div className="network-next-action">
            <span className="network-next-icon"><Truck size={21} /></span>
            <div><p>Siguiente paso · {nextStep.label === "Distribucion" ? "Distribución" : nextStep.label}</p><strong>{nextStep.description}</strong></div>
            <button onClick={() => showPartners(nextStep.type)}>Encontrar aliado <ArrowRight size={16} /></button>
          </div>}
          {(view === "overview" || view === "partners" || view === "analysis") && <div className={`network-workspace ${view !== "overview" || !partners.length ? "network-workspace-single" : ""}`}>
            {(view === "overview" || view === "partners") && <div ref={partnersSection} tabIndex={-1} className="network-partners-section">
              {partners.length ?
              <RecommendedBusinessCards partners={partners} onConnect={connectPartner} typeFilter={partnerType} onTypeChange={setPartnerType} />
              : view === "partners" && <div className="network-draft-empty"><Users size={28} /><h3>Sin aliados asignados</h3><p>Las conexiones de este negocio aparecerán aquí.</p></div>}
            </div>}
            {(view === "analysis" || (view === "overview" && partners.length > 0)) && <aside className="network-insights" aria-label="Análisis y recomendaciones">
              {partners.length > 0 &&
              <section className="network-coverage" aria-label="Conexiones de la red">
                <p className="network-eyebrow">Conexiones de la red</p>
                <div><strong>{connectedCount}<small> / {partners.length}</small></strong><Network size={26} /></div>
                <progress max={partners.length || 1} value={connectedCount} aria-label="Aliados conectados" />
                <p>{partners.length - connectedCount} aliados por conectar</p>
              </section>}
              {suggestions.length > 0 && <NetworkSuggestionsPanel suggestions={suggestions} />}
              {messages.length > 0 ? <NetworkAssistantPanel key={`${activeId}-${view}`} messages={messages} defaultOpen={view === "analysis"} /> : <div className="network-draft-empty"><FileText size={28} /><h3>Análisis pendiente</h3><p>No hay observaciones registradas para este planteamiento.</p></div>}
            </aside>}
          </div>}
          </div>
        </section>
      )}
    </div>
  );
}
