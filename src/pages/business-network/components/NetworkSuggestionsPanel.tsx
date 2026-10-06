import { Lightbulb } from "lucide-react";
import type { NetworkSuggestion } from "@/types/businessNetwork.types";

const priorities = { high: "Alta", medium: "Media", low: "Baja" };

export default function NetworkSuggestionsPanel({ suggestions }: { suggestions: NetworkSuggestion[] }) {
  return (
    <section aria-labelledby="network-suggestions-title">
      <h2 id="network-suggestions-title"><Lightbulb size={19} /> Oportunidades de mejora</h2>
      <ul className="network-suggestions">
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>
            <div><span>{suggestion.category === "Logistica" ? "Logística" : suggestion.category}</span><span className={`network-priority network-priority-${suggestion.priority}`}>Prioridad {priorities[suggestion.priority].toLowerCase()}</span></div>
            <h3>{suggestion.title}</h3><p>{suggestion.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
