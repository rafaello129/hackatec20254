import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  Pause,
  FileEdit,
  ChevronRight,
  Sparkles,
  MoreHorizontal,
  Calendar,
  DollarSign,
  MessageCircle,
  TrendingUp,
  LayoutTemplate,
  ArrowRight,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { proyectos, plantillas } from "../data/mockData2";
import React from "react";

type TabType = "activos" | "completados" | "pausados" | "borradores";

export default function MisProyectos() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("activos");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPlantillas, setShowPlantillas] = useState(false);

  const tabs = [
    { id: "activos" as TabType, label: "Activos", icon: FolderKanban, estado: "activo" },
    { id: "completados" as TabType, label: "Completados", icon: CheckCircle2, estado: "completado" },
    { id: "pausados" as TabType, label: "Pausados", icon: Pause, estado: "pausado" },
    { id: "borradores" as TabType, label: "Borradores", icon: FileEdit, estado: "borrador" },
  ];

  const proyectosFiltrados = proyectos.filter((p) => {
    const tabActual = tabs.find((t) => t. id === activeTab);
    return p.estado === tabActual?. estado;
  });

  const getEstadoNodo = (estado: string) => {
    const estados: Record<string, { color: string; bg: string }> = {
      completado: { color: "bg-emerald-500", bg: "bg-emerald-50" },
      en_progreso: { color: "bg-teal-500", bg: "bg-teal-50" },
      confirmado: { color: "bg-blue-500", bg: "bg-blue-50" },
      pendiente: { color: "bg-amber-500", bg: "bg-amber-50" },
      esperando: { color: "bg-slate-300", bg: "bg-slate-50" },
      fallido: { color: "bg-red-500", bg: "bg-red-50" },
      buscando: { color: "bg-violet-500", bg: "bg-violet-50" },
    };
    return estados[estado] || estados. pendiente;
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FolderKanban className="w-7 h-7 text-violet-600" />
            Mis Proyectos
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Gestiona tus proyectos de compra
          </p>
        </div>
        <button
          onClick={() => setShowPlantillas(true)}
          className="flex items-center gap-2 px-4 py-2. 5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Nuevo proyecto</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS RESUMEN
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-4 gap-3">
        {tabs.map((tab) => {
          const count = proyectos.filter((p) => p.estado === tab.estado).length;
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "p-4 rounded-2xl border transition-all text-left",
                isActive
                  ? "bg-violet-50 border-violet-200 shadow-sm"
                  : "bg-white border-slate-200 hover:border-slate-300"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center mb-2",
                isActive ?  "bg-violet-100" : "bg-slate-100"
              )}>
                <Icon className={cn("w-4 h-4", isActive ? "text-violet-600" : "text-slate-500")} />
              </div>
              <div className={cn("text-2xl font-bold", isActive ? "text-violet-700" : "text-slate-800")}>
                {count}
              </div>
              <div className="text-xs text-slate-500">{tab.label}</div>
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SEARCH
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar proyecto..."
          className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 transition-all shadow-sm"
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          LISTA DE PROYECTOS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        {proyectosFiltrados.length > 0 ? (
          proyectosFiltrados.map((proyecto) => {
            const nodosConMensajes = proyecto.nodos.filter((n) => n.mensajesNoLeidos > 0);
            const totalMensajes = nodosConMensajes.reduce((acc, n) => acc + n. mensajesNoLeidos, 0);
            const nodosCompletados = proyecto. nodos.filter((n) => n. estado === "completado"). length;

            return (
              <div
                key={proyecto. id}
                onClick={() => navigate(`/proyecto/${proyecto.id}`)}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all cursor-pointer group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-slate-800 group-hover:text-violet-700 transition-colors">
                        {proyecto.nombre}
                      </h3>
                      {totalMensajes > 0 && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-rose-100 text-rose-700 text-xs font-semibold rounded-full">
                          <MessageCircle className="w-3 h-3" />
                          {totalMensajes}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500">{proyecto.descripcion}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-4 gap-4 mb-4 py-3 px-4 bg-slate-50 rounded-xl">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Nodos</div>
                    <div className="font-semibold text-slate-800">
                      {nodosCompletados}/{proyecto.nodos. length}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Total</div>
                    <div className="font-semibold text-slate-800">
                      ${proyecto.totalEstimado.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Creado</div>
                    <div className="font-semibold text-slate-800">
                      {proyecto.fechaCreacion.split("-"). slice(1).reverse().join("/")}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Progreso</div>
                    <div className="font-semibold text-violet-600">{proyecto.progreso}%</div>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="mb-4">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all"
                      style={{ width: `${proyecto.progreso}%` }}
                    />
                  </div>
                </div>

                {/* Nodos preview */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {proyecto.nodos. slice(0, 6).map((nodo, index) => {
                      const estadoNodo = getEstadoNodo(nodo.estado);
                      return (
                        <div key={nodo.id} className="flex items-center">
                          <div
                            className={cn(
                              "w-9 h-9 rounded-lg flex items-center justify-center text-sm relative",
                              nodo.proveedor ?  "bg-slate-100" : "bg-slate-50 border border-dashed border-slate-300"
                            )}
                            title={nodo.titulo}
                          >
                            {nodo.icono}
                            <span
                              className={cn(
                                "absolute -bottom-0.5 -right-0.5 w-2. 5 h-2.5 rounded-full border-2 border-white",
                                estadoNodo.color
                              )}
                            />
                          </div>
                          {index < Math.min(proyecto. nodos.length - 1, 5) && (
                            <div className="w-2 h-0.5 bg-slate-200" />
                          )}
                        </div>
                      );
                    })}
                    {proyecto.nodos.length > 6 && (
                      <span className="text-xs text-slate-400 ml-1">+{proyecto.nodos.length - 6}</span>
                    )}
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl mx-auto mb-4">
              📁
            </div>
            <h3 className="font-semibold text-slate-700 mb-2">
              No hay proyectos {activeTab}
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Crea un nuevo proyecto para comenzar
            </p>
            <button
              onClick={() => setShowPlantillas(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nuevo proyecto
            </button>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MODAL PLANTILLAS
      ═══════════════════════════════════════════════════════════════════ */}
      {showPlantillas && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPlantillas(false)}
          />
          <div className="relative w-full max-w-lg max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg text-slate-800">Nuevo proyecto</h2>
                <p className="text-sm text-slate-500">Elige una plantilla o empieza desde cero</p>
              </div>
              <button
                onClick={() => setShowPlantillas(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              {/* Opción IA */}
              <button
                onClick={() => {
                  setShowPlantillas(false);
                  // Abrir chat IA
                }}
                className="w-full p-4 mb-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-left hover:from-violet-700 hover:to-purple-700 transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Crear con IA</h3>
                    <p className="text-white/70 text-sm">Cuéntame qué necesitas</p>
                  </div>
                </div>
                <p className="text-sm text-white/80">
                  Dime qué quieres hacer y te armo el proyecto completo con proveedores sugeridos. 
                </p>
              </button>

              {/* Plantillas */}
              <div className="mb-2 text-sm font-medium text-slate-500">Plantillas populares</div>
              <div className="space-y-2">
                {plantillas.filter((p) => p. popular).map((plantilla) => (
                  <button
                    key={plantilla.id}
                    onClick={() => {
                      setShowPlantillas(false);
                      navigate("/proyecto/nuevo");
                    }}
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-left hover:border-violet-300 hover:bg-violet-50 transition-all flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl">
                      {plantilla.icono}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{plantilla.nombre}</h3>
                      <p className="text-sm text-slate-500">{plantilla. descripcion}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>
                ))}
              </div>

              {/* Más plantillas */}
              <div className="mt-4 mb-2 text-sm font-medium text-slate-500">Todas las plantillas</div>
              <div className="space-y-2">
                {plantillas.filter((p) => ! p.popular).map((plantilla) => (
                  <button
                    key={plantilla.id}
                    onClick={() => {
                      setShowPlantillas(false);
                      navigate("/proyecto/nuevo");
                    }}
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-left hover:border-violet-300 hover:bg-violet-50 transition-all flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl">
                      {plantilla.icono}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{plantilla. nombre}</h3>
                      <p className="text-sm text-slate-500">{plantilla. descripcion}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>
                ))}
              </div>

              {/* Proyecto en blanco */}
              <button
                onClick={() => {
                  setShowPlantillas(false);
                  navigate("/proyecto/nuevo");
                }}
                className="w-full mt-4 p-4 rounded-xl border-2 border-dashed border-slate-300 text-left hover:border-violet-400 hover:bg-violet-50 transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-slate-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">Proyecto en blanco</h3>
                  <p className="text-sm text-slate-500">Empieza desde cero</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}