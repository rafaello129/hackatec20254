import type { CooperativeOpportunity } from "@/types/cooperatives.types";
import OpportunityCard from "./OpportunityCard";

interface OpportunityListProps {
  opportunities: CooperativeOpportunity[];
  variant?: "standard" | "compact";
}

export default function OpportunityList({ opportunities, variant = "standard" }: OpportunityListProps) {
  if (opportunities.length === 0) {
    return (
      <div className="rounded-lg border border-[#c2c9bc] bg-white p-8 text-center text-sm text-[#42493f]">
        No hay oportunidades con los filtros actuales.
      </div>
    );
  }

  return (
    <div className={variant === "compact" ? "grid gap-3" : "grid gap-4 lg:grid-cols-2 2xl:grid-cols-3"}>
      {opportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} variant={variant} />
      ))}
    </div>
  );
}
