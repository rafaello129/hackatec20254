import { ArrowUpRight } from "lucide-react";
import type { NetworkPartner } from "@/types/businessNetwork.types";
import RecommendedBusinessCard from "./RecommendedBusinessCard";

export default function RecommendedBusinessCards({ partners, onConnect }: { partners: NetworkPartner[]; onConnect: (partnerId: string) => void }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Negocios recomendados</h2>
          <p className="text-sm text-[#42493f]">Aliados externos para completar la cadena comercial.</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#4F7302]">Ver todos los aliados<ArrowUpRight className="h-4 w-4" /></span>
      </div>
      <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {partners.map((partner) => <RecommendedBusinessCard key={partner.id} partner={partner} onConnect={onConnect} />)}
      </div>
    </section>
  );
}
