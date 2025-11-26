import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  FolderKanban,
  Zap,
  Users,
  TrendingUp,
  Clock,
  ChevronRight,
  Star,
  BadgeCheck,
  Package,
  MessageCircle,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { usuarioActual, proyectos, ofertas, getMensajesNoLeidos } from "../data/mockData2";
import React from "react";

export default function Feed() {
  const navigate = useNavigate();
  const mensajesNoLeidos = getMensajesNoLeidos();
  const proyectosActivos = proyectos. filter((p) => p.estado === "activo");

  const stats = [
    {
      icon: FolderKanban,
      label: "Proyectos",
      value: proyectosActivos.length. toString(),
      sub: "Activos",
      color: "violet",
    },
    {
      icon: MessageCircle,
      label: "Mensajes",
      value: mensajesNoLeidos.toString(),
      sub: "Sin leer",
      color: "rose",
    },
    {
      icon: Users,
      label: "Proveedores",
      value: "24",
      sub: "En tu red",
      color: "teal",
    },
    {
      icon: TrendingUp,
      label: "Ahorro",
      value: "$12k",
      sub: "Este mes",
      color: "emerald",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; iconBg: string; text: string }> = {
      violet: { bg: "bg-violet-50", iconBg: "bg-violet-100", text: "text-violet-600" },
      rose: { bg: "bg-rose-50", iconBg: "bg-rose-100", text: "text-rose-600" },
      teal: { bg: "bg-teal-50", iconBg: "bg-teal-100", text: "text-teal-600" },
      emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", text: "text-emerald-600" },
    };
    return colors[color] || colors.violet;
  };

  const getEstadoNodo = (estado: string) => {
    const estados: Record<string, { color: string; label: string }> = {
      completado: { color: "bg-emerald-500", label: "Completado" },
      en_progreso: { color: "bg-teal-500", label: "En progreso" },
      confirmado: { color: "bg-blue-500", label: "Confirmado" },
      pendiente: { color: "bg-amber-500", label: "Pendiente" },
      esperando: { color: "bg-slate-300", label: "Esperando" },
      fallido: { color: "bg-red-500", label: "Fallido" },
    };
    return estados[estado] || estados.pendiente;
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Hola, {usuarioActual.nombre. split(" ")[0]} 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            ¿Qué vamos a construir hoy? 
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          <span>Actualizado hace 5 min</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA PRINCIPAL - INICIAR CON IA
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700 p-6 text-white shadow-xl shadow-violet-500/25">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-bold text-xl mb-1">¿Qué necesitas?</h2>
              <p className="text-white/80 text-sm">
                Cuéntame y te ayudo a encontrar proveedores, servicios y todo lo que necesites.
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
            <p className="text-white/90 text-sm">
              💡 Prueba decir: <span className="text-white font-medium">"Necesito 50 tablones de pino con corte CNC y entrega"</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                const chatButton = document.querySelector('[data-chat-trigger]') as HTMLButtonElement;
                if (chatButton) chatButton.click();
              }}
              className="inline-flex items-center gap-2 bg-white text-violet-700 font-semibold text-sm px-5 py-3 rounded-xl hover:bg-violet-50 transition-all shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              Iniciar con IA
            </button>
            <button
              onClick={() => navigate("/proyectos")}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-white/30 transition-all"
            >
              Ver mis proyectos
              <ArrowRight className="w-4 h-4" />
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
          const colors = getColorClasses(stat.color);

          return (
            <div
              key={index}
              className={cn(
                "rounded-2xl p-4 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer",
                colors.bg
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colors.iconBg)}>
                  <Icon className={cn("w-5 h-5", colors.text)} />
                </div>
                <span className={cn("text-xs font-semibold uppercase tracking-wide", colors.text)}>
                  {stat.label}
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.sub}</div>
            </div>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          PROYECTOS ACTIVOS
      ═══════════════════════════════════════════════════════════════════ */}
      {proyectosActivos.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-violet-600" />
              Proyectos activos
            </h2>
            <button
              onClick={() => navigate("/proyectos")}
              className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1"
            >
              Ver todos
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {proyectosActivos. map((proyecto) => {
              const nodosConMensajes = proyecto.nodos.filter((n) => n. mensajesNoLeidos > 0);
              const totalMensajes = nodosConMensajes.reduce((acc, n) => acc + n. mensajesNoLeidos, 0);

              return (
                <div
                  key={proyecto.id}
                  onClick={() => navigate(`/proyecto/${proyecto.id}`)}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-800 group-hover:text-violet-700 transition-colors">
                          {proyecto.nombre}
                        </h3>
                        {totalMensajes > 0 && (
                          <span className="w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            {totalMensajes}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500">{proyecto.descripcion}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-slate-800">
                        ${proyecto.totalEstimado. toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500">estimado</div>
                    </div>
                  </div>

                  {/* Progreso */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1. 5">
                      <span className="text-slate-500">Progreso del proyecto</span>
                      <span className="font-semibold text-violet-600">{proyecto.progreso}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all"
                        style={{ width: `${proyecto.progreso}%` }}
                      />
                    </div>
                  </div>

                  {/* Nodos preview */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {proyecto.nodos.slice(0, 5).map((nodo, index) => {
                      const estadoNodo = getEstadoNodo(nodo.estado);
                      return (
                        <div
                          key={nodo.id}
                          className="flex items-center gap-2 shrink-0"
                        >
                          <div className="relative">
                            <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center text-lg",
                              nodo.proveedor ?  "bg-slate-100" : "bg-slate-50 border-2 border-dashed border-slate-200"
                            )}>
                              {nodo.icono}
                            </div>
                            <span className={cn(
                              "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
                              estadoNodo. color
                            )} />
                          </div>
                          {index < proyecto.nodos.slice(0, 5).length - 1 && (
                            <div className="w-4 h-0.5 bg-slate-200" />
                          )}
                        </div>
                      );
                    })}
                    {proyecto.nodos.length > 5 && (
                      <span className="text-xs text-slate-400">+{proyecto. nodos.length - 5}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          OFERTAS DEL MERCADO
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Ofertas del mercado
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
              key={oferta.id}
              onClick={() => navigate(`/proveedor/${oferta.proveedorId}`)}
              className="bg-white rounded-2xl border border-slate-200 p-4 hover:shadow-lg hover:border-amber-200 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center text-amber-600 font-bold text-sm">
                    {oferta. proveedorNombre. slice(0, 2). toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm group-hover:text-amber-600 transition-colors">
                      {oferta.proveedorNombre}
                    </h3>
                    <p className="text-xs text-slate-500">{oferta.producto}</p>
                  </div>
                </div>
                <span className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2. 5 py-1 rounded-full font-bold shadow-sm">
                  -{oferta.descuento}%
                </span>
              </div>

              <div className="bg-slate-50 rounded-xl p-3 mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-800">
                    ${oferta.precioOferta.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ${oferta.precioOriginal.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500">/{oferta.unidad}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Min: {oferta.minCompra} {oferta.unidad}</span>
                <span className="text-amber-600 font-medium">
                  Válido hasta {oferta.validoHasta. split(" "). slice(0, 2). join(" ")}
                </span>
              </div>
            </div>
          ))}
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
            onClick={() => navigate("/proyectos")}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center group-hover:bg-violet-200 transition-colors">
              <FolderKanban className="w-5 h-5 text-violet-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">Nuevo proyecto</span>
          </button>

          <button
            onClick={() => navigate("/explorar")}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
              <Package className="w-5 h-5 text-teal-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">Buscar producto</span>
          </button>

          <button
            onClick={() => navigate("/mi-red")}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
              <Users className="w-5 h-5 text-cyan-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">Mi red</span>
          </button>

          <button
            onClick={() => navigate("/mensajes")}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-rose-300 hover:shadow-md transition-all group relative"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center group-hover:bg-rose-200 transition-colors">
              <MessageCircle className="w-5 h-5 text-rose-600" />
            </div>
            <span className="text-sm font-medium text-slate-700">Mensajes</span>
            {mensajesNoLeidos > 0 && (
              <span className="absolute top-3 right-3 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {mensajesNoLeidos}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}