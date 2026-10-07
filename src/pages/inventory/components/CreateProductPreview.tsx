import { Image as ImageIcon, Package } from "lucide-react";
import type { NewProductInput } from "@/types/inventory.types";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=720&h=720&q=82";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export default function CreateProductPreview({
  product,
}: {
  product: NewProductInput;
}) {
  const image = product.image?.trim() || FALLBACK_IMAGE;
  const name = product.name.trim() || "Tu producto";
  const quantity = Math.max(0, product.quantity || 0);
  const lowStockAt = Math.max(1, product.lowStockAt || 5);

  return (
    <aside className="rounded-[24px] border border-[var(--oe-border)] bg-white p-4 shadow-[0_14px_34px_rgba(23,35,27,0.045)] sm:p-5 lg:sticky lg:top-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A867E]">
            Vista previa
          </p>
          <p className="mt-1 text-[11px] text-[#87918A]">
            Así se verá al guardarlo.
          </p>
        </div>
        <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-[#F1F6EC] text-[#5A7B12]">
          <Package className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[104px_minmax(0,1fr)] gap-3 sm:grid-cols-[128px_minmax(0,1fr)] lg:block">
        <div className="overflow-hidden rounded-[16px] bg-[#EEF1EB] lg:rounded-[18px]">
          <div className="aspect-square lg:aspect-[4/3]">
            <img
              src={image}
              alt={product.name.trim() ? `Vista previa de ${product.name.trim()}` : ""}
              className="h-full w-full object-cover"
              onError={(event) => {
                const target = event.currentTarget;
                if (target.src !== FALLBACK_IMAGE) {
                  target.src = FALLBACK_IMAGE;
                }
              }}
            />
          </div>
        </div>

        <div className="min-w-0 lg:mt-4">
          <div className="flex flex-wrap items-center gap-1.5 lg:gap-2">
            <span className="rounded-full bg-[#F1F6EC] px-2.5 py-1 text-[9px] font-semibold text-[#5A6B5E]">
              {product.category}
            </span>
            <span className="hidden items-center gap-1 rounded-full bg-[#F6F7F3] px-2.5 py-1 text-[9px] font-medium text-[#7A867E] sm:inline-flex">
              <ImageIcon className="h-3 w-3" />
              Vista previa
            </span>
          </div>

          <h2 className="mt-2 line-clamp-2 font-['Hanken_Grotesk'] text-[17px] font-bold leading-tight text-[#263129] sm:text-[19px] lg:mt-3 lg:text-[22px]">
            {name}
          </h2>

          <p className="mt-2 hidden line-clamp-3 min-h-[48px] text-[10px] leading-4 text-[#7A867E] lg:block">
            {product.description?.trim() ||
              "Agrega una descripción breve para explicar qué hace especial a este producto."}
          </p>

          <p className="mt-2 font-['Hanken_Grotesk'] text-[22px] font-bold tracking-[-0.03em] text-[#022601] lg:mt-4 lg:text-[28px]">
            {product.price > 0 ? money.format(product.price) : "$0"}
          </p>

          <p className="mt-1 text-[9px] text-[#7A867E] lg:hidden">
            {quantity} disponibles · aviso en {lowStockAt}
          </p>

          <div className="mt-4 hidden grid-cols-2 gap-2 lg:grid">
            <div className="rounded-[14px] bg-[#F6F8F3] p-3">
              <p className="text-[9px] uppercase tracking-[0.06em] text-[#87918A]">
                Disponibles
              </p>
              <p className="mt-1 text-[16px] font-bold text-[#344039]">
                {quantity}
              </p>
            </div>
            <div className="rounded-[14px] bg-[#F6F8F3] p-3">
              <p className="text-[9px] uppercase tracking-[0.06em] text-[#87918A]">
                Aviso
              </p>
              <p className="mt-1 text-[16px] font-bold text-[#344039]">
                {lowStockAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
