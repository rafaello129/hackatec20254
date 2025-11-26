import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Send,
  Sparkles,
  Minimize2,
  Maximize2,
  Loader2,
} from "lucide-react";
import { cn } from "./ui/utils";
import React from "react";

interface MensajeChat {
  id: string;
  tipo: "user" | "ia";
  contenido: string;
  opciones?: {
    id: string;
    label: string;
    icono: string;
    descripcion?: string;
  }[];
  accion?: {
    tipo: "crear_proyecto" | "agregar_nodo" | "ver_proyecto";
    label: string;
    datos?: any;
  };
}

export default function ChatIA() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([]);
  const [mensajes, setMensajes] = useState<MensajeChat[]>([
    {
      id: "1",
      tipo: "ia",
      contenido: "¡Hola! 👋 Soy tu asistente.  Cuéntame qué necesitas comprar o vender y te ayudo a armarlo todo.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?. scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensajes]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const agregarMensaje = (mensaje: MensajeChat) => {
    setMensajes((prev) => [...prev, mensaje]);
  };

  const procesarMensaje = async (texto: string) => {
    const userMsg: MensajeChat = {
      id: Date.now().toString(),
      tipo: "user",
      contenido: texto,
    };
    agregarMensaje(userMsg);
    setInputValue("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 1200));

    const textoLower = texto.toLowerCase();
    let respuesta: MensajeChat;

    // Detectar si quiere vender
    if (textoLower.includes("vender") || textoLower.includes("tengo para") || textoLower.includes("necesito vender")) {
      respuesta = {
        id: (Date.now() + 1).toString(),
        tipo: "ia",
        contenido: "¡Genial! Te ayudo a publicar tu oferta. 🏷️\n\n¿Qué producto o servicio quieres ofrecer?",
      };
    }
    // Detectar productos específicos
    else if (textoLower.includes("madera") || textoLower.includes("tablones") || textoLower.includes("mdf") || textoLower.includes("triplay")) {
      respuesta = {
        id: (Date.now() + 1).toString(),
        tipo: "ia",
        contenido: "¡Perfecto! 🪵 Encontré **6 proveedores de madera** cerca de ti.\n\nPara armar tu proyecto completo, ¿qué servicios adicionales necesitas?",
        opciones: [
          { id: "transporte", label: "Transporte", icono: "🚚", descripcion: "Entrega a tu ubicación" },
          { id: "corte", label: "Corte/CNC", icono: "⚙️", descripcion: "Corte a medida, CNC" },
          { id: "acabado", label: "Acabado", icono: "🎨", descripcion: "Barniz, laca, pintura" },
          { id: "mano_obra", label: "Instalación", icono: "👷", descripcion: "Carpinteros profesionales" },
          { id: "herrajes", label: "Herrajes", icono: "🔩", descripcion: "Tornillos, bisagras, etc." },
        ],
      };
    }
    else if (textoLower.includes("cemento") || textoLower.includes("block") || textoLower.includes("varilla") || textoLower.includes("construccion")) {
      respuesta = {
        id: (Date.now() + 1).toString(),
        tipo: "ia",
        contenido: "¡Entendido! 🏗️ Materiales de construcción.  Hay **12 proveedores** disponibles.\n\n¿Qué servicios necesitas además del material?",
        opciones: [
          { id: "transporte", label: "Transporte", icono: "🚚", descripcion: "Volteo, torton, trailer" },
          { id: "maquinaria", label: "Maquinaria", icono: "🏗️", descripcion: "Revolvedora, vibrador" },
          { id: "mano_obra", label: "Albañiles", icono: "👷", descripcion: "Mano de obra" },
          { id: "complementos", label: "Agregados", icono: "🪨", descripcion: "Arena, grava" },
        ],
      };
    }
    else if (textoLower. includes("mueble") || textoLower.includes("escritorio") || textoLower.includes("closet") || textoLower.includes("cocina")) {
      respuesta = {
        id: (Date.now() + 1).toString(),
        tipo: "ia",
        contenido: "¡Proyecto de muebles! 🪑 Te ayudo a conseguir todo.\n\n¿Qué necesitas para tu proyecto?",
        opciones: [
          { id: "madera", label: "Madera/MDF", icono: "🪵", descripcion: "Material base" },
          { id: "corte", label: "Corte CNC", icono: "⚙️", descripcion: "Corte de piezas" },
          { id: "herrajes", label: "Herrajes", icono: "🔩", descripcion: "Bisagras, correderas" },
          { id: "acabado", label: "Acabado", icono: "🎨", descripcion: "Pintura, barniz" },
          { id: "instalacion", label: "Instalación", icono: "👷", descripcion: "Armado e instalación" },
        ],
      };
    }
    else {
      respuesta = {
        id: (Date.now() + 1).toString(),
        tipo: "ia",
        contenido: "Cuéntame más sobre lo que necesitas.  Por ejemplo:\n\n• \"Necesito 50 tablones de pino\"\n• \"Quiero hacer un closet\"\n• \"Busco cemento con transporte\"\n• \"Tengo tomates para vender\"",
      };
    }

    setIsTyping(false);
    agregarMensaje(respuesta);
  };

  const seleccionarServicio = async (servicioId: string, servicioLabel: string) => {
    const nuevosServicios = [... serviciosSeleccionados, servicioId];
    setServiciosSeleccionados(nuevosServicios);

    const userMsg: MensajeChat = {
      id: Date. now().toString(),
      tipo: "user",
      contenido: `✓ ${servicioLabel}`,
    };
    agregarMensaje(userMsg);
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 800));

    const respuesta: MensajeChat = {
      id: (Date.now() + 1).toString(),
      tipo: "ia",
      contenido: `✅ **${servicioLabel}** agregado.\n\n¿Necesitas algo más o creamos tu proyecto?`,
      accion: {
        tipo: "crear_proyecto",
        label: "Crear proyecto",
        datos: { servicios: nuevosServicios },
      },
    };

    setIsTyping(false);
    agregarMensaje(respuesta);
  };

  const crearProyecto = () => {
    setIsOpen(false);
    // Resetear estado del chat
    setServiciosSeleccionados([]);
    setMensajes([
      {
        id: "1",
        tipo: "ia",
        contenido: "¡Hola! 👋 Soy tu asistente. Cuéntame qué necesitas comprar o vender y te ayudo a armarlo todo.",
      },
    ]);
    navigate("/proyecto/proy-001"); // Por ahora ir al proyecto de ejemplo
  };

  const handleSubmit = (e: React.FormEvent) => {
    e. preventDefault();
    if (inputValue.trim() && ! isTyping) {
      procesarMensaje(inputValue. trim());
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          BOTÓN FLOTANTE
      ═══════════════════════════════════════════════════════════════════ */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-24 right-4 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-xl shadow-violet-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <Sparkles className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
          IA
        </span>
      </button>

      {/* ═══════════════════════════════════════════════════════════════════
          PANEL DEL CHAT
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        className={cn(
          "fixed z-50 bg-white rounded-3xl shadow-2xl shadow-slate-900/20 border border-slate-200 overflow-hidden transition-all duration-300 flex flex-col",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none",
          isExpanded 
            ? "bottom-4 right-4 left-4 top-20 sm:left-auto sm:w-[480px] sm:top-20 sm:bottom-4"
            : "bottom-4 right-4 w-[calc(100%-2rem)] max-w-md h-[500px]"
        )}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-4 text-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">Asistente IA</h3>
                <p className="text-white/70 text-xs">¿Qué necesitas hoy? </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mensajes.map((msg) => (
            <div key={msg.id} className={cn("flex", msg.tipo === "user" ?  "justify-end" : "justify-start")}>
              <div className={cn("max-w-[85%]")}>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3",
                    msg.tipo === "user"
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-br-md"
                      : "bg-slate-100 text-slate-800 rounded-bl-md"
                  )}
                >
                  <p 
                    className="text-sm whitespace-pre-line"
                    dangerouslySetInnerHTML={{ 
                      __html: msg.contenido. replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                    }}
                  />
                </div>

                {/* Opciones */}
                {msg.opciones && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.opciones. map((op) => (
                      <button
                        key={op. id}
                        onClick={() => seleccionarServicio(op.id, op.label)}
                        disabled={serviciosSeleccionados.includes(op. id)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                          serviciosSeleccionados.includes(op. id)
                            ? "bg-teal-100 text-teal-700 border border-teal-200"
                            : "bg-white text-slate-700 border border-slate-200 hover:border-violet-300 hover:bg-violet-50"
                        )}
                      >
                        <span>{op.icono}</span>
                        <span>{op.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Acción */}
                {msg. accion && (
                  <div className="mt-3">
                    <button
                      onClick={crearProyecto}
                      className="flex items-center gap-2 px-4 py-2. 5 rounded-xl text-sm font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700 shadow-lg shadow-teal-500/25 transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      {msg.accion. label}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e. target.value)}
              placeholder="Escribe lo que necesitas..."
              disabled={isTyping}
              className="flex-1 h-12 px-4 rounded-xl bg-slate-100 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:bg-white border border-transparent focus:border-violet-300 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={! inputValue.trim() || isTyping}
              className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white flex items-center justify-center hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-500/25"
            >
              {isTyping ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}