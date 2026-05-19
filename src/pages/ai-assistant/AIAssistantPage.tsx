import SectionCard from "@/components/common/SectionCard";
import AssistantChatPanel from "./components/AssistantChatPanel";
import AssistantContextPanel from "./components/AssistantContextPanel";
import AssistantHeader from "./components/AssistantHeader";
import AssistantInsightCards from "./components/AssistantInsightCards";
import AssistantRecommendationPanel from "./components/AssistantRecommendationPanel";
import AssistantRiskPanel from "./components/AssistantRiskPanel";
import { useAssistant } from "./hooks/useAssistant";

export default function AIAssistantPage() {
  const {
    businessContext,
    handleQuickAction,
    handleSendMessage,
    inputValue,
    insights,
    isLoading,
    messages,
    quickActions,
    recommendations,
    risks,
    setInputValue,
  } = useAssistant();

  return (
    <div className="space-y-6">
      <AssistantHeader />

      <SectionCard title="Insights ejecutivos">
        <AssistantInsightCards insights={insights} />
      </SectionCard>

      <div className="grid gap-4 xl:grid-cols-[1.55fr_0.95fr]">
        <AssistantChatPanel
          messages={messages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSendMessage={() => handleSendMessage()}
          isLoading={isLoading}
          quickActions={quickActions}
          onRunAction={handleQuickAction}
        />

        <div className="space-y-4">
          <AssistantContextPanel context={businessContext} />
          <AssistantRiskPanel risks={risks} />
          <AssistantRecommendationPanel recommendations={recommendations} />
        </div>
      </div>
    </div>
  );
}
