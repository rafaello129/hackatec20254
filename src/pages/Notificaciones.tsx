import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  MessageCircle,
  Package,
  Truck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Star,
  DollarSign,
  Users,
  Clock,
  ChevronRight,
  Trash2,
  Check,
  Settings,
  Filter,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import React from "react";

type TabType = "todas" | "no_leidas";

interface Notificacion {
  id: string;
  tipo: "mensaje" | "proyecto" | "oferta" | "sistema" | "alerta";
  titulo: string;
  descripcion: string;
  fecha: string;
  leida: boolean;
  accion?: {
    label: string;
    ruta: string;
  };
  icono: string;
  color: string;
}

export default function Notificaciones() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("todas");
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      id: "n1",
      tipo: "mensaje",
      titulo: "Nuevo mensaje de Maderas del Norte",
      descripcion: "Te envió una propuesta de descuento para tu pedido",
      fecha: "Hace 5 min",
      leida: false,
      accion: { label: "Ver mensaje", ruta: "/proyecto/proy-001/nodo/nodo-001/chat" },
      icono: "💬",
      color: "bg-violet-100 text-violet-600",
    },
    {
      id: "n2",
      tipo: "proyecto",
      titulo: "Nodo completado",
      descripcion: "El corte CNC de tu proyecto 'Muebles para oficina' fue completado",
      fecha: "Hace 1 hora",
      leida: false,
      accion: { label: "Ver proyecto", ruta: "/proyecto/proy-001" },
      icono: "✅",
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      id: "n3",
      tipo: "alerta",
      titulo: "Proveedor canceló",
      descripcion: "Acabados Pro canceló el servicio de barnizado.  Te sugerimos alternativas.",
      fecha: "Hace 2 horas",
      leida: false,
      accion: { label: "Ver alternativas", ruta: "/proyecto/proy-001/nodo/nodo-004/alternativas" },
      icono: "⚠️",
      color: "bg-amber-100 text-amber-600",
    },
    {
      id: "n4",
      tipo: "oferta",
      titulo: "Nueva persona interesada",
      descripcion: "Carlos Mendoza está interesado en tu oferta de tablones de pino",
      fecha: "Hace 3 horas",
      leida: true,
      accion: { label: "Ver interesado", ruta: "/mis-ofertas/of-1" },
      icono: "👤",
      color: "bg-teal-100 text-teal-600",
    },
    {
      id: "n5",
      tipo: "proyecto",
      titulo: "Entrega programada",
      descripcion: "Tu pedido de madera será entregado mañana entre 9am y 12pm",
      fecha: "Hace 5 horas",
      leida: true,
      accion: { label: "Ver detalles", ruta: "/proyecto/proy-001/nodo/nodo-001" },
      icono: "🚚",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "n6",
      tipo: "sistema",
      titulo: "Nuevo proveedor en tu zona",
      descripcion: "Carpintería Express se unió y ofrece servicios de instalación",
      fecha: "Ayer",
      leida: true,
      icono: "🆕",
      color: "bg-slate-100 text-slate-600",
    },
    {
      id: "n7",
      tipo: "oferta",
      titulo: "Tu oferta está destacando",
      descripcion: "Has recibido 50 vistas en las últimas 24 horas",
      fecha: "Ayer",
      leida: true,
      accion: { label: "Ver estadísticas", ruta: "/mis-ofertas/of-1" },
      icono: "📈",
      color: "bg-violet-100 text-violet-600",
    },
    {
      id: "n8",
      tipo: "sistema",
      titulo: "Califica tu experiencia",
      descripcion: "¿Cómo fue tu experiencia con Transportes Rápidos GDL?",
      fecha: "Hace 2 días",
      leida: true,
      icono: "⭐",
      color: "bg-amber-100 text-amber-600",
    },
  ]);

  const noLeidas = notificaciones.filter((n) => !n. leida). length;

  const notificacionesFiltradas = activeTab === "no_leidas"
    ? notificaciones.filter((n) => ! n.leida)
    : notificaciones;

  const marcarLeida = (id: string) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
  };

  const marcarTodasLeidas = () => {
    setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
  };

  const eliminar = (id: string) => {
    setNotificaciones((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClick = (notif: Notificacion) => {
    marcarLeida(notif.id);
    if (notif.accion) {
      navigate(notif.accion.ruta);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Bell className="w-7 h-7 text-violet-600" />
            Notificaciones
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {noLeidas > 0 ? `${noLeidas} sin leer` : "Todas al día"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {noLeidas > 0 && (
            <button
              onClick={marcarTodasLeidas}
              className="text-sm text-violet-600 font-medium px-3 py-1. 5 rounded-lg hover:bg-violet-50"
            >
              Marcar todas como leídas
            </button>
          )}
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50">
            <Settings className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("todas")}
          className={cn(
            "flex-1 py-3 rounded-xl font-medium text-sm transition-all",
            activeTab === "todas"
              ? "bg-violet-100 text-violet-700"
              : "bg-white text-slate-600 border border-slate-200"
          )}
        >
          Todas
        </button>
        <button
          onClick={() => setActiveTab("no_leidas")}
          className={cn(
            "flex-1 py-3 rounded-xl font-medium text-sm transition-all",
            activeTab === "no_leidas"
              ? "bg-violet-100 text-violet-700"
              : "bg-white text-slate-600 border border-slate-200"
          )}
        >
          No leídas
          {noLeidas > 0 && (
            <span className="ml-1. 5 px-1.5 py-0.5 text-xs bg-violet-200 rounded-full">
              {noLeidas}
            </span>
          )}
        </button>
      </div>

      {/* Lista */}
      <div className="space-y-2">
        {notificacionesFiltradas.length > 0 ?  (
          notificacionesFiltradas. map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleClick(notif)}
              className={cn(
                "bg-white rounded-2xl border p-4 cursor-pointer transition-all relative group",
                ! notif.leida
                  ? "border-violet-200 shadow-sm"
                  : "border-slate-200 hover:border-slate-300"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Icono */}
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0", notif.color)}>
                  {notif.icono}
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <h3 className={cn(
                      "font-semibold line-clamp-1",
                      ! notif.leida ?  "text-slate-900" : "text-slate-700"
                    )}>
                      {notif.titulo}
                    </h3>
                    {! notif.leida && (
                      <span className="w-2 h-2 bg-violet-600 rounded-full shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2 mt-0.5">{notif.descripcion}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-slate-400">{notif.fecha}</span>
                    {notif.accion && (
                      <span className="text-xs text-violet-600 font-medium flex items-center gap-1">
                        {notif.accion.label}
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Acciones */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    eliminar(notif. id);
                  }}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Bell className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-700 mb-2">
              {activeTab === "no_leidas" ?  "No hay notificaciones sin leer" : "No hay notificaciones"}
            </h3>
            <p className="text-sm text-slate-500">
              Te notificaremos sobre tus proyectos y ofertas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}