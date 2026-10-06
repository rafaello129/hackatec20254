import type { NetworkPartner, PartnerType } from "@/types/businessNetwork.types";
import RecommendedBusinessCard from "./RecommendedBusinessCard";

const types: Partial<Record<PartnerType, string>> = { supplier: "Proveedores", manufacturer: "Manufactura", packaging: "Empaque", logistics: "Logística", retail_partner: "Socios comerciales", service_provider: "Servicios", cooperative_partner: "Cooperativos" };

export default function RecommendedBusinessCards({ partners, onConnect, typeFilter, onTypeChange }: {
  partners: NetworkPartner[]; onConnect: (partnerId: string) => void;
  typeFilter: PartnerType | ""; onTypeChange: (type: PartnerType | "") => void;
}) {
  const [view, setView] = useState("all");
  const [query, setQuery] = useState("");
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const filtered = partners.filter((partner) => (!typeFilter || partner.type === typeFilter) &&
    (view === "all" || (view === "connected" ? partner.connected : !partner.connected)) &&
    normalize(`${partner.name} ${partner.description} ${partner.location}`).includes(normalize(query.trim())));
  return (
    <section aria-labelledby="network-partners-title">
      <div className="network-partners-heading">
        <div><h2 id="network-partners-title">Aliados recomendados</h2><p aria-live="polite">{filtered.length} {filtered.length === 1 ? "negocio disponible" : "negocios disponibles"}</p></div>
        <label className="network-partner-filter"><span className="sr-only">Tipo de aliado</span><select value={typeFilter} onChange={(event) => onTypeChange(event.target.value as PartnerType | "")}><option value="">Todos los aliados</option>{Object.entries(types).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      </div>
      <div className="network-partner-tools">
        <div className="network-views" role="group" aria-label="Estado de los aliados">
          {[["all", "Todos"], ["available", "Por conectar"], ["connected", "Conectados"]].map(([id, label]) => <button key={id} aria-pressed={view === id} onClick={() => setView(id)}>{label}</button>)}
        </div>
        <label className="network-partner-search"><Search size={16} /><span className="sr-only">Buscar aliados</span><input type="search" placeholder="Nombre, ubicación…" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      </div>
      <div className="network-partner-grid">{filtered.map((partner) => <RecommendedBusinessCard key={partner.id} partner={partner} onConnect={onConnect} />)}</div>
      {!filtered.length && <div className="network-empty"><Search size={26} /><p>No hay aliados que coincidan con estos filtros.</p><button className="network-edit" onClick={() => { onTypeChange(""); setQuery(""); setView("all"); }}>Ver todos los aliados</button></div>}
    </section>
  );
}
import { useState } from "react";
import { Search } from "lucide-react";
