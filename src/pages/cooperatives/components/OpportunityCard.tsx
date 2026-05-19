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
      <article className="rounded-lg border border-[#c2c9bc] bg-white p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <OpportunityImage opportunity={opportunity} compact />

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <OpportunityTypeBadge type={opportunity.type} />
              <OpportunityStatusBadge status={opportunity.status} />
            </div>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">{opportunity.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-[#42493f]">{opportunity.description}</p>
                <p className="mt-2 text-sm text-[#42493f]">
                  <span className="font-semibold text-[#1a1c18]">Creadora:</span> {opportunity.creatorCompany}
                </p>
              </div>
              <Link
                to={`/cooperatives/${opportunity.id}`}
                className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold text-[#4F7302] hover:bg-[#f3f4ed]"
              >
                Ver detalle
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
              <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
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
              <span className="inline-flex items-center gap-1 text-sm text-[#42493f]">
                <Users className="h-4 w-4 text-[#4F7302]" />
                {opportunity.currentParticipants}/{opportunity.requestedParticipants}
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-[#42493f]">
                <CalendarDays className="h-4 w-4 text-[#4F7302]" />
                {opportunity.deadline}
              </span>
            </div>
          </div>
        </div>
      </article>
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
