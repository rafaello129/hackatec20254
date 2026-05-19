export type CooperativeOpportunityType =
  | "joint_purchase"
  | "joint_sale"
  | "shared_campaign"
  | "shared_distribution"
  | "logistics_partnership";

export type CooperativeStatus =
  | "published"
  | "negotiation"
  | "accepted"
  | "in_agreement"
  | "active"
  | "in_delivery"
  | "completed"
  | "canceled";

export type ParticipantRole = "creator" | "buyer" | "seller" | "logistics" | "service_provider" | "observer";

export interface CooperativeOpportunity {
  id: string;
  title: string;
  description: string;
  type: CooperativeOpportunityType;
  status: CooperativeStatus;
  creatorCompany: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  requestedParticipants: number;
  currentParticipants: number;
  location: string;
  deadline: string;
  expectedBenefit: string;
  requirements: string[];
  tags: string[];
  relatedInventoryItems: string[];
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  imageAlt?: string;
  originImageUrl?: string;
  originImageAlt?: string;
}

export interface CooperativeParticipant {
  id: string;
  opportunityId: string;
  companyName: string;
  contactName: string;
  role: ParticipantRole;
  contributionAmount: number;
  contributionType: string;
  status: "invited" | "interested" | "accepted" | "active" | "completed";
  joinedAt: string;
}

export interface Contribution {
  id: string;
  participantId: string;
  type: "capital" | "inventory" | "service" | "logistics" | "marketing";
  description: string;
  amount: number;
  quantity: number;
  estimatedValue: number;
}

export interface DistributionRule {
  participantId: string;
  label: string;
  percentage: number;
  allocatedValue: number;
  allocatedQuantity: number;
}

export interface DistributionPlan {
  id: string;
  rule: "by_contribution" | "equal_parts" | "by_sales_commitment" | "custom";
  description: string;
  items: DistributionRule[];
  totalValue: number;
  calculatedAt: string;
}

export interface PostAgreementService {
  id: string;
  type: "delivery" | "digital_sale" | "distribution_calculation" | "tracking" | "documents";
  title: string;
  description: string;
  status: "available" | "active" | "pending" | "completed";
  estimatedCost: number;
  provider: string;
}

export interface DeliveryService extends PostAgreementService {
  type: "delivery";
  route: string;
  eta: string;
}

export interface CooperativeDocument {
  id: string;
  opportunityId: string;
  title: string;
  type: "preliminary_agreement" | "receipt" | "delivery_evidence" | "distribution_calculation";
  status: "draft" | "ready" | "signed" | "archived";
  updatedAt: string;
}

export interface CooperativeActivity {
  id: string;
  opportunityId: string;
  title: string;
  description: string;
  date: string;
  actor: string;
}

export interface NegotiationMessage {
  id: string;
  opportunityId: string;
  participantId: string;
  author: string;
  companyName: string;
  message: string;
  sentAt: string;
}

export interface CooperativeAgreement {
  id: string;
  opportunityId: string;
  title: string;
  status: "draft" | "review" | "signed" | "active" | "closed";
  participants: CooperativeParticipant[];
  contributions: Contribution[];
  distributionPlan: DistributionPlan;
  postAgreementServices: PostAgreementService[];
  documents: CooperativeDocument[];
  activities: CooperativeActivity[];
  createdAt: string;
}

export interface CooperativeKpi {
  id: "active_opportunities" | "negotiating_agreements" | "estimated_value" | "post_services";
  label: string;
  value: number;
  formattedValue: string;
  hint: string;
}
