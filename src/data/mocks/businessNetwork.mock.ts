import type {
  NetworkAssistantMessage,
  NetworkPartner,
  NetworkProject,
  NetworkQuickAction,
  NetworkSuggestion,
  NetworkSummary,
  ProductionChainStep,
} from "@/types/businessNetwork.types";

export const networkProjectMock: NetworkProject = {
  id: "network-project-001",
  title: "Crear coleccion regional de prendas bordadas",
  description: "Red para producir, empacar, distribuir y vender 500 prendas bordadas con identidad regional.",
  quantity: 500,
  budgetMin: 80000,
  budgetMax: 120000,
  targetLocation: "Cancun / Quintana Roo",
  category: "Moda regional",
  status: "optimized",
};

export const recommendedPartnersMock: NetworkPartner[] = [
  {
    id: "partner-001",
    name: "Textiles Leon",
    type: "supplier",
    description: "Proveedor de denim, algodon y telas por volumen para produccion textil.",
    location: "Leon, Guanajuato",
    rating: 4.9,
    matchScore: 98,
    priceRange: "$80 - $120 / metro",
    imageUrl: "https://images.unsplash.com/photo-1601056639638-c53c50e13ead?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Rollos de tela para manufactura",
    tags: ["tela", "mayoreo", "denim"],
    estimatedLeadTime: "3-5 dias",
    connected: true,
  },
  {
    id: "partner-002",
    name: "Taller Mayab",
    type: "manufacturer",
    description: "Taller de confeccion para prendas bordadas, ajustes y produccion corta.",
    location: "Valladolid, Yucatan",
    rating: 4.7,
    matchScore: 94,
    priceRange: "$55 - $120 / pieza",
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Taller de confeccion",
    tags: ["confeccion", "bordado"],
    estimatedLeadTime: "7-9 dias",
    connected: true,
  },
  {
    id: "partner-003",
    name: "BioPack Peninsula",
    type: "packaging",
    description: "Empaque biodegradable para retail, boutiques y envios locales.",
    location: "Cancun, Quintana Roo",
    rating: 4.8,
    matchScore: 89,
    priceRange: "$2 - $5 / caja",
    imageUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Cajas de empaque",
    tags: ["empaque", "sostenible"],
    estimatedLeadTime: "2-4 dias",
    connected: false,
  },
  {
    id: "partner-004",
    name: "Ruta Boutique MX",
    type: "logistics",
    description: "Rutas compartidas para entregas locales y distribucion boutique.",
    location: "CDMX / Puebla",
    rating: 4.6,
    matchScore: 91,
    priceRange: "$25 - $45 / entrega",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Operacion logistica",
    tags: ["logistica", "ultima_milla"],
    estimatedLeadTime: "24-48 horas",
    connected: false,
  },
  {
    id: "partner-005",
    name: "Boutique Roma",
    type: "retail_partner",
    description: "Socio comercial para validar demanda y abrir canal de venta compartida.",
    location: "CDMX",
    rating: 4.8,
    matchScore: 87,
    priceRange: "Comision 15%",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Interior de boutique",
    tags: ["venta", "moda", "retail"],
    estimatedLeadTime: "1-2 dias",
    connected: true,
  },
];

export const productionChainStepsMock: ProductionChainStep[] = [
  { id: "chain-001", label: "Idea", partnerName: "Proyecto definido", type: "service_provider", status: "completed", description: "Coleccion validada." },
  { id: "chain-002", label: "Proveedor", partnerName: "Textiles Leon", type: "supplier", status: "optimized", description: "Tela seleccionada." },
  { id: "chain-003", label: "Manufactura", partnerName: "Taller Mayab", type: "manufacturer", status: "optimized", description: "Capacidad compatible." },
  { id: "chain-004", label: "Empaque", partnerName: "BioPack Peninsula", type: "packaging", status: "pending", description: "Confirmar medidas." },
  { id: "chain-005", label: "Distribucion", partnerName: "Pendiente", type: "logistics", status: "unresolved", description: "Falta cerrar ruta compartida." },
  { id: "chain-006", label: "Venta", partnerName: "Boutique Roma", type: "retail_partner", status: "completed", description: "Canal listo." },
];

export const networkSuggestionsMock: NetworkSuggestion[] = [
  { id: "suggestion-001", title: "Eficiencia de costos", description: "Textiles Leon ofrece menor costo por metro.", category: "Costo", priority: "high", timeAgo: "hace 8 min", actionLabel: "Revisar proveedor" },
  { id: "suggestion-002", title: "Cadena de suministro", description: "Ruta Boutique MX puede cubrir entregas si se consolida volumen.", category: "Logistica", priority: "medium", timeAgo: "hace 12 min", actionLabel: "Ver ruta" },
  { id: "suggestion-003", title: "Empaque compatible", description: "BioPack Peninsula tiene empaque biodegradable compatible.", category: "Empaque", priority: "medium", timeAgo: "hace 20 min", actionLabel: "Solicitar costo" },
];

export const networkQuickActionsMock: NetworkQuickAction[] = [
  { id: "action-001", title: "Crear solicitud colaborativa", description: "Publicar necesidad para encontrar aliados faltantes.", actionLabel: "Crear solicitud" },
  { id: "action-002", title: "Contactar proveedor", description: "Enviar briefing y volumen estimado.", actionLabel: "Contactar" },
  { id: "action-003", title: "Guardar plan de produccion", description: "Congelar configuracion para seguimiento.", actionLabel: "Guardar plan" },
];

export const networkAssistantMessagesMock: NetworkAssistantMessage[] = [
  { id: "msg-001", role: "assistant", content: "Detecte una red viable. La mayor oportunidad esta en cerrar distribucion compartida para reducir costo de entrega.", createdAt: "2026-05-19T09:20:00" },
  { id: "msg-002", role: "assistant", content: "Puedes contactar a BioPack Peninsula y Ruta Boutique MX como bloque operativo para empaque y entrega.", createdAt: "2026-05-19T09:22:00" },
];

export const networkSummaryMock: NetworkSummary = {
  estimatedLeadTime: "14-18 dias",
  optimizedCost: 83420,
  originalCost: 94100,
  partnersEngaged: 5,
};
