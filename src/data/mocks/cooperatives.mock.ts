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
    title: "Compra conjunta de empaque biocompostable",
    description: "Consolidar volumen de empaque sostenible para reducir costo unitario y asegurar disponibilidad para Q3.",
    type: "joint_purchase",
    status: "in_agreement",
    creatorCompany: "Retail Verde Maya",
    category: "Empaque",
    targetAmount: 420000,
    currentAmount: 318000,
    requestedParticipants: 5,
    currentParticipants: 4,
    location: "Peninsula de Yucatan",
    deadline: "2026-06-18",
    expectedBenefit: "Ahorro estimado de 11% por compra por volumen.",
    requirements: ["Pedido minimo 500 cajas", "Entrega antes de cierre Q3", "Pago contra acuerdo firmado"],
    tags: ["packaging", "bulk", "sostenible"],
    relatedInventoryItems: ["Empaque Biocompostable 1kg", "Bolsa Kraft 25kg"],
    createdAt: "2026-05-02",
    updatedAt: "2026-05-17",
  },
  {
    id: "coop-1002",
    title: "Venta conjunta para pedido hotelero regional",
    description: "Agrupar capacidad de productores para cubrir un pedido de productos regionales de alto volumen.",
    type: "joint_sale",
    status: "negotiation",
    creatorCompany: "EcoMercados del Sur",
    category: "Producto terminado",
    targetAmount: 780000,
    currentAmount: 420000,
    requestedParticipants: 4,
    currentParticipants: 2,
    location: "Cancun y Riviera Maya",
    deadline: "2026-06-05",
    expectedBenefit: "Acceso a pedido enterprise sin saturar capacidad individual.",
    requirements: ["Certificado de lote", "Entrega semanal", "Capacidad minima 250 unidades"],
    tags: ["retail", "hotel", "venta_conjunta"],
    relatedInventoryItems: ["Miel Botanica 500ml", "Kit Campana Verano Sostenible"],
    createdAt: "2026-05-06",
    updatedAt: "2026-05-16",
  },
  {
    id: "coop-1003",
    title: "Campaña compartida de productos regionales",
    description: "Campaña digital y puntos de venta compartidos para impulsar productos de temporada.",
    type: "shared_campaign",
    status: "published",
    creatorCompany: "Coop Granos del Caribe",
    category: "Marketing cooperativo",
    targetAmount: 260000,
    currentAmount: 74000,
    requestedParticipants: 6,
    currentParticipants: 2,
    location: "Yucatan, Campeche, Quintana Roo",
    deadline: "2026-06-12",
    expectedBenefit: "Mayor alcance digital y menor costo de adquisición por marca.",
    requirements: ["Brand kit disponible", "Inventario para 30 dias", "Aprobacion de mensaje conjunto"],
    tags: ["campana", "regional", "co-branding"],
    relatedInventoryItems: ["Kit Campana Verano Sostenible"],
    createdAt: "2026-05-10",
    updatedAt: "2026-05-15",
  },
  {
    id: "coop-1004",
    title: "Distribución compartida zona centro-occidente",
    description: "Pool de reparto para mejorar cobertura y reducir viajes vacios entre aliados.",
    type: "shared_distribution",
    status: "active",
    creatorCompany: "PyME Logistica Delta",
    category: "Distribucion",
    targetAmount: 510000,
    currentAmount: 510000,
    requestedParticipants: 4,
    currentParticipants: 4,
    location: "Merida - Cancun - Chetumal",
    deadline: "2026-05-30",
    expectedBenefit: "Reduccion de 14% en costo logistico semanal.",
    requirements: ["Ventanas horarias compatibles", "Tracking activo", "Ordenes confirmadas"],
    tags: ["delivery", "tracking", "rutas"],
    relatedInventoryItems: ["Servicio Distribucion Ultima Milla", "Etiqueta RFID Caja Master"],
    createdAt: "2026-04-22",
    updatedAt: "2026-05-18",
  },
  {
    id: "coop-1005",
    title: "Asociación logística para cadena fría",
    description: "Contratar sensores y rutas refrigeradas compartidas para productos sensibles.",
    type: "logistics_partnership",
    status: "accepted",
    creatorCompany: "AgroNorte Distribucion",
    category: "Logistica",
    targetAmount: 360000,
    currentAmount: 290000,
    requestedParticipants: 3,
    currentParticipants: 3,
    location: "Cancun y Playa del Carmen",
    deadline: "2026-06-01",
    expectedBenefit: "Menor merma por control de temperatura y tracking conjunto.",
    requirements: ["Cadena fria certificada", "Sensores activos", "SLA de 24 horas"],
    tags: ["cadena_fria", "logistica", "sensores"],
    relatedInventoryItems: ["Sensor IoT Temperatura", "Servicio Distribucion Ultima Milla"],
    createdAt: "2026-05-04",
    updatedAt: "2026-05-17",
  },
  {
    id: "coop-1006",
    title: "Operación activa de reparto y venta digital",
    description: "Acuerdo activo con servicios post-acuerdo para delivery, venta digital y documentos.",
    type: "shared_distribution",
    status: "in_delivery",
    creatorCompany: "Retail Verde Maya",
    category: "Post-acuerdo",
    targetAmount: 640000,
    currentAmount: 640000,
    requestedParticipants: 4,
    currentParticipants: 4,
    location: "Sureste MX",
    deadline: "2026-05-28",
    expectedBenefit: "Servicio compartido habilitado para ejecutar entrega y venta digital.",
    requirements: ["Acuerdo firmado", "SKU homologados", "Documentos cargados"],
    tags: ["post_acuerdo", "delivery", "venta_digital"],
    relatedInventoryItems: ["Miel Botanica 500ml", "Licencia Portal B2B"],
    createdAt: "2026-04-12",
    updatedAt: "2026-05-18",
  },
];

