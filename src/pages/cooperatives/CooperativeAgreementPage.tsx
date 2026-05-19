import { useParams } from "react-router-dom";
import AgreementSummary from "./components/AgreementSummary";
import ContributionsTable from "./components/ContributionsTable";
import CooperativeActivityPanel from "./components/CooperativeActivityPanel";
import CooperativeDocumentsPanel from "./components/CooperativeDocumentsPanel";
import DistributionPlanPanel from "./components/DistributionPlanPanel";
import PostAgreementServicesPanel from "./components/PostAgreementServicesPanel";
import { useCooperativeDetail } from "./hooks/useCooperativeDetail";

export default function CooperativeAgreementPage() {
  const { id } = useParams();
  const { isLoading, opportunity, agreement, participants, activities, documents, services } = useCooperativeDetail(id);

  if (isLoading) {
    return <div className="rounded-lg border border-[#c2c9bc] bg-white p-8 text-sm text-[#42493f]">Cargando acuerdo cooperativo...</div>;
  }

  return (
    <div className="space-y-6">
      <AgreementSummary agreement={agreement} opportunity={opportunity} />
      {agreement ? (
        <>
          <ContributionsTable contributions={agreement.contributions} participants={participants} />
          <div className="grid gap-4 xl:grid-cols-[1fr_1.2fr] xl:items-start">
            <DistributionPlanPanel plan={agreement.distributionPlan} />
            <PostAgreementServicesPanel services={services} />
          </div>
          <div className="grid gap-4 xl:grid-cols-[1fr_1fr] xl:items-start">
            <CooperativeDocumentsPanel documents={documents} />
            <CooperativeActivityPanel activities={activities} />
          </div>
        </>
      ) : null}
    </div>
  );
}
