import {
    Sparkles,
    ArrowRight,
    TrendingUp,
    Zap,
    Users,
    MessageSquare,
    Eye,
    Truck,
  } from "lucide-react";
import React from "react";
  import { useNavigate } from "react-router-dom";
  
  export default function Feed() {
    const navigate = useNavigate();
  
    return (
      <div className="space-y-6">
        {/* ═══════════════════════════════════════════════════════════════════
            HEADER
        ═══════════════════════════════════════════════════════════════════ */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Tu Feed Comercial</h1>
          <p className="text-slate-500 text-sm mt-1">
            Actividad de tu red y oportunidades
          </p>
        </div>
  
        {/* ═══════════════════════════════════════════════════════════════════
            IA INSIGHT CARD
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-5 text-white shadow-lg shadow-blue-500/20">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
  
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-semibold">IA Insight</span>
              <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded-full">
                Hoy
              </span>
            </div>
  
            <p className="text-white/90 text-sm leading-relaxed">
              <strong>3 proveedores</strong> de tu red tienen ofertas en productos
              que compras frecuentemente.  Ahorro potencial:{" "}
              <strong className="text-yellow-300">$8,500</strong> este mes.
            </p>
  
            <button
              onClick={() => navigate("/oportunidades")}
              className="mt-4 inline-flex items-center gap-2 bg-white text-blue-600 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Ver oportunidades
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
  
        {/* ═══════════════════════════════════════════════════════════════════
            STATS GRID
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium">Ofertas</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">12</div>
            <div className="text-xs text-slate-500">Nuevas hoy</div>
          </div>
  
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-medium">Solicitudes</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">8</div>
            <div className="text-xs text-slate-500">Activas</div>
          </div>
  
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">Conexiones</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">45</div>
            <div className="text-xs text-slate-500">En tu red</div>
          </div>
  
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-purple-600 mb-2">
              <Truck className="w-4 h-4" />
              <span className="text-xs font-medium">En tránsito</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">3</div>
            <div className="text-xs text-slate-500">Órdenes</div>
          </div>
        </div>
  
        {/* ═══════════════════════════════════════════════════════════════════
            ACTIVITY FEED
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Actividad de tu red
          </h2>
  
          {/* Card 1: Nueva oferta */}
          <div
            onClick={() => navigate("/perfil-empresa/materiales-norte")}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
          >
            <div className="flex gap-4">
              {/* Logo */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                MN
              </div>
  
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-800">
                    Materiales del Norte
                  </span>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                    ✓ Verificado
                  </span>
                  <span className="text-xs text-slate-400 ml-auto">Hace 2h</span>
                </div>
  
                <p className="text-sm text-slate-600 mt-1">
                  Nueva oferta:{" "}
                  <span className="font-medium">Cemento Portland -15%</span> ⚡
                </p>
  
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <span className="line-through">$185</span>
                    <span className="text-emerald-600 font-semibold">
                      $157/saco
                    </span>
                  </span>
                  <span>📦 Min: 100 sacos</span>
                  <span>🚚 Entrega 24h</span>
                </div>
  
                <div className="flex gap-2 mt-4">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1. 5 rounded-lg transition-colors">
                    Cotizar
                  </button>
                  <button className="text-sm font-medium text-slate-600 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                    Ver perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          {/* Card 2: Solicitud de proveedor */}
          <div
            onClick={() => navigate("/oportunidades")}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center text-amber-600 font-bold text-sm shrink-0">
                FI
              </div>
  
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-800">
                    Ferretería Industrial MX
                  </span>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                    Busca proveedor
                  </span>
                  <span className="text-xs text-slate-400 ml-auto">Hace 5h</span>
                </div>
  
                <p className="text-sm text-slate-600 mt-1">
                  "Necesitamos <span className="font-medium">50 toneladas</span>{" "}
                  de varilla corrugada 3/8" para proyecto en Querétaro"
                </p>
  
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                  <span>📍 Querétaro</span>
                  <span>📅 Entrega: 15 Dic</span>
                  <span className="flex items-center gap-1 text-blue-600">
                    <Eye className="w-3 h-3" /> 23 vistas
                  </span>
                </div>
  
                <div className="flex gap-2 mt-4">
                  <button className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors">
                    Enviar cotización
                  </button>
                  <button className="text-sm font-medium text-slate-600 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          {/* Card 3: Conexión sugerida */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center text-purple-600 font-bold text-sm shrink-0">
                AS
              </div>
  
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-800">
                    Aceros y Metales SA
                  </span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                    🤝 Conexión sugerida
                  </span>
                </div>
  
                <p className="text-sm text-slate-600 mt-1">
                  ⭐ 4. 8 · 156 transacciones · Proveen a 3 empresas de tu red
                </p>
  
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-lg">
                    <Sparkles className="w-3 h-3" />
                    Match 87%
                  </div>
                  <span className="text-xs text-slate-500">
                    Compatible con tu perfil de compras
                  </span>
                </div>
  
                <div className="flex gap-2 mt-4">
                  <button className="text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Conectar
                  </button>
                  <button className="text-sm font-medium text-slate-600 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                    Ver perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          {/* Card 4: Transporte en tránsito */}
          <div
            onClick={() => navigate("/tracking/ORD-3421")}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-pointer"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                <Truck className="w-6 h-6" />
              </div>
  
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-800">
                    Orden #ORD-3421
                  </span>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1. 5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    En tránsito
                  </span>
                  <span className="text-xs text-slate-400 ml-auto">
                    Actualizado hace 10 min
                  </span>
                </div>
  
                <p className="text-sm text-slate-600 mt-1">
                  🍅 10 ton tomate · TransFrío MX · Culiacán → Guadalajara
                </p>
  
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Progreso</span>
                    <span>58%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                      style={{ width: "58%" }}
                    />
                  </div>
                </div>
  
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                  <span>⏱️ ETA: Mañana 10:00 AM</span>
                  <span>🌡️ 4°C ✓</span>
                </div>
  
                <div className="flex gap-2 mt-4">
                  <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors">
                    Ver tracking
                  </button>
                  <button className="text-sm font-medium text-slate-600 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    Contactar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* ═══════════════════════════════════════════════════════════════════
            QUICK ACTIONS (floating style)
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            Acciones rápidas
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate("/publicar")}
              className="text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors"
            >
              📢 Publicar oferta
            </button>
            <button
              onClick={() => navigate("/explorar")}
              className="text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors"
            >
              🔍 Buscar proveedor
            </button>
            <button
              onClick={() => navigate("/supply-planner")}
              className="text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors"
            >
              📅 Planificar compras
            </button>
          </div>
        </div>
      </div>
    );
  }