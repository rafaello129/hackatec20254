import {
  Minus,
  PackageCheck,
  Plus,
  ShoppingBag,
} from "lucide-react";
import type { ProductDisplayData } from "@/types/inventory.types";
import type { ProductVerificationStatus } from "@/types/product-verification.types";
import ProductVerificationBadge from "./verification/ProductVerificationBadge";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const availabilityMeta = {
  available: {
    label: "Disponible",
    className: "bg-[var(--peek-success-soft)] text-[#2E6D36]",
  },
  low_stock: {
    label: "Por agotarse",
    className: "bg-[var(--peek-warning-soft)] text-[#8B6205]",
  },
  out_of_stock: {
    label: "Agotado",
    className: "bg-[#FDE9E6] text-[#A54A42]",
  },
} as const;

export default function ProductDetailHero({
  product,
  verificationStatus,
  onAdjust,
}: {
  product: ProductDisplayData;
  verificationStatus: ProductVerificationStatus;
  onAdjust: (direction: "add" | "remove") => void;
}) {
  const availability = availabilityMeta[product.availability];

  return (
    <section className="overflow-hidden rounded-[24px] border border-[var(--oe-border)] bg-white shadow-[0_14px_34px_rgba(23,35,27,0.045)]">
      <div className="grid lg:grid-cols-[minmax(0,1.03fr)_minmax(360px,.97fr)]">
        <div className="relative min-h-[285px] overflow-hidden bg-[#EEF1EB] sm:min-h-[340px]">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#022601]/28 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-semibold text-[#536057] shadow-sm backdrop-blur">
              {product.category}
            </span>
            <ProductVerificationBadge status={verificationStatus} compact />
          </div>
        </div>

        <div className="flex flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className={"rounded-full px-2.5 py-1 text-[9px] font-semibold " + availability.className}>
              {availability.label}
            </span>
            <span className="text-[9px] font-medium text-[#87918A]">
              {product.sku}
            </span>
          </div>

          <h1 className="mt-3 font-['Hanken_Grotesk'] text-[29px] font-bold leading-[1.06] text-[var(--oe-text)] sm:text-[34px]">
            {product.name}
          </h1>
          <p className="mt-2.5 max-w-[620px] text-[11px] leading-5 text-[var(--oe-text-muted)]">
            {product.description}
          </p>

          <div className="mt-5">
            <p className="font-['Hanken_Grotesk'] text-[34px] font-bold tracking-[-0.04em] text-[var(--peek-brand-900)]">
              {money.format(product.price)}
            </p>
            <p className="mt-0.5 text-[9px] text-[#7A867E]">por pieza</p>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-[14px] bg-[#F6F8F3] p-3">
              <PackageCheck className="h-3.5 w-3.5 text-[#5B6C60]" />
              <p className="mt-1.5 text-[16px] font-bold text-[#263129]">
                {product.stock}
              </p>
              <p className="text-[8px] uppercase tracking-[0.06em] text-[#849087]">
                disponibles
              </p>
            </div>
            <div className="rounded-[14px] bg-[#F6F8F3] p-3">
              <ShoppingBag className="h-3.5 w-3.5 text-[#5B6C60]" />
              <p className="mt-1.5 text-[16px] font-bold text-[#263129]">
                {product.unitsSoldThisMonth}
              </p>
              <p className="text-[8px] uppercase tracking-[0.06em] text-[#849087]">
                vendidos
              </p>
            </div>
            <div className="rounded-[14px] bg-[#F6F8F3] p-3">
              <p className="text-[8px] uppercase tracking-[0.06em] text-[#849087]">
                última venta
              </p>
              <p className="mt-2.5 text-[11px] font-bold leading-4 text-[#263129]">
                {product.lastSaleLabel}
              </p>
            </div>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
            <button
              type="button"
              onClick={() => onAdjust("remove")}
              disabled={product.stock <= 0}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#DDE3DA] bg-white text-[10px] font-semibold text-[#536057] transition hover:bg-[#F6F8F4] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus className="h-3.5 w-3.5" />
              Quitar piezas
            </button>
            <button
              type="button"
              onClick={() => onAdjust("add")}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[var(--peek-brand-900)] text-[10px] font-semibold text-white transition hover:bg-[var(--oe-primary-hover)]"
            >
              <Plus className="h-3.5 w-3.5" />
              Agregar piezas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
