import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Truck,
  Package,
  MessageSquare,
  Heart,
  Share2,
  Sparkles,
  TrendingUp,
  Users,
  ShieldCheck,
  Award,
  Calendar,
  ChevronRight,
  Thermometer,
  Zap,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { cn } from "../components/ui/utils";    
import { empresas, productos, ofertas } from "../data/mockData";
import React from "react";

type TabType = "general" | "catalogo" | "ofertas" | "metricas" | "resenias" | "ubicacion";

export default function PerfilEmpresa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [isFavorite, setIsFavorite] = useState(false);

  const empresa = empresas.find((e) => e.id === id) || empresas[0];
  const productosEmpresa = productos.filter((p) => p. empresaId === empresa.id);
  const ofertasEmpresa = ofertas. filter((o) => o.empresaId === empresa.id);

  const resenias = [
    { id: 1, autor: "Constructora del Bajío", avatar: "CB", rating: 5, fecha: "Hace 2 semanas", comentario: "Excelente proveedor.  Entregas siempre a tiempo y material de primera calidad.", verificada: true },
    { id: 2, autor: "Ferretería Industrial MX", avatar: "FI", rating: 4, fecha: "Hace 1 mes", comentario: "Buenos precios y atención al cliente.  Solo una vez tuvimos un retraso menor.", verificada: true },
    { id: 3, autor: "Distribuidora Norte", avatar: "DN", rating: 5, fecha: "Hace 2 meses", comentario: "Muy recomendados. El proceso de compra es muy sencillo.", verificada: false },
  ];

  const tabs = [
    { id: "general" as TabType, label: "General" },
    { id: "catalogo" as TabType, label: "Catálogo", count: productosEmpresa.length },
    { id: "ofertas" as TabType, label: "Ofertas", count: ofertasEmpresa.length },
    { id: "metricas" as TabType, label: "Métricas" },
    { id: "resenias" as TabType, label: "Reseñas", count: empresa.numResenias },
    { id: "ubicacion" as TabType, label: "Ubicación" },
  ];

  const handleHacerPedido = () => navigate("/orden");
  const handleSolicitarCotizacion = () => navigate("/orden");

  return (
    <div className="space-y-6 pb-8">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Volver</span>
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className={cn(
          "h-32 relative",
          empresa.esTransportista
            ? "bg-gradient-to-r from-violet-600 via-purple-500 to-violet-600"
            : "bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-600"
        )}>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-4 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl" />
            <div className="absolute bottom-4 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </div>
        </div>

        <div className="px-6 pb-6">
          <div className="relative -mt-12 mb-4">
            <div className={cn(
              "w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-xl border-4 border-white",
              empresa.esTransportista
                ?  "bg-gradient-to-br from-violet-500 to-purple-600 text-white"
                : "bg-gradient-to-br from-teal-500 to-cyan-500 text-white"
            )}>
              {empresa.iniciales}
            </div>
            {empresa.verificado && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                <BadgeCheck className="w-6 h-6 text-teal-500" />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-slate-800">{empresa.nombre}</h1>
                {empresa.destacado && (
                  <span className="text-xs bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 px-3 py-1 rounded-full font-semibold border border-amber-200">
                    🏆 Top Seller 2024
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-2 text-sm">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="font-bold text-slate-800">{empresa.rating}</span>
                <span className="text-slate-500">({empresa.numResenias} reseñas)</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{empresa.transacciones} transacciones</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
                <MapPin className="w-4 h-4" />
                <span>{empresa.ubicacion}</span>
              </div>
            </div>

            <div className={cn(
              "flex flex-col items-center p-4 rounded-2xl border",
              empresa.esTransportista
                ? "bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100"
                : "bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-100"
            )}>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className={cn("w-5 h-5", empresa.esTransportista ? "text-violet-600" : "text-teal-600")} />
                <span className={cn("text-2xl font-bold", empresa.esTransportista ? "text-violet-700" : "text-teal-700")}>
                  {empresa.matchScore}%
                </span>
              </div>
              <span className="text-xs text-slate-500">Match con tu perfil</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button className={cn(
              "flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5",
              empresa.esTransportista
                ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:shadow-violet-500/25"
                : "bg-gradient-to-r from-teal-600 to-cyan-600 hover:shadow-teal-500/25"
            )}>
              <MessageSquare className="w-5 h-5" />
              Contactar
            </button>

            <button
              onClick={empresa.esTransportista ? handleSolicitarCotizacion : handleHacerPedido}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
            >
              <Package className="w-5 h-5" />
              {empresa.esTransportista ? "Solicitar cotización" : "Hacer pedido"}
            </button>

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center border transition-all",
                isFavorite ? "bg-red-50 border-red-200 text-red-500" : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
              )}
            >
              <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
            </button>

            <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:border-slate-300 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-2 -mx-4 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2. 5 rounded-xl font-medium text-sm whitespace-nowrap transition-all",
              activeTab === tab.id
                ? empresa.esTransportista ?  "bg-violet-100 text-violet-700" : "bg-teal-100 text-teal-700"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                activeTab === tab.id
                  ? empresa.esTransportista ? "bg-violet-200" : "bg-teal-200"
                  : "bg-slate-200"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          TAB: GENERAL
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-3">Sobre la empresa</h2>
            <p className="text-slate-600 leading-relaxed">{empresa.descripcion}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {empresa.categorias.map((cat, i) => (
                <span key={i} className="text-sm bg-slate-100 text-slate-600 px-3 py-1. 5 rounded-lg">{cat}</span>
              ))}
            </div>
          </div>

          {empresa.certificaciones. length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                Certificaciones
              </h2>
              <div className="flex flex-wrap gap-3">
                {empresa.certificaciones.map((cert, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 px-4 py-2. 5 rounded-xl">
                    <Award className="w-5 h-5 text-teal-600" />
                    <span className="font-medium text-teal-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {empresa.esTransportista && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-violet-600" />
                Capacidades de transporte
              </h2>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
                  <div className="text-3xl font-bold text-violet-700">{empresa.flota}</div>
                  <div className="text-sm text-violet-600">Unidades en flota</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-4 border border-cyan-100">
                  <div className="text-3xl font-bold text-cyan-700">32</div>
                  <div className="text-sm text-cyan-600">Estados cobertura</div>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-4 border border-teal-100">
                  <div className="text-3xl font-bold text-teal-700">&lt;4h</div>
                  <div className="text-sm text-teal-600">Tiempo respuesta</div>
                </div>
              </div>
              <h3 className="font-semibold text-slate-700 mb-3">Tipos de transporte</h3>
              <div className="flex flex-wrap gap-2">
                {empresa.tipoTransporte?. map((tipo, i) => (
                  <span key={i} className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium",
                    tipo. toLowerCase(). includes("refrigerado") ? "bg-cyan-100 text-cyan-700" :
                    tipo.toLowerCase().includes("express") ? "bg-violet-100 text-violet-700" :
                    "bg-slate-100 text-slate-700"
                  )}>
                    {tipo. toLowerCase().includes("refrigerado") && <Thermometer className="w-4 h-4" />}
                    {tipo.toLowerCase(). includes("express") && <Zap className="w-4 h-4" />}
                    {tipo}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* IA Match */}
          <div className={cn(
            "rounded-2xl p-6 border",
            empresa.esTransportista
              ? "bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100"
              : "bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-100"
          )}>
            <div className="flex items-start gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                empresa. esTransportista ?  "bg-violet-100 text-violet-600" : "bg-teal-100 text-teal-600"
              )}>
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className={cn("font-bold mb-2", empresa.esTransportista ?  "text-violet-800" : "text-teal-800")}>
                  Análisis de compatibilidad IA
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span className="text-slate-700">Vende productos que compras frecuentemente</span></div>
                  <div className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span className="text-slate-700">5 empresas de tu red ya son clientes</span></div>
                  <div className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /><span className="text-slate-700">Ubicación compatible con tus rutas</span></div>
                  <div className="flex items-center gap-2 text-sm"><AlertCircle className="w-4 h-4 text-amber-500" /><span className="text-slate-700">Precio +8% vs promedio de tu red</span></div>
                </div>
                <button
                  onClick={empresa.esTransportista ? handleSolicitarCotizacion : handleHacerPedido}
                  className={cn(
                    "mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm text-white transition-all",
                    empresa.esTransportista ?  "bg-violet-600 hover:bg-violet-700" : "bg-teal-600 hover:bg-teal-700"
                  )}
                >
                  {empresa.esTransportista ? "Solicitar cotización" : "Comenzar pedido"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: CATÁLOGO
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === "catalogo" && (
        <div className="space-y-4">
          {productosEmpresa.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {productosEmpresa.map((producto) => (
                <div key={producto.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-teal-200 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-slate-800">{producto.nombre}</h3>
                      <span className="text-sm text-slate-500">{producto.categoria}</span>
                    </div>
                    {producto.precioDescuento && (
                      <span className="text-xs bg-gradient-to-r from-violet-600 to-purple-600 text-white px-2. 5 py-1 rounded-full font-bold">Oferta</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{producto.descripcion}</p>
                  <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <div className="flex items-baseline gap-2">
                      {producto.precioDescuento ?  (
                        <>
                          <span className="text-2xl font-bold text-slate-800">${producto.precioDescuento. toLocaleString()}</span>
                          <span className="text-sm text-slate-400 line-through">${producto.precio.toLocaleString()}</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-slate-800">${producto.precio.toLocaleString()}</span>
                      )}
                      <span className="text-sm text-slate-500">/{producto.unidad}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Mínimo: {producto.minCompra} {producto.unidad}s</span>
                    <button onClick={() => navigate("/orden")} className="text-sm font-medium text-teal-600 hover:text-teal-700">Agregar →</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-700 mb-2">Sin productos en catálogo</h3>
              <p className="text-sm text-slate-500">Esta empresa aún no ha publicado productos. </p>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: OFERTAS
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === "ofertas" && (
        <div className="space-y-4">
          {ofertasEmpresa.length > 0 ? (
            ofertasEmpresa.map((oferta) => (
              <div key={oferta.id} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-violet-200 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-slate-800">{oferta.productoNombre}</h3>
                        <p className="text-sm text-slate-500">{oferta.descripcion}</p>
                      </div>
                      <span className="text-lg font-bold text-white bg-gradient-to-r from-violet-600 to-purple-600 px-3 py-1 rounded-full">-{oferta.descuento}%</span>
                    </div>
                    <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 my-4 border border-violet-100">
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-bold text-violet-700">${oferta.precioOferta.toLocaleString()}</span>
                        <span className="text-lg text-slate-400 line-through">${oferta.precioOriginal.toLocaleString()}</span>
                        <span className="text-sm text-slate-500">/{oferta.unidad}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>Min: {oferta.minCompra} {oferta.unidad}s</span>
                        <span className="flex items-center gap-1 text-amber-600"><Clock className="w-4 h-4" />Válido hasta {oferta.validoHasta}</span>
                      </div>
                      <button onClick={() => navigate("/orden")} className="text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2 rounded-xl hover:shadow-lg transition-all">
                        Aprovechar oferta
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Zap className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-700 mb-2">Sin ofertas activas</h3>
              <p className="text-sm text-slate-500">Esta empresa no tiene ofertas en este momento.</p>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: MÉTRICAS
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === "metricas" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              Scorecard de desempeño
            </h2>
            <div className="space-y-5">
              {[
                { label: "Confiabilidad", value: empresa.scorecard.confiabilidad },
                { label: "Entregas a tiempo", value: empresa.scorecard.entregas },
                { label: "Calidad de productos", value: empresa.scorecard. calidad },
                { label: "Precios competitivos", value: empresa.scorecard.precios },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-slate-700">{metric.label}</span>
                    <span className={cn(
                      "text-lg font-bold",
                      metric.value >= 90 ? "text-emerald-600" : metric.value >= 75 ? "text-teal-600" : metric.value >= 60 ? "text-amber-600" : "text-red-500"
                    )}>{metric.value}%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        metric. value >= 90 ? "bg-gradient-to-r from-emerald-500 to-emerald-400" :
                        metric.value >= 75 ? "bg-gradient-to-r from-teal-500 to-cyan-400" :
                        metric.value >= 60 ? "bg-gradient-to-r from-amber-500 to-yellow-400" :
                        "bg-gradient-to-r from-red-500 to-orange-400"
                      )}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center mb-3"><Package className="w-5 h-5 text-teal-600" /></div>
              <div className="text-2xl font-bold text-slate-800">{empresa.transacciones}</div>
              <div className="text-sm text-slate-500">Transacciones totales</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-3"><Users className="w-5 h-5 text-violet-600" /></div>
              <div className="text-2xl font-bold text-slate-800">156</div>
              <div className="text-sm text-slate-500">Clientes activos</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center mb-3"><TrendingUp className="w-5 h-5 text-cyan-600" /></div>
              <div className="text-2xl font-bold text-slate-800">78%</div>
              <div className="text-sm text-slate-500">Tasa de recompra</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-3"><Calendar className="w-5 h-5 text-emerald-600" /></div>
              <div className="text-2xl font-bold text-slate-800">4 años</div>
              <div className="text-sm text-slate-500">En la plataforma</div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: RESEÑAS
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === "resenias" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-slate-800">{empresa.rating}</div>
                <div className="flex items-center gap-1 justify-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={cn("w-5 h-5", star <= Math.round(empresa.rating) ? "text-amber-400 fill-amber-400" : "text-slate-200")} />
                  ))}
                </div>
                <div className="text-sm text-slate-500">{empresa.numResenias} reseñas</div>
              </div>
              <div className="flex-1 space-y-2 w-full sm:max-w-xs">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const percentage = stars === 5 ? 68 : stars === 4 ?  22 : stars === 3 ?  7 : stars === 2 ?  2 : 1;
                  return (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-sm text-slate-600 w-3">{stars}</span>
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="text-xs text-slate-400 w-8">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {resenias.map((resenia) => (
              <div key={resenia.id} className="bg-white rounded-2xl border border-slate-200 p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-slate-600 font-bold shrink-0">
                    {resenia.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-slate-800">{resenia.autor}</span>
                      {resenia.verificada && (
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />Compra verificada
                        </span>
                      )}
                      <span className="text-xs text-slate-400">{resenia.fecha}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={cn("w-4 h-4", star <= resenia.rating ? "text-amber-400 fill-amber-400" : "text-slate-200")} />
                      ))}
                    </div>
                    <p className="text-slate-600">{resenia.comentario}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: UBICACIÓN
      ════════════════════════════════════════════════════════════════════ */}
      {activeTab === "ubicacion" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="h-64 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center relative">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500">Mapa interactivo</p>
                <p className="text-xs text-slate-400">(Vista de demostración)</p>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-xl p-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-800">A 45 km de tu ubicación</div>
                    <div className="text-sm text-slate-500">~1. 5 horas en auto</div>
                  </div>
                  <button className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1">
                    Ver ruta<ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-slate-800 mb-4">Información de contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-700">Dirección</div>
                    <div className="text-slate-500">Av. Industrial 4520, Parque Industrial</div>
                    <div className="text-slate-500">{empresa.ubicacion}, México</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-700">Teléfono</div>
                    <div className="text-slate-500">+52 81 1234 5678</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-700">Email</div>
                    <div className="text-slate-500">contacto@empresa.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-700">Horario</div>
                    <div className="text-slate-500">Lun - Vie: 8:00 AM - 6:00 PM</div>
                    <div className="text-slate-500">Sáb: 8:00 AM - 2:00 PM</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                  <ExternalLink className="w-5 h-5" />
                  Abrir en Google Maps
                </button>
                <button
                  onClick={() => navigate("/orden")}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:shadow-lg transition-all"
                >
                  <Truck className="w-5 h-5" />
                  Planificar ruta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}