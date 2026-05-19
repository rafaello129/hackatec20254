import { ArrowUpRight, Lightbulb } from "lucide-react";
import type { NetworkSuggestion } from "@/types/businessNetwork.types";

const priorityClass: Record<NetworkSuggestion["priority"], string> = {
  high: "bg-[#ffdad6] text-[#93000a]",
  medium: "bg-[#fff2cc] text-[#7a5d00]",
  low: "bg-[#e8e9e2] text-[#42493f]",
};

export default function NetworkSuggestionsPanel({ suggestions }: { suggestions: NetworkSuggestion[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#D6D979] text-[#3E5902]"><Lightbulb className="h-4 w-4" /></span>
        <div>
          <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Panel de sugerencias IA</h2>
          <p className="text-xs text-[#42493f]">Oportunidades detectadas</p>
        </div>
      </div>
      <div className="space-y-2">
        {suggestions.map((suggestion) => (
          <article key={suggestion.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <div className="mb-1 flex items-start justify-between gap-2">
              <div><p className="text-sm font-semibold text-[#1a1c18]">{suggestion.title}</p><p className="text-xs text-[#42493f]">{suggestion.category} - {suggestion.timeAgo}</p></div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${priorityClass[suggestion.priority]}`}>{suggestion.priority}</span>
            </div>
            <p className="line-clamp-2 text-xs leading-5 text-[#42493f]">{suggestion.description}</p>
            <button className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#4F7302]">{suggestion.actionLabel}<ArrowUpRight className="h-3.5 w-3.5" /></button>
          </article>
        ))}
      </div>
    </section>
  );
}
