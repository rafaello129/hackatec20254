import {
  Package,
  Wrench,
  Search,
  Plus,
  ChevronRight,
  DollarSign,
  Tag,
  Clock,
  Users,
  Star,
  TrendingUp,
  Eye,
  Pencil,
  MoreHorizontal,
  FileText,
  Calendar,
  CheckCircle,
  BarChart3,
  Percent,
  Box,
  Truck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  productosCatalogo,
  serviciosCatalogo,
  resumenCatalogo,
} from "../data/mockData";

export default function GestionProductosServicios() {
  const navigate = useNavigate();
  const [vistaActiva, setVistaActiva] = React.useState<"productos" | "servicios">("productos");
  const [busqueda, setBusqueda] = React.useState("");
  const [filtroCategoria, setFiltroCategoria] = React.useState("todas");

  // Obtener categorías según vista
  const categoriasProductos = [
    "todas",
    ... new Set(productosCatalogo.map((p) => p. categoria)),
  ];
  const categoriasServicios = [
    "todas",
    ...new Set(serviciosCatalogo.map((s) => s.categoria)),
  ];
  const categorias = vistaActiva === "productos" ? categoriasProductos : categoriasServicios;

  // Filtrar según vista
  const productosFiltrados = productosCatalogo.filter((producto) => {
    const coincideBusqueda =
      producto.nombre.toLowerCase(). includes(busqueda.toLowerCase()) ||
      producto. sku.toLowerCase().includes(busqueda. toLowerCase());
    const coincideCategoria =
      filtroCategoria === "todas" || producto.categoria === filtroCategoria;
    return coincideBusqueda && coincideCategoria;
  });

  const serviciosFiltrados = serviciosCatalogo.filter((servicio) => {
    const coincideBusqueda =
      servicio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      servicio.codigo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      filtroCategoria === "todas" || servicio.categoria === filtroCategoria;
    return coincideBusqueda && coincideCategoria;
  });

  // Reset filtro al cambiar vista
  React.useEffect(() => {
    setFiltroCategoria("todas");
    setBusqueda("");
  }, [vistaActiva]);

  return (
    <div className="space-y-6 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HERO HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-cyan-600 to-emerald-600 p-6 text-white shadow-xl shadow-teal-500/25">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-emerald-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-cyan-300/10 rounded-full blur-xl" />

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/10">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">
                  Productos y Servicios
                </h1>
                <p className="text-white/80">
                  Gestiona tu catálogo, precios y márgenes
                </p>
              </div>
            </div>

            <button className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold text-sm px-5 py-2. 5 rounded-xl hover:bg-teal-50 transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5">
              <Plus className="w-4 h-4" />
              {vistaActiva === "productos" ? "Nuevo Producto" : "Nuevo Servicio"}
            </button>
          </div>

          {/* Stats en el hero */}
          
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TABS DE NAVEGACIÓN
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        <button
          onClick={() => setVistaActiva("productos")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
            vistaActiva === "productos"
              ? "bg-white text-teal-700 shadow-md"
              : "text-slate-600 hover:text-slate-800"
          }`}
        >
          <Package className="w-4 h-4" />
          Productos
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            vistaActiva === "productos" 
              ? "bg-teal-100 text-teal-700" 
              : "bg-slate-200 text-slate-600"
          }`}>
            {productosCatalogo.length}
          </span>
        </button>
        <button
          onClick={() => setVistaActiva("servicios")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
            vistaActiva === "servicios"
              ? "bg-white text-teal-700 shadow-md"
              : "text-slate-600 hover:text-slate-800"
          }`}
        >
          <Wrench className="w-4 h-4" />
          Servicios
          <span className={`text-xs px-2 py-0. 5 rounded-full ${
            vistaActiva === "servicios" 
              ? "bg-teal-100 text-teal-700" 
              : "bg-slate-200 text-slate-600"
          }`}>
            {serviciosCatalogo.length}
          </span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTENIDO PRINCIPAL
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header con búsqueda y filtros */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 p-5 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                vistaActiva === "productos"
                  ? "bg-gradient-to-br from-teal-500 to-emerald-600 shadow-teal-500/25"
                  : "bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-500/25"
              }`}>
                {vistaActiva === "productos" ? (
                  <Box className="w-5 h-5 text-white" />
                ) : (
                  <Wrench className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <h2 className="font-bold text-slate-800 text-lg">
                  {vistaActiva === "productos" ? "Catálogo de Productos" : "Catálogo de Servicios"}
                </h2>
                <p className="text-xs text-slate-500">
                  {vistaActiva === "productos"
                    ? "Fichas técnicas, costos y listas de precios"
                    : "Duración, recursos y agendamiento"}
                </p>
              </div>
            </div>
          </div>

          {/* Búsqueda y filtros */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder={vistaActiva === "productos" ? "Buscar por nombre o SKU..." : "Buscar por nombre o código..."}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-10 pr-4 py-2. 5 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
              />
            </div>

            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e. target.value)}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm text-sm"
            >
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "todas" ? "Todas las categorías" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────
            TABLA DE PRODUCTOS
        ───────────────────────────────────────────────────────────────── */}
        {vistaActiva === "productos" && (
          <>
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
                        <DollarSign className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Costo / Precio
                        </span>
                      </div>
                    </th>
                    <th className="text-left px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Margen
                        </span>
                      </div>
                    </th>
                    <th className="text-left px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Listas Precio
                        </span>
                      </div>
                    </th>
                    <th className="text-left px-5 py-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Ventas/Mes
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
                  {productosFiltrados.map((producto) => (
                    <tr
                      key={producto.id}
                      className="hover:bg-teal-50/30 transition-colors group"
                    >
                      {/* Producto */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-50 flex items-center justify-center border border-teal-100">
                            <Package className="w-6 h-6 text-teal-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                                {producto.nombre}
                              </p>
                              {producto.destacado && (
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              )}
                            </div>
                            <p className="text-xs text-slate-500">
                              {producto.sku} · {producto.categoria}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Costo / Precio */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm text-slate-500">
                            Costo: <span className="font-medium text-slate-700">${producto.costoBase}</span>
                          </p>
                          <p className="text-sm">
                            Precio: <span className="font-bold text-slate-800">${producto.precioBase}</span>
                            <span className="text-slate-400 text-xs ml-1">/{producto.unidad}</span>
                          </p>
                        </div>
                      </td>

                      {/* Margen */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${
                            producto.margenBase >= 45 ? "text-teal-600" : 
                            producto. margenBase >= 30 ? "text-amber-600" : "text-red-600"
                          }`}>
                            {producto. margenBase. toFixed(1)}%
                          </span>
                          <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                producto. margenBase >= 45 ? "bg-gradient-to-r from-teal-500 to-emerald-400" :
                                producto.margenBase >= 30 ?  "bg-gradient-to-r from-amber-500 to-yellow-400" :
                                "bg-gradient-to-r from-red-500 to-rose-400"
                              }`}
                              style={{ width: `${Math.min(producto.margenBase, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Listas de Precio */}
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1">
                          {producto.listasPrecios.slice(0, 3).map((lista, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg"
                            >
                              {lista. nombre}: ${lista.precio}
                            </span>
                          ))}
                          {producto.listasPrecios.length > 3 && (
                            <span className="text-xs text-slate-400">
                              +{producto.listasPrecios.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Ventas/Mes */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">
                            {producto.ventasMes. toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-500">{producto.unidad}</span>
                        </div>
                        <p className="text-xs text-slate-400">Ranking #{producto.ranking}</p>
                      </td>

                      {/* Acciones */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-1. 5">
                          <button
                            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-teal-100 hover:text-teal-600 transition-colors"
                            title="Ver ficha técnica"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button
                            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-violet-100 hover:text-violet-600 transition-colors"
                            title="Editar"
                          >
                            <Pencil className="w-4 h-4" />
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
                  ))}
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
                    {productosCatalogo.length}
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
          </>
        )}

        {/* ─────────────────────────────────────────────────────────────────
            TABLA DE SERVICIOS
        ───────────────────────────────────────────────────────────────── */}
        {vistaActiva === "servicios" && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/80 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Servicio
                        </span>
                      </div>
                    </th>
                    <th className="text-left px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Duración
                        </span>
                      </div>
                    </th>
                    <th className="text-left px-5 py-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Precio / Margen
                        </span>
                      </div>
                    </th>
                    <th className="text-left px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Recursos
                        </span>
                      </div>
                    </th>
                    <th className="text-left px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                          Agendamiento
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
                  {serviciosFiltrados.map((servicio) => (
                    <tr
                      key={servicio.id}
                      className="hover:bg-violet-50/30 transition-colors group"
                    >
                      {/* Servicio */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-purple-50 flex items-center justify-center border border-violet-100">
                            {servicio.categoria === "Transporte" ?  (
                              <Truck className="w-6 h-6 text-violet-600" />
                            ) : (
                              <Wrench className="w-6 h-6 text-violet-600" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-slate-800 group-hover:text-violet-600 transition-colors">
                                {servicio.nombre}
                              </p>
                              {servicio.destacado && (
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              )}
                            </div>
                            <p className="text-xs text-slate-500">
                              {servicio.codigo} · {servicio. categoria}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                              <span className="text-xs font-medium text-slate-600">
                                {servicio.calificacion}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Duración */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="font-medium text-slate-700">
                            {servicio.duracionTexto}
                          </span>
                        </div>
                      </td>

                      {/* Precio / Margen */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-bold text-slate-800">
                            ${servicio.precioBase. toLocaleString()}
                            <span className="text-slate-400 text-xs font-normal ml-1">
                              {servicio.unidadCobro}
                            </span>
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-sm font-semibold ${
                              servicio.margenBase >= 50 ? "text-teal-600" : 
                              servicio.margenBase >= 35 ? "text-amber-600" : "text-red-600"
                            }`}>
                              {servicio. margenBase.toFixed(0)}% margen
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Recursos */}
                      <td className="px-5 py-4">
                        <div>
                          <div className="flex items-center gap-1. 5 mb-1">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-700">
                              {servicio.personalRequerido} persona{servicio.personalRequerido > 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {servicio.recursosRequeridos. slice(0, 2).map((recurso, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                              >
                                {recurso}
                              </span>
                            ))}
                            {servicio.recursosRequeridos. length > 2 && (
                              <span className="text-xs text-slate-400">
                                +{servicio.recursosRequeridos.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Agendamiento */}
                      <td className="px-5 py-4">
                        <div>
                          {servicio.requiereAgenda ? (
                            <>
                              <div className="flex items-center gap-1. 5 mb-1">
                                <CheckCircle className="w-4 h-4 text-teal-500" />
                                <span className="text-xs font-medium text-teal-700">
                                  Requiere cita
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">
                                Anticipación: {servicio.anticipacionMinima}
                              </p>
                            </>
                          ) : (
                            <span className="text-xs text-slate-500">Sin agenda</span>
                          )}
                        </div>
                      </td>

                      {/* Acciones */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-violet-100 hover:text-violet-600 transition-colors"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-teal-100 hover:text-teal-600 transition-colors"
                            title="Editar"
                          >
                            <Pencil className="w-4 h-4" />
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
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Mostrando{" "}
                  <span className="font-semibold text-slate-700">
                    {serviciosFiltrados. length}
                  </span>{" "}
                  de{" "}
                  <span className="font-semibold text-slate-700">
                    {serviciosCatalogo.length}
                  </span>{" "}
                  servicios
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
          </>
        )}
      </div>
    </div>
  );
}