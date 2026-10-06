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

export interface NetworkPlan {
  project: NetworkProject;
  partners: NetworkPartner[];
  chainSteps: ProductionChainStep[];
  suggestions: NetworkSuggestion[];
  messages: NetworkAssistantMessage[];
  summary: NetworkSummary | null;
  input: AnalyzeNetworkProjectInput;
}

export function projectToInput(project: NetworkProject): AnalyzeNetworkProjectInput {
  return { goal: project.title, quantity: String(project.quantity), budgetRange: `${project.budgetMin} - ${project.budgetMax}`, targetLocation: project.targetLocation };
}

export function getInitialNetworkPlan(): NetworkPlan {
  return structuredClone({ project: networkProjectMock, partners: recommendedPartnersMock, chainSteps: productionChainStepsMock,
    suggestions: networkSuggestionsMock, messages: networkAssistantMessagesMock, summary: networkSummaryMock, input: projectToInput(networkProjectMock) });
}

export function createNetworkPlan(project: Omit<NetworkProject, "id" | "status">): NetworkPlan {
  const newProject: NetworkProject = { ...project, id: crypto.randomUUID(), status: "draft" };
  return { project: newProject, partners: [], chainSteps: [], suggestions: [], messages: [], summary: null, input: projectToInput(newProject) };
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

export async function analyzeNetworkProject(input: AnalyzeNetworkProjectInput, baseProject: NetworkProject = networkProjectMock): Promise<{
  project: NetworkProject;
  message: NetworkAssistantMessage;
}> {
  const quantity = Number(input.quantity.replace(/\D/g, "")) || baseProject.quantity;
  const [budgetMin, budgetMax] = input.budgetRange
    .split("-")
    .map((value) => {
      const cleaned = value.replace(/[$,\s]/g, "");
      const amount = Number(cleaned);
      return cleaned && Number.isFinite(amount) && amount >= 0 ? amount : undefined;
    });

  return {
    project: {
      ...baseProject,
      title: input.goal.trim() || baseProject.title,
      quantity,
      budgetMin: budgetMin ?? baseProject.budgetMin,
      budgetMax: budgetMax ?? baseProject.budgetMax,
      targetLocation: input.targetLocation.trim() || baseProject.targetLocation,
      status: baseProject.status,
    },
    message: {
      id: `msg-analysis-${Date.now()}`,
      role: "assistant",
      content:
        "Los datos del planteamiento se actualizaron. Las conexiones y los procesos existentes se conservan para continuar su desarrollo.",
      createdAt: new Date().toISOString(),
    },
  };
}
