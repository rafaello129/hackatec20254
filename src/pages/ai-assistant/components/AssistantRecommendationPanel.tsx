import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";
import type { AssistantRecommendation } from "@/types/assistant.types";

const levelLabels: Record<AssistantRecommendation["priority"], string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};

const toneByPriority: Record<AssistantRecommendation["priority"], "neutral" | "success" | "warning" | "danger"> = {
  low: "neutral",
  medium: "warning",
  high: "success",
};

export default function AssistantRecommendationPanel({ recommendations }: { recommendations: AssistantRecommendation[] }) {
  return (
    <SectionCard title="Recomendaciones accionables">
      <div className="space-y-3">
        {recommendations.map((recommendation) => (
          <article key={recommendation.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-[#1a1c18]">{recommendation.title}</p>
                <p className="mt-1 text-sm text-[#42493f]">{recommendation.description}</p>
              </div>
              <StatusBadge label={`Prioridad ${levelLabels[recommendation.priority]}`} tone={toneByPriority[recommendation.priority]} />
            </div>
            <div className="mt-3 grid gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f] sm:grid-cols-2">
              <span>Impacto: {levelLabels[recommendation.impact]}</span>
              <span>Esfuerzo: {levelLabels[recommendation.effort]}</span>
            </div>
            <p className="mt-3 rounded-md border border-[#D6D979] bg-white p-2 text-sm font-semibold text-[#3E5902]">
              {recommendation.suggestedAction}
            </p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
