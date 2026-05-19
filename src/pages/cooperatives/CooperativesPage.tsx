import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import PageIntro from "@/components/common/PageIntro";
import SectionCard from "@/components/common/SectionCard";
import CooperativeActivityPanel from "./components/CooperativeActivityPanel";
import CooperativesKpiCards from "./components/CooperativesKpiCards";
import CooperativesSectionTabs from "./components/CooperativesSectionTabs";
import OpportunityList from "./components/OpportunityList";
import { useCooperativeDetail } from "./hooks/useCooperativeDetail";
import { useCooperatives } from "./hooks/useCooperatives";

export default function CooperativesPage() {
  const { kpis, featuredOpportunities, isLoading } = useCooperatives();
  const { activities } = useCooperativeDetail("coop-1001");

  return (
    <div className="space-y-6">
      <PageIntro
        title="Cooperativos"
        description="Gestiona oportunidades compartidas, acuerdos entre empresas y servicios post-acuerdo."
        actions={
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white opacity-80"
          >
            <Plus className="h-4 w-4" />
            Crear oportunidad
          </button>
        }
      />

      <CooperativesSectionTabs />
      <CooperativesKpiCards kpis={kpis} />

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr] xl:items-start">
        <SectionCard
          title="Oportunidades destacadas"
          actions={
            <Link to="/cooperatives/opportunities" className="inline-flex items-center gap-1 text-sm font-semibold text-[#4F7302]">
              Ver marketplace
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          }
        >
          {isLoading ? (
            <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-6 text-sm text-[#42493f]">Cargando oportunidades...</div>
          ) : (
            <OpportunityList opportunities={featuredOpportunities} />
          )}
        </SectionCard>

        <CooperativeActivityPanel activities={activities} />
      </div>
    </div>
  );
}
