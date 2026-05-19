import type {
  CooperativeActivity,
  CooperativeAgreement,
  CooperativeDocument,
  CooperativeKpi,
  CooperativeOpportunity,
  CooperativeParticipant,
  Contribution,
  DistributionPlan,
  NegotiationMessage,
  PostAgreementService,
} from "@/types/cooperatives.types";

export const cooperativeOpportunitiesMock: CooperativeOpportunity[] = [
  {
    id: "coop-1001",
    title: "Compra conjunta de denim premium",
    description: "Boutiques y talleres consolidan volumen de mezclilla premium para asegurar costo por rollo, tonos consistentes y entrega antes de la colección de otoño.",
    type: "joint_purchase",
    status: "in_agreement",
    creatorCompany: "Atelier Norte",
    category: "Textiles",
    targetAmount: 520000,
    currentAmount: 406000,
    requestedParticipants: 5,
    currentParticipants: 4,
    location: "Ciudad de México y Bajío",
    deadline: "2026-06-18",
    expectedBenefit: "Ahorro estimado de 14% y disponibilidad garantizada para prendas clave.",
    requirements: ["Pedido mínimo 80 rollos", "Muestras de tono aprobadas", "Pago contra acuerdo firmado"],
    tags: ["denim", "temporada", "compra_volumen"],
    relatedInventoryItems: ["Denim Indigo 12oz", "Forro Algodon Premium"],
    createdAt: "2026-05-02",
    updatedAt: "2026-05-17",
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Rack de prendas de mezclilla y textiles para compra por volumen",
  },
  {
    id: "coop-1002",
    title: "Venta conjunta para pedido corporativo de uniformes",
    description: "Agrupar inventario y capacidad de confección para cubrir un pedido grande de uniformes ejecutivos sin saturar un solo taller.",
    type: "joint_sale",
    status: "negotiation",
    creatorCompany: "Moda Urbana MX",
    category: "Uniformes",
    targetAmount: 840000,
    currentAmount: 510000,
    requestedParticipants: 4,
    currentParticipants: 2,
    location: "Monterrey y Guadalajara",
    deadline: "2026-06-05",
    expectedBenefit: "Acceso a contrato empresarial con reparto de producción por capacidad.",
    requirements: ["Ficha técnica aprobada", "Entrega semanal", "Capacidad mínima 300 prendas"],
    tags: ["uniformes", "venta_conjunta", "b2b"],
    relatedInventoryItems: ["Blazer Ejecutivo", "Pantalon Sastre", "Camisa Oxford"],
    createdAt: "2026-05-06",
    updatedAt: "2026-05-16",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Prendas básicas listas para producción de uniformes corporativos",
  },
  {
    id: "coop-1003",
    title: "Campaña compartida de temporada primavera",
    description: "Campaña digital y escaparates compartidos para impulsar vestidos, lino y accesorios de temporada entre tiendas aliadas.",
    type: "shared_campaign",
    status: "published",
    creatorCompany: "Boutique Roma",
    category: "Marketing de moda",
    targetAmount: 320000,
    currentAmount: 118000,
    requestedParticipants: 6,
    currentParticipants: 2,
    location: "CDMX, Puebla, Querétaro",
    deadline: "2026-06-12",
    expectedBenefit: "Mayor alcance digital y menor costo de adquisición por colección.",
    requirements: ["Guía de marca disponible", "Inventario para 30 dias", "Aprobación de visuales"],
    tags: ["campaña", "moda", "marca_compartida"],
    relatedInventoryItems: ["Vestido Lino", "Bolsa Tote", "Sandalia Piel"],
    createdAt: "2026-05-10",
    updatedAt: "2026-05-15",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Escaparate de boutique con ropa de temporada para campaña compartida",
  },
  {
    id: "coop-1004",
    title: "Distribución compartida para boutiques del centro",
    description: "Red de reparto para mover prendas entre tiendas, puntos de preparación y clientes finales reduciendo viajes vacíos.",
    type: "shared_distribution",
    status: "active",
    creatorCompany: "Ruta Boutique MX",
    category: "Distribución retail",
    targetAmount: 460000,
    currentAmount: 460000,
    requestedParticipants: 4,
    currentParticipants: 4,
    location: "CDMX - Puebla - Querétaro",
    deadline: "2026-05-30",
    expectedBenefit: "Reducción de 16% en costo logístico semanal.",
    requirements: ["Ventanas horarias compatibles", "Seguimiento activo", "Ordenes confirmadas"],
    tags: ["entrega", "seguimiento", "rutas"],
    relatedInventoryItems: ["Servicio Entrega Boutique", "Etiqueta RFID Prenda"],
    createdAt: "2026-04-22",
    updatedAt: "2026-05-18",
    imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Bolsas y paquetes de tienda listos para distribución boutique",
  },
  {
    id: "coop-1005",
    title: "Asociación logística para entregas el mismo día",
    description: "Contratar rutas urbanas compartidas para entregas el mismo día de prendas premium y cambios de talla.",
    type: "logistics_partnership",
    status: "accepted",
    creatorCompany: "Distrito Moda",
    category: "Logística retail",
    targetAmount: 380000,
    currentAmount: 310000,
    requestedParticipants: 3,
    currentParticipants: 3,
    location: "Zona Metropolitana",
    deadline: "2026-06-01",
    expectedBenefit: "Mejor experiencia de cliente y menor costo por entrega urgente.",
    requirements: ["Entrega el mismo día", "Seguimiento activo", "Seguro para prendas premium"],
    tags: ["entrega_mismo_dia", "logistica", "retail"],
    relatedInventoryItems: ["Servicio Entrega Boutique", "Seguro Prenda Premium"],
    createdAt: "2026-05-04",
    updatedAt: "2026-05-17",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Prendas en rack para operación logística de entregas de moda",
  },
  {
    id: "coop-1006",
    title: "Operación activa de venta digital multitienda",
    description: "Acuerdo activo con catálogo compartido, entrega, venta digital y documentos de reparto para tiendas de ropa aliadas.",
    type: "shared_distribution",
    status: "in_delivery",
    creatorCompany: "Colectivo Denim",
    category: "Post-acuerdo",
    targetAmount: 690000,
    currentAmount: 690000,
    requestedParticipants: 4,
    currentParticipants: 4,
    location: "México Centro",
    deadline: "2026-05-28",
    expectedBenefit: "Venta digital compartida y reparto medido por aportación de inventario.",
    requirements: ["Acuerdo firmado", "SKU homologados", "Documentos cargados"],
    tags: ["post_acuerdo", "entrega", "venta_digital"],
    relatedInventoryItems: ["Jeans Corte Recto", "Chamarra Denim", "Licencia Portal B2B"],
    createdAt: "2026-04-12",
    updatedAt: "2026-05-18",
    imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Colección de ropa para venta digital multitienda",
  },
];

