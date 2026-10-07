import { useState } from "react";
import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  Landmark,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatSupportDeadline, getSupportStatus } from "@/services/support-programs.service";
import type { SupportProgram } from "@/types/support-programs.types";
import { useSupportPrograms } from "./hooks/useSupportPrograms";
import "./support-programs.css";

function ProgramDetail({ program, applied, onApply }: { program: SupportProgram; applied: boolean; onApply: () => void }) {
  const [checked, setChecked] = useState<string[]>([]);
  const closed = getSupportStatus(program.deadline) === "Cerrada";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="support-detail-button" aria-label={`Ver detalles de ${program.title}`}>
          Conocer oportunidad <ArrowRight size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="support-detail max-h-[85dvh] overflow-y-auto bg-white sm:max-w-xl">
        <div className="support-detail-heading">
          <span className="support-detail-kind">{program.kind}</span>
          <DialogTitle className="pr-6 text-2xl leading-tight">{program.title}</DialogTitle>
          <DialogDescription>{program.institution}. {program.description}</DialogDescription>
        </div>
        <dl className="support-detail-facts">
          <div><dt>Beneficio</dt><dd>{program.benefit}</dd></div>
          <div><dt>Modalidad</dt><dd>{program.kind}</dd></div>
          <div><dt>Cobertura</dt><dd>{program.region}</dd></div>
          <div><dt>Cierre</dt><dd>{formatSupportDeadline(program.deadline)}</dd></div>
        </dl>
        <section className="support-detail-section">
          <h3>Condiciones del apoyo</h3>
          <p>{program.conditions}</p>
        </section>
        <fieldset className="support-requirements">
          <legend>Requisitos del expediente</legend>
          {program.requirements.map((requirement) => (
            <label key={requirement}>
              <input
                type="checkbox"
                checked={applied || checked.includes(requirement)}
                disabled={applied || closed}
                onChange={(event) => setChecked((prev) => event.target.checked ? [...prev, requirement] : prev.filter((item) => item !== requirement))}
              />
              <span>{requirement}</span>
            </label>
          ))}
        </fieldset>
        <p className="support-detail-note">Marcar los requisitos no acredita elegibilidad.</p>
        {applied ? (
          <p role="status" className="support-detail-applied"><CheckCircle2 size={20} /> Solicitud registrada</p>
        ) : (
          <button className="support-primary" disabled={closed || checked.length !== program.requirements.length} onClick={onApply}>
            <CheckCircle2 size={18} /> {closed ? "Convocatoria cerrada" : "Registrar solicitud"}
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function SupportProgramsPage() {
  const state = useSupportPrograms();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activePrograms = state.programs.filter((program) => getSupportStatus(program.deadline) !== "Cerrada").length;
  const selectedFilters = [state.source, state.kind, state.region].filter(Boolean).length;
  const tabs = [
    { id: "all", label: "Explorar", count: state.programs.length },
    { id: "saved", label: "Guardadas", count: state.progress.saved.length },
    { id: "applications", label: "Solicitudes", count: state.progress.applications.length },
  ];
  const resultsTitle = state.tab === "saved" ? "Oportunidades guardadas" : state.tab === "applications" ? "Mis solicitudes" : "Oportunidades para tu negocio";

  return (
    <div className="support-page">
      <section className="support-hero" aria-labelledby="support-page-title">
        <div className="support-hero-copy">
          <p className="support-eyebrow"><Sparkles size={14} /> Radar de oportunidades</p>
          <h1 id="support-page-title">Apoyos para mover tu siguiente paso</h1>
          <p className="support-hero-description">
            Explora financiamiento, subsidios y formación empresarial sin perder de vista fechas, requisitos y oportunidades guardadas.
          </p>
          <div className="support-hero-chips" aria-label="Tipos de oportunidades disponibles">
            <span>Subsidios</span><span>Créditos</span><span>Capacitación</span>
          </div>
        </div>

        <aside className="support-radar" aria-label="Resumen de oportunidades">
          <div className="support-radar-heading">
            <span>Tu radar</span>
            <small>Datos simulados</small>
          </div>
          <div className="support-radar-stats">
            <div><Landmark size={19} /><span><strong>{activePrograms}</strong><small>vigentes</small></span></div>
            <div><Bookmark size={19} /><span><strong>{state.progress.saved.length}</strong><small>guardadas</small></span></div>
            <div><CheckCircle2 size={19} /><span><strong>{state.progress.applications.length}</strong><small>solicitudes</small></span></div>
          </div>
          <p>Centraliza oportunidades y prepara tu expediente desde un mismo lugar.</p>
        </aside>
      </section>

      {state.storageWarning && (
        <p role="status" className="support-storage-warning">
          El navegador no permite guardar el progreso. Los cambios se conservarán solo mientras permanezcas en este módulo.
        </p>
      )}

      <section className="support-explorer" aria-label="Explorar convocatorias">
        <div className="support-explorer-top">
          <div className="support-tabs" role="group" aria-label="Vista de oportunidades">
            {tabs.map((tab) => (
              <button key={tab.id} aria-pressed={state.tab === tab.id} onClick={() => state.setTab(tab.id)}>
                {tab.label}<span>{tab.count}</span>
              </button>
            ))}
          </div>
          <label className="support-open-toggle">
            <input type="checkbox" checked={state.openOnly} onChange={(event) => state.setOpenOnly(event.target.checked)} />
            <span>Solo vigentes</span>
          </label>
        </div>

        <div className="support-search-row">
          <label className="support-search">
            <Search size={18} />
            <input
              type="search"
              aria-label="Buscar convocatoria"
              placeholder="Buscar programa, institución o sector"
              value={state.query}
              onChange={(event) => state.setQuery(event.target.value)}
            />
          </label>
          <button
            type="button"
            className="support-filter-toggle"
            aria-expanded={filtersOpen}
            aria-controls="support-advanced-filters"
            onClick={() => setFiltersOpen((current) => !current)}
          >
            <SlidersHorizontal size={16} /> Filtros
            {selectedFilters > 0 && <span>{selectedFilters}</span>}
            <ChevronDown size={15} className={filtersOpen ? "rotate-180" : ""} />
          </button>
        </div>

        {filtersOpen && (
          <div id="support-advanced-filters" className="support-filters">
            <label>Institución<select value={state.source} onChange={(event) => state.setSource(event.target.value)}><option value="">Todas</option>{["Gobierno", "Banco", "Empresa privada"].map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Tipo de apoyo<select value={state.kind} onChange={(event) => state.setKind(event.target.value)}><option value="">Todos</option>{["Subsidio", "Crédito", "Capacitación"].map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Ubicación<select value={state.region} onChange={(event) => state.setRegion(event.target.value)}><option value="">Todas</option>{["Yucatán", "Jalisco", "Ciudad de México", "Nacional"].map((item) => <option key={item}>{item}</option>)}</select></label>
            <button type="button" className="support-clear" onClick={state.clearFilters}>Limpiar filtros</button>
          </div>
        )}
      </section>

      <div className="support-results">
        <div>
          <p className="support-eyebrow">Explorar</p>
          <h2>{resultsTitle}</h2>
          <span aria-live="polite">{state.filtered.length} {state.filtered.length === 1 ? "oportunidad encontrada" : "oportunidades encontradas"}</span>
        </div>
        <label>Ordenar por<select value={state.sort} onChange={(event) => state.setSort(event.target.value)}><option value="deadline">Próximo cierre</option><option value="name">Nombre</option></select></label>
      </div>

      <div className="support-grid">
        {state.filtered.map((program) => {
          const saved = state.progress.saved.includes(program.id);
          const applied = state.progress.applications.includes(program.id);
          const status = getSupportStatus(program.deadline);
          const Icon = program.kind === "Capacitación" ? GraduationCap : program.kind === "Crédito" ? Wallet : Landmark;
          const sourceTone = program.source === "Gobierno" ? "public" : program.source === "Banco" ? "bank" : "private";

          return (
            <article key={program.id} className="support-card" data-source={sourceTone}>
              <div className="support-card-top">
                <span className={`support-icon support-icon-${sourceTone}`}><Icon size={21} /></span>
                <div className="support-card-origin">
                  <span>{program.source}</span>
                  <strong>{program.institution}</strong>
                </div>
                <button
                  className="support-save"
                  aria-label={`${saved ? "Quitar de guardadas" : "Guardar"}: ${program.title}`}
                  title={saved ? "Quitar de guardadas" : "Guardar convocatoria"}
                  aria-pressed={saved}
                  onClick={() => state.toggleSaved(program.id)}
                >
                  <Bookmark size={19} fill={saved ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="support-card-heading">
                <span className={`support-status ${status === "Por cerrar" ? "support-urgent" : status === "Cerrada" ? "support-closed" : ""}`}>{status}</span>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
              </div>

              <div className="support-benefit">
                <span>{program.kind}</span>
                <strong>{program.benefit}</strong>
              </div>

              <div className="support-card-meta">
                <span><MapPin size={14} /> {program.region}</span>
                <span>{program.sector}</span>
              </div>

              <div className="support-card-footer">
                <div className="support-deadline">
                  <small>Cierre</small>
                  <strong>{formatSupportDeadline(program.deadline)}</strong>
                </div>
                {applied && <p className="support-applied"><CheckCircle2 size={14} /> Registrada</p>}
              </div>

              <ProgramDetail program={program} applied={applied} onApply={() => state.apply(program.id)} />
            </article>
          );
        })}
      </div>

      {!state.filtered.length && (
        <div className="support-empty">
          <span><Search size={28} /></span>
          <h2>No hay oportunidades en esta vista</h2>
          <p>{state.tab === "saved" ? "Todavía no hay convocatorias guardadas que coincidan con tus filtros." : state.tab === "applications" ? "No hay solicitudes que coincidan con tus filtros." : "No se encontraron convocatorias con los filtros seleccionados."}</p>
          <button className="support-primary" onClick={() => { state.clearFilters(); state.setTab("all"); }}>Explorar convocatorias</button>
        </div>
      )}
    </div>
  );
}
