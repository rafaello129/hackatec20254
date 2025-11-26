import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Target,
  Sparkles,
  Search,
  Filter,
  ChevronDown,
  TrendingUp,
  DollarSign,
  Clock,
  Eye,
  MessageSquare,
  MapPin,
  ArrowRight,
  Truck,
  Package,
  Wrench,
  Thermometer,
  Zap,
  BadgeCheck,
  Star,
  Bell,
  ArrowUpDown,
  Calendar,
  AlertCircle,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { solicitudes, analyticsCotizaciones } from "../data/mockData";
import React from "react";

type FilterType = "todas" | "para-mi" | "urgentes" | "mayor-valor";
type TipoFilter = "todos" | "producto" | "servicio" | "transporte";

export default function Oportunidades() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>("para-mi");
  const [tipoFilter, setTipoFilter] = useState<TipoFilter>("todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrar solicitudes
  const solicitudesFiltradas = solicitudes.filter((sol) => {
    if (tipoFilter !== "todos" && sol.tipo !== tipoFilter) return false;
    if (activeFilter === "para-mi" && sol.matchScore < 80) return false;
    if (activeFilter === "urgentes" && ! sol.cierraEn. includes("hora") && ! sol.cierraEn. includes("1 día")) return false;
    return true;
  }). sort((a, b) => {
    if (activeFilter === "mayor-valor") {
      return (b.presupuestoMax || 0) - (a.presupuestoMax || 0);
    }
    return b.matchScore - a.matchScore;
  });

  // Stats
  const stats = [
    {
      icon: Target,
      label: "Solicitudes activas",
      value: solicitudes.length. toString(),
      change: "+5 hoy",
      color: "teal",
    },
    {
      icon: Sparkles,
      label: "Match alto para ti",
      value: solicitudes.filter(s => s. matchScore >= 85).length.toString(),
      change: "Score 85%+",
      color: "violet",
    },
    {
      icon: DollarSign,
      label: "Valor total",
      value: "$2. 4M",
      change: "En oportunidades",
      color: "cyan",
    },
    {
      icon: TrendingUp,
      label: "Tu tasa de éxito",
      value: `${analyticsCotizaciones.tasaExito}%`,
      change: `+${analyticsCotizaciones. tasaExito - analyticsCotizaciones.promedioMercado}% vs mercado`,
      color: "emerald",
    },
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "transporte": return Truck;
      case "producto": return Package;
      case "servicio": return Wrench;
      default: return Package;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "transporte": return "violet";
      case "producto": return "teal";
      case "servicio": return "cyan";
      default: return "slate";
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Target className="w-7 h-7 text-teal-600" />
            Centro de Oportunidades
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Solicitudes activas del mercado que coinciden con tu perfil
          </p>
        </div>
        <button className="relative w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:border-teal-300 hover:bg-teal-50 transition-all">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            12
          </span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          IA INSIGHT CARD
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700 p-5 text-white shadow-xl shadow-violet-500/20">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <h2 className="font-bold text-lg mb-1">Análisis de oportunidades</h2>
              <p className="text-white/80 text-sm leading-relaxed">
                <strong>3 solicitudes de transporte refrigerado</strong> Culiacán → Guadalajara coinciden 
                con tu ruta disponible de mañana. Si ofreces un paquete consolidado podrías ganar 
                <strong className="text-yellow-300"> ~$45,000</strong> en un solo viaje.
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <button className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-violet-50 transition-all shadow-lg">
                  Ver las 3 solicitudes
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-medium text-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-all">
                  Crear oferta consolidada
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS GRID
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            teal: { bg: "bg-teal-50", iconBg: "bg-teal-100", text: "text-teal-600" },
            violet: { bg: "bg-violet-50", iconBg: "bg-violet-100", text: "text-violet-600" },
            cyan: { bg: "bg-cyan-50", iconBg: "bg-cyan-100", text: "text-cyan-600" },
            emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", text: "text-emerald-600" },
          }[stat.color];

          return (
            <div
              key={index}
              className={cn("rounded-2xl p-4 border border-slate-100", colorClasses?. bg)}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colorClasses?.iconBg)}>
                  <Icon className={cn("w-4 h-4", colorClasses?.text)} />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
              <div className={cn("text-xs font-medium mt-1", colorClasses?.text)}>{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SEARCH & FILTERS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar solicitudes por producto, ruta, empresa..."
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
            >
              <X className="w-3. 5 h-3.5 text-slate-500" />
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {[
            { id: "para-mi" as FilterType, label: "🎯 Para mí", count: solicitudes.filter(s => s.matchScore >= 80).length },
            { id: "todas" as FilterType, label: "📋 Todas", count: solicitudes.length },
            { id: "urgentes" as FilterType, label: "🔥 Urgentes", count: solicitudes.filter(s => s. cierraEn.includes("hora") || s.cierraEn. includes("1 día")).length },
            { id: "mayor-valor" as FilterType, label: "💰 Mayor valor", count: null },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2. 5 rounded-xl font-medium text-sm whitespace-nowrap transition-all",
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-violet-300"
              )}
            >
              {filter.label}
              {filter.count !== null && (
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  activeFilter === filter.id ?  "bg-white/20" : "bg-slate-100"
                )}>
                  {filter.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Type filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-500">Tipo:</span>
          {[
            { id: "todos" as TipoFilter, label: "Todos", icon: null },
            { id: "producto" as TipoFilter, label: "Productos", icon: Package },
            { id: "servicio" as TipoFilter, label: "Servicios", icon: Wrench },
            { id: "transporte" as TipoFilter, label: "Transporte", icon: Truck },
          ]. map((tipo) => {
            const Icon = tipo.icon;
            return (
              <button
                key={tipo.id}
                onClick={() => setTipoFilter(tipo. id)}
                className={cn(
                  "flex items-center gap-1. 5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  tipoFilter === tipo.id
                    ? "bg-teal-100 text-teal-700 border border-teal-200"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                )}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {tipo.label}
              </button>
            );
          })}

          <div className="ml-auto flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-white text-slate-600 border border-slate-200 hover:border-slate-300 transition-all">
              <Filter className="w-4 h-4" />
              Más filtros
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-white text-slate-600 border border-slate-200 hover:border-slate-300 transition-all">
              <ArrowUpDown className="w-4 h-4" />
              Ordenar
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SOLICITUDES LIST
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">
            {solicitudesFiltradas.length} oportunidades encontradas
          </h2>
        </div>

        {solicitudesFiltradas.map((solicitud) => {
          const TipoIcon = getTipoIcon(solicitud.tipo);
          const tipoColor = getTipoColor(solicitud.tipo);

          const colorClasses = {
            teal: {
              iconBg: "bg-gradient-to-br from-teal-500 to-cyan-500",
              matchBg: "bg-gradient-to-r from-teal-50 to-cyan-50",
              matchBorder: "border-teal-100",
              matchText: "text-teal-700",
              badge: "bg-teal-100 text-teal-700",
            },
            violet: {
              iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
              matchBg: "bg-gradient-to-r from-violet-50 to-purple-50",
              matchBorder: "border-violet-100",
              matchText: "text-violet-700",
              badge: "bg-violet-100 text-violet-700",
            },
            cyan: {
              iconBg: "bg-gradient-to-br from-cyan-500 to-teal-500",
              matchBg: "bg-gradient-to-r from-cyan-50 to-teal-50",
              matchBorder: "border-cyan-100",
              matchText: "text-cyan-700",
              badge: "bg-cyan-100 text-cyan-700",
            },
            slate: {
              iconBg: "bg-gradient-to-br from-slate-500 to-slate-600",
              matchBg: "bg-slate-50",
              matchBorder: "border-slate-100",
              matchText: "text-slate-700",
              badge: "bg-slate-100 text-slate-700",
            },
          }[tipoColor];

          return (
            <div
              key={solicitud.id}
              onClick={() => navigate(`/cotizar/${solicitud.id}`)}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:border-violet-200 transition-all cursor-pointer group"
            >
              {/* Match Score Banner */}
              <div className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl mb-4 border",
                colorClasses?.matchBg,
                colorClasses?.matchBorder
              )}>
                <Sparkles className={cn("w-4 h-4", colorClasses?.matchText)} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("font-bold", colorClasses?.matchText)}>
                      Match {solicitud.matchScore}%
                    </span>
                    <div className="flex-1 h-2 bg-white/60 rounded-full overflow-hidden max-w-[100px]">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          solicitud.matchScore >= 90 ? "bg-emerald-500" :
                          solicitud.matchScore >= 80 ? "bg-teal-500" :
                          solicitud.matchScore >= 70 ?  "bg-cyan-500" : "bg-violet-500"
                        )}
                        style={{ width: `${solicitud.matchScore}%` }}
                      />
                    </div>
                  </div>
                  <p className={cn("text-xs mt-0.5", colorClasses?.matchText, "opacity-80")}>
                    {solicitud.matchRazon}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                {/* Icon */}
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg",
                  colorClasses?.iconBg
                )}>
                  <TipoIcon className="w-7 h-7" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={cn(
                          "text-xs px-2. 5 py-1 rounded-full font-medium uppercase tracking-wide",
                          colorClasses?.badge
                        )}>
                          {solicitud.tipo}
                        </span>
                        {solicitud.requiereRefrigerado && (
                          <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Thermometer className="w-3 h-3" />
                            Refrigerado
                          </span>
                        )}
                        {solicitud.cierraEn. includes("hora") && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                            <Zap className="w-3 h-3" />
                            Urgente
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-800 mt-2 group-hover:text-violet-700 transition-colors">
                        {solicitud. titulo}
                      </h3>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {solicitud.fechaPublicacion}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {solicitud. descripcion}
                  </p>

                  {/* Route (if transport) */}
                  {solicitud.ubicacionOrigen && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3 bg-slate-50 rounded-xl px-3 py-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{solicitud.ubicacionOrigen}</span>
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                      <span>{solicitud.ubicacionDestino}</span>
                      {solicitud.distanciaKm && (
                        <span className="text-slate-400 ml-auto">{solicitud.distanciaKm} km</span>
                      )}
                    </div>
                  )}

                  {/* Details grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {solicitud.cantidad && (
                      <div className="flex items-center gap-2 text-sm">
                        <Package className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{solicitud.cantidad}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">{solicitud.fechaRequerida}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">{solicitud.ubicacionDestino. split(",")[0]}</span>
                    </div>
                    {solicitud.requiereRefrigerado && (
                      <div className="flex items-center gap-2 text-sm">
                        <Thermometer className="w-4 h-4 text-cyan-500" />
                        <span className="text-cyan-700">{solicitud.temperaturaMin}° - {solicitud.temperaturaMax}°C</span>
                      </div>
                    )}
                  </div>

                  {/* Budget & Stats */}
                  <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-xs text-slate-500">Presupuesto</span>
                      <div className="font-bold text-slate-800">
                        {solicitud.presupuesto}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1. 5">
                        <Eye className="w-4 h-4" />
                        {solicitud.vistas} vistas
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4" />
                        {solicitud.cotizaciones} cotizaciones
                      </span>
                      <span className="flex items-center gap-1.5 text-amber-600">
                        <Clock className="w-4 h-4" />
                        Cierra en {solicitud.cierraEn}
                      </span>
                    </div>
                  </div>

                  {/* Solicitante */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-slate-600 font-bold text-sm">
                        {solicitud.solicitanteNombre. split(" "). map(w => w[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-700 text-sm">
                            {solicitud.solicitanteNombre}
                          </span>
                          {solicitud.solicitanteVerificado && (
                            <BadgeCheck className="w-4 h-4 text-teal-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>{solicitud. solicitanteRating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Abrir chat
                        }}
                        className="text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors"
                      >
                        Preguntar
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/cotizar/${solicitud. id}`);
                        }}
                        className="text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 px-4 py-2 rounded-xl shadow-lg shadow-violet-500/20 transition-all flex items-center gap-2"
                      >
                        Enviar cotización
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          ANALYTICS PREVIEW
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            Tu desempeño en cotizaciones
          </h3>
          <button
            onClick={() => navigate("/operaciones")}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
          >
            Ver detalle
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="text-3xl font-bold text-slate-800">{analyticsCotizaciones.totalEnviadas}</div>
            <div className="text-sm text-slate-500">Cotizaciones enviadas</div>
            <div className="text-xs text-slate-400 mt-1">Este mes</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="text-3xl font-bold text-emerald-600">{analyticsCotizaciones.ganadas}</div>
            <div className="text-sm text-slate-500">Ganadas</div>
            <div className="text-xs text-emerald-600 mt-1 font-medium">{analyticsCotizaciones. tasaExito}% tasa de éxito</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="text-3xl font-bold text-amber-600">{analyticsCotizaciones.pendientes}</div>
            <div className="text-sm text-slate-500">Pendientes</div>
            <div className="text-xs text-slate-400 mt-1">Esperando respuesta</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="text-3xl font-bold text-teal-600">${(analyticsCotizaciones.valorGanado / 1000).toFixed(0)}k</div>
            <div className="text-sm text-slate-500">Valor ganado</div>
            <div className="text-xs text-slate-400 mt-1">Este mes</div>
          </div>
        </div>

        {/* Quick insight */}
        <div className="mt-4 bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h4 className="font-medium text-slate-800 text-sm">Consejo IA</h4>
              <p className="text-sm text-slate-600 mt-1">
                Tus cotizaciones con respuesta en menos de 2 horas tienen <strong>40% más probabilidad</strong> de ser aceptadas.  
                Activa las notificaciones para responder más rápido.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}