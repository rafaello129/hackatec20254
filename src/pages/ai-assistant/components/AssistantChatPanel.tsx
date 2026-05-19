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
    <section className="min-w-0 rounded-lg border border-[#c2c9bc] bg-white">
      <header className="flex flex-col gap-1 border-b border-[#e2e3dc] px-4 py-3">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Conversación ejecutiva</h2>
        <p className="text-sm text-[#42493f]">Consulta señales operativas y recibe recomendaciones accionables.</p>
      </header>

      <div className="space-y-4 p-4">
        <AssistantMessageList messages={messages} isLoading={isLoading} />
        <AssistantComposer value={inputValue} onChange={onInputChange} onSend={onSendMessage} isLoading={isLoading} />
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">Acciones rápidas</p>
            <span className="text-xs font-medium text-[#73796e]">Pulsa para generar consulta</span>
          </div>
          <AssistantQuickActions actions={quickActions} onRunAction={onRunAction} disabled={isLoading} />
        </div>
      </div>
    </section>
  );
}