export const cooperativeParticipantsMock: CooperativeParticipant[] = [
  { id: "part-001", opportunityId: "coop-1001", companyName: "Atelier Norte", contactName: "Marina Solis", role: "creator", contributionAmount: 150000, contributionType: "Capital", status: "active", joinedAt: "2026-05-02" },
  { id: "part-002", opportunityId: "coop-1001", companyName: "Textiles Leon", contactName: "Carlos Medina", role: "seller", contributionAmount: 116000, contributionType: "Textil", status: "accepted", joinedAt: "2026-05-05" },
  { id: "part-003", opportunityId: "coop-1001", companyName: "Boutique Roma", contactName: "Rosa Chi", role: "buyer", contributionAmount: 82000, contributionType: "Capital", status: "accepted", joinedAt: "2026-05-07" },
  { id: "part-004", opportunityId: "coop-1001", companyName: "Ruta Boutique MX", contactName: "Enrique Polanco", role: "logistics", contributionAmount: 58000, contributionType: "Logistica", status: "interested", joinedAt: "2026-05-09" },
  { id: "part-005", opportunityId: "coop-1002", companyName: "Moda Urbana MX", contactName: "Daniel Escalante", role: "creator", contributionAmount: 320000, contributionType: "Inventario", status: "active", joinedAt: "2026-05-06" },
  { id: "part-006", opportunityId: "coop-1002", companyName: "Sastre Colectivo", contactName: "Jorge Poot", role: "seller", contributionAmount: 190000, contributionType: "Confeccion", status: "interested", joinedAt: "2026-05-10" },
  { id: "part-007", opportunityId: "coop-1003", companyName: "Boutique Roma", contactName: "Rosa Chi", role: "creator", contributionAmount: 68000, contributionType: "Marketing", status: "active", joinedAt: "2026-05-10" },
  { id: "part-008", opportunityId: "coop-1003", companyName: "Lino Club", contactName: "Laura Uc", role: "seller", contributionAmount: 50000, contributionType: "Inventario", status: "interested", joinedAt: "2026-05-12" },
  { id: "part-009", opportunityId: "coop-1004", companyName: "Ruta Boutique MX", contactName: "Enrique Polanco", role: "creator", contributionAmount: 160000, contributionType: "Logistica", status: "active", joinedAt: "2026-04-22" },
  { id: "part-010", opportunityId: "coop-1004", companyName: "Atelier Norte", contactName: "Marina Solis", role: "buyer", contributionAmount: 110000, contributionType: "Capital", status: "active", joinedAt: "2026-04-24" },
  { id: "part-011", opportunityId: "coop-1004", companyName: "Distrito Moda", contactName: "Ana Rivera", role: "buyer", contributionAmount: 105000, contributionType: "Capital", status: "active", joinedAt: "2026-04-25" },
  { id: "part-012", opportunityId: "coop-1004", companyName: "TrackModa Logistics", contactName: "Diego Paredes", role: "service_provider", contributionAmount: 85000, contributionType: "Tracking", status: "active", joinedAt: "2026-04-25" },
  { id: "part-013", opportunityId: "coop-1005", companyName: "Distrito Moda", contactName: "Ana Rivera", role: "creator", contributionAmount: 140000, contributionType: "Capital", status: "accepted", joinedAt: "2026-05-04" },
  { id: "part-014", opportunityId: "coop-1005", companyName: "Express Closet", contactName: "Raul Ortega", role: "service_provider", contributionAmount: 92000, contributionType: "Entrega", status: "accepted", joinedAt: "2026-05-06" },
  { id: "part-015", opportunityId: "coop-1005", companyName: "Ruta Boutique MX", contactName: "Enrique Polanco", role: "logistics", contributionAmount: 78000, contributionType: "Logistica", status: "accepted", joinedAt: "2026-05-08" },
  { id: "part-016", opportunityId: "coop-1006", companyName: "Colectivo Denim", contactName: "Marina Solis", role: "creator", contributionAmount: 240000, contributionType: "Capital", status: "active", joinedAt: "2026-04-12" },
  { id: "part-017", opportunityId: "coop-1006", companyName: "Moda Urbana MX", contactName: "Daniel Escalante", role: "seller", contributionAmount: 190000, contributionType: "Inventario", status: "active", joinedAt: "2026-04-14" },
  { id: "part-018", opportunityId: "coop-1006", companyName: "Ruta Boutique MX", contactName: "Enrique Polanco", role: "logistics", contributionAmount: 140000, contributionType: "Entrega", status: "active", joinedAt: "2026-04-15" },
  { id: "part-019", opportunityId: "coop-1006", companyName: "ModaCloud SaaS", contactName: "Paula Ibarra", role: "service_provider", contributionAmount: 120000, contributionType: "Venta digital", status: "active", joinedAt: "2026-04-16" },
];