export const cooperativeParticipantsMock: CooperativeParticipant[] = [
  { id: "part-001", opportunityId: "coop-1001", companyName: "Retail Verde Maya", contactName: "Mariana Solis", role: "creator", contributionAmount: 120000, contributionType: "Capital", status: "active", joinedAt: "2026-05-02" },
  { id: "part-002", opportunityId: "coop-1001", companyName: "BioPack Peninsula", contactName: "Carlos Medina", role: "seller", contributionAmount: 88000, contributionType: "Inventario", status: "accepted", joinedAt: "2026-05-05" },
  { id: "part-003", opportunityId: "coop-1001", companyName: "Empaques del Mayab", contactName: "Rosa Chi", role: "seller", contributionAmount: 65000, contributionType: "Inventario", status: "accepted", joinedAt: "2026-05-07" },
  { id: "part-004", opportunityId: "coop-1001", companyName: "PyME Logistica Delta", contactName: "Enrique Polanco", role: "logistics", contributionAmount: 45000, contributionType: "Servicio", status: "interested", joinedAt: "2026-05-09" },
  { id: "part-005", opportunityId: "coop-1002", companyName: "EcoMercados del Sur", contactName: "Daniel Escalante", role: "creator", contributionAmount: 280000, contributionType: "Inventario", status: "active", joinedAt: "2026-05-06" },
  { id: "part-006", opportunityId: "coop-1002", companyName: "Coop Granos del Caribe", contactName: "Jorge Poot", role: "seller", contributionAmount: 140000, contributionType: "Inventario", status: "interested", joinedAt: "2026-05-10" },
  { id: "part-007", opportunityId: "coop-1003", companyName: "Coop Granos del Caribe", contactName: "Jorge Poot", role: "creator", contributionAmount: 40000, contributionType: "Marketing", status: "active", joinedAt: "2026-05-10" },
  { id: "part-008", opportunityId: "coop-1003", companyName: "MicroFoods Tulum", contactName: "Laura Uc", role: "seller", contributionAmount: 34000, contributionType: "Inventario", status: "interested", joinedAt: "2026-05-12" },
  { id: "part-009", opportunityId: "coop-1004", companyName: "PyME Logistica Delta", contactName: "Enrique Polanco", role: "creator", contributionAmount: 180000, contributionType: "Logistica", status: "active", joinedAt: "2026-04-22" },
  { id: "part-010", opportunityId: "coop-1004", companyName: "AgroNorte Distribucion", contactName: "Ana Rivera", role: "buyer", contributionAmount: 110000, contributionType: "Capital", status: "active", joinedAt: "2026-04-24" },
  { id: "part-011", opportunityId: "coop-1004", companyName: "Retail Verde Maya", contactName: "Mariana Solis", role: "buyer", contributionAmount: 120000, contributionType: "Capital", status: "active", joinedAt: "2026-04-25" },
  { id: "part-012", opportunityId: "coop-1004", companyName: "TrackWare Logistics", contactName: "Diego Paredes", role: "service_provider", contributionAmount: 100000, contributionType: "Tracking", status: "active", joinedAt: "2026-04-25" },
  { id: "part-013", opportunityId: "coop-1005", companyName: "AgroNorte Distribucion", contactName: "Ana Rivera", role: "creator", contributionAmount: 130000, contributionType: "Capital", status: "accepted", joinedAt: "2026-05-04" },
  { id: "part-014", opportunityId: "coop-1005", companyName: "Industrial Sensorics MX", contactName: "Raul Ortega", role: "service_provider", contributionAmount: 90000, contributionType: "Equipo", status: "accepted", joinedAt: "2026-05-06" },
  { id: "part-015", opportunityId: "coop-1005", companyName: "PyME Logistica Delta", contactName: "Enrique Polanco", role: "logistics", contributionAmount: 70000, contributionType: "Logistica", status: "accepted", joinedAt: "2026-05-08" },
  { id: "part-016", opportunityId: "coop-1006", companyName: "Retail Verde Maya", contactName: "Mariana Solis", role: "creator", contributionAmount: 220000, contributionType: "Capital", status: "active", joinedAt: "2026-04-12" },
  { id: "part-017", opportunityId: "coop-1006", companyName: "EcoMercados del Sur", contactName: "Daniel Escalante", role: "seller", contributionAmount: 180000, contributionType: "Inventario", status: "active", joinedAt: "2026-04-14" },
  { id: "part-018", opportunityId: "coop-1006", companyName: "PyME Logistica Delta", contactName: "Enrique Polanco", role: "logistics", contributionAmount: 130000, contributionType: "Delivery", status: "active", joinedAt: "2026-04-15" },
  { id: "part-019", opportunityId: "coop-1006", companyName: "NubeComercio SaaS", contactName: "Paula Ibarra", role: "service_provider", contributionAmount: 110000, contributionType: "Venta digital", status: "active", joinedAt: "2026-04-16" },
];

