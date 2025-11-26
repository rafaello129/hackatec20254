import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  ArrowRight,
  Check,
  Sparkles,
  Star,
  BadgeCheck,
  Thermometer,
  Shield,
  Clock,
  ChevronRight,
  Building2,
  Calendar,
  CreditCard,
  CheckCircle2,
  Circle,
  AlertCircle,
  Info,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import { empresas, productos } from "../data/mockData";
import React from "react";

type Step = 1 | 2 | 3 | 4;
type TransporteOpcion = "propio" | "proveedor" | "red";

export default function OrdenConTransporte() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [transporteOpcion, setTransporteOpcion] = useState<TransporteOpcion>("red");
  const [selectedTransportista, setSelectedTransportista] = useState<string>("emp-002");

  // Datos fake del pedido
  const pedido = {
    producto: productos. find(p => p.id === "prod-002")!, // Tomate
    cantidad: 10,
    unidad: "toneladas",
    proveedor: empresas.find(e => e.id === "emp-003")!, // Agrícola del Valle
    subtotal: 85000,
  };

  // Transportistas disponibles
  const transportistas = empresas. filter(e => e.esTransportista). map(t => ({
    ... t,
    precio: t.id === "emp-002" ? 9800 : t.id === "emp-007" ? 8500 : 11200,
    tiempoEntrega: t.id === "emp-002" ? "29 Nov 10:00 AM" : t.id === "emp-007" ? "29 Nov 2:00 PM" : "28 Nov 8:00 PM",
    recomendado: t.id === "emp-002",
    caracteristicas: [
      "Seguro de carga incluido",
      "GPS tracking",
      t.tipoTransporte?. includes("Refrigerado") ? "Control de temperatura" : "Carga asegurada",
      "Monitoreo 24/7",
    ],
  }));

  const selectedTransportistaData = transportistas.find(t => t.id === selectedTransportista);

  const costoTransporte = transporteOpcion === "red" && selectedTransportistaData 
    ? selectedTransportistaData.precio 
    : transporteOpcion === "proveedor" 
    ? 12000 
    : 0;

  const total = pedido.subtotal + costoTransporte;

  const steps = [
    { number: 1, label: "Resumen", icon: Package },
    { number: 2, label: "Transporte", icon: Truck },
    { number: 3, label: "Confirmar", icon: CheckCircle2 },
    { number: 4, label: "Éxito", icon: Check },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            {currentStep === 4 ? "¡Orden Confirmada!" : "Nueva Orden"}
          </h1>
          <p className="text-slate-500 text-sm">
            {currentStep === 4 ? "Tu pedido está en proceso" : `Paso ${currentStep} de 3`}
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          PROGRESS STEPS
      ═══════════════════════════════════════════════════════════════════ */}
      {currentStep < 4 && (
        <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-4">
          {steps.slice(0, 3).map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step. number;

            return (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                      isCompleted
                        ? "bg-gradient-to-br from-teal-500 to-cyan-500 text-white"
                        : isCurrent
                        ? "bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/30"
                        : "bg-slate-100 text-slate-400"
                    )}
                  >
                    {isCompleted ?  <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span
                    className={cn(
                      "text-xs mt-2 font-medium",
                      isCurrent ? "text-violet-600" : isCompleted ? "text-teal-600" : "text-slate-400"
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {index < 2 && (
                  <div
                    className={cn(
                      "w-16 sm:w-24 h-1 mx-2 rounded-full",
                      isCompleted ?  "bg-teal-500" : "bg-slate-200"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          STEP 1: RESUMEN DEL PEDIDO
      ═══════════════════════════════════════════════════════════════════ */}
      {currentStep === 1 && (
        <div className="space-y-4">
          {/* Producto */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-teal-600" />
              Resumen del pedido
            </h2>

            <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-50 flex items-center justify-center text-teal-600 font-bold text-lg shrink-0">
                🍅
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">{pedido.producto.nombre}</h3>
                <p className="text-sm text-slate-500">{pedido.proveedor.nombre}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="text-slate-600">{pedido.cantidad} {pedido.unidad}</span>
                  <span className="font-bold text-slate-800">
                    ${pedido.subtotal.toLocaleString()} MXN
                  </span>
                </div>
              </div>
            </div>

            {/* Proveedor info */}
            <div className="mt-4 p-4 border border-slate-200 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {pedido.proveedor.iniciales}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">{pedido.proveedor. nombre}</span>
                    <BadgeCheck className="w-4 h-4 text-teal-500" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{pedido.proveedor.rating}</span>
                    <span className="text-slate-300">•</span>
                    <MapPin className="w-4 h-4" />
                    <span>{pedido.proveedor.ubicacion}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ruta */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-violet-600" />
              Ruta de entrega
            </h2>

            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-xl">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                  <Circle className="w-3 h-3 text-teal-500 fill-teal-500" />
                  Origen
                </div>
                <div className="font-medium text-slate-800">Culiacán, Sinaloa</div>
              </div>

              <div className="flex flex-col items-center px-4">
                <ArrowRight className="w-5 h-5 text-slate-400" />
                <span className="text-xs text-slate-400 mt-1">725 km</span>
              </div>

              <div className="flex-1 text-right">
                <div className="flex items-center justify-end gap-2 text-sm text-slate-500 mb-1">
                  <MapPin className="w-3 h-3 text-violet-500" />
                  Destino
                </div>
                <div className="font-medium text-slate-800">Guadalajara, Jalisco</div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>Fecha disponible para envío: <strong className="text-slate-700">28 Nov 2025</strong></span>
            </div>
          </div>

          {/* Subtotal */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border border-teal-100 p-5">
            <div className="flex items-center justify-between">
              <span className="text-teal-700">Subtotal productos</span>
              <span className="text-2xl font-bold text-teal-800">${pedido.subtotal. toLocaleString()} MXN</span>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2"
          >
            Continuar
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          STEP 2: SELECCIÓN DE TRANSPORTE
      ═══════════════════════════════════════════════════════════════════ */}
      {currentStep === 2 && (
        <div className="space-y-4">
          {/* Opciones de transporte */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-violet-600" />
              ¿Cómo quieres recibir tu pedido?
            </h2>

            <div className="space-y-3">
              {/* Opción 1: Transporte propio */}
              <button
                onClick={() => setTransporteOpcion("propio")}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all",
                  transporteOpcion === "propio"
                    ?  "border-teal-500 bg-teal-50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                    transporteOpcion === "propio"
                      ? "border-teal-500 bg-teal-500"
                      : "border-slate-300"
                  )}>
                    {transporteOpcion === "propio" && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-slate-600" />
                      <span className="font-semibold text-slate-800">Tengo mi propio transporte</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      Coordinaré directamente con el proveedor para recoger el pedido
                    </p>
                  </div>
                  <span className="text-sm font-medium text-slate-400">$0</span>
                </div>
              </button>

              {/* Opción 2: Proveedor entrega */}
              <button
                onClick={() => setTransporteOpcion("proveedor")}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all",
                  transporteOpcion === "proveedor"
                    ?  "border-teal-500 bg-teal-50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                    transporteOpcion === "proveedor"
                      ? "border-teal-500 bg-teal-500"
                      : "border-slate-300"
                  )}>
                    {transporteOpcion === "proveedor" && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-slate-600" />
                      <span className="font-semibold text-slate-800">El proveedor entrega</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      Agrícola del Valle se encarga del envío (24-48 hrs)
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-slate-800">+$12,000</span>
                </div>
              </button>

              {/* Opción 3: Buscar en la red */}
              <button
                onClick={() => setTransporteOpcion("red")}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all",
                  transporteOpcion === "red"
                    ? "border-violet-500 bg-violet-50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5",
                    transporteOpcion === "red"
                      ? "border-violet-500 bg-violet-500"
                      : "border-slate-300"
                  )}>
                    {transporteOpcion === "red" && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-violet-600" />
                      <span className="font-semibold text-slate-800">Buscar transportista en la red</span>
                      <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">
                        Recomendado
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">
                      Encuentra opciones verificadas con IA y mejores precios
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Transportistas disponibles */}
          {transporteOpcion === "red" && (
            <div className="space-y-4">
              {/* IA Suggestion */}
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-4 border border-violet-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-violet-800 text-sm">Recomendación IA</h3>
                    <p className="text-violet-700 text-sm mt-1">
                      <strong>TransFrío MX</strong> tiene la mejor relación precio/rating para esta ruta.  
                      98% de entregas a tiempo con control de temperatura.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transportistas list */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-800 mb-4">Transportistas disponibles</h3>

                <div className="space-y-3">
                  {transportistas.slice(0, 3).map((transportista) => (
                    <button
                      key={transportista. id}
                      onClick={() => setSelectedTransportista(transportista. id)}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 text-left transition-all",
                        selectedTransportista === transportista.id
                          ? "border-violet-500 bg-violet-50"
                          : "border-slate-200 hover:border-slate-300"
                      )}
                    >
                      <div className="flex gap-4">
                        {/* Radio + Logo */}
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0. 5",
                            selectedTransportista === transportista.id
                              ? "border-violet-500 bg-violet-500"
                              : "border-slate-300"
                          )}>
                            {selectedTransportista === transportista.id && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>

                          <div className={cn(
                            "w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold shrink-0",
                            transportista.recomendado
                              ? "bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg shadow-violet-500/30"
                              : "bg-gradient-to-br from-teal-500 to-cyan-500"
                          )}>
                            {transportista.iniciales}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-slate-800">{transportista.nombre}</span>
                            <BadgeCheck className="w-4 h-4 text-teal-500" />
                            {transportista.recomendado && (
                              <span className="text-xs bg-gradient-to-r from-violet-600 to-purple-600 text-white px-2 py-0.5 rounded-full font-medium">
                                🏆 Recomendado
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span className="font-medium text-slate-700">{transportista.rating}</span>
                            <span>({transportista.numResenias} viajes)</span>
                          </div>

                          {/* Features */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {transportista.tipoTransporte?. slice(0, 2).map((tipo, i) => (
                              <span
                                key={i}
                                className={cn(
                                  "text-xs px-2 py-1 rounded-lg",
                                  tipo. toLowerCase(). includes("refrigerado")
                                    ? "bg-cyan-100 text-cyan-700"
                                    : "bg-slate-100 text-slate-600"
                                )}
                              >
                                {tipo. toLowerCase(). includes("refrigerado") && "❄️ "}
                                {tipo}
                              </span>
                            ))}
                          </div>

                          {/* Delivery info */}
                          <div className="flex items-center gap-4 mt-3 text-sm">
                            <span className="flex items-center gap-1. 5 text-slate-500">
                              <Clock className="w-4 h-4" />
                              Entrega: {transportista.tiempoEntrega}
                            </span>
                          </div>

                          {/* Includes */}
                          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                            {transportista. caracteristicas. slice(0, 3).map((car, i) => (
                              <span key={i} className="text-xs text-teal-600 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                {car}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right shrink-0">
                          <div className="text-xl font-bold text-slate-800">
                            ${transportista.precio.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500">MXN</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Totals */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Subtotal productos</span>
                <span className="text-slate-800">${pedido.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Transporte</span>
                <span className="text-slate-800">
                  {costoTransporte > 0 ? `$${costoTransporte.toLocaleString()}` : "Gratis"}
                </span>
              </div>
              <div className="h-px bg-slate-200 my-2" />
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">Total</span>
                <span className="text-2xl font-bold text-slate-800">${total.toLocaleString()} MXN</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25 transition-all flex items-center justify-center gap-2"
          >
            Continuar a confirmación
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          STEP 3: CONFIRMACIÓN
      ═══════════════════════════════════════════════════════════════════ */}
      {currentStep === 3 && (
        <div className="space-y-4">
          {/* Resumen completo */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              Resumen de tu orden
            </h2>

            {/* Producto */}
            <div className="p-4 bg-slate-50 rounded-xl mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-500">PRODUCTO</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {pedido.proveedor.iniciales}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800">{pedido.proveedor. nombre}</div>
                  <div className="text-sm text-slate-500">
                    {pedido.producto.nombre} × {pedido.cantidad} {pedido.unidad}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">${pedido.subtotal.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Transporte */}
            {transporteOpcion === "red" && selectedTransportistaData && (
              <div className="p-4 bg-violet-50 rounded-xl mb-4 border border-violet-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-violet-600">TRANSPORTE</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {selectedTransportistaData.iniciales}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">{selectedTransportistaData.nombre}</div>
                    <div className="text-sm text-slate-500">
                      Transporte refrigerado · 725 km
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800">${costoTransporte.toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 text-sm text-violet-700">
                  <Clock className="w-4 h-4" />
                  <span>Entrega estimada: {selectedTransportistaData.tiempoEntrega}</span>
                </div>
              </div>
            )}

            {/* Ruta visual */}
            <div className="p-4 border border-slate-200 rounded-xl mb-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-xs text-slate-500 mb-1">Origen</div>
                  <div className="font-medium text-slate-800">Culiacán, Sinaloa</div>
                  <div className="text-sm text-slate-500">28 Nov · 8:00 AM</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-xs text-slate-400 mt-1">725 km</span>
                </div>

                <div className="flex-1 text-right">
                  <div className="text-xs text-slate-500 mb-1">Destino</div>
                  <div className="font-medium text-slate-800">Guadalajara, Jalisco</div>
                  <div className="text-sm text-slate-500">29 Nov · 10:00 AM</div>
                </div>
              </div>
            </div>

            {/* Incluye */}
            <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
              <div className="text-sm font-medium text-teal-800 mb-2">Tu orden incluye:</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Seguro de carga",
                  "GPS tracking en tiempo real",
                  "Control de temperatura",
                  "Monitoreo 24/7",
                  "Notificaciones de estado",
                  "Soporte prioritario"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-teal-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-violet-600" />
              Timeline estimado
            </h3>

            <div className="space-y-4">
              {[
                { date: "28 Nov", time: "8:00 AM", event: "Recolección en origen", icon: Package },
                { date: "28 Nov", time: "10:00 AM", event: "Sale de Culiacán", icon: Truck },
                { date: "29 Nov", time: "8:00 AM", event: "Llega a Guadalajara", icon: MapPin },
                { date: "29 Nov", time: "10:00 AM", event: "Entrega confirmada", icon: CheckCircle2 },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        i === 0 ? "bg-gradient-to-br from-teal-500 to-cyan-500 text-white" : "bg-slate-100 text-slate-400"
                      )}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {i < 3 && <div className="w-0.5 h-8 bg-slate-200 mt-2" />}
                    </div>
                    <div className="flex-1 pt-2">
                      <div className="font-medium text-slate-800">{item.event}</div>
                      <div className="text-sm text-slate-500">{item.date} · {item.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total final */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-300">Total a pagar</span>
              <div className="text-right">
                <div className="text-3xl font-bold">${total.toLocaleString()}</div>
                <div className="text-sm text-slate-400">MXN (IVA incluido)</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <Shield className="w-4 h-4" />
              <span>Pago seguro · Garantía de entrega</span>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 rounded-xl font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Confirmar y pagar
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          STEP 4: ÉXITO
      ═══════════════════════════════════════════════════════════════════ */}
      {currentStep === 4 && (
        <div className="space-y-6">
          {/* Success animation */}
          <div className="bg-gradient-to-br from-teal-500 via-cyan-500 to-teal-600 rounded-3xl p-8 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-300 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-2xl font-bold mb-2">¡Orden confirmada! </h2>
              <p className="text-white/80 mb-4">
                Tu pedido ha sido procesado exitosamente
              </p>

              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                <div className="text-sm text-white/70">Número de orden</div>
                <div className="text-xl font-bold">#ORD-3421</div>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-4">Detalles de tu orden</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-slate-600">Producto</span>
                <span className="font-medium text-slate-800">
                  {pedido.producto. nombre} × {pedido.cantidad} {pedido.unidad}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-slate-600">Proveedor</span>
                <span className="font-medium text-slate-800">{pedido. proveedor.nombre}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-slate-600">Transportista</span>
                <span className="font-medium text-slate-800">{selectedTransportistaData?. nombre}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <span className="text-slate-600">Entrega estimada</span>
                <span className="font-medium text-teal-600">29 Nov 2025 · 10:00 AM</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-slate-600">Total pagado</span>
                <span className="text-xl font-bold text-slate-800">${total.toLocaleString()} MXN</span>
              </div>
            </div>
          </div>

          {/* Next steps */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-100 p-5">
            <h3 className="font-bold text-violet-800 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5" />
              ¿Qué sigue?
            </h3>
            <ul className="space-y-2 text-sm text-violet-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Recibirás un email con la confirmación de tu orden</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                <span>El transportista te contactará para coordinar la entrega</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0. 5 shrink-0" />
                <span>Podrás seguir tu envío en tiempo real desde la app</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/tracking/ORD-3421")}
              className="flex-1 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Truck className="w-5 h-5" />
              Seguir mi envío
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