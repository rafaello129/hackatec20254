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
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Recomendaciones</h2>
      <div className="mt-3 space-y-2.5">
        {recommendations.slice(0, 3).map((recommendation) => (
          <article key={recommendation.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="line-clamp-1 text-sm font-semibold text-[#1a1c18]">{recommendation.title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#42493f]">{recommendation.description}</p>
              </div>
              <StatusBadge label={`Prioridad ${levelLabels[recommendation.priority]}`} tone={toneByPriority[recommendation.priority]} />
            </div>
            <div className="mt-2 grid gap-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#42493f] sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <span>Impacto: {levelLabels[recommendation.impact]}</span>
              <span>Esfuerzo: {levelLabels[recommendation.effort]}</span>
            </div>
            <p className="mt-2 line-clamp-2 rounded-md border border-[#D6D979] bg-white p-2 text-xs font-semibold leading-5 text-[#3E5902]">
              {recommendation.suggestedAction}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
