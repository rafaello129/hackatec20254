import { useState } from "react";
import { ArrowRight, Bookmark, CheckCircle2, Landmark, MapPin, Search, SlidersHorizontal, Wallet, GraduationCap } from "lucide-react";
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
      <DialogTrigger asChild><button className="support-detail-button" aria-label={`Ver detalles de ${program.title}`}>Ver detalles <ArrowRight size={16} /></button></DialogTrigger>
      <DialogContent className="support-detail max-h-[85dvh] overflow-y-auto bg-white sm:max-w-xl">
        <span className="support-demo-label">Convocatoria ficticia</span>
        <DialogTitle className="pr-6 text-2xl leading-tight">{program.title}</DialogTitle>
        <DialogDescription>{program.institution}. {program.description}</DialogDescription>
        <dl className="support-detail-facts">
          <div><dt>Beneficio</dt><dd>{program.benefit}</dd></div>
          <div><dt>Modalidad</dt><dd>{program.kind}</dd></div>
          <div><dt>Cobertura</dt><dd>{program.region}</dd></div>
          <div><dt>Cierre</dt><dd>{formatSupportDeadline(program.deadline)}</dd></div>
        </dl>
        <section><h3 className="font-semibold">Condiciones del apoyo</h3><p className="mt-2 text-sm leading-relaxed text-[#42493f]">{program.conditions}</p></section>
        <fieldset className="space-y-3 border-t border-[#e2e3dc] pt-4">
          <legend className="font-semibold">Requisitos del expediente</legend>
          {program.requirements.map((requirement) => (
            <label key={requirement} className="flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1 accent-[#4f7302]" checked={applied || checked.includes(requirement)} disabled={applied || closed}
                onChange={(event) => setChecked((prev) => event.target.checked ? [...prev, requirement] : prev.filter((item) => item !== requirement))} />
              {requirement}
            </label>
          ))}
        </fieldset>
        <p className="text-xs leading-relaxed text-[#42493f]">Simulación local: no se envían datos, no se adjuntan documentos ni se solicita financiamiento real. Marcar los requisitos no acredita elegibilidad.</p>
        {applied ? <p role="status" className="flex items-center gap-2 font-medium text-[#4f7302]"><CheckCircle2 size={20} /> Solicitud simulada registrada</p> : (
          <button className="support-primary" disabled={closed || checked.length !== program.requirements.length} onClick={onApply}>
            <CheckCircle2 size={18} /> {closed ? "Convocatoria cerrada" : "Simular solicitud"}
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function SupportProgramsPage() {
  const state = useSupportPrograms();
  const tabs = [{ id: "all", label: "Explorar", count: state.programs.length }, { id: "saved", label: "Guardadas", count: state.progress.saved.length }, { id: "applications", label: "Mis solicitudes", count: state.progress.applications.length }];
  return (
    <div className="support-page">
      <header className="support-heading">
        <div><h1>Apoyos y convocatorias</h1><p>Financiamiento, subsidios y formación empresarial</p></div>
        <span className="support-demo-label">Datos de demostración</span>
      </header>
      <div className="support-notice"><Landmark size={20} /><p>Instituciones, montos y convocatorias ficticios. Fecha de referencia: <strong>6 de octubre de 2026.</strong></p></div>
      {state.storageWarning && <p role="status">El navegador no permite guardar el progreso. Los cambios se conservarán solo mientras permanezcas en este módulo.</p>}
      <div className="support-stats">
        <div><Landmark size={21} /><span>Convocatorias vigentes<strong>{state.programs.filter((p) => getSupportStatus(p.deadline) !== "Cerrada").length}</strong></span></div>
        <div><Bookmark size={21} /><span>Oportunidades guardadas<strong>{state.progress.saved.length}</strong></span></div>
        <div><CheckCircle2 size={21} /><span>Solicitudes simuladas<strong>{state.progress.applications.length}</strong></span></div>
      </div>
      <div className="support-tabs" role="group" aria-label="Vista de oportunidades">
        {tabs.map((tab) => <button key={tab.id} aria-pressed={state.tab === tab.id} onClick={() => state.setTab(tab.id)}>{tab.label}<span>{tab.count}</span></button>)}
      </div>
      <section className="support-filters" aria-label="Filtros de convocatorias">
        <label className="support-search"><span>Buscar convocatoria</span><div><Search size={18} /><input type="search" placeholder="Programa, institución o sector" value={state.query} onChange={(e) => state.setQuery(e.target.value)} /></div></label>
        <label>Institución<select value={state.source} onChange={(e) => state.setSource(e.target.value)}><option value="">Todas las instituciones</option>{["Gobierno", "Banco", "Empresa privada"].map((x) => <option key={x}>{x}</option>)}</select></label>
        <label>Tipo de apoyo<select value={state.kind} onChange={(e) => state.setKind(e.target.value)}><option value="">Todos los apoyos</option>{["Subsidio", "Crédito", "Capacitación"].map((x) => <option key={x}>{x}</option>)}</select></label>
        <label>Ubicación<select value={state.region} onChange={(e) => state.setRegion(e.target.value)}><option value="">Todas las ubicaciones</option>{["Yucatán", "Jalisco", "Ciudad de México", "Nacional"].map((x) => <option key={x}>{x}</option>)}</select></label>
        <div className="support-filter-bottom"><label><input type="checkbox" checked={state.openOnly} onChange={(e) => state.setOpenOnly(e.target.checked)} /> Solo vigentes</label><button onClick={state.clearFilters}><SlidersHorizontal size={15} /> Limpiar filtros</button></div>
      </section>
      <div className="support-results"><p aria-live="polite">{state.filtered.length} {state.filtered.length === 1 ? "oportunidad" : "oportunidades"}</p><label>Ordenar por<select value={state.sort} onChange={(e) => state.setSort(e.target.value)}><option value="deadline">Próximo cierre</option><option value="name">Nombre</option></select></label></div>
      <div className="support-grid">
        {state.filtered.map((program) => {
          const saved = state.progress.saved.includes(program.id);
          const applied = state.progress.applications.includes(program.id);
          const status = getSupportStatus(program.deadline);
          const Icon = program.kind === "Capacitación" ? GraduationCap : program.kind === "Crédito" ? Wallet : Landmark;
          return (
            <article key={program.id} className="support-card">
              <div className="support-card-top"><span className={`support-icon support-icon-${program.source === "Gobierno" ? "public" : program.source === "Banco" ? "bank" : "private"}`}><Icon size={22} /></span><span className="support-source">{program.source}</span><button className="support-save" aria-label={`${saved ? "Quitar de guardadas" : "Guardar"}: ${program.title}`} title={saved ? "Quitar de guardadas" : "Guardar convocatoria"} aria-pressed={saved} onClick={() => state.toggleSaved(program.id)}><Bookmark size={19} fill={saved ? "currentColor" : "none"} /></button></div>
              <p className="support-institution">{program.institution}</p>
              <h2>{program.title}</h2>
              <p className="support-description">{program.description}</p>
              <div className="support-benefit"><span>{program.kind}</span><strong>{program.benefit}</strong></div>
              <div className="support-location"><MapPin size={15} /><span>{program.region} · {program.sector}</span></div>
              <div className="support-deadline"><span className={`support-status ${status === "Por cerrar" ? "support-urgent" : status === "Cerrada" ? "support-closed" : ""}`}>{status}</span><span>{formatSupportDeadline(program.deadline)}</span></div>
              {applied && <p className="support-applied"><CheckCircle2 size={15} /> Solicitud simulada registrada</p>}
              <ProgramDetail program={program} applied={applied} onApply={() => state.apply(program.id)} />
            </article>
          );
        })}
      </div>
      {!state.filtered.length && <div className="support-empty"><Search size={30} /><h2>No hay oportunidades en esta vista</h2><p>{state.tab === "saved" ? "Todavía no hay convocatorias guardadas que coincidan con tus filtros." : state.tab === "applications" ? "No hay solicitudes simuladas que coincidan con tus filtros." : "No se encontraron convocatorias con los filtros seleccionados."}</p><button className="support-primary" onClick={() => { state.clearFilters(); state.setTab("all"); }}>Explorar convocatorias</button></div>}
    </div>
  );
}
