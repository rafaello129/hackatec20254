import type { CooperativeParticipant } from "@/types/cooperatives.types";
import ParticipantCard from "./ParticipantCard";

export default function ParticipantsPanel({ participants }: { participants: CooperativeParticipant[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Participantes</h3>
        <span className="rounded-full bg-[#e8e9e2] px-2.5 py-1 text-xs font-semibold text-[#42493f]">{participants.length}</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {participants.map((participant) => (
          <ParticipantCard key={participant.id} participant={participant} />
        ))}
      </div>
    </section>
  );
}
