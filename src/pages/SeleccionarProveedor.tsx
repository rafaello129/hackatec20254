import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Star,
  BadgeCheck,
  Clock,
  Truck,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  List,
  Map,
  SlidersHorizontal,
  X,
  Zap,
  DollarSign,
  Package,
  MessageCircle,
  Phone,
  TrendingUp,
  Users,
  Calendar,
  Shield,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { proyectos, proveedores } from "../data/mockData2";
import React from "react";

type ViewType = "lista" | "mapa";
type SortType = "recomendado" | "rating" | "distancia" | "precio" | "respuesta";

interface FiltrosState {
  verificadoOnly: boolean;
  ratingMin: number | null;
  distanciaMax: number | null;
  tieneTransporte: boolean | null;
}

export default function SeleccionarProveedor() {
  const { id, nodoId } = useParams();
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<ViewType>("lista");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortType>("recomendado");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);
  const [filtros, setFiltros] = useState<FiltrosState>({
    verificadoOnly: false,
    ratingMin: null,
    distanciaMax: null,
    tieneTransporte: null,
  });

  const proyecto = proyectos. find((p) => p. id === id) || proyectos[0];
  const nodo = proyecto. nodos.find((n) => n.id === nodoId) || proyecto.nodos[0];

  // Proveedores con datos adicionales para este contexto
  const proveedoresEnriquecidos = useMemo(() => {
    return proveedores.map((p, i) => ({
      ...p,
      distancia: parseFloat((Math.random() * 15 + 0.5).toFixed(1)),
      precioEstimado: Math.floor(Math.random() * 5000 + 8000),
      disponibilidad: ["Inmediata", "24 horas", "2-3 días", "Esta semana"][i % 4],
      matchScore: Math.floor(Math.random() * 20 + 80),
      proyectosCompletados: Math.floor(Math. random() * 50 + 5),
      tieneTransporte: Math. random() > 0.3,
    }));
  }, []);

  // Filtrar proveedores relevantes para el nodo
  const proveedoresRelevantes = useMemo(() => {
    let resultado = proveedoresEnriquecidos. filter((p) =>
      p.categorias.some((c) => 
        c.toLowerCase().includes(nodo.categoria.toLowerCase()) ||
        nodo.categoria.toLowerCase().includes(c. toLowerCase())
      ) ||
      p. servicios.some((s) => 
        s.toLowerCase().includes(nodo.categoria.toLowerCase())
      )
    );

    // Si no hay relevantes, mostrar todos
    if (resultado.length === 0) {
      resultado = proveedoresEnriquecidos;
    }

    // Aplicar filtros
    if (filtros.verificadoOnly) {
      resultado = resultado.filter((p) => p.verificado);
    }
    if (filtros.ratingMin) {
      resultado = resultado.filter((p) => p.rating >= filtros.ratingMin! );
    }
    if (filtros.distanciaMax) {
      resultado = resultado.filter((p) => p. distancia <= filtros.distanciaMax!);
    }
    if (filtros.tieneTransporte === true) {
      resultado = resultado.filter((p) => p. tieneTransporte);
    }

    // Aplicar búsqueda
    if (searchQuery) {
      resultado = resultado.filter((p) =>
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return resultado;
  }, [proveedoresEnriquecidos, nodo, filtros, searchQuery]);

  // Ordenar
  const proveedoresOrdenados = useMemo(() => {
    return [... proveedoresRelevantes].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a. rating;
        case "distancia":
          return a.distancia - b.distancia;
        case "precio":
          return a.precioEstimado - b.precioEstimado;
        case "respuesta":
          return a.tiempoRespuesta.localeCompare(b. tiempoRespuesta);
        default: // recomendado
          return b.matchScore - a.matchScore;
      }
    });
  }, [proveedoresRelevantes, sortBy]);

  const proveedorTop = proveedoresOrdenados[0];

  const handleAsignar = async (proveedorId: string) => {
    setIsAssigning(true);
    setSelectedProveedor(proveedorId);
    
    // Simular asignación
    await new Promise((r) => setTimeout(r, 1500));
    
    setIsAssigning(false);
    navigate(`/proyecto/${id}/nodo/${nodoId}`, {
      state: { proveedorAsignado: proveedorId },
    });
  };

  const resetFiltros = () => {
    setFiltros({
      verificadoOnly: false,
      ratingMin: null,
      distanciaMax: null,
      tieneTransporte: null,
    });
  };

  const filtrosActivos = 
    filtros. verificadoOnly ||
    filtros. ratingMin !== null ||
    filtros.distanciaMax !== null ||
    filtros.tieneTransporte !== null;

  return (
    <div className="space-y-4 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-slate-800">Seleccionar proveedor</h1>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="text-lg">{nodo.icono}</span>
            <span>{nodo.titulo}</span>
            <span>•</span>
            <span>{nodo.categoria}</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SUGERENCIA IA (proveedor top)
      ═══════════════════════════════════════════════════════════════════ */}
      {proveedorTop && (
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Recomendación IA</h3>
                <p className="text-white/80 text-sm mb-3">
                  Basado en tu historial, ubicación y requerimientos del proyecto,
                  <strong> {proveedorTop.nombre}</strong> es tu mejor opción con un match del
                  <strong> {proveedorTop.matchScore}%</strong>. 
                </p>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                    {proveedorTop.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {proveedorTop. distancia} km
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {proveedorTop.tiempoRespuesta}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleAsignar(proveedorTop.id)}
                disabled={isAssigning}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-white text-violet-700 hover:bg-violet-50 disabled:opacity-70"
              >
                {isAssigning && selectedProveedor === proveedorTop. id ? (
                  <>
                    <div className="w-4 h-4 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
                    Asignando...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Asignar este proveedor
                  </>
                )}
              </button>
              <button
                onClick={() => navigate(`/proveedor/${proveedorTop.id}`)}
                className="px-4 py-3 rounded-xl font-medium bg-white/20 hover:bg-white/30"
              >
                Ver perfil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          BÚSQUEDA Y CONTROLES
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar proveedor..."
            className="w-full h-12 pl-12 pr-10 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(! showFilters)}
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center border transition-colors relative",
            showFilters || filtrosActivos
              ? "bg-violet-100 border-violet-200 text-violet-600"
              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
          )}
        >
          <SlidersHorizontal className="w-5 h-5" />
          {filtrosActivos && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-violet-600 text-white text-[10px] rounded-full flex items-center justify-center">
              ! 
            </span>
          )}
        </button>

        {/* Toggle vista */}
        <div className="flex bg-white border border-slate-200 rounded-xl p-1">
          <button
            onClick={() => setViewType("lista")}
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
              viewType === "lista" ? "bg-violet-100 text-violet-600" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(`/mapa? categoria=${nodo.categoria}`)}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600"
          >
            <Map className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          FILTROS EXPANDIBLES
      ═══════════════════════════════════════════════════════════════════ */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Filtros</h3>
            {filtrosActivos && (
              <button
                onClick={resetFiltros}
                className="text-sm text-violet-600 font-medium"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Ordenar por */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Ordenar por</label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "recomendado" as SortType, label: "Recomendado", icon: Sparkles },
                { id: "rating" as SortType, label: "Mejor rating", icon: Star },
                { id: "distancia" as SortType, label: "Más cercano", icon: MapPin },
                { id: "precio" as SortType, label: "Mejor precio", icon: DollarSign },
                { id: "respuesta" as SortType, label: "Respuesta rápida", icon: Clock },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option. id)}
                  className={cn(
                    "flex items-center gap-1. 5 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                    sortBy === option.id
                      ? "bg-violet-100 text-violet-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  <option.icon className="w-4 h-4" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating mínimo */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Rating mínimo</label>
            <div className="flex gap-2">
              {[4, 4.5, 4.8]. map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFiltros((f) => ({
                    ...f,
                    ratingMin: f.ratingMin === rating ? null : rating,
                  }))}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                    filtros.ratingMin === rating
                      ?  "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {rating}+
                </button>
              ))}
            </div>
          </div>

          {/* Distancia máxima */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Distancia máxima</label>
            <div className="flex gap-2">
              {[5, 10, 20]. map((dist) => (
                <button
                  key={dist}
                  onClick={() => setFiltros((f) => ({
                    ...f,
                    distanciaMax: f. distanciaMax === dist ? null : dist,
                  }))}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                    filtros.distanciaMax === dist
                      ? "bg-teal-100 text-teal-700"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  <MapPin className="w-4 h-4" />
                  {dist} km
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filtros. verificadoOnly}
                onChange={(e) => setFiltros((f) => ({ ...f, verificadoOnly: e. target.checked }))}
                className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
              />
              <span className="text-sm text-slate-700 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-teal-500" />
                Solo proveedores verificados
              </span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filtros.tieneTransporte === true}
                onChange={(e) => setFiltros((f) => ({
                  ...f,
                  tieneTransporte: e.target.checked ?  true : null,
                }))}
                className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
              />
              <span className="text-sm text-slate-700 flex items-center gap-2">
                <Truck className="w-4 h-4 text-slate-500" />
                Con servicio de transporte
              </span>
            </label>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          LISTA DE PROVEEDORES
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{proveedoresOrdenados.length} proveedores encontrados</span>
          {filtrosActivos && (
            <button onClick={resetFiltros} className="text-violet-600 font-medium">
              Limpiar filtros
            </button>
          )}
        </div>

        {proveedoresOrdenados.length > 0 ?  (
          proveedoresOrdenados.map((prov, index) => (
            <div
              key={prov.id}
              className={cn(
                "bg-white rounded-2xl border p-5 transition-all",
                selectedProveedor === prov.id
                  ? "border-violet-500 ring-4 ring-violet-500/10"
                  : "border-slate-200 hover:border-violet-200 hover:shadow-lg"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                    {prov. iniciales}
                  </div>
                  {index === 0 && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3. 5 h-3.5 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800">{prov.nombre}</h3>
                    {prov.verificado && <BadgeCheck className="w-5 h-5 text-teal-500" />}
                    {index === 0 && (
                      <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">
                        Recomendado
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-medium text-slate-700">{prov. rating}</span>
                      <span>({prov.numResenias})</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {prov.distancia} km
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {prov.tiempoRespuesta}
                    </span>
                  </div>

                  {/* Info extra */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl">
                    <div>
                      <div className="text-xs text-slate-500">Match</div>
                      <div className="font-semibold text-violet-600">{prov. matchScore}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Disponibilidad</div>
                      <div className={cn(
                        "font-medium text-sm",
                        prov.disponibilidad === "Inmediata" ?  "text-emerald-600" : "text-slate-700"
                      )}>
                        {prov.disponibilidad}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Precio est. </div>
                      <div className="font-medium text-slate-700">
                        ${prov.precioEstimado.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {prov.tieneTransporte && (
                      <span className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-lg flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        Con transporte
                      </span>
                    )}
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                      {prov.proyectosCompletados} proyectos
                    </span>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleAsignar(prov.id)}
                  disabled={isAssigning}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all",
                    selectedProveedor === prov.id && isAssigning
                      ? "bg-violet-100 text-violet-700"
                      : "text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25"
                  )}
                >
                  {isAssigning && selectedProveedor === prov.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
                      Asignando...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Asignar proveedor
                    </>
                  )}
                </button>
                <button
                  onClick={() => navigate(`/proveedor/${prov.id}`)}
                  className="px-4 py-3 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200"
                >
                  Ver perfil
                </button>
                <button className="w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Search className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-700 mb-2">No se encontraron proveedores</h3>
            <p className="text-sm text-slate-500 mb-4">
              Intenta ajustar los filtros o ampliar tu búsqueda
            </p>
            {filtrosActivos && (
              <button
                onClick={resetFiltros}
                className="text-violet-600 font-medium"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          BOTÓN BUSCAR EN MAPA
      ═══════════════════════════════════════════════════════════════════ */}
      <button
        onClick={() => navigate(`/mapa?categoria=${nodo.categoria}`)}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 border border-violet-200"
      >
        <Map className="w-5 h-5" />
        Ver todos en el mapa
      </button>
    </div>
  );
}