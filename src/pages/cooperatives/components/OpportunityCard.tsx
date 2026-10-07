import { ArrowUpRight, CalendarDays, Handshake, Megaphone, PackageCheck, Route, Store, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { CooperativeOpportunity, CooperativeOpportunityType } from "@/types/cooperatives.types";
import OpportunityStatusBadge from "./OpportunityStatusBadge";
import OpportunityTypeBadge from "./OpportunityTypeBadge";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);

const fallbackByType: Record<CooperativeOpportunityType, { icon: LucideIcon; label: string; className: string }> = {
  joint_purchase: {
    icon: PackageCheck,
    label: "Compra",
    className: "bg-[#eef3d3] text-[#3E5902]",
  },
  joint_sale: {
    icon: Store,
    label: "Venta",
    className: "bg-[#f3f4ed] text-[#3E5902]",
  },
  shared_campaign: {
    icon: Megaphone,
    label: "Campaña",
    className: "bg-[#fffaf0] text-[#7a5d00]",
  },
  shared_distribution: {
    icon: Route,
    label: "Distribución",
    className: "bg-[#e8e9e2] text-[#42493f]",
  },
  logistics_partnership: {
    icon: Handshake,
    label: "Logística",
    className: "bg-[#f4f6d6] text-[#3E5902]",
  },
};

interface OpportunityCardProps {
  opportunity: CooperativeOpportunity;
  variant?: "standard" | "compact";
}

function OpportunityFallback({ type, compact = false }: { type: CooperativeOpportunityType; compact?: boolean }) {
  const visual = fallbackByType[type];
  const Icon = visual.icon;

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg border border-[#d7ddcf] ${visual.className} ${
        compact ? "flex h-28 w-full md:h-24 md:w-28" : "flex h-20 w-24"
      } items-center justify-center`}
    >
      <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-white/40" />
      <div className="absolute -bottom-6 -left-4 h-14 w-14 rounded-full bg-[#022601]/5" />
      <div className="relative z-10 flex flex-col items-center gap-1">
        <Icon className={compact ? "h-6 w-6" : "h-5 w-5"} />
        <span className="text-[10px] font-bold uppercase tracking-[0.08em]">{visual.label}</span>
      </div>
    </div>
  );
}

function OpportunityImage({ opportunity, compact = false }: { opportunity: CooperativeOpportunity; compact?: boolean }) {
  const [hasError, setHasError] = useState(false);

  if (!opportunity.imageUrl || hasError) {
    return <OpportunityFallback type={opportunity.type} compact={compact} />;
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg border border-[#d7ddcf] bg-[#f3f4ed] ${
        compact ? "h-28 w-full md:h-24 md:w-28" : "h-20 w-24"
      }`}
    >
      <img
        src={opportunity.imageUrl}
        alt={opportunity.imageAlt ?? opportunity.title}
        onError={() => setHasError(true)}
        loading="lazy"
        className="h-full w-full object-cover object-center saturate-[0.85] contrast-[0.95]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#022601]/10" />
    </div>
  );
}

export default function OpportunityCard({ opportunity, variant = "standard" }: OpportunityCardProps) {
  const progress = Math.min(100, Math.round((opportunity.currentAmount / opportunity.targetAmount) * 100));

  if (variant === "compact") {
    return (
      <Link
        to={`/cooperatives/${opportunity.id}`}
        className="group flex min-h-[168px] items-start gap-5 rounded-[20px] border border-transparent bg-[#FAFAF7] p-4.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#DDE6D8] hover:bg-white hover:shadow-sm"
      >
        <div className="relative h-[112px] w-[112px] shrink-0 overflow-hidden rounded-[18px] bg-[#EEF1EB]">
          {opportunity.imageUrl ? (
            <img
              src={opportunity.imageUrl}
              alt={opportunity.imageAlt ?? opportunity.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-[#EDF4E8] text-[#2E7439]">
              <Handshake className="h-6 w-6" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <OpportunityTypeBadge type={opportunity.type} />
            <OpportunityStatusBadge status={opportunity.status} />
          </div>
          <h3 className="mt-2.5 line-clamp-2 text-[15px] font-semibold leading-[1.22] text-[#28322B]">{opportunity.title}</h3>
          <p className="mt-2 line-clamp-2 text-[12px] leading-[1.45] text-[#7A857E]">
            {opportunity.description}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[11.5px] text-[#748078]">
            <span>{opportunity.creatorCompany}</span>
            <span className="h-1 w-1 rounded-full bg-[#C5CCC6]" />
            <span><strong className="font-semibold text-[#344039]">{progress}%</strong> comprometido</span>
            <span className="h-1 w-1 rounded-full bg-[#C5CCC6]" />
            <span>{opportunity.currentParticipants}/{opportunity.requestedParticipants} aliados</span>
          </div>

          <div className="mt-3 rounded-[14px] bg-white/80 px-3.5 py-3 ring-1 ring-[#E8ECE5]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-medium text-[#7C867F]">Monto comprometido</span>
              <span className="text-[11px] font-semibold text-[#35523B]">{progress}%</span>
            </div>
            <div className="mt-2 flex items-end justify-between gap-4">
              <p className="text-[15px] font-semibold leading-none text-[#17231B]">
                {formatCurrency(opportunity.currentAmount)}
              </p>
              <p className="text-[10px] text-[#87918A]">
                de {formatCurrency(opportunity.targetAmount)}
              </p>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#EDF1EA]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#0B6C31,#9AC84B)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="hidden shrink-0 pt-1 text-right sm:block">
          <p className="text-[11px] text-[#87918A]">Meta</p>
          <p className="mt-1 text-[16px] font-semibold text-[#35523B]">{formatCurrency(opportunity.targetAmount)}</p>
          <ArrowUpRight className="ml-auto mt-4 h-5 w-5 text-[#98A29B] transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    );
  }

  return (
    <article className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="flex items-start gap-3">
        <OpportunityImage opportunity={opportunity} />
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <OpportunityTypeBadge type={opportunity.type} />
            <OpportunityStatusBadge status={opportunity.status} />
          </div>
          <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">{opportunity.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-[#42493f]">{opportunity.description}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-[#42493f]">
        <p><span className="font-semibold text-[#1a1c18]">Creadora:</span> {opportunity.creatorCompany}</p>
        <p><span className="font-semibold text-[#1a1c18]">Beneficio:</span> {opportunity.expectedBenefit}</p>
      </div>

      <div className="mt-4 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="font-semibold text-[#42493f]">Monto comprometido</span>
          <span className="font-semibold text-[#1a1c18]">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#e2e3dc]">
          <div className="h-full rounded-full bg-[#799833]" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-1 text-xs text-[#42493f]">
          {formatCurrency(opportunity.currentAmount)} de {formatCurrency(opportunity.targetAmount)}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[#42493f]">
        <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" />{opportunity.currentParticipants}/{opportunity.requestedParticipants}</span>
        <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" />{opportunity.deadline}</span>
        <Link to={`/cooperatives/${opportunity.id}`} className="inline-flex items-center gap-1 font-semibold text-[#4F7302]">
          Ver detalle
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
