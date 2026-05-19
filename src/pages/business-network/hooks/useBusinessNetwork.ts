import { useEffect, useState } from "react";
import {
  analyzeNetworkProject,
  getNetworkAssistantMessages,
  getNetworkProject,
  getNetworkQuickActions,
  getNetworkSuggestions,
  getNetworkSummary,
  getProductionChainSteps,
  getRecommendedPartners,
  type AnalyzeNetworkProjectInput,
} from "@/services/businessNetwork.service";
import type {
  NetworkAssistantMessage,
  NetworkPartner,
  NetworkProject,
  NetworkQuickAction,
  NetworkSuggestion,
  NetworkSummary,
  ProductionChainStep,
} from "@/types/businessNetwork.types";

export function useBusinessNetwork() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [project, setProject] = useState<NetworkProject | null>(null);
  const [partners, setPartners] = useState<NetworkPartner[]>([]);
  const [chainSteps, setChainSteps] = useState<ProductionChainStep[]>([]);
  const [suggestions, setSuggestions] = useState<NetworkSuggestion[]>([]);
  const [quickActions, setQuickActions] = useState<NetworkQuickAction[]>([]);
  const [messages, setMessages] = useState<NetworkAssistantMessage[]>([]);
  const [summary, setSummary] = useState<NetworkSummary | null>(null);
  const [builderInput, setBuilderInput] = useState<AnalyzeNetworkProjectInput>({
    goal: "Crear coleccion regional de prendas bordadas",
    quantity: "500 unidades",
    budgetRange: "$80,000 - $120,000",
    targetLocation: "Cancun / Quintana Roo",
  });

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      setIsLoading(true);
      const [projectData, partnerData, stepData, suggestionData, actionData, messageData, summaryData] =
        await Promise.all([
          getNetworkProject(),
          getRecommendedPartners(),
          getProductionChainSteps(),
          getNetworkSuggestions(),
          getNetworkQuickActions(),
          getNetworkAssistantMessages(),
          getNetworkSummary(),
        ]);

      if (!mounted) return;

      setProject(projectData);
      setPartners(partnerData);
      setChainSteps(stepData);
      setSuggestions(suggestionData);
      setQuickActions(actionData);
      setMessages(messageData);
      setSummary(summaryData);
      setIsLoading(false);
    };

    void loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const updateBuilderInput = (field: keyof AnalyzeNetworkProjectInput, value: string) => {
    setBuilderInput((current) => ({ ...current, [field]: value }));
  };

  const analyzeProject = async () => {
    setIsAnalyzing(true);
    const result = await analyzeNetworkProject(builderInput);
    setProject(result.project);
    setMessages((current) => [result.message, ...current]);
    setTimeout(() => setIsAnalyzing(false), 350);
  };

  const connectPartner = (partnerId: string) => {
    setPartners((current) =>
      current.map((partner) => (partner.id === partnerId ? { ...partner, connected: true } : partner)),
    );
  };

  return {
    isLoading,
    isAnalyzing,
    project,
    partners,
    chainSteps,
    suggestions,
    quickActions,
    messages,
    summary,
    builderInput,
    updateBuilderInput,
    analyzeProject,
    connectPartner,
  };
}
