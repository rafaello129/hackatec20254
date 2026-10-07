import SpotlightCard from "@/components/react-bits/SpotlightCard";
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
    <SpotlightCard
      spotlightColor="rgba(154, 200, 75, 0.10)"
      className="min-w-0 overflow-hidden rounded-[28px] border border-[var(--oe-border)] bg-white"
    >
      <section className="relative z-[4] min-w-0">
        <header className="flex flex-col gap-1 border-b border-[#EDF0EB] px-5 py-5 sm:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[var(--oe-primary)]">
            Conversación
          </p>
          <h2 className="font-['Hanken_Grotesk'] text-[18px] font-semibold text-[var(--oe-text)]">
            Conversación ejecutiva
          </h2>
          <p className="text-[11px] leading-5 text-[var(--oe-text-muted)]">
            Consulta señales operativas y recibe recomendaciones accionables.
          </p>
        </header>

        <div className="space-y-4 p-4 sm:p-5">
          <AssistantMessageList messages={messages} isLoading={isLoading} />

          <AssistantComposer
            value={inputValue}
            onChange={onInputChange}
            onSend={onSendMessage}
            isLoading={isLoading}
          />

          <div className="rounded-[20px] border border-[#E7EBE4] bg-[#F7F9F5] p-4">
            <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#5D6A61]">
                Acciones rápidas
              </p>
              <span className="text-[10px] font-medium text-[#89938C]">
                Pulsa para generar consulta
              </span>
            </div>
            <AssistantQuickActions
              actions={quickActions}
              onRunAction={onRunAction}
              disabled={isLoading}
            />
          </div>
        </div>
      </section>
    </SpotlightCard>
  );
}
