import {
  ArrowRight,
  CalendarDays,
  CircleDollarSign,
  Package,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
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

const artisanProducts = [
  {
    id: "basket",
    name: "Canasta tejida con cuentas",
    category: "Cestería",
    sales: 38,
    revenue: 5320,
    stock: 12,
    status: "Alta demanda",
    image:
      "https://images.unsplash.com/photo-1755716302361-3d2c12bfa008?auto=format&fit=crop&w=320&h=320&q=82",
  },
  {
    id: "bag",
    name: "Bolsa bordada artesanal",
    category: "Textil",
    sales: 24,
    revenue: 4080,
    stock: 8,
    status: "Últimas piezas",
    image:
      "https://images.unsplash.com/photo-1767771322982-8041f4a5da8e?auto=format&fit=crop&w=320&h=320&q=82",
  },
  {
    id: "ceramic",
    name: "Tazón de cerámica hecho a mano",
    category: "Cerámica",
    sales: 19,
    revenue: 3230,
    stock: 15,
    status: "Venta estable",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=320&h=320&q=82",
  },
];

type SalesRange = "week" | "fortnight" | "month";

const salesRangeData = {
  week: {
    label: "Semana",
    comparison: "12.4% más que la semana pasada",
    points: [
      { key: "lun", axis: "Lun", label: "Lunes", value: 650, transactions: 5, topProduct: "Tazón de cerámica" },
      { key: "mar", axis: "Mar", label: "Martes", value: 850, transactions: 7, topProduct: "Bolsa bordada" },
      { key: "mie", axis: "Mié", label: "Miércoles", value: 720, transactions: 6, topProduct: "Canasta tejida" },
      { key: "jue", axis: "Jue", label: "Jueves", value: 970, transactions: 8, topProduct: "Tazón de cerámica" },
      { key: "vie", axis: "Vie", label: "Viernes", value: 1150, transactions: 9, topProduct: "Bolsa bordada" },
      { key: "sab", axis: "Sáb", label: "Sábado", value: 1350, transactions: 10, topProduct: "Canasta tejida" },
      { key: "dom", axis: "Dom", label: "Domingo", value: 1760, transactions: 12, topProduct: "Canasta tejida", isCurrent: true },
    ],
  },
  fortnight: {
    label: "Quincena",
    comparison: "9.1% más que la quincena anterior",
    points: [
      { key: "f1", axis: "1–2", label: "Días 1 y 2", value: 1250, transactions: 9, topProduct: "Tazón de cerámica" },
      { key: "f2", axis: "3–4", label: "Días 3 y 4", value: 1680, transactions: 12, topProduct: "Bolsa bordada" },
      { key: "f3", axis: "5–6", label: "Días 5 y 6", value: 1450, transactions: 10, topProduct: "Canasta tejida" },
      { key: "f4", axis: "7–8", label: "Días 7 y 8", value: 1910, transactions: 13, topProduct: "Tazón de cerámica" },
      { key: "f5", axis: "9–10", label: "Días 9 y 10", value: 2180, transactions: 15, topProduct: "Bolsa bordada" },
      { key: "f6", axis: "11–12", label: "Días 11 y 12", value: 2380, transactions: 16, topProduct: "Canasta tejida" },
      { key: "f7", axis: "13–14", label: "Días 13 y 14", value: 2560, transactions: 17, topProduct: "Bolsa bordada" },
      { key: "f8", axis: "15", label: "Día 15", value: 1650, transactions: 11, topProduct: "Canasta tejida", isCurrent: true },
    ],
  },
  month: {
    label: "Mes",
    comparison: "7.8% más que el mes anterior",
    points: [
      { key: "m1", axis: "1–5", label: "Días 1 al 5", value: 4920, transactions: 34, topProduct: "Tazón de cerámica" },
      { key: "m2", axis: "6–10", label: "Días 6 al 10", value: 5360, transactions: 37, topProduct: "Bolsa bordada" },
      { key: "m3", axis: "11–15", label: "Días 11 al 15", value: 5180, transactions: 35, topProduct: "Canasta tejida" },
      { key: "m4", axis: "16–20", label: "Días 16 al 20", value: 5890, transactions: 40, topProduct: "Tazón de cerámica" },
      { key: "m5", axis: "21–25", label: "Días 21 al 25", value: 6030, transactions: 42, topProduct: "Bolsa bordada" },
      { key: "m6", axis: "26–30", label: "Días 26 al 30", value: 6490, transactions: 45, topProduct: "Canasta tejida", isCurrent: true },
    ],
  },
} satisfies Record<
  SalesRange,
  {
    label: string;
    comparison: string;
    points: Array<{
      key: string;
      axis: string;
      label: string;
      value: number;
      transactions: number;
      topProduct: string;
      isCurrent?: boolean;
    }>;
  }
>;

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
  const [salesRange, setSalesRange] = useState<SalesRange>("week");

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

  const selectedSales = salesRangeData[salesRange];
  const chartTotal = selectedSales.points.reduce((total, item) => total + item.value, 0);
  const maxSale = Math.max(...selectedSales.points.map((item) => item.value), 1);
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
              <div className="relative z-10 h-[54px] w-[54px] shrink-0 overflow-hidden rounded-full border-2 border-[#B6E251] bg-[#EFE8DD] shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
                <img
                  src="https://images.unsplash.com/photo-1573552991725-c7b115591d04?auto=format&fit=crop&w=240&h=240&q=82"
                  alt="Cajas de paquetería"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative z-20 h-[54px] w-[54px] shrink-0 overflow-hidden rounded-full border-2 border-[#B6E251] bg-[#E6ECE8] shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
                <img
                  src="https://images.unsplash.com/photo-1758707845038-1f28b342b487?auto=format&fit=crop&w=240&h=240&q=82"
                  alt="Vehículo de entrega"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative z-30 h-[54px] w-[54px] shrink-0 overflow-hidden rounded-full border-2 border-[#B6E251] bg-[#F4E0D2] shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
                <img
                  src="https://images.unsplash.com/photo-1760376208573-49ee415fc66c?auto=format&fit=crop&w=240&h=240&q=82"
                  alt="Materiales para empaque"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
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

      <section className="grid items-start gap-5 xl:grid-cols-[1.55fr_1.15fr]">
        <article className="self-start rounded-[24px] border border-[#E2E6DF] bg-white p-6 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-[#17231B]">Tus ventas</h2>
                <span className="rounded-full bg-[#F1F4EE] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#758178]">
                  Datos simulados
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="text-[32px] font-bold leading-none tracking-[-0.03em] text-[#17231B]">
                  {money.format(chartTotal)}
                </p>
                <p className="inline-flex items-center gap-1 text-xs font-semibold text-[#2E8A3D]">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {selectedSales.comparison}
                </p>
              </div>
              <p className="mt-2 text-[11px] text-[#8A938D]">
                Pasa el cursor sobre cada día para ver el detalle.
              </p>
            </div>

            <div
              className="inline-flex w-fit items-center gap-1 rounded-[14px] border border-[#E1E6DE] bg-[#F7F8F5] p-1"
              aria-label="Filtrar ventas por periodo"
            >
              {(["week", "fortnight", "month"] as SalesRange[]).map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setSalesRange(range)}
                  aria-pressed={salesRange === range}
                  className={
                    salesRange === range
                      ? "inline-flex h-8 items-center gap-1.5 rounded-[10px] bg-[#135C2F] px-3 text-[11px] font-semibold text-white shadow-sm transition-all"
                      : "inline-flex h-8 items-center gap-1.5 rounded-[10px] px-3 text-[11px] font-medium text-[#657168] transition-all hover:bg-white hover:text-[#2F4937]"
                  }
                >
                  {range === "week" && <CalendarDays className="h-3.5 w-3.5" />}
                  {salesRangeData[range].label}
                </button>
              ))}
            </div>
          </div>

          <TooltipPrimitive.Provider delayDuration={220} skipDelayDuration={400}>
            <div className="relative mt-7 h-[228px]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[184px]">
                {[0, 1, 2, 3].map((line) => (
                  <div
                    key={line}
                    className="absolute inset-x-0 border-t border-dashed border-[#E9EDE6]"
                    style={{ top: line * 33.333 + "%" }}
                  />
                ))}
              </div>

              <div
                className="absolute inset-x-0 top-0 grid h-[214px] gap-2 sm:gap-3"
                style={{
                  gridTemplateColumns: `repeat(${selectedSales.points.length}, minmax(0, 1fr))`,
                }}
              >
                {selectedSales.points.map((sale) => {
                  const height = Math.max(18, (sale.value / maxSale) * 100);
                  const averageTicket = sale.value / Math.max(sale.transactions, 1);

                  return (
                    <div
                      key={sale.key}
                      className="flex min-w-0 flex-col items-center justify-end gap-3"
                    >
                      <TooltipPrimitive.Root>
                        <TooltipPrimitive.Trigger asChild>
                          <button
                            type="button"
                            aria-label={
                              sale.label +
                              ": " +
                              money.format(sale.value) +
                              " en ventas"
                            }
                            className="group relative flex h-[184px] w-full items-end justify-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#86B64D]/50 focus-visible:ring-offset-2"
                          >
                            <span
                              className={
                                sale.isCurrent
                                  ? "block w-[58%] min-w-[24px] max-w-[58px] rounded-t-[12px] bg-[linear-gradient(180deg,#0B6C31_0%,#9AC84B_100%)] shadow-[0_8px_18px_rgba(19,92,47,0.12)] transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_12px_22px_rgba(19,92,47,0.18)]"
                                  : "block w-[58%] min-w-[24px] max-w-[58px] rounded-t-[12px] bg-[#C8DDB6] transition-all duration-200 group-hover:-translate-y-1 group-hover:bg-[#B3D096]"
                              }
                              style={{ height: height + "%" }}
                            />
                          </button>
                        </TooltipPrimitive.Trigger>

                        <TooltipPrimitive.Portal>
                          <TooltipPrimitive.Content
                            side="top"
                            sideOffset={12}
                            collisionPadding={12}
                            className="z-50 min-w-[218px] rounded-[14px] border border-white/10 bg-[#022601] px-3.5 py-3 text-white shadow-[0_14px_34px_rgba(2,38,1,0.28)]"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-[11px] font-medium text-white/65">
                                  {sale.label}
                                </p>
                                <p className="mt-0.5 text-lg font-bold leading-none text-white">
                                  {money.format(sale.value)}
                                </p>
                              </div>
                              <span className="rounded-full bg-white/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-white/80">
                                Simulado
                              </span>
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                              <div>
                                <p className="text-[9px] uppercase tracking-[0.08em] text-white/50">
                                  Ventas
                                </p>
                                <p className="mt-0.5 text-xs font-semibold text-white">
                                  {sale.transactions} operaciones
                                </p>
                              </div>
                              <div>
                                <p className="text-[9px] uppercase tracking-[0.08em] text-white/50">
                                  Ticket promedio
                                </p>
                                <p className="mt-0.5 text-xs font-semibold text-white">
                                  {money.format(averageTicket)}
                                </p>
                              </div>
                            </div>

                            <div className="mt-2 rounded-lg bg-white/[0.07] px-2.5 py-2">
                              <p className="text-[9px] uppercase tracking-[0.08em] text-white/50">
                                Más vendido
                              </p>
                              <p className="mt-0.5 text-[11px] font-medium text-white">
                                {sale.topProduct}
                              </p>
                            </div>

                            <TooltipPrimitive.Arrow className="fill-[#022601]" />
                          </TooltipPrimitive.Content>
                        </TooltipPrimitive.Portal>
                      </TooltipPrimitive.Root>

                      <span
                        className={
                          sale.isCurrent
                            ? "text-[11px] font-semibold text-[#245F31]"
                            : "text-[11px] font-medium text-[#7C867F]"
                        }
                      >
                        {sale.axis}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </TooltipPrimitive.Provider>
        </article>

        <article className="rounded-[24px] border border-[#E2E6DF] bg-white p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-[#17231B]">Artesanías más vendidas</h2>
              <p className="mt-1 text-[12px] leading-5 text-[#7C867F]">
                Los productos con mayor movimiento durante este mes.
              </p>
            </div>
            <Link
              to="/inventory"
              className="mt-0.5 shrink-0 text-[11px] font-semibold text-[#287839]"
            >
              Ver catálogo →
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {artisanProducts.map((product, index) => (
              <Link
                key={product.id}
                to="/inventory"
                className="group flex items-center gap-4 rounded-[18px] border border-transparent bg-[#FAFAF7] p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#DDE6D8] hover:bg-white hover:shadow-sm"
              >
                <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[16px] bg-[#EEF1EB]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <span className="absolute left-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-white/90 text-[10px] font-bold text-[#35523B] shadow-sm backdrop-blur">
                    {index + 1}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#839087]">
                    {product.category}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-[13px] font-semibold leading-[1.2] text-[#28322B]">
                    {product.name}
                  </h3>

                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#748078]">
                    <span>
                      <strong className="font-semibold text-[#344039]">{product.sales}</strong> ventas
                    </span>
                    <span className="h-1 w-1 rounded-full bg-[#C5CCC6]" />
                    <span>{money.format(product.revenue)}</span>
                    <span className="h-1 w-1 rounded-full bg-[#C5CCC6]" />
                    <span>{product.stock} en stock</span>
                  </div>
                </div>

                <div className="hidden shrink-0 text-right sm:block">
                  <span
                    className={
                      product.status === "Alta demanda"
                        ? "inline-flex rounded-full bg-[#E6F3C8] px-2.5 py-1 text-[10px] font-semibold text-[#42610A]"
                        : product.status === "Últimas piezas"
                          ? "inline-flex rounded-full bg-[#FBE2D8] px-2.5 py-1 text-[10px] font-semibold text-[#8B4A2B]"
                          : "inline-flex rounded-full bg-[#EEF2EA] px-2.5 py-1 text-[10px] font-semibold text-[#607064]"
                    }
                  >
                    {product.status}
                  </span>
                  <ArrowRight className="ml-auto mt-3 h-4 w-4 text-[#98A29B] transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
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


    </div>
  );
}
