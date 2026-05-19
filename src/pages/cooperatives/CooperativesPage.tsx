import { AlertTriangle, ArrowUpRight, CheckCircle2, FileText, Plus, Route } from "lucide-react";
import { Link } from "react-router-dom";
import PageIntro from "@/components/common/PageIntro";
import SectionCard from "@/components/common/SectionCard";
import CooperativeActivityPanel from "./components/CooperativeActivityPanel";
import CooperativesKpiCards from "./components/CooperativesKpiCards";
import CooperativesSectionTabs from "./components/CooperativesSectionTabs";
import OpportunityList from "./components/OpportunityList";
import { useCooperativeDetail } from "./hooks/useCooperativeDetail";
import { useCooperatives } from "./hooks/useCooperatives";

const categoryChips = ["Todas", "Compra conjunta", "Venta conjunta", "Campaña compartida", "Distribución", "Logística"];

const serviceLabels: Record<string, string> = {
  delivery: "Entrega",
  digital_sale: "Venta digital",
  distribution_calculation: "Cálculo de reparto",
  tracking: "Seguimiento",
  documents: "Documentos",
};

const serviceIcons: Record<string, typeof Route> = {
  delivery: Route,
  digital_sale: ArrowUpRight,
  distribution_calculation: CheckCircle2,
  tracking: AlertTriangle,
  documents: FileText,
};

const serviceStatusLabels: Record<string, string> = {
  available: "Disponible",
  active: "Activo",
  pending: "Pendiente",
  completed: "Completado",
};

export default function CooperativesPage() {
  const { kpis, featuredOpportunities, isLoading } = useCooperatives();
  const { activities } = useCooperativeDetail("coop-1001");
  const { services } = useCooperativeDetail("coop-1006");

  return (
    <div className="space-y-5">
      <PageIntro
        title="Cooperativos"
        description="Gestiona oportunidades compartidas, acuerdos empresariales y servicios post-acuerdo."
        actions={
          <>
            <Link
              to="/cooperatives/opportunities"
              className="inline-flex items-center gap-2 rounded-lg border border-[#c2c9bc] bg-white px-4 py-2 text-sm font-semibold text-[#3E5902] hover:bg-[#f3f4ed]"
            >
              Ver mercado
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white opacity-80"
            >
              <Plus className="h-4 w-4" />
              Crear oportunidad
            </button>
          </>
        }
      />

      <CooperativesKpiCards kpis={kpis} />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <CooperativesSectionTabs />
        <div className="flex flex-wrap gap-2">
          {categoryChips.map((chip, index) => (
            <Link
              key={chip}
              to="/cooperatives/opportunities"
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                index === 0
                  ? "border-[#D6D979] bg-[#D6D979] text-[#3E5902]"
                  : "border-[#c2c9bc] bg-white text-[#42493f] hover:bg-[#f3f4ed]"
              }`}
            >
              {chip}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.9fr_1fr] xl:items-start">
        <SectionCard
          title="Oportunidades prioritarias"
          actions={
            <Link to="/cooperatives/opportunities" className="inline-flex items-center gap-1 text-sm font-semibold text-[#4F7302]">
              Ver todas
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          }
        >
          {isLoading ? (
            <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-6 text-sm text-[#42493f]">Cargando oportunidades...</div>
          ) : (
            <OpportunityList opportunities={featuredOpportunities} variant="compact" />
          )}
        </SectionCard>

        <div className="space-y-4">
          <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Estado cooperativo</h3>
                <p className="mt-1 text-sm text-[#42493f]">Capacidad, solicitudes y alertas del flujo de acuerdos.</p>
              </div>
              <span className="rounded-full bg-[#D6D979] px-2.5 py-1 text-xs font-semibold text-[#3E5902]">Operativo</span>
            </div>

            <div className="mt-4 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
              <div className="mb-1 flex justify-between text-xs font-semibold text-[#42493f]">
                <span>Capacidad comprometida</span>
                <span>65%</span>
              </div>
              <div className="h-2 rounded-full bg-[#e2e3dc]">
                <div className="h-2 w-[65%] rounded-full bg-[#4F7302]" />
              </div>
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <div className="rounded-lg border border-[#e2e3dc] bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">Solicitudes pendientes</p>
                <p className="mt-1 font-['Hanken_Grotesk'] text-2xl font-bold text-[#1a1c18]">08</p>
              </div>
              <div className="rounded-lg border border-[#e2e3dc] bg-white p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">Campañas activas</p>
                <p className="mt-1 font-['Hanken_Grotesk'] text-2xl font-bold text-[#1a1c18]">03</p>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="rounded-lg border border-[#fff2cc] bg-[#fffaf0] p-3">
                <p className="text-sm font-semibold text-[#1a1c18]">Alerta de cierre</p>
                <p className="text-xs leading-5 text-[#42493f]">Compra conjunta de denim requiere confirmar muestras esta semana.</p>
              </div>
              <div className="rounded-lg border border-[#D6D979] bg-[#f9faf3] p-3">
                <p className="text-sm font-semibold text-[#1a1c18]">Acuerdo listo para operar</p>
                <p className="text-xs leading-5 text-[#42493f]">Venta digital multitienda ya tiene catálogo y reparto definidos.</p>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
            <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Servicios post-acuerdo</h3>
            <div className="mt-3 grid gap-2">
              {services.slice(0, 5).map((service) => {
                const Icon = serviceIcons[service.type] ?? CheckCircle2;
                return (
                  <div key={service.id} className="flex items-center justify-between gap-3 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#D6D979] text-[#3E5902]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#1a1c18]">{serviceLabels[service.type]}</p>
                        <p className="text-xs text-[#42493f]">{service.provider}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-[#3E5902]">
                      {serviceStatusLabels[service.status] ?? service.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          <CooperativeActivityPanel activities={activities} />
        </div>
      </div>
    </div>
  );
}
