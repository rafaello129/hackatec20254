import {
    Sparkles,
    ArrowRight,
    TrendingUp,
    Zap,
    Users,
    MessageSquare,
    Eye,
    Truck,
    Package,
    Clock,
    ChevronRight,
    Thermometer,
    MapPin,
    Star,
    BadgeCheck,
    Megaphone,
    Search,
    CalendarDays,
  } from "lucide-react";
  import { useNavigate } from "react-router-dom";
import React from "react";
import { ofertas, ordenes, usuarioActual } from "../data/mockData";
  
  export default function Feed() {
    const navigate = useNavigate();
  
    // Datos para stats
    const stats = [
      {
        icon: TrendingUp,
        label: "Ofertas",
        value: "12",
        sub: "Nuevas hoy",
        color: "text-teal-600",
        bg: "bg-teal-50",
        iconBg: "bg-teal-100",
      },
      {
        icon: Zap,
        label: "Solicitudes",
        value: "8",
        sub: "Activas",
        color: "text-violet-600",
        bg: "bg-violet-50",
        iconBg: "bg-violet-100",
      },
      {
        icon: Users,
        label: "Conexiones",
        value: "45",
        sub: "En tu red",
        color: "text-teal-600",
        bg: "bg-teal-50",
        iconBg: "bg-teal-100",
      },
      {
        icon: Truck,
        label: "En tránsito",
        value: "3",
        sub: "Órdenes",
        color: "text-violet-600",
        bg: "bg-violet-50",
        iconBg: "bg-violet-100",
      },
    ];
  
    return (
      <div className="space-y-6 pb-8">
        {/* ═══════════════════════════════════════════════════════════════════
            HEADER CON SALUDO
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Hola, {usuarioActual.nombre. split(" ")[0]} 👋
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Esto es lo que está pasando en tu red comercial
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            <span>Actualizado hace 5 min</span>
          </div>
        </div>
  
        {/* ═══════════════════════════════════════════════════════════════════
            IA INSIGHT CARD - HERO
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 p-6 text-white shadow-xl shadow-teal-500/25">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-violet-400/10 rounded-full blur-xl" />
  
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/10">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Asistente IA</h2>
                  <p className="text-white/70 text-sm">Análisis de hoy</p>
                </div>
              </div>
              <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1. 5 rounded-full font-medium">
                🔥 3 oportunidades
              </span>
            </div>
  
            {/* Content */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
              <p className="text-white/95 leading-relaxed">
                <span className="font-semibold">3 proveedores</span> de tu red tienen ofertas en productos que compras frecuentemente.  
                Ahorro potencial este mes:{" "}
                <span className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-lg font-bold">
                  $8,500 MXN
                </span>
              </p>
            </div>
  
            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/oportunidades")}
                className="inline-flex items-center gap-2 bg-white text-teal-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-teal-50 transition-all shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
              >
                Ver oportunidades
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate("/supply-planner")}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/30 transition-all"
              >
                <CalendarDays className="w-4 h-4" />
                Planificar compras
              </button>
            </div>
          </div>
        </div>
  
        {/* ═══════════════════════════════════════════════════════════════════
            STATS GRID
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats. map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`${stat.bg} rounded-2xl p-4 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className={`text-xs font-semibold ${stat.color} uppercase tracking-wide`}>
                    {stat. label}
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.sub}</div>
              </div>
            );
          })}
        </div>
  
        {/* ═══════════════════════════════════════════════════════════════════
            ORDEN EN TRÁNSITO (si hay)
        ═══════════════════════════════════════════════════════════════════ */}
        {ordenes.filter((o) => o.estado === "en_transito").length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Truck className="w-5 h-5 text-teal-600" />
                En tránsito ahora
              </h2>
              <button
                onClick={() => navigate("/operaciones")}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
              >
                Ver todas
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
  
            {ordenes
              .filter((o) => o.estado === "en_transito")
              .slice(0, 1)
              .map((orden) => (
                <div
                  key={orden.id}
                  onClick={() => navigate(`/tracking/${orden.id}`)}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/30 shrink-0">
                      <Truck className="w-7 h-7" />
                    </div>
  
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="font-bold text-slate-800">
                          Orden #{orden.id}
                        </span>
                        <span className="inline-flex items-center gap-1. 5 text-xs bg-teal-100 text-teal-700 px-2. 5 py-1 rounded-full font-medium">
                          <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                          En tránsito
                        </span>
                      </div>
  
                      <p className="text-slate-600 text-sm mb-3">
                        🍅 {orden.productos[0].cantidad} {orden.productos[0].nombre. toLowerCase()} · {orden.transportistaNombre}
                      </p>
  
                      {/* Route */}
                      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{orden.origen}</span>
                        <ArrowRight className="w-4 h-4 text-slate-300" />
                        <span>{orden.destino}</span>
                      </div>
  
                      {/* Progress bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1. 5">
                          <span className="text-slate-500">Progreso del viaje</span>
                          <span className="font-semibold text-teal-600">{orden.progreso}%</span>
                        </div>
                        <div className="h-2. 5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-500"
                            style={{ width: `${orden.progreso}%` }}
                          />
                        </div>
                      </div>
  
                      {/* Status row */}
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1. 5">
                          <Clock className="w-3. 5 h-3.5" />
                          ETA: {orden.fechaEntregaEstimada}
                        </span>
                        {orden.temperatura && (
                          <span className="flex items-center gap-1.5 text-teal-600">
                            <Thermometer className="w-3.5 h-3.5" />
                            {orden. temperatura}°C ✓
                          </span>
                        )}
                        <span className="text-slate-400">
                          · Actualizado {orden.ultimaActualizacion}
                        </span>
                      </div>
                    </div>
  
                    {/* Arrow */}
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </div>
              ))}
          </div>
        )}
  
        {/* ═══════════════════════════════════════════════════════════════════
            OFERTAS DE TU RED
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Zap className="w-5 h-5 text-violet-500" />
              Ofertas de tu red
            </h2>
            <button
              onClick={() => navigate("/explorar")}
              className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
            >
              Ver todas
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
  
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ofertas.slice(0, 3).map((oferta) => (
              <div
                key={oferta. id}
                onClick={() => navigate(`/perfil-empresa/${oferta.empresaId}`)}
                className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg hover:border-violet-200 transition-all cursor-pointer group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-100 to-violet-50 flex items-center justify-center text-violet-600 font-bold text-sm">
                      {oferta. empresaNombre. slice(0, 2). toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm group-hover:text-violet-600 transition-colors">
                        {oferta.empresaNombre}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {oferta.productoNombre}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs bg-gradient-to-r from-violet-600 to-purple-600 text-white px-2.5 py-1 rounded-full font-bold shadow-sm">
                    -{oferta.descuento}%
                  </span>
                </div>
  
                {/* Price */}
                <div className="bg-slate-50 rounded-xl p-3 mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-800">
                      ${oferta.precioOferta. toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ${oferta.precioOriginal.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500">/{oferta.unidad}</span>
                  </div>
                </div>
  
                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Min: {oferta.minCompra} {oferta.unidad}s</span>
                  <span className="text-violet-600 font-medium">
                    Válido hasta {oferta.validoHasta. split(" "). slice(0, 2).join(" ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* ═══════════════════════════════════════════════════════════════════
            ACTIVIDAD DE TU RED
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-600" />
              Actividad de tu red
            </h2>
          </div>
  
          <div className="space-y-3">
            {/* Card 1: Nueva oferta */}
            <div
              onClick={() => navigate("/perfil-empresa/emp-001")}
              className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg hover:border-teal-200 transition-all cursor-pointer group"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-50 flex items-center justify-center text-teal-600 font-bold text-sm shrink-0 shadow-sm">
                  MN
                </div>
  
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                      Materiales del Norte
                    </span>
                    <BadgeCheck className="w-4 h-4 text-teal-500" />
                    <span className="text-xs text-slate-400 ml-auto">Hace 2h</span>
                  </div>
  
                  <p className="text-sm text-slate-600 mb-3">
                    Publicó una nueva oferta:{" "}
                    <span className="font-medium text-slate-800">Cemento Portland -15%</span> ⚡
                  </p>
  
                  <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 px-2 py-1 rounded-lg">
                      <span className="line-through text-slate-400">$185</span>
                      <span className="font-semibold">$157/saco</span>
                    </span>
                    <span>📦 Min: 100 sacos</span>
                    <span>🚚 Entrega 24h</span>
                  </div>
  
                  <div className="flex gap-2 mt-4">
                    <button className="text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md">
                      Cotizar
                    </button>
                    <button className="text-sm font-medium text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors">
                      Ver perfil
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Card 2: Solicitud de proveedor */}
            <div
              onClick={() => navigate("/oportunidades")}
              className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg hover:border-violet-200 transition-all cursor-pointer group"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-purple-50 flex items-center justify-center text-violet-600 font-bold text-sm shrink-0 shadow-sm">
                  FI
                </div>
  
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-slate-800 group-hover:text-violet-600 transition-colors">
                      Ferretería Industrial MX
                    </span>
                    <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">
                      Busca proveedor
                    </span>
                    <span className="text-xs text-slate-400 ml-auto">Hace 5h</span>
                  </div>
  
                  <p className="text-sm text-slate-600 mb-3">
                    "Necesitamos <span className="font-medium text-slate-800">50 toneladas</span>{" "}
                    de varilla corrugada 3/8" para proyecto en Querétaro"
                  </p>
  
                  <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                    <span>📍 Querétaro</span>
                    <span>📅 Entrega: 15 Dic</span>
                    <span className="flex items-center gap-1 text-violet-600">
                      <Eye className="w-3. 5 h-3.5" /> 23 vistas
                    </span>
                    <span className="flex items-center gap-1 text-violet-600">
                      <MessageSquare className="w-3. 5 h-3.5" /> 5 cotizaciones
                    </span>
                  </div>
  
                  <div className="flex gap-2 mt-4">
                    <button className="text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md">
                      Enviar cotización
                    </button>
                    <button className="text-sm font-medium text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Card 3: Conexión sugerida */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg transition-all cursor-pointer group">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-100 to-teal-50 flex items-center justify-center text-teal-600 font-bold text-sm shrink-0 shadow-sm">
                  AS
                </div>
  
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors">
                      Aceros y Metales SA
                    </span>
                    <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full font-medium">
                      🤝 Conexión sugerida
                    </span>
                  </div>
  
                  <p className="text-sm text-slate-600 mb-2">
                    <Star className="w-4 h-4 text-amber-400 inline" /> 4.8 · 156 transacciones · Proveen a 3 empresas de tu red
                  </p>
  
                  <div className="inline-flex items-center gap-1. 5 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 text-xs font-medium px-3 py-1. 5 rounded-lg border border-teal-100">
                    <Sparkles className="w-3. 5 h-3.5" />
                    Match 87% — Compatible con tu perfil de compras
                  </div>
  
                  <div className="flex gap-2 mt-4">
                    <button className="text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Conectar
                    </button>
                    <button className="text-sm font-medium text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors">
                      Ver perfil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* ═══════════════════════════════════════════════════════════════════
            ACCIONES RÁPIDAS
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-violet-500" />
            Acciones rápidas
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => navigate("/publicar")}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
                <Megaphone className="w-5 h-5 text-violet-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">Publicar oferta</span>
            </button>
  
            <button
              onClick={() => navigate("/explorar")}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <Search className="w-5 h-5 text-teal-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">Buscar proveedor</span>
            </button>
  
            <button
              onClick={() => navigate("/supply-planner")}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
                <CalendarDays className="w-5 h-5 text-cyan-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">Planificar compras</span>
            </button>
  
            <button
              onClick={() => navigate("/mi-red")}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">Ver mi red</span>
            </button>
          </div>
        </div>
      </div>
    );
  }