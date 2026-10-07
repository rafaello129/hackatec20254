import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  Package,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useHomeDashboard } from "./hooks/useHomeDashboard";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const shortDate = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "short",
});

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-16 rounded-2xl bg-[#EEF1EB]" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-36 rounded-3xl bg-[#F3F3EE]" />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.8fr_1fr]">
        <div className="h-72 rounded-3xl bg-[#F3F3EE]" />
        <div className="h-72 rounded-3xl bg-[#F3F3EE]" />
      </div>
    </div>
  );
}

export default function HomePage() {
  const { data, isLoading, error, reload } = useHomeDashboard();

  if (isLoading) return <DashboardSkeleton />;

  if (error || !data) {
    return (
      <div className="grid min-h-[420px] place-items-center">
        <div className="max-w-sm text-center">
          <h1 className="text-2xl font-bold text-[#17231B]">No pudimos cargar tu resumen</h1>
          <p className="mt-2 text-sm text-[#68736B]">
            Intenta nuevamente para recuperar los datos del negocio.
          </p>
          <button
            type="button"
            onClick={() => void reload()}
            className="mt-5 rounded-xl bg-[#135C2F] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  const maxSale = Math.max(...data.weeklySales.map((item) => item.value), 1);
  const inventory = data.inventoryStatus;
  const inventoryTotal = Math.max(inventory.total, 1);
  const inStockPct = (inventory.available / inventoryTotal) * 100;
  const lowStockPct = (inventory.lowStock / inventoryTotal) * 100;

  const metrics = [
    {
      label: "Ventas esta semana",
      value: money.format(data.summary.sales),
      helper: "↑ " + data.summary.salesChange + "% más que la semana pasada",
      href: "/finance",
      featured: true,
      icon: TrendingUp,
    },
    {
      label: "Clientes",
      value: data.summary.customers,
      helper: data.summary.activeCustomers + " activos",
      href: "/customers",
      icon: Users,
    },
    {
      label: "Productos por agotarse",
      value: data.summary.lowStockProducts,
      helper: "Necesitan atención",
      href: "/inventory",
      icon: Package,
    },
    {
      label: "Dinero por recibir",
      value: money.format(data.summary.receivableAmount),
      helper: data.summary.overdueInvoices + " facturas vencidas",
      href: "/finance/invoicing",
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="space-y-4 pb-3">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[34px] font-bold leading-tight text-[#17231B] sm:text-[40px]">
            Hola, {data.user.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-[#68736B]">Aquí tienes un resumen de tu negocio hoy</p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-fit items-center gap-2 rounded-xl border border-[#DFE4DA] bg-white px-4 text-xs font-medium text-[#425047]"
        >
          <CalendarDays className="h-4 w-4" />
          {data.periodLabel}
        </button>
      </section>

      <section className="peek-dark-surface w-full overflow-hidden rounded-[20px] bg-[#022601] px-[22px] py-[21px] text-white">
        <div className="flex min-h-[55px] w-full flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-[23px]">
            <div className="flex h-[54px] w-[109px] shrink-0 -space-x-[27px]">
              <div className="h-[54px] w-[54px] shrink-0 rounded-full border-2 border-[#B6E251] bg-[radial-gradient(circle_at_30%_25%,#A77442,#51321E)]" />
              <div className="h-[54px] w-[54px] shrink-0 rounded-full border-2 border-[#B6E251] bg-[radial-gradient(circle_at_65%_35%,#D74B3D,#315A42)]" />
              <div className="h-[54px] w-[54px] shrink-0 rounded-full border-2 border-[#B6E251] bg-[radial-gradient(circle_at_50%_20%,#EEE6D7,#B27445)]" />
            </div>
            <div className="min-w-0">
              <h2 className="text-[20px] font-black leading-none tracking-[0.06em] text-white">
                Encuentra quien te ayude
              </h2>
              <p className="mt-2 text-[14px] font-bold leading-[1.15] tracking-[0.06em] text-white">
                ¿Necesitas empaques, entregas o materiales? Te mostramos opciones cerca de ti
              </p>
            </div>
          </div>
          <Link
            to="/business-network"
            className="inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.1em] text-white lg:self-center"
          >
            Ver red de negocios
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Link
              key={metric.label}
              to={metric.href}
              className={
                metric.featured
                  ? "peek-dark-surface group min-h-[142px] rounded-[24px] bg-[linear-gradient(135deg,#063A12_0%,#0D571E_58%,#9AC84B_140%)] p-5 text-white transition-transform duration-200 hover:-translate-y-0.5"
                  : "group min-h-[142px] rounded-[24px] bg-[#FFF8F6] p-5 ring-1 ring-[#F0ECE8] transition duration-200 hover:-translate-y-0.5 hover:ring-[#DDE5D8]"
              }
            >
              <div className="flex items-start justify-between gap-3">
                <p className={metric.featured ? "text-lg text-white" : "text-lg text-[#35523B]"}>
                  {metric.label}
                </p>
                <Icon className={metric.featured ? "h-5 w-5 text-white" : "h-5 w-5 text-[#6E8A73]"} />
              </div>
              <p
                className={
                  metric.featured
                    ? "mt-2 text-[42px] font-medium leading-none tracking-tight"
                    : "mt-2 text-[42px] font-medium leading-none tracking-tight text-[#35523B]"
                }
              >
                {metric.value}
              </p>
              <p className={metric.featured ? "mt-3 text-xs text-white/75" : "mt-3 text-xs text-[#758178]"}>
                {metric.helper}
              </p>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.8fr_1fr]">
        <article className="rounded-[22px] border border-[#E2E6DF] bg-white p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#17231B]">Tus ventas</p>
              <div className="mt-0.5 flex flex-wrap items-baseline gap-3">
                <p className="text-2xl font-bold text-[#17231B]">{money.format(data.summary.sales)}</p>
                <p className="text-xs font-medium text-[#2E8A3D]">
                  ↑ {data.summary.salesChange}% más que la semana pasada
                </p>
              </div>
            </div>
            <span className="inline-flex h-9 w-fit items-center gap-2 rounded-xl border border-[#E2E6DF] px-3 text-xs text-[#68736B]">
              <CalendarDays className="h-4 w-4" />
              {data.periodLabel}
            </span>
          </div>

          <div className="mt-7 grid h-[190px] grid-cols-7 items-end gap-3 border-b border-[#EDF0EA] px-2">
            {data.weeklySales.map((sale) => {
              const height = Math.max(18, (sale.value / maxSale) * 100);
              return (
                <div key={sale.day} className="flex h-full flex-col items-center justify-end gap-2">
                  <div className="relative flex h-[154px] w-full items-end justify-center">
                    <div
                      className={
                        sale.isCurrent
                          ? "w-full max-w-[72px] rounded-t-[9px] bg-[linear-gradient(180deg,#075A24_0%,#9AC84B_100%)] transition-opacity hover:opacity-90"
                          : "w-full max-w-[72px] rounded-t-[9px] bg-[#C9DDB6] transition-colors hover:bg-[#B6D197]"
                      }
                      style={{ height: height + "%" }}
                      title={sale.day + ": " + money.format(sale.value)}
                    />
                  </div>
                  <span className="pb-2 text-[11px] text-[#7A837D]">{sale.day}</span>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-[22px] border border-[#E2E6DF] bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#17231B]">Productos por revisar</h2>
            <Link to="/inventory" className="text-[11px] font-medium text-[#287839]">
              Ver todos →
            </Link>
          </div>

          <div className="mt-4 space-y-2">
            {data.productsAttention.length === 0 ? (
              <div className="rounded-2xl bg-[#F4F8F1] p-4 text-sm text-[#47604B]">
                Todo en orden. No tienes productos por agotarse.
              </div>
            ) : (
              data.productsAttention.map((product, index) => (
                <Link
                  key={product.id}
                  to="/inventory"
                  className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-[#F7F8F5]"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#EEF3EA] text-xs font-semibold text-[#56715B]">
                    {index + 1}
                  </span>
                  <div
                    className={
                      product.status === "out_of_stock"
                        ? "h-10 w-12 shrink-0 rounded-lg bg-[#BE5B4C]"
                        : "h-10 w-12 shrink-0 rounded-lg bg-[#C6A86D]"
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-[#28322B]">{product.name}</p>
                    <p className="mt-0.5 text-[10px] text-[#8A938D]">
                      {product.status === "out_of_stock" ? "Agotado" : product.stockLabel}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#87918A]" />
                </Link>
              ))
            )}
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.8fr_1fr]">
        <article className="rounded-[22px] border border-[#E2E6DF] bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#17231B]">Actividad reciente</h2>
            <span className="text-[11px] text-[#87918A]">Últimos movimientos</span>
          </div>

          <div className="mt-4 divide-y divide-[#EEF0EB]">
            {data.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span
                  className={
                    activity.type === "finance"
                      ? "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EDF4E8] text-[#2E7439]"
                      : "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F2F1EA] text-[#6A705F]"
                  }
                >
                  {activity.type === "finance" ? (
                    <CircleDollarSign className="h-4 w-4" />
                  ) : (
                    <Package className="h-4 w-4" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-[#344039]">{activity.title}</p>
                  <p className="mt-0.5 truncate text-[11px] text-[#838C86]">{activity.detail}</p>
                </div>
                <span className="text-[10px] text-[#919A94]">
                  {shortDate.format(new Date(activity.date + "T00:00:00"))}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[22px] border border-[#E2E6DF] bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#17231B]">Estado de tus productos</h2>
            <Link to="/inventory" className="text-[11px] font-medium text-[#287839]">
              Ver todos →
            </Link>
          </div>

          <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <div
              className="grid h-[128px] w-[128px] shrink-0 place-items-center rounded-full"
              style={{
                background:
                  "conic-gradient(#2F873A 0 " +
                  inStockPct +
                  "%, #E4AC24 " +
                  inStockPct +
                  "% " +
                  (inStockPct + lowStockPct) +
                  "%, #D9564D " +
                  (inStockPct + lowStockPct) +
                  "% 100%)",
              }}
            >
              <div className="grid h-[88px] w-[88px] place-items-center rounded-full bg-white text-center">
                <div>
                  <p className="text-3xl font-semibold leading-none text-[#17231B]">{inventory.total}</p>
                  <p className="mt-1 text-[10px] text-[#8A938D]">productos</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#67716A]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#2F873A]" />
                <strong className="text-[#38443C]">{inventory.available}</strong> disponibles
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E4AC24]" />
                <strong className="text-[#38443C]">{inventory.lowStock}</strong> por agotarse
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D9564D]" />
                <strong className="text-[#38443C]">{inventory.outOfStock}</strong> agotados
              </div>
            </div>
          </div>
        </article>
      </section>

      <Link
        to="/ai-assistant"
        className="peek-dark-surface fixed bottom-5 right-5 z-30 flex items-start gap-[10px] overflow-hidden rounded-[39px] bg-[#022601] px-[14px] py-[13px] text-white shadow-[0_10px_28px_rgba(0,30,8,0.24)] transition-transform hover:-translate-y-0.5"
      >
        <Sparkles className="mt-0.5 h-[23px] w-[23px] shrink-0 text-white" />
        <span className="w-[141px] text-left text-white">
          <span className="block text-[16px] font-medium leading-none text-white">¿Necesitas ayuda?</span>
          <span className="mt-1 block text-[12px] font-medium leading-none text-white">
            Pregúntale a PÉEK
          </span>
        </span>
      </Link>
    </div>
  );
}
