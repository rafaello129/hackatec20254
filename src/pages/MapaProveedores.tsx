import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  MapPin,
  Star,
  Clock,
  X,
  Locate,
  Zap,
  Phone,
  MessageCircle,
  Plus,
  Minus,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Users,
  Package,
  Shield,
  CheckCircle2,
  Building2,
  Share2,
  Handshake,
  Network,
  BarChart3,
  UserPlus,
  Verified,
  Wifi,
  DollarSign,
  Factory,
  Bell,
  Map,
  Route,
  Navigation,
  Target,
  Bookmark,
  Eye,
  Brain,
  AlertTriangle,
  CheckCircle,
  Timer,
  ShoppingCart,
  ClipboardList,
  ExternalLink,
  RefreshCw,
  Download,
  ChevronLeft,
  Save,
  Trash2,
  Send,
  Info,
  Globe,
  BadgeCheck,
  CircleDot,
  MapPinned,
  Award,
} from "lucide-react";
import { proveedores } from "../data/mockData2";
import { cn } from "../components/ui/utils";
import React from "react";

// ══════════════════════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════════════════════

interface Partner {
  id: string;
  nombre: string;
  iniciales: string;
  rating: number;
  verificado: boolean;
  ubicacion: string;
  tiempoRespuesta: string;
  categorias: string[];
  especialidad: string;
  tier: string;
  imagenPortada: string;
  tasaRespuesta: number;
  tasaCumplimiento: number;
  entregas: number;
  numResenias: number;
  lat: number;
  lng: number;
  distancia: number;
  isOnline: boolean;
  lastSeen: string;
  conexionesComunes: number;
  transaccionesExitosas: number;
  volumenMensual: string;
  industrias: string[];
  añosOperando: number;
  empleados: string;
  certificaciones: string[];
  precioPromedio: number;
  tiempoEntrega: string;
  stockDisponible: boolean;
  stockCantidad: number;
  descuento: number;
  score: number;
  direccion: string;
  telefono: string;
  email: string;
}

interface PlanItem {
  partnerId: string;
  productos: string[];
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  prioridad: "alta" | "media" | "baja";
  entregaEstimada: string;
}

interface RutaOptimizada {
  orden: string[];
  coordinates: [number, number][];
  distanciaTotal: number;
  tiempoEstimado: number;
  geometry: any;
}

type ViewMode = "intelligence" | "map" | "routes" | "plan";
type ConnectionStatus = "connected" | "pending" | "none";

// Pachuca, Hidalgo
const DEFAULT_CENTER: [number, number] = [20.1011, -98.7591];
const DEFAULT_ZOOM = 13;

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════

