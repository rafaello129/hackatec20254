import type { ProductVerification } from "@/types/product-verification.types";

export const productVerificationsMock: ProductVerification[] = [
  {
    id: "vrf-001",
    productId: "inv-001",
    type: "artisanal_origin",
    status: "verified",
    verificationCode: "VRF-ART-0001",
    submittedAt: "2026-10-02",
    verifiedAt: "2026-10-06",
    origin: {
      producerName: "Familia Pech",
      workshopName: "Taller Manos del Mayab",
      location: "Mérida, Yucatán",
      region: "Península de Yucatán",
      technique: "Tejido manual con cuentas",
      materials: ["Fibras naturales", "Cuentas decorativas"],
    },
    checks: [
      { id: "identity", label: "Identidad del productor", description: "La persona o taller responsable fue identificado.", status: "passed" },
      { id: "origin", label: "Taller u origen", description: "Se comprobó dónde se elabora la pieza.", status: "passed" },
      { id: "process", label: "Proceso artesanal", description: "Se revisó evidencia del proceso de elaboración.", status: "passed" },
      { id: "link", label: "Producto vinculado", description: "La pieza corresponde al productor declarado.", status: "passed" },
    ],
    evidence: [
      { id: "ev-001", type: "photo", title: "Taller de elaboración", description: "Vista del espacio donde se tejen las piezas.", url: "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=900&q=80", createdAt: "2026-10-02" },
      { id: "ev-002", type: "record", title: "Registro del productor", description: "Ficha de identidad y relación con el taller.", createdAt: "2026-10-03" },
      { id: "ev-003", type: "photo", title: "Proceso de tejido", description: "Evidencia visual del proceso manual.", url: "https://images.unsplash.com/photo-1590739225287-bd31519780c3?auto=format&fit=crop&w=900&q=80", createdAt: "2026-10-04" },
    ],
    timeline: [
      { id: "tl-1", label: "Solicitud recibida", description: "Se registró la solicitud de verificación.", date: "2026-10-02", status: "complete" },
      { id: "tl-2", label: "Evidencia revisada", description: "MÁAK revisó la evidencia de origen.", date: "2026-10-04", status: "complete" },
      { id: "tl-3", label: "Origen verificado", description: "La revisión interna quedó completada.", date: "2026-10-06", status: "complete" },
    ],
  },
  {
    id: "vrf-002",
    productId: "inv-002",
    type: "artisanal_origin",
    status: "pending",
    submittedAt: "2026-10-05",
    origin: {
      producerName: "Colectivo Bordadoras del Sur",
      workshopName: "Colectivo Bordadoras del Sur",
      location: "Valladolid, Yucatán",
      technique: "Bordado manual",
      materials: ["Algodón", "Hilo de algodón"],
    },
    checks: [
      { id: "identity", label: "Identidad del productor", description: "Responsable identificado.", status: "passed" },
      { id: "origin", label: "Taller u origen", description: "Ubicación recibida.", status: "passed" },
      { id: "process", label: "Proceso artesanal", description: "Evidencia en revisión.", status: "pending" },
      { id: "link", label: "Producto vinculado", description: "Pendiente de validación final.", status: "pending" },
    ],
    evidence: [
      { id: "ev-004", type: "photo", title: "Muestra de bordado", description: "Fotografía del trabajo manual.", url: "https://images.unsplash.com/photo-1590739225287-bd31519780c3?auto=format&fit=crop&w=900&q=80", createdAt: "2026-10-05" },
    ],
    timeline: [
      { id: "tl-1", label: "Solicitud recibida", date: "2026-10-05", status: "complete" },
      { id: "tl-2", label: "Evidencia recibida", date: "2026-10-05", status: "complete" },
      { id: "tl-3", label: "Revisión en curso", date: "2026-10-06", status: "current" },
      { id: "tl-4", label: "Resultado", date: "", status: "pending" },
    ],
  },
  {
    id: "vrf-003",
    productId: "inv-003",
    type: "artisanal_origin",
    status: "needs_action",
    submittedAt: "2026-10-03",
    origin: {
      producerName: "Taller Barro Vivo",
      workshopName: "Taller Barro Vivo",
      location: "Ticul, Yucatán",
      technique: "Modelado y cocción manual",
      materials: ["Barro local", "Esmalte natural"],
    },
    checks: [
      { id: "identity", label: "Identidad del productor", description: "Responsable identificado.", status: "passed" },
      { id: "origin", label: "Taller u origen", description: "Origen declarado.", status: "passed" },
      { id: "process", label: "Proceso artesanal", description: "Falta una fotografía clara del proceso.", status: "needs_action" },
      { id: "link", label: "Producto vinculado", description: "Pendiente hasta completar evidencia.", status: "pending" },
    ],
    evidence: [],
    timeline: [
      { id: "tl-1", label: "Solicitud recibida", date: "2026-10-03", status: "complete" },
      { id: "tl-2", label: "Revisión inicial", date: "2026-10-04", status: "complete" },
      { id: "tl-3", label: "Evidencia adicional requerida", date: "2026-10-05", status: "current" },
      { id: "tl-4", label: "Resultado", date: "", status: "pending" },
    ],
  },
  {
    id: "vrf-004",
    productId: "inv-004",
    type: "artisanal_origin",
    status: "not_requested",
    checks: [],
    evidence: [],
    timeline: [],
  },
  {
    id: "vrf-005",
    productId: "inv-005",
    type: "artisanal_origin",
    status: "verified",
    verificationCode: "VRF-ART-0005",
    submittedAt: "2026-09-25",
    verifiedAt: "2026-09-29",
    origin: {
      producerName: "Colectivo Bordadoras del Sur",
      workshopName: "Colectivo Bordadoras del Sur",
      location: "Valladolid, Yucatán",
      technique: "Bordado manual",
      materials: ["Algodón", "Hilo de algodón"],
    },
    checks: [
      { id: "identity", label: "Identidad del productor", description: "Responsable identificado.", status: "passed" },
      { id: "origin", label: "Taller u origen", description: "Taller comprobado.", status: "passed" },
      { id: "process", label: "Proceso artesanal", description: "Proceso revisado.", status: "passed" },
      { id: "link", label: "Producto vinculado", description: "Pieza vinculada al colectivo.", status: "passed" },
    ],
    evidence: [],
    timeline: [
      { id: "tl-1", label: "Solicitud recibida", date: "2026-09-25", status: "complete" },
      { id: "tl-2", label: "Origen verificado", date: "2026-09-29", status: "complete" },
    ],
  },
];

export function createEmptyVerification(productId: string): ProductVerification {
  return {
    id: "vrf-" + productId,
    productId,
    type: "artisanal_origin",
    status: "not_requested",
    checks: [],
    evidence: [],
    timeline: [],
  };
}
