import { ArrowUpRight, CalendarDays, Users } from "lucide-react";
import { Link } from "react-router-dom";
import type { CooperativeOpportunity } from "@/types/cooperatives.types";
import OpportunityStatusBadge from "./OpportunityStatusBadge";
import OpportunityTypeBadge from "./OpportunityTypeBadge";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);

export default function OpportunityCard({ opportunity }: { opportunity: CooperativeOpportunity }) {
  const progress = Math.min(100, Math.round((opportunity.currentAmount / opportunity.targetAmount) * 100));
  return (
    <article className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <OpportunityTypeBadge type={opportunity.type} />
        <OpportunityStatusBadge status={opportunity.status} />
      </div>
      <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">{opportunity.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-[#42493f]">{opportunity.description}</p>

      <div className="mt-4 grid gap-2 text-sm text-[#42493f]">
        <p><span className="font-semibold text-[#1a1c18]">Creadora:</span> {opportunity.creatorCompany}</p>
        <p><span className="font-semibold text-[#1a1c18]">Beneficio:</span> {opportunity.expectedBenefit}</p>
      </div>

      <div className="mt-4 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="font-semibold text-[#42493f]">Monto comprometido</span>
          <span className="font-semibold text-[#1a1c18]">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#e2e3dc]">
          <div className="h-full rounded-full bg-[#799833]" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-1 text-xs text-[#42493f]">
          {formatCurrency(opportunity.currentAmount)} de {formatCurrency(opportunity.targetAmount)}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[#42493f]">
        <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" />{opportunity.currentParticipants}/{opportunity.requestedParticipants}</span>
        <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" />{opportunity.deadline}</span>
        <Link to={`/cooperatives/${opportunity.id}`} className="inline-flex items-center gap-1 font-semibold text-[#4F7302]">
          Ver detalle
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
