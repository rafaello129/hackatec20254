import { Bot, Send } from "lucide-react";
import type { NetworkAssistantMessage } from "@/types/businessNetwork.types";

const commands = ["Encontrar proveedores locales", "Reducir costos de produccion", "Buscar logistica compartida"];

export default function NetworkAssistantPanel({ messages }: { messages: NetworkAssistantMessage[] }) {
  return (
    <section className="rounded-lg border border-[#022601]/20 bg-[#162300] p-4 text-white">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#c5f17a] text-[#162300]"><Bot className="h-4 w-4" /></span>
          <div><h2 className="font-['Hanken_Grotesk'] text-lg font-semibold">peek Assistant</h2><p className="text-xs text-white/70">Online - network planning</p></div>
        </div>
        <span className="h-2.5 w-2.5 rounded-full bg-[#c5f17a]" />
      </div>
      <div className="space-y-2">
        {messages.slice(0, 2).map((message) => <p key={message.id} className="rounded-lg border border-white/10 bg-white/10 p-3 text-xs leading-5 text-white/85">{message.content}</p>)}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {commands.map((command) => <button key={command} className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-[#c5f17a]">{command}</button>)}
      </div>
      <div className="mt-3 flex gap-2">
        <input disabled placeholder="Pide una optimizacion..." className="h-10 min-w-0 flex-1 rounded-lg border border-white/10 bg-white/10 px-3 text-sm text-white placeholder:text-white/45" />
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#c5f17a] text-[#162300]"><Send className="h-4 w-4" /></button>
      </div>
    </section>
  );
}
