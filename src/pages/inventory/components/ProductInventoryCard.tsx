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
    <section className="h-full rounded-[22px] border border-[var(--oe-border)] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">
            Existencias
          </p>
          <h2 className="mt-1 text-[16px] font-semibold text-[#263129]">
            {product.stock} {product.stock === 1 ? "pieza disponible" : "piezas disponibles"}
          </h2>
          <p className="mt-0.5 text-[9px] leading-4 text-[#7A867E]">
            Aviso al llegar a {product.lowStockAt} piezas.
          </p>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[var(--peek-success-soft)] text-[var(--oe-primary)]">
          <PackageOpen className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#EEF1EB]">
        <span
          className="block h-full rounded-full bg-[linear-gradient(90deg,var(--oe-primary),var(--peek-accent-lime))]"
          style={{ width: ratio + "%" }}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onAdjust("remove")}
          disabled={product.stock <= 0}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[12px] border border-[#DDE3DA] text-[10px] font-semibold text-[#536057] disabled:opacity-40"
        >
          <Minus className="h-3.5 w-3.5" />
          Quitar
        </button>
        <button
          type="button"
          onClick={() => onAdjust("add")}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[12px] bg-[var(--oe-primary)] text-[10px] font-semibold text-white"
        >
          <Plus className="h-3.5 w-3.5" />
          Agregar
        </button>
      </div>
    </section>
  );
}
