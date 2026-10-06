import type { SupportProgram } from "@/types/support-programs.types";

// Fixed reference date keeps the demonstration reproducible.
export const SUPPORT_DEMO_DATE = "2026-10-06";

export const supportPrograms: SupportProgram[] = [
  {
    id: "impulso-comercio", title: "Impulso al comercio local", institution: "Fondo Regional de Desarrollo (ficticio)",
    source: "Gobierno", kind: "Subsidio", region: "Yucatán", sector: "Comercio",
    benefit: "Hasta $80,000 MXN", deadline: "2026-10-20",
    description: "Equipamiento y mejora del punto de venta para pequeños comercios establecidos.",
    requirements: ["Negocio establecido en Yucatán", "RFC y constancia de situación fiscal", "Al menos 12 meses de operación", "Cotización del equipamiento"],
    conditions: "Apoyo no reembolsable sujeto a evaluación. Aportación del negocio del 20% y comprobación del uso de los recursos. Condiciones ficticias.",
  },
  {
    id: "credito-crece", title: "Capital para crecer", institution: "Banco Horizonte (ficticio)",
    source: "Banco", kind: "Crédito", region: "Nacional", sector: "Todos los sectores",
    benefit: "$100,000 a $500,000 MXN", deadline: null,
    description: "Financiamiento para inventario, capital de trabajo y expansión de pequeñas empresas.",
    requirements: ["RFC activo", "Al menos 24 meses de operación", "Estados financieros del último año", "Evaluación crediticia"],
    conditions: "Crédito reembolsable a 12–36 meses. Tasa, CAT, comisiones y garantías pendientes de cotización en este escenario. No representa una oferta financiera.",
  },
  {
    id: "digitaliza", title: "Digitaliza tu negocio", institution: "Fundación Conecta (ficticia)",
    source: "Empresa privada", kind: "Capacitación", region: "Nacional", sector: "Comercio",
    benefit: "40 horas de formación sin costo", deadline: "2026-10-12",
    description: "Acompañamiento en ventas en línea, catálogo digital y administración de clientes.",
    requirements: ["Negocio en operación", "Acceso a internet", "Disponibilidad de 5 horas semanales"],
    conditions: "Cupo de muestra: 30 negocios. Modalidad virtual durante 8 semanas. No incluye entrega de dinero ni contratación de servicios.",
  },
  {
    id: "equipo-productivo", title: "Renovación de equipo productivo", institution: "Agencia de Fomento Empresarial (ficticia)",
    source: "Gobierno", kind: "Subsidio", region: "Jalisco", sector: "Manufactura",
    benefit: "Hasta $150,000 MXN", deadline: "2026-11-15",
    description: "Modernización de maquinaria para talleres y pequeñas unidades de producción.",
    requirements: ["Domicilio fiscal en Jalisco", "Actividad de manufactura", "Proyecto de inversión", "Aportación propia del 30%"],
    conditions: "Reembolso parcial contra comprobantes aprobados. Evaluación técnica y disponibilidad presupuestal simuladas.",
  },
  {
    id: "eficiencia", title: "Eficiencia energética para pymes", institution: "Banco Alianza (ficticio)",
    source: "Banco", kind: "Crédito", region: "Nacional", sector: "Todos los sectores",
    benefit: "Hasta $300,000 MXN", deadline: "2026-10-30",
    description: "Financiamiento para sustituir equipos de alto consumo y mejorar las instalaciones del negocio.",
    requirements: ["Negocio formalmente constituido", "Diagnóstico energético", "Cotización del proveedor", "Evaluación de capacidad de pago"],
    conditions: "Financiamiento reembolsable. Plazo ilustrativo de 24 meses; tasa, CAT y comisiones por definir. Aprobación no garantizada.",
  },
  {
    id: "mentoria", title: "Mentoría para empresas de servicios", institution: "Red Empresarial Futuro (ficticia)",
    source: "Empresa privada", kind: "Capacitación", region: "Ciudad de México", sector: "Servicios",
    benefit: "6 sesiones de mentoría", deadline: "2026-09-30",
    description: "Asesoría grupal para fortalecer precios, procesos comerciales y planeación del negocio.",
    requirements: ["Empresa de servicios en Ciudad de México", "Al menos 6 meses de operación", "Asistencia de la persona responsable"],
    conditions: "Programa sin costo. Convocatoria cerrada en la fecha de referencia de la demostración.",
  },
];
