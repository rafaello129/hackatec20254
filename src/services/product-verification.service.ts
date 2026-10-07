import { productVerificationsMock } from "@/data/mocks/product-verification.mock";
import type {
  CreateProductVerificationInput,
  ProductVerification,
} from "@/types/product-verification.types";

export async function getProductVerifications(): Promise<ProductVerification[]> {
  return productVerificationsMock.map((verification) => ({
    ...verification,
    checks: verification.checks.map((check) => ({ ...check })),
    evidence: verification.evidence.map((evidence) => ({ ...evidence })),
    timeline: verification.timeline.map((event) => ({ ...event })),
    origin: verification.origin
      ? {
          ...verification.origin,
          materials: verification.origin.materials
            ? [...verification.origin.materials]
            : undefined,
        }
      : undefined,
  }));
}


export function createProductVerification(
  productId: string,
  input: CreateProductVerificationInput,
): ProductVerification {
  const today = new Date().toISOString().slice(0, 10);
  const timestamp = Date.now();

  return {
    id: "vrf-local-" + timestamp,
    productId,
    type: "artisanal_origin",
    status: input.requestReview ? "pending" : "not_requested",
    submittedAt: input.requestReview ? today : undefined,
    origin: input.origin,
    checks: input.requestReview
      ? [
          {
            id: "identity",
            label: "Identidad del productor",
            description: "Pendiente de revisión.",
            status: "pending",
          },
          {
            id: "origin",
            label: "Taller u origen",
            description: "Pendiente de revisión.",
            status: "pending",
          },
          {
            id: "process",
            label: "Proceso artesanal",
            description: "Pendiente de revisión.",
            status: "pending",
          },
          {
            id: "link",
            label: "Producto vinculado",
            description: "Pendiente de revisión.",
            status: "pending",
          },
        ]
      : [],
    evidence: input.evidence
      ? [
          {
            ...input.evidence,
            id: "ev-local-" + timestamp,
            createdAt: today,
          },
        ]
      : [],
    timeline: input.requestReview
      ? [
          {
            id: "requested-" + timestamp,
            label: "Solicitud recibida",
            description: "PÉEK recibió la solicitud de verificación.",
            date: today,
            status: "complete",
          },
          {
            id: "review-" + timestamp,
            label: "Revisión en curso",
            description: "La información será revisada por PÉEK.",
            date: today,
            status: "current",
          },
          {
            id: "result-" + timestamp,
            label: "Resultado",
            date: "",
            status: "pending",
          },
        ]
      : [],
  };
}