export default function MapaProveedores() {
  const navigate = useNavigate();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const routeLayerRef = useRef<any>(null);
  const initRef = useRef(false);

  // Core State
  const [viewMode, setViewMode] = useState<ViewMode>("intelligence");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Plan de Compra
  const [planItems, setPlanItems] = useState<PlanItem[]>([]);

  // Rutas
  const [rutaOptimizada, setRutaOptimizada] = useState<RutaOptimizada | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedForRoute, setSelectedForRoute] = useState<Set<string>>(new Set());
  const [routeError, setRouteError] = useState<string | null>(null);

  // Connections
  const [connectedPartners] = useState<Set<string>>(new Set(["prov-1", "prov-3"]));
  const [pendingRequests, setPendingRequests] = useState<Set<string>>(new Set(["prov-2"]));

  // Filters
  const [filters, setFilters] = useState({
    tier: "all",
    verified: false,
    online: false,
    hasStock: false,
    maxDistance: 50,
    minRating: 0,
  });

  // AI Insights
  const [aiInsights, setAiInsights] = useState({
    bestValue: null as string | null,
    fastestDelivery: null as string | null,
    mostReliable: null as string | null,
    recommended: [] as string[],
    warnings: [] as { partnerId: string; message: string }[],
  });

  // ══════════════════════════════════════════════════════════════════════════════
  // DATA GENERATION
  // ══════════════════════════════════════════════════════════════════════════════

  const partners = useMemo<Partner[]>(() => {
    const volumenes = ["$50K-100K", "$100K-500K", "$500K-1M", "$1M-5M", "$5M+"];
    const empleadosOpts = ["1-10", "11-50", "51-200", "201-500", "500+"];
    const certs = ["ISO 9001", "ISO 14001", "ISO 45001", "FSSC 22000"];
    const tiemposEntrega = ["24 horas", "48 horas", "3-5 días", "1 semana"];
    const direcciones = [
      "Av.  Revolución 234, Centro",
      "Blvd. Felipe Ángeles 567, Real del Monte",
      "Calle Allende 89, Zona Plateada",
      "Av. Juárez 432, Boulevares",
      "Calle Hidalgo 123, Venta Prieta",
      "Blvd. Minero 890, Cubitos",
    ];

    return proveedores.map((p, i) => {
      const angle = (i / proveedores.length) * Math.PI * 2;
      const dist = 0.008 + Math.random() * 0.02;
      const precioBase = Math.floor(Math. random() * 500) + 100;
      const descuento = Math. random() > 0.6 ? Math.floor(Math. random() * 25) + 5 : 0;
      const stockDisponible = Math. random() > 0.25;

      const scoreFactors = {
        rating: p.rating * 15,
        respuesta: p.tasaRespuesta * 0.3,
        cumplimiento: p.tasaCumplimiento * 0.4,
        precio: (1 - precioBase / 600) * 20,
        distancia: (1 - dist / 0.03) * 10,
      };
      const score = Math.min(
        99,
        Math. floor(
          scoreFactors.rating + scoreFactors.respuesta + scoreFactors. cumplimiento + scoreFactors.precio + scoreFactors. distancia
        )
      );

      return {
        ... p,
        lat: DEFAULT_CENTER[0] + Math.cos(angle) * dist + (Math.random() - 0.5) * 0.005,
        lng: DEFAULT_CENTER[1] + Math.sin(angle) * dist * 1.2 + (Math.random() - 0.5) * 0.005,
        distancia: Math.round(dist * 111 * 10) / 10,
        isOnline: Math.random() > 0.4,
        lastSeen: ["Ahora", "5 min", "30 min", "1h", "2h"][Math.floor(Math.random() * 5)],
        conexionesComunes: Math.floor(Math.random() * 20) + 1,
        transaccionesExitosas: Math.floor(Math.random() * 500) + 10,
        volumenMensual: volumenes[Math.floor(Math.random() * volumenes.length)],
        industrias: ["Manufactura", "Logística", "Retail"]. slice(0, Math. floor(Math.random() * 3) + 1),
        añosOperando: Math.floor(Math.random() * 25) + 1,
        empleados: empleadosOpts[Math.floor(Math.random() * empleadosOpts.length)],
        certificaciones: certs. slice(0, Math.floor(Math. random() * 3) + 1),
        precioPromedio: precioBase,
        tiempoEntrega: tiemposEntrega[Math.floor(Math. random() * tiemposEntrega.length)],
        stockDisponible,
        stockCantidad: stockDisponible ? Math.floor(Math.random() * 500) + 50 : 0,
        descuento,
        score,
        direccion: direcciones[i % direcciones.length],
        telefono: `771 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
        email: `contacto@${p.nombre. toLowerCase().replace(/\s+/g, "")}.com`,
      };
    });
  }, []);

  // Filtered Partners
  const filteredPartners = useMemo(() => {
    return partners
      .filter((p) => {
        if (filters. verified && !p.verificado) return false;
        if (filters.online && !p.isOnline) return false;
        if (filters.hasStock && !p. stockDisponible) return false;
        if (filters.tier !== "all" && p.tier !== filters.tier) return false;
        if (p.distancia > filters.maxDistance) return false;
        if (p.rating < filters. minRating) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          if (! p.nombre.toLowerCase().includes(q) && !p.especialidad.toLowerCase().includes(q)) return false;
        }
        return true;
      })
      . sort((a, b) => b.score - a. score);
  }, [partners, filters, searchQuery]);

  const selectedPartner = selectedId ? partners.find((p) => p. id === selectedId) : null;

  // ══════════════════════════════════════════════════════════════════════════════
  // AI ANALYSIS
  // ══════════════════════════════════════════════════════════════════════════════

  useEffect(() => {
    if (filteredPartners.length === 0) return;

    const bestValue = [... filteredPartners]. sort(
      (a, b) => a.precioPromedio * (1 - a.descuento / 100) - b.precioPromedio * (1 - b.descuento / 100)
    )[0];

    const fastest = [... filteredPartners]. sort((a, b) => {
      const getHours = (t: string) => {
        if (t.includes("24")) return 24;
        if (t. includes("48")) return 48;
        if (t.includes("3-5")) return 96;
        return 168;
      };
      return getHours(a.tiempoEntrega) - getHours(b.tiempoEntrega);
    })[0];

    const reliable = [...filteredPartners].sort((a, b) => b.tasaCumplimiento - a.tasaCumplimiento)[0];
    const recommended = filteredPartners.slice(0, 3). map((p) => p.id);

    const warnings = filteredPartners
      .filter((p) => ! p.stockDisponible || p.tasaCumplimiento < 85)
      .slice(0, 3)
      .map((p) => ({
        partnerId: p.id,
        message: ! p.stockDisponible ? "Stock limitado" : "Cumplimiento < 85%",
      }));

    setAiInsights({
      bestValue: bestValue?. id || null,
      fastestDelivery: fastest?.id || null,
      mostReliable: reliable?. id || null,
      recommended,
      warnings,
    });
  }, [filteredPartners]);

  // ══════════════════════════════════════════════════════════════════════════════
  // ROUTE OPTIMIZATION WITH OSRM
  // ══════════════════════════════════════════════════════════════════════════════

  const optimizeRoute = useCallback(async () => {
    if (selectedForRoute.size < 2) return;

    setIsOptimizing(true);
    setRouteError(null);

    try {
      const selectedPartners = partners.filter((p) => selectedForRoute.has(p.id));
      const coordinates = selectedPartners.map((p) => `${p.lng},${p.lat}`). join(";");

      const response = await fetch(
        `https://router.project-osrm.org/trip/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=true&roundtrip=false&source=first`
      );

      if (!response.ok) throw new Error("Error al calcular la ruta");

      const data = await response.json();

      if (data. code !== "Ok" || !data.trips || data.trips.length === 0) {
        throw new Error("No se pudo calcular una ruta válida");
      }

      const trip = data.trips[0];
      const waypoints = data.waypoints;

      const optimizedOrder = waypoints
        .sort((a: any, b: any) => a.waypoint_index - b.waypoint_index)
        .map((wp: any) => selectedPartners[wp.waypoint_index]. id);

      setRutaOptimizada({
        orden: optimizedOrder,
        coordinates: trip.geometry.coordinates. map((c: number[]) => [c[1], c[0]]),
        distanciaTotal: Math.round(trip. distance / 100) / 10,
        tiempoEstimado: Math.round(trip. duration / 60),
        geometry: trip.geometry,
      });

      // Draw route on map
      if (mapRef.current && routeLayerRef. current) {
        const L = (window as any).L;
        routeLayerRef. current.clearLayers();

        const routeCoords = trip.geometry. coordinates.map((c: number[]) => [c[1], c[0]]);

        // Route glow effect
        L.polyline(routeCoords, {
          color: "#06b6d4",
          weight: 14,
          opacity: 0.15,
          lineCap: "round",
          lineJoin: "round",
        }).addTo(routeLayerRef. current);

        // Route outline
        L.polyline(routeCoords, {
          color: "#0891b2",
          weight: 8,
          opacity: 0.6,
          lineCap: "round",
          lineJoin: "round",
        }).addTo(routeLayerRef.current);

        // Route main line
        L. polyline(routeCoords, {
          color: "#22d3ee",
          weight: 5,
          opacity: 1,
          lineCap: "round",
          lineJoin: "round",
        }).addTo(routeLayerRef.current);

        // Animated dashes
        L.polyline(routeCoords, {
          color: "#ffffff",
          weight: 2,
          opacity: 0.8,
          lineCap: "round",
          lineJoin: "round",
          dashArray: "10, 20",
          className: "route-animated",
        }).addTo(routeLayerRef.current);

        const bounds = L.latLngBounds(routeCoords);
        mapRef.current.fitBounds(bounds, { padding: [80, 80] });
      }
    } catch (error) {
      console.error("Route optimization error:", error);
      setRouteError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setIsOptimizing(false);
    }
  }, [selectedForRoute, partners]);

  const clearRoute = useCallback(() => {
    setSelectedForRoute(new Set());
    setRutaOptimizada(null);
    setRouteError(null);
    if (routeLayerRef. current) {
      routeLayerRef.current.clearLayers();
    }
  }, []);

  // ══════════════════════════════════════════════════════════════════════════════
  // MAP INITIALIZATION
  // ══════════════════════════════════════════════════════════════════════════════

  useEffect(() => {
    if (initRef.current || !mapContainerRef.current) return;
    initRef.current = true;

    const init = async () => {
      if (! document.getElementById("leaflet-css")) {
        const css = document.createElement("link");
        css.id = "leaflet-css";
        css.rel = "stylesheet";
        css. href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
        document.head.appendChild(css);
      }

      if (!(window as any).L) {
        await new Promise<void>((resolve) => {
          const js = document.createElement("script");
          js.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
          js.onload = () => resolve();
          document. head.appendChild(js);
        });
      }

      const L = (window as any).L;
      const map = L.map(mapContainerRef. current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: false,
        attributionControl: false,
      });

      // Voyager style - clean and modern
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        subdomains: "abcd",
      }). addTo(map);

      markersLayerRef. current = L.layerGroup(). addTo(map);
      routeLayerRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      setMapReady(true);

      map.on("click", () => setSelectedId(null));
    };

    init();

    return () => {
      mapRef.current?. remove();
      mapRef.current = null;
      initRef.current = false;
    };
  }, []);

  // Render markers
  useEffect(() => {
    if (!mapReady || !markersLayerRef. current) return;

    const L = (window as any).L;
    markersLayerRef. current.clearLayers();

    filteredPartners.forEach((partner) => {
      const isSelected = selectedId === partner.id;
      const isInRoute = selectedForRoute.has(partner.id);
      const isRecommended = aiInsights.recommended. includes(partner.id);
      const routeIndex = isInRoute ? Array.from(selectedForRoute).indexOf(partner.id) + 1 : 0;

      const tierConfig: Record<string, { gradient: string; shadow: string }> = {
        platinum: { gradient: "linear-gradient(135deg, #1e293b 0%, #334155 100%)", shadow: "rgba(30, 41, 59, 0.5)" },
        gold: { gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", shadow: "rgba(245, 158, 11, 0.5)" },
        standard: { gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)", shadow: "rgba(20, 184, 166, 0.5)" },
      };

      const tier = tierConfig[partner.tier] || tierConfig.standard;

      const markerHtml = `
        <div class="premium-marker ${isSelected ? "selected" : ""} ${isInRoute ?  "in-route" : ""}">
          ${isRecommended ?  `
            <div class="ai-crown">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15. 09 8.26L22 9.27L17 14.14L18.18 21.02L12 17. 77L5.82 21. 02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
            </div>
          ` : ""}
          ${isInRoute ? `<div class="route-number">${routeIndex}</div>` : ""}
          <div class="marker-body" style="background: ${tier.gradient}; box-shadow: 0 8px 32px ${tier.shadow}">
            <span class="initials">${partner. iniciales}</span>
            ${partner.isOnline ? '<span class="pulse-ring"></span><span class="online-indicator"></span>' : ""}
            ${partner.verificado ? '<span class="verified-badge"><svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg></span>' : ""}
          </div>
          <div class="marker-label">
            <span class="name">${partner.nombre. split(" ")[0]}</span>
            <span class="score-badge">${partner.score}</span>
          </div>
          <div class="marker-pointer"></div>
        </div>
      `;

      const icon = L.divIcon({
        html: markerHtml,
        className: "premium-marker-wrapper",
        iconSize: [120, 100],
        iconAnchor: [60, 95],
      });

      L.marker([partner.lat, partner.lng], { icon })
        . addTo(markersLayerRef.current)
        .on("click", (e: any) => {
          e.originalEvent?. stopPropagation();
          setSelectedId(partner.id);
          mapRef.current?.panTo([partner.lat, partner.lng], { animate: true });
        });
    });

    if (filteredPartners.length > 0 && !selectedId && !rutaOptimizada) {
      try {
        const bounds = L.latLngBounds(filteredPartners. map((p) => [p.lat, p.lng]));
        if (bounds.isValid()) {
          mapRef.current?.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
        }
      } catch {}
    }
  }, [filteredPartners, mapReady, selectedId, selectedForRoute, aiInsights, rutaOptimizada]);

  // ══════════════════════════════════════════════════════════════════════════════
  // HELPERS
  // ══════════════════════════════════════════════════════════════════════════════

  const getTier = useCallback(
    (tier: string) =>
      ({
        platinum: { bg: "bg-gradient-to-br from-slate-700 to-slate-900", text: "text-white", label: "Platinum", color: "#1e293b" },
        gold: { bg: "bg-gradient-to-br from-amber-500 to-amber-700", text: "text-white", label: "Gold", color: "#d97706" },
        standard: { bg: "bg-gradient-to-br from-teal-500 to-teal-700", text: "text-white", label: "Verified", color: "#0d9488" },
      }[tier] || { bg: "bg-gradient-to-br from-teal-500 to-teal-700", text: "text-white", label: "Partner", color: "#0d9488" }),
    []
  );

  const getConnectionStatus = useCallback(
    (id: string): ConnectionStatus => {
      if (connectedPartners.has(id)) return "connected";
      if (pendingRequests.has(id)) return "pending";
      return "none";
    },
    [connectedPartners, pendingRequests]
  );

  const addToPlan = useCallback(
    (partner: Partner) => {
      if (planItems.some((item) => item.partnerId === partner.id)) return;
      setPlanItems((prev) => [
        ...prev,
        {
          partnerId: partner.id,
          productos: partner.categorias.slice(0, 2),
          cantidad: 1,
          precioUnitario: partner.precioPromedio * (1 - partner. descuento / 100),
          subtotal: partner.precioPromedio * (1 - partner. descuento / 100),
          prioridad: "media",
          entregaEstimada: partner.tiempoEntrega,
        },
      ]);
    },
    [planItems]
  );

  const toggleRouteSelection = useCallback((id: string) => {
    setSelectedForRoute((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next. add(id);
      return next;
    });
    setRutaOptimizada(null);
    if (routeLayerRef. current) {
      routeLayerRef.current.clearLayers();
    }
  }, []);

  const stats = useMemo(
    () => ({
      total: filteredPartners.length,
      online: filteredPartners.filter((p) => p. isOnline).length,
      connected: partners.filter((p) => connectedPartners.has(p.id)). length,
    }),
    [filteredPartners, partners, connectedPartners]
  );

  // ══════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════════

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-100 overflow-hidden">
      {/* ════════════════════════════════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════════════════════════════════ */}
      <header className="shrink-0 h-16 bg-white border-b border-slate-200 shadow-sm z-50">
        <div className="h-full flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-600" />
                Centro de Inteligencia B2B
              </h1>
              <p className="text-xs text-slate-500">Pachuca, Hidalgo • {stats.total} partners</p>
            </div>
          </div>

          {/* View Modes */}
          <div className="flex items-center bg-slate-100 rounded-xl p-1">
            {[
              { id: "intelligence" as ViewMode, icon: Brain, label: "IA" },
              { id: "map" as ViewMode, icon: Map, label: "Mapa" },
              { id: "routes" as ViewMode, icon: Route, label: "Rutas" },
              { id: "plan" as ViewMode, icon: ClipboardList, label: "Plan" },
            ].map((mode) => (
              <button
                key={mode. id}
                onClick={() => setViewMode(mode.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  viewMode === mode.id
                    ? "bg-white text-cyan-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <mode.icon className="w-4 h-4" />
                <span className="hidden lg:inline">{mode.label}</span>
                {mode.id === "plan" && planItems.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center">
                    {planItems.length}
                  </span>
                )}
                {mode.id === "routes" && selectedForRoute.size > 0 && (
                  <span className="w-5 h-5 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center">
                    {selectedForRoute.size}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 flex overflow-hidden">
        {/* ══════════════════════════════════════════════════════════════════════
            LEFT SIDEBAR
        ══════════════════════════════════════════════════════════════════════ */}
        <aside
          className={cn(
            "h-full bg-white border-r border-slate-200 flex flex-col transition-all duration-300 z-20",
            sidebarCollapsed ? "w-0 overflow-hidden" : "w-full md:w-[400px] lg:w-[440px]"
          )}
        >
          {/* Search */}
          <div className="shrink-0 p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar partners, productos..."
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all"
              />
            </div>
          </div>

          {/* AI Quick Actions */}
          <div className="shrink-0 p-4 border-b border-slate-100 bg-gradient-to-r from-cyan-50 to-teal-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                Recomendaciones IA
              </h3>
              <button
                onClick={() => {
                  setIsAnalyzing(true);
                  setTimeout(() => setIsAnalyzing(false), 1500);
                }}
                className="text-xs text-cyan-600 hover:text-cyan-700 flex items-center gap-1 font-medium"
              >
                <RefreshCw className={cn("w-3 h-3", isAnalyzing && "animate-spin")} />
                Actualizar
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { key: "bestValue", icon: DollarSign, label: "Mejor precio", bgColor: "bg-emerald-50", borderColor: "border-emerald-200", textColor: "text-emerald-700", iconColor: "text-emerald-600" },
                { key: "fastestDelivery", icon: Zap, label: "Más rápido", bgColor: "bg-amber-50", borderColor: "border-amber-200", textColor: "text-amber-700", iconColor: "text-amber-600" },
                { key: "mostReliable", icon: Shield, label: "Más fiable", bgColor: "bg-blue-50", borderColor: "border-blue-200", textColor: "text-blue-700", iconColor: "text-blue-600" },
              ].map((item) => {
                const partnerId = aiInsights[item.key as keyof typeof aiInsights] as string | null;
                const partner = partnerId ? partners.find((p) => p.id === partnerId) : null;

                return (
                  <button
                    key={item.key}
                    onClick={() => partnerId && setSelectedId(partnerId)}
                    className={cn(
                      "p-3 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-md",
                      item. bgColor,
                      item.borderColor
                    )}
                    disabled={!partnerId}
                  >
                    <item.icon className={cn("w-5 h-5 mx-auto mb-1", item. iconColor)} />
                    <div className={cn("text-[10px] font-semibold", item. textColor)}>{item.label}</div>
                    {partner && (
                      <div className="text-[9px] text-slate-500 mt-1 truncate">{partner.nombre. split(" ")[0]}</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filters */}
          <div className="shrink-0 p-4 border-b border-slate-100">
            <div className="flex flex-wrap gap-2">
              {[
                { key: "verified", label: "Verificados", icon: Verified, activeColor: "bg-teal-100 text-teal-700 border-teal-300" },
                { key: "online", label: "En línea", icon: Wifi, activeColor: "bg-emerald-100 text-emerald-700 border-emerald-300" },
                { key: "hasStock", label: "Con stock", icon: Package, activeColor: "bg-blue-100 text-blue-700 border-blue-300" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilters((prev) => ({ ... prev, [f. key]: !prev[f.key as keyof typeof prev] }))}
                  className={cn(
                    "flex items-center gap-1. 5 px-3 py-2 rounded-lg text-xs font-semibold border-2 transition-all",
                    filters[f.key as keyof typeof filters]
                      ? f.activeColor
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                  )}
                >
                  <f.icon className="w-3. 5 h-3.5" />
                  {f. label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="shrink-0 px-4 py-3 border-b border-slate-100 flex items-center gap-4 text-sm bg-slate-50">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-cyan-600" />
              <span className="font-bold text-slate-900">{stats.total}</span>
              <span className="text-slate-500">partners</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-1. 5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-600">{stats.online} activos</span>
            </div>
          </div>

          {/* Partner List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 space-y-2">
              {filteredPartners.map((partner) => {
                const tier = getTier(partner.tier);
                const isSelected = selectedId === partner.id;
                const isInRoute = selectedForRoute.has(partner.id);
                const isRecommended = aiInsights. recommended.includes(partner.id);
                const warning = aiInsights.warnings.find((w) => w. partnerId === partner.id);

                return (
                  <div
                    key={partner.id}
                    onClick={() => setSelectedId(partner.id)}
                    className={cn(
                      "relative p-4 rounded-2xl cursor-pointer transition-all border-2 group",
                      isSelected
                        ? "bg-cyan-50 border-cyan-300 shadow-lg shadow-cyan-100"
                        : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-md"
                    )}
                  >
                    {/* Badges */}
                    <div className="absolute -top-2 -right-2 flex gap-1">
                      {isRecommended && (
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg">
                          <Award className="w-4 h-4 text-white" />
                        </span>
                      )}
                      {isInRoute && (
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                          {Array.from(selectedForRoute).indexOf(partner.id) + 1}
                        </span>
                      )}
                    </div>

                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        <div
                          className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg", tier. bg)}
                        >
                          {partner.iniciales}
                        </div>
                        {partner.isOnline && (
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-900 truncate">{partner. nombre}</span>
                          {partner.verificado && <Verified className="w-4 h-4 text-teal-500 shrink-0" />}
                        </div>

                        <p className="text-sm text-slate-500 truncate mb-2">{partner.especialidad}</p>

                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1 text-slate-500">
                            <Star className="w-3. 5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="font-semibold text-slate-700">{partner.rating}</span>
                          </span>
                          <span className="flex items-center gap-1 text-slate-500">
                            <MapPin className="w-3.5 h-3.5" />
                            {partner.distancia}km
                          </span>
                          <span className="flex items-center gap-1 text-slate-500">
                            <Timer className="w-3.5 h-3.5" />
                            {partner.tiempoEntrega}
                          </span>
                        </div>

                        {/* Score Bar */}
                        <div className="flex items-center gap-2 mt-3">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full transition-all"
                              style={{ width: `${partner.score}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-cyan-600">{partner.score}</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right shrink-0">
                        {partner.descuento > 0 && (
                          <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-xs font-bold mb-1">
                            -{partner.descuento}%
                          </span>
                        )}
                        <div className="text-lg font-bold text-slate-900">
                          ${Math.round(partner. precioPromedio * (1 - partner. descuento / 100))}
                        </div>
                        <div className="text-[10px] text-slate-400">precio prom.</div>
                      </div>
                    </div>

                    {/* Warning */}
                    {warning && (
                      <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-medium text-amber-700">{warning.message}</span>
                      </div>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToPlan(partner);
                        }}
                        className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center hover:bg-cyan-200 transition-colors"
                        title="Agregar al plan"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRouteSelection(partner.id);
                        }}
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                          isInRoute ?  "bg-cyan-500 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        )}
                        title="Agregar a ruta"
                      >
                        <Route className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ══════════════════════════════════════════════════════════════════════
            MAIN AREA - MAP
        ══════════════════════════════════════════════════════════════════════ */}
        <main className="flex-1 relative">
          <div ref={mapContainerRef} className="absolute inset-0" />

          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <button
                onClick={() => mapRef.current?.zoomIn()}
                className="w-11 h-11 flex items-center justify-center text-slate-600 hover:bg-slate-50 border-b border-slate-100"
              >
                <Plus className="w-5 h-5" />
              </button>
              <button
                onClick={() => mapRef.current?. zoomOut()}
                className="w-11 h-11 flex items-center justify-center text-slate-600 hover:bg-slate-50"
              >
                <Minus className="w-5 h-5" />
              </button>
            </div>

            <button className="w-11 h-11 rounded-xl bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50">
              <Locate className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                const L = (window as any).L;
                if (filteredPartners.length > 0 && mapRef.current) {
                  const bounds = L.latLngBounds(filteredPartners. map((p) => [p.lat, p.lng]));
                  mapRef.current. fitBounds(bounds, { padding: [60, 60] });
                }
              }}
              className="w-11 h-11 rounded-xl bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
            >
              <Target className="w-5 h-5" />
            </button>
          </div>

          {/* Route Builder Panel */}
          {viewMode === "routes" && (
            <div className="absolute top-4 left-4 right-20 z-[1000]">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-2xl mx-auto">
                <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-cyan-50 to-teal-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg">
                        <Route className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">Optimizador de Rutas</h3>
                        <p className="text-sm text-slate-500">
                          {selectedForRoute.size} partners seleccionados
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedForRoute.size > 0 && (
                        <button
                          onClick={clearRoute}
                          className="px-4 py-2. 5 rounded-xl bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition-colors"
                        >
                          Limpiar
                        </button>
                      )}
                      <button
                        onClick={optimizeRoute}
                        disabled={selectedForRoute. size < 2 || isOptimizing}
                        className={cn(
                          "px-6 py-2. 5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg",
                          selectedForRoute.size >= 2
                            ? "bg-gradient-to-r from-cyan-500 to-teal-600 text-white hover:from-cyan-600 hover:to-teal-700"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        )}
                      >
                        {isOptimizing ?  (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Calculando...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            Optimizar
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {routeError && (
                  <div className="p-4 bg-red-50 border-b border-red-100">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-medium">{routeError}</span>
                    </div>
                  </div>
                )}

                {rutaOptimizada && (
                  <div className="p-5 bg-gradient-to-r from-cyan-50 to-teal-50 border-b border-cyan-100">
                    <div className="grid grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-xs text-cyan-600 font-medium mb-1">Distancia</div>
                        <div className="text-3xl font-black text-cyan-700">{rutaOptimizada.distanciaTotal}</div>
                        <div className="text-xs text-cyan-500">kilómetros</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-cyan-600 font-medium mb-1">Tiempo</div>
                        <div className="text-3xl font-black text-cyan-700">{rutaOptimizada.tiempoEstimado}</div>
                        <div className="text-xs text-cyan-500">minutos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-cyan-600 font-medium mb-1">Paradas</div>
                        <div className="text-3xl font-black text-cyan-700">{rutaOptimizada. orden.length}</div>
                        <div className="text-xs text-cyan-500">partners</div>
                      </div>
                      <div className="flex items-center justify-center">
                        <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold flex items-center gap-2 hover:from-cyan-700 hover:to-teal-700 transition-all shadow-lg">
                          <Navigation className="w-5 h-5" />
                          Navegar
                        </button>
                      </div>
                    </div>

                    {/* Route Order */}
                    <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2">
                      {rutaOptimizada.orden.map((id, idx) => {
                        const partner = partners.find((p) => p. id === id);
                        if (!partner) return null;
                        const tier = getTier(partner.tier);
                        return (
                          <div key={id} className="flex items-center shrink-0">
                            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border-2 border-cyan-200 shadow-sm">
                              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold", tier.bg)}>
                                {partner.iniciales}
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-700">{partner.nombre. split(" ")[0]}</div>
                                <div className="text-[10px] text-slate-400">{partner.distancia}km</div>
                              </div>
                            </div>
                            {idx < rutaOptimizada.orden. length - 1 && (
                              <div className="flex items-center mx-2">
                                <div className="w-6 h-0.5 bg-cyan-300" />
                                <ChevronRight className="w-4 h-4 text-cyan-400" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedForRoute.size === 0 && (
                  <div className="p-8 text-center">
                    <div className="w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-4">
                      <MapPinned className="w-10 h-10 text-cyan-500" />
                    </div>
                    <h4 className="font-bold text-slate-700 text-lg mb-2">Planifica tu ruta</h4>
                    <p className="text-slate-500 max-w-sm mx-auto">
                      Selecciona partners desde la lista para crear una ruta optimizada de visitas
                    </p>
                  </div>
                )}

                {selectedForRoute.size > 0 && selectedForRoute.size < 2 && ! rutaOptimizada && (
                  <div className="p-4 bg-amber-50 text-center border-t border-amber-100">
                    <p className="text-sm text-amber-700 flex items-center justify-center gap-2">
                      <Info className="w-4 h-4" />
                      Selecciona al menos 2 partners para calcular la ruta
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Plan Mode */}
          {viewMode === "plan" && (
            <div className="absolute inset-4 z-[1000] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
              <div className="shrink-0 p-6 border-b border-slate-100 bg-gradient-to-r from-cyan-50 to-teal-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg">
                      <ClipboardList className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Plan de Compra</h2>
                      <p className="text-sm text-slate-500">
                        {planItems.length} proveedores • Total: ${planItems.reduce((acc, item) => acc + item.subtotal, 0). toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2. 5 rounded-xl bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Exportar
                    </button>
                    <button
                      onClick={() => setViewMode("map")}
                      className="px-4 py-2.5 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-700 flex items-center gap-2 shadow-lg"
                    >
                      <Save className="w-4 h-4" />
                      Guardar
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-6">
                {planItems.length > 0 ?  (
                  <div className="space-y-4">
                    {planItems.map((item, idx) => {
                      const partner = partners.find((p) => p. id === item.partnerId);
                      if (!partner) return null;
                      const tier = getTier(partner.tier);

                      return (
                        <div key={item.partnerId} className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                          <div className="flex items-center gap-5">
                            <div className="text-2xl font-black text-slate-300 w-8">{idx + 1}</div>

                            <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-md", tier.bg)}>
                              {partner.iniciales}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-slate-900">{partner.nombre}</span>
                                {partner.verificado && <Verified className="w-4 h-4 text-teal-500" />}
                              </div>
                              <div className="text-sm text-slate-500">{item.productos.join(", ")}</div>
                            </div>

                            <div className="flex items-center gap-6">
                              <div className="text-center min-w-[100px]">
                                <div className="text-xs text-slate-400 mb-1">Cantidad</div>
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() =>
                                      setPlanItems((prev) =>
                                        prev. map((x) =>
                                          x.partnerId === item.partnerId
                                            ? { ...x, cantidad: Math.max(1, x.cantidad - 1), subtotal: x. precioUnitario * Math.max(1, x.cantidad - 1) }
                                            : x
                                        )
                                      )
                                    }
                                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="font-bold text-slate-900 w-8 text-center">{item. cantidad}</span>
                                  <button
                                    onClick={() =>
                                      setPlanItems((prev) =>
                                        prev.map((x) =>
                                          x. partnerId === item. partnerId
                                            ? { ...x, cantidad: x. cantidad + 1, subtotal: x. precioUnitario * (x.cantidad + 1) }
                                            : x
                                        )
                                      )
                                    }
                                    className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              <div className="text-center min-w-[80px]">
                                <div className="text-xs text-slate-400 mb-1">Precio Unit. </div>
                                <div className="font-bold text-slate-900">${Math.round(item. precioUnitario)}</div>
                              </div>

                              <div className="text-center min-w-[100px]">
                                <div className="text-xs text-slate-400 mb-1">Subtotal</div>
                                <div className="font-bold text-lg text-cyan-600">${Math.round(item. subtotal). toLocaleString()}</div>
                              </div>

                              <div className="text-center min-w-[90px]">
                                <div className="text-xs text-slate-400 mb-1">Entrega</div>
                                <div className="font-medium text-slate-700">{item.entregaEstimada}</div>
                              </div>

                              <select
                                value={item.prioridad}
                                onChange={(e) =>
                                  setPlanItems((prev) =>
                                    prev.map((x) =>
                                      x.partnerId === item.partnerId
                                        ?  { ...x, prioridad: e. target.value as "alta" | "media" | "baja" }
                                        : x
                                    )
                                  )
                                }
                                className={cn(
                                  "h-9 px-3 rounded-lg border-2 text-sm font-semibold",
                                  item.prioridad === "alta"
                                    ?  "bg-red-50 border-red-200 text-red-700"
                                    : item.prioridad === "media"
                                    ?  "bg-amber-50 border-amber-200 text-amber-700"
                                    : "bg-slate-50 border-slate-200 text-slate-600"
                                )}
                              >
                                <option value="alta">Alta</option>
                                <option value="media">Media</option>
                                <option value="baja">Baja</option>
                              </select>

                              <button
                                onClick={() => setPlanItems((prev) => prev.filter((x) => x.partnerId !== item.partnerId))}
                                className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-24 h-24 rounded-full bg-cyan-100 flex items-center justify-center mb-6">
                      <ShoppingCart className="w-12 h-12 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700 mb-2">Plan de compra vacío</h3>
                    <p className="text-slate-500 text-center max-w-md mb-6">
                      Agrega proveedores desde la lista haciendo clic en el botón + para construir tu plan
                    </p>
                    <button
                      onClick={() => setViewMode("intelligence")}
                      className="px-6 py-3 rounded-xl bg-cyan-600 text-white font-bold flex items-center gap-2 hover:bg-cyan-700 shadow-lg"
                    >
                      <Brain className="w-5 h-5" />
                      Explorar Partners
                    </button>
                  </div>
                )}
              </div>

              {planItems.length > 0 && (
                <div className="shrink-0 p-6 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-cyan-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-10">
                      <div>
                        <div className="text-sm text-slate-500 mb-1">Subtotal</div>
                        <div className="text-3xl font-black text-slate-900">
                          ${planItems.reduce((acc, item) => acc + item.subtotal, 0).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 mb-1">Ahorro estimado</div>
                        <div className="text-3xl font-black text-emerald-600">
                          -${Math.round(planItems.reduce((acc, item) => acc + item.subtotal, 0) * 0.12).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-500 mb-1">Proveedores</div>
                        <div className="text-3xl font-black text-slate-900">{planItems.length}</div>
                      </div>
                    </div>

                    <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold text-lg flex items-center gap-3 hover:from-cyan-600 hover:to-teal-700 shadow-xl transition-all">
                      <Send className="w-6 h-6" />
                      Enviar Solicitudes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* ══════════════════════════════════════════════════════════════════════
            RIGHT PANEL - PARTNER DETAIL
        ══════════════════════════════════════════════════════════════════════ */}
        {selectedPartner && viewMode !== "plan" && (
          <aside className="w-[420px] shrink-0 border-l border-slate-200 bg-white flex flex-col overflow-hidden">
            {/* Header */}
            <div className="shrink-0 p-5 border-b border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setSelectedId(null)}
                  className="text-slate-500 hover:text-slate-700 flex items-center gap-1 text-sm font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Cerrar
                </button>
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div
                    className={cn(
                      "w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg",
                      getTier(selectedPartner.tier). bg
                    )}
                  >
                    {selectedPartner.iniciales}
                  </div>
                  {selectedPartner.isOnline && (
                    <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-[3px] border-white shadow-md" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-slate-900 truncate">{selectedPartner.nombre}</h2>
                    {selectedPartner. verificado && <Verified className="w-5 h-5 text-teal-500" />}
                  </div>
                  <p className="text-sm text-slate-500 mb-3">{selectedPartner.especialidad}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-lg text-xs font-bold",
                        selectedPartner.tier === "platinum"
                          ?  "bg-slate-800 text-white"
                          : selectedPartner.tier === "gold"
                          ? "bg-amber-500 text-white"
                          : "bg-teal-500 text-white"
                      )}
                    >
                      {getTier(selectedPartner.tier).label}
                    </span>
                    {selectedPartner.isOnline && (
                      <span className="flex items-center gap-1. 5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-1 rounded-lg">
                        <CircleDot className="w-3 h-3" />
                        En línea
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Score */}
            <div className="shrink-0 p-5 border-b border-slate-100 bg-gradient-to-r from-cyan-50 to-teal-50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-cyan-600" />
                  Puntuación IA
                </span>
                <span className="text-3xl font-black text-cyan-600">{selectedPartner.score}</span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-teal-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${selectedPartner.score}%` }}
                />
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Quick Stats */}
              <div className="p-5 border-b border-slate-100">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Métricas Clave</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Star, label: "Rating", value: selectedPartner.rating. toString(), sub: `${selectedPartner.numResenias} reseñas`, iconColor: "text-amber-500", bgColor: "bg-amber-50" },
                    { icon: TrendingUp, label: "Cumplimiento", value: `${selectedPartner. tasaCumplimiento}%`, sub: "a tiempo", iconColor: "text-emerald-500", bgColor: "bg-emerald-50" },
                    { icon: Timer, label: "Entrega", value: selectedPartner.tiempoEntrega, sub: "estimado", iconColor: "text-blue-500", bgColor: "bg-blue-50" },
                    { icon: DollarSign, label: "Precio", value: `$${Math.round(selectedPartner.precioPromedio * (1 - selectedPartner.descuento / 100))}`, sub: selectedPartner.descuento > 0 ? `-${selectedPartner.descuento}%` : "promedio", iconColor: "text-cyan-500", bgColor: "bg-cyan-50" },
                  ]. map((stat, i) => (
                    <div key={i} className={cn("p-4 rounded-xl", stat.bgColor)}>
                      <div className="flex items-center gap-2 mb-2">
                        <stat.icon className={cn("w-4 h-4", stat.iconColor)} />
                        <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
                      </div>
                      <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                      <div className="text-xs text-slate-400">{stat.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock Status */}
              <div className="p-5 border-b border-slate-100">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Disponibilidad</h4>
                <div
                  className={cn(
                    "p-5 rounded-2xl border-2",
                    selectedPartner.stockDisponible
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-amber-50 border-amber-200"
                  )}
                >
                  <div className="flex items-start gap-4">
                    {selectedPartner.stockDisponible ? (
                      <>
                        <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                          <CheckCircle className="w-7 h-7 text-emerald-600" />
                        </div>
                        <div>
                          <div className="font-bold text-emerald-800 text-lg mb-1">Stock Disponible</div>
                          <div className="text-sm text-emerald-600">
                            Aproximadamente <span className="font-bold">{selectedPartner. stockCantidad}</span> unidades disponibles para envío inmediato
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                          <AlertTriangle className="w-7 h-7 text-amber-600" />
                        </div>
                        <div>
                          <div className="font-bold text-amber-800 text-lg mb-1">Stock Limitado</div>
                          <div className="text-sm text-amber-600">
                            Disponibilidad reducida. Se recomienda contactar para confirmar existencias. 
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="p-5 border-b border-slate-100">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Información de Empresa</h4>
                <div className="space-y-3">
                  {[
                    { icon: MapPin, label: "Dirección", value: selectedPartner.direccion },
                    { icon: Globe, label: "Ubicación", value: selectedPartner.ubicacion },
                    { icon: Building2, label: "Años operando", value: `${selectedPartner. añosOperando} años en el mercado` },
                    { icon: Users, label: "Empleados", value: `${selectedPartner.empleados} colaboradores` },
                    { icon: Handshake, label: "Transacciones", value: `${selectedPartner. transaccionesExitosas. toLocaleString()} exitosas` },
                    { icon: BarChart3, label: "Volumen mensual", value: selectedPartner.volumenMensual },
                  ]. map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
                        <item.icon className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-slate-400 font-medium mb-0. 5">{item. label}</div>
                        <div className="text-sm font-semibold text-slate-800">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {selectedPartner.certificaciones. length > 0 && (
                <div className="p-5 border-b border-slate-100">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Certificaciones</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPartner. certificaciones.map((cert, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-2 px-4 py-2. 5 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-semibold border border-emerald-200"
                      >
                        <BadgeCheck className="w-4 h-4" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Industries & Products */}
              <div className="p-5 border-b border-slate-100">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Industrias</h4>
                <div className="flex flex-wrap gap-2 mb-5">
                  {selectedPartner.industrias.map((ind, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium"
                    >
                      <Factory className="w-4 h-4 text-slate-400" />
                      {ind}
                    </span>
                  ))}
                </div>

                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Productos y Servicios</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPartner.categorias.map((cat, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-cyan-50 text-cyan-700 rounded-xl text-sm font-medium border border-cyan-200"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="p-5">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 border border-cyan-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shrink-0 shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-cyan-900 mb-2">Análisis de Compatibilidad</h4>
                      <p className="text-sm text-cyan-700 leading-relaxed">
                        Este partner tiene un <span className="font-bold text-cyan-800">{selectedPartner. score}% de compatibilidad</span> con tu perfil. 
                        {selectedPartner.score >= 85
                          ? " Altamente recomendado para tus necesidades.  Excelente historial de cumplimiento."
                          : selectedPartner.score >= 70
                          ? " Buen candidato para considerar.  Evalúa su especialidad contra tus requerimientos."
                          : " Considera evaluar otras opciones que puedan ajustarse mejor. "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Actions */}
            <div className="shrink-0 p-5 border-t border-slate-200 bg-white">
              <div className="flex gap-3 mb-3">
                <button
                  onClick={() => addToPlan(selectedPartner)}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold flex items-center justify-center gap-2 hover:from-cyan-600 hover:to-teal-700 shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Agregar al Plan
                </button>
                <button
                  onClick={() => toggleRouteSelection(selectedPartner. id)}
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                    selectedForRoute. has(selectedPartner. id)
                      ? "bg-cyan-500 text-white shadow-lg"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  <Route className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-2">
                {getConnectionStatus(selectedPartner. id) === "connected" ?  (
                  <>
                    <button className="flex-1 h-11 rounded-xl bg-slate-100 text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-200">
                      <Phone className="w-4 h-4" />
                      Llamar
                    </button>
                    <button className="flex-1 h-11 rounded-xl bg-slate-100 text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-200">
                      <MessageCircle className="w-4 h-4" />
                      Mensaje
                    </button>
                  </>
                ) : getConnectionStatus(selectedPartner.id) === "pending" ? (
                  <>
                    <button
                      onClick={() => navigate(`/proveedor/${selectedPartner. id}`)}
                      className="flex-1 h-11 rounded-xl bg-slate-100 text-slate-700 font-semibold flex items-center justify-center gap-2 hover:bg-slate-200"
                    >
                      <Eye className="w-4 h-4" />
                      Ver Perfil
                    </button>
                    <button
                      onClick={() => {
                        setPendingRequests((prev) => {
                          const next = new Set(prev);
                          next.delete(selectedPartner. id);
                          return next;
                        });
                      }}
                      className="flex-1 h-11 rounded-xl bg-amber-100 text-amber-700 font-semibold flex items-center justify-center gap-2 hover:bg-amber-200"
                    >
                      <X className="w-4 h-4" />
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setPendingRequests((prev) => new Set([...prev, selectedPartner.id]))}
                      className="flex-1 h-11 rounded-xl bg-cyan-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-cyan-700"
                    >
                      <UserPlus className="w-4 h-4" />
                      Conectar
                    </button>
                    <button
                      onClick={() => navigate(`/proveedor/${selectedPartner.id}`)}
                      className="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          STYLES
      ════════════════════════════════════════════════════════════════════════ */}
      <style>{`
        .premium-marker-wrapper {
          background: transparent ! important;
          border: none !important;
        }

        .premium-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-marker:hover {
          transform: translateY(-8px) scale(1.05);
          z-index: 1000 !important;
        }

        .premium-marker.selected {
          transform: translateY(-8px) scale(1.1);
          z-index: 1001 !important;
        }

        . premium-marker . ai-crown {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #06b6d4, #0d9488);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.5);
          z-index: 10;
          animation: crown-float 2s ease-in-out infinite;
        }

        @keyframes crown-float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-4px); }
        }

        .premium-marker . route-number {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 13px;
          font-weight: 700;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.5);
          z-index: 10;
        }

        .premium-marker .marker-body {
          width: 60px;
          height: 60px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border: 4px solid white;
          transition: all 0. 3s ease;
        }

        .premium-marker. selected .marker-body {
          border-color: #06b6d4;
          box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.25), 0 12px 32px rgba(0, 0, 0, 0. 2) ! important;
        }

        .premium-marker.in-route .marker-body {
          border-color: #06b6d4;
        }

        .premium-marker . initials {
          color: white;
          font-weight: 700;
          font-size: 20px;
          letter-spacing: -0.5px;
        }

        .premium-marker . pulse-ring {
          position: absolute;
          inset: -8px;
          border-radius: 28px;
          background: rgba(34, 197, 94, 0.25);
          animation: pulse-ring 2s ease-out infinite;
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 1; }
          100% { transform: scale(1. 4); opacity: 0; }
        }

        .premium-marker .online-indicator {
          position: absolute;
          bottom: -3px;
          right: -3px;
          width: 18px;
          height: 18px;
          background: #22c55e;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(34, 197, 94, 0. 5);
        }

        .premium-marker .verified-badge {
          position: absolute;
          top: -3px;
          left: -3px;
          width: 22px;
          height: 22px;
          background: linear-gradient(135deg, #14b8a6, #0d9488);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(20, 184, 166, 0.5);
        }

        .premium-marker .marker-label {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: white;
          padding: 6px 12px;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0. 12);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .premium-marker .name {
          font-size: 12px;
          font-weight: 600;
          color: #1e293b;
          max-width: 70px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .premium-marker .score-badge {
          font-size: 11px;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          padding: 3px 8px;
          border-radius: 8px;
        }

        .premium-marker .marker-pointer {
          width: 0;
          height: 0;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-top: 14px solid white;
          margin-top: -2px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        . premium-marker. selected .marker-pointer {
          border-top-color: #06b6d4;
        }

        /* Route animation */
        .route-animated {
          animation: route-dash 15s linear infinite;
        }

        @keyframes route-dash {
          to { stroke-dashoffset: -1000; }
        }

        .leaflet-container {
          font-family: inherit;
          background: #f8fafc;
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}