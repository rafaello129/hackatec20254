import { useParams } from "react-router-dom";
import CooperativeActivityPanel from "./components/CooperativeActivityPanel";
import CooperativeDetailHeader from "./components/CooperativeDetailHeader";
import CooperativeSummaryPanel from "./components/CooperativeSummaryPanel";
import CooperativeTimeline from "./components/CooperativeTimeline";
import NegotiationPanel from "./components/NegotiationPanel";
import ParticipantsPanel from "./components/ParticipantsPanel";
import { useCooperativeDetail } from "./hooks/useCooperativeDetail";

export default function CooperativeDetailPage() {
  const { id } = useParams();
  const { isLoading, opportunity, participants, activities, messages, timeline } = useCooperativeDetail(id);

  if (isLoading) {
    return <div className="rounded-lg border border-[#c2c9bc] bg-white p-8 text-sm text-[#42493f]">Cargando detalle cooperativo...</div>;
  }

  if (!opportunity) {
    return <div className="rounded-lg border border-[#c2c9bc] bg-white p-8 text-sm text-[#42493f]">No encontramos esta oportunidad cooperativa.</div>;
  }

  return (
    <div className="space-y-6">
      <CooperativeDetailHeader opportunity={opportunity} />
      <CooperativeTimeline items={timeline} />
      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr] xl:items-start">
        <CooperativeSummaryPanel opportunity={opportunity} />
        <ParticipantsPanel participants={participants} />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_1fr] xl:items-start">
        <NegotiationPanel messages={messages} />
        <CooperativeActivityPanel activities={activities} />
      </div>
    </div>
  );
}
