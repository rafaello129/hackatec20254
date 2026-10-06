import { useState } from "react";
import { ArrowUpRight, FileText, Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { NetworkPlan } from "@/services/businessNetwork.service";
import type { NetworkProject } from "@/types/businessNetwork.types";

export default function NetworkPlanLauncher({ plans, activeId, onSelect, onCreate }: {
  plans: NetworkPlan[]; activeId: string; onSelect: (id: string) => void;
  onCreate: (project: Omit<NetworkProject, "id" | "status">) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const visible = plans.filter((plan) => plan.project.title.toLocaleLowerCase("es").includes(query.trim().toLocaleLowerCase("es")));
  return (
    <section className="network-launcher" aria-label="Inicio de planteamientos">
      <div className="network-launcher-intro">
        <span className="network-eyebrow">ESPACIO DE TRABAJO</span>
        <h2>Tus planteamientos</h2>
        <p>{plans.length} {plans.length === 1 ? "planteamiento" : "planteamientos"} de negocio</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><button className="network-primary"><Plus size={16} /> Nuevo planteamiento</button></DialogTrigger>
          <DialogContent className="network-create-dialog max-h-[85dvh] overflow-y-auto bg-white sm:max-w-xl">
            <DialogTitle>Nuevo planteamiento</DialogTitle>
            <DialogDescription>Datos iniciales del negocio</DialogDescription>
            <form onSubmit={(event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const values = new FormData(form);
              const objective = form.elements.namedItem("description") as HTMLTextAreaElement;
              objective.setCustomValidity(objective.value.trim() ? "" : "Escribe el objetivo del negocio.");
              const minimum = Number(values.get("minimum"));
              const maximum = Number(values.get("maximum"));
              const maxInput = form.elements.namedItem("maximum") as HTMLInputElement;
              maxInput.setCustomValidity(maximum < minimum ? "El máximo debe ser igual o mayor al mínimo." : "");
              if (!form.reportValidity()) return;
              onCreate({ title: String(values.get("title")).trim(), description: String(values.get("description")).trim(), category: String(values.get("category")).trim(),
                targetLocation: String(values.get("location")).trim(), quantity: Number(values.get("quantity")), budgetMin: minimum, budgetMax: maximum });
              setOpen(false);
            }}>
              <label>Nombre del planteamiento<input autoFocus name="title" required maxLength={120} pattern=".*\S.*" placeholder="Ej. Servicio de entregas locales" /></label>
              <label>Objetivo<textarea name="description" required maxLength={600} rows={3} onInput={(event) => event.currentTarget.setCustomValidity("")} placeholder="Producto o servicio que quieres desarrollar" /></label>
              <div className="network-create-fields">
                <label>Sector<input name="category" required maxLength={80} pattern=".*\S.*" placeholder="Ej. Logística" /></label>
                <label>Ubicación<input name="location" required maxLength={100} pattern=".*\S.*" placeholder="Ciudad o región" /></label>
                <label>Volumen previsto<input name="quantity" type="number" required min={1} step={1} placeholder="100" /></label>
                <span />
                <label>Presupuesto mínimo (MXN)<input name="minimum" type="number" required min={0} step="0.01" onInput={(event) => (event.currentTarget.form?.elements.namedItem("maximum") as HTMLInputElement)?.setCustomValidity("")} /></label>
                <label>Presupuesto máximo (MXN)<input name="maximum" type="number" required min={0} step="0.01" onInput={(event) => event.currentTarget.setCustomValidity("")} /></label>
              </div>
              <div className="network-create-actions"><button type="button" className="network-edit" onClick={() => setOpen(false)}>Cancelar</button><button type="submit" className="network-primary"><Plus size={16} /> Crear planteamiento</button></div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="network-plan-directory">
        <div className="network-plan-directory-heading"><h3>Planteamientos existentes</h3>{plans.length > 1 && <label className="network-partner-search"><Search size={16} /><span className="sr-only">Buscar planteamientos</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar planteamiento" /></label>}</div>
        <div className="network-plan-list">
          {visible.map(({ project, partners }) => <button key={project.id} className="network-plan-item" aria-pressed={activeId === project.id} onClick={() => onSelect(project.id)}>
            <FileText size={20} /><span><strong>{project.title}</strong><small>{project.category} · {project.targetLocation}</small><span className="network-plan-meta">{project.status === "draft" ? "Borrador" : "En desarrollo"} · {partners.filter((p) => p.connected).length} aliados conectados</span></span><ArrowUpRight size={16} />
          </button>)}
          {!visible.length && <p className="network-directory-empty">No hay planteamientos con ese nombre.</p>}
        </div>
      </div>
    </section>
  );
}