export const contributionsMock: Contribution[] = cooperativeParticipantsMock.map((participant, index) => ({
  id: `cont-${String(index + 1).padStart(3, "0")}`,
  participantId: participant.id,
  type:
    participant.role === "logistics"
      ? "logistics"
      : participant.contributionType === "Inventario"
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
    description: "Reparto proporcional segun aportacion validada por participante.",
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
  { id: "svc-001", type: "delivery", title: "Delivery coordinado", description: "Rutas compartidas con ventanas de entrega sincronizadas.", status: "active", estimatedCost: 48000, provider: "PyME Logistica Delta" },
  { id: "svc-002", type: "digital_sale", title: "Venta digital", description: "Landing B2B para capturar pedidos y distribuir demanda.", status: "available", estimatedCost: 32000, provider: "NubeComercio SaaS" },
  { id: "svc-003", type: "distribution_calculation", title: "Calculo de reparto", description: "Asignacion proporcional de bienes y valores por aportacion.", status: "active", estimatedCost: 12000, provider: "BizFlow Engine" },
  { id: "svc-004", type: "tracking", title: "Seguimiento operativo", description: "Monitoreo de estado, hitos y SLA por participante.", status: "pending", estimatedCost: 18000, provider: "TrackWare Logistics" },
  { id: "svc-005", type: "documents", title: "Documentos y comprobantes", description: "Repositorio de acuerdo, comprobantes y evidencias de entrega.", status: "available", estimatedCost: 9000, provider: "BizFlow Docs" },
];

export const cooperativeDocumentsMock: CooperativeDocument[] = [
  { id: "doc-001", opportunityId: "coop-1001", title: "Acuerdo preliminar de compra conjunta", type: "preliminary_agreement", status: "draft", updatedAt: "2026-05-17" },
  { id: "doc-002", opportunityId: "coop-1001", title: "Comprobante de aportaciones iniciales", type: "receipt", status: "ready", updatedAt: "2026-05-16" },
  { id: "doc-003", opportunityId: "coop-1006", title: "Evidencia de entrega parcial", type: "delivery_evidence", status: "ready", updatedAt: "2026-05-18" },
  { id: "doc-004", opportunityId: "coop-1006", title: "Calculo de reparto version 2", type: "distribution_calculation", status: "signed", updatedAt: "2026-05-18" },
];

export const cooperativeActivitiesMock: CooperativeActivity[] = [
  { id: "act-001", opportunityId: "coop-1001", title: "Nueva propuesta de precio", description: "BioPack Peninsula ajusto precio por volumen consolidado.", date: "2026-05-18", actor: "Carlos Medina" },
  { id: "act-002", opportunityId: "coop-1001", title: "Revision legal programada", description: "Se agendo revision de clausulas de entrega y pago.", date: "2026-05-17", actor: "Mariana Solis" },
  { id: "act-003", opportunityId: "coop-1004", title: "Ruta compartida activa", description: "Primer ciclo de distribucion completado con tracking.", date: "2026-05-18", actor: "Enrique Polanco" },
  { id: "act-004", opportunityId: "coop-1006", title: "Servicio de documentos habilitado", description: "Se cargo evidencia y comprobantes de reparto.", date: "2026-05-18", actor: "Paula Ibarra" },
  { id: "act-005", opportunityId: "coop-1002", title: "Nuevo participante interesado", description: "Coop Granos confirma inventario disponible.", date: "2026-05-16", actor: "Jorge Poot" },
  { id: "act-006", opportunityId: "coop-1003", title: "Brief creativo aprobado", description: "Las empresas alinearon mensaje de campaña.", date: "2026-05-15", actor: "Laura Uc" },
];

export const negotiationMessagesMock: NegotiationMessage[] = [
  { id: "msg-001", opportunityId: "coop-1001", participantId: "part-001", author: "Mariana Solis", companyName: "Retail Verde Maya", message: "Podemos confirmar 120k si el precio por caja baja al tramo de volumen 2.", sentAt: "2026-05-17 10:30" },
  { id: "msg-002", opportunityId: "coop-1001", participantId: "part-002", author: "Carlos Medina", companyName: "BioPack Peninsula", message: "Acepto el tramo 2 si cerramos entrega antes del 18 de junio.", sentAt: "2026-05-17 11:05" },
  { id: "msg-003", opportunityId: "coop-1002", participantId: "part-006", author: "Jorge Poot", companyName: "Coop Granos del Caribe", message: "Tenemos capacidad parcial, podemos cubrir 300 unidades semanales.", sentAt: "2026-05-16 15:20" },
  { id: "msg-004", opportunityId: "coop-1006", participantId: "part-019", author: "Paula Ibarra", companyName: "NubeComercio SaaS", message: "La tienda digital queda lista para pruebas con SKUs homologados.", sentAt: "2026-05-18 09:40" },
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
  { id: "active_opportunities", label: "Oportunidades activas", value: 4, formattedValue: "4", hint: "Publicadas o en ejecucion" },
  { id: "negotiating_agreements", label: "Acuerdos en negociacion", value: 3, formattedValue: "3", hint: "Pendientes de cierre" },
  { id: "estimated_value", label: "Valor cooperativo estimado", value: 2970000, formattedValue: "$2,970,000", hint: "Monto agregado del pipeline" },
  { id: "post_services", label: "Servicios post-acuerdo", value: 5, formattedValue: "5", hint: "Delivery, venta digital y documentos" },
];