export const contributionsMock: Contribution[] = cooperativeParticipantsMock.map((participant, index) => ({
  id: `cont-${String(index + 1).padStart(3, "0")}`,
  participantId: participant.id,
  type:
    participant.role === "logistics"
      ? "logistics"
      : ["Inventario", "Textil", "Confeccion"].includes(participant.contributionType)
        ? "inventory"
        : participant.contributionType === "Marketing"
          ? "marketing"
          : participant.role === "service_provider"
            ? "service"
            : "capital",
  description: `${participant.contributionType} comprometido por ${participant.companyName}`,
  amount: participant.contributionAmount,
  quantity: Math.max(1, Math.round(participant.contributionAmount / 10000)),
  estimatedValue: participant.contributionAmount,
}));

const buildDistributionPlan = (opportunityId: string): DistributionPlan => {
  const participants = cooperativeParticipantsMock.filter((participant) => participant.opportunityId === opportunityId);
  const totalValue = participants.reduce((sum, participant) => sum + participant.contributionAmount, 0);
  return {
    id: `dist-${opportunityId}`,
    rule: "by_contribution",
    description: "Reparto proporcional segun inventario, capital y capacidad operativa validada por participante.",
    totalValue,
    calculatedAt: "2026-05-18",
    items: participants.map((participant) => ({
      participantId: participant.id,
      label: participant.companyName,
      percentage: totalValue ? Math.round((participant.contributionAmount / totalValue) * 100) : 0,
      allocatedValue: participant.contributionAmount,
      allocatedQuantity: Math.max(1, Math.round(participant.contributionAmount / 10000)),
    })),
  };
};

