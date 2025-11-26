import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  FileText,
  Truck,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  MapPin,
  ArrowRight,
  Star,
  BadgeCheck,
  Sparkles,
  TrendingUp,
  DollarSign,
  Eye,
  MessageSquare,
  Calendar,
  Thermometer,
  Filter,
  Search,
  MoreHorizontal,
  RefreshCw,
  ArrowUpDown,
  Timer,
  CircleDot,
  X,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { ordenes, cotizacionesEnviadas, analyticsCotizaciones } from "../data/mockData";
import React from "react";

type TabType = "ordenes" | "cotizaciones" | "entregas" | "historial";
type OrdenFilter = "todas" | "en_transito" | "preparando" | "entregada";
type CotizacionFilter = "todas" | "pendiente" | "ganada" | "perdida";

export default function Operaciones() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("ordenes");
  const [ordenFilter, setOrdenFilter] = useState<OrdenFilter>("todas");
  const [cotizacionFilter, setCotizacionFilter] = useState<CotizacionFilter>("todas");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrar órdenes
  const ordenesFiltradas = ordenes. filter((o) => {
    if (ordenFilter === "todas") return true;
    return o.estado === ordenFilter;
  });

  // Filtrar cotizaciones
  const cotizacionesFiltradas = cotizacionesEnviadas.filter((c) => {
    if (cotizacionFilter === "todas") return true;
    return c.estado === cotizacionFilter;
  });

  // Stats
  const stats = {
    ordenesActivas: ordenes.filter((o) => o. estado !== "entregada" && o.estado !== "cancelada").length,
    enTransito: ordenes.filter((o) => o.estado === "en_transito").length,
    cotizacionesPendientes: cotizacionesEnviadas.filter((c) => c.estado === "pendiente").length,
    tasaExito: analyticsCotizaciones.tasaExito,
  };

  const tabs = [
    { id: "ordenes" as TabType, label: "Órdenes", icon: Package, count: ordenes.length },
    { id: "cotizaciones" as TabType, label: "Cotizaciones", icon: FileText, count: cotizacionesEnviadas.length },
    { id: "entregas" as TabType, label: "En tránsito", icon: Truck, count: stats.enTransito },
    { id: "historial" as TabType, label: "Historial", icon: Clock, count: null },
  ];

  const getEstadoConfig = (estado: string) => {
    switch (estado) {
      case "en_transito":
        return { label: "En tránsito", color: "bg-teal-100 text-teal-700", dot: "bg-teal-500", icon: Truck };
      case "preparando":
        return { label: "Preparando", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500", icon: Package };
      case "entregada":
        return { label: "Entregada", color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", icon: CheckCircle2 };
      case "confirmada":
        return { label: "Confirmada", color: "bg-blue-100 text-blue-700", dot: "bg-blue-500", icon: CheckCircle2 };
      case "cancelada":
        return { label: "Cancelada", color: "bg-red-100 text-red-700", dot: "bg-red-500", icon: XCircle };
      case "pendiente":
        return { label: "Pendiente", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500", icon: Clock };
      case "ganada":
        return { label: "Ganada", color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", icon: CheckCircle2 };
      case "perdida":
        return { label: "Perdida", color: "bg-red-100 text-red-700", dot: "bg-red-500", icon: XCircle };
      default:
        return { label: estado, color: "bg-slate-100 text-slate-700", dot: "bg-slate-500", icon: CircleDot };
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Package className="w-7 h-7 text-teal-600" />
          Mis Operaciones
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Gestiona tus órdenes, cotizaciones y entregas
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS CARDS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg transition-all cursor-pointer" onClick={() => setActiveTab("ordenes")}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
              <Package className="w-4 h-4 text-teal-600" />
            </div>
            <span className="text-xs font-medium text-slate-500">Órdenes activas</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats.ordenesActivas}</div>
          <div className="text-xs text-teal-600 mt-1">En proceso</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg transition-all cursor-pointer" onClick={() => setActiveTab("entregas")}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
              <Truck className="w-4 h-4 text-violet-600" />
            </div>
            <span className="text-xs font-medium text-slate-500">En tránsito</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats.enTransito}</div>
          <div className="text-xs text-violet-600 mt-1 flex items-center gap-1">
            <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
            En camino
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg transition-all cursor-pointer" onClick={() => setActiveTab("cotizaciones")}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <FileText className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-xs font-medium text-slate-500">Cotizaciones</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats.cotizacionesPendientes}</div>
          <div className="text-xs text-amber-600 mt-1">Pendientes respuesta</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg transition-all cursor-pointer">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-xs font-medium text-slate-500">Tasa de éxito</span>
          </div>
          <div className="text-2xl font-bold text-slate-800">{stats.tasaExito}%</div>
          <div className="text-xs text-emerald-600 mt-1">+18% vs mercado</div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TABS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2. 5 rounded-xl font-medium text-sm whitespace-nowrap transition-all",
                isActive
                  ?  "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-500/25"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-teal-300"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== null && (
                <span className={cn("text-xs px-2 py-0.5 rounded-full", isActive ?  "bg-white/20" : "bg-slate-100")}>
                  {tab. count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: ÓRDENES
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "ordenes" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar orden..."
                className="w-full h-10 pl-9 pr-4 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-teal-400"
              />
            </div>

            {(["todas", "en_transito", "preparando", "entregada"] as OrdenFilter[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setOrdenFilter(filter)}
                className={cn(
                  "px-3 py-2 rounded-xl text-sm font-medium transition-all",
                  ordenFilter === filter
                    ? "bg-teal-100 text-teal-700 border border-teal-200"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                )}
              >
                {filter === "todas" ? "Todas" : filter === "en_transito" ? "En tránsito" : filter === "preparando" ? "Preparando" : "Entregadas"}
              </button>
            ))}
          </div>

          {/* Órdenes list */}
          <div className="space-y-4">
            {ordenesFiltradas.map((orden) => {
              const estadoConfig = getEstadoConfig(orden.estado);
              const EstadoIcon = estadoConfig. icon;

              return (
                <div
                  key={orden.id}
                  onClick={() => navigate(`/tracking/${orden.id}`)}
                  className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:border-teal-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                      orden. estado === "en_transito"
                        ? "bg-gradient-to-br from-teal-500 to-cyan-500 text-white"
                        : orden.estado === "entregada"
                        ? "bg-gradient-to-br from-emerald-500 to-green-500 text-white"
                        : "bg-gradient-to-br from-amber-500 to-orange-500 text-white"
                    )}>
                      <EstadoIcon className="w-7 h-7" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                              Orden #{orden.id}
                            </h3>
                            <span className={cn(
                              "inline-flex items-center gap-1. 5 text-xs px-2. 5 py-1 rounded-full font-medium",
                              estadoConfig.color
                            )}>
                              <span className={cn("w-1.5 h-1.5 rounded-full", estadoConfig.dot, orden.estado === "en_transito" && "animate-pulse")} />
                              {estadoConfig.label}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 mt-1">
                            {orden.proveedorNombre}
                          </p>
                        </div>
                        <span className="text-xs text-slate-400">{orden.fechaOrden}</span>
                      </div>

                      {/* Productos */}
                      <div className="bg-slate-50 rounded-xl p-3 mb-3">
                        {orden.productos.map((prod, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <span className="text-slate-700">{prod.nombre}</span>
                            <span className="text-slate-500">{prod. cantidad}</span>
                          </div>
                        ))}
                      </div>

                      {/* Ruta (si tiene transporte) */}
                      {orden.conTransporte && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span>{orden.origen}</span>
                          <ArrowRight className="w-4 h-4 text-slate-300" />
                          <span>{orden.destino}</span>
                          {orden.distanciaKm && (
                            <span className="text-slate-400 ml-auto">{orden.distanciaKm} km</span>
                          )}
                        </div>
                      )}

                      {/* Progress (si en tránsito) */}
                      {orden.estado === "en_transito" && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs mb-1. 5">
                            <span className="text-slate-500">Progreso</span>
                            <span className="font-semibold text-teal-600">{orden.progreso}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
                              style={{ width: `${orden.progreso}%` }}
                            />
                          </div>
                          {orden.ubicacionActual && (
                            <div className="text-xs text-slate-500 mt-1. 5">
                              📍 {orden.ubicacionActual}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1. 5">
                            <Calendar className="w-4 h-4" />
                            {orden.estado === "entregada"
                              ? `Entregado: ${orden.fechaEntregaReal}`
                              : `ETA: ${orden.fechaEntregaEstimada}`}
                          </span>
                          {orden.temperatura && (
                            <span className="flex items-center gap-1 text-teal-600">
                              <Thermometer className="w-4 h-4" />
                              {orden.temperatura}°C
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-800">
                            ${orden.total.toLocaleString()}
                          </span>
                          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: COTIZACIONES
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "cotizaciones" && (
        <div className="space-y-4">
          {/* IA Insight */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-4 border border-violet-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-violet-800 text-sm">Tu desempeño</h3>
                <p className="text-violet-700 text-sm mt-1">
                  Tienes <strong>{analyticsCotizaciones.tasaExito}% de tasa de éxito</strong>, 
                  {analyticsCotizaciones.tasaExito - analyticsCotizaciones.promedioMercado} puntos arriba del mercado.  
                  Las cotizaciones que respondes en menos de 2h tienen 40% más probabilidad de ganar.
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {(["todas", "pendiente", "ganada", "perdida"] as CotizacionFilter[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setCotizacionFilter(filter)}
                className={cn(
                  "px-3 py-2 rounded-xl text-sm font-medium transition-all",
                  cotizacionFilter === filter
                    ? "bg-violet-100 text-violet-700 border border-violet-200"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                )}
              >
                {filter === "todas" ? "Todas" : filter === "pendiente" ? "⏳ Pendientes" : filter === "ganada" ? "✅ Ganadas" : "❌ Perdidas"}
              </button>
            ))}
          </div>

          {/* Stats resumen */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
              <div className="text-2xl font-bold text-slate-800">{analyticsCotizaciones. totalEnviadas}</div>
              <div className="text-xs text-slate-500">Enviadas</div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
              <div className="text-2xl font-bold text-amber-600">{analyticsCotizaciones.pendientes}</div>
              <div className="text-xs text-slate-500">Pendientes</div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
              <div className="text-2xl font-bold text-emerald-600">{analyticsCotizaciones.ganadas}</div>
              <div className="text-xs text-slate-500">Ganadas</div>
            </div>
            <div className="bg-white rounded-xl p-3 border border-slate-200 text-center">
              <div className="text-2xl font-bold text-red-500">{analyticsCotizaciones.perdidas}</div>
              <div className="text-xs text-slate-500">Perdidas</div>
            </div>
          </div>

          {/* Cotizaciones list */}
          <div className="space-y-4">
            {cotizacionesFiltradas.map((cotizacion) => {
              const estadoConfig = getEstadoConfig(cotizacion.estado);

              return (
                <div
                  key={cotizacion. id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-violet-200 transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                      cotizacion.estado === "pendiente"
                        ? "bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600"
                        : cotizacion.estado === "ganada"
                        ? "bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600"
                        : "bg-gradient-to-br from-red-100 to-red-50 text-red-500"
                    )}>
                      <FileText className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={cn(
                              "text-xs px-2. 5 py-1 rounded-full font-medium capitalize",
                              cotizacion.tipo === "transporte" ? "bg-violet-100 text-violet-700" :
                              cotizacion.tipo === "producto" ? "bg-teal-100 text-teal-700" :
                              "bg-cyan-100 text-cyan-700"
                            )}>
                              {cotizacion.tipo}
                            </span>
                            <span className={cn(
                              "inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium",
                              estadoConfig.color
                            )}>
                              <span className={cn("w-1.5 h-1.5 rounded-full", estadoConfig.dot)} />
                              {estadoConfig.label}
                            </span>
                          </div>
                          <h3 className="font-semibold text-slate-800 mt-2">
                            {cotizacion. solicitudTitulo}
                          </h3>
                        </div>
                        <span className="text-xs text-slate-400">{cotizacion.fechaEnvio}</span>
                      </div>

                      {/* Tu cotización */}
                      <div className="bg-slate-50 rounded-xl p-3 mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-500">Tu cotización</span>
                          <span className="text-lg font-bold text-slate-800">
                            ${cotizacion. monto.toLocaleString()}
                          </span>
                        </div>
                        {cotizacion.estado === "pendiente" && cotizacion.posicion && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-slate-500">Posición actual:</span>
                            <span className={cn(
                              "font-medium",
                              cotizacion.posicion === 1 ? "text-emerald-600" :
                              cotizacion.posicion === 2 ? "text-amber-600" :
                              "text-slate-600"
                            )}>
                              #{cotizacion.posicion} de {cotizacion.totalCotizaciones}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Incluye */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {cotizacion.incluye. slice(0, 3).map((item, i) => (
                          <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                            ✓ {item}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="text-sm text-slate-500">
                          Entrega: {cotizacion.fechaEntrega}
                        </div>
                        <div className="flex gap-2">
                          {cotizacion.estado === "pendiente" && (
                            <>
                              <button className="text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1. 5 rounded-lg transition-colors">
                                Modificar
                              </button>
                              <button className="text-sm font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-lg transition-colors">
                                Ver solicitud
                              </button>
                            </>
                          )}
                          {cotizacion. estado === "ganada" && (
                            <button
                              onClick={() => navigate("/orden")}
                              className="text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-green-600 px-3 py-1.5 rounded-lg"
                            >
                              Ver orden
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: EN TRÁNSITO
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "entregas" && (
        <div className="space-y-4">
          {ordenes.filter((o) => o.estado === "en_transito").length > 0 ? (
            ordenes
              .filter((o) => o.estado === "en_transito")
              .map((orden) => (
                <div
                  key={orden.id}
                  onClick={() => navigate(`/tracking/${orden.id}`)}
                  className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:border-teal-200 transition-all cursor-pointer group"
                >
                  {/* Live indicator */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center gap-2 text-xs bg-teal-100 text-teal-700 px-3 py-1. 5 rounded-full font-medium">
                      <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                      En vivo
                    </span>
                    <span className="text-xs text-slate-400">Actualizado {orden.ultimaActualizacion}</span>
                  </div>

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/25 shrink-0">
                      <Truck className="w-8 h-8" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-slate-800 text-lg">Orden #{orden.id}</h3>
                          <p className="text-sm text-slate-500">
                            {orden.productos[0].nombre} • {orden.transportistaNombre}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-slate-500">ETA</div>
                          <div className="font-bold text-teal-600">{orden.fechaEntregaEstimada}</div>
                        </div>
                      </div>

                      {/* Ruta visual */}
                      <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="text-xs text-slate-500 mb-1">Origen</div>
                            <div className="font-medium text-slate-800 text-sm">{orden.origen}</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <ArrowRight className="w-5 h-5 text-teal-500" />
                            <span className="text-xs text-slate-400 mt-1">{orden.distanciaKm} km</span>
                          </div>
                          <div className="flex-1 text-right">
                            <div className="text-xs text-slate-500 mb-1">Destino</div>
                            <div className="font-medium text-slate-800 text-sm">{orden.destino}</div>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-xs mb-1. 5">
                            <span className="text-slate-500">Progreso del viaje</span>
                            <span className="font-bold text-teal-600">{orden.progreso}%</span>
                          </div>
                          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all"
                              style={{ width: `${orden.progreso}%` }}
                            />
                          </div>
                        </div>

                        {/* Ubicación actual */}
                        {orden.ubicacionActual && (
                          <div className="flex items-center gap-2 mt-3 text-sm text-slate-600">
                            <MapPin className="w-4 h-4 text-teal-500" />
                            <span>{orden.ubicacionActual}</span>
                          </div>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm">
                        {orden.temperatura && (
                          <span className="flex items-center gap-1. 5 bg-cyan-50 text-cyan-700 px-3 py-1.5 rounded-lg">
                            <Thermometer className="w-4 h-4" />
                            {orden.temperatura}°C ✓
                          </span>
                        )}
                        <span className="text-slate-500">
                          Total: <strong className="text-slate-800">${orden.total.toLocaleString()}</strong>
                        </span>
                        <button className="ml-auto text-sm font-medium text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Ver tracking
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Truck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-700 mb-2">No hay envíos en tránsito</h3>
              <p className="text-sm text-slate-500">Cuando tengas órdenes en camino aparecerán aquí. </p>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: HISTORIAL
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "historial" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <button className="px-3 py-2 rounded-xl text-sm font-medium bg-teal-100 text-teal-700 border border-teal-200">
              Últimos 30 días
            </button>
            <button className="px-3 py-2 rounded-xl text-sm font-medium bg-white text-slate-600 border border-slate-200 hover:border-slate-300">
              Últimos 90 días
            </button>
            <button className="px-3 py-2 rounded-xl text-sm font-medium bg-white text-slate-600 border border-slate-200 hover:border-slate-300">
              Este año
            </button>
          </div>

          {/* Analytics cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-5 text-white">
              <div className="text-white/70 text-sm mb-1">Total transaccionado</div>
              <div className="text-3xl font-bold">$1. 2M</div>
              <div className="text-white/70 text-sm mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> +23% vs período anterior
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl p-5 text-white">
              <div className="text-white/70 text-sm mb-1">Órdenes completadas</div>
              <div className="text-3xl font-bold">47</div>
              <div className="text-white/70 text-sm mt-2">98% tasa de éxito</div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl p-5 text-white">
              <div className="text-white/70 text-sm mb-1">Ahorro estimado</div>
              <div className="text-3xl font-bold">$45k</div>
              <div className="text-white/70 text-sm mt-2">vs. precios de mercado</div>
            </div>
          </div>

          {/* Historial list */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-700">Historial de operaciones</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {ordenes.filter((o) => o.estado === "entregada").map((orden) => (
                <div key={orden.id} className="px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-800">Orden #{orden.id}</div>
                        <div className="text-sm text-slate-500">{orden.proveedorNombre}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-800">${orden.total.toLocaleString()}</div>
                      <div className="text-xs text-slate-400">{orden.fechaEntregaReal}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}