import { useParams } from "react-router-dom";
import ContributionsTable from "./components/ContributionsTable";
import CooperativeActivityPanel from "./components/CooperativeActivityPanel";
import CooperativeDiscussionPanel from "./components/CooperativeDiscussionPanel";
import CooperativeDocumentsPanel from "./components/CooperativeDocumentsPanel";
import CooperativeHealthPanel from "./components/CooperativeHealthPanel";
import CooperativeHeroCard from "./components/CooperativeHeroCard";
import CooperativeMetricsGrid from "./components/CooperativeMetricsGrid";
import CooperativeOriginCard from "./components/CooperativeOriginCard";
import CooperativeProgressPanel from "./components/CooperativeProgressPanel";
import CooperativeTimeline from "./components/CooperativeTimeline";
import DistributionPlanPanel from "./components/DistributionPlanPanel";
import PostAgreementServicesPanel from "./components/PostAgreementServicesPanel";
import TopParticipantsPanel from "./components/TopParticipantsPanel";
import { useCooperativeDetail } from "./hooks/useCooperativeDetail";

export default function CooperativeAgreementPage() {
  const { id } = useParams();
  const { isLoading, opportunity, agreement, participants, activities, documents, messages, services, timeline } = useCooperativeDetail(id);

  if (isLoading) {
    return <div className="rounded-lg border border-[#c2c9bc] bg-white p-6 text-[#42493f]">Cargando acuerdo cooperativo...</div>;
  }

  if (!opportunity || !agreement) {
    return (
      <div className="rounded-lg border border-[#c2c9bc] bg-white p-6 text-[#42493f]">
        Este cooperativo todavía no tiene un acuerdo disponible.
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-full gap-6 overflow-hidden xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
      <main className="min-w-0 space-y-6">
        <CooperativeHeroCard opportunity={opportunity} agreement={agreement} variant="agreement" />
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <CooperativeMetricsGrid opportunity={opportunity} agreement={agreement} />
          <CooperativeProgressPanel opportunity={opportunity} />
        </div>
        <ContributionsTable contributions={agreement.contributions} participants={participants} />
        <CooperativeTimeline items={timeline} />
        <DistributionPlanPanel plan={agreement.distributionPlan} />
        <CooperativeDiscussionPanel messages={messages} />
      </main>

      <aside className="min-w-0 space-y-6">
        <CooperativeHealthPanel opportunity={opportunity} variant="agreement" />
        <TopParticipantsPanel participants={participants} />
        <CooperativeOriginCard opportunity={opportunity} />
        <PostAgreementServicesPanel services={services} />
        <CooperativeDocumentsPanel documents={documents} />
        <CooperativeActivityPanel activities={activities} />
      </aside>
    </div>
  );
}
