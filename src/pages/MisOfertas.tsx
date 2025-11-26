import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tag,
  Plus,
  Search,
  Eye,
  MessageCircle,
  TrendingUp,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  PauseCircle,
  XCircle,
  Edit3,
  Trash2,
  Copy,
  ChevronRight,
  Zap,
  Users,
  DollarSign,
  Calendar,
  BarChart3,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import React from "react";

type TabType = "activas" | "pausadas" | "finalizadas";

interface MiOferta {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  unidad: string;
  estado: "activa" | "pausada" | "finalizada" | "vendida";
  fechaPublicacion: string;
  vistas: number;
  interesados: number;
  mensajes: number;
  imagen: string;
}

export default function MisOfertas() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("activas");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);

  const ofertas: MiOferta[] = [
    {
      id: "of-1",
      nombre: "Tablones de Pino de Primera",
      descripcion: "Tablones de pino secados al horno, ideales para muebles",
      categoria: "Madera",
      precio: 420,
      unidad: "pieza",
      estado: "activa",
      fechaPublicacion: "Hace 2 días",
      vistas: 156,
      interesados: 8,
      mensajes: 3,
      imagen: "🪵",
    },
    {
      id: "of-2",
      nombre: "Servicio de Corte CNC",
      descripcion: "Corte de precisión para madera, MDF y acrílico",
      categoria: "Servicio",
      precio: 150,
      unidad: "hora",
      estado: "activa",
      fechaPublicacion: "Hace 1 semana",
      vistas: 89,
      interesados: 5,
      mensajes: 2,
      imagen: "⚙️",
    },
    {
      id: "of-3",
      nombre: "Flete Local GDL",
      descripcion: "Servicio de transporte en zona metropolitana",
      categoria: "Transporte",
      precio: 350,
      unidad: "viaje",
      estado: "pausada",
      fechaPublicacion: "Hace 2 semanas",
      vistas: 234,
      interesados: 12,
      mensajes: 0,
      imagen: "🚚",
    },
    {
      id: "of-4",
      nombre: "Cemento Portland",
      descripcion: "Cemento de alta resistencia, 50kg por saco",
      categoria: "Construcción",
      precio: 185,
      unidad: "saco",
      estado: "vendida",
      fechaPublicacion: "Hace 1 mes",
      vistas: 312,
      interesados: 18,
      mensajes: 7,
      imagen: "🧱",
    },
  ];

  const tabs = [
    { id: "activas" as TabType, label: "Activas", estados: ["activa"] },
    { id: "pausadas" as TabType, label: "Pausadas", estados: ["pausada"] },
    { id: "finalizadas" as TabType, label: "Finalizadas", estados: ["finalizada", "vendida"] },
  ];

  const ofertasFiltradas = ofertas.filter((o) => {
    const tabActual = tabs.find((t) => t. id === activeTab);
    return tabActual?. estados.includes(o. estado);
  });

  const stats = {
    totalVistas: ofertas.reduce((acc, o) => acc + o. vistas, 0),
    totalInteresados: ofertas.reduce((acc, o) => acc + o.interesados, 0),
    totalMensajes: ofertas.reduce((acc, o) => acc + o. mensajes, 0),
    activas: ofertas.filter((o) => o. estado === "activa").length,
  };

  const getEstadoConfig = (estado: MiOferta["estado"]) => {
    const configs = {
      activa: { color: "text-emerald-600", bg: "bg-emerald-50", icon: CheckCircle2, label: "Activa" },
      pausada: { color: "text-amber-600", bg: "bg-amber-50", icon: PauseCircle, label: "Pausada" },
      finalizada: { color: "text-slate-500", bg: "bg-slate-50", icon: XCircle, label: "Finalizada" },
      vendida: { color: "text-violet-600", bg: "bg-violet-50", icon: Zap, label: "Vendida" },
    };
    return configs[estado];
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Tag className="w-7 h-7 text-violet-600" />
            Mis Ofertas
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Gestiona tus publicaciones
          </p>
        </div>
        <button
          onClick={() => navigate("/vender")}
          className="flex items-center gap-2 px-4 py-2. 5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/25"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Nueva</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <Eye className="w-5 h-5 text-slate-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-slate-800">{stats.totalVistas}</div>
          <div className="text-xs text-slate-500">Vistas</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <Users className="w-5 h-5 text-violet-500 mx-auto mb-1" />
          <div className="text-xl font-bold text-slate-800">{stats. totalInteresados}</div>
          <div className="text-xs text-slate-500">Interesados</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <MessageCircle className="w-5 h-5 text-teal-500 mx-auto mb-1" />
          <div className="text-xl font-bold text-slate-800">{stats.totalMensajes}</div>
          <div className="text-xs text-slate-500">Mensajes</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
          <Tag className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
          <div className="text-xl font-bold text-slate-800">{stats.activas}</div>
          <div className="text-xs text-slate-500">Activas</div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TABS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex gap-2">
        {tabs. map((tab) => {
          const count = ofertas.filter((o) => tab.estados.includes(o.estado)).length;
          return (
            <button
              key={tab. id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-3 rounded-xl font-medium text-sm transition-all",
                activeTab === tab.id
                  ? "bg-violet-100 text-violet-700"
                  : "bg-white text-slate-600 border border-slate-200"
              )}
            >
              {tab.label}
              <span className={cn(
                "ml-1. 5 px-1. 5 py-0.5 text-xs rounded-full",
                activeTab === tab.id ? "bg-violet-200" : "bg-slate-100"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          LISTA DE OFERTAS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="space-y-4">
        {ofertasFiltradas.length > 0 ? (
          ofertasFiltradas.map((oferta) => {
            const estado = getEstadoConfig(oferta. estado);
            const EstadoIcon = estado.icon;

            return (
              <div
                key={oferta.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 relative"
              >
                <div className="flex items-start gap-4">
                  {/* Imagen */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-3xl shrink-0">
                    {oferta.imagen}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        onClick={() => navigate(`/mis-ofertas/${oferta.id}`)}
                        className="font-semibold text-slate-800 truncate cursor-pointer hover:text-violet-700"
                      >
                        {oferta.nombre}
                      </h3>
                      <span className={cn("flex items-center gap-1 text-xs px-2 py-0.5 rounded-full", estado.bg, estado.color)}>
                        <EstadoIcon className="w-3 h-3" />
                        {estado. label}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 mb-2 line-clamp-1">{oferta.descripcion}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-bold text-slate-800">
                        ${oferta.precio. toLocaleString()}/{oferta.unidad}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{oferta. fechaPublicacion}</span>
                    </div>

                    {/* Métricas */}
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3. 5 h-3.5" />
                        {oferta.vistas} vistas
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {oferta.interesados} interesados
                      </span>
                      {oferta.mensajes > 0 && (
                        <span className="flex items-center gap-1 text-violet-600">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {oferta.mensajes} mensajes
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Menú */}
                  <button
                    onClick={() => setMenuAbierto(menuAbierto === oferta.id ? null : oferta.id)}
                    className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 shrink-0"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                {/* Acciones rápidas */}
                {oferta.estado === "activa" && oferta.interesados > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                    <button
                      onClick={() => navigate(`/mis-ofertas/${oferta. id}`)}
                      className="flex-1 flex items-center justify-center gap-2 py-2. 5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-violet-600 to-purple-600"
                    >
                      <Users className="w-4 h-4" />
                      Ver interesados
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2. 5 rounded-xl font-medium text-sm text-slate-700 bg-slate-100">
                      <BarChart3 className="w-4 h-4" />
                      Estadísticas
                    </button>
                  </div>
                )}

                {/* Menú contextual */}
                {menuAbierto === oferta.id && (
                  <div className="absolute top-14 right-4 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-10 w-48">
                    <button className="w-full flex items-center gap-3 px-4 py-2. 5 text-sm text-slate-700 hover:bg-slate-50">
                      <Edit3 className="w-4 h-4" />
                      Editar
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                      <Copy className="w-4 h-4" />
                      Duplicar
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                      {oferta.estado === "activa" ?  (
                        <>
                          <PauseCircle className="w-4 h-4" />
                          Pausar
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Activar
                        </>
                      )}
                    </button>
                    <div className="border-t border-slate-100 my-1" />
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <Tag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-700 mb-2">
              No hay ofertas {activeTab}
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Crea tu primera oferta para empezar a vender
            </p>
            <button
              onClick={() => navigate("/vender")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-violet-600 bg-violet-50 hover:bg-violet-100"
            >
              <Plus className="w-4 h-4" />
              Crear oferta
            </button>
          </div>
        )}
      </div>

      {menuAbierto && (
        <div className="fixed inset-0 z-0" onClick={() => setMenuAbierto(null)} />
      )}
    </div>
  );
}