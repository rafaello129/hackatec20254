import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Download,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  PiggyBank,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles,
  BarChart3,
  PieChart,
  ArrowRight,
  Building2,
  Receipt,
  Landmark,
  CircleDollarSign,
  BadgeAlert,
  Lightbulb,
  Bell,
  FileText,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  resumenPyL,
  resumenBalance,
  flujoCaja,
  prediccionesFlujo,
  alertasFinancieras,
  indicadoresFinancieros,
  movimientosRecientes,
} from "../data/mockData";

export default function Finanzas() {
  const navigate = useNavigate();
  const [vistaActiva, setVistaActiva] = React. useState<"general" | "pyl" | "balance" | "flujo">("general");

  // Helpers
  const formatMoney = (amount: number) => {
    if (Math.abs(amount) >= 1000000) {
      return `$${(amount / 1000000). toFixed(2)}M`;
    }
    if (Math.abs(amount) >= 1000) {
      return `$${(amount / 1000).toFixed(0)}k`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getTendenciaIcon = (tendencia: string, size = 4) => {
    const className = `w-${size} h-${size}`;
    switch (tendencia) {
      case "subiendo":
        return <TrendingUp className={`${className} text-teal-500`} />;
      case "bajando":
        return <TrendingDown className={`${className} text-red-500`} />;
      default:
        return <Minus className={`${className} text-slate-400`} />;
    }
  };

  const getAlertaStyle = (tipo: string) => {
    switch (tipo) {
      case "anomalia":
        return { bg: "bg-red-50", border: "border-red-200", icon: BadgeAlert, iconColor: "text-red-600", iconBg: "bg-red-100" };
      case "riesgo":
        return { bg: "bg-amber-50", border: "border-amber-200", icon: AlertTriangle, iconColor: "text-amber-600", iconBg: "bg-amber-100" };
      case "oportunidad":
        return { bg: "bg-teal-50", border: "border-teal-200", icon: Lightbulb, iconColor: "text-teal-600", iconBg: "bg-teal-100" };
      case "recordatorio":
        return { bg: "bg-blue-50", border: "border-blue-200", icon: Bell, iconColor: "text-blue-600", iconBg: "bg-blue-100" };
      default:
        return { bg: "bg-slate-50", border: "border-slate-200", icon: Bell, iconColor: "text-slate-600", iconBg: "bg-slate-100" };
    }
  };

  const getPrioridadStyle = (prioridad: string) => {
    switch (prioridad) {
      case "alta":
        return "bg-red-100 text-red-700";
      case "media":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-6 text-white shadow-xl shadow-emerald-500/25">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-cyan-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/10">
                <Landmark className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">Finanzas</h1>
                <p className="text-white/80">
                  Reportes financieros y análisis inteligente
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-medium text-sm px-4 py-2. 5 rounded-xl hover:bg-white/30 transition-all">
                <Calendar className="w-4 h-4" />
                {resumenPyL. periodo}
              </button>
              <button className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold text-sm px-5 py-2. 5 rounded-xl hover:bg-emerald-50 transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5">
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>
          </div>

          {/* Stats principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpRight className="w-5 h-5 text-emerald-300" />
                <span className="text-white/70 text-sm">Ingresos</span>
              </div>
              <p className="text-3xl font-bold">{formatMoney(resumenPyL.ingresos. total)}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownRight className="w-5 h-5 text-rose-300" />
                <span className="text-white/70 text-sm">Egresos</span>
              </div>
              <p className="text-3xl font-bold">{formatMoney(resumenPyL. costos.total + resumenPyL.gastosOperativos.total)}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CircleDollarSign className="w-5 h-5 text-cyan-300" />
                <span className="text-white/70 text-sm">Utilidad Neta</span>
              </div>
              <p className="text-3xl font-bold">{formatMoney(resumenPyL.utilidadNeta)}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-5 h-5 text-amber-300" />
                <span className="text-white/70 text-sm">Efectivo</span>
              </div>
              <p className="text-3xl font-bold">{formatMoney(flujoCaja.saldoFinal)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TABS DE NAVEGACIÓN
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: "general", label: "Resumen", icon: PieChart },
          { id: "pyl", label: "P&L", icon: BarChart3 },
          { id: "balance", label: "Balance", icon: Building2 },
          { id: "flujo", label: "Flujo de Caja", icon: Wallet },
        ].map((tab) => (
          <button
            key={tab. id}
            onClick={() => setVistaActiva(tab. id as typeof vistaActiva)}
            className={`flex items-center gap-2 px-5 py-2. 5 rounded-xl font-semibold text-sm transition-all ${
              vistaActiva === tab. id
                ? "bg-white text-emerald-700 shadow-md"
                : "text-slate-600 hover:text-slate-800"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTENIDO PRINCIPAL
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─────────────────────────────────────────────────────────────────
            COLUMNA PRINCIPAL (2/3)
        ───────────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          {/* VISTA: RESUMEN GENERAL */}
          {vistaActiva === "general" && (
            <>

            {/* Movimientos Recientes */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
                      <Receipt className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-800">Movimientos Recientes</h2>
                      <p className="text-xs text-slate-500">Últimas transacciones</p>
                    </div>
                  </div>
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                    Ver todos
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  {movimientosRecientes.slice(0, 6).map((mov) => (
                    <div
                      key={mov.id}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          mov. tipo === "ingreso" 
                            ? "bg-teal-100" 
                            : "bg-red-100"
                        }`}>
                          {mov.tipo === "ingreso" ? (
                            <ArrowUpRight className="w-5 h-5 text-teal-600" />
                          ) : (
                            <ArrowDownRight className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{mov.concepto}</p>
                          <p className="text-xs text-slate-500">{mov.fecha}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          mov.tipo === "ingreso" ? "text-teal-600" : "text-red-600"
                        }`}>
                          {mov.tipo === "ingreso" ? "+" : "-"}${mov.monto. toLocaleString()}
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          mov.estado === "completado"
                            ? "bg-teal-100 text-teal-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {mov.estado === "completado" ? "Completado" : "Programado"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicadores Financieros */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800">Indicadores Clave</h2>
                    <p className="text-xs text-slate-500">Salud financiera de tu negocio</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {indicadoresFinancieros.map((indicador, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-emerald-200 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-500">{indicador. nombre}</span>
                        {indicador.saludable ?  (
                          <CheckCircle className="w-4 h-4 text-teal-500" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                        )}
                      </div>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-bold text-slate-800">{indicador.valor}</span>
                        <span className="text-sm text-slate-500 mb-1">{indicador.unidad}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {getTendenciaIcon(indicador.tendencia)}
                        <span className={`text-xs font-medium ${
                          indicador. variacion >= 0 ? "text-teal-600" : "text-red-600"
                        }`}>
                          {indicador.variacion >= 0 ? "+" : ""}{indicador.variacion}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Predicción de Flujo */}
              

              
            </>
          )}

          {/* VISTA: P&L */}
          {vistaActiva === "pyl" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">Estado de Resultados (P&L)</h2>
                  <p className="text-xs text-slate-500">{resumenPyL. periodo}</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Ingresos */}
                <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                  <h3 className="font-semibold text-teal-800 mb-3">Ingresos</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Ventas de productos</span>
                      <span className="font-medium">${resumenPyL. ingresos.ventas.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Servicios</span>
                      <span className="font-medium">${resumenPyL.ingresos.servicios.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Otros ingresos</span>
                      <span className="font-medium">${resumenPyL.ingresos.otros.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-teal-200">
                      <span className="font-bold text-teal-800">Total Ingresos</span>
                      <span className="font-bold text-teal-800">${resumenPyL. ingresos.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Costos */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-3">Costos</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Costo de ventas</span>
                      <span className="font-medium text-red-600">-${resumenPyL.costos. costoVentas. toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Costo de servicios</span>
                      <span className="font-medium text-red-600">-${resumenPyL. costos.costoServicios.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-300">
                      <span className="font-bold text-slate-800">Utilidad Bruta</span>
                      <div className="text-right">
                        <span className="font-bold text-slate-800">${resumenPyL. utilidadBruta.toLocaleString()}</span>
                        <span className="text-xs text-slate-500 ml-2">({resumenPyL.margenBruto}%)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gastos Operativos */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-3">Gastos Operativos</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Nómina</span>
                      <span className="font-medium text-red-600">-${resumenPyL.gastosOperativos. nomina.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Renta</span>
                      <span className="font-medium text-red-600">-${resumenPyL.gastosOperativos.renta. toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Servicios (luz, agua, etc.)</span>
                      <span className="font-medium text-red-600">-${resumenPyL.gastosOperativos.servicios.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Marketing</span>
                      <span className="font-medium text-red-600">-${resumenPyL.gastosOperativos.marketing. toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Otros gastos</span>
                      <span className="font-medium text-red-600">-${resumenPyL.gastosOperativos.otros.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Resultados */}
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-slate-700">Utilidad Operativa</span>
                      <div className="text-right">
                        <span className="font-bold text-slate-800">${resumenPyL. utilidadOperativa.toLocaleString()}</span>
                        <span className="text-xs text-slate-500 ml-2">({resumenPyL.margenOperativo}%)</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Impuestos</span>
                      <span className="font-medium text-red-600">-${resumenPyL.impuestos.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-emerald-300">
                      <span className="font-bold text-emerald-800 text-lg">Utilidad Neta</span>
                      <div className="text-right">
                        <span className="font-bold text-emerald-800 text-lg">${resumenPyL.utilidadNeta.toLocaleString()}</span>
                        <span className="text-sm text-emerald-600 ml-2">({resumenPyL.margenNeto}%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA: BALANCE */}
          {vistaActiva === "balance" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">Balance General</h2>
                  <p className="text-xs text-slate-500">{resumenBalance.periodo}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Activos */}
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <h3 className="font-semibold text-blue-800 mb-3">Activo Circulante</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Efectivo</span>
                        <span className="font-medium">${resumenBalance. activos.circulante.efectivo.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Cuentas por cobrar</span>
                        <span className="font-medium">${resumenBalance.activos.circulante. cuentasPorCobrar.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Inventarios</span>
                        <span className="font-medium">${resumenBalance.activos.circulante.inventarios.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-blue-200 font-semibold">
                        <span>Total Circulante</span>
                        <span>${resumenBalance.activos.circulante.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                    <h3 className="font-semibold text-indigo-800 mb-3">Activo Fijo</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Equipo de transporte</span>
                        <span className="font-medium">${resumenBalance. activos.fijo.equipoTransporte.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Mobiliario</span>
                        <span className="font-medium">${resumenBalance.activos.fijo.mobiliario.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Equipo de cómputo</span>
                        <span className="font-medium">${resumenBalance.activos. fijo.equipoComputo.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Depreciación</span>
                        <span className="font-medium text-red-600">${resumenBalance. activos.fijo.depreciacion. toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-indigo-200 font-semibold">
                        <span>Total Fijo</span>
                        <span>${resumenBalance.activos.fijo. total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-slate-800">TOTAL ACTIVOS</span>
                      <span className="text-blue-700">${resumenBalance.activos.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Pasivos y Capital */}
                <div className="space-y-4">
                  <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                    <h3 className="font-semibold text-red-800 mb-3">Pasivo a Corto Plazo</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Proveedores</span>
                        <span className="font-medium">${resumenBalance.pasivos.cortoplazo.proveedores.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Cuentas por pagar</span>
                        <span className="font-medium">${resumenBalance.pasivos.cortoplazo.cuentasPorPagar. toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Impuestos</span>
                        <span className="font-medium">${resumenBalance.pasivos.cortoplazo.impuestos.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-red-200 font-semibold">
                        <span>Total Corto Plazo</span>
                        <span>${resumenBalance.pasivos. cortoplazo. total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <h3 className="font-semibold text-orange-800 mb-3">Pasivo a Largo Plazo</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Préstamos bancarios</span>
                        <span className="font-medium">${resumenBalance. pasivos.largoplazo.prestamos.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-orange-200 font-semibold">
                        <span>Total Largo Plazo</span>
                        <span>${resumenBalance.pasivos.largoplazo.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <h3 className="font-semibold text-emerald-800 mb-3">Capital Contable</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Capital social</span>
                        <span className="font-medium">${resumenBalance.capital.capitalSocial.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Utilidades retenidas</span>
                        <span className="font-medium">${resumenBalance.capital.utilidadesRetenidas. toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Utilidad del ejercicio</span>
                        <span className="font-medium text-emerald-600">${resumenBalance.capital.utilidadEjercicio.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-emerald-200 font-semibold">
                        <span>Total Capital</span>
                        <span>${resumenBalance. capital.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-slate-800">PASIVO + CAPITAL</span>
                      <span className="text-emerald-700">${(resumenBalance.pasivos.total + resumenBalance.capital.total).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA: FLUJO DE CAJA */}
          {vistaActiva === "flujo" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">Flujo de Caja</h2>
                  <p className="text-xs text-slate-500">{flujoCaja.periodo}</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Saldo Inicial */}
                <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-700">Saldo Inicial</span>
                    <span className="text-slate-800">${flujoCaja.saldoInicial.toLocaleString()}</span>
                  </div>
                </div>

                {/* Entradas */}
                <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
                  <h3 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
                    <ArrowUpRight className="w-5 h-5" />
                    Entradas de Efectivo
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Cobranza a clientes</span>
                      <span className="font-medium text-teal-700">+${flujoCaja.entradas.cobranzaClientes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Otros ingresos</span>
                      <span className="font-medium text-teal-700">+${flujoCaja.entradas.otrosIngresos.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-teal-200 font-semibold">
                      <span>Total Entradas</span>
                      <span className="text-teal-700">+${flujoCaja.entradas. total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Salidas */}
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <ArrowDownRight className="w-5 h-5" />
                    Salidas de Efectivo
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Pago a proveedores</span>
                      <span className="font-medium text-red-600">-${flujoCaja.salidas.pagoProveedores. toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Nómina</span>
                      <span className="font-medium text-red-600">-${flujoCaja.salidas. nomina.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Gastos operativos</span>
                      <span className="font-medium text-red-600">-${flujoCaja.salidas.gastosOperativos. toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Impuestos</span>
                      <span className="font-medium text-red-600">-${flujoCaja.salidas.impuestos. toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Inversiones</span>
                      <span className="font-medium text-red-600">-${flujoCaja.salidas.inversiones.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-red-200 font-semibold">
                      <span>Total Salidas</span>
                      <span className="text-red-600">-${flujoCaja.salidas.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Resultado */}
                <div className="bg-emerald-100 rounded-xl p-4 border border-emerald-200">
                  <div className="space-y-3">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-700">Flujo Neto del Período</span>
                      <span className={flujoCaja.flujoNeto >= 0 ? "text-teal-700" : "text-red-700"}>
                        {flujoCaja. flujoNeto >= 0 ? "+" : ""}{formatMoney(flujoCaja.flujoNeto)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-emerald-300">
                      <span className="font-bold text-emerald-800 text-lg">Saldo Final</span>
                      <span className="font-bold text-emerald-800 text-lg">${flujoCaja.saldoFinal. toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────────
            COLUMNA LATERAL - ALERTAS IA (1/3)
        ───────────────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Header de alertas */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">Análisis IA</h2>
                  <p className="text-xs text-slate-500">
                    {alertasFinancieras.length} alertas activas
                  </p>
                </div>
              </div>
            </div>

            {/* Resumen rápido */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                <span className="text-xs text-red-600 font-medium">Riesgos</span>
                <p className="text-xl font-bold text-red-700">
                  {alertasFinancieras. filter(a => a. tipo === "anomalia" || a.tipo === "riesgo").length}
                </p>
              </div>
              <div className="bg-teal-50 rounded-xl p-3 border border-teal-100">
                <span className="text-xs text-teal-600 font-medium">Oportunidades</span>
                <p className="text-xl font-bold text-teal-700">
                  {alertasFinancieras.filter(a => a.tipo === "oportunidad"). length}
                </p>
              </div>
            </div>
          </div>

          {/* Lista de alertas */}
          <div className="space-y-3">
            {alertasFinancieras.map((alerta) => {
              const estilo = getAlertaStyle(alerta.tipo);
              const IconoAlerta = estilo.icon;
              return (
                <div
                  key={alerta.id}
                  className={`bg-white rounded-xl border ${estilo.border} p-4 hover:shadow-lg transition-all cursor-pointer group`}
                >
                  <div className="flex items-start gap-3">
                    <div
                                            className={`w-9 h-9 rounded-lg ${estilo.iconBg} flex items-center justify-center shrink-0`}
                    >
                      <IconoAlerta className={`w-4 h-4 ${estilo.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-800 text-sm truncate">
                          {alerta.titulo}
                        </span>
                        <span
                          className={`text-[10px] px-1. 5 py-0.5 rounded font-medium shrink-0 ${getPrioridadStyle(
                            alerta. prioridad
                          )}`}
                        >
                          {alerta.prioridad === "alta"
                            ? "🔴"
                            : alerta.prioridad === "media"
                            ?  "🟡"
                            : "🟢"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-2 line-clamp-2">
                        {alerta.mensaje}
                      </p>

                      {/* Impacto */}
                      {alerta.impacto && (
                        <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${
                          alerta. impacto >= 0
                            ? "bg-teal-100 text-teal-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {alerta.impacto >= 0 ? (
                            <ArrowUpRight className="w-3 h-3" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3" />
                          )}
                          {alerta.impacto >= 0 ? "+" : ""}${Math.abs(alerta.impacto). toLocaleString()}
                        </div>
                      )}

                      {/* Sugerencia */}
                      <div className="flex items-start gap-1. 5 bg-slate-50 rounded-lg p-2">
                        <Sparkles className="w-3 h-3 text-violet-500 mt-0. 5 shrink-0" />
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {alerta.accionSugerida}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-slate-400">
                          {alerta.fecha}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA de análisis */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-4 text-white shadow-lg shadow-emerald-500/25">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Reporte Completo</h3>
                <p className="text-white/70 text-xs">
                  Análisis detallado con IA
                </p>
              </div>
            </div>
            <button className="w-full inline-flex items-center justify-center gap-2 bg-white text-emerald-700 font-semibold text-sm px-4 py-2. 5 rounded-xl hover:bg-emerald-50 transition-all">
              Generar reporte
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}