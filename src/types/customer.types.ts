export type CustomerStatus = "active" | "prospect" | "at_risk" | "churned" | "inactive";

export type CustomerSegment =
  | "enterprise"
  | "pyme"
  | "microbusiness"
  | "distributor"
  | "supplier"
  | "strategic_partner";

export type CustomerHealthLevel = "healthy" | "attention" | "risk";

export interface Customer {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  website: string;
  status: CustomerStatus;
  segment: CustomerSegment;
  annualValue: number;
  healthScore: number;
  accountManager: string;
  lastInteraction: string;
  location: string;
  tags: string[];
  notes: string;
  createdAt: string;
}

export interface CustomerInteraction {
  id: string;
  customerId: string;
  date: string;
  channel: "email" | "call" | "meeting" | "whatsapp";
  summary: string;
  owner: string;
}

export interface CustomerKpi {
  id: "active" | "annual_value" | "churn_risk" | "opportunities";
  label: string;
  value: number;
  formattedValue: string;
  hint: string;
}

export interface CustomerInsight {
  id: string;
  customerId: string;
  type: "risk" | "upsell" | "follow_up" | "reactivation";
  priority: "high" | "medium" | "low";
  title: string;
  summary: string;
  recommendation: string;
}


export type CustomerBehavior = "new" | "frequent" | "inactive" | "regular";

export interface CustomerPurchaseItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface CustomerPurchase {
  id: string;
  customerId: string;
  date: string;
  total: number;
  items: CustomerPurchaseItem[];
}

export interface CustomerDisplayData {
  id: string;
  name: string;
  phone: string;
  email: string;
  companyName: string;
  notes: string;
  initials: string;
  totalPurchases: number;
  totalSpent: number;
  averageTicket: number;
  lastPurchaseAt: string | null;
  lastPurchaseLabel: string;
  daysSinceLastPurchase: number | null;
  behavior: CustomerBehavior;
  isNewThisMonth: boolean;
  isReturningThisMonth: boolean;
  favoriteProducts: string[];
}

export interface CustomerSummary {
  total: number;
  newThisMonth: number;
  frequent: number;
  inactive: number;
}

export interface ReturningCustomersMetric {
  returned: number;
  eligible: number;
  percentage: number;
}
