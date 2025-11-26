import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Truck,
  MapPin,
  ArrowRight,
  Clock,
  Thermometer,
  CheckCircle2,
  Circle,
  Phone,
  MessageSquare,
  Navigation,
  Package,
  AlertCircle,
  RefreshCw,
  Shield,
  Zap,
  User,
  Calendar,
  ChevronRight,
  Star,
  BadgeCheck,
  Share2,
  Bell,
  FileText,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { ordenes } from "../data/mockData";
import React from "react";

export default function Tracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<"tracking" | "detalles" | "documentos">("tracking");

  // Buscar orden
  const orden = ordenes.find((o) => o.id === id) || ordenes[0];

  // Timeline extendido (mock)
  const timelineCompleto = [
    {
      fecha: "26 Nov",
      hora: "6:00 PM",
      evento: "Orden confirmada",
      descripcion: "El proveedor confirmó tu pedido",
      completado: true,
      icono: CheckCircle2,
    },
    {
      fecha: "28 Nov",
      hora: "7:30 AM",
      evento: "Transportista asignado",
      descripcion: "TransFrío MX recogerá tu pedido",
      completado: true,
      icono: Truck,
    },
    {
      fecha: "28 Nov",
      hora: "8:00 AM",
      evento: "Llegó al origen",
      descripcion: "El transportista llegó a Culiacán",
      completado: true,
      icono: MapPin,
    },
    {
      fecha: "28 Nov",
      hora: "8:30 AM",
      evento: "Carga completada",
      descripcion: "10 toneladas de tomate cargadas",
      completado: true,
      icono: Package,
    },
    {
      fecha: "28 Nov",
      hora: "10:15 AM",
      evento: "En tránsito",
      descripcion: "Salió de instalaciones rumbo a Guadalajara",
      completado: true,
      icono: Truck,
      actual: orden.estado === "en_transito",
    },
    {
      fecha: "29 Nov",
      hora: "10:00 AM",
      evento: "Entrega estimada",
      descripcion: "Llegada a tu ubicación en Guadalajara",
      completado: orden.estado === "entregada",
      icono: CheckCircle2,
    },
  ];

  // Ubicaciones en ruta (mock para el "mapa")
  const puntosRuta = [
    { nombre: "Culiacán (Origen)", progreso: 0, completado: true },
    { nombre: "Mazatlán", progreso: 30, completado: true },
    { nombre: "Tepic", progreso: 55, completado: orden.progreso >= 55 },
    { nombre: "Guadalajara (Destino)", progreso: 100, completado: orden.estado === "entregada" },
  ];

  // Conductor info (mock)
  const conductor = {
    nombre: "Juan Manuel García",
    telefono: "+52 667 123 4567",
    foto: "https://i.pravatar.cc/80?img=53",
    rating: 4.9,
    viajes: 234,
    unidad: "Thermo King T-1200",
    placas: "ABC-123-XY",
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Tracking #{orden.id}</h1>
            <p className="text-slate-500 text-sm">Seguimiento en tiempo real</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
            <Bell className="w-5 h-5 text-slate-600" />
          </button>
          <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
            <Share2 className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STATUS BANNER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className={cn(
        "rounded-2xl p-5 relative overflow-hidden",
        orden.estado === "en_transito"
          ? "bg-gradient-to-br from-teal-600 via-cyan-600 to-teal-700"
          : orden.estado === "entregada"
          ?  "bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700"
          : "bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600"
      )}>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 text-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {orden.estado === "en_transito" && (
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
              )}
              {orden.estado === "entregada" && (
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              )}
              <div>
                <h2 className="font-bold text-lg">
                  {orden.estado === "en_transito" ? "En camino" : 
                   orden.estado === "entregada" ? "Entregado" : "Preparando"}
                </h2>
                <p className="text-white/70 text-sm">
                  {orden.estado === "en_transito" 
                    ? `Actualizado ${orden.ultimaActualizacion}`
                    : orden.estado === "entregada"
                    ? `Entregado ${orden.fechaEntregaReal}`
                    : "En preparación"}
                </p>
              </div>
            </div>

            {orden.estado === "en_transito" && (
              <span className="flex items-center gap-2 text-xs bg-white/20 backdrop-blur-sm px-3 py-1. 5 rounded-full">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                En vivo
              </span>
            )}
          </div>

          {/* ETA */}
          {orden. estado === "en_transito" && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/70 text-sm">Llegada estimada</div>
                  <div className="text-2xl font-bold">{orden.fechaEntregaEstimada}</div>
                </div>
                <div className="text-right">
                  <div className="text-white/70 text-sm">Tiempo restante</div>
                  <div className="text-2xl font-bold">~14 hrs</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MAPA VISUAL (Simulado)
      ═══════════════════════════════════════════════════════════════════ */}
      {orden.estado === "en_transito" && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Mapa placeholder */}
          <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-50 relative">
            {/* Simulación de ruta */}
            <div className="absolute inset-4 flex items-center justify-between px-8">
              {/* Línea de ruta */}
              <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-200 rounded-full -translate-y-1/2">
                <div 
                  className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${orden.progreso}%` }}
                />
              </div>

              {/* Puntos de la ruta */}
              {puntosRuta.map((punto, index) => (
                <div 
                  key={index}
                  className="relative z-10 flex flex-col items-center"
                  style={{ position: 'absolute', left: `${punto.progreso}%`, transform: 'translateX(-50%)' }}
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 border-white shadow-md",
                    punto.completado ? "bg-teal-500" : "bg-slate-300"
                  )}>
                    {orden.progreso >= punto.progreso && orden.progreso < (puntosRuta[index + 1]?.progreso || 101) && index < puntosRuta.length - 1 && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                          <Truck className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-slate-600 mt-2 whitespace-nowrap font-medium">
                    {punto.nombre. split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>

            {/* Ubicación actual */}
            <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-800 text-sm">{orden.ubicacionActual}</div>
                  <div className="text-xs text-slate-500">Velocidad: 85 km/h • Rumbo: SE</div>
                </div>
                <button className="text-sm font-medium text-teal-600 hover:text-teal-700">
                  Ver mapa
                </button>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-600">{orden.origen}</span>
              <span className="font-bold text-teal-600">{orden.progreso}%</span>
              <span className="text-slate-600">{orden.destino}</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${orden.progreso}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
              <span>0 km</span>
              <span>{orden.distanciaKm} km</span>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TABS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex gap-2">
        {[
          { id: "tracking" as const, label: "Tracking", icon: MapPin },
          { id: "detalles" as const, label: "Detalles", icon: Package },
          { id: "documentos" as const, label: "Documentos", icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab. id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all",
                activeSection === tab.id
                  ? "bg-teal-100 text-teal-700"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: TRACKING
      ═══════════════════════════════════════════════════════════════════ */}
      {activeSection === "tracking" && (
        <div className="space-y-4">
          {/* Indicadores en vivo */}
          {orden.estado === "en_transito" && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center mx-auto mb-2">
                  <Thermometer className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800">{orden.temperatura}°C</div>
                <div className="text-xs text-slate-500">Temperatura</div>
                <div className="text-xs text-emerald-600 mt-1">✓ En rango</div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mx-auto mb-2">
                  <Navigation className="w-5 h-5 text-violet-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800">85</div>
                <div className="text-xs text-slate-500">km/h</div>
                <div className="text-xs text-slate-400 mt-1">Velocidad</div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-5 h-5 text-teal-600" />
                </div>
                <div className="text-2xl font-bold text-slate-800">14h</div>
                <div className="text-xs text-slate-500">Restante</div>
                <div className="text-xs text-teal-600 mt-1">A tiempo</div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">Historial de eventos</h3>
              <button className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1">
                <RefreshCw className="w-4 h-4" />
                Actualizar
              </button>
            </div>

            <div className="space-y-0">
              {timelineCompleto.map((evento, index) => {
                const Icon = evento.icono;
                const isLast = index === timelineCompleto.length - 1;

                return (
                  <div key={index} className="flex gap-4">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                        evento.actual
                          ? "bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30"
                          : evento.completado
                          ? "bg-teal-100 text-teal-600"
                          : "bg-slate-100 text-slate-400"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {!isLast && (
                        <div className={cn(
                          "w-0.5 h-16 my-1",
                          evento.completado ?  "bg-teal-200" : "bg-slate-200"
                        )} />
                      )}
                    </div>

                    {/* Content */}
                    <div className={cn("flex-1 pb-6", isLast && "pb-0")}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className={cn(
                            "font-semibold",
                            evento.actual ? "text-teal-700" : evento.completado ? "text-slate-800" : "text-slate-400"
                          )}>
                            {evento.evento}
                          </h4>
                          <p className="text-sm text-slate-500 mt-0.5">{evento.descripcion}</p>
                        </div>
                        <span className="text-xs text-slate-400 whitespace-nowrap">
                          {evento.fecha} • {evento.hora}
                        </span>
                      </div>

                      {evento.actual && (
                        <div className="mt-2 bg-teal-50 border border-teal-100 rounded-lg p-2 text-xs text-teal-700">
                          📍 Ubicación actual: {orden.ubicacionActual}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Conductor */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Transportista</h3>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={conductor.foto}
                alt={conductor.nombre}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-800">{conductor.nombre}</h4>
                  <BadgeCheck className="w-4 h-4 text-teal-500" />
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-medium text-slate-700">{conductor.rating}</span>
                  <span>• {conductor.viajes} viajes</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 mb-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-slate-500">Unidad</span>
                  <div className="font-medium text-slate-800">{conductor. unidad}</div>
                </div>
                <div>
                  <span className="text-slate-500">Placas</span>
                  <div className="font-medium text-slate-800">{conductor.placas}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors">
                <Phone className="w-5 h-5" />
                Llamar
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                <MessageSquare className="w-5 h-5" />
                Mensaje
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: DETALLES
      ═══════════════════════════════════════════════════════════════════ */}
      {activeSection === "detalles" && (
        <div className="space-y-4">
          {/* Productos */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Productos</h3>
            {orden.productos.map((prod, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-50 flex items-center justify-center text-2xl">
                    🍅
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">{prod.nombre}</div>
                    <div className="text-sm text-slate-500">{prod.cantidad}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">${prod.subtotal. toLocaleString()}</div>
                  <div className="text-xs text-slate-500">${prod.precioUnitario.toLocaleString()}/ton</div>
                </div>
              </div>
            ))}
          </div>

          {/* Proveedor */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Proveedor</h3>
            <div
              onClick={() => navigate(`/perfil-empresa/${orden.proveedorId}`)}
              className="flex items-center gap-4 cursor-pointer hover:bg-slate-50 -mx-5 -mb-5 p-5 rounded-b-2xl transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                AV
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800">{orden.proveedorNombre}</span>
                  <BadgeCheck className="w-4 h-4 text-teal-500" />
                </div>
                <div className="text-sm text-slate-500">{orden.origen}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Transporte */}
          {orden.conTransporte && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-bold text-slate-800 mb-4">Transporte</h3>
              <div
                onClick={() => navigate(`/perfil-empresa/${orden.transportistaId}`)}
                className="flex items-center gap-4 cursor-pointer hover:bg-slate-50 -mx-5 -mb-5 p-5 rounded-b-2xl transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  TF
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">{orden.transportistaNombre}</span>
                    <BadgeCheck className="w-4 h-4 text-teal-500" />
                  </div>
                  <div className="text-sm text-slate-500">Transporte refrigerado</div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          )}

          {/* Resumen de costos */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Resumen</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Subtotal productos</span>
                <span className="text-slate-800">${orden. subtotalProductos.toLocaleString()}</span>
              </div>
              {orden.costoTransporte && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Transporte</span>
                  <span className="text-slate-800">${orden.costoTransporte.toLocaleString()}</span>
                </div>
              )}
              <div className="h-px bg-slate-200 my-2" />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">Total</span>
                <span className="text-xl font-bold text-slate-800">${orden.total.toLocaleString()} MXN</span>
              </div>
            </div>
          </div>

          {/* Incluye */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border border-teal-100 p-5">
            <h3 className="font-bold text-teal-800 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Incluido en tu envío
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Seguro de carga",
                "GPS tracking",
                "Control temperatura",
                "Monitoreo 24/7",
                "Notificaciones",
                "Soporte prioritario",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-teal-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: DOCUMENTOS
      ═══════════════════════════════════════════════════════════════════ */}
      {activeSection === "documentos" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Documentos del envío</h3>

            <div className="space-y-3">
              {[
                { nombre: "Orden de compra", fecha: "26 Nov 2025", tipo: "PDF", disponible: true },
                { nombre: "Carta porte", fecha: "28 Nov 2025", tipo: "PDF", disponible: true },
                { nombre: "Factura", fecha: "26 Nov 2025", tipo: "PDF", disponible: true },
                { nombre: "Certificado de calidad", fecha: "28 Nov 2025", tipo: "PDF", disponible: true },
                { nombre: "Comprobante de entrega", fecha: "Pendiente", tipo: "PDF", disponible: false },
              ]. map((doc, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-xl border transition-colors",
                    doc. disponible
                      ? "border-slate-200 hover:border-teal-200 hover:bg-teal-50 cursor-pointer"
                      : "border-slate-100 bg-slate-50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    doc.disponible ?  "bg-teal-100 text-teal-600" : "bg-slate-200 text-slate-400"
                  )}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className={cn(
                      "font-medium",
                      doc.disponible ?  "text-slate-800" : "text-slate-400"
                    )}>
                      {doc.nombre}
                    </div>
                    <div className="text-xs text-slate-500">{doc.fecha} • {doc.tipo}</div>
                  </div>
                  {doc.disponible ?  (
                    <button className="text-sm font-medium text-teal-600 hover:text-teal-700">
                      Descargar
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400">Pendiente</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER ACTIONS
      ═══════════════════════════════════════════════════════════════════ */}
      {orden.estado === "en_transito" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Reportar problema
            </button>
            <button
              onClick={() => navigate("/operaciones")}
              className="flex-1 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
            >
              Ver todas mis órdenes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}