import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Package,
  Camera,
  Plus,
  X,
  ChevronRight,
  ChevronDown,
  MapPin,
  Calendar,
  DollarSign,
  Tag,
  Truck,
  FileText,
  CheckCircle2,
  Info,
  TrendingUp,
  Users,
  Zap,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import React from "react";

type Step = 1 | 2 | 3 | 4;

interface OfertaData {
  tipo: "producto" | "servicio" | null;
  categoria: string;
  nombre: string;
  descripcion: string;
  imagenes: string[];
  precio: string;
  unidad: string;
  minCompra: string;
  disponibilidad: string;
  ubicacion: string;
  incluyeTransporte: boolean;
  fechaLimite: string;
  certificaciones: string[];
  notas: string;
}

export default function PublicarOferta() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [oferta, setOferta] = useState<OfertaData>({
    tipo: null,
    categoria: "",
    nombre: "",
    descripcion: "",
    imagenes: [],
    precio: "",
    unidad: "pieza",
    minCompra: "1",
    disponibilidad: "inmediata",
    ubicacion: "Guadalajara, Jalisco",
    incluyeTransporte: false,
    fechaLimite: "",
    certificaciones: [],
    notas: "",
  });

  const categorias = {
    producto: [
      { id: "madera", label: "Madera y Tableros", emoji: "🪵" },
      { id: "ferreteria", label: "Ferretería", emoji: "🔩" },
      { id: "construccion", label: "Construcción", emoji: "🧱" },
      { id: "agricola", label: "Agrícola", emoji: "🌾" },
      { id: "alimentos", label: "Alimentos", emoji: "🍅" },
      { id: "otro", label: "Otro", emoji: "📦" },
    ],
    servicio: [
      { id: "transporte", label: "Transporte", emoji: "🚚" },
      { id: "maquinado", label: "Maquinado/CNC", emoji: "⚙️" },
      { id: "mano_obra", label: "Mano de obra", emoji: "👷" },
      { id: "acabados", label: "Acabados", emoji: "🎨" },
      { id: "instalacion", label: "Instalación", emoji: "🔧" },
      { id: "otro", label: "Otro", emoji: "🛠️" },
    ],
  };

  const unidades = [
    { id: "pieza", label: "Pieza" },
    { id: "kg", label: "Kilogramo" },
    { id: "ton", label: "Tonelada" },
    { id: "m3", label: "Metro cúbico" },
    { id: "m2", label: "Metro cuadrado" },
    { id: "litro", label: "Litro" },
    { id: "caja", label: "Caja" },
    { id: "hora", label: "Por hora" },
    { id: "dia", label: "Por día" },
    { id: "viaje", label: "Por viaje" },
  ];

  // Precio de mercado mock
  const precioMercado = oferta.precio ?  {
    min: Math.floor(parseFloat(oferta. precio) * 0.85),
    max: Math.floor(parseFloat(oferta. precio) * 1.15),
    promedio: Math.floor(parseFloat(oferta.precio) * 1.02),
  } : null;

  const compradorePotenciales = 15;

  const handlePublicar = async () => {
    setIsPublishing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsPublishing(false);
    setShowSuccess(true);
  };

  const canContinue = () => {
    switch (step) {
      case 1:
        return oferta.tipo && oferta.categoria;
      case 2:
        return oferta.nombre && oferta.descripcion;
      case 3:
        return oferta.precio && oferta.minCompra;
      case 4:
        return true;
      default:
        return false;
    }
  };

  // Pantalla de éxito
  if (showSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">¡Oferta publicada! </h1>
        <p className="text-slate-500 mb-6 max-w-sm">
          Tu oferta ya está visible para <strong>{compradorePotenciales} compradores</strong> potenciales en tu zona.
        </p>
        
        <div className="bg-violet-50 rounded-2xl p-4 mb-6 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-violet-600" />
            <span className="font-semibold text-violet-800">Sugerencia IA</span>
          </div>
          <p className="text-sm text-violet-700">
            Responde rápido a las consultas para aumentar tus posibilidades de venta en un 40%.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button
            onClick={() => navigate("/mis-ofertas")}
            className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/25"
          >
            Ver mis ofertas
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full py-4 rounded-xl font-semibold text-slate-700 bg-slate-100"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-32">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => step > 1 ?  setStep((s) => (s - 1) as Step) : navigate(-1)}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-slate-800">Publicar oferta</h1>
          <p className="text-sm text-slate-500">Paso {step} de 4</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          PROGRESS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={cn(
              "flex-1 h-2 rounded-full transition-all",
              s <= step ? "bg-gradient-to-r from-violet-500 to-purple-500" : "bg-slate-200"
            )}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STEP 1: TIPO Y CATEGORÍA
      ═══════════════════════════════════════════════════════════════════ */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6" />
              <span className="font-bold">¿Qué quieres ofrecer?</span>
            </div>
            <p className="text-white/80 text-sm">
              Cuéntame y te ayudo a crear una oferta atractiva para los compradores.
            </p>
          </div>

          {/* Tipo */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-3 block">Tipo de oferta</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setOferta({ ...oferta, tipo: "producto", categoria: "" })}
                className={cn(
                  "p-5 rounded-2xl border-2 text-left transition-all",
                  oferta.tipo === "producto"
                    ? "border-violet-500 bg-violet-50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="text-3xl mb-2">📦</div>
                <div className="font-semibold text-slate-800">Producto</div>
                <div className="text-sm text-slate-500">Materiales, insumos, mercancía</div>
              </button>
              <button
                onClick={() => setOferta({ ...oferta, tipo: "servicio", categoria: "" })}
                className={cn(
                  "p-5 rounded-2xl border-2 text-left transition-all",
                  oferta.tipo === "servicio"
                    ? "border-violet-500 bg-violet-50"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="text-3xl mb-2">🛠️</div>
                <div className="font-semibold text-slate-800">Servicio</div>
                <div className="text-sm text-slate-500">Transporte, mano de obra, etc.</div>
              </button>
            </div>
          </div>

          {/* Categoría */}
          {oferta.tipo && (
            <div>
              <label className="text-sm font-medium text-slate-700 mb-3 block">Categoría</label>
              <div className="grid grid-cols-2 gap-2">
                {categorias[oferta.tipo].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setOferta({ ...oferta, categoria: cat.id })}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                      oferta.categoria === cat.id
                        ? "border-violet-500 bg-violet-50"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <span className="text-2xl">{cat. emoji}</span>
                    <span className="font-medium text-slate-800">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          STEP 2: DETALLES
      ═══════════════════════════════════════════════════════════════════ */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Nombre del {oferta.tipo === "producto" ? "producto" : "servicio"}
            </label>
            <input
              type="text"
              value={oferta.nombre}
              onChange={(e) => setOferta({ ...oferta, nombre: e. target.value })}
              placeholder={oferta.tipo === "producto" ? "Ej: Tablones de pino de primera" : "Ej: Servicio de corte CNC"}
              className="w-full h-12 px-4 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Descripción</label>
            <textarea
              value={oferta.descripcion}
              onChange={(e) => setOferta({ ...oferta, descripcion: e.target.value })}
              placeholder="Describe las características, calidad, especificaciones..."
              rows={4}
              className="w-full p-4 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 resize-none"
            />
            <div className="flex items-center gap-2 mt-2">
              <Sparkles className="w-4 h-4 text-violet-500" />
              <button className="text-sm text-violet-600 font-medium">
                Mejorar con IA
              </button>
            </div>
          </div>

          {/* Fotos */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Fotos (opcional)</label>
            <div className="flex gap-3">
              <button className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-violet-400 hover:text-violet-500 transition-colors">
                <Camera className="w-6 h-6 mb-1" />
                <span className="text-xs">Agregar</span>
              </button>
              {[1, 2]. map((i) => (
                <div key={i} className="w-24 h-24 rounded-xl bg-slate-100 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          STEP 3: PRECIO Y DISPONIBILIDAD
      ═══════════════════════════════════════════════════════════════════ */}
      {step === 3 && (
        <div className="space-y-6">
          {/* Precio */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Precio</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="number"
                  value={oferta.precio}
                  onChange={(e) => setOferta({ ...oferta, precio: e.target.value })}
                  placeholder="0.00"
                  className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>
              <select
                value={oferta.unidad}
                onChange={(e) => setOferta({ ...oferta, unidad: e. target.value })}
                className="h-12 px-4 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-violet-400"
              >
                {unidades.map((u) => (
                  <option key={u.id} value={u.id}>por {u.label}</option>
                ))}
              </select>
            </div>

            {/* Precio de mercado */}
            {precioMercado && (
              <div className="mt-3 p-3 bg-teal-50 rounded-xl border border-teal-100">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                  <span className="text-sm font-medium text-teal-800">Precio de mercado</span>
                </div>
                <p className="text-sm text-teal-700">
                  Productos similares se venden entre <strong>${precioMercado.min}</strong> y <strong>${precioMercado. max}</strong>. 
                  Tu precio está {parseFloat(oferta.precio) < precioMercado.promedio ? "por debajo" : "por encima"} del promedio.
                </p>
              </div>
            )}
          </div>

          {/* Cantidad mínima */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Cantidad mínima de compra</label>
            <input
              type="number"
              value={oferta.minCompra}
              onChange={(e) => setOferta({ ...oferta, minCompra: e.target. value })}
              placeholder="1"
              className="w-full h-12 px-4 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
            />
          </div>

          {/* Disponibilidad */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Disponibilidad</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "inmediata", label: "Inmediata" },
                { id: "24h", label: "En 24 horas" },
                { id: "semana", label: "Esta semana" },
                { id: "fecha", label: "Fecha específica" },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setOferta({ ...oferta, disponibilidad: d. id })}
                  className={cn(
                    "p-3 rounded-xl border-2 text-sm font-medium transition-all",
                    oferta.disponibilidad === d.id
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Transporte */}
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-slate-600" />
              <div>
                <div className="font-medium text-slate-800">Incluir transporte</div>
                <div className="text-sm text-slate-500">Puedes entregar el producto</div>
              </div>
            </div>
            <button
              onClick={() => setOferta({ ... oferta, incluyeTransporte: !oferta.incluyeTransporte })}
              className={cn(
                "w-12 h-7 rounded-full transition-all relative",
                oferta.incluyeTransporte ?  "bg-violet-600" : "bg-slate-200"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full bg-white shadow absolute top-1 transition-all",
                  oferta.incluyeTransporte ?  "right-1" : "left-1"
                )}
              />
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          STEP 4: REVISIÓN
      ═══════════════════════════════════════════════════════════════════ */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6" />
              <span className="font-bold">{compradorePotenciales} compradores potenciales</span>
            </div>
            <p className="text-white/80 text-sm">
              Hay compradores en tu zona buscando productos similares ahora mismo. 
            </p>
          </div>

          {/* Resumen */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 mb-1">{oferta.nombre || "Sin nombre"}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{oferta.descripcion || "Sin descripción"}</p>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Precio</span>
                <span className="font-semibold text-slate-800">
                  ${parseFloat(oferta. precio || "0"). toLocaleString()} / {unidades.find(u => u.id === oferta.unidad)?.label}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Mínimo de compra</span>
                <span className="font-semibold text-slate-800">{oferta.minCompra}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Disponibilidad</span>
                <span className="font-semibold text-slate-800 capitalize">{oferta. disponibilidad}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Transporte</span>
                <span className="font-semibold text-slate-800">{oferta.incluyeTransporte ? "Incluido" : "No incluido"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Ubicación</span>
                <span className="font-semibold text-slate-800">{oferta. ubicacion}</span>
              </div>
            </div>
          </div>

          {/* Términos */}
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                Al publicar, aceptas responder a los interesados en máximo 24 horas y mantener la información actualizada.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-20 z-40">
        <div className="max-w-6xl mx-auto">
          {step < 4 ?  (
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              disabled={! canContinue()}
              className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continuar
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handlePublicar}
              disabled={isPublishing}
              className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 shadow-lg shadow-emerald-500/25 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isPublishing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Publicando...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Publicar oferta
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}