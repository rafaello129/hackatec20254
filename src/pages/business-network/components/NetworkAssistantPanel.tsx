import { Bot, ChevronDown, Sparkles } from "lucide-react";
import GlassSurface from "@/components/react-bits/GlassSurface";
import ShinyText from "@/components/react-bits/ShinyText";
import type { NetworkAssistantMessage } from "@/types/businessNetwork.types";

export default function NetworkAssistantPanel({messages,defaultOpen=false}:{messages:NetworkAssistantMessage[];defaultOpen?:boolean}) {
  return <GlassSurface className="network-analysis-surface" width="100%" borderRadius={14} blur={16} backgroundOpacity={0.76} saturation={1.15}>
    <details className="network-analysis" open={defaultOpen||undefined}>
      <summary><span className="network-ai-mark"><Bot size={17}/><ShinyText text="péek AI" speed={5.5}/></span>
        <span className="network-analysis-title">Análisis del proyecto</span><ChevronDown size={16} className="network-analysis-chevron"/>
      </summary>
      <div className="network-analysis-body" aria-live="polite">
        <div className="network-ai-context"><Sparkles size={14}/><span>Insight generado a partir de tu red actual</span></div>
        {messages.slice(0,2).map((message,index)=><p key={message.id} className={index===0?"network-analysis-primary":""}>{message.content}</p>)}
      </div>
    </details>
  </GlassSurface>;
}