export const postAgreementServicesMock: PostAgreementService[] = [
  { id: "svc-001", type: "delivery", title: "Entrega boutique", description: "Rutas compartidas para entregas el mismo día, cambios de talla y devoluciones.", status: "active", estimatedCost: 52000, provider: "Ruta Boutique MX" },
  { id: "svc-002", type: "digital_sale", title: "Venta digital multitienda", description: "Catálogo compartido para vender colecciones de varias boutiques en una sola experiencia.", status: "available", estimatedCost: 38000, provider: "ModaCloud SaaS" },
  { id: "svc-003", type: "distribution_calculation", title: "Cálculo de reparto", description: "Asignación proporcional de ventas, prendas y costos por aportación.", status: "active", estimatedCost: 14000, provider: "péek Engine" },
  { id: "svc-004", type: "tracking", title: "Seguimiento de pedidos", description: "Monitoreo de estado por pedido, tienda, talla y nivel de servicio.", status: "pending", estimatedCost: 19000, provider: "TrackModa Logistics" },
  { id: "svc-005", type: "documents", title: "Documentos y comprobantes", description: "Repositorio de acuerdos, fichas técnicas, comprobantes y evidencias de entrega.", status: "available", estimatedCost: 9000, provider: "péek Docs" },
];

export const cooperativeDocumentsMock: CooperativeDocument[] = [
  { id: "doc-001", opportunityId: "coop-1001", title: "Acuerdo preliminar de compra de denim", type: "preliminary_agreement", status: "draft", updatedAt: "2026-05-17" },
  { id: "doc-002", opportunityId: "coop-1001", title: "Comprobante de aportaciones iniciales", type: "receipt", status: "ready", updatedAt: "2026-05-16" },
  { id: "doc-003", opportunityId: "coop-1006", title: "Evidencia de entrega parcial multitienda", type: "delivery_evidence", status: "ready", updatedAt: "2026-05-18" },
  { id: "doc-004", opportunityId: "coop-1006", title: "Cálculo de reparto por inventario vendido", type: "distribution_calculation", status: "signed", updatedAt: "2026-05-18" },
];

