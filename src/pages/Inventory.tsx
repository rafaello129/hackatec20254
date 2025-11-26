import {
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Plus,
  Sparkles,
  ChevronRight,
  ShoppingCart,
  Clock,
  ArrowRight,
  RefreshCw,
  DollarSign,
  Boxes,
  AlertCircle,
  CheckCircle,
  XCircle,
  Zap,
  Eye,
  MoreHorizontal,
  BarChart3,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  inventarioProductos,
  alertasInventario,
  resumenInventario,
} from "../data/mockData";

export default function InventarioInteligente() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = React.useState("");
  const [filtroCategoria, setFiltroCategoria] = React.useState("todas");
  const [filtroEstado, setFiltroEstado] = React.useState("todos");

  // Obtener categorías únicas
  const categorias = [
    "todas",
    ... new Set(inventarioProductos.map((p) => p.categoria)),
  ];

  // Filtrar productos
  const productosFiltrados = inventarioProductos. filter((producto) => {
    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto. sku.toLowerCase().includes(busqueda. toLowerCase());
    const coincideCategoria =
      filtroCategoria === "todas" || producto.categoria === filtroCategoria;
    const coincideEstado =
      filtroEstado === "todos" || producto. estadoStock === filtroEstado;
    return coincideBusqueda && coincideCategoria && coincideEstado;
  });

  // Contadores para el header
  const productosOptimos = inventarioProductos.filter(
    (p) => p.estadoStock === "optimo"
  ). length;
  const productosAtencion = inventarioProductos.filter(
    (p) =>
      p.estadoStock === "bajo" ||
      p.estadoStock === "critico" ||
      p.estadoStock === "agotado"
  ).length;

  // Helpers para estilos
  const getEstadoStyle = (estado: string) => {
    switch (estado) {
      case "optimo":
        return {
          bg: "bg-teal-100",
          text: "text-teal-700",
          label: "Óptimo",
          icon: CheckCircle,
        };
      case "bajo":
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          label: "Bajo",
          icon: AlertCircle,
        };
      case "critico":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          label: "Crítico",
          icon: AlertTriangle,
        };
      case "agotado":
        return {
          bg: "bg-red-200",
          text: "text-red-800",
          label: "Agotado",
          icon: XCircle,
        };
      case "exceso":
        return {
          bg: "bg-violet-100",
          text: "text-violet-700",
          label: "Exceso",
          icon: Boxes,
        };
      default:
        return {
          bg: "bg-slate-100",
          text: "text-slate-700",
          label: estado,
          icon: Package,
        };
    }
  };

  const getAlertaStyle = (tipo: string) => {
    switch (tipo) {
      case "reabastecimiento":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          icon: ShoppingCart,
          iconColor: "text-amber-600",
          iconBg: "bg-amber-100",
        };
      case "exceso":
        return {
          bg: "bg-violet-50",
          border: "border-violet-200",
          icon: Boxes,
          iconColor: "text-violet-600",
          iconBg: "bg-violet-100",
        };
      case "lento":
        return {
          bg: "bg-slate-50",
          border: "border-slate-200",
          icon: Clock,
          iconColor: "text-slate-600",
          iconBg: "bg-slate-100",
        };
      case "oportunidad":
        return {
          bg: "bg-teal-50",
          border: "border-teal-200",
          icon: Zap,
          iconColor: "text-teal-600",
          iconBg: "bg-teal-100",
        };
      default:
        return {
          bg: "bg-slate-50",
          border: "border-slate-200",
          icon: AlertCircle,
          iconColor: "text-slate-600",
          iconBg: "bg-slate-100",
        };
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 p-6 text-white shadow-xl shadow-teal-500/25">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-indigo-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-400/10 rounded-full blur-xl" />

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/10">
                <Boxes className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">
                  Inventario Inteligente
                </h1>
                <p className="text-white/80">
                  Control total de tu stock con IA predictiva
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-medium text-sm px-4 py-2. 5 rounded-xl hover:bg-white/30 transition-all">
                <RefreshCw className="w-4 h-4" />
                Sincronizar
              </button>
              <button className="inline-flex items-center gap-2 bg-white text-cyan-700 font-semibold text-sm px-5 py-2. 5 rounded-xl hover:bg-violet-50 transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5">
                <Plus className="w-4 h-4" />
                Nuevo Producto
              </button>
            </div>
          </div>

          {/* Stats en el hero */}
          
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTENIDO PRINCIPAL: TABLA + ALERTAS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* ─────────────────────────────────────────────────────────────────
            TABLA DE INVENTARIO (2/3)
        ───────────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header de la tabla mejorado */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 p-5 border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800 text-lg">
                    Catálogo de Productos
                  </h2>
                  <p className="text-xs text-slate-500">
                    {inventarioProductos.length} productos registrados
                  </p>
                </div>
              </div>

              {/* Indicadores rápidos */}
              <div className="hidden md:flex items-center gap-2">
                <span className="inline-flex items-center gap-1. 5 text-xs bg-teal-100 text-teal-700 px-3 py-1. 5 rounded-full font-medium">
                  <CheckCircle className="w-3. 5 h-3.5" />
                  {productosOptimos} óptimos
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full font-medium">
                  <AlertCircle className="w-3. 5 h-3.5" />
                  {productosAtencion} atención
                </span>
              </div>
            </div>

            {/* Búsqueda y filtros */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o SKU..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e. target.value)}
                  className="w-full pl-10 pr-4 py-2. 5 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all shadow-sm"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="px-4 py-2. 5 rounded-xl bg-white border border-slate-200 text-slate-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all shadow-sm text-sm"
                >
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "todas" ? "Todas las categorías" : cat}
                    </option>
                  ))}
                </select>

                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target. value)}
                  className="px-4 py-2. 5 rounded-xl bg-white border border-slate-200 text-slate-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all shadow-sm text-sm"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="optimo">Óptimo</option>
                  <option value="bajo">Stock Bajo</option>
                  <option value="critico">Crítico</option>
                  <option value="agotado">Agotado</option>
                  <option value="exceso">Exceso</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabla de productos */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/80 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Producto
                      </span>
                    </div>
                  </th>
                  <th className="text-left px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Boxes className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Stock
                      </span>
                    </div>
                  </th>
                  <th className="text-left px-5 py-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Estado
                      </span>
                    </div>
                  </th>
                  <th className="text-left px-5 py-4">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                        Proveedor
                      </span>
                    </div>
                  </th>
                  <th className="text-center px-5 py-4">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Acciones
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {productosFiltrados. map((producto) => {
                  const estadoStyle = getEstadoStyle(producto.estadoStock);
                  const EstadoIcon = estadoStyle.icon;
                  return (
                    <tr
                      key={producto.id}
                      className="hover:bg-violet-50/30 transition-colors group"
                    >
                      {/* Producto */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-50 flex items-center justify-center border border-violet-100">
                            <Package className="w-5 h-5 text-cyan-500" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 group-hover:text-cyan-600 transition-colors">
                              {producto.nombre}
                            </p>
                            <p className="text-xs text-slate-500">
                              {producto.sku} · {producto.categoria}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold text-slate-800">
                            {producto.stockActual. toLocaleString()}{" "}
                            <span className="text-slate-400 font-normal text-sm">
                              {producto. unidad}
                            </span>
                          </p>
                          <div className="flex items-center gap-2 mt-1. 5">
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  producto.estadoStock === "optimo"
                                    ?  "bg-gradient-to-r from-teal-500 to-emerald-400"
                                    : producto.estadoStock === "bajo"
                                    ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                                    : producto.estadoStock === "critico" ||
                                      producto.estadoStock === "agotado"
                                    ? "bg-gradient-to-r from-red-500 to-rose-400"
                                    : "bg-gradient-to-r from-violet-500 to-purple-400"
                                }`}
                                style={{
                                  width: `${Math.min(
                                    (producto.stockActual / producto.stockMaximo) *
                                      100,
                                    100
                                  )}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs text-slate-500 font-medium">
                              {producto.diasInventario}d
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Estado */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1. 5 text-xs font-medium px-3 py-1. 5 rounded-full ${estadoStyle.bg} ${estadoStyle. text}`}
                        >
                          <EstadoIcon className="w-3. 5 h-3.5" />
                          {estadoStyle.label}
                        </span>
                      </td>

                      {/* Proveedor */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-600 truncate max-w-[140px]">
                          {producto.proveedor}
                        </p>
                      </td>

                      {/* Acciones */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-1. 5">
                          <button
                            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-violet-100 hover:text-violet-600 transition-colors"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-teal-100 hover:text-teal-600 transition-colors"
                            title="Reabastecer"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                          <button
                            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                            title="Más opciones"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Mostrando{" "}
                <span className="font-semibold text-slate-700">
                  {productosFiltrados. length}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-slate-700">
                  {inventarioProductos.length}
                </span>{" "}
                productos
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
            ALERTAS Y SUGERENCIAS (1/3)
        ───────────────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Header de alertas */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">Alertas IA</h2>
                  <p className="text-xs text-slate-500">
                    {alertasInventario.length} sugerencias activas
                  </p>
                </div>
              </div>
              <button className="text-xs text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1">
                Ver todo
                <ChevronRight className="w-3. 5 h-3.5" />
              </button>
            </div>

            {/* Resumen de ahorro */}
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-3 border border-teal-100">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span className="text-xs font-medium text-teal-700">
                  Ahorro potencial este mes
                </span>
              </div>
              <p className="text-2xl font-bold text-teal-700">
                ${resumenInventario.ahorroOptimizacion. toLocaleString()}
              </p>
            </div>
          </div>

          {/* Lista de alertas */}
          <div className="space-y-3">
            {alertasInventario. map((alerta) => {
              const estilo = getAlertaStyle(alerta. tipo);
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
                          {alerta.productoNombre}
                        </span>
                        <span
                          className={`text-[10px] px-1. 5 py-0.5 rounded font-medium shrink-0 ${getPrioridadStyle(
                            alerta. prioridad
                          )}`}
                        >
                          {alerta. prioridad === "alta"
                            ? "🔴"
                            : alerta.prioridad === "media"
                            ? "🟡"
                            : "🟢"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-2 line-clamp-2">
                        {alerta.mensaje}
                      </p>

                      {/* Sugerencia */}
                      <div className="flex items-start gap-1. 5 bg-slate-50 rounded-lg p-2">
                        <Sparkles className="w-3 h-3 text-violet-500 mt-0.5 shrink-0" />
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {alerta.accionSugerida}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-slate-400">
                          {alerta.fecha}
                        </span>
                        {alerta.ahorroPotencial && (
                          <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                            +${alerta.ahorroPotencial.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA optimización */}
          
        </div>
      </div>
    </div>
  );
}