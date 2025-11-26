import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  BadgeCheck,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Share2,
  Heart,
  ChevronRight,
  Package,
  Wrench,
  Truck,
  CheckCircle2,
  Calendar,
  TrendingUp,
  Users,
  Zap,
  ExternalLink,
  Navigation,
  Globe,
  Mail,
  Shield,
  Award,
  Building2,
  CreditCard,
  MapPinned,
  ThumbsUp,
  Play,
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  CircleDot,
  Quote,
  ChevronDown,
  X,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import {
  proveedores,
  productos,
  servicios,
  resenias,
  getProductosPorProveedor,
  getServiciosPorProveedor,
  getReseniasPorProveedor,
} from "../data/mockData2";
import React from "react";

type TabType = "productos" | "servicios" | "resenias" | "info";

export default function PerfilProveedor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("productos");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const proveedor = proveedores.find((p) => p.id === id) || proveedores[0];
  const productosProveedor = getProductosPorProveedor(proveedor.id);
  const serviciosProveedor = getServiciosPorProveedor(proveedor.id);
  const reseniasProveedor = getReseniasPorProveedor(proveedor.id);

  const getTierConfig = (tier: string) => {
    const configs: Record<string, { label: string; bg: string; text: string; icon: typeof Award }> = {
      platinum: {
        label: "Platinum Partner",
        bg: "bg-gradient-to-r from-slate-700 to-slate-900",
        text: "text-white",
        icon: Award,
      },
      gold: {
        label: "Gold Partner",
        bg: "bg-gradient-to-r from-amber-500 to-yellow-500",
        text: "text-white",
        icon: Award,
      },
      standard: {
        label: "Verificado",
        bg: "bg-gradient-to-r from-teal-500 to-emerald-500",
        text: "text-white",
        icon: Shield,
      },
    };
    return configs[tier] || configs.standard;
  };

  const tierConfig = getTierConfig(proveedor.tier);

  const tabs = [
    { id: "productos" as TabType, label: "Productos", icon: Package, count: productosProveedor.length },
    { id: "servicios" as TabType, label: "Servicios", icon: Wrench, count: serviciosProveedor.length },
    { id: "resenias" as TabType, label: "Reseñas", icon: Star, count: proveedor.numResenias },
    { id: "info" as TabType, label: "Información", icon: Building2 },
  ];

  // Rating distribution (mock)
  const ratingDistribution = [
    { stars: 5, percentage: 72, count: Math.floor(proveedor.numResenias * 0.72) },
    { stars: 4, percentage: 18, count: Math.floor(proveedor.numResenias * 0.18) },
    { stars: 3, percentage: 7, count: Math.floor(proveedor.numResenias * 0.07) },
    { stars: 2, percentage: 2, count: Math.floor(proveedor.numResenias * 0.02) },
    { stars: 1, percentage: 1, count: Math.floor(proveedor.numResenias * 0.01) },
  ];

  return (
    <div className="space-y-6 pb-32">
      {/* ═══════════════════════════════════════════════════════════════════
          HEADER FLOTANTE
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center border transition-all",
              isFavorite
                ? "bg-rose-50 border-rose-200 text-rose-500"
                : "bg-white border-slate-200 text-slate-400 hover:text-slate-600"
            )}
          >
            <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
          </button>
          <button className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO / PORTADA
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative rounded-3xl overflow-hidden">
        {/* Imagen de portada */}
        <div className="h-56 relative">
          <img
            src={proveedor. imagenPortada}
            alt={proveedor.nombre}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badge de tier */}
          <div className="absolute top-4 left-4">
            <div className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold", tierConfig.bg, tierConfig.text)}>
              <tierConfig.icon className="w-4 h-4" />
              {tierConfig.label}
            </div>
          </div>

          {/* Estado online */}
          <div className="absolute top-4 right-4">
            <div className="inline-flex items-center gap-2 px-3 py-1. 5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              {proveedor.ultimaActividad}
            </div>
          </div>

          {/* Info principal sobre imagen */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end gap-4">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-xl">
                  <div className={cn("w-full h-full rounded-xl flex items-center justify-center text-white font-bold text-2xl", tierConfig.bg)}>
                    {proveedor.iniciales}
                  </div>
                </div>
                {proveedor.verificado && (
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <BadgeCheck className="w-5 h-5 text-teal-500" />
                  </div>
                )}
              </div>

              {/* Nombre y datos básicos */}
              <div className="flex-1 min-w-0 text-white pb-1">
                <h1 className="text-2xl font-bold truncate">{proveedor.nombre}</h1>
                <p className="text-white/70 text-sm">{proveedor.especialidad}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-amber-50 px-2. 5 py-1 rounded-lg">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-slate-900">{proveedor.rating}</span>
                </div>
                <span className="text-sm text-slate-500">({proveedor.numResenias} reseñas)</span>
              </div>

              {/* Ubicación */}
              <div className="hidden sm:flex items-center gap-1. 5 text-sm text-slate-500">
                <MapPin className="w-4 h-4" />
                <span>{proveedor.ubicacion}</span>
              </div>

              {/* Años */}
              <div className="hidden md:flex items-center gap-1.5 text-sm text-slate-500">
                <Calendar className="w-4 h-4" />
                <span>{proveedor.añosExperiencia} años</span>
              </div>
            </div>

            {/* Insignias */}
            <div className="hidden lg:flex items-center gap-2">
              {proveedor.insignias.slice(0, 3).map((insignia, i) => (
                <span
                  key={i}
                  className="text-xs font-medium bg-violet-50 text-violet-700 px-2. 5 py-1 rounded-full"
                >
                  {insignia}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS CARDS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">{proveedor.tasaRespuesta}%</div>
              <div className="text-xs text-slate-500">Tasa respuesta</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">{proveedor.tiempoRespuesta}</div>
              <div className="text-xs text-slate-500">Tiempo respuesta</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">{proveedor.tasaCumplimiento}%</div>
              <div className="text-xs text-slate-500">Cumplimiento</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900">{proveedor.clientesRecurrentes}</div>
              <div className="text-xs text-slate-500">Clientes frecuentes</div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          ACCIONES RÁPIDAS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors">
          <MessageCircle className="w-5 h-5" />
          Enviar mensaje
        </button>
        <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
          <Phone className="w-5 h-5" />
          Llamar
        </button>
        {proveedor.sitioWeb && (
          <button className="hidden sm:flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
            <Globe className="w-5 h-5" />
            Web
          </button>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TABS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="bg-white rounded-2xl border border-slate-200 p-1. 5">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all",
                activeTab === tab.id
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    activeTab === tab.id ? "bg-white/20" : "bg-slate-100"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: PRODUCTOS
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "productos" && (
        <div className="space-y-4">
          {productosProveedor.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  <span className="font-medium text-slate-700">{productosProveedor.length}</span> productos disponibles
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {productosProveedor.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => navigate(`/proveedor/${proveedor.id}/producto/${prod.id}`)}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all cursor-pointer"
                  >
                    {/* Imagen */}
                    <div className="h-40 relative overflow-hidden bg-slate-100">
                      <img
                        src={prod.imagenes[0]}
                        alt={prod.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {prod.destacado && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500 text-white text-xs font-medium">
                            <Sparkles className="w-3 h-3" />
                            Destacado
                          </span>
                        </div>
                      )}
                      {prod.precioOriginal && prod.precioOriginal > prod.precio && (
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 rounded-lg bg-rose-500 text-white text-xs font-bold">
                            -{Math.round(((prod.precioOriginal - prod.precio) / prod.precioOriginal) * 100)}%
                          </span>
                        </div>
                      )}
                      {prod.envioGratis && (
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2 py-1 rounded-lg bg-emerald-500 text-white text-xs font-medium">
                            Envío gratis
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Contenido */}
                    <div className="p-4">
                      <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                        {prod.categoria}
                      </span>
                      <h3 className="font-semibold text-slate-800 mt-2 line-clamp-1 group-hover:text-teal-600 transition-colors">
                        {prod. nombre}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">{prod.descripcion}</p>

                      <div className="flex items-end justify-between mt-3 pt-3 border-t border-slate-100">
                        <div>
                          {prod.precioOriginal && prod.precioOriginal > prod.precio && (
                            <div className="text-xs text-slate-400 line-through">
                              ${prod.precioOriginal. toLocaleString()}
                            </div>
                          )}
                          <div className="text-xl font-bold text-slate-900">
                            ${prod.precio. toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500">por {prod.unidad}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-emerald-600 font-medium">{prod.stock} disponibles</div>
                          <div className="text-xs text-slate-400">{prod.vendidos}+ vendidos</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Sin productos publicados</h3>
              <p className="text-sm text-slate-500">Este proveedor aún no ha publicado productos</p>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: SERVICIOS
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "servicios" && (
        <div className="space-y-4">
          {serviciosProveedor.length > 0 ?  (
            <>
              <p className="text-sm text-slate-500">
                <span className="font-medium text-slate-700">{serviciosProveedor.length}</span> servicios disponibles
              </p>

              {serviciosProveedor.map((serv) => (
                <div
                  key={serv. id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="flex">
                    {/* Imagen lateral */}
                    {serv.imagenes && serv.imagenes[0] && (
                      <div className="w-48 shrink-0 relative overflow-hidden hidden sm:block">
                        <img
                          src={serv. imagenes[0]}
                          alt={serv.nombre}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30" />
                      </div>
                    )}

                    {/* Contenido */}
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                              <Wrench className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900">{serv.nombre}</h3>
                              <span className="text-xs text-slate-500">{serv.categoria}</span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 mb-4">{serv.descripcion}</p>

                          {/* Incluye */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {serv. incluye.slice(0, 4).map((item, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1. 5 text-xs bg-slate-100 text-slate-600 px-2. 5 py-1. 5 rounded-lg"
                              >
                                <CheckCircle2 className="w-3. 5 h-3.5 text-teal-500" />
                                {item}
                              </span>
                            ))}
                            {serv.incluye.length > 4 && (
                              <span className="text-xs text-slate-400 px-2 py-1. 5">
                                +{serv.incluye.length - 4} más
                              </span>
                            )}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {serv.tiempoEstimado}
                              </span>
                              {serv.garantia && (
                                <span className="flex items-center gap-1">
                                  <Shield className="w-4 h-4 text-emerald-500" />
                                  Garantía
                                </span>
                              )}
                            </div>
                            <div
                              className={cn(
                                "px-2. 5 py-1 rounded-full text-xs font-medium",
                                serv.disponibilidad === "inmediata"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-slate-100 text-slate-600"
                              )}
                            >
                              <CircleDot className="w-3 h-3 inline mr-1" />
                              {serv.disponibilidad === "inmediata"
                                ? "Disponible ahora"
                                : serv.disponibilidad}
                            </div>
                          </div>
                        </div>

                        {/* Precio */}
                        <div className="text-right ml-6 shrink-0">
                          <div className="text-sm text-slate-500">Desde</div>
                          <div className="text-2xl font-bold text-slate-900">
                            ${serv.precioBase.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-500">{serv.unidadPrecio}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-700 mb-2">Sin servicios publicados</h3>
              <p className="text-sm text-slate-500">Este proveedor aún no ha publicado servicios</p>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: RESEÑAS
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "resenias" && (
        <div className="space-y-4">
          {/* Resumen de calificaciones */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-start gap-8">
              {/* Score grande */}
              <div className="text-center shrink-0">
                <div className="text-5xl font-bold text-slate-900">{proveedor.rating}</div>
                <div className="flex items-center justify-center gap-1 my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "w-5 h-5",
                        star <= Math.round(proveedor.rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-200"
                      )}
                    />
                  ))}
                </div>
                <div className="text-sm text-slate-500">{proveedor.numResenias} reseñas</div>
              </div>

              {/* Distribución */}
              <div className="flex-1 space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-sm text-slate-600 w-4">{item.stars}</span>
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-400 w-8">{item.count}</span>
                  </div>
                ))}
              </div>

              {/* Indicadores */}
              <div className="hidden lg:block space-y-3 shrink-0">
                <div className="flex items-center gap-2 text-sm">
                  <ThumbsUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-slate-600">98% lo recomiendan</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span className="text-slate-600">{Math.floor(proveedor.numResenias * 0.85)} verificadas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de reseñas */}
          <div className="space-y-4">
            {reseniasProveedor.length > 0 ? (
              reseniasProveedor.map((resenia) => (
                <div key={resenia.id} className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <img
                      src={resenia. usuarioAvatar}
                      alt={resenia.usuarioNombre}
                      className="w-12 h-12 rounded-xl object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-800">{resenia.usuarioNombre}</span>
                            {resenia.verificada && (
                              <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3" />
                                Verificada
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={cn(
                                    "w-4 h-4",
                                    star <= resenia.rating
                                      ?  "text-amber-400 fill-amber-400"
                                      : "text-slate-200"
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-slate-400">• {resenia.fecha}</span>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-lg shrink-0">
                          {resenia.proyectoTipo}
                        </span>
                      </div>

                      {/* Comentario */}
                      <p className="text-slate-600 leading-relaxed">{resenia. comentario}</p>

                      {/* Imágenes */}
                      {resenia.imagenes && resenia.imagenes.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {resenia. imagenes.map((img, i) => (
                            <button
                              key={i}
                              onClick={() => setLightboxImage(img)}
                              className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100"
                            >
                              <img
                                src={img}
                                alt=""
                                className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                              />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Respuesta del proveedor */}
                      {resenia.respuestaProveedor && (
                        <div className="mt-4 p-4 bg-slate-50 rounded-xl border-l-4 border-teal-500">
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                            <Quote className="w-4 h-4 text-teal-500" />
                            Respuesta de {proveedor.nombre}
                          </div>
                          <p className="text-sm text-slate-600">{resenia.respuestaProveedor}</p>
                        </div>
                      )}

                      {/* Útil */}
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                        <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
                          <ThumbsUp className="w-4 h-4" />
                          Útil ({resenia.util})
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-700 mb-2">Sin reseñas aún</h3>
                <p className="text-sm text-slate-500">Sé el primero en dejar una reseña</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: INFORMACIÓN
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "info" && (
        <div className="space-y-4">
          {/* Descripción */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-slate-400" />
              Sobre nosotros
            </h3>
            <p className="text-slate-600 leading-relaxed">{proveedor.descripcion}</p>

            <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Experiencia</div>
                  <div className="font-semibold text-slate-800">{proveedor.añosExperiencia} años</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Equipo</div>
                  <div className="font-semibold text-slate-800">{proveedor. empleados} empleados</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Entregas realizadas</div>
                  <div className="font-semibold text-slate-800">{proveedor.entregas. toLocaleString()}+</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <div className="text-sm text-slate-500">Entrega promedio</div>
                  <div className="font-semibold text-slate-800">{proveedor.tiempoEntregaPromedio}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Certificaciones */}
          {proveedor.certificaciones. length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-slate-400" />
                Certificaciones
              </h3>
              <div className="flex flex-wrap gap-3">
                {proveedor. certificaciones.slice(0, showAllCerts ? undefined : 4).map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2. 5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100"
                  >
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <span className="font-medium text-emerald-800">{cert}</span>
                  </div>
                ))}
              </div>
              {proveedor.certificaciones.length > 4 && (
                <button
                  onClick={() => setShowAllCerts(!showAllCerts)}
                  className="mt-4 text-sm text-teal-600 font-medium flex items-center gap-1"
                >
                  {showAllCerts ? "Ver menos" : `Ver todas (${proveedor.certificaciones. length})`}
                  <ChevronDown className={cn("w-4 h-4 transition-transform", showAllCerts && "rotate-180")} />
                </button>
              )}
            </div>
          )}

          {/* Horario y Ubicación */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-400" />
                Horario de atención
              </h3>
              <p className="text-slate-600">{proveedor.horario}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MapPinned className="w-5 h-5 text-slate-400" />
                Zonas de cobertura
              </h3>
              <div className="flex flex-wrap gap-2">
                {proveedor.zonasCobertura.map((zona, i) => (
                  <span key={i} className="text-sm bg-slate-100 text-slate-600 px-3 py-1. 5 rounded-lg">
                    {zona}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-slate-400" />
              Información de contacto
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${proveedor.telefono}`}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700">{proveedor.telefono}</span>
                </div>
                <span className="text-sm font-medium text-teal-600">Llamar</span>
              </a>
              <a
                href={`https://wa.me/${proveedor.whatsapp. replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700">{proveedor.whatsapp}</span>
                </div>
                <span className="text-sm font-medium text-teal-600">WhatsApp</span>
              </a>
              <a
                href={`mailto:${proveedor.email}`}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700">{proveedor.email}</span>
                </div>
                <span className="text-sm font-medium text-teal-600">Email</span>
              </a>
              {proveedor.sitioWeb && (
                <a
                  href={proveedor. sitioWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-slate-500" />
                    <span className="text-slate-700">{proveedor.sitioWeb. replace("https://", "")}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </a>
              )}
            </div>
          </div>

          {/* Métodos de pago */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-slate-400" />
              Métodos de pago aceptados
            </h3>
            <div className="flex flex-wrap gap-2">
              {proveedor.metodosPago.map((metodo, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 text-sm bg-slate-100 text-slate-600 px-3 py-2 rounded-lg"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  {metodo}
                </span>
              ))}
            </div>
          </div>

          {/* Galería */}
          {proveedor.galeria && proveedor.galeria.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-slate-400" />
                Galería
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {proveedor. galeria.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxImage(img)}
                    className="aspect-square rounded-xl overflow-hidden bg-slate-100 hover:opacity-90 transition-opacity"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER FIJO
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-20 left-0 right-0 px-4 z-40">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl border border-slate-200 p-4 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="hidden sm:block flex-1">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold", tierConfig.bg)}>
                    {proveedor.iniciales}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{proveedor.nombre}</div>
                    <div className="text-sm text-slate-500 flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      {proveedor.rating} • {proveedor.entregas} entregas
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate(-1)}
                className="flex-1 sm:flex-none sm:px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-5 h-5" />
                Agregar a mi proyecto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          LIGHTBOX
      ═══════════════════════════════════════════════════════════════════ */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImage}
            alt=""
            className="max-w-full max-h-full rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}