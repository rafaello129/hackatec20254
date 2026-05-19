import type { Contribution, CooperativeParticipant } from "@/types/cooperatives.types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);

const roleLabels: Record<CooperativeParticipant["role"], string> = {
  creator: "Organizador",
  buyer: "Comprador",
  seller: "Proveedor",
  logistics: "Logística",
  service_provider: "Aliado",
  observer: "Observador",
};

const statusLabels: Record<CooperativeParticipant["status"], { label: string; className: string }> = {
  invited: { label: "Pendiente", className: "bg-[#fff2cc] text-[#7a5d00]" },
  interested: { label: "En revisión", className: "bg-[#fff2cc] text-[#7a5d00]" },
  accepted: { label: "Confirmado", className: "bg-[#D6D979] text-[#3E5902]" },
  active: { label: "Confirmado", className: "bg-[#D6D979] text-[#3E5902]" },
  completed: { label: "Cerrado", className: "bg-[#e8e9e2] text-[#42493f]" },
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function ContributionsTable({
  contributions,
  participants,
}: {
  contributions: Contribution[];
  participants: CooperativeParticipant[];
}) {
  const resolveParticipant = (participantId: string) =>
    participants.find((participant) => participant.id === participantId);

  return (
    <section className="overflow-hidden rounded-lg border border-[#c2c9bc] bg-white">
      <header className="flex items-center justify-between border-b border-[#e2e3dc] px-5 py-4">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Reparto de aportaciones</h2>
        <span className="text-sm font-semibold text-[#4F7302]">Ver detalle</span>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-[#f3f4ed] text-xs uppercase tracking-[0.08em] text-[#42493f]">
            <tr>
              <th className="px-5 py-3">Participante</th>
              <th className="px-4 py-3">Rol</th>
              <th className="px-4 py-3">Unidades</th>
              <th className="px-4 py-3">Contribución</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((contribution) => {
              const participant = resolveParticipant(contribution.participantId);
              const status = participant ? statusLabels[participant.status] : statusLabels.invited;
              return (
                <tr key={contribution.id} className="border-t border-[#f0f1ea]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#022601] text-xs font-bold text-white">
                        {initials(participant?.companyName ?? "Participante")}
                      </span>
                      <div>
                        <p className="font-semibold text-[#1a1c18]">{participant?.companyName ?? "Participante"}</p>
                        <p className="text-xs text-[#42493f]">{participant?.contactName ?? contribution.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[#42493f]">{participant ? roleLabels[participant.role] : "Miembro"}</td>
                  <td className="px-4 py-4 font-semibold text-[#1a1c18]">{contribution.quantity} unidades</td>
                  <td className="px-4 py-4 font-semibold text-[#1a1c18]">{formatCurrency(contribution.estimatedValue)}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}>{status.label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
