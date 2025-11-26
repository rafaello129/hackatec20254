import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Star,
  Sparkles,
  Package,
  Building2,
  Grid3X3,
  LayoutList,
  Clock,
  Truck,
  Users,
  ArrowRight,
  Filter,
  BadgeCheck,
  Zap,
  TrendingUp,
  Shield,
  Award,
  Heart,
  CheckCircle2,
  MessageCircle,
  Phone,
  CircleDot,
  Target,
  ArrowUpRight,
  Globe,
  Briefcase,
  BarChart3,
  Handshake,
  Network,
  Crown,
  Verified,
  ChevronRight,
  Play,
  Flame,
  Eye,
  ExternalLink,
  Layers,
  Box,
  Settings,
  Bookmark,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "../components/ui/utils";
import {
  proveedores,
  productos,
  servicios,
  ofertas,
  getEstadisticasPlataforma,
} from "../data/mockData2";
import React from "react";

type ViewType = "grid" | "list";
type TabType = "proveedores" | "productos" | "servicios";

export default function Explorar() {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<ViewType>("grid");
  const [activeTab, setActiveTab] = useState<TabType>("proveedores");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [verificadosOnly, setVerificadosOnly] = useState(false);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const stats = getEstadisticasPlataforma();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
  <g fill="none" fill-rule="evenodd">
    <g fill="#ffffff" fill-opacity="0.05">
      <path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/>
    </g>
  </g>
</svg>`;

const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  // Categorías del marketplace
  const categorias = [
    { id: "madera", label: "Madera y Tableros", icon: Layers, count: 156, color: "from-amber-500 to-orange-600" },
    { id: "maquinado", label: "Maquinado CNC", icon: Settings, count: 89, color: "from-violet-500 to-purple-600" },
    { id: "transporte", label: "Logística", icon: Truck, count: 234, color: "from-blue-500 to-cyan-600" },
    { id: "ferreteria", label: "Ferretería", icon: Box, count: 412, color: "from-slate-600 to-slate-800" },
    { id: "acabados", label: "Acabados", icon: Sparkles, count: 78, color: "from-rose-500 to-pink-600" },
    { id: "mano_obra", label: "Instalación", icon: Briefcase, count: 167, color: "from-emerald-500 to-teal-600" },
  ];

  // Datos enriquecidos con información B2B
  const proveedoresData = proveedores.  map((p, i) => ({
    ...p,
    matchScore: Math.floor(Math.random() * 15 + 85),
    proyectosActivos: Math.floor(Math.random() * 20 + 5),
    transaccionesRecientes: Math.floor(Math.random() * 50 + 10),
    volumenMensual: ["$50K - $100K", "$100K - $500K", "$500K+"][i % 3],
    responseTime: ["< 1 hora", "< 30 min", "< 2 horas"][i % 3],
    lastActive: ["Hace 5 min", "En línea", "Hace 15 min"][i % 3],
    isOnline: i % 2 === 0,
    conexionesEnComun: Math.floor(Math.random() * 10 + 2),
  }));

  const productosData = productos. map((p, i) => ({
    ...p,
    proveedor: proveedores.find((pr) => pr.id === p.proveedorId),
    isHot: i < 2,
    ordersThisMonth: Math. floor(Math.  random() * 100 + 20),
  }));

  const serviciosData = servicios.map((s, i) => ({
    ...s,
    proveedor: proveedores.  find((pr) => pr.id === s.proveedorId),
    popularidad: Math.floor(Math.random() * 30 + 70),
  }));

  const toggleSaved = (id: string) => {
    setSavedItems((prev) =>
      prev.includes(id) ?   prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const proveedoresFiltrados = proveedoresData.filter((p) => {
    if (verificadosOnly && !p.verificado) return false;
    if (searchQuery && !p.nombre.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getTierStyles = (tier: string) => {
    const styles: Record<string, { bg: string; badge: string; glow: string }> = {
      platinum: {
        bg: "from-slate-700 via-slate-600 to-slate-800",
        badge: "bg-gradient-to-r from-slate-600 to-slate-800 text-white",
        glow: "shadow-slate-500/30",
      },
      gold: {
        bg: "from-amber-500 via-yellow-400 to-amber-600",
        badge: "bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-900",
        glow: "shadow-amber-500/30",
      },
      standard: {
        bg: "from-teal-500 via-emerald-400 to-teal-600",
        badge: "bg-gradient-to-r from-teal-500 to-emerald-500 text-white",
        glow: "shadow-teal-500/30",
      },
    };
    return styles[tier] || styles. standard;
  };

  return (
    <div className="min-h-screen pb-12">
      {/* ═══════════════════════════════════════════════════════════════════
          BACKGROUND
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION - B2B NETWORKING STYLE
      ═══════════════════════════════════════════════════════════════════ */}
<div className="relative mb-12">
  {/* Main Hero */}
  <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    {/* Animated background */}
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>

    <div className="relative px-8 py-1 md:px-1 md:py-8">
      <div className="flex flex-col items-center text-center">
        {/* Content centered */}
        <div className="max-w-3xl">
          {/* Status badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 mb-6">
            <div className="flex items-center gap-1. 5 text-white/60 text-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Powered by AI
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            Tu red de
            <span className="block bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              proveedores
            </span>
          </h1>

          <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
            Conecta con proveedores verificados, compara precios en tiempo real y gestiona toda tu cadena de suministro en un solo lugar
          </p>

          {/* Search bar premium */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 rounded-2xl opacity-30 blur-xl" />
            <div className="relative flex items-center bg-white rounded-2xl shadow-2xl">
              <div className="flex items-center gap-3 pl-6">
                <Search className="w-6 h-6 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target. value)}
                placeholder="Buscar proveedores, productos o servicios..."
                className="flex-1 h-16 px-4 text-lg bg-transparent border-0 focus:outline-none text-slate-800 placeholder:text-slate-400"
              />
              <button className="m-2 px-8 h-12 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold hover:from-slate-800 hover:to-slate-700 transition-all flex items-center gap-2 shadow-lg">
                Explorar
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => navigate("/mapa")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 transition-all text-sm"
            >
              <MapPin className="w-4 h-4" />
              Ver mapa
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 transition-all text-sm">
              <Network className="w-4 h-4" />
              Mi red
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 transition-all text-sm">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* ═══════════════════════════════════════════════════════════════════
          CATEGORÍAS - MARKETPLACE STYLE
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Explora por categoría</h2>
            <p className="text-slate-500">Encuentra proveedores especializados en tu industria</p>
          </div>
          <button className="text-sm font-medium text-violet-600 hover:text-violet-700 flex items-center gap-1">
            Ver todas
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat. id)}
              className={cn(
                "group relative p-5 rounded-2xl border transition-all overflow-hidden",
                selectedCategory === cat.id
                  ? "bg-slate-900 border-slate-800 shadow-xl"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-lg"
              )}
            >
              {/* Glow effect on hover */}
              <div
                className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity",
                  `bg-gradient-to-br ${cat.color}`
                )}
                style={{ opacity: selectedCategory === cat.id ? 0.1 : 0 }}
              />

              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br",
                  cat. color
                )}
              >
                <cat.icon className="w-6 h-6 text-white" />
              </div>

              <h3
                className={cn(
                  "font-semibold text-sm mb-1 transition-colors",
                  selectedCategory === cat.id ? "text-white" : "text-slate-800"
                )}
              >
                {cat.label}
              </h3>
              <p
                className={cn(
                  "text-xs transition-colors",
                  selectedCategory === cat.id ? "text-white/60" : "text-slate-500"
                )}
              >
                {cat. count} proveedores
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          AI RECOMMENDATIONS BANNER
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative mb-8 overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600" />
      <div
      className="absolute inset-0"
      style={{ backgroundImage: `url("${dataUrl}")`, backgroundRepeat: 'repeat' }}
    />
        <div className="relative flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Recomendaciones personalizadas</h3>
              <p className="text-white/70">
                Basado en tu actividad, ubicación y proyectos recientes
              </p>
            </div>
          </div>
      
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          TABS & CONTROLS
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className="inline-flex p-1. 5 bg-slate-100 rounded-2xl">
            {[
              { id: "proveedores" as TabType, label: "Proveedores", icon: Building2, count: proveedoresFiltrados. length },
              { id: "productos" as TabType, label: "Productos", icon: Package, count: productosData.length },
              { id: "servicios" as TabType, label: "Servicios", icon: Truck, count: serviciosData.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all",
                  activeTab === tab.id
                    ? "bg-white text-slate-900 shadow-lg"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    activeTab === tab.id ?  "bg-slate-100" : "bg-slate-200/50"
                  )}
                >
                  {tab. count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(! showFilters)}
            className={cn(
              "flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all",
              showFilters
                ?  "bg-slate-900 text-white shadow-lg"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
            )}
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>

          <div className="flex bg-white rounded-xl border border-slate-200 p-1">
            <button
              onClick={() => setViewType("grid")}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                viewType === "grid" ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewType("list")}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                viewType === "list" ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <LayoutList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="mb-8 p-6 bg-white rounded-2xl border border-slate-200 shadow-lg">
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div
                className={cn(
                  "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                  verificadosOnly
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-slate-300 group-hover:border-slate-400"
                )}
              >
                {verificadosOnly && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
              <input
                type="checkbox"
                checked={verificadosOnly}
                onChange={(e) => setVerificadosOnly(e.target.checked)}
                className="sr-only"
              />
              <span className="text-sm font-medium text-slate-700">Solo verificados</span>
            </label>

            <div className="h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Categoría:</span>
              <select className="h-10 px-4 rounded-xl border border-slate-200 text-sm font-medium bg-white focus:outline-none focus:border-slate-400">
                <option>Todas</option>
                <option>Madera</option>
                <option>Transporte</option>
                <option>Maquinado</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Tier:</span>
              <select className="h-10 px-4 rounded-xl border border-slate-200 text-sm font-medium bg-white focus:outline-none focus:border-slate-400">
                <option>Todos</option>
                <option>Platinum</option>
                <option>Gold</option>
                <option>Standard</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Ordenar:</span>
              <select className="h-10 px-4 rounded-xl border border-slate-200 text-sm font-medium bg-white focus:outline-none focus:border-slate-400">
                <option>Relevancia</option>
                <option>Rating</option>
                <option>Más recientes</option>
              </select>
            </div>

            <button className="ml-auto text-sm text-slate-500 hover:text-slate-700 font-medium">
              Limpiar filtros
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: PROVEEDORES - B2B NETWORKING CARDS
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "proveedores" && (
        <div className="space-y-10">
          {/* Featured Providers */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Partners Destacados</h2>
                  <p className="text-sm text-slate-500">Los más compatibles con tu perfil</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-violet-600">
                <Target className="w-4 h-4" />
                <span className="font-medium">Match personalizado por IA</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {proveedoresFiltrados
                .filter((p) => p. destacado)
                . map((prov) => {
                  const tierStyles = getTierStyles(prov.tier);
                  return (
                    <div
                      key={prov.id}
                      className="group relative"
                      onClick={() => navigate(`/proveedor/${prov.id}`)}
                    >
                      {/* Glow effect */}
                      <div
                        className={cn(
                          "absolute -inset-1 rounded-[1. 75rem] opacity-0 group-hover:opacity-100 transition-opacity blur-xl",
                          `bg-gradient-to-r ${tierStyles.bg}`
                        )}
                        style={{ opacity: 0.2 }}
                      />

                      <div className="relative bg-white rounded-3xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500">
                        {/* Header with image */}
                        <div className="relative h-52">
                          <img
                            src={prov.  imagenPortada}
                            alt={prov.nombre}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                          {/* Top badges */}
                          <div className="absolute top-4 left-4 flex items-center gap-2">
                            <span className={cn("px-4 py-2 rounded-full text-xs font-bold shadow-lg", tierStyles.badge)}>
                              {prov.tier.  toUpperCase()}
                            </span>
                            <span className="px-3 py-2 rounded-full text-xs font-bold bg-white/20 backdrop-blur-xl text-white flex items-center gap-1. 5">
                              <Target className="w-3. 5 h-3.5" />
                              {prov.matchScore}% match
                            </span>
                          </div>

                          {/* Online status */}
                          <div className="absolute top-4 right-4 flex items-center gap-4">
                        
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSaved(prov.id);
                              }}
                              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center hover:bg-white/40 transition-all"
                            >
                              <Heart
                                className={cn(
                                  "w-5 h-5 text-white",
                                  savedItems.includes(prov.id) && "fill-current text-rose-400"
                                )}
                              />
                            </button>
                          </div>

                          {/* Provider info overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-end justify-between">
                              <div className="flex items-center gap-4">
                                <div
                                  className={cn(
                                    "w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl ring-4 ring-white/20 shadow-2xl bg-gradient-to-br",
                                    tierStyles.bg
                                  )}
                                >
                                  {prov. iniciales}
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                    {prov.nombre}
                                    {prov.verificado && <Verified className="w-6 h-6 text-teal-400" />}
                                  </h3>
                                  <p className="text-white/70">{prov.especialidad}</p>
                                </div>
                              </div>

                           
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Stats row */}
                          <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                <span className="text-xl font-bold text-slate-900">{prov.rating}</span>
                              </div>
                              <span className="text-xs text-slate-500">{prov. numResenias} reseñas</span>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-slate-900">{prov.tasaRespuesta}%</div>
                              <span className="text-xs text-slate-500">Respuesta</span>
                            </div>
                            <div className="text-center">
                              <div className="text-xl font-bold text-slate-900">{prov.responseTime}</div>
                              <span className="text-xs text-slate-500">Tiempo resp.</span>
                            </div>
                          
                          </div>

                          {/* Certifications */}
                          <div className="flex items-center gap-2 mb-6">
                            {prov.certificaciones.map((cert, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1. 5 text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1. 5 rounded-lg"
                              >
                                <Shield className="w-3. 5 h-3.5" />
                                {cert}
                              </span>
                            ))}
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg">
                              <MapPin className="w-3.5 h-3.5" />
                              {prov.ubicacion}
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 transition-all shadow-lg"
                            >
                              <MessageCircle className="w-5 h-5" />
                              Conectar
                            </button>
                            <button
                              onClick={(e) => e.stopPropagation()}
                              className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-all"
                            >
                              <Phone className="w-5 h-5" />
                            </button>
                        
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* All Providers */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Todos los proveedores
                <span className="text-slate-400 font-normal ml-2">
                  ({proveedoresFiltrados.filter((p) => ! p.destacado). length})
                </span>
              </h2>
              <span className="text-sm text-slate-500">Ordenados por relevancia</span>
            </div>

            <div
              className={cn(
                viewType === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"
              )}
            >
              {proveedoresFiltrados
                .filter((p) => !p. destacado)
                .map((prov) => {
                  const tierStyles = getTierStyles(prov.tier);
                  return (
                    <div
                      key={prov.id}
                      onClick={() => navigate(`/proveedor/${prov.id}`)}
                      className={cn(
                        "group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer",
                        viewType === "list" && "flex"
                      )}
                    >
                      {/* Image */}
                      <div
                        className={cn(
                          "relative overflow-hidden bg-slate-100",
                          viewType === "grid" ?  "h-44" : "w-48 shrink-0"
                        )}
                      >
                        <img
                          src={prov.imagenPortada}
                          alt={prov.nombre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* Tier badge */}
                        <div className="absolute top-3 left-3">
                          <span className={cn("px-3 py-1.5 rounded-full text-xs font-bold", tierStyles.badge)}>
                            {prov.tier. toUpperCase()}
                          </span>
                        </div>

                        {/* Online indicator */}
                        {prov.isOnline && (
                          <div className="absolute top-3 right-3">
                            <span className="w-3 h-3 bg-emerald-500 rounded-full block ring-2 ring-white" />
                          </div>
                        )}

                        {/* Avatar overlay */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br",
                              tierStyles.bg
                            )}
                          >
                            {prov. iniciales}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-slate-800 flex items-center gap-1. 5 group-hover:text-slate-900">
                              {prov.nombre}
                              {prov.verificado && <Verified className="w-4 h-4 text-teal-500" />}
                            </h3>
                            <p className="text-sm text-slate-500">{prov.especialidad}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-sm font-bold text-slate-800">{prov. rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3. 5 h-3.5" />
                            {prov.ubicacion}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                            {prov.tasaRespuesta}%
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {prov.responseTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          {prov.certificaciones.slice(0, 2).map((cert, i) => (
                            <span
                              key={i}
                              className="text-xs font-medium bg-slate-100 text-slate-600 px-2. 5 py-1 rounded-lg"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">
                            {prov.conexionesEnComun} conexiones en común
                          </span>
                          <button
                            onClick={(e) => e. stopPropagation()}
                            className="text-sm font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1"
                          >
                            Conectar
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: PRODUCTOS
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "productos" && (
        <div className="space-y-8">
          {/* Hot Products Banner */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">Productos más solicitados</h3>
              <p className="text-sm text-slate-600">Basado en tendencias de tu industria</p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-white text-orange-600 font-semibold border border-orange-200 hover:bg-orange-50 transition-colors">
              Ver tendencias
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productosData.map((prod, index) => (
              <div
                key={prod. id}
                onClick={() => navigate(`/proveedor/${prod. proveedorId}/producto/${prod.id}`)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-slate-300 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  <img
                    src={prod.imagenes[0]}
                    alt={prod. nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {prod.isHot && (
                      <span className="inline-flex items-center gap-1. 5 px-3 py-1. 5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold shadow-lg">
                        <Flame className="w-3. 5 h-3.5" />
                        HOT
                      </span>
                    )}
                    {prod.destacado && (
                      <span className="inline-flex items-center gap-1. 5 px-3 py-1. 5 rounded-full bg-violet-500 text-white text-xs font-bold shadow-lg">
                        <Sparkles className="w-3.5 h-3.5" />
                        Destacado
                      </span>
                    )}
                    {prod.envioGratis && (
                      <span className="px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-lg">
                        Envío gratis
                      </span>
                    )}
                  </div>

                  {prod.precioOriginal && (
                    <div className="absolute top-4 right-4 px-3 py-1. 5 rounded-full bg-rose-500 text-white text-sm font-black shadow-lg">
                      -{Math.round(((prod.precioOriginal - prod.precio) / prod.precioOriginal) * 100)}%
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-6">
                    <button className="w-full py-3 rounded-xl bg-white text-slate-900 font-bold flex items-center justify-center gap-2">
                      Ver detalles
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2. 5 py-1 rounded-lg">
                      {prod.categoria}
                    </span>
                    {prod.ordersThisMonth > 50 && (
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                        {prod.ordersThisMonth} pedidos/mes
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg mb-1 line-clamp-1 group-hover:text-violet-600 transition-colors">
                    {prod.nombre}
                  </h3>

                  {/* Provider mini */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                      {prod. proveedor?. iniciales}
                    </div>
                    <span className="text-sm text-slate-500">{prod.proveedor?.nombre}</span>
                    {prod.proveedor?.verificado && <Verified className="w-4 h-4 text-teal-500" />}
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      {prod.precioOriginal && (
                        <div className="text-sm text-slate-400 line-through">
                          ${prod.precioOriginal.toLocaleString()}
                        </div>
                      )}
                      <div className="text-2xl font-black text-slate-900">
                        ${prod.precio.toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500">por {prod.unidad}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-emerald-600">{prod.stock} disponibles</div>
                      <div className="text-xs text-slate-400">{prod.vendidos}+ vendidos</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TAB: SERVICIOS
      ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === "servicios" && (
        <div className="space-y-6">
          {serviciosData.map((serv) => (
            <div
              key={serv.id}
              onClick={() => navigate(`/proveedor/${serv.proveedorId}`)}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-slate-300 transition-all duration-300 cursor-pointer"
            >
              <div className="flex">
                {/* Image */}
                <div className="w-72 shrink-0 relative overflow-hidden">
                  <img
                    src={serv.imagenes?.[0] || serv.proveedor?.imagenPortada}
                    alt={serv.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white" />

                  {/* Popularity badge */}
                  {serv.popularidad > 80 && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-violet-500 text-white text-xs font-bold flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3. 5" />
                      Popular
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                          <Truck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                            {serv. nombre}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <span>{serv.proveedor?.nombre}</span>
                            {serv.proveedor?.verificado && <Verified className="w-4 h-4 text-teal-500" />}
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              {serv. calificacionPromedio}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-600 mb-4 line-clamp-2">{serv.descripcion}</p>

                      <div className="flex flex-wrap gap-2">
                        {serv.incluye.slice(0, 4).map((item, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1. 5 text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1. 5 rounded-lg"
                          >
                            <CheckCircle2 className="w-3. 5 h-3.5 text-emerald-500" />
                            {item}
                          </span>
                        ))}
                        {serv.incluye.length > 4 && (
                          <span className="text-xs text-slate-400 px-2 py-1. 5">
                            +{serv.incluye.length - 4} más
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right ml-8 shrink-0">
                      <div className="text-sm text-slate-500 mb-1">Desde</div>
                      <div className="text-3xl font-black text-slate-900">
                        ${serv.precioBase.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-500">{serv.unidadPrecio}</div>

                      <div className="flex items-center gap-2 mt-4">
                        <span
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1",
                            serv.disponibilidad === "inmediata"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          )}
                        >
                          <CircleDot className="w-3 h-3" />
                          {serv.disponibilidad === "inmediata" ? "Disponible ahora" : serv.disponibilidad}
                        </span>
                      </div>

                      <button
                        onClick={(e) => e. stopPropagation()}
                        className="mt-4 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2"
                      >
                        Solicitar
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}