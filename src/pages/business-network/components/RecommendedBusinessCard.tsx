import { useState } from "react";
import { Check, Clock3, MapPin, Star, UserPlus } from "lucide-react";
import type { NetworkPartner } from "@/types/businessNetwork.types";
import NetworkPartnerTypeBadge from "./NetworkPartnerTypeBadge";

export default function RecommendedBusinessCard({ partner, onConnect }: { partner: NetworkPartner; onConnect: (partnerId: string) => void }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className={`network-partner-card overflow-hidden rounded-lg border border-[#c2c9bc] bg-white ${partner.connected ? "network-partner-connected" : ""}`}>
      <div className="network-partner-image relative bg-[#e8e9e2]">
        {imageFailed ? (
          <div className="flex h-full items-center justify-center bg-[#D6D979] text-sm font-semibold text-[#3E5902]">{partner.name}</div>
        ) : (
          <img src={partner.imageUrl} alt={partner.imageAlt} onError={() => setImageFailed(true)} className="h-full w-full object-cover saturate-[0.85] contrast-[0.95]" />
        )}
        <span className="absolute right-3 top-3 rounded bg-[#022601] px-2.5 py-1 text-xs font-semibold text-white">{partner.matchScore}% afinidad</span>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <NetworkPartnerTypeBadge type={partner.type} />
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4F7302]"><Star className="h-3.5 w-3.5 fill-current" />{partner.rating}</span>
        </div>
        <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">{partner.name}</h3>
        <p className="mt-1 text-sm text-[#42493f]">{partner.description}</p>
        <div className="mt-3 flex items-center gap-1 text-xs text-[#42493f]"><MapPin className="h-3.5 w-3.5" /><span className="truncate">{partner.location}</span></div>
        <div className="network-partner-delivery"><Clock3 size={14} /><span>Entrega: {partner.estimatedLeadTime}</span></div>
        <div className="network-partner-footer flex items-center justify-between gap-2">
          <div><p className="text-xs text-[#42493f]">Rango</p><p className="text-sm font-semibold text-[#1a1c18]">{partner.priceRange}</p></div>
          <button disabled={partner.connected} aria-label={`${partner.connected ? "Conectado con" : "Conectar con"} ${partner.name}`} onClick={() => onConnect(partner.id)} className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold disabled:cursor-default ${partner.connected ? "bg-[#e7eedf] text-[#3E5902]" : "bg-[#4F7302] text-white hover:bg-[#3E5902]"}`}>
            {partner.connected ? <Check className="h-3.5 w-3.5" /> : <UserPlus className="h-3.5 w-3.5" />}{partner.connected ? "Conectado" : "Conectar"}
          </button>
        </div>
      </div>
    </article>
  );
}
