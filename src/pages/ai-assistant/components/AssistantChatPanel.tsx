import SectionCard from "@/components/common/SectionCard";
import type { AssistantMessage, AssistantQuickAction } from "@/types/assistant.types";
import AssistantComposer from "./AssistantComposer";
import AssistantMessageList from "./AssistantMessageList";
import AssistantQuickActions from "./AssistantQuickActions";

interface AssistantChatPanelProps {
  messages: AssistantMessage[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
  quickActions: AssistantQuickAction[];
  onRunAction: (actionId: string) => void;
}

export default function AssistantChatPanel({
  messages,
  inputValue,
  onInputChange,
  onSendMessage,
  isLoading,
  quickActions,
  onRunAction,
}: AssistantChatPanelProps) {
  return (
    <SectionCard title="Conversacion ejecutiva">
      <div className="space-y-4">
        <AssistantMessageList messages={messages} isLoading={isLoading} />
        <AssistantComposer value={inputValue} onChange={onInputChange} onSend={onSendMessage} isLoading={isLoading} />
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">Acciones rapidas</p>
          <AssistantQuickActions actions={quickActions} onRunAction={onRunAction} disabled={isLoading} />
        </div>
      </div>
    </SectionCard>
  );
}
