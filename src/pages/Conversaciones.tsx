import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Search,
  Filter,
  Star,
  BadgeCheck,
  Clock,
  CheckCheck,
  Check,
  Image as ImageIcon,
  FileText,
  ChevronRight,
  MoreHorizontal,
  Pin,
  Archive,
  Bell,
  BellOff,
  Trash2,
  Circle,
  Sparkles,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { proveedores, proyectos } from "../data/mockData2";
import React from "react";

interface Conversacion {
  id: string;
  proveedor: typeof proveedores[0];
  proyecto: typeof proyectos[0] | null;
  nodoId: string | null;
  nodoTitulo: string | null;
  ultimoMensaje: {
    contenido: string;
    fecha: string;
    hora: string;
    esPropio: boolean;
    leido: boolean;
    tipo: "texto" | "imagen" | "documento" | "propuesta";
  };
  noLeidos: number;
  fijado: boolean;
  silenciado: boolean;
}

export default function Conversaciones() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filtroActivo, setFiltroActivo] = useState<"todos" | "no_leidos" | "fijados">("todos");
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);

  // Conversaciones mock
  const [conversaciones, setConversaciones] = useState<Conversacion[]>([
    {
      id: "conv-1",
      proveedor: proveedores[0],
      proyecto: proyectos[0],
      nodoId: "nodo-001",
      nodoTitulo: "Tablones de Pino",
      ultimoMensaje: {
        contenido: "Por la compra de 30 piezas o más, te ofrezco un descuento especial de $420/pieza",
        fecha: "Hoy",
        hora: "10:30",
        esPropio: false,
        leido: false,
        tipo: "propuesta",
      },
      noLeidos: 2,
      fijado: true,
      silenciado: false,
    },
    {
      id: "conv-2",
      proveedor: proveedores[1],
      proyecto: proyectos[0],
      nodoId: "nodo-002",
      nodoTitulo: "Corte CNC",
      ultimoMensaje: {
        contenido: "Perfecto, todo claro.  Empiezo mañana temprano y te envío fotos del avance.",
        fecha: "Hoy",
        hora: "09:15",
        esPropio: false,
        leido: false,
        tipo: "texto",
      },
      noLeidos: 1,
      fijado: false,
      silenciado: false,
    },
    {
      id: "conv-3",
      proveedor: proveedores[2],
      proyecto: proyectos[1],
      nodoId: "nodo-103",
      nodoTitulo: "Transporte",
      ultimoMensaje: {
        contenido: "Listo, confirmo la recolección para el viernes a las 9am",
        fecha: "Ayer",
        hora: "18:45",
        esPropio: false,
        leido: true,
        tipo: "texto",
      },
      noLeidos: 0,
      fijado: false,
      silenciado: false,
    },
    {
      id: "conv-4",
      proveedor: proveedores[3],
      proyecto: proyectos[1],
      nodoId: "nodo-103",
      nodoTitulo: "Instalación",
      ultimoMensaje: {
        contenido: "Te envié las fotos del avance",
        fecha: "Ayer",
        hora: "15:20",
        esPropio: false,
        leido: true,
        tipo: "imagen",
      },
      noLeidos: 0,
      fijado: false,
      silenciado: true,
    },
    {
      id: "conv-5",
      proveedor: proveedores[4],
      proyecto: null,
      nodoId: null,
      nodoTitulo: null,
      ultimoMensaje: {
        contenido: "Gracias por su cotización, la revisaré",
        fecha: "23 Nov",
        hora: "11:00",
        esPropio: true,
        leido: true,
        tipo: "texto",
      },
      noLeidos: 0,
      fijado: false,
      silenciado: false,
    },
    {
      id: "conv-6",
      proveedor: proveedores[5],
      proyecto: null,
      nodoId: null,
      nodoTitulo: null,
      ultimoMensaje: {
        contenido: "Adjunto la ficha técnica del barniz",
        fecha: "20 Nov",
        hora: "09:30",
        esPropio: false,
        leido: true,
        tipo: "documento",
      },
      noLeidos: 0,
      fijado: false,
      silenciado: false,
    },
  ]);

  // Filtrar conversaciones
  const conversacionesFiltradas = conversaciones.filter((conv) => {
    if (filtroActivo === "no_leidos" && conv.noLeidos === 0) return false;
    if (filtroActivo === "fijados" && ! conv.fijado) return false;
    if (searchQuery) {
      return conv.proveedor.nombre. toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  // Ordenar: fijados primero, luego por fecha
  const conversacionesOrdenadas = [... conversacionesFiltradas].sort((a, b) => {
    if (a.fijado && !b.fijado) return -1;
    if (! a.fijado && b.fijado) return 1;
    return 0;
  });

  const totalNoLeidos = conversaciones.reduce((acc, conv) => acc + conv.noLeidos, 0);

  const handleFijar = (id: string) => {
    setConversaciones((prev) =>
      prev.map((conv) =>
        conv.id === id ? { ...conv, fijado: !conv.fijado } : conv
      )
    );
    setMenuAbierto(null);
  };

  const handleSilenciar = (id: string) => {
    setConversaciones((prev) =>
      prev. map((conv) =>
        conv.id === id ? { ... conv, silenciado: !conv.silenciado } : conv
      )
    );
    setMenuAbierto(null);
  };

  const handleArchivar = (id: string) => {
    setConversaciones((prev) => prev.filter((conv) => conv.id !== id));
    setMenuAbierto(null);
  };

  const handleConversacionClick = (conv: Conversacion) => {
    if (conv.proyecto && conv.nodoId) {
      navigate(`/proyecto/${conv.proyecto. id}/nodo/${conv.nodoId}/chat`);
    } else {
      navigate(`/proveedor/${conv.proveedor. id}`);
    }
  };

  const getMensajePreview = (conv: Conversacion) => {
    const { ultimoMensaje } = conv;
    let icono : any = null;
    let texto = ultimoMensaje. contenido;

    if (ultimoMensaje.tipo === "imagen") {
      icono = <ImageIcon className="w-4 h-4 text-slate-400 shrink-0" />;
      texto = "Foto";
    } else if (ultimoMensaje.tipo === "documento") {
      icono = <FileText className="w-4 h-4 text-slate-400 shrink-0" />;
      texto = "Documento";
    } else if (ultimoMensaje. tipo === "propuesta") {
      icono = <Sparkles className="w-4 h-4 text-violet-500 shrink-0" />;
    }

    return (
      <div className="flex items-center gap-1. 5 min-w-0">
        {ultimoMensaje. esPropio && (
          <span className="text-slate-400 shrink-0">
            {ultimoMensaje. leido ? (
              <CheckCheck className="w-4 h-4 text-teal-500" />
            ) : (
              <Check className="w-4 h-4" />
            )}
          </span>
        )}
        {icono}
        <span className={cn(
          "truncate",
          conv.noLeidos > 0 ?  "text-slate-800 font-medium" : "text-slate-500"
        )}>
          {texto}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-4 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <MessageCircle className="w-7 h-7 text-violet-600" />
            Mensajes
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {totalNoLeidos > 0 ? `${totalNoLeidos} mensajes sin leer` : "Todas las conversaciones al día"}
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          BÚSQUEDA
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar conversación..."
          className="w-full h-12 pl-12 pr-4 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 shadow-sm"
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          FILTROS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex gap-2">
        {[
          { id: "todos" as const, label: "Todos" },
          { id: "no_leidos" as const, label: "No leídos", count: totalNoLeidos },
          { id: "fijados" as const, label: "Fijados" },
        ]. map((filtro) => (
          <button
            key={filtro. id}
            onClick={() => setFiltroActivo(filtro.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all",
              filtroActivo === filtro.id
                ?  "bg-violet-100 text-violet-700"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
            )}
          >
            {filtro. label}
            {filtro.count !== undefined && filtro.count > 0 && (
              <span className="ml-1. 5 px-1. 5 py-0.5 text-xs bg-violet-200 text-violet-700 rounded-full">
                {filtro.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          LISTA DE CONVERSACIONES
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="space-y-2">
        {conversacionesOrdenadas.length > 0 ?  (
          conversacionesOrdenadas. map((conv) => (
            <div
              key={conv.id}
              className={cn(
                "bg-white rounded-2xl border p-4 transition-all relative",
                conv. noLeidos > 0
                  ? "border-violet-200 shadow-sm"
                  : "border-slate-200 hover:border-slate-300"
              )}
            >
              <div
                onClick={() => handleConversacionClick(conv)}
                className="flex items-start gap-3 cursor-pointer"
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    {conv.proveedor.iniciales}
                  </div>
                  {conv.noLeidos > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {conv.noLeidos}
                    </span>
                  )}
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      "font-semibold truncate",
                      conv.noLeidos > 0 ?  "text-slate-900" : "text-slate-700"
                    )}>
                      {conv.proveedor.nombre}
                    </span>
                    {conv.proveedor.verificado && (
                      <BadgeCheck className="w-4 h-4 text-teal-500 shrink-0" />
                    )}
                    {conv.fijado && (
                      <Pin className="w-3. 5 h-3.5 text-violet-500 shrink-0" />
                    )}
                    {conv.silenciado && (
                      <BellOff className="w-3.5 h-3. 5 text-slate-400 shrink-0" />
                    )}
                  </div>

                  {/* Proyecto/Nodo */}
                  {conv.proyecto && conv. nodoTitulo && (
                    <div className="text-xs text-violet-600 bg-violet-50 px-2 py-0.5 rounded-lg inline-flex items-center gap-1 mb-1. 5">
                      <span>{conv.proyecto.nombre}</span>
                      <span>•</span>
                      <span>{conv.nodoTitulo}</span>
                    </div>
                  )}

                  {/* Último mensaje */}
                  <div className="text-sm">
                    {getMensajePreview(conv)}
                  </div>
                </div>

                {/* Hora y menú */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={cn(
                    "text-xs",
                    conv. noLeidos > 0 ? "text-violet-600 font-medium" : "text-slate-400"
                  )}>
                    {conv.ultimoMensaje.hora}
                  </span>
                  <span className="text-xs text-slate-400">
                    {conv.ultimoMensaje.fecha}
                  </span>
                </div>
              </div>

              {/* Botón de menú */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuAbierto(menuAbierto === conv.id ?  null : conv.id);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {/* Menú contextual */}
              {menuAbierto === conv.id && (
                <div className="absolute top-14 right-4 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-10 w-48">
                  <button
                    onClick={() => handleFijar(conv. id)}
                    className="w-full flex items-center gap-3 px-4 py-2. 5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Pin className="w-4 h-4" />
                    {conv.fijado ? "Desfijar" : "Fijar arriba"}
                  </button>
                  <button
                    onClick={() => handleSilenciar(conv.id)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    {conv.silenciado ? (
                      <>
                        <Bell className="w-4 h-4" />
                        Activar notificaciones
                      </>
                    ) : (
                      <>
                        <BellOff className="w-4 h-4" />
                        Silenciar
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleArchivar(conv. id)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Archive className="w-4 h-4" />
                    Archivar
                  </button>
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    onClick={() => handleArchivar(conv.id)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <MessageCircle className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-700 mb-2">
              {filtroActivo === "no_leidos"
                ? "No hay mensajes sin leer"
                : filtroActivo === "fijados"
                ? "No hay conversaciones fijadas"
                : "No hay conversaciones"}
            </h3>
            <p className="text-sm text-slate-500">
              {filtroActivo === "todos"
                ? "Inicia una conversación con un proveedor"
                : "Cambia el filtro para ver más conversaciones"}
            </p>
          </div>
        )}
      </div>

      {/* Click fuera cierra el menú */}
      {menuAbierto && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setMenuAbierto(null)}
        />
      )}
    </div>
  );
}