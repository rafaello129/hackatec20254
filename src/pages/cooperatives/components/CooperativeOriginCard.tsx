import { Factory, MapPin } from "lucide-react";
import type { CooperativeOpportunity } from "@/types/cooperatives.types";

export default function CooperativeOriginCard({ opportunity }: { opportunity: CooperativeOpportunity }) {
  return (
    <section className="overflow-hidden rounded-lg border border-[#c2c9bc] bg-white">
      <div className="relative h-44 bg-[#e8e9e2]">
        {opportunity.originImageUrl ?? opportunity.imageUrl ? (
          <img
            src={opportunity.originImageUrl ?? opportunity.imageUrl}
            alt={opportunity.originImageAlt ?? opportunity.imageAlt ?? opportunity.title}
            className="h-full w-full object-cover object-center saturate-[0.82] contrast-[0.95]"
          />
        ) : (
          <div className="grid h-full place-items-center text-[#3E5902]">
            <Factory className="h-10 w-10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#022601]/55 to-transparent" />
        <div className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#42493f]">Proveedor principal</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm font-bold text-[#1a1c18]">
            <MapPin className="h-3.5 w-3.5 text-[#4F7302]" />
            {opportunity.location}
          </p>
        </div>
      </div>
    </section>
  );
}
