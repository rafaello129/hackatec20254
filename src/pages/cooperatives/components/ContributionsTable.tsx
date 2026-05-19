import type { Contribution, CooperativeParticipant } from "@/types/cooperatives.types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);

export default function ContributionsTable({
  contributions,
  participants,
}: {
  contributions: Contribution[];
  participants: CooperativeParticipant[];
}) {
  const resolveName = (participantId: string) =>
    participants.find((participant) => participant.id === participantId)?.companyName ?? "Participante";

  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white">
      <header className="border-b border-[#e2e3dc] px-4 py-3">
        <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Aportaciones</h3>
      </header>
      <div className="overflow-x-auto p-4">
        <table className="min-w-[760px] w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.06em] text-[#42493f]">
            <tr className="border-b border-[#e2e3dc]">
              <th className="px-2 py-3">Empresa</th>
              <th className="px-2 py-3">Tipo</th>
              <th className="px-2 py-3">Cantidad</th>
              <th className="px-2 py-3">Valor estimado</th>
              <th className="px-2 py-3">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((contribution) => (
              <tr key={contribution.id} className="border-b border-[#f0f1ea]">
                <td className="px-2 py-3 font-semibold text-[#1a1c18]">{resolveName(contribution.participantId)}</td>
                <td className="px-2 py-3 text-[#42493f]">{contribution.type}</td>
                <td className="px-2 py-3 text-[#42493f]">{contribution.quantity}</td>
                <td className="px-2 py-3 font-semibold text-[#1a1c18]">{formatCurrency(contribution.estimatedValue)}</td>
                <td className="px-2 py-3 text-[#42493f]">{contribution.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
