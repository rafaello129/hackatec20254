export type ProductVerificationStatus =
  | "not_requested"
  | "pending"
  | "verified"
  | "needs_action";

export type VerificationCheckStatus =
  | "passed"
  | "pending"
  | "needs_action";

export interface ProductVerificationCheck {
  id: string;
  label: string;
  description: string;
  status: VerificationCheckStatus;
}

export interface ProductVerificationEvidence {
  id: string;
  type: "photo" | "document" | "record";
  title: string;
  description?: string;
  url?: string;
  createdAt: string;
}

export interface ProductOrigin {
  producerName: string;
  workshopName?: string;
  location: string;
  region?: string;
  technique?: string;
  materials?: string[];
}

export interface CreateProductVerificationInput {
  origin?: ProductOrigin;
  requestReview: boolean;
  evidence?: Omit<ProductVerificationEvidence, "id" | "createdAt">;
}

export interface ProductVerificationEvent {
  id: string;
  label: string;
  description?: string;
  date: string;
  status: "complete" | "current" | "pending";
}

export interface ProductVerification {
  id: string;
  productId: string;
  type: "artisanal_origin";
  status: ProductVerificationStatus;
  verificationCode?: string;
  submittedAt?: string;
  verifiedAt?: string;
  origin?: ProductOrigin;
  checks: ProductVerificationCheck[];
  evidence: ProductVerificationEvidence[];
  timeline: ProductVerificationEvent[];
}
