import { CalendarDays, Clock, Handshake, Users } from "lucide-react";
import { Link } from "react-router-dom";
import type { CooperativeAgreement, CooperativeOpportunity } from "@/types/cooperatives.types";
import OpportunityStatusBadge from "./OpportunityStatusBadge";
import OpportunityTypeBadge from "./OpportunityTypeBadge";

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));

const daysUntil = (value: string) => {
  const now = new Date("2026-05-18T12:00:00");
  const target = new Date(`${value}T12:00:00`);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
};

const agreementStatusLabels: Record<NonNullable<CooperativeAgreement>["status"], string> = {
  draft: "borrador",
  review: "en revisión",
  signed: "firmado",
  active: "activo",
  closed: "cerrado",
};

export default function CooperativeHeroCard({
  opportunity,
  agreement,
  variant = "detail",
}: {
  opportunity: CooperativeOpportunity;
  agreement?: CooperativeAgreement | null;
  variant?: "detail" | "agreement";
}) {
  const remainingDays = daysUntil(opportunity.deadline);

  return (
    <section className="overflow-hidden rounded-lg border border-[#c2c9bc] bg-white">
      <div className="relative h-[210px] overflow-hidden bg-[#022601] sm:h-[230px]">
        {opportunity.imageUrl ? (
          <img
            src={opportunity.imageUrl}
            alt={opportunity.imageAlt ?? opportunity.title}
            className="h-full w-full object-cover object-center opacity-90 saturate-[0.86] contrast-[0.96]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#022601] text-[#D6D979]">
            <Handshake className="h-12 w-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#022601]/55 via-[#022601]/10 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <OpportunityStatusBadge status={opportunity.status} />
          <OpportunityTypeBadge type={opportunity.type} />
          {variant === "agreement" && agreement ? (
            <span className="inline-flex rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#1a1c18]">
              Acuerdo {agreementStatusLabels[agreement.status]}
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <p className="mb-1 text-sm font-semibold text-[#4F7302]">
              {variant === "agreement" ? "Ficha viva del acuerdo" : "Detalle de iniciativa cooperativa"}
            </p>
            <h1 className="font-['Hanken_Grotesk'] text-2xl font-bold leading-tight text-[#1a1c18] md:text-3xl">
              {variant === "agreement" && agreement ? agreement.title : opportunity.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#42493f]">
              <span className="inline-flex items-center gap-1.5">
                <Handshake className="h-4 w-4 text-[#4F7302]" />
                Organizado por <strong className="text-[#1a1c18]">{opportunity.creatorCompany}</strong>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#4F7302]" />
                {remainingDays} días restantes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-[#4F7302]" />
                Cierre {formatDate(opportunity.deadline)}
              </span>
            </div>
          </div>

          <div className="shrink-0 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] px-4 py-3 text-right">
            <p className="flex items-center justify-end gap-1.5 font-['Hanken_Grotesk'] text-2xl font-bold text-[#1a1c18]">
              <Users className="h-5 w-5 text-[#4F7302]" />
              {opportunity.currentParticipants}/{opportunity.requestedParticipants}
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">Participantes</p>
          </div>
        </div>

        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#42493f]">{opportunity.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {opportunity.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full bg-[#e8e9e2] px-2.5 py-1 text-xs font-semibold text-[#42493f]">
              {tag.replaceAll("_", " ")}
            </span>
          ))}
          {variant === "detail" ? (
            <Link
              to={`/cooperatives/${opportunity.id}/agreement`}
              className="ml-auto inline-flex items-center rounded-lg bg-[#022601] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3E5902]"
            >
              Ver acuerdo
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
