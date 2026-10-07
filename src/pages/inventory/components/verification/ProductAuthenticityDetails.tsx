import {
  AlertCircle,
  Check,
  Clock3,
  Factory,
  FileText,
  Hammer,
  Image as ImageIcon,
  MapPin,
  Package,
  SearchCheck,
} from "lucide-react";
import type {
  ProductVerification,
  ProductVerificationEvidence,
} from "@/types/product-verification.types";

export default function ProductAuthenticityDetails({
  verification,
  onOpenEvidence,
}: {
  verification: ProductVerification;
  onOpenEvidence: (evidence: ProductVerificationEvidence) => void;
}) {
  const origin = verification.origin;

  if (
    !origin &&
    verification.checks.length === 0 &&
    verification.evidence.length === 0
  ) {
    return null;
  }

  return (
    <section className="rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A867E]">
            Detalles de autenticidad
          </p>
          <h2 className="mt-1 text-[20px] font-semibold text-[#263129]">
            Origen y comprobaciones
          </h2>
        </div>

        {origin ? (
          <div className="flex min-w-0 items-start gap-3 rounded-[16px] bg-[#F1F7EA] px-4 py-3 lg:min-w-[340px]">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[13px] bg-[#022601] text-[#B6E251]">
              <Factory className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold text-[#2D3931]">
                {origin.workshopName ?? origin.producerName}
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-[10px] text-[#6D7971]">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{origin.location}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {origin ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {origin.technique ? (
            <MetaChip icon={Hammer} label={origin.technique} />
          ) : null}
          {origin.materials?.length ? (
            <MetaChip icon={Package} label={origin.materials.join(" · ")} />
          ) : null}
          {origin.region ? (
            <MetaChip icon={MapPin} label={origin.region} />
          ) : null}
        </div>
      ) : null}

      {verification.checks.length > 0 ? (
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {verification.checks.map((check) => {
            const meta =
              check.status === "passed"
                ? {
                    icon: Check,
                    className: "bg-[#EAF4E6] text-[#2E6D36]",
                  }
                : check.status === "needs_action"
                  ? {
                      icon: AlertCircle,
                      className: "bg-[#FDE9E6] text-[#A54A42]",
                    }
                  : {
                      icon: Clock3,
                      className: "bg-[#FFF4D8] text-[#8B6205]",
                    };

            const Icon = meta.icon;

            return (
              <div
                key={check.id}
                className="flex items-center gap-3 rounded-[15px] bg-[#F8FAF6] px-3.5 py-3"
              >
                <span
                  className={[
                    "grid h-7 w-7 shrink-0 place-items-center rounded-full",
                    meta.className,
                  ].join(" ")}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-[#344039]">
                    {check.label}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-[9px] text-[#87918A]">
                    {check.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {verification.evidence.length > 0 ? (
        <div className="mt-5 border-t border-[#EDF0EB] pt-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold text-[#536057]">
                Evidencia revisada
              </p>
              <p className="mt-0.5 text-[9px] text-[#87918A]">
                {verification.evidence.length}{" "}
                {verification.evidence.length === 1
                  ? "elemento"
                  : "elementos"}
              </p>
            </div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {verification.evidence.slice(0, 3).map((item) => {
              const Icon =
                item.type === "photo"
                  ? ImageIcon
                  : item.type === "document"
                    ? FileText
                    : SearchCheck;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onOpenEvidence(item)}
                  className="group flex min-w-0 items-center gap-3 rounded-[15px] border border-[#E4E9E1] bg-[#FBFCF9] p-2.5 text-left transition hover:border-[#C9D6C4] hover:bg-[#F6F9F3]"
                >
                  {item.url ? (
                    <img
                      src={item.url}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-[11px] object-cover"
                    />
                  ) : (
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[11px] bg-[#EEF4E9] text-[#5A7B12]">
                      <Icon className="h-5 w-5" />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-[10px] font-semibold text-[#344039]">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[9px] text-[#87918A]">
                      Ver evidencia
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function MetaChip({
  icon: Icon,
  label,
}: {
  icon: typeof MapPin;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F8F2] px-3 py-1.5 text-[10px] font-medium text-[#5E6C63]">
      <Icon className="h-3.5 w-3.5 text-[#6F8E2B]" />
      {label}
    </span>
  );
}
