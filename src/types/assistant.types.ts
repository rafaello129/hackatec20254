export type AssistantModuleContext = "customers" | "inventory" | "cooperatives" | "finance" | "general";

export type AssistantMessageRole = "user" | "assistant" | "system";

export type AssistantSeverity = "info" | "success" | "warning" | "critical";

export type AssistantImpact = "low" | "medium" | "high";

export type AssistantEffort = "low" | "medium" | "high";

export type AssistantPriority = "low" | "medium" | "high";

export interface AssistantMessage {
  id: string;
  role: AssistantMessageRole;
  content: string;
  createdAt: string;
  relatedModule: AssistantModuleContext;
  metadata?: {
    source?: string;
    confidence?: number;
    actionId?: string;
  };
}

export interface AssistantQuickAction {
  id: string;
  label: string;
  description: string;
  module: AssistantModuleContext;
  prompt: string;
  iconName: string;
}

export interface AssistantInsight {
  id: string;
  title: string;
  description: string;
  module: AssistantModuleContext;
  severity: AssistantSeverity;
  actionLabel: string;
  relatedEntityId: string;
}

export interface AssistantRecommendation {
  id: string;
  title: string;
  description: string;
  module: AssistantModuleContext;
  impact: AssistantImpact;
  effort: AssistantEffort;
  priority: AssistantPriority;
  suggestedAction: string;
}

export interface AssistantRiskAlert {
  id: string;
  title: string;
  description: string;
  module: AssistantModuleContext;
  severity: AssistantSeverity;
  detectedAt: string;
  recommendation: string;
}

export interface AssistantBusinessContext {
  activeCustomers: number;
  lowStockItems: number;
  activeCooperatives: number;
  pendingInvoices: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  riskLevel: "low" | "medium" | "high";
}
