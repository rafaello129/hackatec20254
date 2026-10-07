import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  Handshake,
  Plus,
  Route,
} from "lucide-react";
import { Link } from "react-router-dom";
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
    <div className="space-y-5 pb-4">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[34px] font-bold leading-tight text-[#17231B] sm:text-[40px]">Cooperativas</h1>
          <p className="mt-1 text-sm text-[#68736B]">
            Coordina compras, ventas, distribución y servicios con negocios aliados.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex h-10 w-fit items-center gap-2 rounded-xl border border-[#DFE4DA] bg-white px-4 text-xs font-medium text-[#425047]">
            <CalendarDays className="h-4 w-4" />
            Esta semana
          </span>
          <Link
            to="/cooperatives/opportunities"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#DFE4DA] bg-white px-4 text-xs font-semibold text-[#35523B] transition hover:bg-[#F7F8F5]"
          >
            Ver mercado
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="peek-dark-surface w-full overflow-hidden rounded-[20px] bg-[#022601] px-[22px] py-[21px] text-white">
        <div className="flex min-h-[55px] w-full flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-[23px]">
            <div className="flex h-[54px] w-[109px] shrink-0 -space-x-[27px]" aria-hidden="true">
              {featuredOpportunities.slice(0, 3).map((opportunity, index) => (
                <div
                  key={opportunity.id}
                  className="relative h-[54px] w-[54px] shrink-0 overflow-hidden rounded-full border-2 border-[#B6E251] bg-[#E6ECE8] shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
                  style={{ zIndex: index + 1 }}
                >
                  {opportunity.imageUrl ? (
                    <img src={opportunity.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <span className="grid h-full w-full place-items-center">
                      <Handshake className="h-5 w-5 text-[#35523B]" />
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="min-w-0">
              <h2 className="text-[20px] font-black leading-none tracking-[0.035em] text-white">
                Haz más en conjunto
              </h2>
              <p className="mt-2 max-w-[720px] text-[14px] font-bold leading-[1.2] tracking-[0.025em] text-white">
                Une capacidad, inventario y logística para acceder a oportunidades que un negocio solo no podría cubrir.
              </p>
            </div>
          </div>

          <Link
            to="/cooperatives/create"
            className="inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.1em] text-white lg:self-center"
          >
            <Plus className="h-5 w-5" />
            Crear oportunidad
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>

      <CooperativesKpiCards kpis={kpis} />

      <section className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <CooperativesSectionTabs />
        <div className="flex flex-wrap gap-2">
          {categoryChips.map((chip, index) => (
            <Link
              key={chip}
              to="/cooperatives/opportunities"
              className={
                index === 0
                  ? "inline-flex h-8 items-center rounded-full bg-[#E6F3C8] px-3 text-[10px] font-semibold text-[#42610A]"
                  : "inline-flex h-8 items-center rounded-full border border-[#E2E6DF] bg-white px-3 text-[10px] font-medium text-[#68736B] transition hover:border-[#CCD8C8] hover:text-[#35523B]"
              }
            >
              {chip}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid items-start gap-5 xl:grid-cols-[1.55fr_1fr]">
        <article className="rounded-[24px] border border-[#E2E6DF] bg-white p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[#17231B]">Oportunidades prioritarias</h2>
              <p className="mt-1 text-[13px] leading-5 text-[#7C867F]">
                Iniciativas con movimiento reciente y espacio para nuevos aliados.
              </p>
            </div>
            <Link
              to="/cooperatives/opportunities"
              className="mt-0.5 inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[#287839]"
            >
              Ver todas
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-6">
            {isLoading ? (
              <div className="h-52 animate-pulse rounded-[18px] bg-[#F3F3EE]" />
            ) : (
              <OpportunityList opportunities={featuredOpportunities} variant="compact" />
            )}
          </div>
        </article>

        <div className="space-y-5">
          <article className="rounded-[24px] border border-[#DDE4D8] bg-[linear-gradient(145deg,#FFFFFF_0%,#FBFCF8_58%,#F1F7E9_100%)] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#7D8B81]">Estado de la red</p>
                <h2 className="mt-1 text-lg font-semibold text-[#17231B]">Operación cooperativa</h2>
                <p className="mt-1 text-[11px] leading-5 text-[#7B867E]">
                  Capacidad, solicitudes y señales que requieren atención.
                </p>
              </div>
              <span className="rounded-full bg-[#E6F3C8] px-2.5 py-1 text-[10px] font-semibold text-[#42610A]">Operativo</span>
            </div>

            <div className="mt-5 rounded-[18px] border border-[#E4E9DF] bg-white/80 px-4 py-4">
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <p className="text-[10px] font-medium text-[#7C867F]">Capacidad comprometida</p>
                  <p className="mt-1 text-[30px] font-semibold leading-none tracking-[-0.04em] text-[#17231B]">65%</p>
                </div>
                <span className="text-[10px] font-semibold text-[#2E8A3D]">Red estable</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#EDF1EA]">
                <div className="h-full w-[65%] rounded-full bg-[linear-gradient(90deg,#0B6C31,#9AC84B)]" />
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-[18px] bg-[#FAFAF7] p-4">
                <p className="text-[10px] text-[#87918A]">Solicitudes pendientes</p>
                <p className="mt-1 text-[28px] font-semibold leading-none tracking-tight text-[#35523B]">08</p>
              </div>
              <div className="rounded-[18px] bg-[#FAFAF7] p-4">
                <p className="text-[10px] text-[#87918A]">Campañas activas</p>
                <p className="mt-1 text-[28px] font-semibold leading-none tracking-tight text-[#35523B]">03</p>
              </div>
            </div>

            <div className="mt-3 space-y-2.5">
              <div className="flex gap-3 rounded-[16px] border border-[#F1E6C6] bg-[#FFF9EA] px-3.5 py-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#FFF0C5] text-[#A96C00]">
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-[#344039]">Alerta de cierre</p>
                  <p className="mt-0.5 text-[10px] leading-4 text-[#87918A]">
                    La compra conjunta de denim requiere confirmar muestras esta semana.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-[16px] border border-[#DDE8D8] bg-white/85 px-3.5 py-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#EDF4E8] text-[#2E7439]">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-[#344039]">Acuerdo listo para operar</p>
                  <p className="mt-0.5 text-[10px] leading-4 text-[#87918A]">
                    Venta digital multitienda ya tiene catálogo y reparto definidos.
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-[24px] border border-[#E2E6DF] bg-white p-6">
            <div>
              <h2 className="text-base font-semibold text-[#17231B]">Servicios post-acuerdo</h2>
              <p className="mt-1 text-[11px] text-[#87918A]">Herramientas para operar después del cierre.</p>
            </div>

            <div className="mt-4 space-y-2.5">
              {services.slice(0, 5).map((service) => {
                const Icon = serviceIcons[service.type] ?? CheckCircle2;
                return (
                  <div key={service.id} className="flex items-center gap-3 rounded-[16px] border border-transparent bg-[#FAFAF7] px-3.5 py-3 transition hover:border-[#E5EAE1] hover:bg-white">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#EDF4E8] text-[#2E7439]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-[#344039]">{serviceLabels[service.type]}</p>
                      <p className="mt-0.5 truncate text-[10px] text-[#87918A]">{service.provider}</p>
                    </div>
                    <span className={
                      service.status === "active"
                        ? "rounded-full bg-[#E6F3C8] px-2.5 py-1 text-[10px] font-semibold text-[#42610A]"
                        : service.status === "pending"
                          ? "rounded-full bg-[#FFF0D8] px-2.5 py-1 text-[10px] font-semibold text-[#8C6213]"
                          : "rounded-full bg-[#EEF2EA] px-2.5 py-1 text-[10px] font-semibold text-[#607064]"
                    }>
                      {serviceStatusLabels[service.status] ?? service.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </section>

      <CooperativeActivityPanel activities={activities} />
    </div>
  );
}
