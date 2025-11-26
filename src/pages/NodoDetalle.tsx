import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  BadgeCheck,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Package,
  Truck,
  FileText,
  Send,
  Paperclip,
  MoreHorizontal,
  Edit3,
  RefreshCw,
  Sparkles,
  X,
  Plus,
  Minus,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { proyectos, proveedores, mensajes } from "../data/mockData2";
import React from "react";

type TabType = "detalle" | "chat" | "documentos";

export default function NodoDetalle() {
  const { id, nodoId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("detalle");
  const [showPersonalizar, setShowPersonalizar] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const proyecto = proyectos. find((p) => p.id === id) || proyectos[0];
  const nodo = proyecto. nodos.find((n) => n. id === nodoId) || proyecto.nodos[0];
  
  const proveedor = nodo.proveedor 
    ? proveedores.find((p) => p. id === nodo. proveedor?. id) 
    : null;

  const mensajesNodo = mensajes.filter(
    (m) => m.proyectoId === proyecto.id && m. nodoId === nodo.id
  );

  const getEstadoConfig = (estado: string) => {
    const configs: Record<string, { color: string; bg: string; label: string; icon: any }> = {
      completado: { color: "text-emerald-600", bg: "bg-emerald-50", label: "Completado", icon: CheckCircle2 },
      en_progreso: { color: "text-teal-600", bg: "bg-teal-50", label: "En progreso", icon: Truck },
      confirmado: { color: "text-blue-600", bg: "bg-blue-50", label: "Confirmado", icon: CheckCircle2 },
      pendiente: { color: "text-amber-600", bg: "bg-amber-50", label: "Pendiente", icon: Clock },
      esperando: { color: "text-slate-500", bg: "bg-slate-50", label: "Esperando", icon: Clock },
      fallido: { color: "text-red-600", bg: "bg-red-50", label: "Fallido", icon: AlertCircle },
      buscando: { color: "text-violet-600", bg: "bg-violet-50", label: "Buscando proveedor", icon: Sparkles },
    };
    return configs[estado] || configs. pendiente;
  };

  const estado = getEstadoConfig(nodo. estado);
  const EstadoIcon = estado.icon;

  // Estado para personalización
  const [personalizacion, setPersonalizacion] = useState({
    cantidad: nodo.producto?.cantidad || 1,
    variantes: nodo.producto?.personalizacion || {},
    notas: nodo. producto?.notas || nodo.servicio?.notas || "",
  });

  const tabs = [
    { id: "detalle" as TabType, label: "Detalle", icon: Package },
    { id: "chat" as TabType, label: "Chat", icon: MessageCircle, badge: nodo.mensajesNoLeidos },
    { id: "documentos" as TabType, label: "Docs", icon: FileText },
  ];

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      // Simular envío
      setChatInput("");
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/proyecto/${proyecto.id}`)}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{nodo.icono}</span>
            <h1 className="text-xl font-bold text-slate-800">{nodo. titulo}</h1>
          </div>
          <p className="text-sm text-slate-500">{proyecto.nombre} • {nodo.categoria}</p>
        </div>
        <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50">
          <MoreHorizontal className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          ESTADO BANNER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className={cn("rounded-2xl p-4 flex items-center gap-4", estado.bg)}>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", estado.color, "bg-white")}>
          <EstadoIcon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className={cn("font-semibold", estado.color)}>{estado.label}</div>
          {nodo.fechaEstimada && (
            <div className="text-sm text-slate-600">Fecha estimada: {nodo.fechaEstimada}</div>
          )}
        </div>
        {nodo.estado === "fallido" && (
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-violet-600 to-purple-600">
            <RefreshCw className="w-4 h-4" />
            Buscar alternativas
          </button>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TABS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all relative",
                activeTab === tab.id
                  ? "bg-violet-100 text-violet-700"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: DETALLE
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "detalle" && (
        <div className="space-y-4">
          {/* Proveedor */}
          {proveedor ?  (
  <div className="bg-white rounded-2xl border border-slate-200 p-5">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-slate-800">Proveedor asignado</h3>
      <button 
        onClick={() => navigate(`/proyecto/${proyecto.id}/nodo/${nodo. id}/proveedores`)}
        className="text-sm text-violet-600 hover:text-violet-700 font-medium"
      >
        Cambiar
      </button>
    </div>

    <div
      onClick={() => navigate(`/proveedor/${proveedor. id}`)}
      className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
        {proveedor.iniciales}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">{proveedor.nombre}</span>
          {proveedor.verificado && <BadgeCheck className="w-5 h-5 text-teal-500" />}
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            {proveedor.rating}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {proveedor. ubicacion}
          </span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-400" />
    </div>

    {/* Contacto rápido */}
    <div className="flex gap-2 mt-4">
      <button className="flex-1 flex items-center justify-center gap-2 py-2. 5 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200">
        <Phone className="w-4 h-4" />
        Llamar
      </button>
      <button
        onClick={() => setActiveTab("chat")}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r from-teal-600 to-cyan-600"
      >
        <MessageCircle className="w-4 h-4" />
        Mensaje
      </button>
    </div>
  </div>
) : (
  <div className="bg-white rounded-2xl border border-slate-200 p-5">
    <h3 className="font-bold text-slate-800 mb-4">Proveedor</h3>
    <div className="text-center py-8">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
        <Sparkles className="w-10 h-10 text-violet-600" />
      </div>
      <h4 className="font-semibold text-slate-800 mb-2">Sin proveedor asignado</h4>
      <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">
        Busca y selecciona el mejor proveedor para {nodo.titulo. toLowerCase()}
      </p>
      
      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate(`/proyecto/${proyecto.id}/nodo/${nodo.id}/proveedores`)}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/25 hover:shadow-xl transition-all"
        >
          <Sparkles className="w-5 h-5" />
          Buscar proveedores con IA
        </button>
        
        <button
          onClick={() => navigate(`/mapa?categoria=${nodo.categoria}`)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-violet-700 bg-violet-50 hover:bg-violet-100"
        >
          <MapPin className="w-5 h-5" />
          Ver en mapa
        </button>
      </div>
    </div>
  </div>
)}

          {/* Producto/Servicio configurado */}
          {(nodo. producto || nodo. servicio) && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">
                  {nodo. tipo === "producto" ? "Producto" : "Servicio"}
                </h3>
                <button
                  onClick={() => setShowPersonalizar(true)}
                  className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
                >
                  <Edit3 className="w-4 h-4" />
                  Personalizar
                </button>
              </div>

              {nodo.producto && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center text-3xl">
                      {nodo.icono}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">{nodo.producto. nombre}</h4>
                      <p className="text-sm text-slate-500">
                        {nodo.producto. cantidad} {nodo.producto.unidad}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-slate-800">
                        ${(nodo.producto.precio * nodo.producto. cantidad).toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-500">
                        ${nodo.producto.precio. toLocaleString()}/{nodo.producto.unidad}
                      </div>
                    </div>
                  </div>

                  {/* Personalización actual */}
                  {Object.keys(nodo.producto.personalizacion). length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-slate-500">Configuración</div>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(nodo.producto.personalizacion). map(([key, value]) => (
                          <div key={key} className="flex justify-between p-2 bg-slate-50 rounded-lg text-sm">
                            <span className="text-slate-500 capitalize">{key}</span>
                            <span className="font-medium text-slate-800 capitalize">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notas */}
                  {nodo.producto. notas && (
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                      <div className="text-xs font-medium text-amber-700 mb-1">Notas al proveedor</div>
                      <p className="text-sm text-amber-800">{nodo. producto.notas}</p>
                    </div>
                  )}
                </div>
              )}

              {nodo.servicio && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-100 to-violet-50 flex items-center justify-center text-3xl">
                      {nodo.icono}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">{nodo.servicio.nombre}</h4>
                      <p className="text-sm text-slate-500">Servicio de {nodo.categoria. toLowerCase()}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-slate-800">
                        ${nodo.servicio. precio.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Dependencias */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Dependencias</h3>
            
            {/* Nodos que dependen de este */}
            <div className="space-y-3">
              <div className="text-sm text-slate-500">Este nodo depende de:</div>
              {proyecto.conexiones
                .filter((c) => c.hacia === nodo.id)
                .map((con) => {
                  const nodoOrigen = proyecto.nodos.find((n) => n.id === con.desde);
                  if (! nodoOrigen) return null;
                  const estadoOrigen = getEstadoConfig(nodoOrigen. estado);
                  return (
                    <div
                      key={con.id}
                      onClick={() => navigate(`/proyecto/${proyecto.id}/nodo/${nodoOrigen.id}`)}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100"
                    >
                      <span className="text-xl">{nodoOrigen.icono}</span>
                      <div className="flex-1">
                        <div className="font-medium text-slate-800">{nodoOrigen.titulo}</div>
                        <div className={cn("text-sm", estadoOrigen. color)}>{estadoOrigen.label}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  );
                })}
              
              {proyecto.conexiones. filter((c) => c.hacia === nodo.id).length === 0 && (
                <div className="text-sm text-slate-400 py-2">Sin dependencias previas</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: CHAT
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "chat" && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {proveedor ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {proveedor.iniciales}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800">{proveedor. nombre}</div>
                  <div className="text-xs text-slate-500">
                    Responde en {proveedor.tiempoRespuesta}
                  </div>
                </div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full" title="En línea" />
              </div>

              {/* Mensajes */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {mensajesNodo.length > 0 ? (
                  mensajesNodo.map((msg) => (
                    <div key={msg.id} className={cn("flex", msg. tipo === "usuario" ? "justify-end" : "justify-start")}>
                      <div className={cn("max-w-[80%] rounded-2xl px-4 py-3", 
                        msg. tipo === "usuario" 
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-br-md"
                          : "bg-white text-slate-800 rounded-bl-md shadow-sm"
                      )}>
                        <p className="text-sm">{msg.contenido}</p>
                        
                        {/* Adjuntos */}
                        {msg.adjuntos && msg.adjuntos.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {msg.adjuntos.map((adj, i) => (
                              <div key={i} className="flex items-center gap-2 p-2 bg-white/10 rounded-lg text-sm">
                                <ImageIcon className="w-4 h-4" />
                                <span>{adj.nombre}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Propuesta */}
                        {msg.propuesta && (
                          <div className="mt-3 p-3 bg-white/10 rounded-xl">
                            <div className="text-xs font-medium mb-2 opacity-80">
                              📋 Propuesta de cambio
                            </div>
                            <p className="text-sm mb-2">{msg.propuesta. descripcion}</p>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="line-through opacity-60">{msg.propuesta.valorOriginal}</span>
                              <span>→</span>
                              <span className="font-semibold">{msg.propuesta.valorNuevo}</span>
                            </div>
                            {msg.tipo === "proveedor" && (
                              <div className="flex gap-2 mt-3">
                                <button className="flex-1 flex items-center justify-center gap-1 py-1. 5 rounded-lg bg-emerald-500 text-white text-sm font-medium">
                                  <Check className="w-4 h-4" />
                                  Aceptar
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg bg-white/20 text-white text-sm font-medium">
                                  <X className="w-4 h-4" />
                                  Rechazar
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        <div className={cn("text-xs mt-2", msg. tipo === "usuario" ? "text-white/60" : "text-slate-400")}>
                          {msg.fecha. split(" ")[1]}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">Inicia la conversación con el proveedor</p>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target. value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 h-10 px-4 rounded-xl bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatInput. trim()}
                    className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white flex items-center justify-center disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Selecciona un proveedor para chatear</p>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: DOCUMENTOS
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "documentos" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-800 mb-4">Documentos</h3>
          
          <div className="space-y-3">
            {[
              { nombre: "Cotización", fecha: "25 Nov 2025", estado: "disponible" },
              { nombre: "Orden de compra", fecha: "26 Nov 2025", estado: "disponible" },
              { nombre: "Factura", fecha: "Pendiente", estado: "pendiente" },
            ].map((doc, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl border",
                  doc. estado === "disponible" 
                    ? "border-slate-200 hover:border-violet-200 cursor-pointer" 
                    : "border-slate-100 bg-slate-50"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  doc. estado === "disponible" ?  "bg-violet-100 text-violet-600" : "bg-slate-200 text-slate-400"
                )}>
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className={cn("font-medium", doc.estado === "disponible" ?  "text-slate-800" : "text-slate-400")}>
                    {doc.nombre}
                  </div>
                  <div className="text-xs text-slate-500">{doc.fecha}</div>
                </div>
                {doc.estado === "disponible" && (
                  <button className="text-sm font-medium text-violet-600">Descargar</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          MODAL PERSONALIZAR
      ═══════════════════════════════════════════════════════════════════ */}
      {showPersonalizar && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPersonalizar(false)} />
          <div className="relative w-full max-w-lg max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{nodo.icono}</span>
                <div>
                  <h2 className="font-bold text-lg text-slate-800">Personalizar</h2>
                  <p className="text-sm text-slate-500">{nodo.titulo}</p>
                </div>
              </div>
              <button
                onClick={() => setShowPersonalizar(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[60vh] space-y-6">
              {/* Cantidad */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Cantidad</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setPersonalizacion((p) => ({ ...p, cantidad: Math.max(1, p.cantidad - 1) }))}
                    className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <div className="flex-1 text-center">
                    <div className="text-3xl font-bold text-slate-800">{personalizacion.cantidad}</div>
                    <div className="text-sm text-slate-500">{nodo.producto?. unidad || "unidades"}</div>
                  </div>
                  <button
                    onClick={() => setPersonalizacion((p) => ({ ...p, cantidad: p.cantidad + 1 }))}
                    className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Variantes */}
              {[
                { id: "tipo", label: "Tipo de madera", opciones: ["Pino", "Encino", "Cedro", "MDF"] },
                { id: "grosor", label: "Grosor", opciones: ["1 pulgada", "1.5 pulgadas", "2 pulgadas"] },
                { id: "largo", label: "Largo", opciones: ["2. 44 m", "3.05 m", "Medida especial"] },
                { id: "acabado", label: "Acabado", opciones: ["Natural", "Cepillado", "Pulido"] },
              ].map((variante) => (
                <div key={variante.id}>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">{variante.label}</label>
                  <div className="flex flex-wrap gap-2">
                    {variante.opciones.map((opcion) => (
                      <button
                        key={opcion}
                        onClick={() => setPersonalizacion((p) => ({
                          ...p,
                          variantes: { ...p.variantes, [variante. id]: opcion }
                        }))}
                        className={cn(
                          "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                          personalizacion.variantes[variante.id] === opcion
                            ? "bg-violet-100 text-violet-700 border-2 border-violet-300"
                            : "bg-slate-100 text-slate-700 border-2 border-transparent hover:border-slate-300"
                        )}
                      >
                        {opcion}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Notas */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Notas al proveedor (opcional)
                </label>
                <textarea
                  value={personalizacion. notas}
                  onChange={(e) => setPersonalizacion((p) => ({ ... p, notas: e.target.value }))}
                  placeholder="Ej: Necesito que estén bien secos, es para muebles de interior..."
                  className="w-full h-24 p-3 rounded-xl bg-slate-100 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                />
              </div>

              {/* Preguntar antes de confirmar */}
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 border border-violet-200">
                <MessageCircle className="w-4 h-4" />
                Preguntar al proveedor antes de confirmar
              </button>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-slate-500">Total estimado</div>
                  <div className="text-2xl font-bold text-slate-800">
                    ${((nodo.producto?.precio || 0) * personalizacion.cantidad).toLocaleString()}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowPersonalizar(false)}
                className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/25"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}