export const cooperativeActivitiesMock: CooperativeActivity[] = [
  { id: "act-001", opportunityId: "coop-1001", title: "Nueva propuesta de precio", description: "Textiles Leon ajusto precio por volumen de denim consolidado.", date: "2026-05-18", actor: "Carlos Medina" },
  { id: "act-002", opportunityId: "coop-1001", title: "Revisión de muestras programada", description: "Se agendó validación de tono, gramaje y ficha técnica.", date: "2026-05-17", actor: "Marina Solis" },
  { id: "act-003", opportunityId: "coop-1004", title: "Ruta compartida activa", description: "Primer ciclo de entregas boutique completado con seguimiento.", date: "2026-05-18", actor: "Enrique Polanco" },
  { id: "act-004", opportunityId: "coop-1006", title: "Catalogo digital habilitado", description: "Se cargaron SKUs, tallas y reglas de reparto.", date: "2026-05-18", actor: "Paula Ibarra" },
  { id: "act-005", opportunityId: "coop-1002", title: "Nuevo taller interesado", description: "Sastre Colectivo confirma capacidad parcial de confección.", date: "2026-05-16", actor: "Jorge Poot" },
  { id: "act-006", opportunityId: "coop-1003", title: "Brief creativo aprobado", description: "Las boutiques alinearon visuales de campaña primavera.", date: "2026-05-15", actor: "Laura Uc" },
];

export const negotiationMessagesMock: NegotiationMessage[] = [
  { id: "msg-001", opportunityId: "coop-1001", participantId: "part-001", author: "Marina Solis", companyName: "Atelier Norte", message: "Podemos confirmar 150k si el proveedor mantiene tono y gramaje en los tres lotes.", sentAt: "2026-05-17 10:30" },
  { id: "msg-002", opportunityId: "coop-1001", participantId: "part-002", author: "Carlos Medina", companyName: "Textiles Leon", message: "Acepto el precio por volumen si cerramos entrega antes del 18 de junio.", sentAt: "2026-05-17 11:05" },
  { id: "msg-003", opportunityId: "coop-1002", participantId: "part-006", author: "Jorge Poot", companyName: "Sastre Colectivo", message: "Tenemos capacidad parcial, podemos cubrir 300 prendas semanales.", sentAt: "2026-05-16 15:20" },
  { id: "msg-004", opportunityId: "coop-1006", participantId: "part-019", author: "Paula Ibarra", companyName: "ModaCloud SaaS", message: "El catálogo digital queda listo para pruebas con tallas y SKUs homologados.", sentAt: "2026-05-18 09:40" },
];

export const cooperativeAgreementsMock: CooperativeAgreement[] = cooperativeOpportunitiesMock
  .filter((opportunity) => ["in_agreement", "active", "in_delivery", "completed"].includes(opportunity.status))
  .map((opportunity) => {
    const participants = cooperativeParticipantsMock.filter((participant) => participant.opportunityId === opportunity.id);
    return {
      id: `agr-${opportunity.id}`,
      opportunityId: opportunity.id,
      title: `Acuerdo - ${opportunity.title}`,
      status: opportunity.status === "in_agreement" ? "review" : opportunity.status === "completed" ? "closed" : "active",
      participants,
      contributions: contributionsMock.filter((contribution) =>
        participants.some((participant) => participant.id === contribution.participantId),
      ),
      distributionPlan: buildDistributionPlan(opportunity.id),
      postAgreementServices: opportunity.status === "in_delivery" || opportunity.status === "active" ? postAgreementServicesMock : postAgreementServicesMock.slice(1, 4),
      documents: cooperativeDocumentsMock.filter((document) => document.opportunityId === opportunity.id),
      activities: cooperativeActivitiesMock.filter((activity) => activity.opportunityId === opportunity.id),
      createdAt: opportunity.updatedAt,
    };
  });

export const cooperativeKpisMock: CooperativeKpi[] = [
  { id: "active_opportunities", label: "Colaboraciones activas", value: 4, formattedValue: "24", hint: "Boutiques, talleres y aliados conectados" },
  { id: "negotiating_agreements", label: "Acuerdos en negociacion", value: 3, formattedValue: "8", hint: "Solicitudes pendientes de aprobacion" },
  { id: "estimated_value", label: "Valor cooperativo estimado", value: 3210000, formattedValue: "$3,210,000", hint: "Pipeline de moda compartida" },
  { id: "post_services", label: "Servicios post-acuerdo", value: 5, formattedValue: "5", hint: "Entrega, venta digital y documentos" },
];
