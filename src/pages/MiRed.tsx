import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Star,
  BadgeCheck,
  MapPin,
  Heart,
  TrendingUp,
  Package,
  Clock,
  ChevronRight,
  Search,
  Filter,
  MoreHorizontal,
  MessageCircle,
  Phone,
  Award,
  Zap,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Calendar,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { proveedores } from "../data/mockData2";
import React from "react";

type TabType = "favoritos" | "recientes" | "scorecards";

export default function MiRed() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("favoritos");
  const [searchQuery, setSearchQuery] = useState("");

  // Proveedores favoritos mock
  const proveedoresFavoritos = proveedores.slice(0, 4). map((p, i) => ({
    ... p,
    proyectosJuntos: Math.floor(Math.random() * 10) + 1,
    ultimaCompra: ["Hace 2 días", "Hace 1 semana", "Hace 2 semanas", "Hace 1 mes"][i],
    totalComprado: [45000, 128000, 32000, 89000][i],
    esFavorito: true,
  }));

  // Historial reciente mock
  const historialReciente = proveedores.slice(0, 6).map((p, i) => ({
    ...p,
    fecha: ["Hoy", "Ayer", "23 Nov", "20 Nov", "18 Nov", "15 Nov"][i],
    accion: ["Compra", "Cotización", "Mensaje", "Compra", "Consulta", "Compra"][i],
    monto: [12500, null, null, 8900, null, 23400][i],
  }));

  // Scorecards mock
  const scorecards = proveedores.slice(0, 4).map((p, i) => ({
    ...p,
    score: [95, 88, 92, 78][i],
    entregas: { aTiempo: [98, 92, 95, 85][i], total: [45, 23, 38, 12][i] },
    calidad: [4.9, 4.6, 4.8, 4.2][i],
    comunicacion: [5, 4.5,4.8, 4][i],
    precios: ["Competitivo", "Excelente", "Competitivo", "Regular"][i],
    tendencia: ["up", "stable", "up", "down"][i] as "up" | "stable" | "down",
  }));

  const tabs = [
    { id: "favoritos" as TabType, label: "Favoritos", icon: Heart, count: proveedoresFavoritos.length },
    { id: "recientes" as TabType, label: "Recientes", icon: Clock, count: null },
    { id: "scorecards" as TabType, label: "Scorecards", icon: BarChart3, count: null },
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Users className="w-7 h-7 text-violet-600" />
          Mi Red
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Proveedores con los que has trabajado
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl p-4 text-white">
          <div className="text-3xl font-bold">{proveedoresFavoritos.length}</div>
          <div className="text-white/70 text-sm">Favoritos</div>
        </div>
        <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-4 text-white">
          <div className="text-3xl font-bold">23</div>
          <div className="text-white/70 text-sm">Proveedores</div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-4 text-white">
          <div className="text-3xl font-bold">$294k</div>
          <div className="text-white/70 text-sm">Total comprado</div>
        </div>
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
          placeholder="Buscar en mi red..."
          className="w-full h-12 pl-12 pr-4 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 shadow-sm"
        />
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
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all",
                activeTab === tab.id
                  ? "bg-violet-100 text-violet-700"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== null && (
                <span className={cn(
                  "text-xs px-1. 5 py-0.5 rounded-full",
                  activeTab === tab.id ? "bg-violet-200" : "bg-slate-100"
                )}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: FAVORITOS
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "favoritos" && (
        <div className="space-y-4">
          {proveedoresFavoritos.map((prov) => (
            <div
              key={prov. id}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                    {prov.iniciales}
                  </div>
                  <button className="absolute -top-1 -right-1 w-6 h-6 bg-red-50 rounded-full flex items-center justify-center">
                    <Heart className="w-3. 5 h-3.5 text-red-500 fill-red-500" />
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      onClick={() => navigate(`/proveedor/${prov.id}`)}
                      className="font-semibold text-slate-800 hover:text-violet-700 cursor-pointer"
                    >
                      {prov.nombre}
                    </h3>
                    {prov. verificado && <BadgeCheck className="w-5 h-5 text-teal-500" />}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      {prov.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      {prov.proyectosJuntos} proyectos
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {prov.ultimaCompra}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-sm">
                      <span className="text-slate-500">Total: </span>
                      <span className="font-semibold text-slate-800">${prov.totalComprado. toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => navigate(`/proveedor/${prov.id}`)}
                    className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                <button className="flex-1 flex items-center justify-center gap-2 py-2. 5 rounded-xl font-medium text-sm text-slate-700 bg-slate-100 hover:bg-slate-200">
                  <MessageCircle className="w-4 h-4" />
                  Mensaje
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2. 5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-violet-600 to-purple-600">
                  <Zap className="w-4 h-4" />
                  Nueva compra
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: RECIENTES
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "recientes" && (
        <div className="space-y-3">
          {historialReciente.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={() => navigate(`/proveedor/${item.id}`)}
              className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                {item.iniciales}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-800 truncate">{item. nombre}</span>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-medium",
                    item.accion === "Compra" ? "bg-emerald-100 text-emerald-700" :
                    item. accion === "Cotización" ? "bg-amber-100 text-amber-700" :
                    "bg-slate-100 text-slate-600"
                  )}>
                    {item.accion}
                  </span>
                </div>
                <div className="text-sm text-slate-500">{item.fecha}</div>
              </div>
              {item.monto && (
                <div className="text-right">
                  <div className="font-semibold text-slate-800">${item.monto.toLocaleString()}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: SCORECARDS
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "scorecards" && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-4 border border-violet-100">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-violet-600" />
              <span className="font-semibold text-violet-800">Evaluación de proveedores</span>
            </div>
            <p className="text-sm text-violet-700">
              Basado en entregas a tiempo, calidad, comunicación y precios competitivos. 
            </p>
          </div>

          {scorecards.map((prov) => (
            <div
              key={prov. id}
              className="bg-white rounded-2xl border border-slate-200 p-5"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                  {prov.iniciales}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-800">{prov.nombre}</h3>
                    {prov.verificado && <BadgeCheck className="w-5 h-5 text-teal-500" />}
                  </div>
                  <div className="text-sm text-slate-500">{prov.entregas.total} entregas evaluadas</div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "text-2xl font-bold",
                    prov.score >= 90 ?  "text-emerald-600" :
                    prov.score >= 75 ? "text-amber-600" :
                    "text-red-500"
                  )}>
                    {prov.score}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    {prov.tendencia === "up" && <TrendingUp className="w-3. 5 h-3.5 text-emerald-500" />}
                    {prov. tendencia === "down" && <TrendingUp className="w-3.5 h-3.5 text-red-500 rotate-180" />}
                    <span>Score</span>
                  </div>
                </div>
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Entregas a tiempo</span>
                    <span className="text-sm font-semibold text-slate-800">{prov.entregas. aTiempo}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        prov.entregas.aTiempo >= 95 ? "bg-emerald-500" :
                        prov.entregas. aTiempo >= 85 ? "bg-amber-500" :
                        "bg-red-500"
                      )}
                      style={{ width: `${prov.entregas. aTiempo}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Calidad</span>
                    <span className="text-sm font-semibold text-slate-800 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      {prov.calidad}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${(prov.calidad / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-500">Comunicación</span>
                    <span className="text-sm font-semibold text-slate-800">{prov.comunicacion}/5</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full"
                      style={{ width: `${(prov.comunicacion / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Precios</span>
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      prov.precios === "Excelente" ? "bg-emerald-100 text-emerald-700" :
                      prov.precios === "Competitivo" ? "bg-teal-100 text-teal-700" :
                      "bg-amber-100 text-amber-700"
                    )}>
                      {prov. precios}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(`/proveedor/${prov. id}`)}
                className="w-full mt-4 py-2. 5 rounded-xl font-medium text-sm text-violet-600 bg-violet-50 hover:bg-violet-100 transition-colors"
              >
                Ver perfil completo
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}