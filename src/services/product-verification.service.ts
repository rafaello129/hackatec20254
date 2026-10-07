import { productVerificationsMock } from "@/data/mocks/product-verification.mock";
import type { ProductVerification } from "@/types/product-verification.types";

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
