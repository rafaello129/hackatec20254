import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Calendar,
  Package,
  Truck,
  MapPin,
  ArrowRight,
  Plus,
  X,
  ChevronRight,
  ChevronDown,
  DollarSign,
  Clock,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  Zap,
  Target,
  BarChart3,
  Lightbulb,
  RefreshCw,
  Star,
  BadgeCheck,
  ShoppingCart,
  Percent,
  ArrowLeft,
  Building2,
  Thermometer,
  Shield,
  Calculator,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { empresas, productos } from "../data/mockData";
import React from "react";

type Step = 1 | 2 | 3;

interface NecesidadItem {
  id: string;
  producto: string;
  cantidad: string;
  unidad: string;
  fechaRequerida: string;
  prioridad: "alta" | "media" | "baja";
}

export default function SupplyPlanner() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [necesidades, setNecesidades] = useState<NecesidadItem[]>([
    { id: "1", producto: "Cemento Portland CPC 40", cantidad: "500", unidad: "sacos", fechaRequerida: "5 Dic", prioridad: "alta" },
    { id: "2", producto: "Varilla corrugada 3/8\"", cantidad: "10", unidad: "toneladas", fechaRequerida: "5 Dic", prioridad: "alta" },
    { id: "3", producto: "Arena de río", cantidad: "20", unidad: "m³", fechaRequerida: "8 Dic", prioridad: "media" },
  ]);
  const [destino, setDestino] = useState("Guadalajara, Jalisco");
  const [tieneTransporte, setTieneTransporte] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState<"recomendado" | "rapido" | "economico">("recomendado");
  const [mostrarAnalisis, setMostrarAnalisis] = useState(false);

  // Planes sugeridos por IA (mock)
  const planes = {
    recomendado: {
      nombre: "Consolidado Inteligente",
      descripcion: "Mejor balance precio-tiempo",
      ahorro: 11200,
      ahorroPercent: 12,
      tiempoEntrega: "5-8 Dic",
      proveedores: [
        { 
          nombre: "Materiales del Norte", 
          iniciales: "MN",
          rating: 4.8,
          productos: ["Cemento Portland (500 sacos)", "Arena de río (20 m³)"], 
          subtotal: 98500,
          matchScore: 92,
        },
        { 
          nombre: "Aceros Premium MTY", 
          iniciales: "AP",
          rating: 4.7,
          productos: ["Varilla corrugada 3/8\" (10 ton)"], 
          subtotal: 185000,
          matchScore: 88,
        },
      ],
      transporte: {
        nombre: "Logística Industrial del Norte",
        iniciales: "LN",
        tipo: "Carga consolidada",
        costo: 18500,
        ahorro: 6800,
        rating: 4.7,
      },
      total: 302000,
      totalSinOptimizar: 313200,
    },
    rapido: {
      nombre: "Entrega Express",
      descripcion: "Todo en 48 horas",
      ahorro: 0,
      ahorroPercent: 0,
      tiempoEntrega: "3-4 Dic",
      costoExtra: 8500,
      proveedores: [
        { 
          nombre: "Materiales Express GDL", 
          iniciales: "ME",
          rating: 4.5,
          productos: ["Cemento", "Arena", "Varilla"], 
          subtotal: 295000,
          matchScore: 78,
        },
      ],
      transporte: {
        nombre: "TransFrío MX",
        iniciales: "TF",
        tipo: "Express dedicado",
        costo: 26500,
        ahorro: 0,
        rating: 4.9,
      },
      total: 321500,
      totalSinOptimizar: 313200,
    },
    economico: {
      nombre: "Máximo Ahorro",
      descripcion: "Menor costo posible",
      ahorro: 18500,
      ahorroPercent: 15,
      tiempoEntrega: "8-12 Dic",
      proveedores: [
        { 
          nombre: "Distribuidora del Bajío", 
          iniciales: "DB",
          rating: 4.3,
          productos: ["Cemento", "Arena"], 
          subtotal: 92000,
          matchScore: 75,
        },
        { 
          nombre: "Aceros Económicos", 
          iniciales: "AE",
          rating: 4.2,
          productos: ["Varilla"], 
          subtotal: 178000,
          matchScore: 72,
        },
      ],
      transporte: {
        nombre: "Fletes Económicos MX",
        iniciales: "FE",
        tipo: "Carga compartida",
        costo: 14700,
        ahorro: 10600,
        rating: 4.1,
      },
      total: 284700,
      totalSinOptimizar: 313200,
    },
  };

  const planActual = planes[planSeleccionado];

  // Análisis IA (mock)
  const analisisIA = {
    oportunidades: [
      {
        tipo: "ahorro",
        titulo: "Consolidar entregas",
        descripcion: "Agrupar los 3 productos en un solo envío reduce el costo de transporte en $6,800",
        impacto: "+$6,800",
      },
      {
        tipo: "ahorro",
        titulo: "Proveedor alternativo de varilla",
        descripcion: "Aceros Premium MTY tiene mejor precio que tu proveedor habitual (-8%)",
        impacto: "+$4,400",
      },
      {
        tipo: "alerta",
        titulo: "Stock limitado de cemento",
        descripcion: "El proveedor recomendado tiene solo 600 sacos disponibles.  Sugiero ordenar pronto.",
        impacto: "Urgente",
      },
    ],
    predicciones: [
      { producto: "Cemento", tendencia: "up", cambio: "+5%", periodo: "próximas 2 semanas" },
      { producto: "Varilla", tendencia: "stable", cambio: "0%", periodo: "próximo mes" },
      { producto: "Arena", tendencia: "down", cambio: "-3%", periodo: "próxima semana" },
    ],
  };

  const agregarNecesidad = () => {
    const nueva: NecesidadItem = {
      id: Date.now().toString(),
      producto: "",
      cantidad: "",
      unidad: "piezas",
      fechaRequerida: "",
      prioridad: "media",
    };
    setNecesidades([...necesidades, nueva]);
  };

  const eliminarNecesidad = (id: string) => {
    setNecesidades(necesidades.filter((n) => n.  id !== id));
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-violet-600" />
            Supply Planner IA
          </h1>
          <p className="text-slate-500 text-sm">Planifica y optimiza tus compras</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          PROGRESS STEPS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-4">
        {[
          { number: 1, label: "Necesidades", icon: Package },
          { number: 2, label: "Plan IA", icon: Sparkles },
          { number: 3, label: "Confirmar", icon: CheckCircle2 },
        ].  map((step, index) => {
          const Icon = step.  icon;
          const isCompleted = currentStep > step. number;
          const isCurrent = currentStep === step. number;

          return (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    isCompleted
                      ?   "bg-gradient-to-br from-violet-500 to-purple-500 text-white"
                      : isCurrent
                      ?   "bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30"
                      : "bg-slate-100 text-slate-400"
                  )}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={cn(
                  "text-xs mt-2 font-medium",
                  isCurrent ?  "text-teal-600" : isCompleted ? "text-violet-600" : "text-slate-400"
                )}>
                  {step.label}
                </span>
              </div>

              {index < 2 && (
                <div className={cn(
                  "w-16 sm:w-24 h-1 mx-2 rounded-full",
                  isCompleted ?  "bg-violet-500" : "bg-slate-200"
                )} />
              )}
            </div>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STEP 1: NECESIDADES
      ═══════════════════════════════════════════════════════════════════ */}
      {currentStep === 1 && (
        <div className="space-y-4">
          {/* Intro card */}
          <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700 rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg mb-1">¿Qué necesitas comprar?</h2>
                <p className="text-white/80 text-sm">
                  Agrega los productos que necesitas y la IA te sugerirá la mejor combinación 
                  de proveedores y transporte para optimizar costos y tiempos.
                </p>
              </div>
            </div>
          </div>

          {/* Lista de necesidades */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">Lista de productos</h3>
              <button
                onClick={agregarNecesidad}
                className="text-sm font-medium text-violet-600 hover:text-violet-700 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Agregar
              </button>
            </div>

            <div className="space-y-3">
              {necesidades.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-sm shrink-0">
                    {index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-800">{item.producto || "Nuevo producto"}</div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                      <span>{item.cantidad} {item.unidad}</span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.fechaRequerida}
                      </span>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        item.prioridad === "alta" ? "bg-red-100 text-red-700" :
                        item.prioridad === "media" ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-600"
                      )}>
                        {item.  prioridad}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => eliminarNecesidad(item.id)}
                    className="w-8 h-8 rounded-lg hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Destino */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-600" />
              Destino de entrega
            </h3>

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <MapPin className="w-5 h-5 text-slate-400" />
              <div className="flex-1">
                <div className="font-medium text-slate-800">{destino}</div>
                <div className="text-sm text-slate-500">Mi ubicación principal</div>
              </div>
              <button className="text-sm font-medium text-teal-600 hover:text-teal-700">
                Cambiar
              </button>
            </div>
          </div>

          {/* Transporte propio */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-violet-600" />
              ¿Tienes transporte propio?
            </h3>

            <div className="flex gap-3">
              <button
                onClick={() => setTieneTransporte(false)}
                className={cn(
                  "flex-1 p-4 rounded-xl border-2 text-left transition-all",
                  ! tieneTransporte
                    ? "border-violet-500 bg-violet-50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  <span className="font-medium text-slate-800">No, buscar en la red</span>
                </div>
                <p className="text-sm text-slate-500">La IA encontrará el mejor transporte</p>
              </button>

              <button
                onClick={() => setTieneTransporte(true)}
                className={cn(
                  "flex-1 p-4 rounded-xl border-2 text-left transition-all",
                  tieneTransporte
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-5 h-5 text-teal-600" />
                  <span className="font-medium text-slate-800">Sí, tengo transporte</span>
                </div>
                <p className="text-sm text-slate-500">Solo optimizar proveedores</p>
              </button>
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(2)}
            className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Generar plan optimizado
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          STEP 2: PLAN IA
      ═══════════════════════════════════════════════════════════════════ */}
      {currentStep === 2 && (
        <div className="space-y-4">
          {/* Resultado IA */}
          <div className="bg-gradient-to-br from-teal-600 via-cyan-600 to-teal-700 rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Plan optimizado listo</h2>
                  <p className="text-white/70 text-sm">Analicé 12 proveedores y 8 transportistas</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold">${(planActual.ahorro / 1000).toFixed(1)}k</div>
                  <div className="text-xs text-white/70">Ahorro</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold">{planActual.proveedores.  length}</div>
                  <div className="text-xs text-white/70">Proveedores</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold">{planActual.tiempoEntrega.  split("-")[0]}</div>
                  <div className="text-xs text-white/70">Entrega</div>
                </div>
              </div>
            </div>
          </div>

          {/* Opciones de plan */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Elige tu plan</h3>

            <div className="space-y-3">
              {(["recomendado", "rapido", "economico"] as const).map((tipo) => {
                const plan = planes[tipo];
                const isSelected = planSeleccionado === tipo;

                return (
                  <button
                    key={tipo}
                    onClick={() => setPlanSeleccionado(tipo)}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all",
                      isSelected
                        ? tipo === "recomendado"
                          ? "border-violet-500 bg-violet-50"
                          : tipo === "rapido"
                          ? "border-amber-500 bg-amber-50"
                          : "border-teal-500 bg-teal-50"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {tipo === "recomendado" && <Sparkles className="w-5 h-5 text-violet-600" />}
                        {tipo === "rapido" && <Zap className="w-5 h-5 text-amber-600" />}
                        {tipo === "economico" && <Percent className="w-5 h-5 text-teal-600" />}
                        <span className="font-semibold text-slate-800">{plan. nombre}</span>
                        {tipo === "recomendado" && (
                          <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
                            Recomendado
                          </span>
                        )}
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        isSelected
                          ? tipo === "recomendado"
                            ? "border-violet-500 bg-violet-500"
                            : tipo === "rapido"
                            ? "border-amber-500 bg-amber-500"
                            : "border-teal-500 bg-teal-500"
                          : "border-slate-300"
                      )}>
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                    </div>

                    <p className="text-sm text-slate-500 mb-3">{plan.descripcion}</p>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {plan.tiempoEntrega}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-slate-800">
                        ${plan.total. toLocaleString()}
                      </span>
                      {plan.ahorro > 0 && (
                        <span className="flex items-center gap-1 text-emerald-600">
                          <TrendingDown className="w-4 h-4" />
                          Ahorras ${plan.  ahorro.toLocaleString()}
                        </span>
                      )}

                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detalle del plan seleccionado */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800">Detalle del plan</h3>
              <button
                onClick={() => setMostrarAnalisis(! mostrarAnalisis)}
                className="text-sm font-medium text-violet-600 hover:text-violet-700 flex items-center gap-1"
              >
                {mostrarAnalisis ?   "Ocultar análisis" : "Ver análisis IA"}
                <ChevronDown className={cn("w-4 h-4 transition-transform", mostrarAnalisis && "rotate-180")} />
              </button>
            </div>

            {/* Proveedores */}
            <div className="space-y-3 mb-4">
              <div className="text-sm font-medium text-slate-500">Proveedores</div>
              {planActual.proveedores.map((prov, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                    {prov.iniciales}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-800">{prov.nombre}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {prov.rating}
                      </span>
                      <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">
                        Match {prov.matchScore}%
                      </span>
                    </div>
                    <div className="text-sm text-slate-500">{prov.  productos. join(", ")}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800">${prov.subtotal.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Transporte */}
            {! tieneTransporte && (
              <div className="space-y-3 mb-4">
                <div className="text-sm font-medium text-slate-500">Transporte</div>
                <div className="flex items-center gap-3 p-3 bg-violet-50 rounded-xl border border-violet-100">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {planActual.transporte. iniciales}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-800">{planActual.transporte. nombre}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        {planActual.transporte.rating}
                      </span>
                    </div>
                    <div className="text-sm text-slate-500">{planActual. transporte.tipo}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800">${planActual.transporte.costo.toLocaleString()}</div>
                    {planActual.transporte.ahorro > 0 && (
                      <div className="text-xs text-emerald-600">
                        Ahorras ${planActual.transporte.ahorro.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Análisis IA expandible */}
            {mostrarAnalisis && (
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                <div className="text-sm font-medium text-slate-500">Oportunidades detectadas</div>
                {analisisIA.oportunidades.map((op, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-3 rounded-xl border",
                      op.tipo === "ahorro"
                        ?   "bg-emerald-50 border-emerald-100"
                        : "bg-amber-50 border-amber-100"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {op.tipo === "ahorro" ?  (
                        <TrendingDown className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-slate-800">{op.titulo}</div>
                        <div className="text-sm text-slate-600">{op.descripcion}</div>
                      </div>
                      <span className={cn(
                        "text-sm font-bold",
                        op.tipo === "ahorro" ? "text-emerald-600" : "text-amber-600"
                      )}>
                        {op.impacto}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="text-sm font-medium text-slate-500 mt-4">Predicción de precios</div>
                <div className="grid grid-cols-3 gap-3">
                  {analisisIA.predicciones.map((pred, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-3 text-center">
                      <div className="text-sm font-medium text-slate-800">{pred.producto}</div>
                      <div className={cn(
                        "text-lg font-bold mt-1",
                        pred. tendencia === "up" ? "text-red-500" :
                        pred.tendencia === "down" ?   "text-emerald-500" :
                        "text-slate-500"
                      )}>
                        {pred.cambio}
                      </div>
                      <div className="text-xs text-slate-400">{pred.periodo}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-slate-400 text-sm">Total estimado</div>
                <div className="text-3xl font-bold">${planActual.total.toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-slate-400 text-sm">Sin optimizar</div>
                <div className="text-xl text-slate-500 line-through">${planActual.totalSinOptimizar.toLocaleString()}</div>
              </div>
            </div>

            {planActual.ahorro > 0 && (
              <div className="bg-emerald-500/20 rounded-xl p-3 mb-4 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300">
                  Ahorras <strong>${planActual.ahorro. toLocaleString()}</strong> ({planActual.ahorroPercent}%)
                </span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
              >
                Modificar
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 hover:from-teal-300 hover:to-cyan-300 transition-all flex items-center justify-center gap-2"
              >
                Confirmar plan
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          STEP 3: CONFIRMACIÓN
      ═══════════════════════════════════════════════════════════════════ */}
      {currentStep === 3 && (
        <div className="space-y-4">
          {/* Success */}
          <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 rounded-3xl p-8 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-300 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-2xl font-bold mb-2">¡Plan confirmado!</h2>
              <p className="text-white/80 mb-4">
                Tus órdenes serán creadas automáticamente
              </p>

              <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-left">
                  <div className="text-sm text-white/70">Total</div>
                  <div className="text-2xl font-bold">${planActual.total.toLocaleString()}</div>
                </div>
                <div className="w-px h-10 bg-white/30" />
                <div className="text-left">
                  <div className="text-sm text-white/70">Ahorro</div>
                  <div className="text-2xl font-bold text-yellow-300">${planActual. ahorro.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de órdenes */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Órdenes creadas</h3>

            <div className="space-y-3">
              {planActual.proveedores.map((prov, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">Orden #{`ORD-${3500 + i}`}</div>
                    <div className="text-sm text-slate-500">{prov.nombre} • {prov.productos.join(", ")}</div>
                  </div>
                  <span className="font-bold text-slate-800">${prov.  subtotal.toLocaleString()}</span>
                </div>
              ))}

              {! tieneTransporte && (
                <div className="flex items-center gap-3 p-3 bg-violet-50 rounded-xl border border-violet-100">
                  <Truck className="w-5 h-5 text-violet-600 shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">Transporte consolidado</div>
                    <div className="text-sm text-slate-500">{planActual.transporte. nombre}</div>
                  </div>
                  <span className="font-bold text-slate-800">${planActual.transporte.costo.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Próximos pasos</h3>

            <div className="space-y-4">
              {[
                { fecha: "Hoy", evento: "Órdenes enviadas a proveedores", completado: true },
                { fecha: "1-2 Dic", evento: "Confirmación de proveedores", completado: false },
                { fecha: "3-4 Dic", evento: "Preparación de pedidos", completado: false },
                { fecha: "5 Dic", evento: "Recolección y salida", completado: false },
                { fecha: "5-8 Dic", evento: "Entrega en destino", completado: false },
              ].  map((paso, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    paso.completado
                      ?   "bg-emerald-100 text-emerald-600"
                      : "bg-slate-100 text-slate-400"
                  )}>
                    {paso.completado ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className={cn(
                      "font-medium",
                      paso.completado ? "text-emerald-700" : "text-slate-800"
                    )}>
                      {paso.evento}
                    </div>
                    <div className="text-sm text-slate-500">{paso.fecha}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/operaciones")}
              className="flex-1 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2"
            >
              Ver mis órdenes
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-4 rounded-2xl font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}