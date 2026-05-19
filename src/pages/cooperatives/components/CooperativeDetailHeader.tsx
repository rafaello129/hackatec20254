import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CooperativeOpportunity } from "@/types/cooperatives.types";
import OpportunityStatusBadge from "./OpportunityStatusBadge";
import OpportunityTypeBadge from "./OpportunityTypeBadge";

export default function CooperativeDetailHeader({ opportunity }: { opportunity: CooperativeOpportunity }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-[#c2c9bc] bg-white p-4 md:flex-row md:items-start md:justify-between">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          <OpportunityTypeBadge type={opportunity.type} />
          <OpportunityStatusBadge status={opportunity.status} />
        </div>
        <h1 className="font-['Hanken_Grotesk'] text-3xl font-bold text-[#1a1c18]">{opportunity.title}</h1>
        <p className="mt-1 max-w-3xl text-sm text-[#42493f]">{opportunity.description}</p>
        <p className="mt-2 text-sm font-semibold text-[#1a1c18]">Empresa creadora: {opportunity.creatorCompany}</p>
      </div>
      <Link
        to={`/cooperatives/${opportunity.id}/agreement`}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3E5902]"
      >
        Ver acuerdo
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
