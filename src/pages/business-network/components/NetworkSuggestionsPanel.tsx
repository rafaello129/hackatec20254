import { Lightbulb } from "lucide-react";
import AnimatedList from "@/components/react-bits/AnimatedList";
import type { NetworkSuggestion } from "@/types/businessNetwork.types";
const priorities={high:"Alta",medium:"Media",low:"Baja"};

export default function NetworkSuggestionsPanel({suggestions}:{suggestions:NetworkSuggestion[]}) {
  return <section className="network-suggestions-panel" aria-labelledby="network-suggestions-title">
    <div className="network-insight-heading"><span className="network-insight-icon"><Lightbulb size={17}/></span><div>
      <p className="network-eyebrow">Optimización</p><h2 id="network-suggestions-title">Oportunidades de mejora</h2>
    </div></div>
    <AnimatedList className="network-suggestions" stagger={95}>
      {suggestions.map(suggestion=><li key={suggestion.id}>
        <div><span>{suggestion.category==="Logistica"?"Logística":suggestion.category}</span>
          <span className={`network-priority network-priority-${suggestion.priority}`}>Prioridad {priorities[suggestion.priority].toLowerCase()}</span>
        </div>
        <h3>{suggestion.title}</h3><p>{suggestion.description}</p>
      </li>)}
    </AnimatedList>
  </section>;
}
