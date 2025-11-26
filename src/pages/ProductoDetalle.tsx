import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  BadgeCheck,
  MapPin,
  Clock,
  MessageCircle,
  Share2,
  Heart,
  ChevronRight,
  ChevronLeft,
  Truck,
  Shield,
  CheckCircle2,
  Plus,
  Minus,
  Sparkles,
  Zap,
  X,
  Eye,
  TrendingUp,
  Award,
  FileText,
  HelpCircle,
  Copy,
  Bookmark,
  Send,
  ArrowUpRight,
  Flame,
  Package,
  Timer,
  ThumbsUp,
  Verified,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import {
  productos,
  proveedores,
  getProductoById,
  getProveedorById,
} from "../data/mockData2";
import React from "react";

export default function ProductoDetalle() {
  const { id, prodId } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [cantidad, setCantidad] = useState(10);
  const [currentImage, setCurrentImage] = useState(0);
  const [showPregunta, setShowPregunta] = useState(false);
  const [pregunta, setPregunta] = useState("");
  const [activeSection, setActiveSection] = useState<"specs" | "faq">("specs");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const [variantes, setVariantes] = useState<Record<string, string>>({});
  const [personalizacion, setPersonalizacion] = useState<Record<string, any>>({});

  const producto = getProductoById(prodId || "") || productos[0];
  const proveedor = getProveedorById(producto.proveedorId) || proveedores[0];

  const calcularPrecioUnitario = () => {
    let precioBase = producto.precio;

    producto.variantes.forEach((variante) => {
      const opcionSeleccionada = variante.opciones.find(
        (op) => op.id === variantes[variante.id]
      );
      if (opcionSeleccionada?. precio) {
        precioBase += opcionSeleccionada.precio;
      }
    });

    producto.personalizacion.forEach((opcion) => {
      if (opcion.tipo === "select" && opcion.opciones) {
        const seleccionada = opcion.opciones.find(
          (op) => op.id === personalizacion[opcion.id]
        );
        if (seleccionada?.precio) {
          precioBase += seleccionada.precio;
        }
      } else if (opcion.tipo === "toggle" && personalizacion[opcion.id] && opcion.precioExtra) {
        precioBase += opcion.precioExtra;
      }
    });

    return precioBase;
  };

  const precioUnitario = calcularPrecioUnitario();
  const precioTotal = precioUnitario * cantidad;
  const descuento = producto.precioOriginal
    ? Math.round(((producto.precioOriginal - producto. precio) / producto.precioOriginal) * 100)
    : null;

  const getTierStyles = (tier: string) => {
    const styles: Record<string, { bg: string; text: string; accent: string }> = {
      platinum: { bg: "from-slate-800 via-slate-700 to-slate-900", text: "text-white", accent: "slate" },
      gold: { bg: "from-amber-500 via-yellow-400 to-amber-600", text: "text-amber-900", accent: "amber" },
      standard: { bg: "from-emerald-500 via-teal-400 to-emerald-600", text: "text-white", accent: "teal" },
    };
    return styles[tier] || styles.standard;
  };

  const tierStyles = getTierStyles(proveedor.tier);

  const faqItems = [
    {
      pregunta: "¿El producto está disponible para entrega inmediata?",
      respuesta: "Sí, contamos con stock disponible.  El tiempo de preparación es de " + producto.tiempoPreparacion + " y la entrega depende de tu ubicación."
    },
    {
      pregunta: "¿Ofrecen garantía de calidad? ",
      respuesta: "Absolutamente. Todos nuestros productos pasan por control de calidad.  Si el producto no cumple con las especificaciones, ofrecemos reembolso o reposición."
    },
    {
      pregunta: "¿Pueden hacer entregas parciales?",
      respuesta: "Sí, podemos coordinar entregas parciales según tus necesidades. Contáctanos para acordar los detalles."
    },
    {
      pregunta: "¿Hay descuento por volumen?",
      respuesta: "Ofrecemos precios especiales para pedidos grandes. Envíanos un mensaje con la cantidad que necesitas para cotizar."
    },
  ];

  return (
    <div className="min-h-screen pb-48">
      {/* ═══════════════════════════════════════════════════════════════════
          BACKGROUND GRADIENT
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 flex items-center justify-center hover:bg-white transition-all shadow-lg shadow-slate-900/5"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all shadow-lg",
              isFavorite
                ? "bg-gradient-to-br from-rose-500 to-pink-600 border-rose-400 text-white shadow-rose-500/25"
                : "bg-white/80 backdrop-blur-xl border-white/50 text-slate-400 hover:text-rose-500"
            )}
          >
            <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
          </button>
          <button className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all shadow-lg shadow-slate-900/5">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* ═══════════════════════════════════════════════════════════════════
            COLUMNA IZQUIERDA - GALERÍA (7 cols)
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-7 space-y-6">
          {/* Imagen principal */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-purple-600 to-amber-600 rounded-[2rem] opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
            
            <div className="relative rounded-[1.75rem] overflow-hidden bg-white aspect-[4/3] shadow-2xl shadow-slate-900/20">
              <img
                src={producto.imagenes[currentImage] || producto.imagenes[0]}
                alt={producto.nombre}
                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-700 group-hover:scale-105"
                onClick={() => setLightboxOpen(true)}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Premium badges */}
              <div className="absolute top-5 left-5 flex flex-col gap-3">
                {producto.destacado && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-lg opacity-60" />
                    <span className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold shadow-xl">
                      <Flame className="w-4 h-4" />
                      TOP SELLER
                    </span>
                  </div>
                )}
                {descuento && (
                  <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-black shadow-xl shadow-rose-500/30">
                    -{descuento}% OFF
                  </span>
                )}
              </div>

              {/* Envío gratis badge premium */}
              {producto.envioGratis && (
                <div className="absolute top-5 right-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500 rounded-2xl blur-lg opacity-40" />
                    <div className="relative px-4 py-2 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-xl">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Free Shipping</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navegación */}
              {producto.imagenes.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((prev) => Math.max(0, prev - 1))}
                    className={cn(
                      "absolute left-5 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-2xl transition-all opacity-0 group-hover:opacity-100",
                      currentImage === 0 ? "cursor-not-allowed text-slate-300" : "hover:bg-white hover:scale-110 text-slate-700"
                    )}
                    disabled={currentImage === 0}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setCurrentImage((prev) => Math.min(producto.imagenes.length - 1, prev + 1))}
                    className={cn(
                      "absolute right-5 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-xl flex items-center justify-center shadow-2xl transition-all opacity-0 group-hover:opacity-100",
                      currentImage === producto.imagenes.length - 1 ? "cursor-not-allowed text-slate-300" : "hover:bg-white hover:scale-110 text-slate-700"
                    )}
                    disabled={currentImage === producto.imagenes.length - 1}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Contador elegante */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl">
                  {producto.imagenes.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={cn(
                        "transition-all rounded-full",
                        i === currentImage
                          ? "w-8 h-2 bg-white"
                          : "w-2 h-2 bg-white/40 hover:bg-white/60"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails premium */}
          {producto.imagenes.length > 1 && (
            <div className="flex gap-4 justify-center">
              {producto.imagenes. map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={cn(
                    "relative w-20 h-20 rounded-2xl overflow-hidden transition-all",
                    i === currentImage
                      ? "ring-2 ring-violet-500 ring-offset-4 ring-offset-slate-50 scale-110 shadow-xl shadow-violet-500/20"
                      : "opacity-50 hover:opacity-100 hover:scale-105"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Stats card premium */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-amber-500/10 rounded-3xl blur-xl" />
            <div className="relative flex items-center justify-around py-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-slate-800">
                  <Eye className="w-5 h-5 text-violet-500" />
                  <span className="text-2xl font-bold">{producto. vistas. toLocaleString()}</span>
                </div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Vistas</span>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-slate-800">
                  <Package className="w-5 h-5 text-emerald-500" />
                  <span className="text-2xl font-bold">{producto.vendidos}+</span>
                </div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Vendidos</span>
              </div>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-slate-800">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span className="text-2xl font-bold">{producto.favoritos}</span>
                </div>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Favoritos</span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            COLUMNA DERECHA - INFO (5 cols)
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-5 space-y-6">
          {/* Categoría y SKU */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-4 py-1. 5 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 text-sm font-semibold">
                {producto. categoria}
              </span>
              {producto.subcategoria && (
                <span className="text-slate-400">/ {producto.subcategoria}</span>
              )}
            </div>
            <button
              className="flex items-center gap-1. 5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
              onClick={() => navigator.clipboard.writeText(producto. sku)}
            >
              <Copy className="w-3. 5 h-3.5" />
              {producto.sku}
            </button>
          </div>

          {/* Título premium */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-3">
              {producto.nombre}
            </h1>
            {producto.marca && (
              <div className="flex items-center gap-3">
                <span className="text-slate-500">por</span>
                <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">
                  {producto.marca}
                </span>
                {producto.modelo && (
                  <span className="text-slate-400">Modelo: {producto.modelo}</span>
                )}
              </div>
            )}
          </div>

          {/* Precio premium card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-amber-500 rounded-3xl opacity-10 blur-xl" />
            <div className="relative p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl text-white overflow-hidden">
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>

              <div className="relative">
                {producto.precioOriginal && producto.precioOriginal > producto.precio && (
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl text-white/50 line-through">
                      ${producto.precioOriginal.toLocaleString()}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-black">
                      AHORRA ${(producto.precioOriginal - producto.precio).toLocaleString()}
                    </span>
                  </div>
                )}
                
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black">
                    ${producto.precio. toLocaleString()}
                  </span>
                  <span className="text-white/60 text-lg">/ {producto.unidad}</span>
                </div>

                {/* Stock indicator premium */}
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "w-3 h-3 rounded-full animate-pulse",
                      producto. stock > 50 ? "bg-emerald-400" : producto.stock > 10 ? "bg-amber-400" : "bg-rose-400"
                    )} />
                    <span className="font-medium">
                      {producto.stock > 50
                        ? `${producto.stock} en stock`
                        : producto.stock > 10
                        ? `Solo ${producto.stock} disponibles`
                        : `¡Últimas ${producto.stock}!`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <Timer className="w-4 h-4" />
                    <span className="text-sm">{producto.tiempoPreparacion}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Proveedor card premium */}
          <div
            onClick={() => navigate(`/proveedor/${proveedor.id}`)}
            className="group relative cursor-pointer"
          >
            <div className={cn("absolute -inset-1 bg-gradient-to-r rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity", tierStyles. bg)} />
            <div className="relative flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-200 shadow-lg group-hover:shadow-xl group-hover:border-slate-300 transition-all">
              <div className="relative">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold bg-gradient-to-br shadow-lg", tierStyles.bg, tierStyles.text)}>
                  {proveedor.iniciales}
                </div>
                {proveedor.verificado && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Verified className="w-4 h-4 text-teal-500" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-800 group-hover:text-violet-600 transition-colors">
                    {proveedor.nombre}
                  </span>
                  <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r", tierStyles.bg, tierStyles.text)}>
                    {proveedor.tier. toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-slate-700">{proveedor.rating}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    {proveedor.tasaRespuesta}%
                  </span>
                  <span>•</span>
                  <span>{proveedor.ubicacion}</span>
                </div>
              </div>
              
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-violet-100 group-hover:text-violet-600 transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Variantes premium */}
          {producto.variantes.length > 0 && (
            <div className="p-6 bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-xl">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-500" />
                Elige tu variante
              </h3>
              
              <div className="space-y-5">
                {producto.variantes.map((variante) => (
                  <div key={variante.id}>
                    <label className="text-sm font-semibold text-slate-600 mb-3 block uppercase tracking-wider">
                      {variante.nombre}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {variante.opciones. map((opcion) => (
                        <button
                          key={opcion. id}
                          onClick={() => setVariantes((prev) => ({ ...prev, [variante.id]: opcion. id }))}
                          disabled={opcion.disponible === false}
                          className={cn(
                            "relative px-5 py-3 rounded-2xl text-sm font-semibold transition-all",
                            variantes[variante.id] === opcion.id
                              ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30 scale-105"
                              : opcion.disponible === false
                              ? "bg-slate-100 text-slate-300 cursor-not-allowed line-through"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105"
                          )}
                        >
                          {opcion. label}
                          {opcion.precio !== undefined && opcion.precio !== 0 && (
                            <span className={cn(
                              "ml-2 text-xs",
                              variantes[variante.id] === opcion.id ?  "text-white/80" : "text-slate-400"
                            )}>
                              {opcion.precio > 0 ? `+$${opcion.precio}` : `-$${Math.abs(opcion.precio)}`}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}



    
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SECCIONES ADICIONALES - DISEÑO PREMIUM
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="mt-12 space-y-8">
        {/* Tabs premium */}
        <div className="flex justify-center">
          <div className="inline-flex p-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50">
            {[
              { id: "specs" as const, label: "Especificaciones", icon: FileText },
              { id: "faq" as const, label: "Preguntas Frecuentes", icon: HelpCircle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-sm transition-all",
                  activeSection === tab.id
                    ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <tab. icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Especificaciones Premium */}
        {activeSection === "specs" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Descripción */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl opacity-10 blur-xl group-hover:opacity-20 transition-opacity" />
              <div className="relative p-8 bg-white rounded-3xl border border-slate-200 shadow-xl h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Descripción del Producto</h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {producto.descripcionLarga || producto.descripcion}
                </p>

                {producto.etiquetas && producto.etiquetas.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
                    {producto.etiquetas.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Especificaciones técnicas */}
            {producto.especificaciones && producto.especificaciones.length > 0 && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl opacity-10 blur-xl group-hover:opacity-20 transition-opacity" />
                <div className="relative p-8 bg-white rounded-3xl border border-slate-200 shadow-xl h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Especificaciones Técnicas</h3>
                  </div>
                  
                  <div className="space-y-0">
                    {producto.especificaciones.map((spec, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex items-center justify-between py-4",
                          i !== producto.especificaciones.length - 1 && "border-b border-slate-100"
                        )}
                      >
                        <span className="text-slate-500 font-medium">{spec.label}</span>
                        <span className="text-slate-800 font-bold bg-slate-100 px-4 py-1. 5 rounded-lg">
                          {spec.valor}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* FAQ Premium */}
        {activeSection === "faq" && (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[2rem] opacity-10 blur-2xl" />
              
              <div className="relative p-8 bg-white rounded-3xl border border-slate-200 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <HelpCircle className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">Preguntas Frecuentes</h3>
                      <p className="text-slate-500">Resolvemos tus dudas</p>
                    </div>
                  </div>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {faqItems.map((item, i) => (
                    <div
                      key={i}
                      className={cn(
                        "rounded-2xl border transition-all overflow-hidden",
                        expandedFaq === i
                          ? "border-emerald-300 bg-gradient-to-r from-emerald-50 to-teal-50"
                          : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
                      )}
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <span className={cn(
                          "font-semibold text-lg transition-colors",
                          expandedFaq === i ? "text-emerald-700" : "text-slate-700"
                        )}>
                          {item.pregunta}
                        </span>
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                          expandedFaq === i
                            ?  "bg-emerald-500 text-white rotate-180"
                            : "bg-slate-200 text-slate-500"
                        )}>
                          <ChevronLeft className="w-5 h-5 -rotate-90" />
                        </div>
                      </button>
                      
                      {expandedFaq === i && (
                        <div className="px-5 pb-5">
                          <div className="p-4 bg-white rounded-xl border border-emerald-200">
                            <p className="text-slate-600 leading-relaxed">{item.respuesta}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Hacer pregunta */}
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <MessageCircle className="w-6 h-6 text-emerald-500" />
                    <span className="font-semibold text-slate-700">¿Tienes otra pregunta?</span>
                  </div>
                  
                  {showPregunta ?  (
                    <div className="space-y-4">
                      <textarea
                        value={pregunta}
                        onChange={(e) => setPregunta(e.target.value)}
                        placeholder="Escribe tu pregunta al proveedor..."
                        className="w-full h-32 p-4 rounded-2xl bg-slate-50 text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/30 border border-slate-200 focus:border-emerald-300 transition-all"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => setShowPregunta(false)}
                          className="flex-1 py-4 rounded-2xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                          Cancelar
                        </button>
                        <button className="flex-1 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2">
                          <Send className="w-5 h-5" />
                          Enviar pregunta
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowPregunta(true)}
                      className="w-full py-4 rounded-2xl font-semibold text-emerald-600 border-2 border-dashed border-emerald-300 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Hacer una pregunta
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER FIJO - PREMIUM
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl border-t border-slate-200" />
        <div className="relative max-w-6xl mx-auto p-4 pb-20">
          <div className="flex items-center gap-8">
            {/* Resumen de precio premium */}
            <div className="flex-1">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-slate-900">
                  ${precioTotal. toLocaleString()}
                </span>
                <span className="text-slate-400 font-medium">total</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span>{cantidad} {producto.unidad}s</span>
                <span>×</span>
                <span>${precioUnitario.toLocaleString()}</span>
                <span className="text-slate-300">c/u</span>
              </div>
            </div>

            {/* Botones premium */}
            <div className="flex gap-3">
              <button className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-all">
                <Bookmark className="w-6 h-6" />
              </button>
              <button className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl opacity-70 blur-lg group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 transition-all">
                  <Zap className="w-6 h-6" />
                  Agregar a proyecto
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          LIGHTBOX PREMIUM
      ═══════════════════════════════════════════════════════════════════ */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <X className="w-7 h-7" />
          </button>

          <button
            onClick={(e) => {
              e. stopPropagation();
              setCurrentImage((prev) => Math.max(0, prev - 1));
            }}
            className="absolute left-6 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <img
            src={producto.imagenes[currentImage]}
            alt=""
            className="max-w-[90vw] max-h-[80vh] rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImage((prev) => Math.min(producto.imagenes.length - 1, prev + 1));
            }}
            className="absolute right-6 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Thumbnails en lightbox */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 p-3 bg-black/50 backdrop-blur-xl rounded-2xl">
            {producto.imagenes.map((img, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage(i);
                }}
                className={cn(
                  "w-20 h-20 rounded-xl overflow-hidden transition-all",
                  i === currentImage ?  "ring-2 ring-white scale-110" : "opacity-50 hover:opacity-80"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}