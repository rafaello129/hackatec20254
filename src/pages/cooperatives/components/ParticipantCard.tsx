import type { CooperativeParticipant } from "@/types/cooperatives.types";

const roleLabels: Record<CooperativeParticipant["role"], string> = {
  creator: "Creadora",
  buyer: "Compradora",
  seller: "Vendedora",
  logistics: "Logística",
  service_provider: "Servicio",
  observer: "Observadora",
};

export default function ParticipantCard({ participant }: { participant: CooperativeParticipant }) {
  return (
    <article className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-[#1a1c18]">{participant.companyName}</p>
          <p className="text-xs text-[#42493f]">{participant.contactName}</p>
        </div>
        <span className="rounded-full bg-[#D6D979] px-2 py-0.5 text-xs font-semibold text-[#3E5902]">
          {roleLabels[participant.role]}
        </span>
      </div>
      <p className="text-sm text-[#42493f]">{participant.contributionType}</p>
      <p className="mt-1 text-sm font-semibold text-[#1a1c18]">
        {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(participant.contributionAmount)}
      </p>
    </article>
  );
}
