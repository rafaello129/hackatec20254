import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Eye,
  MessageSquare,
  MapPin,
  Sparkles,
  BadgeCheck,
  Star,
  Paperclip,
  FileText,
  DollarSign,
  Info,
  ArrowRight,
  Truck,
  Package,
  Thermometer,
  Shield,
  Radio,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  User,
  AlertCircle,
  Zap,
  Check,
} from "lucide-react";
import { solicitudes, usuarioActual, analyticsCotizaciones } from "../data/mockData";
import React from "react";
import { cn } from "../components/ui/utils";

export default function EnviarCotizacion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cotizacionEnviada, setCotizacionEnviada] = useState(false);

  // Buscar solicitud
  const solicitud = solicitudes. find((s) => s.id === id) || solicitudes[0];

  // IA Analysis (mock)
  const iaAnalisis = {
    precioPromedio: 9200,
    precioMinimo: 8500,
    precioMaximo: 11200,
    cotizacionesActuales: solicitud. cotizaciones,
    tuPosicionEstimada: 2,
    factoresPositivos: [
      { factor: "Tu rating (4.9)", impacto: "+15%", icon: Star },
      { factor: "Certificación HACCP", impacto: "+10%", icon: Shield },
      { factor: "12 viajes en esta ruta", impacto: "+8%", icon: TrendingUp },
    ],
    factoresNegativos: [
      { factor: "Tiempo de respuesta (3h)", impacto: "-5%", icon: Clock },
    ],
    recomendaciones: [
      "Responder en menos de 1 hora aumenta 40% tus chances",
      "Incluir seguro de carga te diferencia del 60% de competidores",
      "Este cliente ha trabajado con empresas de tu red antes",
    ],
  };

  // Precios sugeridos
  const opcionesPrecio = [
    {
      id: "competitivo",
      label: "Competitivo",
      precio: iaAnalisis.precioMinimo,
      probabilidad: 89,
      descripcion: "Iguala el precio más bajo actual",
      color: "teal",
    },
    {
      id: "recomendado",
      label: "IA Recomendado",
      precio: 9500,
      probabilidad: 73,
      descripcion: "Balance óptimo precio/margen",
      color: "violet",
      destacado: true,
    },
    {
      id: "premium",
      label: "Premium",
      precio: 9800,
      probabilidad: 58,
      descripcion: "Mayor margen, incluye extras",
      color: "slate",
    },
  ];

  // Estado del formulario
  const [precioSeleccionado, setPrecioSeleccionado] = useState(opcionesPrecio[1]);
  const [serviciosIncluidos, setServiciosIncluidos] = useState({
    seguroCarga: true,
    monitoreoTemp: true,
    gpsTracking: true,
    maniobras: false,
  });
  const [fechaEntrega, setFechaEntrega] = useState("29 Nov 10:00 AM");
  const [mensaje, setMensaje] = useState(
    "Contamos con disponibilidad inmediata y amplia experiencia en esta ruta. Garantizamos control de temperatura durante todo el trayecto con monitoreo en tiempo real."
  );

  // Calcular probabilidad dinámica
  const calcularProbabilidad = () => {
    let base = precioSeleccionado.probabilidad;
    if (serviciosIncluidos.seguroCarga) base += 5;
    if (serviciosIncluidos.monitoreoTemp) base += 4;
    if (serviciosIncluidos.gpsTracking) base += 3;
    if (serviciosIncluidos.maniobras) base += 2;
    return Math.min(98, base);
  };

  const probabilidadFinal = calcularProbabilidad();

  // Enviar cotización (mock)
  const handleEnviar = () => {
    setCotizacionEnviada(true);
  };

  // Vista de éxito
  if (cotizacionEnviada) {
    return (
      <div className="space-y-6 pb-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/oportunidades")}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Cotización enviada</h1>
            <p className="text-slate-500 text-sm">Tu propuesta ha sido registrada</p>
          </div>
        </div>

        {/* Success card */}
        <div className="bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 rounded-3xl p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-300 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-bold mb-2">¡Cotización enviada!</h2>
            <p className="text-white/80 mb-4">
              El cliente recibirá tu propuesta y podrá contactarte
            </p>

            <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
              <div className="text-left">
                <div className="text-sm text-white/70">Tu precio</div>
                <div className="text-2xl font-bold">${precioSeleccionado. precio.toLocaleString()}</div>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="text-left">
                <div className="text-sm text-white/70">Probabilidad</div>
                <div className="text-2xl font-bold">{probabilidadFinal}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-800 mb-4">Resumen de tu cotización</h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Solicitud</span>
              <span className="font-medium text-slate-800">{solicitud.titulo}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Cliente</span>
              <span className="font-medium text-slate-800">{solicitud.solicitanteNombre}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Tu precio</span>
              <span className="font-bold text-teal-600">${precioSeleccionado.precio.toLocaleString()} MXN</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <span className="text-slate-600">Entrega estimada</span>
              <span className="font-medium text-slate-800">{fechaEntrega}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-slate-600">Posición estimada</span>
              <span className="font-medium text-violet-600">#{iaAnalisis.tuPosicionEstimada} de {solicitud.cotizaciones + 1}</span>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-5 border border-violet-100">
          <h4 className="font-semibold text-violet-800 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            ¿Qué sigue?
          </h4>
          <ul className="space-y-2 text-sm text-violet-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Te notificaremos cuando el cliente revise tu cotización</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Puedes modificar tu precio antes de que el cliente decida</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Responde rápido si el cliente te hace preguntas</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/operaciones")}
            className="flex-1 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25 transition-all flex items-center justify-center gap-2"
          >
            Ver mis cotizaciones
          </button>
          <button
            onClick={() => navigate("/oportunidades")}
            className="flex-1 py-4 rounded-2xl font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
          >
            Buscar más oportunidades
          </button>
        </div>
      </div>
    );
  }

  // Vista principal (formulario)
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Enviar cotización</h1>
          <p className="text-slate-500 text-sm">Solicitud #{solicitud.id}</p>
        </div>
      </div>

      {/* Solicitud resumen */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className={cn(
            "text-xs px-2. 5 py-1 rounded-full font-medium uppercase",
            solicitud.tipo === "transporte" ? "bg-violet-100 text-violet-700" :
            solicitud.tipo === "producto" ? "bg-teal-100 text-teal-700" :
            "bg-cyan-100 text-cyan-700"
          )}>
            {solicitud.tipo}
          </span>
          {solicitud.requiereRefrigerado && (
            <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Thermometer className="w-3 h-3" />
              Refrigerado
            </span>
          )}
          {solicitud.cierraEn. includes("hora") && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
              <Zap className="w-3 h-3" />
              Urgente
            </span>
          )}
        </div>

        <h2 className="font-bold text-lg text-slate-800 mb-2">{solicitud.titulo}</h2>
        <p className="text-sm text-slate-600 mb-4">{solicitud.descripcion}</p>

        {/* Ruta */}
        {solicitud.ubicacionOrigen && (
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-4">
            <MapPin className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-700">{solicitud.ubicacionOrigen}</span>
            <ArrowRight className="w-4 h-4 text-slate-300" />
            <span className="text-sm text-slate-700">{solicitud.ubicacionDestino}</span>
            {solicitud.distanciaKm && (
              <span className="text-xs text-slate-400 ml-auto">{solicitud.distanciaKm} km</span>
            )}
          </div>
        )}

        {/* Detalles grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-slate-500">Cantidad</div>
            <div className="font-medium text-slate-800">{solicitud.cantidad || "N/A"}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Fecha requerida</div>
            <div className="font-medium text-slate-800">{solicitud. fechaRequerida}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Presupuesto</div>
            <div className="font-medium text-slate-800">{solicitud.presupuesto}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Cierra en</div>
            <div className="font-medium text-amber-600">{solicitud.cierraEn}</div>
          </div>
        </div>

        {/* Solicitante */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-slate-600 font-bold text-sm">
            {solicitud.solicitanteNombre. split(" "). map(w => w[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-700">{solicitud.solicitanteNombre}</span>
              {solicitud.solicitanteVerificado && <BadgeCheck className="w-4 h-4 text-teal-500" />}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{solicitud.solicitanteRating}</span>
              <span>• Verificado</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">Competencia</div>
            <div className="font-medium text-slate-800">{solicitud.cotizaciones} cotizaciones</div>
          </div>
        </div>
      </div>

      {/* IA Analysis Card */}
      <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700 rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Análisis IA de tu competitividad</h3>
              <p className="text-white/70 text-sm">Basado en {solicitud.cotizaciones} cotizaciones actuales</p>
            </div>
          </div>

          {/* Factores */}
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-sm text-white/70 mb-2">A tu favor</div>
              {iaAnalisis.factoresPositivos.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-center gap-2 text-sm mb-1">
                    <Icon className="w-4 h-4 text-emerald-300" />
                    <span>{f.factor}</span>
                    <span className="ml-auto text-emerald-300 font-medium">{f.impacto}</span>
                  </div>
                );
              })}
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="text-sm text-white/70 mb-2">A mejorar</div>
              {iaAnalisis.factoresNegativos.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-center gap-2 text-sm mb-1">
                    <Icon className="w-4 h-4 text-amber-300" />
                    <span>{f.factor}</span>
                    <span className="ml-auto text-amber-300 font-medium">{f.impacto}</span>
                  </div>
                );
              })}
              <div className="text-xs text-white/50 mt-2">
                💡 Tip: Responde más rápido para mejorar
              </div>
            </div>
          </div>

          {/* Rango de precios */}
          <div className="bg-white/10 rounded-xl p-3">
            <div className="text-sm text-white/70 mb-2">Rango de precios actual</div>
            <div className="flex items-center gap-2">
              <span className="text-sm">${iaAnalisis.precioMinimo.toLocaleString()}</span>
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 via-yellow-400 to-red-400 rounded-full"
                  style={{ width: "100%" }}
                />
              </div>
              <span className="text-sm">${iaAnalisis. precioMaximo.toLocaleString()}</span>
            </div>
            <div className="text-xs text-white/50 mt-2 text-center">
              Promedio: ${iaAnalisis.precioPromedio.toLocaleString()} MXN
            </div>
          </div>
        </div>
      </div>

      {/* Selección de precio */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-teal-600" />
          Tu precio
        </h3>

        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {opcionesPrecio.map((opcion) => (
            <button
              key={opcion.id}
              onClick={() => setPrecioSeleccionado(opcion)}
              className={cn(
                "p-4 rounded-xl border-2 text-left transition-all relative",
                precioSeleccionado. id === opcion.id
                  ? opcion.color === "teal"
                    ? "border-teal-500 bg-teal-50"
                    : opcion.color === "violet"
                    ? "border-violet-500 bg-violet-50"
                    : "border-slate-800 bg-slate-50"
                  : "border-slate-200 hover:border-slate-300"
              )}
            >
              {opcion.destacado && (
                <span className="absolute -top-2 -right-2 text-xs bg-gradient-to-r from-violet-600 to-purple-600 text-white px-2 py-0.5 rounded-full font-medium">
                  ⭐ Sugerido
                </span>
              )}

              <div className="text-xs text-slate-500 mb-1">{opcion.label}</div>
              <div className="text-2xl font-bold text-slate-800">
                ${opcion.precio. toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-1">{opcion.descripcion}</div>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-1. 5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      opcion.probabilidad >= 80 ? "bg-emerald-500" :
                      opcion.probabilidad >= 60 ? "bg-teal-500" :
                      "bg-amber-500"
                    )}
                    style={{ width: `${opcion.probabilidad}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-600">{opcion.probabilidad}%</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Servicios incluidos */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-violet-600" />
          Servicios incluidos
        </h3>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { key: "seguroCarga", label: "Seguro de carga", desc: "Hasta $500,000 MXN", icon: Shield },
            { key: "monitoreoTemp", label: "Control de temperatura", desc: "Monitoreo en tiempo real", icon: Thermometer },
            { key: "gpsTracking", label: "GPS Tracking", desc: "Ubicación en vivo", icon: MapPin },
            { key: "maniobras", label: "Maniobras carga/descarga", desc: "+$1,200 MXN", icon: Package },
          ].map((servicio) => {
            const Icon = servicio. icon;
            const isChecked = serviciosIncluidos[servicio.key as keyof typeof serviciosIncluidos];

            return (
              <button
                key={servicio.key}
                onClick={() => setServiciosIncluidos({
                  ...serviciosIncluidos,
                  [servicio.key]: !isChecked
                })}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all",
                  isChecked
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-lg flex items-center justify-center shrink-0",
                  isChecked ? "bg-teal-500 text-white" : "bg-slate-100 text-slate-400"
                )}>
                  {isChecked ?  <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-medium text-slate-800 text-sm">{servicio.label}</div>
                  <div className="text-xs text-slate-500">{servicio.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fecha de entrega */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-600" />
          Fecha de entrega
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {["28 Nov 8:00 PM", "29 Nov 10:00 AM", "29 Nov 2:00 PM"]. map((fecha) => (
            <button
              key={fecha}
              onClick={() => setFechaEntrega(fecha)}
              className={cn(
                "p-3 rounded-xl border-2 text-center transition-all",
                fechaEntrega === fecha
                  ?  "border-cyan-500 bg-cyan-50"
                  : "border-slate-200 hover:border-slate-300"
              )}
            >
              <div className="font-medium text-slate-800 text-sm">{fecha. split(" ")[0]} {fecha.split(" ")[1]}</div>
              <div className="text-xs text-slate-500">{fecha.split(" ")[2]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mensaje */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-slate-600" />
          Mensaje al cliente
        </h3>

        <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
          <p className="text-sm text-slate-700 leading-relaxed">{mensaje}</p>
        </div>

        {/* Archivos adjuntos */}
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200">
            <FileText className="w-4 h-4 text-violet-500" />
            <span className="text-sm text-slate-600">Certificaciones. pdf</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200">
            <Paperclip className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-600">Ficha_Unidad.jpg</span>
          </div>
        </div>
      </div>

      {/* Resumen y enviar */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-slate-400 text-sm">Tu cotización</div>
            <div className="text-3xl font-bold">${precioSeleccionado.precio. toLocaleString()} MXN</div>
          </div>
          <div className="text-right">
            <div className="text-slate-400 text-sm">Probabilidad de ganar</div>
            <div className="text-3xl font-bold text-teal-400">{probabilidadFinal}%</div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
          <span>Entrega: {fechaEntrega}</span>
          <span>•</span>
          <span>{Object.values(serviciosIncluidos).filter(Boolean).length} servicios incluidos</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleEnviar}
            className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 transition-all flex items-center justify-center gap-2"
          >
            Enviar cotización
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}