import {
  Users,
  Search,
  Plus,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Building2,
  User,
  Star,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Eye,
  MoreHorizontal,
  Heart,
  UserPlus,
  UserMinus,
  Gift,
  DollarSign,
  Calendar,
  Tag,
  AlertCircle,
  RefreshCw,
  Target,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  clientes,
  insightsClientes,
  resumenCRM,
} from "../data/mockData";

export default function CRMClientes() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = React.useState("");
  const [filtroSegmento, setFiltroSegmento] = React.useState("todos");
  const [filtroEstado, setFiltroEstado] = React.useState("todos");

  // Filtrar clientes
  const clientesFiltrados = clientes.filter((cliente) => {
    const coincideBusqueda =
      cliente.nombre.toLowerCase(). includes(busqueda.toLowerCase()) ||
      cliente.nombreComercial.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente. email.toLowerCase().includes(busqueda.toLowerCase());
    const coincideSegmento =
      filtroSegmento === "todos" || cliente.segmento === filtroSegmento;
    const coincideEstado =
      filtroEstado === "todos" || cliente.estado === filtroEstado;
    return coincideBusqueda && coincideSegmento && coincideEstado;
  });

  // Helpers
  const formatMoney = (amount: number) => {
    if (Math.abs(amount) >= 1000000) {
      return `$${(amount / 1000000). toFixed(2)}M`;
    }
    if (Math.abs(amount) >= 1000) {
      return `$${(amount / 1000). toFixed(0)}k`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getSegmentoStyle = (segmento: string) => {
    switch (segmento) {
      case "vip":
        return { bg: "bg-amber-100", text: "text-amber-700", label: "VIP", icon: Star };
      case "frecuente":
        return { bg: "bg-teal-100", text: "text-teal-700", label: "Frecuente", icon: RefreshCw };
      case "ocasional":
        return { bg: "bg-slate-100", text: "text-slate-700", label: "Ocasional", icon: Clock };
      case "nuevo":
        return { bg: "bg-violet-100", text: "text-violet-700", label: "Nuevo", icon: UserPlus };
      default:
        return { bg: "bg-slate-100", text: "text-slate-700", label: segmento, icon: User };
    }
  };

  const getEstadoStyle = (estado: string) => {
    switch (estado) {
      case "activo":
        return { bg: "bg-teal-100", text: "text-teal-700", label: "Activo" };
      case "inactivo":
        return { bg: "bg-slate-100", text: "text-slate-500", label: "Inactivo" };
      case "prospecto":
        return { bg: "bg-blue-100", text: "text-blue-700", label: "Prospecto" };
      case "en_riesgo":
        return { bg: "bg-red-100", text: "text-red-700", label: "En riesgo" };
      default:
        return { bg: "bg-slate-100", text: "text-slate-700", label: estado };
    }
  };

  const getRiesgoChurnStyle = (riesgo: string) => {
    switch (riesgo) {
      case "bajo":
        return { bg: "bg-teal-500", text: "text-teal-700", label: "Bajo" };
      case "medio":
        return { bg: "bg-amber-500", text: "text-amber-700", label: "Medio" };
      case "alto":
        return { bg: "bg-red-500", text: "text-red-700", label: "Alto" };
      default:
        return { bg: "bg-slate-500", text: "text-slate-700", label: riesgo };
    }
  };

  const getInsightStyle = (tipo: string) => {
    switch (tipo) {
      case "churn":
        return { bg: "bg-red-50", border: "border-red-200", icon: UserMinus, iconColor: "text-red-600", iconBg: "bg-red-100" };
      case "upsell":
        return { bg: "bg-teal-50", border: "border-teal-200", icon: TrendingUp, iconColor: "text-teal-600", iconBg: "bg-teal-100" };
      case "reactivacion":
        return { bg: "bg-amber-50", border: "border-amber-200", icon: RefreshCw, iconColor: "text-amber-600", iconBg: "bg-amber-100" };
      case "felicitacion":
        return { bg: "bg-violet-50", border: "border-violet-200", icon: Gift, iconColor: "text-violet-600", iconBg: "bg-violet-100" };
      default:
        return { bg: "bg-slate-50", border: "border-slate-200", icon: AlertCircle, iconColor: "text-slate-600", iconBg: "bg-slate-100" };
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
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/10">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">Clientes (CRM)</h1>
                <p className="text-white/80">
                  Directorio y análisis inteligente de clientes
                </p>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 bg-white text-cyan-700 font-semibold text-sm px-5 py-2. 5 rounded-xl hover:bg-violet-50 transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5">
              <Plus className="w-4 h-4" />
              Nuevo Cliente
            </button>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTENIDO PRINCIPAL
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ─────────────────────────────────────────────────────────────────
            DIRECTORIO DE CLIENTES (2/3)
        ───────────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 p-5 border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800 text-lg">Directorio de Clientes</h2>
                  <p className="text-xs text-slate-500">{clientes.length} clientes registrados</p>
                </div>
              </div>

              {/* Indicadores rápidos */}
              <div className="hidden md:flex items-center gap-2">
                <span className="inline-flex items-center gap-1. 5 text-xs bg-amber-100 text-amber-700 px-3 py-1. 5 rounded-full font-medium">
                  <Star className="w-3. 5 h-3.5 fill-amber-500" />
                  {clientes.filter(c => c. segmento === "vip").length} VIP
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-full font-medium">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {clientes.filter(c => c.riesgoChurn === "alto").length} en riesgo
                </span>
              </div>
            </div>

            {/* Búsqueda y filtros */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, email..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e. target.value)}
                  className="w-full pl-10 pr-4 py-2. 5 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all shadow-sm"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={filtroSegmento}
                  onChange={(e) => setFiltroSegmento(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all shadow-sm text-sm"
                >
                  <option value="todos">Todos los segmentos</option>
                  <option value="vip">VIP</option>
                  <option value="frecuente">Frecuente</option>
                  <option value="ocasional">Ocasional</option>
                  <option value="nuevo">Nuevo</option>
                </select>

                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e. target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all shadow-sm text-sm"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                  <option value="en_riesgo">En riesgo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lista de clientes */}
          <div className="divide-y divide-slate-100">
            {clientesFiltrados.map((cliente) => {
              const segmentoStyle = getSegmentoStyle(cliente.segmento);
              const estadoStyle = getEstadoStyle(cliente.estado);
              const riesgoStyle = getRiesgoChurnStyle(cliente. riesgoChurn);
              const SegmentoIcon = segmentoStyle.icon;

              return (
                <div
                  key={cliente.id}
                  className="p-5 hover:bg-violet-50/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0 ${
                      cliente.segmento === "vip"
                        ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/25"
                        : "bg-gradient-to-br from-violet-100 to-purple-100 text-violet-600"
                    }`}>
                      {cliente.iniciales}
                    </div>

                    {/* Info principal */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-slate-800 group-hover:text-cyan-600 transition-colors">
                          {cliente.nombreComercial}
                        </h3>
                        {cliente.segmento === "vip" && (
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${segmentoStyle.bg} ${segmentoStyle.text}`}>
                          {segmentoStyle.label}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${estadoStyle. bg} ${estadoStyle.text}`}>
                          {estadoStyle.label}
                        </span>
                      </div>

                      <p className="text-sm text-slate-500 mb-2">{cliente.nombre}</p>

                      {/* Contacto rápido */}
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3. 5 h-3.5" />
                          {cliente. email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5" />
                          {cliente.telefono}
                        </span>
                      </div>

                      {/* Métricas */}
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="bg-slate-50 rounded-lg px-3 py-1. 5">
                          <span className="text-xs text-slate-500">Compras/año</span>
                          <p className="text-sm font-semibold text-slate-800">{formatMoney(cliente. comprasAnuales)}</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg px-3 py-1.5">
                          <span className="text-xs text-slate-500">LTV</span>
                          <p className="text-sm font-semibold text-slate-800">{formatMoney(cliente.ltv)}</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg px-3 py-1.5">
                          <span className="text-xs text-slate-500">Ticket prom</span>
                          <p className="text-sm font-semibold text-slate-800">{formatMoney(cliente.ticketPromedio)}</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg px-3 py-1.5">
                          <span className="text-xs text-slate-500">Última compra</span>
                          <p className="text-sm font-semibold text-slate-800">{cliente.ultimaCompra}</p>
                        </div>
                      </div>

                      {/* Riesgo de churn */}
                      {cliente.riesgoChurn !== "bajo" && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex items-center gap-2 bg-red-50 rounded-lg px-3 py-1.5 border border-red-100">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <span className="text-xs font-medium text-red-700">
                              Riesgo de churn: {cliente.probabilidadChurn}%
                            </span>
                            <div className="w-16 h-1.5 bg-red-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-red-500 rounded-full"
                                style={{ width: `${cliente.probabilidadChurn}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Potencial de crecimiento */}
                      {cliente.potencialCrecimiento >= 30 && cliente.riesgoChurn === "bajo" && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex items-center gap-2 bg-teal-50 rounded-lg px-3 py-1. 5 border border-teal-100">
                            <TrendingUp className="w-4 h-4 text-teal-500" />
                            <span className="text-xs font-medium text-teal-700">
                              Potencial de crecimiento: +{cliente.potencialCrecimiento}%
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Etiquetas */}
                      {cliente.etiquetas. length > 0 && (
                        <div className="flex items-center gap-1. 5 mt-3 flex-wrap">
                          {cliente.etiquetas.slice(0, 4).map((etiqueta, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-cyan-50 text-cyan-600 px-2 py-0.5 rounded-md"
                            >
                              {etiqueta}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-1. 5 shrink-0">
                      <button
                        className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-violet-100 hover:text-violet-600 transition-colors"
                        title="Ver detalle"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-teal-100 hover:text-teal-600 transition-colors"
                        title="Llamar"
                      >
                        <Phone className="w-4 h-4" />
                      </button>
                      <button
                        className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                        title="Más opciones"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Mostrando{" "}
                <span className="font-semibold text-slate-700">
                  {clientesFiltrados.length}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-slate-700">
                  {clientes.length}
                </span>{" "}
                clientes
              </p>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
                  Anterior
                </button>
                <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────
            INSIGHTS IA (1/3)
        ───────────────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Header de insights */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">Customer Insights</h2>
                  <p className="text-xs text-slate-500">
                    {insightsClientes.length} oportunidades detectadas
                  </p>
                </div>
              </div>
            </div>

            {/* Resumen rápido */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                <span className="text-xs text-red-600 font-medium">Riesgo Churn</span>
                <p className="text-xl font-bold text-red-700">
                  {insightsClientes.filter(i => i.tipo === "churn" || i.tipo === "reactivacion").length}
                </p>
              </div>
              <div className="bg-teal-50 rounded-xl p-3 border border-teal-100">
                <span className="text-xs text-teal-600 font-medium">Upselling</span>
                <p className="text-xl font-bold text-teal-700">
                  {insightsClientes.filter(i => i.tipo === "upsell"). length}
                </p>
              </div>
            </div>
          </div>

          {/* Lista de insights */}
          <div className="space-y-3">
            {insightsClientes. map((insight) => {
              const estilo = getInsightStyle(insight.tipo);
              const IconoInsight = estilo.icon;
              return (
                <div
                  key={insight.id}
                  className={`bg-white rounded-xl border ${estilo.border} p-4 hover:shadow-lg transition-all cursor-pointer group`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg ${estilo.iconBg} flex items-center justify-center shrink-0`}
                    >
                      <IconoInsight className={`w-4 h-4 ${estilo.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-800 text-sm truncate">
                          {insight.clienteNombre}
                        </span>
                        <span
                          className={`text-[10px] px-1. 5 py-0.5 rounded font-medium shrink-0 ${getPrioridadStyle(
                            insight.prioridad
                          )}`}
                        >
                          {insight.prioridad === "alta"
                            ? "🔴"
                            : insight.prioridad === "media"
                            ? "🟡"
                            : "🟢"}
                        </span>
                      </div>

                      <p className="text-xs font-medium text-slate-700 mb-1">
                        {insight.titulo}
                      </p>

                      <p className="text-xs text-slate-600 mb-2 line-clamp-2">
                        {insight.mensaje}
                      </p>

                      {/* Impacto */}
                      {insight.impactoPotencial && (
                        <div className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${
                          insight.impactoPotencial >= 0
                            ? "bg-teal-100 text-teal-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {insight.impactoPotencial >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {insight.impactoPotencial >= 0 ?  "+" : ""}{formatMoney(Math.abs(insight. impactoPotencial))}
                        </div>
                      )}

                      {/* Sugerencia */}
                      <div className="flex items-start gap-1. 5 bg-slate-50 rounded-lg p-2">
                        <Sparkles className="w-3 h-3 text-violet-500 mt-0.5 shrink-0" />
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {insight. accionSugerida}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-slate-400">
                          {insight.fecha}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl p-4 text-white shadow-lg shadow-violet-500/25">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Campaña Automática</h3>
                <p className="text-white/70 text-xs">
                  Activa campañas de retención
                </p>
              </div>
            </div>
            <button className="w-full inline-flex items-center justify-center gap-2 bg-white text-violet-700 font-semibold text-sm px-4 py-2. 5 rounded-xl hover:bg-violet-50 transition-all">
              Configurar campañas
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}