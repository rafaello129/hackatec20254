import { Minus, Plus, PackageOpen } from "lucide-react";
import type { ProductDisplayData } from "@/types/inventory.types";

export default function ProductInventoryCard({
  product,
  onAdjust,
}: {
  product: ProductDisplayData;
  onAdjust: (direction: "add" | "remove") => void;
}) {
  const ratio = Math.min(
    100,
    Math.max(0, (product.stock / Math.max(product.lowStockAt * 3, 1)) * 100),
  );

  return (
    <section className="h-full rounded-[24px] border border-[var(--oe-border)] bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
            Existencias
          </p>
          <h2 className="mt-2 text-[18px] font-semibold text-[#263129]">
            {product.stock} {product.stock === 1 ? "pieza disponible" : "piezas disponibles"}
          </h2>
          <p className="mt-1 text-[10px] leading-4 text-[#7A867E]">
            Te avisamos cuando queden {product.lowStockAt} piezas.
          </p>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[var(--peek-success-soft)] text-[var(--oe-primary)]">
          <PackageOpen className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#EEF1EB]">
        <span
          className="block h-full rounded-full bg-[linear-gradient(90deg,var(--oe-primary),var(--peek-accent-lime))]"
          style={{ width: ratio + "%" }}
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onAdjust("remove")}
          disabled={product.stock <= 0}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-[13px] border border-[#DDE3DA] text-[11px] font-semibold text-[#536057] disabled:opacity-40"
        >
          <Minus className="h-4 w-4" />
          Quitar
        </button>
        <button
          type="button"
          onClick={() => onAdjust("add")}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-[13px] bg-[var(--oe-primary)] text-[11px] font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          Agregar
        </button>
      </div>
    </section>
  );
}
