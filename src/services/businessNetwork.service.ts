import {
  networkAssistantMessagesMock,
  networkProjectMock,
  networkQuickActionsMock,
  networkSummaryMock,
  networkSuggestionsMock,
  productionChainStepsMock,
  recommendedPartnersMock,
} from "@/data/mocks/businessNetwork.mock";
import type {
  NetworkAssistantMessage,
  NetworkPartner,
  NetworkProject,
  NetworkQuickAction,
  NetworkSuggestion,
  NetworkSummary,
  ProductionChainStep,
} from "@/types/businessNetwork.types";

export interface AnalyzeNetworkProjectInput {
  goal: string;
  quantity: string;
  budgetRange: string;
  targetLocation: string;
}

export async function getNetworkProject(): Promise<NetworkProject> {
  return networkProjectMock;
}

export async function getRecommendedPartners(): Promise<NetworkPartner[]> {
  return recommendedPartnersMock;
}

export async function getProductionChainSteps(): Promise<ProductionChainStep[]> {
  return productionChainStepsMock;
}

export async function getNetworkSuggestions(): Promise<NetworkSuggestion[]> {
  return networkSuggestionsMock;
}

export async function getNetworkQuickActions(): Promise<NetworkQuickAction[]> {
  return networkQuickActionsMock;
}

export async function getNetworkAssistantMessages(): Promise<NetworkAssistantMessage[]> {
  return networkAssistantMessagesMock;
}

export async function getNetworkSummary(): Promise<NetworkSummary> {
  return networkSummaryMock;
}

export async function analyzeNetworkProject(input: AnalyzeNetworkProjectInput): Promise<{
  project: NetworkProject;
  message: NetworkAssistantMessage;
}> {
  const quantity = Number(input.quantity.replace(/\D/g, "")) || networkProjectMock.quantity;
  const [budgetMin, budgetMax] = input.budgetRange
    .split("-")
    .map((value) => Number(value.replace(/\D/g, "")))
    .filter(Boolean);

  return {
    project: {
      ...networkProjectMock,
      title: input.goal || networkProjectMock.title,
      quantity,
      budgetMin: budgetMin || networkProjectMock.budgetMin,
      budgetMax: budgetMax || networkProjectMock.budgetMax,
      targetLocation: input.targetLocation || networkProjectMock.targetLocation,
      status: "optimized",
    },
    message: {
      id: `msg-analysis-${Date.now()}`,
      role: "assistant",
      content:
        "Analisis simulado listo: encontre socios para insumos, manufactura, empaque y venta. La distribucion sigue abierta para optimizar costo.",
      createdAt: new Date().toISOString(),
    },
  };
}
