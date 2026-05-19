import type { CooperativeParticipant } from "@/types/cooperatives.types";

const roleLabels: Record<CooperativeParticipant["role"], string> = {
  creator: "Organizador",
  buyer: "Comprador",
  seller: "Proveedor",
  logistics: "Logística",
  service_provider: "Aliado",
  observer: "Observador",
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function TopParticipantsPanel({ participants }: { participants: CooperativeParticipant[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold uppercase tracking-[0.02em] text-[#1a1c18]">
          Participantes principales
        </h2>
        <span className="rounded-full bg-[#e8e9e2] px-2.5 py-1 text-xs font-semibold text-[#42493f]">{participants.length}</span>
      </div>

      <div className="space-y-3">
        {participants.slice(0, 4).map((participant) => (
          <article key={participant.id} className="flex items-center gap-3 rounded-lg bg-[#f9faf3] p-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#022601] text-xs font-bold text-white">
              {initials(participant.companyName)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#1a1c18]">{participant.companyName}</p>
              <p className="text-xs text-[#42493f]">{participant.contactName} · {participant.joinedAt}</p>
            </div>
            <span className="shrink-0 text-xs font-semibold text-[#3E5902]">{roleLabels[participant.role]}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
