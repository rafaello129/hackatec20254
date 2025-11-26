import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  MessageCircle,
  MoreHorizontal,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Move,
  Sparkles,
  ChevronRight,
  DollarSign,
  Calendar,
  BadgeCheck,
  Star,
  RefreshCw,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { proyectos, proveedores } from "../data/mockData2";
import React from "react";

interface NodoVisual {
  id: string;
  x: number;
  y: number;
  isDragging: boolean;
}

export default function ProyectoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const proyecto = proyectos. find((p) => p. id === id) || proyectos[0];
  
  const [nodosPos, setNodosPos] = useState<NodoVisual[]>(
    proyecto.nodos.map((n) => ({
      id: n.id,
      x: n.posicion.x,
      y: n. posicion.y,
      isDragging: false,
    }))
  );
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [selectedNodo, setSelectedNodo] = useState<string | null>(null);
  const [showAddNodo, setShowAddNodo] = useState(false);

  const getEstadoConfig = (estado: string) => {
    const configs: Record<string, { color: string; bg: string; border: string; label: string; icon: any }> = {
      completado: { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200", label: "Completado", icon: CheckCircle2 },
      en_progreso: { color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200", label: "En progreso", icon: Play },
      confirmado: { color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", label: "Confirmado", icon: CheckCircle2 },
      pendiente: { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", label: "Pendiente", icon: Clock },
      esperando: { color: "text-slate-500", bg: "bg-slate-50", border: "border-slate-200", label: "Esperando", icon: Pause },
      fallido: { color: "text-red-600", bg: "bg-red-50", border: "border-red-200", label: "Fallido", icon: AlertCircle },
      buscando: { color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", label: "Buscando", icon: Search },
    };
    return configs[estado] || configs. pendiente;
  };

  const handleNodoClick = (nodoId: string) => {
    setSelectedNodo(nodoId === selectedNodo ? null : nodoId);
  };

  const handleNodoDoubleClick = (nodoId: string) => {
    navigate(`/proyecto/${proyecto.id}/nodo/${nodoId}`);
  };

  // Drag & Drop para nodos
  const handleMouseDown = (e: React.MouseEvent, nodoId: string) => {
    e.preventDefault();
    setNodosPos((prev) =>
      prev.map((n) => (n.id === nodoId ? { ...n, isDragging: true } : n))
    );
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setNodosPos((prev) =>
      prev.map((n) => {
        if (n.isDragging) {
          return {
            ...n,
            x: n.x + e. movementX / zoom,
            y: n.y + e.movementY / zoom,
          };
        }
        return n;
      })
    );
  }, [zoom]);

  const handleMouseUp = useCallback(() => {
    setNodosPos((prev) => prev. map((n) => ({ ...n, isDragging: false })));
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window. addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window. removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Render conexiones (líneas SVG)
  const renderConexiones = () => {
    return proyecto.conexiones.map((con) => {
      const desde = nodosPos. find((n) => n. id === con.desde);
      const hacia = nodosPos. find((n) => n.id === con.hacia);
      if (!desde || !hacia) return null;

      const x1 = desde. x + 80;
      const y1 = desde.y + 40;
      const x2 = hacia. x;
      const y2 = hacia.y + 40;

      // Curva bezier
      const midX = (x1 + x2) / 2;

      return (
        <path
          key={con.id}
          d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
          fill="none"
          stroke={con.tipo === "paralelo" ? "#a78bfa" : "#cbd5e1"}
          strokeWidth="2"
          strokeDasharray={con.tipo === "paralelo" ? "5,5" : "none"}
          className="transition-all"
        />
      );
    });
  };

  const nodoSeleccionado = proyecto.nodos.find((n) => n. id === selectedNodo);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col -mx-4 -my-6">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="shrink-0 px-4 py-4 bg-white border-b border-slate-200 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/proyectos")}
            className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="font-bold text-lg text-slate-800">{proyecto.nombre}</h1>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                ${proyecto.totalEstimado.toLocaleString()}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                {proyecto. progreso}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
              className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center text-slate-600"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-medium text-slate-600 w-12 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
              className="w-8 h-8 rounded-lg hover:bg-white flex items-center justify-center text-slate-600"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setShowAddNodo(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Agregar nodo</span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CANVAS DEL GRAFO
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas */}
        <div
          ref={canvasRef}
          className="flex-1 bg-slate-50 overflow-hidden relative"
          style={{
            backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
            backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `scale(${zoom}) translate(${panOffset.x}px, ${panOffset.y}px)`,
              transformOrigin: "top left",
            }}
          >
            {/* SVG para conexiones */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {renderConexiones()}
            </svg>

            {/* Nodos */}
            {proyecto.nodos.map((nodo) => {
              const pos = nodosPos. find((n) => n. id === nodo. id);
              const estado = getEstadoConfig(nodo.estado);
              const EstadoIcon = estado.icon;

              if (! pos) return null;

              return (
                <div
                  key={nodo.id}
                  className={cn(
                    "absolute w-40 bg-white rounded-2xl border-2 shadow-lg cursor-pointer transition-all select-none",
                    selectedNodo === nodo.id ? "border-violet-500 shadow-violet-500/20 ring-4 ring-violet-500/10" : estado.border,
                    pos.isDragging && "shadow-2xl scale-105"
                  )}
                  style={{
                    left: pos.x,
                    top: pos. y,
                  }}
                  onClick={() => handleNodoClick(nodo.id)}
                  onDoubleClick={() => handleNodoDoubleClick(nodo.id)}
                  onMouseDown={(e) => handleMouseDown(e, nodo.id)}
                >
                  {/* Header del nodo */}
                  <div className={cn("px-3 py-2 rounded-t-xl flex items-center gap-2", estado.bg)}>
                    <span className="text-xl">{nodo.icono}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-slate-800 truncate">
                        {nodo.titulo}
                      </div>
                    </div>
                    {nodo.mensajesNoLeidos > 0 && (
                      <span className="w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {nodo. mensajesNoLeidos}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-3">
                    {nodo.proveedor ? (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-xs font-bold text-slate-600">
                          {nodo.proveedor. iniciales}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-slate-800 truncate">
                            {nodo.proveedor.nombre}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-slate-500">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            {nodo.proveedor. rating}
                            {nodo.proveedor.verificado && (
                              <BadgeCheck className="w-3 h-3 text-teal-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/proyecto/${proyecto.id}/nodo/${nodo.id}`);
                        }}
                        className="w-full text-xs text-violet-600 bg-violet-50 hover:bg-violet-100 py-1. 5 px-2 rounded-lg font-medium transition-colors mb-2"
                      >
                        + Seleccionar proveedor
                      </button>
                    )}

                    {/* Estado */}
                    <div className={cn("flex items-center gap-1. 5 text-xs font-medium", estado.color)}>
                      <EstadoIcon className="w-3. 5 h-3.5" />
                      <span>{estado.label}</span>
                    </div>

                    {/* Precio si existe */}
                    {(nodo.producto?. precio || nodo. servicio?.precio) && (
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <div className="text-sm font-bold text-slate-800">
                          ${((nodo.producto?. precio || 0) * (nodo.producto?. cantidad || 1) + (nodo.servicio?.precio || 0)). toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hint */}
          <div className="absolute bottom-4 left-4 text-xs text-slate-400 bg-white/80 backdrop-blur px-3 py-2 rounded-lg">
            💡 Arrastra los nodos para reorganizar • Doble click para editar
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            PANEL LATERAL (cuando hay nodo seleccionado)
        ═══════════════════════════════════════════════════════════════════ */}
        {nodoSeleccionado && (
          <div className="w-80 bg-white border-l border-slate-200 overflow-y-auto shrink-0">
            <div className="p-4 border-b border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{nodoSeleccionado.icono}</span>
                <button
                  onClick={() => setSelectedNodo(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>
              <h3 className="font-bold text-lg text-slate-800">{nodoSeleccionado.titulo}</h3>
              <p className="text-sm text-slate-500">{nodoSeleccionado.categoria}</p>
            </div>

            {/* Estado */}
            <div className="p-4 border-b border-slate-100">
              <div className="text-xs font-medium text-slate-500 mb-2">ESTADO</div>
              {(() => {
                const estado = getEstadoConfig(nodoSeleccionado. estado);
                const EstadoIcon = estado.icon;
                return (
                  <div className={cn("flex items-center gap-2 px-3 py-2 rounded-xl", estado.bg)}>
                    <EstadoIcon className={cn("w-5 h-5", estado.color)} />
                    <span className={cn("font-medium", estado.color)}>{estado.label}</span>
                  </div>
                );
              })()}
            </div>

            {/* Proveedor */}
            {nodoSeleccionado.proveedor && (
              <div className="p-4 border-b border-slate-100">
                <div className="text-xs font-medium text-slate-500 mb-2">PROVEEDOR</div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                    {nodoSeleccionado.proveedor.iniciales}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-800 flex items-center gap-1">
                      {nodoSeleccionado.proveedor.nombre}
                      {nodoSeleccionado.proveedor.verificado && (
                        <BadgeCheck className="w-4 h-4 text-teal-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Star className="w-3. 5 h-3.5 text-amber-400 fill-amber-400" />
                      {nodoSeleccionado.proveedor.rating}
                    </div>
                  </div>
                </div>
                <button className="w-full mt-2 text-sm text-violet-600 hover:text-violet-700 font-medium">
                  Cambiar proveedor
                </button>
              </div>
            )}

            {/* Producto/Servicio */}
            {(nodoSeleccionado.producto || nodoSeleccionado.servicio) && (
              <div className="p-4 border-b border-slate-100">
                <div className="text-xs font-medium text-slate-500 mb-2">DETALLE</div>
                <div className="space-y-2">
                  {nodoSeleccionado.producto && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Producto</span>
                        <span className="font-medium text-slate-800">{nodoSeleccionado.producto.nombre}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Cantidad</span>
                        <span className="font-medium text-slate-800">
                          {nodoSeleccionado.producto.cantidad} {nodoSeleccionado.producto. unidad}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Precio unit.</span>
                        <span className="font-medium text-slate-800">
                          ${nodoSeleccionado.producto.precio. toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                  {nodoSeleccionado.servicio && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Servicio</span>
                      <span className="font-medium text-slate-800">{nodoSeleccionado.servicio.nombre}</span>
                    </div>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between">
                  <span className="font-medium text-slate-800">Total</span>
                  <span className="font-bold text-lg text-slate-800">
                    ${(
                      (nodoSeleccionado.producto?.precio || 0) * (nodoSeleccionado.producto?. cantidad || 1) +
                      (nodoSeleccionado.servicio?.precio || 0)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className="p-4 space-y-2">
              <button
                onClick={() => navigate(`/proyecto/${proyecto.id}/nodo/${nodoSeleccionado.id}`)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25"
              >
                Ver detalle completo
                <ChevronRight className="w-4 h-4" />
              </button>

              {nodoSeleccionado.proveedor && (
                <button
                  onClick={() => navigate(`/proyecto/${proyecto.id}/nodo/${nodoSeleccionado.id}/chat`)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat con proveedor
                  {nodoSeleccionado.mensajesNoLeidos > 0 && (
                    <span className="w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {nodoSeleccionado.mensajesNoLeidos}
                    </span>
                  )}
                </button>
              )}

              {nodoSeleccionado.estado === "fallido" && (
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200">
                  <RefreshCw className="w-4 h-4" />
                  Buscar alternativas
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MODAL AGREGAR NODO
      ═══════════════════════════════════════════════════════════════════ */}
      {showAddNodo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddNodo(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl m-4">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-lg text-slate-800">Agregar nodo</h2>
              <button
                onClick={() => setShowAddNodo(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {[
                { icon: "📦", label: "Producto", tipo: "producto" },
                { icon: "🚚", label: "Transporte", tipo: "servicio" },
                { icon: "⚙️", label: "Maquinado", tipo: "servicio" },
                { icon: "🎨", label: "Acabado", tipo: "servicio" },
                { icon: "👷", label: "Mano de obra", tipo: "servicio" },
                { icon: "🔩", label: "Complementos", tipo: "producto" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setShowAddNodo(false);
                    // Agregar nodo
                  }}
                  className="p-4 rounded-xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-all text-left"
                >
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <span className="font-medium text-slate-800">{item.label}</span>
                  <span className="text-xs text-slate-500 block capitalize">{item.tipo}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}