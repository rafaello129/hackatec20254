import {
  Factory,
  Hammer,
  MapPin,
  Package,
} from "lucide-react";
import type { ProductOrigin } from "@/types/product-verification.types";

export default function ProductOriginCard({
  origin,
}: {
  origin?: ProductOrigin;
}) {
  if (!origin) return null;

  return (
    <section className="overflow-hidden rounded-[24px] border border-[var(--oe-border)] bg-white">
      <div className="bg-[linear-gradient(135deg,#F1F7EA_0%,#E6F1E4_100%)] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#022601] text-[#B6E251]">
            <Factory className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#65806A]">
              Origen declarado
            </p>
            <h3 className="mt-1 text-[18px] font-semibold text-[#263129]">
              {origin.workshopName ?? origin.producerName}
            </h3>
            {origin.workshopName &&
            origin.workshopName !== origin.producerName ? (
              <p className="mt-1 text-[11px] text-[#657068]">
                Productor: {origin.producerName}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
        <Info icon={MapPin} label="Ubicación" value={origin.location} />
        {origin.technique ? (
          <Info icon={Hammer} label="Técnica" value={origin.technique} />
        ) : null}
        {origin.region ? (
          <Info icon={MapPin} label="Región" value={origin.region} />
        ) : null}
        {origin.materials?.length ? (
          <Info
            icon={Package}
            label="Materiales"
            value={origin.materials.join(" · ")}
          />
        ) : null}
      </div>
    </section>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-[16px] bg-[#F7F9F4] p-3.5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#5A7B12]" />
      <div>
        <p className="text-[9px] uppercase tracking-[0.06em] text-[#87918A]">
          {label}
        </p>
        <p className="mt-1 text-[11px] font-semibold leading-4 text-[#344039]">
          {value}
        </p>
      </div>
    </div>
  );
}
