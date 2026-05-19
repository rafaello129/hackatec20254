import { useMemo, useState } from "react";
import {
  getAssistantBusinessContext,
  getAssistantInsights,
  getAssistantMessages,
  getAssistantQuickActions,
  getAssistantRecommendations,
  getAssistantRiskAlerts,
  runQuickAction,
  sendAssistantMessage,
} from "@/services/assistant.service";
import type { AssistantMessage } from "@/types/assistant.types";

export function useAssistant() {
  const [messages, setMessages] = useState<AssistantMessage[]>(() => getAssistantMessages());
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickActions = useMemo(() => getAssistantQuickActions(), []);
  const insights = useMemo(() => getAssistantInsights(), []);
  const recommendations = useMemo(() => getAssistantRecommendations(), []);
  const risks = useMemo(() => getAssistantRiskAlerts(), []);
  const businessContext = useMemo(() => getAssistantBusinessContext(), []);

  function appendAssistantResponse(response: AssistantMessage) {
    setMessages((current) => [...current, response]);
    setIsLoading(false);
  }

  function handleSendMessage(rawMessage?: string) {
    const content = (rawMessage ?? inputValue).trim();
    if (!content || isLoading) return;

    const userMessage: AssistantMessage = {
      id: `msg-${Date.now()}-user`,
      role: "user",
      content,
      createdAt: new Date().toISOString(),
      relatedModule: "general",
    };

    setMessages((current) => [...current, userMessage]);
    setInputValue("");
    setIsLoading(true);

    window.setTimeout(() => {
      appendAssistantResponse(sendAssistantMessage(content));
    }, 450);
  }

  function handleQuickAction(actionId: string) {
    if (isLoading) return;
    const action = quickActions.find((item) => item.id === actionId);
    if (!action) return;

    const userMessage: AssistantMessage = {
      id: `msg-${Date.now()}-${actionId}`,
      role: "user",
      content: action.prompt,
      createdAt: new Date().toISOString(),
      relatedModule: action.module,
      metadata: { actionId },
    };

    setMessages((current) => [...current, userMessage]);
    setInputValue("");
    setIsLoading(true);

    window.setTimeout(() => {
      appendAssistantResponse(runQuickAction(actionId));
    }, 450);
  }

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    quickActions,
    insights,
    recommendations,
    risks,
    businessContext,
    handleSendMessage,
    handleQuickAction,
  };
}
