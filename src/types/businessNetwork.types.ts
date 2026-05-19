export type PartnerType =
  | "supplier"
  | "manufacturer"
  | "logistics"
  | "packaging"
  | "retail_partner"
  | "service_provider"
  | "cooperative_partner";

export interface NetworkProject {
  id: string;
  title: string;
  description: string;
  quantity: number;
  budgetMin: number;
  budgetMax: number;
  targetLocation: string;
  category: string;
  status: "draft" | "analyzing" | "optimized" | "ready";
}

export interface NetworkPartner {
  id: string;
  name: string;
  type: PartnerType;
  description: string;
  location: string;
  rating: number;
  matchScore: number;
  priceRange: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  estimatedLeadTime: string;
  connected: boolean;
}

export type ProductionChainStepStatus = "completed" | "optimized" | "unresolved" | "pending";

export interface ProductionChainStep {
  id: string;
  label: string;
  partnerName: string;
  type: PartnerType;
  status: ProductionChainStepStatus;
  description: string;
}

export interface NetworkSuggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "high" | "medium" | "low";
  timeAgo: string;
  actionLabel: string;
}

export interface NetworkQuickAction {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
}

export interface NetworkAssistantMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  createdAt: string;
}

export interface NetworkSummary {
  estimatedLeadTime: string;
  optimizedCost: number;
  originalCost: number;
  partnersEngaged: number;
}
