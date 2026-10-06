import { Bot, ChevronDown } from "lucide-react";
import type { NetworkAssistantMessage } from "@/types/businessNetwork.types";

export default function NetworkAssistantPanel({ messages, defaultOpen = false }: { messages: NetworkAssistantMessage[]; defaultOpen?: boolean }) {
  return (
    <details className="network-analysis" open={defaultOpen || undefined}>
      <summary><Bot size={18} /> Análisis del proyecto <ChevronDown size={16} className="network-analysis-chevron" /></summary>
      <div aria-live="polite">{messages.slice(0, 2).map((message) => <p key={message.id}>{message.content}</p>)}</div>
    </details>
  );
}
