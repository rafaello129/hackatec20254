import { Loader2 } from "lucide-react";
import type { AssistantMessage } from "@/types/assistant.types";
import AssistantMessageBubble from "./AssistantMessageBubble";

export default function AssistantMessageList({ messages, isLoading }: { messages: AssistantMessage[]; isLoading: boolean }) {
  return (
    <div className="max-h-[430px] min-h-[300px] space-y-3 overflow-y-auto rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
      {messages.map((message) => (
        <AssistantMessageBubble key={message.id} message={message} />
      ))}
      {isLoading ? (
        <div className="flex items-center gap-2 rounded-lg border border-[#e2e3dc] bg-white p-3 text-sm font-semibold text-[#42493f]">
          <Loader2 className="h-4 w-4 animate-spin text-[#4F7302]" />
          Analizando señales del negocio...
        </div>
      ) : null}
    </div>
  );
}
