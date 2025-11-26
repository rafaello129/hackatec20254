import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Video,
  MoreHorizontal,
  Send,
  Paperclip,
  Image as ImageIcon,
  Mic,
  Check,
  CheckCheck,
  X,
  Star,
  BadgeCheck,
  MapPin,
  Clock,
  FileText,
  Camera,
  Smile,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { proyectos, proveedores, mensajes as mensajesData } from "../data/mockData2";
import React from "react";

interface MensajeLocal {
  id: string;
  tipo: "usuario" | "proveedor" | "sistema";
  contenido: string;
  fecha: string;
  hora: string;
  leido: boolean;
  enviado: boolean;
  adjuntos?: { tipo: string; url: string; nombre: string }[];
  propuesta?: {
    tipo: string;
    descripcion: string;
    valorOriginal: string;
    valorNuevo: string;
    estado: "pendiente" | "aceptada" | "rechazada";
  };
}

export default function ChatProveedor() {
  const { id, nodoId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);

  const proyecto = proyectos. find((p) => p. id === id) || proyectos[0];
  const nodo = proyecto. nodos.find((n) => n. id === nodoId) || proyecto.nodos[0];
  const proveedor = nodo.proveedor
    ? proveedores.find((p) => p. id === nodo. proveedor?. id)
    : null;

  // Mensajes mock enriquecidos
  const [mensajes, setMensajes] = useState<MensajeLocal[]>([
    {
      id: "1",
      tipo: "sistema",
      contenido: "Conversación iniciada para el proyecto: " + proyecto.nombre,
      fecha: "25 Nov",
      hora: "10:00",
      leido: true,
      enviado: true,
    },
    {
      id: "2",
      tipo: "usuario",
      contenido: "Hola, estoy interesado en cotizar tablones de pino para un proyecto de muebles de oficina.",
      fecha: "25 Nov",
      hora: "10:05",
      leido: true,
      enviado: true,
    },
    {
      id: "3",
      tipo: "proveedor",
      contenido: "¡Hola!  Claro, con gusto te ayudo.  ¿Cuántas piezas necesitas y de qué medidas?",
      fecha: "25 Nov",
      hora: "10:15",
      leido: true,
      enviado: true,
    },
    {
      id: "4",
      tipo: "usuario",
      contenido: "Necesito 30 tablones de 1 pulgada de grosor, 2. 44m de largo.  ¿Tienen disponibles?",
      fecha: "25 Nov",
      hora: "10:20",
      leido: true,
      enviado: true,
    },
    {
      id: "5",
      tipo: "proveedor",
      contenido: "Sí, tenemos en existencia. Te puedo ofrecer pino de primera a $450 por pieza.  ¿Te interesa que te envíe fotos del material?",
      fecha: "25 Nov",
      hora: "10:30",
      leido: true,
      enviado: true,
    },
    {
      id: "6",
      tipo: "usuario",
      contenido: "Sí, por favor envíame fotos.  También necesito que estén bien secos.",
      fecha: "25 Nov",
      hora: "10:32",
      leido: true,
      enviado: true,
    },
    {
      id: "7",
      tipo: "proveedor",
      contenido: "Aquí te mando fotos del lote que tenemos disponible:",
      fecha: "26 Nov",
      hora: "09:00",
      leido: true,
      enviado: true,
      adjuntos: [
        { tipo: "imagen", url: "#", nombre: "tablones_pino_01.jpg" },
        { tipo: "imagen", url: "#", nombre: "tablones_pino_02.jpg" },
      ],
    },
    {
      id: "8",
      tipo: "proveedor",
      contenido: "Este lote tiene 3 meses de secado. Humedad al 12%, ideal para muebles de interior.",
      fecha: "26 Nov",
      hora: "09:02",
      leido: true,
      enviado: true,
    },
    {
      id: "9",
      tipo: "proveedor",
      contenido: "",
      fecha: "26 Nov",
      hora: "09:30",
      leido: false,
      enviado: true,
      propuesta: {
        tipo: "cambio_precio",
        descripcion: "Por la compra de 30 piezas o más, te ofrezco un descuento especial",
        valorOriginal: "$450/pieza",
        valorNuevo: "$420/pieza",
        estado: "pendiente",
      },
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?. scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensajes]);

  const handleSend = () => {
    if (! inputValue.trim()) return;

    const nuevoMensaje: MensajeLocal = {
      id: Date.now().toString(),
      tipo: "usuario",
      contenido: inputValue. trim(),
      fecha: "Hoy",
      hora: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
      leido: false,
      enviado: true,
    };

    setMensajes((prev) => [...prev, nuevoMensaje]);
    setInputValue("");
  };

  const handlePropuestaAccion = (mensajeId: string, accion: "aceptar" | "rechazar") => {
    setMensajes((prev) =>
      prev.map((m) => {
        if (m.id === mensajeId && m.propuesta) {
          return {
            ... m,
            propuesta: {
              ...m.propuesta,
              estado: accion === "aceptar" ? "aceptada" : "rechazada",
            },
          };
        }
        return m;
      })
    );

    // Agregar mensaje de sistema
    const mensajeSistema: MensajeLocal = {
      id: Date.now().toString(),
      tipo: "sistema",
      contenido: accion === "aceptar" 
        ? "✅ Has aceptado la propuesta del proveedor" 
        : "❌ Has rechazado la propuesta",
      fecha: "Hoy",
      hora: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
      leido: true,
      enviado: true,
    };
    setMensajes((prev) => [...prev, mensajeSistema]);
  };

  if (! proveedor) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl mb-4">💬</div>
        <h2 className="text-xl font-bold text-slate-800">Sin proveedor</h2>
        <p className="text-slate-500 text-sm mt-2">Selecciona un proveedor para chatear</p>
        <button
          onClick={() => navigate(`/proyecto/${id}/nodo/${nodoId}`)}
          className="mt-4 px-4 py-2 rounded-xl bg-violet-100 text-violet-700 font-medium"
        >
          Volver al nodo
        </button>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col -mx-4 -my-6 bg-white">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="shrink-0 px-4 py-3 bg-white border-b border-slate-200 flex items-center gap-3">
        <button
          onClick={() => navigate(`/proyecto/${id}/nodo/${nodoId}`)}
          className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>

        <div
          onClick={() => navigate(`/proveedor/${proveedor.id}`)}
          className="flex-1 flex items-center gap-3 cursor-pointer"
        >
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              {proveedor.iniciales}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1. 5">
              <span className="font-semibold text-slate-800 truncate">{proveedor. nombre}</span>
              {proveedor.verificado && <BadgeCheck className="w-4 h-4 text-teal-500 shrink-0" />}
            </div>
            <div className="text-xs text-emerald-600">En línea • Responde en {proveedor.tiempoRespuesta}</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-600">
            <Phone className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          INFO DEL NODO
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="shrink-0 px-4 py-2 bg-violet-50 border-b border-violet-100">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-lg">{nodo.icono}</span>
          <span className="font-medium text-violet-700">{nodo.titulo}</span>
          <span className="text-violet-500">•</span>
          <span className="text-violet-600">{proyecto.nombre}</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MENSAJES
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3. org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      >
        {mensajes. map((msg, index) => {
          const showDate = index === 0 || mensajes[index - 1]. fecha !== msg.fecha;

          return (
            <div key={msg.id}>
              {/* Separador de fecha */}
              {showDate && (
                <div className="flex items-center justify-center my-4">
                  <span className="px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs text-slate-500 shadow-sm">
                    {msg.fecha}
                  </span>
                </div>
              )}

              {/* Mensaje de sistema */}
              {msg.tipo === "sistema" && (
                <div className="flex justify-center">
                  <span className="px-3 py-1. 5 bg-slate-100 rounded-xl text-xs text-slate-500">
                    {msg.contenido}
                  </span>
                </div>
              )}

              {/* Mensaje normal */}
              {msg.tipo !== "sistema" && (
                <div className={cn("flex", msg.tipo === "usuario" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2. 5 shadow-sm",
                      msg. tipo === "usuario"
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-br-md"
                        : "bg-white text-slate-800 rounded-bl-md"
                    )}
                  >
                    {/* Contenido texto */}
                    {msg.contenido && <p className="text-sm leading-relaxed">{msg.contenido}</p>}

                    {/* Adjuntos */}
                    {msg.adjuntos && msg.adjuntos. length > 0 && (
                      <div className="mt-2 space-y-2">
                        {msg.adjuntos.map((adj, i) => (
                          <div
                            key={i}
                            className={cn(
                              "flex items-center gap-2 p-2 rounded-lg cursor-pointer",
                              msg.tipo === "usuario" ? "bg-white/10 hover:bg-white/20" : "bg-slate-100 hover:bg-slate-200"
                            )}
                          >
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center",
                              msg. tipo === "usuario" ? "bg-white/20" : "bg-slate-200"
                            )}>
                              <ImageIcon className="w-5 h-5" />
                            </div>
                            <span className="text-sm flex-1 truncate">{adj. nombre}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Propuesta */}
                    {msg.propuesta && (
                      <div className={cn(
                        "mt-2 p-3 rounded-xl",
                        msg. tipo === "usuario" ? "bg-white/10" : "bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100"
                      )}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">💰</span>
                          <span className={cn(
                            "text-xs font-semibold",
                            msg.tipo === "usuario" ? "text-white/80" : "text-violet-600"
                          )}>
                            PROPUESTA DE PRECIO
                          </span>
                        </div>
                        <p className={cn(
                          "text-sm mb-3",
                          msg.tipo === "usuario" ? "text-white/90" : "text-slate-700"
                        )}>
                          {msg.propuesta.descripcion}
                        </p>
                        <div className="flex items-center gap-3 mb-3">
                          <span className={cn(
                            "line-through",
                            msg. tipo === "usuario" ? "text-white/50" : "text-slate-400"
                          )}>
                            {msg. propuesta.valorOriginal}
                          </span>
                          <span>→</span>
                          <span className={cn(
                            "font-bold text-lg",
                            msg.tipo === "usuario" ? "text-white" : "text-violet-700"
                          )}>
                            {msg.propuesta. valorNuevo}
                          </span>
                        </div>

                        {msg.propuesta.estado === "pendiente" && msg.tipo === "proveedor" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handlePropuestaAccion(msg.id, "aceptar")}
                              className="flex-1 flex items-center justify-center gap-1. 5 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600"
                            >
                              <Check className="w-4 h-4" />
                              Aceptar
                            </button>
                            <button
                              onClick={() => handlePropuestaAccion(msg. id, "rechazar")}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-300"
                            >
                              <X className="w-4 h-4" />
                              Rechazar
                            </button>
                          </div>
                        )}

                        {msg.propuesta.estado !== "pendiente" && (
                          <div className={cn(
                            "text-sm font-medium",
                            msg. propuesta.estado === "aceptada" ?  "text-emerald-600" : "text-red-500"
                          )}>
                            {msg.propuesta. estado === "aceptada" ? "✅ Propuesta aceptada" : "❌ Propuesta rechazada"}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Hora y estado */}
                    <div className={cn(
                      "flex items-center gap-1 mt-1",
                      msg.tipo === "usuario" ? "justify-end" : "justify-start"
                    )}>
                      <span className={cn(
                        "text-[10px]",
                        msg.tipo === "usuario" ? "text-white/60" : "text-slate-400"
                      )}>
                        {msg. hora}
                      </span>
                      {msg.tipo === "usuario" && (
                        <span className="text-white/60">
                          {msg.leido ? <CheckCheck className="w-3. 5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          INPUT
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="shrink-0 px-4 py-3 bg-white border-t border-slate-200">
        {/* Menú de adjuntos */}
        {showAttachMenu && (
          <div className="mb-3 flex gap-2">
            {[
              { icon: ImageIcon, label: "Foto", color: "bg-violet-100 text-violet-600" },
              { icon: Camera, label: "Cámara", color: "bg-teal-100 text-teal-600" },
              { icon: FileText, label: "Documento", color: "bg-amber-100 text-amber-600" },
              { icon: MapPin, label: "Ubicación", color: "bg-rose-100 text-rose-600" },
            ].map((item) => (
              <button
                key={item.label}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-xl transition-all hover:scale-105",
                  item. color
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAttachMenu(! showAttachMenu)}
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
              showAttachMenu ?  "bg-violet-100 text-violet-600" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            )}
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e. target.value)}
              placeholder="Escribe un mensaje..."
              className="w-full h-11 px-4 pr-10 rounded-xl bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:bg-white border border-transparent focus:border-violet-300"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <Smile className="w-5 h-5" />
            </button>
          </div>

          {inputValue. trim() ?  (
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-violet-500/25 hover:shadow-xl transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200">
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}